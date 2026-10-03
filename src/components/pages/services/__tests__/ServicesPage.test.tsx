import { render, screen } from '@testing-library/react';
import ServicesPage from '..';
import { RETIRED_SERVICE_IDS, SERVICES } from '../../../../shared/constants/services';

describe('ServicesPage', () => {
  it('opens with what EPOCH builds', () => {
    render(<ServicesPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'AI, and everything it stands on.'
    );
  });

  it('groups services into the AI tier and the engineering tier', () => {
    render(<ServicesPage />);
    const tierHeadings = screen
      .getAllByRole('heading', { level: 2 })
      .map(heading => heading.textContent);
    expect(tierHeadings).toEqual(expect.arrayContaining(['AI', 'Engineering that makes AI real']));
    expect(tierHeadings.indexOf('AI')).toBeLessThan(
      tierHeadings.indexOf('Engineering that makes AI real')
    );
  });

  it('links to every service detail page', () => {
    render(<ServicesPage />);
    const hrefs = screen.getAllByRole('link').map(link => link.getAttribute('href'));
    for (const service of SERVICES) {
      expect(hrefs).toContain(`/services/${service.id}`);
    }
  });

  it('never links to services EPOCH no longer offers', () => {
    render(<ServicesPage />);
    const hrefs = screen.getAllByRole('link').map(link => link.getAttribute('href'));
    for (const id of RETIRED_SERVICE_IDS) {
      expect(hrefs).not.toContain(`/services/${id}`);
    }
  });
});
