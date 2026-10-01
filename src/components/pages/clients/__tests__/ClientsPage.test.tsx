import { render, screen, within } from '@testing-library/react';
import ClientsPage from '..';
import { CLIENT_LOGOS } from '../../../../shared/constants/content';

describe('ClientsPage', () => {
  it('leads with the work', () => {
    render(<ClientsPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Work that had to hold up.'
    );
  });

  it('links to both case studies', () => {
    render(<ClientsPage />);
    const studies = screen.getByRole('region', { name: 'Case studies' });
    const hrefs = within(studies)
      .getAllByRole('link')
      .map(link => link.getAttribute('href'));
    expect(hrefs).toEqual(
      expect.arrayContaining(['/clients/hub-international', '/clients/inspira-financial'])
    );
  });

  it('shows every client, including OneSix AI', () => {
    render(<ClientsPage />);
    const items = within(screen.getByRole('list', { name: 'Clients' })).getAllByRole('listitem');
    const names = items.map(item => item.textContent || item.querySelector('img')?.alt);
    expect(names).toContain('OneSix AI');
    expect(names).toEqual(CLIENT_LOGOS.map(client => client.name));
  });
});
