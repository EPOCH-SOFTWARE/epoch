import { render, screen, within } from '@testing-library/react';
import { ServiceDetailPage } from '../detail';
import { SERVICE_DETAIL_DATA } from '../../../../shared/constants/serviceData';
import { findService } from '../../../../shared/constants/services';

const service = SERVICE_DETAIL_DATA['ai-ml'];
const summary = findService('ai-ml');

function renderPage() {
  if (!summary) throw new Error('ai-ml is missing from the service catalog');
  return render(<ServiceDetailPage service={service} summary={summary} />);
}

describe('ServiceDetailPage', () => {
  it('names the service in the page heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('AI & Machine Learning');
  });

  it('links back to all services', () => {
    renderPage();
    expect(screen.getAllByRole('link', { name: 'All services' })[0]).toHaveAttribute(
      'href',
      '/services'
    );
  });

  it('lists every pain point', () => {
    renderPage();
    for (const painPoint of service.problemStatement.painPoints) {
      expect(screen.getByText(painPoint)).toBeInTheDocument();
    }
  });

  it('shows the process steps in order inside an ordered list', () => {
    renderPage();
    const heading = screen.getByRole('heading', { level: 2, name: service.process.title });
    const section = heading.closest('section');
    if (!section) throw new Error('process heading is not inside a section');
    const list = within(section).getByRole('list');
    expect(list.tagName).toBe('OL');
    const titles = within(list)
      .getAllByRole('heading', { level: 3 })
      .map(step => step.textContent);
    expect(titles).toEqual(service.process.steps.map(step => step.title));
  });

  it('puts each FAQ question in an expandable summary', () => {
    renderPage();
    const groups = screen.getAllByRole('group');
    const questions = groups.map(group => group.querySelector('summary')?.textContent);
    expect(questions).toEqual(service.faqs.map(faq => faq.question));
    for (const group of groups) {
      expect(group.tagName).toBe('DETAILS');
    }
  });

  it('invites the visitor to get in touch', () => {
    renderPage();
    const ctas = screen.getAllByRole('link', { name: service.ctaButtonText });
    for (const cta of ctas) {
      expect(cta).toHaveAttribute('href', '/contact');
    }
    expect(screen.getByRole('heading', { level: 2, name: service.ctaTitle })).toBeInTheDocument();
  });

  it('leaves out demand badges', () => {
    renderPage();
    expect(screen.queryByText('High Demand')).not.toBeInTheDocument();
  });
});
