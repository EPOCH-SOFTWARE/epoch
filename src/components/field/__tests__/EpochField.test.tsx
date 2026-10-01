import { render, screen } from '@testing-library/react';
import { EpochField } from '../EpochField';

function setReducedMotion(reduce: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: (query: string) => ({
      matches: query.includes('prefers-reduced-motion') ? reduce : false,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    }),
  });
}

describe('EpochField', () => {
  let rafSpy: jest.SpyInstance;

  beforeEach(() => {
    rafSpy = jest.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 0);
  });

  afterEach(() => {
    rafSpy.mockRestore();
  });

  it('is decorative, so assistive tech skips it', () => {
    setReducedMotion(false);
    const { container } = render(<EpochField />);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('shows the current epoch and loss', () => {
    setReducedMotion(false);
    render(<EpochField />);
    expect(screen.getByText('0001')).toBeInTheDocument();
    expect(screen.getByText('2.162')).toBeInTheDocument();
  });

  it('animates the training pass', () => {
    setReducedMotion(false);
    render(<EpochField />);
    expect(rafSpy).toHaveBeenCalled();
  });

  it('holds still for visitors who prefer reduced motion', () => {
    setReducedMotion(true);
    render(<EpochField />);
    expect(rafSpy).not.toHaveBeenCalled();
  });
});
