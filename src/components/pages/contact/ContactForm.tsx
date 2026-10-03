/**
 * @fileoverview Project inquiry form. Validates inline, posts to /api/contact,
 * and tells the visitor exactly what happened.
 */

'use client';

import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { CONTACT } from '../../../shared/constants/contact';
import { validateContact, type ContactErrors, type RequiredContactField } from './validateContact';
import styles from '../../../../styles/ContactPage.module.css';

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

type Status = 'idle' | 'sending' | 'sent' | 'failed';
type RequiredControl = HTMLInputElement | HTMLTextAreaElement;

const EMPTY_FORM: ContactFormData = {
  name: '',
  email: '',
  company: '',
  projectType: '',
  budget: '',
  timeline: '',
  message: '',
};

const PROJECT_TYPES = [
  'AI & machine learning',
  'Generative AI',
  'Data & analytics',
  'Custom software',
  'Cloud & DevOps',
  'Something else',
] as const;
const BUDGETS = ['$25,000–$50,000', '$50,000–$100,000', '$100,000–$250,000', '$250,000+'] as const;
const TIMELINES = ['As soon as possible', '1–3 months', '3–6 months', '6+ months'] as const;

/** Order in which invalid fields receive focus. */
const REQUIRED_FIELDS: readonly RequiredContactField[] = ['name', 'email', 'message'];

async function sendInquiry(form: ContactFormData): Promise<boolean> {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    return response.ok;
  } catch (error) {
    // The visitor sees a retry message; keep the cause for debugging.
    console.error('Contact form request failed', error);
    return false;
  }
}

function errorId(field: RequiredContactField): string {
  return `contact-${field}-error`;
}

function FieldError({ field, errors }: { field: RequiredContactField; errors: ContactErrors }) {
  const message = errors[field];
  if (!message) return null;
  return (
    <p id={errorId(field)} className={styles.error}>
      {message}
    </p>
  );
}

function invalidProps(field: RequiredContactField, errors: ContactErrors) {
  return errors[field]
    ? { 'aria-invalid': true as const, 'aria-describedby': errorId(field) }
    : {};
}

interface ChoiceProps {
  readonly id: string;
  readonly name: keyof ContactFormData;
  readonly label: string;
  readonly options: readonly string[];
  readonly value: string;
  readonly onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

function Choice({ id, name, label, options, value, onChange }: ChoiceProps) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <select id={id} name={name} value={value} onChange={onChange} className={styles.select}>
        <option value="">Choose one</option>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const requiredRefs = useRef<Partial<Record<RequiredContactField, RequiredControl | null>>>({});

  const update = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm(current => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validateContact(form);
    setErrors(found);

    const firstInvalid = REQUIRED_FIELDS.find(field => found[field]);
    if (firstInvalid) {
      requiredRefs.current[firstInvalid]?.focus();
      return;
    }

    setStatus('sending');
    setStatus((await sendInquiry(form)) ? 'sent' : 'failed');
  };

  if (status === 'sent') {
    return (
      <div role="status" className={styles.confirmation}>
        <h2 className={styles.confirmationTitle}>Message sent.</h2>
        <p className={styles.confirmationBody}>
          We&apos;ll reply within 24 hours at {form.email.trim()}.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="contact-name" className={styles.label}>
            Your name <span className={styles.required}>(required)</span>
          </label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            required
            value={form.name}
            onChange={update}
            ref={element => {
              requiredRefs.current.name = element;
            }}
            className={styles.input}
            {...invalidProps('name', errors)}
          />
          <FieldError field="name" errors={errors} />
        </div>

        <div className={styles.field}>
          <label htmlFor="contact-email" className={styles.label}>
            Work email <span className={styles.required}>(required)</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={update}
            ref={element => {
              requiredRefs.current.email = element;
            }}
            className={styles.input}
            {...invalidProps('email', errors)}
          />
          <FieldError field="email" errors={errors} />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-company" className={styles.label}>
          Company
        </label>
        <input
          id="contact-company"
          name="company"
          autoComplete="organization"
          value={form.company}
          onChange={update}
          className={styles.input}
        />
      </div>

      <div className={styles.rowThree}>
        <Choice
          id="contact-project-type"
          name="projectType"
          label="Project type"
          options={PROJECT_TYPES}
          value={form.projectType}
          onChange={update}
        />
        <Choice
          id="contact-budget"
          name="budget"
          label="Budget"
          options={BUDGETS}
          value={form.budget}
          onChange={update}
        />
        <Choice
          id="contact-timeline"
          name="timeline"
          label="Timeline"
          options={TIMELINES}
          value={form.timeline}
          onChange={update}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-message" className={styles.label}>
          What are you building, and what&apos;s in the way?{' '}
          <span className={styles.required}>(required)</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          value={form.message}
          onChange={update}
          ref={element => {
            requiredRefs.current.message = element;
          }}
          className={styles.textarea}
          {...invalidProps('message', errors)}
        />
        <FieldError field="message" errors={errors} />
      </div>

      {status === 'failed' && (
        <p role="alert" className={styles.alert}>
          Your message didn&apos;t send. Try again, or email{' '}
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> directly.
        </p>
      )}

      <button type="submit" className={styles.submit} disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
