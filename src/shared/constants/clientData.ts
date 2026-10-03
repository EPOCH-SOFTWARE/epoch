/**
 * @fileoverview Client case studies
 * @author Epoch Development Team
 */

import type { CaseStudy } from '../types';

const HUB_INTERNATIONAL_DATA: CaseStudy = {
  id: 'hub-international',
  name: 'HUB International',
  logo: '/logos/hub-logo.png',
  headline: 'AI-driven automation for insurance claims and risk assessment',
  summary: 'How our team collaborated to modernize insurance workflows through AI-driven automation and system integration.',

  // Client Introduction
  industry: 'Insurance',
  companySize: '10,000+ employees',
  generalChallenges: [
    'Legacy systems causing inefficient claim processing and high operational costs',
    'Manual underwriting processes leading to inconsistent risk assessment',
    'Fragmented data sources preventing comprehensive customer insights',
    'Regulatory compliance complexity across multiple jurisdictions'
  ],
  whyChoseEpoch: 'HUB International partnered with EPOCH for our experience in AI-powered risk assessment and workflow automation, seeking to modernize legacy systems and strengthen their position in the insurance marketplace.',

  // Project Overview
  projectScope: 'Developed an AI-powered insurance platform featuring automated claim processing, intelligent risk assessment, and a real-time analytics dashboard. The system integrated with existing legacy infrastructure while providing modern, scalable capabilities for future growth.',
  timeline: '8 months',
  teamSize: {
    epoch: 12,
    client: 8
  },

  // Collaboration Details
  workingProcess: {
    communicationTools: ['Slack', 'Microsoft Teams', 'Jira'],
    meetingFrequency: 'Daily standups, weekly sprint reviews, bi-weekly stakeholder updates',
    methodology: 'Agile development with 2-week sprints and continuous integration'
  },
  teamRoles: {
    epochRoles: [
      'Technical Lead & Solution Architect',
      'AI/ML Engineers (3)',
      'Full-Stack Developers (4)',
      'DevOps Engineer',
      'UI/UX Designer (2)',
      'QA Engineer'
    ],
    clientRoles: [
      'Project Manager',
      'Business Analyst (2)',
      'Insurance Domain Experts (3)',
      'IT Infrastructure Team (2)'
    ]
  },
  challengesOvercome: [
    'Integrated complex legacy systems with modern API architecture through custom middleware solutions',
    'Addressed data privacy regulations with encryption and compliance frameworks',
    'Resolved performance bottlenecks during peak claim processing periods through optimized algorithms',
    'Ensured seamless user adoption through comprehensive training and gradual rollout strategy'
  ],

  // Solutions and Innovations
  deliverables: [
    'AI-powered risk assessment engine',
    'Automated claim processing workflow',
    'Real-time analytics dashboard with customizable KPI tracking',
    'Mobile-first responsive web application for field adjusters',
    'API integration layer connecting legacy systems',
    'Comprehensive admin panel for workflow management',
    'Automated compliance reporting system'
  ],
  technicalHighlights: [
    'Machine learning models trained on historical claims data for improved accuracy',
    'Fault-tolerant microservices architecture for high availability',
    'Real-time data synchronization across distributed systems',
    'Custom APIs for third-party insurance provider integrations',
    'Event-driven architecture for responsive claim processing'
  ],
  technologies: [
    'TensorFlow', 'Python', 'Node.js', 'React', 'TypeScript',
    'AWS', 'Kubernetes', 'PostgreSQL', 'Redis', 'Apache Kafka',
    'Docker', 'Terraform', 'GraphQL', 'REST APIs'
  ],
  innovativeFeatures: [
    'AI-driven fraud detection with behavioral pattern analysis',
    'Predictive maintenance alerts for critical business processes',
    'Voice-to-text claim reporting with natural language processing',
    'Automated document verification system'
  ],

  // Results and Impact
  quantifiableResults: [
    {
      metric: 'Claim Processing',
      before: 'Multi-day manual process',
      after: 'Streamlined automated workflow',
      improvement: 'Significantly faster turnaround'
    },
    {
      metric: 'Manual Processing',
      before: 'Heavily manual operations',
      after: 'Automated core workflows',
      improvement: 'Major reduction in manual effort'
    },
    {
      metric: 'Risk Assessment',
      before: 'Inconsistent manual evaluation',
      after: 'AI-assisted consistent scoring',
      improvement: 'Measurably improved accuracy'
    },
    {
      metric: 'Operational Costs',
      before: 'High overhead from legacy systems',
      after: 'Streamlined modern infrastructure',
      improvement: 'Meaningful cost reduction'
    },
    {
      metric: 'Customer Experience',
      before: 'Slow response times',
      after: 'Faster, more transparent process',
      improvement: 'Improved satisfaction scores'
    }
  ],
  qualitativeResults: [
    'Enhanced team productivity through streamlined workflows and automated processes',
    'Improved regulatory compliance with automated reporting and audit trails',
    'Scalable architecture enabling future feature development',
    'Strengthened competitive position in the insurance marketplace',
    'Reduced employee burnout through elimination of repetitive manual tasks'
  ],

  // Related Content
  relatedServices: ['ai-ml', 'custom-software', 'data-analytics'],

  // SEO
  metaTitle: 'HUB International Partnership | EPOCH Success Story',
  metaDescription: "Learn how EPOCH partnered with HUB International to modernize insurance workflows through AI-powered automation, improving claim processing efficiency and operational performance."
};

const INSPIRA_FINANCIAL_DATA: CaseStudy = {
  id: 'inspira-financial',
  name: 'Inspira Financial',
  logo: '/logos/inspira-financial.svg',
  headline: 'A modern platform for retirement plan administration',
  summary: 'How our team built a modern platform architecture to streamline retirement plan management and improve the participant experience.',

  // Client Introduction
  industry: 'Financial Services',
  companySize: '2,000+ employees',
  generalChallenges: [
    'Legacy retirement plan systems causing delays in participant enrollment and transactions',
    'Fragmented data across multiple platforms preventing holistic participant views',
    'Manual compliance reporting consuming excessive administrative resources',
    'Limited self-service capabilities resulting in high call center volumes',
    'Outdated mobile experience failing to meet modern participant expectations'
  ],
  whyChoseEpoch: 'Inspira Financial selected EPOCH for our experience in financial services technology and our approach to modernizing complex retirement plan systems while maintaining regulatory compliance and security standards.',

  // Project Overview
  projectScope: 'Comprehensive digital transformation including a modern participant portal, automated plan administration system, real-time compliance monitoring, and analytics dashboard. The solution integrated with existing recordkeeping systems while providing scalable architecture for future growth.',
  timeline: '12 months',
  teamSize: {
    epoch: 15,
    client: 12
  },

  // Collaboration Details
  workingProcess: {
    communicationTools: ['Microsoft Teams', 'Azure DevOps', 'Confluence'],
    meetingFrequency: 'Daily standups, weekly sprint planning, bi-weekly stakeholder demos',
    methodology: 'Agile with continuous delivery and DevSecOps practices'
  },
  teamRoles: {
    epochRoles: [
      'Solution Architect & Technical Lead',
      'Full-Stack Developers (5)',
      'Financial Services Specialists (2)',
      'DevOps Engineers (2)',
      'UI/UX Designers (2)',
      'QA Automation Engineers (2)',
      'Security & Compliance Specialist'
    ],
    clientRoles: [
      'Project Director',
      'Business Analyst Lead (2)',
      'Retirement Plan Experts (4)',
      'IT Security Team (2)',
      'Compliance Officers (2)',
      'Infrastructure Team Lead'
    ]
  },
  challengesOvercome: [
    'Migrated years of participant data without service interruption',
    'Implemented security measures meeting SOC 2 Type II and ERISA requirements',
    'Achieved real-time data synchronization across distributed microservices architecture',
    'Designed intuitive interfaces that significantly reduced participant support calls',
    'Created automated testing frameworks for high system reliability'
  ],

  // Solutions and Innovations
  deliverables: [
    'Modern participant self-service portal with mobile-first design',
    'Automated plan administration engine',
    'Real-time compliance monitoring and reporting system',
    'AI-powered retirement planning tools and recommendations',
    'Integrated document management with electronic signatures',
    'Analytics dashboard for plan sponsors',
    'API gateway connecting third-party systems',
    'Automated participant communication platform'
  ],
  technicalHighlights: [
    'Cloud-native architecture on Microsoft Azure for high availability',
    'Machine learning algorithms for personalized retirement guidance',
    'Event-driven microservices architecture for scalable transaction processing',
    'Real-time fraud detection using behavioral analytics',
    'Comprehensive CI/CD pipeline with automated security scanning'
  ],
  technologies: [
    '.NET Core', 'React', 'TypeScript', 'Node.js', 'Azure',
    'Kubernetes', 'SQL Server', 'Redis', 'Azure Service Bus',
    'Power BI', 'Docker', 'Terraform', 'Azure DevOps', 'SignalR'
  ],
  innovativeFeatures: [
    'AI-driven retirement readiness scoring with personalized recommendations',
    'Document verification for enhanced security',
    'Voice-enabled account management through intelligent chatbot',
    'Predictive analytics for identifying at-risk participants',
    'Automated investment rebalancing based on life event triggers'
  ],

  // Results and Impact
  quantifiableResults: [
    {
      metric: 'Transaction Processing',
      before: 'Multi-day turnaround',
      after: 'Same-day processing',
      improvement: 'Dramatically faster transactions'
    },
    {
      metric: 'Self-Service Adoption',
      before: 'Low digital adoption',
      after: 'Strong self-service usage',
      improvement: 'Significant increase in digital engagement'
    },
    {
      metric: 'Support Volume',
      before: 'High call center volume',
      after: 'Reduced support needs',
      improvement: 'Major reduction in support calls'
    },
    {
      metric: 'Compliance Reporting',
      before: 'Time-intensive manual process',
      after: 'Automated reporting workflows',
      improvement: 'Substantial time savings'
    },
    {
      metric: 'Mobile Experience',
      before: 'Outdated mobile interface',
      after: 'Modern, intuitive mobile app',
      improvement: 'Strong user satisfaction ratings'
    }
  ],
  qualitativeResults: [
    'Enhanced participant engagement through intuitive digital experiences',
    'Streamlined plan sponsor operations with automated compliance workflows',
    'Improved data accuracy and consistency across all systems',
    'Strengthened competitive position in the retirement services market',
    'Modern technology stack enabling ongoing innovation'
  ],

  // Related Content
  relatedServices: ['digital-transformation', 'cloud-computing', 'mobile', 'ai-ml'],

  // SEO
  metaTitle: 'Inspira Financial Partnership | EPOCH Success Story',
  metaDescription: "Learn how EPOCH partnered with Inspira Financial to modernize retirement plan administration with a modern platform, improving processing times, self-service adoption, and participant experience."
};

export const CASE_STUDIES: ReadonlyArray<CaseStudy> = [HUB_INTERNATIONAL_DATA, INSPIRA_FINANCIAL_DATA];

export function findCaseStudy(id: string): CaseStudy | undefined {
  return CASE_STUDIES.find(study => study.id === id);
}
