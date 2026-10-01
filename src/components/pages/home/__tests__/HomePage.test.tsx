import { render, screen, within } from '@testing-library/react';
import HomePage from '..';
import { servicesInTier } from '../../../../shared/constants/services';

describe('HomePage', () => {
  beforeEach(() => {
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 0);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('leads with the commitment', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'All in. Every project. Every time.'
    );
  });

  it('says plainly that EPOCH builds AI systems', () => {
    render(<HomePage />);
    expect(screen.getByText(/EPOCH builds AI systems/)).toBeInTheDocument();
  });

  it('offers starting a project and seeing the work', () => {
    render(<HomePage />);
    const hero = screen.getByRole('region', { name: 'All in. Every project. Every time.' });
    expect(within(hero).getByRole('link', { name: 'Start a project' })).toHaveAttribute(
      'href',
      '/contact'
    );
    expect(within(hero).getByRole('link', { name: 'See the work' })).toHaveAttribute(
      'href',
      '/clients'
    );
  });

  it('shows the clients who trust EPOCH, marquee clients first', () => {
    render(<HomePage />);
    const clients = within(screen.getByRole('list', { name: 'Clients' })).getAllByRole('listitem');
    expect(clients.slice(0, 3).map(item => item.textContent || item.querySelector('img')?.alt)).toEqual([
      'HUB International',
      'OneSix AI',
      'Inspira Financial',
    ]);
  });

  it('explains what an epoch is', () => {
    render(<HomePage />);
    expect(screen.getByText(/one complete pass through every example/)).toBeInTheDocument();
  });

  it('makes three commitments a client can hold EPOCH to', () => {
    render(<HomePage />);
    const commitments = screen.getByRole('region', { name: 'What you can hold us to' });
    expect(within(commitments).getAllByRole('heading', { level: 3 })).toHaveLength(3);
  });

  it('links to every AI service', () => {
    render(<HomePage />);
    for (const service of servicesInTier('ai')) {
      expect(screen.getByRole('link', { name: new RegExp(service.title) })).toHaveAttribute(
        'href',
        `/services/${service.id}`
      );
    }
  });

  it('links to the case studies', () => {
    render(<HomePage />);
    const work = screen.getByRole('region', { name: 'Selected work' });
    const hrefs = within(work).getAllByRole('link').map(link => link.getAttribute('href'));
    expect(hrefs).toEqual(
      expect.arrayContaining(['/clients/hub-international', '/clients/inspira-financial'])
    );
  });

  it('closes with an invitation to bring the project that matters most', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('heading', { name: 'Bring us the project that matters most.' })
    ).toBeInTheDocument();
  });
});
