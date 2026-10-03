import { render, screen } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import { DATA } from '../data';
import { Header, Footer } from '../Chrome';
import { ServiceDetail } from '../pages/ServiceDetail';
import { CaseDetail } from '../pages/CaseDetail';
import { articleSlug, readingTime } from '../articles';
import { ARTICLES } from '../content';

jest.mock('../Runtime', () => ({ Runtime: () => null }));

test('the port preserves the approved catalogue with the sourced client logos', () => {
  const source = readFileSync('prototype/assets/js/data.js', 'utf8');
  const baseline = JSON.parse(source.split('window.EPOCH_DATA = ')[1]!.trim().replace(/;$/, ''));
  // The prototype stays frozen; these two official assets were approved after the port.
  baseline.clients.find((client: { id: string }) => client.id === 'hub-international').logo =
    '/logos/hub-logo.png';
  baseline.clients.find((client: { id: string }) => client.id === 'onesix-ai').logo =
    '/logos/onesix.avif';
  baseline.caseStudies.find((study: { id: string }) => study.id === 'hub-international').logo =
    '/logos/hub-logo.png';
  expect(DATA).toEqual(baseline);
});
test('the shared navigation preserves the current section and a visible project link', () => {
  render(<Header page="case" />);
  expect(
    screen.getByRole('navigation', { name: 'Main' }).querySelector('[aria-current="page"]')
  ).toHaveAttribute('href', '/work');
  expect(screen.getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded', 'false');
  expect(screen.getAllByText('Start a project')[0]).toHaveAttribute('href', '/contact');
});
test('the footer retains all nine services and both direct contact links', () => {
  render(<Footer />);
  for (const item of DATA.services)
    expect(screen.getByRole('link', { name: item.title })).toHaveAttribute(
      'href',
      `/services/${item.id}`
    );
  expect(screen.getByRole('link', { name: DATA.contact.email })).toHaveAttribute(
    'href',
    `mailto:${DATA.contact.email}`
  );
});
test('service content is server rendered with the contextual enquiry and complete FAQs', () => {
  render(<ServiceDetail id="generative-ai" />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Generative AI');
  expect(screen.getAllByRole('link', { name: 'Start a project' })[0]).toHaveAttribute(
    'href',
    '/contact?service=generative-ai'
  );
  expect(document.querySelectorAll('.faq details')).toHaveLength(
    DATA.serviceDetails['generative-ai']!.faqs.length
  );
});
test('case content includes the existing facts and the exact engagement dial', () => {
  render(<CaseDetail id="hub-international" />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    DATA.caseStudies[0]!.headline
  );
  expect(document.querySelector('.dial-arc')).toHaveAttribute('pathLength', '1');
  expect(document.querySelectorAll('.dial-ticks line')).toHaveLength(12);
});
test('article links retain stable heading fragments and reading times', () => {
  expect(articleSlug('There’s no baseline to beat')).toBe('theres-no-baseline-to-beat');
  expect(readingTime(ARTICLES[0]!)).toBeGreaterThan(1);
});
