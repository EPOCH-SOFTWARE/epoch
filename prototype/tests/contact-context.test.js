const test = require('node:test');
const assert = require('node:assert/strict');
const { contactContext } = require('../assets/js/kept-time.js');
const services = [
  { id: 'generative-ai', title: 'Generative AI' },
  { id: 'custom-software', title: 'Custom Software' },
];
const goals = [{ id: 'automate', title: 'Automate a workflow', service: 'generative-ai' }];

test('contactContext carries a known service into the project enquiry', () => {
  assert.deepEqual(contactContext('?service=custom-software', services, goals), {
    label: 'Custom Software',
    service: 'custom-software',
    goal: null,
  });
});
test('contactContext carries an intent and its service without generating message text', () => {
  assert.deepEqual(contactContext('?goal=automate', services, goals), {
    label: 'Automate a workflow',
    service: 'generative-ai',
    goal: 'automate',
  });
});
test('contactContext ignores unknown, empty and untrusted query values', () => {
  for (const query of [
    '',
    '?service=',
    '?goal=nope',
    '?service=%3Cscript%3E',
    '?service=__proto__',
    '?message=Injected',
  ]) {
    assert.equal(contactContext(query, services, goals), null);
  }
});
test('contactContext prefers a valid goal and falls back to a valid service', () => {
  assert.equal(
    contactContext('?goal=automate&service=custom-software', services, goals).service,
    'generative-ai'
  );
  assert.equal(
    contactContext('?goal=unknown&service=custom-software', services, goals).service,
    'custom-software'
  );
});
test('contactContext rejects a goal whose service no longer exists', () => {
  assert.equal(contactContext('?goal=automate', [], goals), null);
});
