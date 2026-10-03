import { isRecord, reviewDocument, ReviewError } from '@/src/night/server/document-review';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
let reviewing = false;
function json(payload: unknown, status = 200): Response {
  return Response.json(payload, { status, headers: { 'Cache-Control': 'no-store' } });
}
function localRequest(request: Request): boolean {
  const url = new URL(request.url);
  const host = request.headers.get('host');
  const origin = request.headers.get('origin');
  const hosts = [
    `localhost${url.port ? ':' + url.port : ''}`,
    `127.0.0.1${url.port ? ':' + url.port : ''}`,
  ];
  return host !== null && hosts.includes(host) && (origin === null || origin === `http://${host}`);
}
export async function GET(request: Request): Promise<Response> {
  if (!localRequest(request))
    return json({ error: 'Use the local prototype to review a document.' }, 403);
  return json({ available: !!process.env.OPENAI_API_KEY?.trim() });
}
async function readBody(request: Request): Promise<unknown> {
  // Count streamed bytes too, so chunked requests cannot bypass the existing limit.
  const reader = request.body?.getReader();
  if (!reader) throw new ReviewError('The document request is too large or empty.', 413);
  let length = 0;
  const decoder = new TextDecoder('utf-8', { fatal: true });
  let text = '';
  try {
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      length += part.value.byteLength;
      if (length > 65536) {
        await reader.cancel();
        throw new ReviewError('The document request is too large or empty.', 413);
      }
      text += decoder.decode(part.value, { stream: true });
    }
    if (!length) throw new ReviewError('The document request is too large or empty.', 413);
    return JSON.parse(text + decoder.decode()) as unknown;
  } catch (error) {
    if (error instanceof ReviewError) throw error;
    throw new ReviewError('The document request could not be read.', 400);
  } finally {
    reader.releaseLock();
  }
}
export async function POST(request: Request): Promise<Response> {
  if (!localRequest(request))
    return json({ error: 'Use the local prototype to review a document.' }, 403);
  if (request.headers.get('content-type')?.split(';')[0]?.trim() !== 'application/json')
    return json({ error: 'Send the document as JSON.' }, 415);
  let payload: unknown;
  try {
    payload = await readBody(request);
  } catch (error) {
    if (error instanceof ReviewError) return json({ error: error.message }, error.status);
    return json({ error: 'The document request could not be read.' }, 400);
  }
  if (
    !isRecord(payload) ||
    Object.keys(payload).length !== 1 ||
    !Object.hasOwn(payload, 'document')
  )
    return json({ error: 'Include one document to review.' }, 400);
  if (reviewing)
    return json({ error: 'A review is already running. Please try again shortly.' }, 429);
  reviewing = true;
  try {
    return json({ fields: await reviewDocument(payload.document) });
  } catch (error) {
    if (error instanceof ReviewError) return json({ error: error.message }, error.status);
    return json({ error: 'AI review could not connect. Please try again.' }, 502);
  } finally {
    reviewing = false;
  }
}
