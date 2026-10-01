import { validateContact } from '../validateContact';

const VALID = {
  name: 'Ada Lovelace',
  email: 'ada@company.com',
  message: 'We need a claims triage model.',
};

describe('validateContact', () => {
  it('accepts a complete inquiry', () => {
    expect(validateContact(VALID)).toEqual({});
  });

  it('asks for a name', () => {
    expect(validateContact({ ...VALID, name: '  ' }).name).toBe('Enter your name.');
  });

  it('asks for an email address', () => {
    expect(validateContact({ ...VALID, email: '' }).email).toBe('Enter your email address.');
  });

  it('rejects a malformed email address', () => {
    expect(validateContact({ ...VALID, email: 'ada@company' }).email).toBe(
      'Enter an email address like name@company.com.'
    );
  });

  it('asks about the project', () => {
    expect(validateContact({ ...VALID, message: '' }).message).toBe(
      'Tell us a little about the project.'
    );
  });
});
