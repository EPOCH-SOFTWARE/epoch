/**
 * @fileoverview Content data constants for the application
 * @author Epoch Development Team
 */

import type { ExpertiseItem, PortfolioItem, CaseStudy } from '../types';

export const EXPERTISE_ITEMS: ReadonlyArray<ExpertiseItem> = [
  {
    number: '01',
    title: 'Machine Intelligence',
    description: 'Neural architectures that learn, adapt, and evolve. We design AI systems that understand context and nuance.',
  },
  {
    number: '02',
    title: 'Data Architecture',
    description: 'Transforming raw information into strategic assets. Our pipelines are built for scale and reliability.',
  },
  {
    number: '03',
    title: 'System Design',
    description: 'Engineering solutions that stand the test of time. Every component carefully considered, nothing superfluous.',
  },
] as const;

export const PORTFOLIO_ITEMS: ReadonlyArray<PortfolioItem> = [
  {
    id: 'quantum-finance',
    title: 'Quantum Finance Platform',
    category: 'Fintech',
    description: 'Revolutionary trading system harnessing quantum computing principles for real-time market analysis and prediction.',
    tags: ['AI/ML', 'Cloud Architecture', 'Real-time Systems'],
    image: '/portfolio/quantum-finance.jpg',
    gradient: 'linear-gradient(135deg, var(--yellow-green) 0%, var(--reseda-green) 100%)',
    metrics: {
      impact: '300% ROI increase',
      duration: '6 months',
      technology: ['TensorFlow', 'Kubernetes', 'React'],
    },
  },
  {
    id: 'neural-health',
    title: 'Neural Health Diagnostics',
    category: 'Healthcare',
    description: 'AI-powered diagnostic platform that identifies rare conditions with unprecedented accuracy using neural networks.',
    tags: ['Machine Learning', 'Medical AI', 'Cloud Native'],
    image: '/portfolio/neural-health.jpg',
    gradient: 'linear-gradient(135deg, var(--reseda-green) 0%, var(--dark-moss-green) 100%)',
    metrics: {
      impact: '95% diagnostic accuracy',
      duration: '8 months',
      technology: ['PyTorch', 'AWS', 'Next.js'],
    },
  },
  {
    id: 'eco-grid',
    title: 'EcoGrid Energy System',
    category: 'Sustainability',
    description: 'Smart grid optimization platform reducing energy consumption through predictive analytics and IoT integration.',
    tags: ['IoT', 'Big Data', 'Optimization'],
    image: '/portfolio/eco-grid.jpg',
    gradient: 'linear-gradient(135deg, var(--dark-moss-green) 0%, var(--yellow-green) 100%)',
    metrics: {
      impact: '40% energy reduction',
      duration: '12 months',
      technology: ['Apache Spark', 'TimescaleDB', 'Vue.js'],
    },
  },
  {
    id: 'cyber-shield',
    title: 'CyberShield Defense',
    category: 'Security',
    description: 'Next-generation cybersecurity platform using behavioral AI to predict and prevent zero-day attacks.',
    tags: ['Security', 'AI', 'Infrastructure'],
    image: '/portfolio/cyber-shield.jpg',
    gradient: 'linear-gradient(135deg, var(--yellow-green) 0%, var(--dark-moss-green) 100%)',
    metrics: {
      impact: '99.9% threat detection',
      duration: '10 months',
      technology: ['Rust', 'Elasticsearch', 'Angular'],
    },
  },
  {
    id: 'meta-commerce',
    title: 'MetaCommerce Platform',
    category: 'E-commerce',
    description: 'Immersive shopping experience merging physical and digital retail through AR/VR technologies.',
    tags: ['AR/VR', 'E-commerce', 'Real-time'],
    image: '/portfolio/meta-commerce.jpg',
    gradient: 'linear-gradient(135deg, var(--reseda-green) 0%, var(--yellow-green) 100%)',
    metrics: {
      impact: '200% conversion increase',
      duration: '9 months',
      technology: ['Unity', 'WebRTC', 'Svelte'],
    },
  },
  {
    id: 'data-forge',
    title: 'DataForge Analytics',
    category: 'Analytics',
    description: 'Enterprise analytics platform processing petabytes of data with sub-second query response times.',
    tags: ['Big Data', 'Analytics', 'Performance'],
    image: '/portfolio/data-forge.jpg',
    gradient: 'linear-gradient(135deg, var(--dark-moss-green) 0%, var(--reseda-green) 100%)',
    metrics: {
      impact: '1000x faster queries',
      duration: '14 months',
      technology: ['Apache Flink', 'ClickHouse', 'D3.js'],
    },
  },
] as const;

export const CASE_STUDIES: ReadonlyArray<CaseStudy> = [
  {
    id: 'global-bank-transformation',
    title: 'Global Bank Digital Transformation',
    subtitle: 'Revolutionizing banking for 50 million customers',
    year: '2023',
    industry: 'Finance',
    challenge: 'Legacy systems causing 40% of transactions to fail during peak hours, resulting in massive customer dissatisfaction and revenue loss.',
    solution: 'Architected a microservices-based platform with intelligent load balancing, real-time failover, and predictive scaling using cutting-edge cloud technologies.',
    results: [
      '99.99% uptime achieved',
      'Transaction processing time reduced by 85%',
      '$50M annual cost savings',
      'Customer satisfaction increased to 94%',
    ],
    technologies: ['Kubernetes', 'Apache Kafka', 'Redis', 'PostgreSQL', 'React', 'Go'],
    testimonial: {
      quote: "Epoch didn't just solve our technical challenges; they transformed how we think about digital banking. Their solution is a masterpiece of engineering.",
      author: 'Sarah Chen',
      position: 'CTO, Global Bank',
    },
    gradient: 'linear-gradient(135deg, var(--yellow-green) 0%, var(--dark-moss-green) 100%)',
  },
  {
    id: 'healthcare-ai-breakthrough',
    title: 'AI Healthcare Breakthrough',
    subtitle: 'Saving lives through intelligent diagnostics',
    year: '2023',
    industry: 'Healthcare',
    challenge: 'Rare diseases taking months to diagnose, with 70% misdiagnosis rate leading to critical treatment delays.',
    solution: 'Developed an AI system analyzing millions of medical records, genetic data, and research papers to identify patterns invisible to human doctors.',
    results: [
      '95% diagnostic accuracy for rare diseases',
      'Diagnosis time reduced from months to hours',
      '10,000+ lives impacted in first year',
      'FDA approval achieved',
    ],
    technologies: ['TensorFlow', 'PyTorch', 'AWS SageMaker', 'FHIR', 'Python', 'React Native'],
    testimonial: {
      quote: 'This technology represents the future of medicine. What used to take our best specialists months, now happens in hours with stunning accuracy.',
      author: 'Dr. Michael Torres',
      position: 'Chief Medical Officer, National Health Institute',
    },
    gradient: 'linear-gradient(135deg, var(--reseda-green) 0%, var(--yellow-green) 100%)',
  },
  {
    id: 'sustainable-city-platform',
    title: 'Smart City Revolution',
    subtitle: 'Building the cities of tomorrow',
    year: '2022',
    industry: 'Government',
    challenge: 'City consuming 40% more energy than necessary, with traffic congestion costing citizens 200 hours annually.',
    solution: 'Created an integrated IoT platform connecting traffic systems, utilities, and services, using AI to optimize resource allocation in real-time.',
    results: [
      '35% reduction in energy consumption',
      'Traffic congestion reduced by 60%',
      'Emergency response time improved by 45%',
      '$100M saved in first two years',
    ],
    technologies: ['Apache Spark', 'TimescaleDB', 'Kubernetes', 'TensorFlow', 'Node.js', 'Vue.js'],
    gradient: 'linear-gradient(135deg, var(--dark-moss-green) 0%, var(--reseda-green) 100%)',
  },
] as const;

export interface ClientLogoProps {
  readonly id: string;
  readonly name: string;
  readonly logo: string;
  readonly alt: string;
}

export const CLIENT_LOGOS: ReadonlyArray<ClientLogoProps> = [
  {
    id: 'hub-international',
    name: 'HUB International',
    logo: '/logos/HUB-international.png',
    alt: 'HUB International logo',
  },
  {
    id: 'inspira-financial',
    name: 'Inspira Financial',
    logo: '/logos/inspira-financial.svg',
    alt: 'Inspira Financial logo',
  },
  {
    id: 'shift4',
    name: 'Shift4',
    logo: '/logos/shift-4.svg',
    alt: 'Shift4 logo',
  },
  {
    id: 'cardinal-health',
    name: 'Cardinal Health',
    logo: '/logos/cardinal-health.png',
    alt: 'Cardinal Health logo',
  },
  {
    id: 'idrive',
    name: 'IDrive',
    logo: '/logos/idrive-logo.png',
    alt: 'IDrive logo',
  },
  {
    id: 'bluesky',
    name: 'BlueSky Commerce',
    logo: '/logos/bluesky-logo.svg',
    alt: 'BlueSky Commerce logo',
  },
  {
    id: 'rural-king',
    name: 'Rural King',
    logo: '/logos/ruralking.webp',
    alt: 'Rural King logo',
  },
  {
    id: 'skeps',
    name: 'Skeps',
    logo: '/logos/skeps.svg',
    alt: 'Skeps logo',
  },
  {
    id: 'destify',
    name: 'Destify',
    logo: '/logos/destify.svg',
    alt: 'Destify logo',
  },
] as const;