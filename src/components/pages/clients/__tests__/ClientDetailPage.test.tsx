import { render, screen, within } from '@testing-library/react';
import { ClientDetailPage } from '../detail';
import { findCaseStudy } from '../../../../shared/constants/clientData';
import type { CaseStudy } from '../../../../shared/types';

function hub(): CaseStudy {
  const study = findCaseStudy('hub-international');
  if (!study) throw new Error('HUB International case study is missing');
  return study;
}

describe('ClientDetailPage', () => {
  it('leads with what EPOCH built', () => {
    render(<ClientDetailPage study={hub()} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(hub().headline);
  });

  it('links back to all work', () => {
    render(<ClientDetailPage study={hub()} />);
    expect(screen.getByRole('link', { name: 'All work' })).toHaveAttribute('href', '/clients');
  });

  it('leaves out the testimonial until there is a real one', () => {
    const { container } = render(<ClientDetailPage study={hub()} />);
    expect(container.querySelector('blockquote')).toBeNull();
  });

  it('shows a testimonial with its attribution when one exists', () => {
    const study: CaseStudy = {
      ...hub(),
      testimonial: {
        quote: 'They stayed with us until it worked.',
        author: 'Jordan Lee',
        position: 'VP Operations, HUB International',
      },
    };
    render(<ClientDetailPage study={study} />);
    expect(screen.getByText('They stayed with us until it worked.').closest('blockquote')).not.toBeNull();
    expect(screen.getByText(/Jordan Lee/)).toBeInTheDocument();
    expect(screen.getByText(/VP Operations, HUB International/)).toBeInTheDocument();
  });

  it('lists one outcome row per measured area', () => {
    render(<ClientDetailPage study={hub()} />);
    const table = screen.getByRole('table', { name: 'Outcomes for HUB International' });
    const [, body] = within(table).getAllByRole('rowgroup');
    expect(within(body as HTMLElement).getAllByRole('row')).toHaveLength(
      hub().quantifiableResults.length
    );
  });

  it('links to the services behind the work', () => {
    render(<ClientDetailPage study={hub()} />);
    const related = screen.getByRole('region', { name: 'Related services' });
    const hrefs = within(related)
      .getAllByRole('link')
      .map(link => link.getAttribute('href'));
    expect(hrefs).toEqual(['/services/ai-ml', '/services/custom-software', '/services/data-analytics']);
  });

  it('skips related services that are no longer offered', () => {
    const study: CaseStudy = { ...hub(), relatedServices: ['ai-ml', 'blockchain'] };
    render(<ClientDetailPage study={study} />);
    const related = screen.getByRole('region', { name: 'Related services' });
    expect(within(related).getAllByRole('link')).toHaveLength(1);
  });

  it('owns up to where it got hard', () => {
    render(<ClientDetailPage study={hub()} />);
    const hard = screen.getByRole('region', { name: 'Where it got hard' });
    expect(within(hard).getAllByRole('listitem')).toHaveLength(hub().challengesOvercome.length);
  });
});
