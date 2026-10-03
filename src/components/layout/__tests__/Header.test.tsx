import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '../Header';

let mockPathname = '/';
jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
}));

function primaryNav() {
  return screen.getByRole('navigation', { name: 'Main' });
}

describe('Header', () => {
  beforeEach(() => {
    mockPathname = '/';
  });

  it('links to work, services and about', () => {
    render(<Header />);
    const nav = within(primaryNav());
    expect(nav.getByRole('link', { name: 'Work' })).toHaveAttribute('href', '/clients');
    expect(nav.getByRole('link', { name: 'Services' })).toHaveAttribute('href', '/services');
    expect(nav.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
  });

  it('offers a way to start a project', () => {
    render(<Header />);
    expect(within(primaryNav()).getByRole('link', { name: 'Start a project' })).toHaveAttribute(
      'href',
      '/contact'
    );
  });

  it('marks the section the visitor is in, including detail pages', () => {
    mockPathname = '/services/ai-ml';
    render(<Header />);
    expect(within(primaryNav()).getByRole('link', { name: 'Services' })).toHaveAttribute(
      'aria-current',
      'page'
    );
    expect(within(primaryNav()).getByRole('link', { name: 'Work' })).not.toHaveAttribute(
      'aria-current'
    );
  });

  it('opens and closes the menu on small screens', async () => {
    const user = userEvent.setup();
    render(<Header />);
    const toggle = screen.getByRole('button', { name: 'Menu' });

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('navigation', { name: 'Menu' })).toBeVisible();

    await user.keyboard('{Escape}');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });
});
