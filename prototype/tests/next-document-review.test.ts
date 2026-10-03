/** @jest-environment node */
import { validateReview, reviewDocument, ReviewError } from '@/src/night/server/document-review';
import { GET, POST } from '@/app/api/document-review/route';

const documentText =
  '📄 Handover\nProject: Intake\nOwner: Ada Lovelace\nTarget: Friday\nTarget: Monday';
const fields = () => ({
  project: {
    status: 'found',
    values: ['Intake'],
    sources: [{ line: 2, quote: 'Project: Intake' }],
  },
  owner: {
    status: 'found',
    values: ['Ada Lovelace'],
    sources: [{ line: 3, quote: 'Owner: Ada Lovelace' }],
  },
  target: {
    status: 'conflict',
    values: ['Friday', 'Monday'],
    sources: [
      { line: 4, quote: 'Target: Friday' },
      { line: 5, quote: 'Target: Monday' },
    ],
  },
});
const provider = () =>
  new Response(
    JSON.stringify({
      status: 'completed',
      output: [
        { type: 'message', content: [{ type: 'output_text', text: JSON.stringify(fields()) }] },
      ],
    })
  );
const request = (body: unknown = { document: documentText }, headers = {}) =>
  new Request('http://localhost:3000/api/document-review', {
    method: 'POST',
    headers: { host: 'localhost:3000', 'content-type': 'application/json', ...headers },
    body: JSON.stringify(body),
  });
const originalFetch = global.fetch;
const originalKey = process.env.OPENAI_API_KEY;
beforeEach(() => {
  process.env.OPENAI_API_KEY = 'test-placeholder';
  global.fetch = jest.fn().mockResolvedValue(provider());
});
afterEach(() => {
  global.fetch = originalFetch;
  if (originalKey === undefined) delete process.env.OPENAI_API_KEY;
  else process.env.OPENAI_API_KEY = originalKey;
});

test('verified sources use browser offsets and preserve human review for conflicts', () => {
  const result = validateReview(documentText, fields());
  expect(result.owner.sources[0]).toMatchObject({ start: 28, end: 47 });
  expect(result.owner.value).toBe('Ada Lovelace');
  expect(result.target.value).toBeNull();
});
test.each([{ line: 2 }, { line: true }, { quote: 'invented' }, { quote: '' }])(
  'rejects false evidence %j',
  patch => {
    const payload = fields();
    Object.assign(payload.owner.sources[0]!, patch);
    expect(() => validateReview(documentText, payload)).toThrow(ReviewError);
  }
);
test.each([{ values: ['Invented'] }, { status: 'missing' }, { sources: [] }, { extra: true }])(
  'rejects unsupported field %j',
  patch => {
    const payload = fields();
    Object.assign(payload.owner, patch);
    expect(() => validateReview(documentText, payload)).toThrow(ReviewError);
  }
);
test('rejects duplicate conflict values and malformed shapes', () => {
  const payload = fields();
  payload.target.values = ['Friday', ' friday '];
  expect(() => validateReview(documentText, payload)).toThrow(ReviewError);
  expect(() => validateReview(documentText, [])).toThrow(ReviewError);
});
test('accepts missing fields and resolves repeated CRLF quotes to the cited line', () => {
  const payload = fields();
  payload.project = { status: 'missing', values: [], sources: [] };
  payload.target = { status: 'missing', values: [], sources: [] };
  payload.owner.sources[0]!.line = 2;
  const text = 'Owner: Ada Lovelace\r\nOwner: Ada Lovelace';
  const result = validateReview(text, payload);
  expect(result.owner.sources[0]!.start).toBe(21);
  expect(result.project.value).toBeNull();
});
test('keeps the existing provider contract and validates the response', async () => {
  expect((await reviewDocument(documentText)).project.value).toBe('Intake');
  const init = (global.fetch as jest.Mock).mock.calls[0]![1] as RequestInit;
  const payload = JSON.parse(init.body as string);
  expect(payload).toMatchObject({
    input: documentText,
    model: 'gpt-5-mini',
    store: false,
    reasoning: { effort: 'low' },
    text: { format: { strict: true, type: 'json_schema' } },
  });
});
test.each(['', ' ', null, 'x'.repeat(10001), '\ud800'])(
  'rejects invalid input before sending it',
  async input => {
    await expect(reviewDocument(input)).rejects.toMatchObject({ status: 400 });
    expect(global.fetch).not.toHaveBeenCalled();
  }
);
test.each([
  [401, 503],
  [403, 503],
  [429, 429],
  [500, 502],
])('sanitizes provider error %i', async (code, status) => {
  (global.fetch as jest.Mock).mockResolvedValue(new Response('private content', { status: code }));
  await expect(reviewDocument(documentText)).rejects.toMatchObject({ status });
  await expect(reviewDocument(documentText)).rejects.not.toThrow('private content');
});
test('sanitizes timeout and incomplete responses', async () => {
  (global.fetch as jest.Mock).mockRejectedValue(
    new DOMException('private content', 'TimeoutError')
  );
  await expect(reviewDocument(documentText)).rejects.toMatchObject({ status: 504 });
  (global.fetch as jest.Mock).mockResolvedValue(
    new Response(JSON.stringify({ status: 'incomplete' }))
  );
  await expect(reviewDocument(documentText)).rejects.toMatchObject({ status: 502 });
});
test('the endpoint rejects remote origins, malformed requests and oversized bodies', async () => {
  expect((await POST(request(undefined, { origin: 'https://other.example' }))).status).toBe(403);
  expect((await POST(request(undefined, { host: 'epoch.example' }))).status).toBe(403);
  expect((await POST(request(undefined, { 'content-type': 'text/plain' }))).status).toBe(415);
  expect((await POST(request({ document: 'a', extra: true }))).status).toBe(400);
  expect((await POST(request({ document: 'x'.repeat(66000) }))).status).toBe(413);
  expect(global.fetch).not.toHaveBeenCalled();
});
test('missing credentials keeps sample mode usable without a provider call', async () => {
  delete process.env.OPENAI_API_KEY;
  const get = new Request('http://localhost:3000/api/document-review', {
    headers: { host: 'localhost:3000' },
  });
  expect(await (await GET(get)).json()).toEqual({ available: false });
  expect((await POST(request())).status).toBe(503);
  expect(global.fetch).not.toHaveBeenCalled();
});
test('only one review runs at a time and the slot is released after completion', async () => {
  let resolve!: (value: Response) => void;
  (global.fetch as jest.Mock).mockImplementation(
    () =>
      new Promise<Response>(r => {
        resolve = r;
      })
  );
  const first = POST(request());
  while (!resolve) await new Promise(r => setTimeout(r, 1));
  expect((await POST(request())).status).toBe(429);
  resolve(provider());
  expect((await first).status).toBe(200);
  (global.fetch as jest.Mock).mockResolvedValue(provider());
  expect((await POST(request())).status).toBe(200);
});
