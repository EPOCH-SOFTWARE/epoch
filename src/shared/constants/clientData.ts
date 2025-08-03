/**
 * @fileoverview Sample client detail data
 * @author Epoch Development Team
 */

import type { ClientDetailData } from '../../components/ClientDetailPage';

// Example client detail data for HUB International
export const HUB_INTERNATIONAL_DATA: ClientDetailData = {
  id: 'hub-international',
  name: 'HUB International',
  logo: '/logos/HUB-international.png',
  heroTitle: 'Transforming Innovation: EPOCH\'s Partnership with HUB International',
  heroSubtitle: 'How our team collaborated to deliver AI-driven efficiency gains and revolutionize insurance workflows.',
  heroImage: '/clients/hub-international/hero-project.jpg',
  
  // Client Introduction
  industry: 'Insurance',
  companySize: '10,000+ employees',
  generalChallenges: [
    'Legacy systems causing inefficient claim processing and high operational costs',
    'Manual underwriting processes leading to inconsistent risk assessment',
    'Fragmented data sources preventing comprehensive customer insights',
    'Regulatory compliance complexity across multiple jurisdictions'
  ],
  whyChoseEpoch: 'HUB International sought our expertise in AI-powered risk assessment and workflow automation to overcome legacy system limitations and enhance their competitive advantage in the insurance marketplace.',
  
  // Project Overview
  projectScope: 'Developed a comprehensive AI-powered insurance platform featuring automated claim processing, intelligent risk assessment, and real-time analytics dashboard. The system integrated with existing legacy infrastructure while providing modern, scalable capabilities for future growth.',
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
    'Addressed data privacy regulations with advanced encryption and compliance frameworks',
    'Resolved performance bottlenecks during peak claim processing periods through optimized algorithms',
    'Ensured seamless user adoption through comprehensive training and gradual rollout strategy'
  ],
  
  // Solutions and Innovations
  deliverables: [
    'AI-powered risk assessment engine with 95% accuracy rate',
    'Automated claim processing workflow reducing manual intervention by 70%',
    'Real-time analytics dashboard with customizable KPI tracking',
    'Mobile-first responsive web application for field adjusters',
    'API integration layer connecting 15+ legacy systems',
    'Comprehensive admin panel for workflow management',
    'Automated compliance reporting system'
  ],
  technicalHighlights: [
    'Leveraged EPOCH\'s proprietary PSI (Predictive Systems Intelligence) framework for seamless data processing',
    'Implemented machine learning models trained on 10+ years of historical claims data',
    'Built fault-tolerant microservices architecture with 99.9% uptime guarantee',
    'Created real-time data synchronization across distributed systems',
    'Developed custom APIs for third-party insurance provider integrations'
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
    'Blockchain-based document verification system'
  ],
  
  // Results and Impact
  quantifiableResults: [
    {
      metric: 'Claim Processing Time',
      before: '15 days',
      after: '6 days',
      improvement: '60% faster'
    },
    {
      metric: 'Manual Processing Reduction',
      before: '85% manual',
      after: '25% manual',
      improvement: '70% automation'
    },
    {
      metric: 'Risk Assessment Accuracy',
      before: '78%',
      after: '95%',
      improvement: '+17 percentage points'
    },
    {
      metric: 'Operational Cost Savings',
      before: '$2.4M annually',
      after: '$1.2M annually',
      improvement: '$1.2M savings (50%)'
    },
    {
      metric: 'Customer Satisfaction',
      before: '72%',
      after: '91%',
      improvement: '+19 points'
    }
  ],
  qualitativeResults: [
    'Enhanced team productivity through streamlined workflows and automated processes',
    'Improved regulatory compliance with automated reporting and audit trails',
    'Fostered long-term innovation culture with scalable architecture for future enhancements',
    'Strengthened competitive position in the insurance marketplace',
    'Reduced employee burnout through elimination of repetitive manual tasks'
  ],
  
  // Testimonial
  testimonial: {
    quote: 'EPOCH\'s collaborative spirit and technical excellence made this transformation a resounding success. Their AI-powered solution didn\'t just solve our immediate challenges—it positioned us for the future of insurance technology. The 60% improvement in claim processing time has revolutionized our customer experience.',
    author: 'Sarah Mitchell',
    position: 'Chief Technology Officer, HUB International',
    avatar: '/clients/hub-international/sarah-mitchell.jpg',
    linkedinUrl: 'https://linkedin.com/in/sarah-mitchell-hub',
    videoUrl: '/clients/hub-international/testimonial-video.mp4'
  },
  
  // Additional Media
  screenshots: [
    '/clients/hub-international/dashboard-screenshot.jpg',
    '/clients/hub-international/mobile-app-screenshot.jpg',
    '/clients/hub-international/analytics-view.jpg'
  ],
  diagrams: [
    '/clients/hub-international/system-architecture.jpg',
    '/clients/hub-international/data-flow-diagram.jpg'
  ],
  beforeAfterImages: [
    '/clients/hub-international/before-workflow.jpg',
    '/clients/hub-international/after-workflow.jpg'
  ],
  
  // Related Content
  relatedServices: [
    'AI & Machine Learning',
    'Legacy System Modernization',
    'Insurance Technology Solutions',
    'Workflow Automation'
  ],
  relatedCaseStudies: [
    'Inspira Financial Platform Modernization',
    'Cardinal Health AI Integration',
    'Shift4 Performance Optimization'
  ],
  
  // SEO
  metaTitle: 'HUB International Case Study | EPOCH Collaboration Success Story',
  metaDescription: 'Discover how EPOCH transformed HUB International\'s insurance workflows with AI-powered solutions, achieving 60% faster claim processing and $1.2M annual savings through collaborative innovation.'
};

// Export all client data as needed
export const CLIENT_DETAIL_DATA = {
  'hub-international': HUB_INTERNATIONAL_DATA,
  // Add more client data as needed:
  // 'inspira-financial': INSPIRA_FINANCIAL_DATA,
  // 'shift4': SHIFT4_DATA,
  // etc.
};