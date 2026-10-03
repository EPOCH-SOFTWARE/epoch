/**
 * @fileoverview Service catalog: what EPOCH offers, grouped AI-first.
 * Detail page content lives in serviceData.ts, keyed by the same ids.
 */

import type { ServiceSummary, ServiceTier } from '../types';

export const SERVICE_TIERS: ReadonlyArray<{ id: ServiceTier; title: string; intro: string }> = [
  {
    id: 'ai',
    title: 'AI',
    intro: 'Models, agents and data systems that run in production, not in a slide deck.',
  },
  {
    id: 'engineering',
    title: 'Engineering that makes AI real',
    intro: 'The software, infrastructure and security every AI system depends on.',
  },
];

export const SERVICES: ReadonlyArray<ServiceSummary> = [
  {
    id: 'ai-ml',
    tier: 'ai',
    title: 'AI & Machine Learning',
    description:
      'Custom models that automate decisions, predict outcomes and plug into the workflows you already run.',
    highlights: ['Predictive analytics', 'Natural language processing', 'Model training & deployment'],
  },
  {
    id: 'generative-ai',
    tier: 'ai',
    title: 'Generative AI',
    description:
      "Assistants, content pipelines and AI agents built around how your team actually works.",
    highlights: ['Chat assistants', 'AI workflow agents', 'Retrieval over your data'],
  },
  {
    id: 'data-analytics',
    tier: 'ai',
    title: 'Data & Analytics',
    description:
      'The pipelines, platforms and dashboards that give AI clean data to learn from and give your teams answers.',
    highlights: ['Data platforms', 'Real-time analytics', 'Data governance'],
  },
  {
    id: 'custom-software',
    tier: 'engineering',
    title: 'Custom Software',
    description: 'Full-stack platforms, internal tools and integrations shaped around your business.',
    highlights: ['Full-stack development', 'Legacy modernization', 'API integrations'],
  },
  {
    id: 'cloud-computing',
    tier: 'engineering',
    title: 'Cloud',
    description: 'Migration, optimization and operations across AWS, Azure and Google Cloud.',
    highlights: ['Cloud migration', 'Multi-cloud management', 'Serverless architecture'],
  },
  {
    id: 'devops',
    tier: 'engineering',
    title: 'DevOps & Automation',
    description: 'CI/CD, infrastructure as code and monitoring so your team ships faster with fewer incidents.',
    highlights: ['CI/CD pipelines', 'Monitoring', 'Process automation'],
  },
  {
    id: 'mobile',
    tier: 'engineering',
    title: 'Mobile Apps',
    description: 'Native and cross-platform apps that perform well and connect cleanly to your backend.',
    highlights: ['Native & hybrid apps', 'App security', 'UX/UI design'],
  },
  {
    id: 'cybersecurity',
    tier: 'engineering',
    title: 'Cybersecurity',
    description: 'Penetration testing, zero-trust architecture and compliance without slowing your teams down.',
    highlights: ['Penetration testing', 'Zero-trust architecture', 'Compliance'],
  },
  {
    id: 'digital-transformation',
    tier: 'engineering',
    title: 'Digital Transformation',
    description: 'Honest assessments, practical roadmaps and transitions that keep the business running.',
    highlights: ['Assessments', 'Roadmaps', 'Change management'],
  },
];

/** Services EPOCH no longer offers. Their old URLs redirect to /services (see next.config.ts). */
export const RETIRED_SERVICE_IDS = ['iot', 'blockchain', 'arvr'] as const;

export function servicesInTier(tier: ServiceTier): ServiceSummary[] {
  return SERVICES.filter(service => service.tier === tier);
}

export function findService(id: string): ServiceSummary | undefined {
  return SERVICES.find(service => service.id === id);
}
