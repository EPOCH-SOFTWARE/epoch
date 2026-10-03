import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from '../ContactForm';

const fetchMock = jest.fn();

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/Your name/), 'Ada Lovelace');
  await user.type(screen.getByLabelText(/Work email/), 'ada@company.com');
  await user.type(screen.getByLabelText(/Company/), 'Analytical Engines');
  await user.selectOptions(screen.getByLabelText(/Project type/), 'Generative AI');
  await user.selectOptions(screen.getByLabelText(/Budget/), '$50,000–$100,000');
  await user.selectOptions(screen.getByLabelText(/Timeline/), '1–3 months');
  await user.type(screen.getByLabelText(/What are you building/), 'A claims triage model.');
}

describe('ContactForm', () => {
  beforeEach(() => {
    fetchMock.mockReset();
    global.fetch = fetchMock;
  });

  it('shows what is missing instead of sending an empty inquiry', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(screen.getByRole('button', { name: 'Send message' }));

    expect(screen.getByText('Enter your name.')).toBeInTheDocument();
    expect(screen.getByText('Enter your email address.')).toBeInTheDocument();
    expect(screen.getByText('Tell us a little about the project.')).toBeInTheDocument();
    expect(screen.getByLabelText(/Your name/)).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByLabelText(/Your name/)).toHaveFocus();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('flags a malformed email address', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByLabelText(/Work email/), 'ada@company');
    await user.click(screen.getByRole('button', { name: 'Send message' }));

    expect(screen.getByText('Enter an email address like name@company.com.')).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('sends the inquiry to the contact endpoint', async () => {
    fetchMock.mockResolvedValue({ ok: true });
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: 'Send message' }));

    expect(fetchMock).toHaveBeenCalledWith(
      '/api/contact',
      expect.objectContaining({ method: 'POST' })
    );
    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(JSON.parse(init.body as string)).toEqual({
      name: 'Ada Lovelace',
      email: 'ada@company.com',
      company: 'Analytical Engines',
      projectType: 'Generative AI',
      budget: '$50,000–$100,000',
      timeline: '1–3 months',
      message: 'A claims triage model.',
    });
  });

  it('confirms once the message is sent', async () => {
    fetchMock.mockResolvedValue({ ok: true });
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: 'Send message' }));

    const status = await screen.findByRole('status');
    expect(status).toHaveTextContent('Message sent.');
    expect(status).toHaveTextContent("We'll reply within 24 hours at ada@company.com.");
  });

  it('keeps the message and explains what to do when the server rejects it', async () => {
    fetchMock.mockResolvedValue({ ok: false });
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: 'Send message' }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      "Your message didn't send. Try again, or email operator@epoch.sh directly."
    );
    expect(screen.getByLabelText(/What are you building/)).toHaveValue('A claims triage model.');
  });

  it('explains what to do when the network fails', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    fetchMock.mockRejectedValue(new Error('offline'));
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: 'Send message' }));

    expect(await screen.findByRole('alert')).toHaveTextContent("Your message didn't send.");
    expect(consoleError).toHaveBeenCalledWith('Contact form request failed', expect.any(Error));
    consoleError.mockRestore();
  });
});
