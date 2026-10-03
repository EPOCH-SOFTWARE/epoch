import { render, screen } from '@testing-library/react';
import ContactPage from '..';

describe('ContactPage', () => {
  it('invites the visitor to start a project', () => {
    render(<ContactPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Start a project.');
  });

  it('offers direct email and phone', () => {
    render(<ContactPage />);
    expect(screen.getByRole('link', { name: 'operator@epoch.sh' })).toHaveAttribute(
      'href',
      'mailto:operator@epoch.sh'
    );
    expect(screen.getByRole('link', { name: '+1 (704) 314-5262' })).toHaveAttribute(
      'href',
      'tel:+17043145262'
    );
  });

  it('shows both offices with directions', () => {
    render(<ContactPage />);
    expect(screen.getAllByRole('link', { name: 'Get directions' })).toHaveLength(2);
  });

  it('includes the inquiry form', () => {
    render(<ContactPage />);
    expect(screen.getByRole('button', { name: 'Send message' })).toBeInTheDocument();
  });
});
