/**
 * @fileoverview Sample client detail data
 * @author Epoch Development Team
 */

import type { ClientDetailData } from '../../components/pages/clients/detail';

// Example client detail data for HUB International
export const HUB_INTERNATIONAL_DATA: ClientDetailData = {
  id: 'hub-international',
  name: 'HUB International',
  logo: '/logos/HUB-international.png',
  heroTitle: "Transforming Innovation: EPOCH's Partnership with HUB International",
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
    "Leveraged EPOCH's proprietary PSI (Predictive Systems Intelligence) framework for seamless data processing",
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
    quote: "EPOCH's collaborative spirit and technical excellence made this transformation a resounding success. Their AI-powered solution didn't just solve our immediate challenges—it positioned us for the future of insurance technology. The 60% improvement in claim processing time has revolutionized our customer experience.",
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
  metaDescription: "Discover how EPOCH transformed HUB International's insurance workflows with AI-powered solutions, achieving 60% faster claim processing and $1.2M annual savings through collaborative innovation."
};

// Inspira Financial client detail data
export const INSPIRA_FINANCIAL_DATA: ClientDetailData = {
  id: 'inspira-financial',
  name: 'Inspira Financial',
  logo: '/logos/inspira-financial.svg',
  heroTitle: "Revolutionizing Retirement: EPOCH's Digital Transformation Partnership with Inspira Financial",
  heroSubtitle: 'How our innovative platform architecture enabled seamless retirement plan management, achieving 75% faster processing times and empowering 500,000+ participants.',
  heroImage: '/clients/inspira-financial/hero-project.jpg',
  
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
  whyChoseEpoch: 'Inspira Financial selected EPOCH for our deep expertise in financial services technology and proven track record in modernizing complex retirement plan systems while maintaining regulatory compliance and security standards.',
  
  // Project Overview
  projectScope: 'Comprehensive digital transformation including a modern participant portal, automated plan administration system, real-time compliance monitoring, and AI-powered analytics dashboard. The solution integrated with existing recordkeeping systems while providing scalable architecture for future growth.',
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
    'Seamlessly migrated 15+ years of participant data without service interruption',
    'Implemented advanced security measures meeting SOC 2 Type II and ERISA requirements',
    'Achieved real-time data synchronization across distributed microservices architecture',
    'Designed intuitive interfaces that reduced participant support calls by 60%',
    'Created automated testing frameworks ensuring 99.9% system reliability'
  ],
  
  // Solutions and Innovations
  deliverables: [
    'Modern participant self-service portal with mobile-first design',
    'Automated plan administration engine reducing manual tasks by 80%',
    'Real-time compliance monitoring and reporting system',
    'AI-powered retirement planning tools and recommendations',
    'Integrated document management with electronic signatures',
    'Advanced analytics dashboard for plan sponsors',
    'API gateway connecting 20+ third-party systems',
    'Automated participant communication platform'
  ],
  technicalHighlights: [
    'Built cloud-native architecture using Microsoft Azure with 99.99% uptime SLA',
    'Implemented machine learning algorithms for personalized retirement guidance',
    'Created event-driven microservices architecture processing 1M+ transactions daily',
    'Developed real-time fraud detection system using behavioral analytics',
    'Established comprehensive CI/CD pipeline with automated security scanning'
  ],
  technologies: [
    '.NET Core', 'React', 'TypeScript', 'Node.js', 'Azure', 
    'Kubernetes', 'SQL Server', 'Redis', 'Azure Service Bus',
    'Power BI', 'Docker', 'Terraform', 'Azure DevOps', 'SignalR'
  ],
  innovativeFeatures: [
    'AI-driven retirement readiness scoring with personalized recommendations',
    'Blockchain-based document verification for enhanced security',
    'Voice-enabled account management through intelligent chatbot',
    'Predictive analytics for identifying at-risk participants',
    'Automated investment rebalancing based on life event triggers'
  ],
  
  // Results and Impact
  quantifiableResults: [
    {
      metric: 'Transaction Processing Time',
      before: '3-5 business days',
      after: '24 hours',
      improvement: '75% faster processing'
    },
    {
      metric: 'Participant Self-Service Adoption',
      before: '35%',
      after: '87%',
      improvement: '+52 percentage points'
    },
    {
      metric: 'Call Center Volume Reduction',
      before: '12,000 calls/month',
      after: '4,800 calls/month',
      improvement: '60% reduction'
    },
    {
      metric: 'Compliance Reporting Time',
      before: '40 hours/month',
      after: '6 hours/month',
      improvement: '85% time savings'
    },
    {
      metric: 'Mobile App User Satisfaction',
      before: '2.8/5 rating',
      after: '4.7/5 rating',
      improvement: '+68% satisfaction increase'
    },
    {
      metric: 'System Uptime',
      before: '97.5%',
      after: '99.99%',
      improvement: '+2.49 percentage points'
    }
  ],
  qualitativeResults: [
    'Enhanced participant engagement through intuitive digital experiences',
    'Streamlined plan sponsor operations with automated compliance workflows',
    'Improved data accuracy and consistency across all systems',
    'Strengthened competitive position in the retirement services market',
    'Fostered innovation culture with modern technology stack',
    'Achieved industry recognition for digital transformation excellence'
  ],
  
  // Testimonial
  testimonial: {
    quote: 'EPOCH transformed our entire approach to retirement plan administration. Their innovative platform has not only improved our operational efficiency by 75% but has fundamentally enhanced how we serve our participants. The AI-powered features provide unprecedented insights that help our members better prepare for retirement.',
    author: 'Jennifer Walsh',
    position: 'Chief Technology Officer, Inspira Financial',
    avatar: '/clients/inspira-financial/jennifer-walsh.jpg',
    linkedinUrl: 'https://linkedin.com/in/jennifer-walsh-inspira',
    videoUrl: '/clients/inspira-financial/testimonial-video.mp4'
  },
  
  // Additional Media
  screenshots: [
    '/clients/inspira-financial/participant-portal.jpg',
    '/clients/inspira-financial/mobile-app.jpg',
    '/clients/inspira-financial/admin-dashboard.jpg',
    '/clients/inspira-financial/analytics-view.jpg'
  ],
  diagrams: [
    '/clients/inspira-financial/system-architecture.jpg',
    '/clients/inspira-financial/data-flow.jpg',
    '/clients/inspira-financial/security-model.jpg'
  ],
  beforeAfterImages: [
    '/clients/inspira-financial/before-portal.jpg',
    '/clients/inspira-financial/after-portal.jpg'
  ],
  
  // Related Content
  relatedServices: [
    'Financial Services Technology',
    'Cloud Migration & Modernization',
    'Mobile App Development',
    'AI & Analytics Solutions'
  ],
  relatedCaseStudies: [
    'HUB International Digital Transformation',
    'Shift4 Performance Optimization',
    'Cardinal Health Platform Integration'
  ],
  
  // SEO
  metaTitle: 'Inspira Financial Success Story | EPOCH Digital Transformation Case Study',
  metaDescription: "Discover how EPOCH revolutionized Inspira Financial's retirement plan administration with modern technology, achieving 75% faster processing and 87% self-service adoption for 500,000+ participants."
};

// Export all client data as needed
export const CLIENT_DETAIL_DATA = {
  'hub-international': HUB_INTERNATIONAL_DATA,
  'inspira-financial': INSPIRA_FINANCIAL_DATA,
  // Add more client data as needed:
  // 'shift4': SHIFT4_DATA,
  // etc.
};