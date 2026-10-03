'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { reviewBrief } = require('../assets/js/kept-time.js');

test('reviewBrief extracts labelled fields and cites their exact source lines', () => {
  const text = 'Handover notes\n  PROJECT : Document review\nOwner: Ada Lovelace\nTarget date: 30 October';
  const result = reviewBrief(text);
  assert.equal(result.project.value, 'Document review');
  assert.equal(result.owner.value, 'Ada Lovelace');
  assert.equal(result.target.value, '30 October');
  assert.deepEqual(result.project.sources, [{ line: 2, quote: '  PROJECT : Document review', start: 15, end: 42 }]);
});

test('reviewBrief accepts aliases, CRLF and spacing without losing source offsets', () => {
  const text = 'Notes\r\nrequest: Intake review\r\nlead: Ada Lovelace\r\ndue: Friday';
  const result = reviewBrief(text);
  assert.equal(result.project.value, 'Intake review');
  assert.equal(result.owner.status, 'found');
  const source = result.target.sources[0];
  assert.equal(text.slice(source.start, source.end), source.quote);
  assert.equal(source.line, 4);
});

test('reviewBrief keeps conflicting values and all their sources for human review', () => {
  const result = reviewBrief('Target: 30 October\nTarget date: 6 November');
  assert.equal(result.target.status, 'conflict');
  assert.equal(result.target.value, null);
  assert.deepEqual(result.target.values, ['30 October', '6 November']);
  assert.deepEqual(result.target.sources.map(source => source.line), [1, 2]);
});

test('reviewBrief does not mistake repeated identical evidence for a conflict', () => {
  const result = reviewBrief('Owner: Ada Lovelace\nLead: ada   lovelace');
  assert.equal(result.owner.status, 'found');
  assert.equal(result.owner.sources.length, 2);
});

test('reviewBrief never guesses an absent field from narrative text', () => {
  const result = reviewBrief('Ada Lovelace may own this. We discussed Friday.');
  for (const field of Object.values(result)) {
    assert.equal(field.status, 'missing');
    assert.equal(field.value, null);
  }
});

test('reviewBrief treats unconfirmed or blank values as needing review', () => {
  for (const value of ['', 'TBD', 'pending', 'not confirmed', 'unknown', '?']) {
    assert.equal(reviewBrief('Owner: ' + value).owner.status, 'missing');
  }
});

test('reviewBrief preserves uncertainty beside a confirmed value', () => {
  const result = reviewBrief('Owner: Ada Lovelace\nOwner: TBD');
  assert.equal(result.owner.status, 'conflict');
  assert.equal(result.owner.sources.length, 2);
});

test('reviewBrief returns plain source text, including markup, without interpreting it', () => {
  const result = reviewBrief('Project: <img src=x onerror=alert(1)>');
  assert.equal(result.project.value, '<img src=x onerror=alert(1)>');
});

test('reviewBrief handles empty input and rejects oversized documents explicitly', () => {
  assert.equal(reviewBrief('').owner.status, 'missing');
  assert.throws(() => reviewBrief('x'.repeat(10001)), /10,000/);
});
