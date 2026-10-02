// Exercises the contact form in headless Chrome: an error and a focused field, then the confirmation.
import { writeFileSync } from 'node:fs';
import { launch, setViewport, open, sleep } from './cdp.mjs';

const [, , prefix, w = '1440', h = '900', scale = '1'] = process.argv;
const cdp = await launch();
const shot = async name => {
  const { data } = await cdp.send('Page.captureScreenshot', { format: 'png' });
  writeFileSync(`${prefix}-${name}.png`, Buffer.from(data, 'base64'));
  console.log('saved', `${prefix}-${name}.png`);
};
const type = async text => { for (const ch of text) await cdp.send('Input.dispatchKeyEvent', { type: 'char', text: ch }); };
const key = async (k, code) => {
  await cdp.send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: k, code, windowsVirtualKeyCode: k === 'Tab' ? 9 : 13 });
  await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: k, code, windowsVirtualKeyCode: k === 'Tab' ? 9 : 13 });
};
try {
  await setViewport(cdp, Number(w), Number(h), Number(scale));
  await open(cdp, 'http://localhost:3460/contact.html', 1500);
  await cdp.evaluate(`document.querySelector('[data-contact-form]').scrollIntoView({block: 'start'}); scrollBy(0, -110)`);
  await sleep(600);
  await cdp.evaluate(`document.getElementById('name').focus()`);
  await type('Ada Lovelace');
  await key('Tab', 'Tab');
  await type('ada@company');
  await key('Tab', 'Tab');
  await sleep(400);
  const state = await cdp.evaluate(`({ active: document.activeElement.id, emailInvalid: document.getElementById('email').getAttribute('aria-invalid'), error: document.getElementById('email-error').textContent })`);
  console.log(JSON.stringify(state));
  await shot('error');
  // Submit with the message missing: focus goes to the first field that needs fixing.
  await cdp.evaluate(`document.querySelector('[data-contact-form] button[type=submit]').click()`);
  await sleep(400);
  console.log(JSON.stringify(await cdp.evaluate(`({ active: document.activeElement.id, errors: [...document.querySelectorAll('.error:not([hidden])')].map(e => e.textContent) })`)));
  // Fix the email: the message clears as soon as it is right.
  await cdp.evaluate(`document.getElementById('email').focus()`);
  await type('.com');
  await sleep(200);
  console.log(JSON.stringify(await cdp.evaluate(`({ emailInvalid: document.getElementById('email').getAttribute('aria-invalid'), emailErrorHidden: document.getElementById('email-error').hidden })`)));
  await cdp.evaluate(`document.getElementById('message').focus()`);
  await type('We want to put an AI claims assistant into production.');
  await cdp.evaluate(`document.querySelector('[data-contact-form] button[type=submit]').click()`);
  await sleep(600);
  console.log(JSON.stringify(await cdp.evaluate(`({ active: document.activeElement.textContent, formHidden: document.querySelector('[data-contact-form]').hidden, text: document.querySelector('[data-done-text]').textContent })`)));
  await cdp.evaluate(`document.querySelector('[data-form-done]').scrollIntoView({block: 'center'})`);
  await sleep(300);
  await shot('sent');
  await cdp.evaluate(`document.querySelector('[data-form-again]').click()`);
  await sleep(200);
  console.log(JSON.stringify(await cdp.evaluate(`({ active: document.activeElement.id, formHidden: document.querySelector('[data-contact-form]').hidden, name: document.getElementById('name').value })`)));
} finally {
  await cdp.close();
}
