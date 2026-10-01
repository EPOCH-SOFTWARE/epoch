/**
 * @fileoverview Client-side checks for the contact form, matching what the API requires.
 */

export type RequiredContactField = 'name' | 'email' | 'message';

export type ContactErrors = Partial<Record<RequiredContactField, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(data: Record<RequiredContactField, string>): ContactErrors {
  const errors: ContactErrors = {};

  if (!data.name.trim()) errors.name = 'Enter your name.';

  const email = data.email.trim();
  if (!email) errors.email = 'Enter your email address.';
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Enter an email address like name@company.com.';

  if (!data.message.trim()) errors.message = 'Tell us a little about the project.';

  return errors;
}
