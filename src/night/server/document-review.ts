import { INSTRUCTIONS } from './review-instructions';
import casefold from './casefold.json';

const FIELDS = ['project', 'owner', 'target'] as const;
type FieldName = (typeof FIELDS)[number];
type Source = { line: number; quote: string; start: number; end: number };
type Field = {
  status: 'found' | 'missing' | 'conflict';
  value: string | null;
  values: string[];
  sources: Source[];
};
const SOURCE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: { line: { type: 'integer' }, quote: { type: 'string' } },
  required: ['line', 'quote'],
};
const FIELD_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    status: { type: 'string', enum: ['found', 'missing', 'conflict'] },
    values: { type: 'array', items: { type: 'string' } },
    sources: { type: 'array', items: SOURCE_SCHEMA },
  },
  required: ['status', 'values', 'sources'],
};
const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: Object.fromEntries(FIELDS.map(key => [key, FIELD_SCHEMA])),
  required: FIELDS,
};
export class ReviewError extends Error {
  constructor(
    message: string,
    public status = 502
  ) {
    super(message);
  }
}
export function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
function exactKeys(value: unknown, keys: readonly string[]): value is Record<string, unknown> {
  return (
    isRecord(value) &&
    Object.keys(value).length === keys.length &&
    keys.every(key => Object.hasOwn(value, key))
  );
}
function invalidEvidence(): ReviewError {
  return new ReviewError(
    'The AI response could not be matched to the document. Please try again or use the sample preview.'
  );
}
function normalize(value: string): string {
  const substitutions: Record<string, string> = casefold;
  return Array.from(value, character => substitutions[character] ?? character.toLowerCase())
    .join('')
    .trim();
}
export function validateReview(document: string, payload: unknown): Record<FieldName, Field> {
  if (!exactKeys(payload, FIELDS)) throw invalidEvidence();
  const lines = document.split('\n');
  let offset = 0;
  const offsets = lines.map(line => {
    const start = offset;
    offset += line.length + 1;
    return start;
  });
  const fields = {} as Record<FieldName, Field>;
  for (const key of FIELDS) {
    const field = payload[key];
    if (!exactKeys(field, ['status', 'values', 'sources'])) throw invalidEvidence();
    const { status, values, sources } = field;
    if (
      (status !== 'found' && status !== 'missing' && status !== 'conflict') ||
      !Array.isArray(values) ||
      !Array.isArray(sources)
    )
      throw invalidEvidence();
    if (
      !values.every(
        (value: unknown): value is string => typeof value === 'string' && !!value.trim()
      )
    )
      throw invalidEvidence();
    if (
      new Set(values.map(normalize)).size !== values.length ||
      (status === 'found' && values.length !== 1) ||
      (status === 'missing' && values.length !== 0) ||
      (status === 'conflict' && values.length < 2)
    )
      throw invalidEvidence();
    const verified = sources.map((source: unknown): Source => {
      if (!exactKeys(source, ['line', 'quote'])) throw invalidEvidence();
      const { line, quote } = source;
      if (
        typeof line !== 'number' ||
        !Number.isInteger(line) ||
        line < 1 ||
        line > lines.length ||
        typeof quote !== 'string' ||
        !quote.trim() ||
        quote.includes('\n') ||
        !lines[line - 1]!.includes(quote)
      )
        throw invalidEvidence();
      const start = offsets[line - 1]! + lines[line - 1]!.indexOf(quote);
      return { line, quote, start, end: start + quote.length };
    });
    if (values.some(value => !verified.some(source => source.quote.includes(value))))
      throw invalidEvidence();
    fields[key] = {
      status,
      value: status === 'found' ? values[0]! : null,
      values,
      sources: verified,
    };
  }
  return fields;
}
function outputText(response: unknown): string {
  if (!isRecord(response) || response.status !== 'completed' || !Array.isArray(response.output))
    return '';
  return response.output
    .flatMap((item: unknown) => {
      if (!isRecord(item) || item.type !== 'message' || !Array.isArray(item.content)) return [];
      return item.content.flatMap((part: unknown) =>
        isRecord(part) && part.type === 'output_text' && typeof part.text === 'string'
          ? [part.text]
          : []
      );
    })
    .join('');
}
export async function reviewDocument(document: unknown): Promise<Record<FieldName, Field>> {
  if (typeof document !== 'string' || !document.trim() || Array.from(document).length > 10000)
    throw new ReviewError('Enter a document between 1 and 10,000 characters.', 400);
  if (
    Array.from(document).some(
      character => character.length === 1 && /[\uD800-\uDFFF]/.test(character)
    )
  )
    throw new ReviewError('The document contains an invalid text character.', 400);
  const key = process.env.OPENAI_API_KEY?.trim();
  if (!key)
    throw new ReviewError(
      'AI review is not connected on this server yet. You can still explore the sample preview.',
      503
    );
  let response: Response;
  try {
    response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      signal: AbortSignal.timeout(45000),
      cache: 'no-store',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-5-mini',
        instructions: INSTRUCTIONS,
        input: document,
        store: false,
        reasoning: { effort: 'low' },
        max_output_tokens: 3000,
        text: {
          format: { type: 'json_schema', name: 'document_review', strict: true, schema: SCHEMA },
        },
      }),
    });
  } catch (error) {
    if (isRecord(error) && (error.name === 'TimeoutError' || error.name === 'AbortError'))
      throw new ReviewError('AI review took too long. Please try again.', 504);
    throw new ReviewError('AI review could not connect. Please try again.', 502);
  }
  if (response.status === 429)
    throw new ReviewError('AI review has reached its usage limit. Please try again later.', 429);
  if (response.status === 401 || response.status === 403)
    throw new ReviewError(
      'AI review needs its server connection checked. Please use the sample preview for now.',
      503
    );
  if (!response.ok) throw new ReviewError('AI review could not connect. Please try again.', 502);
  let raw: unknown;
  try {
    raw = await response.json();
  } catch {
    throw invalidEvidence();
  }
  const text = outputText(raw);
  if (!text)
    throw new ReviewError('The AI could not complete this review. Try a shorter project brief.');
  let payload: unknown;
  try {
    payload = JSON.parse(text);
  } catch {
    throw invalidEvidence();
  }
  return validateReview(document, payload);
}
