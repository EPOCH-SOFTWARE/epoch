import { render, screen, within } from '@testing-library/react';
import AboutPage from '..';
import techStackData from '../../../../data/techStackData.json';

describe('AboutPage', () => {
  it('leads with the conviction', () => {
    render(<AboutPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent("We don't do half-in.");
  });

  it('never shows placeholder copy', () => {
    const { container } = render(<AboutPage />);
    expect(container.textContent).not.toMatch(/\[/);
  });

  it('states four beliefs', () => {
    render(<AboutPage />);
    const beliefs = screen.getByRole('region', { name: 'What we believe' });
    expect(within(beliefs).getAllByRole('heading', { level: 3 })).toHaveLength(4);
  });

  it('walks through an engagement in four ordered steps', () => {
    render(<AboutPage />);
    const process = screen.getByRole('region', { name: 'How an engagement runs' });
    const steps = within(within(process).getByRole('list')).getAllByRole('listitem');
    expect(steps).toHaveLength(4);
    expect(within(process).getByRole('list').tagName).toBe('OL');
  });

  it('shows both offices with directions', () => {
    render(<AboutPage />);
    const offices = screen.getByRole('region', { name: 'Where we are' });
    expect(within(offices).getByRole('heading', { name: 'Charlotte, NC' })).toBeInTheDocument();
    expect(within(offices).getByRole('heading', { name: 'Ahmedabad, India' })).toBeInTheDocument();
    expect(within(offices).getAllByRole('link', { name: 'Get directions' })).toHaveLength(2);
  });

  it('lists every technology category', () => {
    render(<AboutPage />);
    const stack = screen.getByRole('region', { name: 'What we build with' });
    for (const category of techStackData.techStack) {
      expect(within(stack).getByRole('heading', { name: category.category })).toBeInTheDocument();
    }
  });
});
