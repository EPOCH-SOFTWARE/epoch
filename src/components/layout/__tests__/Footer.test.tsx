import { render, screen } from '@testing-library/react';
import { Footer } from '../Footer';
import { SERVICES } from '../../../shared/constants/services';

describe('Footer', () => {
  it('links to every service', () => {
    render(<Footer />);
    for (const service of SERVICES) {
      expect(screen.getByRole('link', { name: service.title })).toHaveAttribute(
        'href',
        `/services/${service.id}`
      );
    }
  });

  it('only links to pages that exist', () => {
    render(<Footer />);
    const hrefs = screen.getAllByRole('link').map(link => link.getAttribute('href'));
    expect(hrefs).not.toContain('/careers');
    expect(hrefs).not.toContain('#');
  });

  it('shows how to reach EPOCH directly', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'operator@epoch.sh' })).toHaveAttribute(
      'href',
      'mailto:operator@epoch.sh'
    );
    expect(screen.getByRole('link', { name: '+1 (704) 314-5262' })).toHaveAttribute(
      'href',
      'tel:+17043145262'
    );
  });
});
