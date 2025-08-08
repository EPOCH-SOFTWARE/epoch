/**
 * @fileoverview Service detail data for all service pages
 * @author Epoch Development Team
 */

export interface ServiceDetailData {
  id: string;
  name: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  metaTitle: string;
  metaDescription: string;
  heroImage?: string;
  
  // Overview Section
  overview: {
    title: string;
    description: string;
    keyPoints: string[];
  };
  
  // Expertise Section
  expertise: {
    title: string;
    description: string;
    skills: Array<{
      name: string;
      description: string;
      icon?: string;
    }>;
  };
  
  // Key Services
  keyServices: Array<{
    title: string;
    description: string;
    features: string[];
  }>;
  
  // Benefits
  benefits: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  
  // Industries
  industries: Array<{
    name: string;
    applications: string[];
  }>;
  
  // Case Studies
  caseStudies?: Array<{
    title: string;
    client: string;
    challenge: string;
    solution: string;
    results: string[];
    link?: string;
  }>;
  
  // CTA Section
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  
  // Stats
  stats?: Array<{
    value: string;
    label: string;
    icon?: string;
  }>;
}

// AI & Machine Learning Service Data
const AI_ML_DATA: ServiceDetailData = {
  id: 'ai-ml',
  name: 'AI & Machine Learning',
  heroTitle: 'AI and Machine Learning Development',
  heroSubtitle: 'Transform your enterprise with intelligent systems',
  heroDescription: 'Transform your enterprise with intelligent systems that learn, adapt, and deliver measurable results. We build AI solutions that turn data into competitive advantage.',
  metaTitle: 'AI & Machine Learning Development - EPOCH',
  metaDescription: 'Transform your business with custom AI and machine learning solutions. Expert development, implementation, and optimization for enterprise applications.',
  
  overview: {
    title: 'Transforming Data Into Intelligence',
    description: 'At EPOCH Software Services, we specialize in delivering transformative AI and Machine Learning solutions that empower US enterprises to innovate, optimize, and lead in a data-driven world.',
    keyPoints: [
      'As AI adoption accelerates—with 78% of organizations now using AI, up from 55% last year—our services help you integrate intelligent systems seamlessly into your operations. Whether you\'re building predictive models or deploying advanced algorithms, our team of experts ensures scalable, ethical, and high-impact results tailored to your business needs.',
      'The global machine learning market is projected to reach $113.10 billion in 2025, highlighting the immense demand for robust AI capabilities. Partner with us to harness this growth and turn your data into a competitive advantage.'
    ]
  },
  
  expertise: {
    title: 'Our Expertise in AI and ML',
    description: 'With years of experience serving US enterprises, EPOCH combines cutting-edge technology with industry-specific insights.',
    skills: [
      {
        name: 'Agile Development',
        description: 'Rapid prototyping and iterative improvements with seamless integration'
      },
      {
        name: 'In-Demand Skills',
        description: 'Machine learning engineering, NLP, and computer vision expertise'
      },
      {
        name: 'Real-World Solutions',
        description: 'Addressing automation, personalization, and efficiency challenges'
      }
    ]
  },
  
  keyServices: [
    {
      title: 'Predictive Analytics',
      description: 'Leverage historical data to forecast trends, risks, and opportunities. Our predictive models use advanced algorithms to drive proactive decision-making.',
      features: [
        'Sales forecasting',
        'Supply chain optimization',
        'Customer behavior analysis',
        'Risk assessment'
      ]
    },
    {
      title: 'Natural Language Processing',
      description: 'Build systems that understand and generate human language for sentiment analysis, chatbots, and document summarization.',
      features: [
        'Customer service automation',
        'Content moderation',
        'Legal document review',
        'CRM integration'
      ]
    },
    {
      title: 'Model Training & Deployment',
      description: 'Full lifecycle management from data preparation to cloud deployment using TensorFlow and PyTorch for custom models.',
      features: [
        'Image recognition',
        'Recommendation engines',
        'Anomaly detection',
        'Custom ML solutions'
      ]
    },
    {
      title: 'Computer Vision',
      description: 'Develop vision-based AI for object detection, facial recognition, and video analytics ideal for visual data processing.',
      features: [
        'Quality control',
        'Autonomous systems',
        'Surveillance',
        'Manufacturing inspection'
      ]
    },
    {
      title: 'AI Ethics & Governance',
      description: 'Ensure bias-free, transparent, and compliant AI implementations with GDPR and emerging US AI standards.',
      features: [
        'Ethical AI deployment',
        'Compliance audits',
        'Bias mitigation',
        'Responsible AI frameworks'
      ]
    }
  ],
  
  benefits: [
    {
      title: 'Increased Efficiency',
      description: 'Automate repetitive tasks and streamline operations with intelligent systems'
    },
    {
      title: 'Better Decision Making',
      description: 'Make data-driven decisions with predictive insights and recommendations'
    },
    {
      title: 'Enhanced Customer Experience',
      description: 'Deliver personalized experiences and instant support with AI-powered solutions'
    },
    {
      title: 'Competitive Advantage',
      description: 'Stay ahead with cutting-edge AI technology tailored to your industry'
    },
    {
      title: 'Cost Reduction',
      description: 'Reduce operational costs through automation and optimization'
    },
    {
      title: 'Scalable Growth',
      description: 'Build systems that grow with your business and adapt to changing needs'
    }
  ],
  
  industries: [
    {
      name: 'Healthcare',
      applications: ['Disease diagnosis', 'Drug discovery', 'Patient monitoring', 'Treatment optimization']
    },
    {
      name: 'Finance',
      applications: ['Fraud detection', 'Risk assessment', 'Algorithmic trading', 'Customer analytics']
    },
    {
      name: 'Retail',
      applications: ['Demand forecasting', 'Recommendation engines', 'Price optimization', 'Inventory management']
    },
    {
      name: 'Manufacturing',
      applications: ['Predictive maintenance', 'Quality control', 'Supply chain optimization', 'Process automation']
    },
    {
      name: 'Technology',
      applications: ['User behavior analysis', 'Content moderation', 'Search optimization', 'Anomaly detection']
    }
  ],
  
  caseStudies: [
    {
      title: 'Predictive Maintenance for Manufacturing',
      client: 'Global Manufacturing Corp',
      challenge: 'High equipment downtime and maintenance costs',
      solution: 'Developed ML models to predict equipment failures before they occur',
      results: [
        '45% reduction in unplanned downtime',
        '30% decrease in maintenance costs',
        'ROI achieved within 6 months'
      ]
    },
    {
      title: 'AI-Powered Customer Service',
      client: 'Leading E-commerce Platform',
      challenge: 'High volume of customer inquiries overwhelming support team',
      solution: 'Implemented NLP-based chatbot with intelligent routing',
      results: [
        '70% of queries resolved automatically',
        '50% reduction in response time',
        '95% customer satisfaction rate'
      ]
    }
  ],
  
  ctaTitle: 'Ready to Transform Your Business with AI?',
  ctaDescription: 'Let\'s discuss how our AI and machine learning solutions can drive innovation and growth for your organization.',
  ctaButtonText: 'Start Your AI Journey',
  
  stats: [
    { value: '500+', label: 'AI Models Deployed' },
    { value: '95%', label: 'Accuracy Rate' },
    { value: '3x', label: 'Average ROI' },
    { value: '24/7', label: 'Model Monitoring' }
  ]
};

// Generative AI Service Data
const GENERATIVE_AI_DATA: ServiceDetailData = {
  id: 'generative-ai',
  name: 'Generative AI',
  heroTitle: 'Generative AI Implementation',
  heroSubtitle: 'Revolutionize how you create, automate, and innovate',
  heroDescription: 'Transform your enterprise with intelligent systems that learn, adapt, and deliver measurable results. We build AI solutions that turn data into competitive advantage.',
  metaTitle: 'Generative AI Implementation - EPOCH',
  metaDescription: 'Unlock innovation with cutting-edge generative AI solutions. Custom LLMs, content generation, and intelligent automation for enterprise transformation.',
  
  overview: {
    title: 'Generative AI Implementation',
    description: 'At EPOCH Software Services, we excel in implementing generative AI solutions that revolutionize how US enterprises create, automate, and innovate.',
    keyPoints: [
      'With generative AI adoption surging—71% of organizations now regularly using it in at least one business function, up from 65% earlier in 2024—our services enable you to deploy ethical, scalable GenAI tools that drive productivity and creativity.',
      'The global generative AI market is projected to reach $62.72 billion in 2025, underscoring the critical role of GenAI in enterprise strategies. Partner with us to integrate cutting-edge models like GPT and DALL-E variants, transforming your operations with responsible AI implementations.'
    ]
  },
  
  expertise: {
    title: 'Our Expertise in Generative AI',
    description: 'Drawing on extensive experience with US enterprises, EPOCH delivers GenAI solutions focused on real-world impact.',
    skills: [
      {
        name: 'Agile Implementation',
        description: 'We emphasize governance, bias mitigation, and seamless integration with existing systems, using agile methodologies for quick value realization'
      },
      {
        name: 'High-Demand Specialization',
        description: 'Our team specializes in high-demand areas such as content generation, automation, and agentic AI'
      },
      {
        name: 'Enterprise-Ready Solutions',
        description: 'Aligning with 2025 trends where 25% of enterprises plan to deploy AI agents'
      }
    ]
  },
  
  keyServices: [
    {
      title: 'Chatbots and Conversational AI',
      description: 'Develop intelligent chatbots that handle customer queries, support tickets, and internal communications with natural, context-aware responses. We customize models for your domain to ensure accuracy and personalization.',
      features: [
        'Customer service',
        'HR support',
        'Sales assistance',
        'Domain customization'
      ]
    },
    {
      title: 'Automated Design and Content Creation',
      description: 'Generate high-quality images, videos, text, and designs automatically. Our solutions integrate with creative workflows for marketing materials, product prototypes, and reports.',
      features: [
        'Marketing campaigns',
        'UI/UX design',
        'Content marketing',
        'Product prototypes'
      ]
    },
    {
      title: 'AI Agents for Workflow Automation',
      description: 'Build autonomous AI agents that perform complex tasks like data analysis, process orchestration, and decision support. We focus on agentic AI for multi-step workflows.',
      features: [
        'Supply chain optimization',
        'R&D automation',
        'Operational efficiency',
        'Process orchestration'
      ]
    },
    {
      title: 'Code Generation and Software Assistance',
      description: 'Utilize GenAI to automate coding, debugging, and documentation, speeding up development cycles while maintaining quality.',
      features: [
        'Software engineering',
        'App modernization',
        'DevOps automation',
        'Documentation generation'
      ]
    },
    {
      title: 'GenAI Governance and Ethical Implementation',
      description: 'Provide frameworks for ethical AI use, including bias audits, compliance checks, and transparency tools to align with regulations.',
      features: [
        'Risk management',
        'Compliance checks',
        'Bias audits',
        'Transparency tools'
      ]
    }
  ],
  
  benefits: [
    {
      title: 'Boosted Productivity',
      description: '47% of US executives believe GenAI enhances productivity, with potential cost savings up to 15.2%'
    },
    {
      title: 'Innovation Acceleration',
      description: 'Generate ideas and content faster, with ROI averaging $3.71 per $1 invested'
    },
    {
      title: 'Scalable Solutions',
      description: 'Hybrid models for tech talent and governance ensure enterprise-wide deployment'
    },
    {
      title: 'Risk Mitigation',
      description: 'Address challenges like inaccuracy and cybersecurity, noted by organizations as key risks'
    },
    {
      title: 'Competitive Advantage',
      description: 'Align with trends where 92% of Fortune 500 companies use OpenAI tech'
    }
  ],
  
  industries: [
    {
      name: 'Marketing and Sales',
      applications: ['Personalized campaigns', 'lead generation']
    },
    {
      name: 'Customer Service',
      applications: ['AI-driven interactions', '95% of customer touchpoints potentially AI-powered by 2025']
    },
    {
      name: 'Finance',
      applications: ['Fraud detection', 'report generation']
    },
    {
      name: 'Manufacturing',
      applications: ['Design automation', 'predictive maintenance']
    },
    {
      name: 'Healthcare',
      applications: ['Personalized treatment plans', 'documentation']
    }
  ],
  
  caseStudies: [
    {
      title: 'Marketing Firm Enhances Campaigns with Automated Content',
      client: 'US Marketing Agency',
      challenge: 'Content creation bottlenecks slowing campaign delivery',
      solution: 'A US marketing agency implemented our GenAI for image and text generation, reducing content creation time by 50% and increasing client satisfaction.',
      results: [
        '50% reduction in content creation time',
        'Increased client satisfaction',
        'Streamlined campaign delivery'
      ]
    },
    {
      title: 'Enterprise Automates Operations with AI Agents',
      client: 'Logistics Company',
      challenge: 'Manual workflows causing operational inefficiencies',
      solution: 'We deployed AI agents for a logistics company, streamlining workflows and achieving 20% cost reductions through predictive automation.',
      results: [
        '20% cost reductions',
        'Streamlined workflows',
        'Predictive automation implementation'
      ]
    }
  ],

  ctaTitle: 'Ready to Transform Your Business with Generative AI?',
  ctaDescription: 'Contact EPOCH Software Services today for a free consultation. Discover how our Generative AI Implementation services can unlock new efficiencies and innovations for your enterprise.',
  ctaButtonText: 'Get Free Consultation',
  
  stats: [
    { value: '71%', label: 'Organizations Using GenAI' },
    { value: '$62.72B', label: 'Market Size by 2025' },
    { value: '25%', label: 'Enterprises Deploy AI Agents' }
  ]
};

// Cloud Computing Service Data
const CLOUD_COMPUTING_DATA: ServiceDetailData = {
  id: 'cloud-computing',
  name: 'Cloud Computing',
  heroTitle: 'Cloud Computing Solutions',
  heroSubtitle: 'Scale without limits',
  heroDescription: 'Modernize your infrastructure with cloud-native architectures that deliver scalability, reliability, and cost efficiency.',
  metaTitle: 'Cloud Computing Solutions - EPOCH',
  metaDescription: 'Transform your business with enterprise cloud solutions. Migration, optimization, and management across AWS, Azure, and Google Cloud.',
  
  overview: {
    title: 'Cloud Excellence for Modern Enterprises',
    description: 'We help organizations leverage the full potential of cloud computing, from migration and modernization to optimization and management.',
    keyPoints: [
      'Multi-cloud and hybrid cloud strategies',
      'Cloud-native application development',
      'Infrastructure as Code (IaC) automation',
      'Cost optimization and governance'
    ]
  },
  
  expertise: {
    title: 'Cloud Expertise',
    description: 'Comprehensive capabilities across major cloud platforms',
    skills: [
      {
        name: 'AWS',
        description: 'Full-stack AWS services implementation and optimization'
      },
      {
        name: 'Microsoft Azure',
        description: 'Azure infrastructure, services, and hybrid solutions'
      },
      {
        name: 'Google Cloud',
        description: 'GCP deployment, big data, and machine learning'
      },
      {
        name: 'Kubernetes',
        description: 'Container orchestration and microservices architecture'
      },
      {
        name: 'DevOps',
        description: 'CI/CD pipelines, automation, and monitoring'
      },
      {
        name: 'Serverless',
        description: 'Function-as-a-Service and event-driven architectures'
      }
    ]
  },
  
  keyServices: [
    {
      title: 'Cloud Migration',
      description: 'Seamless transition to the cloud with minimal disruption',
      features: [
        'Assessment and planning',
        'Lift-and-shift migration',
        'Application modernization',
        'Data migration',
        'Post-migration optimization'
      ]
    },
    {
      title: 'Cloud Architecture',
      description: 'Design and implement scalable cloud solutions',
      features: [
        'Solution architecture design',
        'Microservices development',
        'API gateway implementation',
        'Load balancing and auto-scaling',
        'Disaster recovery planning'
      ]
    },
    {
      title: 'Cloud Management',
      description: 'Ongoing optimization and management of cloud resources',
      features: [
        '24/7 monitoring and support',
        'Cost optimization',
        'Security and compliance',
        'Performance tuning',
        'Backup and recovery'
      ]
    }
  ],
  
  benefits: [
    {
      title: 'Infinite Scalability',
      description: 'Scale resources up or down instantly based on demand'
    },
    {
      title: 'Cost Efficiency',
      description: 'Pay only for what you use with optimized resource allocation'
    },
    {
      title: 'Global Reach',
      description: 'Deploy applications worldwide in minutes'
    },
    {
      title: 'High Availability',
      description: 'Achieve 99.99% uptime with redundant infrastructure'
    },
    {
      title: 'Innovation Speed',
      description: 'Rapidly deploy new features and services'
    },
    {
      title: 'Security',
      description: 'Enterprise-grade security with compliance certifications'
    }
  ],
  
  industries: [
    {
      name: 'E-commerce',
      applications: ['Auto-scaling platforms', 'Global CDN', 'Inventory management', 'Payment processing']
    },
    {
      name: 'Healthcare',
      applications: ['HIPAA-compliant storage', 'Telemedicine platforms', 'Medical imaging', 'Patient data management']
    },
    {
      name: 'Financial Services',
      applications: ['Trading platforms', 'Risk analytics', 'Regulatory compliance', 'Digital banking']
    },
    {
      name: 'Gaming',
      applications: ['Game servers', 'Real-time multiplayer', 'Content delivery', 'Analytics']
    },
    {
      name: 'IoT',
      applications: ['Device management', 'Data ingestion', 'Real-time processing', 'Edge computing']
    }
  ],
  
  ctaTitle: 'Ready to Move to the Cloud?',
  ctaDescription: 'Let our cloud experts guide your digital transformation journey.',
  ctaButtonText: 'Start Cloud Migration',
  
  stats: [
    { value: '200+', label: 'Cloud Migrations' },
    { value: '40%', label: 'Cost Savings' },
    { value: '99.99%', label: 'Uptime' },
    { value: '24/7', label: 'Support' }
  ]
};

// Cybersecurity Service Data
const CYBERSECURITY_DATA: ServiceDetailData = {
  id: 'cybersecurity',
  name: 'Cybersecurity',
  heroTitle: 'Cybersecurity Solutions',
  heroSubtitle: 'Protect what matters most',
  heroDescription: 'Comprehensive security solutions to protect your digital assets, ensure compliance, and maintain business continuity.',
  metaTitle: 'Cybersecurity Solutions - EPOCH',
  metaDescription: 'Enterprise cybersecurity services to protect your business. Threat detection, incident response, and compliance management.',
  
  overview: {
    title: 'Comprehensive Security for the Digital Age',
    description: 'Our cybersecurity services provide end-to-end protection for your organization, from threat prevention to incident response and recovery.',
    keyPoints: [
      'Proactive threat detection and prevention',
      'Zero-trust security architecture',
      'Compliance and risk management',
      '24/7 security operations center (SOC)'
    ]
  },
  
  expertise: {
    title: 'Security Expertise',
    description: 'Full-spectrum cybersecurity capabilities',
    skills: [
      {
        name: 'Threat Intelligence',
        description: 'Advanced threat detection and analysis'
      },
      {
        name: 'Network Security',
        description: 'Firewall, IDS/IPS, and network segmentation'
      },
      {
        name: 'Application Security',
        description: 'Secure coding, SAST/DAST, and vulnerability assessment'
      },
      {
        name: 'Cloud Security',
        description: 'Cloud workload protection and CSPM'
      },
      {
        name: 'Identity Management',
        description: 'IAM, SSO, and privileged access management'
      },
      {
        name: 'Incident Response',
        description: 'Rapid response and forensic analysis'
      }
    ]
  },
  
  keyServices: [
    {
      title: 'Security Assessment',
      description: 'Comprehensive evaluation of your security posture',
      features: [
        'Penetration testing',
        'Vulnerability assessment',
        'Security audit',
        'Risk analysis',
        'Compliance review'
      ]
    },
    {
      title: 'Managed Security',
      description: '24/7 monitoring and threat response',
      features: [
        'SOC as a Service',
        'SIEM management',
        'Threat hunting',
        'Incident response',
        'Security orchestration'
      ]
    },
    {
      title: 'Security Architecture',
      description: 'Design and implement robust security frameworks',
      features: [
        'Zero-trust implementation',
        'Security by design',
        'Defense in depth',
        'Microsegmentation',
        'Encryption strategy'
      ]
    }
  ],
  
  benefits: [
    {
      title: 'Risk Reduction',
      description: 'Minimize security risks and potential breaches'
    },
    {
      title: 'Compliance',
      description: 'Meet regulatory requirements and industry standards'
    },
    {
      title: 'Business Continuity',
      description: 'Ensure operations continue even during security incidents'
    },
    {
      title: 'Cost Savings',
      description: 'Prevent costly breaches and downtime'
    },
    {
      title: 'Reputation Protection',
      description: 'Maintain customer trust and brand reputation'
    },
    {
      title: 'Peace of Mind',
      description: 'Focus on your business while we handle security'
    }
  ],
  
  industries: [
    {
      name: 'Banking',
      applications: ['PCI DSS compliance', 'Fraud prevention', 'Secure transactions', 'Data protection']
    },
    {
      name: 'Healthcare',
      applications: ['HIPAA compliance', 'Medical device security', 'Patient data protection', 'Access control']
    },
    {
      name: 'Government',
      applications: ['Critical infrastructure', 'Data sovereignty', 'Citizen data protection', 'Cyber warfare defense']
    },
    {
      name: 'Retail',
      applications: ['Payment security', 'Customer data protection', 'Supply chain security', 'E-commerce protection']
    },
    {
      name: 'Energy',
      applications: ['SCADA security', 'Grid protection', 'OT security', 'Critical infrastructure']
    }
  ],
  
  ctaTitle: 'Secure Your Digital Future',
  ctaDescription: 'Don\'t wait for a breach. Strengthen your security posture today.',
  ctaButtonText: 'Get Security Assessment',
  
  stats: [
    { value: '0', label: 'Breaches' },
    { value: '100%', label: 'Compliance Rate' },
    { value: '<5min', label: 'Response Time' },
    { value: '24/7/365', label: 'Monitoring' }
  ]
};

// Custom Software Service Data
const CUSTOM_SOFTWARE_DATA: ServiceDetailData = {
  id: 'custom-software',
  name: 'Custom Software Development',
  heroTitle: 'Custom Software Development',
  heroSubtitle: 'Built for your unique needs',
  heroDescription: 'Transform your vision into reality with custom software solutions designed specifically for your business challenges.',
  metaTitle: 'Custom Software Development - EPOCH',
  metaDescription: 'Bespoke software solutions tailored to your business. Full-stack development, mobile apps, and enterprise systems.',
  
  overview: {
    title: 'Software That Fits Like a Glove',
    description: 'We create custom software solutions that perfectly align with your business processes, goals, and growth trajectory.',
    keyPoints: [
      'Full-cycle software development',
      'Agile methodology with continuous delivery',
      'Cross-platform compatibility',
      'Long-term support and maintenance'
    ]
  },
  
  expertise: {
    title: 'Development Expertise',
    description: 'Full-stack capabilities across technologies',
    skills: [
      {
        name: 'Frontend Development',
        description: 'React, Angular, Vue.js, and modern UI/UX'
      },
      {
        name: 'Backend Development',
        description: 'Node.js, Python, Java, .NET, and Go'
      },
      {
        name: 'Mobile Development',
        description: 'iOS, Android, React Native, and Flutter'
      },
      {
        name: 'Database Design',
        description: 'SQL, NoSQL, graph databases, and data modeling'
      },
      {
        name: 'API Development',
        description: 'REST, GraphQL, gRPC, and microservices'
      },
      {
        name: 'Quality Assurance',
        description: 'Automated testing, CI/CD, and performance optimization'
      }
    ]
  },
  
  keyServices: [
    {
      title: 'Enterprise Applications',
      description: 'Scalable solutions for complex business needs',
      features: [
        'ERP and CRM systems',
        'Business process automation',
        'Integration with existing systems',
        'Multi-tenant architectures',
        'Enterprise-grade security'
      ]
    },
    {
      title: 'Web Applications',
      description: 'Modern, responsive web applications',
      features: [
        'Progressive web apps',
        'Single-page applications',
        'Real-time collaboration',
        'Cloud-native design',
        'Performance optimization'
      ]
    },
    {
      title: 'Mobile Applications',
      description: 'Native and cross-platform mobile solutions',
      features: [
        'iOS and Android development',
        'Cross-platform frameworks',
        'Offline functionality',
        'Push notifications',
        'App store deployment'
      ]
    }
  ],
  
  benefits: [
    {
      title: 'Perfect Fit',
      description: 'Software designed exactly for your business needs'
    },
    {
      title: 'Competitive Edge',
      description: 'Unique features that set you apart from competitors'
    },
    {
      title: 'Scalability',
      description: 'Grow your software as your business expands'
    },
    {
      title: 'Integration',
      description: 'Seamless connection with your existing tools'
    },
    {
      title: 'Ownership',
      description: 'Full control over your software and data'
    },
    {
      title: 'Long-term Value',
      description: 'Investment that grows with your business'
    }
  ],
  
  industries: [
    {
      name: 'Logistics',
      applications: ['Fleet management', 'Route optimization', 'Warehouse management', 'Track and trace']
    },
    {
      name: 'Real Estate',
      applications: ['Property management', 'Virtual tours', 'CRM systems', 'Market analytics']
    },
    {
      name: 'Education',
      applications: ['Learning management', 'Student portals', 'Assessment platforms', 'Virtual classrooms']
    },
    {
      name: 'Manufacturing',
      applications: ['MES systems', 'Quality control', 'Inventory management', 'Production planning']
    },
    {
      name: 'Non-profit',
      applications: ['Donor management', 'Volunteer coordination', 'Event planning', 'Impact tracking']
    }
  ],
  
  ctaTitle: 'Let\'s Build Something Amazing',
  ctaDescription: 'Turn your software vision into reality with our expert development team.',
  ctaButtonText: 'Start Your Project',
  
  stats: [
    { value: '500+', label: 'Projects Delivered' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '50+', label: 'Technologies' },
    { value: '10+', label: 'Years Experience' }
  ]
};

// Data Analytics Service Data
const DATA_ANALYTICS_DATA: ServiceDetailData = {
  id: 'data-analytics',
  name: 'Data Analytics',
  heroTitle: 'Data Analytics & Business Intelligence',
  heroSubtitle: 'Turn data into decisions',
  heroDescription: 'Unlock the power of your data with advanced analytics and visualization solutions that drive strategic decision-making.',
  metaTitle: 'Data Analytics & Business Intelligence - EPOCH',
  metaDescription: 'Transform data into insights with our analytics solutions. Real-time dashboards, predictive analytics, and data engineering.',
  
  overview: {
    title: 'Data-Driven Excellence',
    description: 'We help organizations build robust data infrastructures and analytics capabilities that transform raw data into actionable insights.',
    keyPoints: [
      'End-to-end data pipeline development',
      'Real-time analytics and reporting',
      'Self-service BI platforms',
      'Data governance and quality management'
    ]
  },
  
  expertise: {
    title: 'Analytics Expertise',
    description: 'Comprehensive data and analytics capabilities',
    skills: [
      {
        name: 'Data Engineering',
        description: 'ETL/ELT pipelines, data lakes, and warehouses'
      },
      {
        name: 'Business Intelligence',
        description: 'Dashboards, reports, and KPI tracking'
      },
      {
        name: 'Advanced Analytics',
        description: 'Statistical analysis, predictive modeling, and forecasting'
      },
      {
        name: 'Data Visualization',
        description: 'Interactive dashboards and storytelling with data'
      },
      {
        name: 'Big Data',
        description: 'Hadoop, Spark, and distributed computing'
      },
      {
        name: 'Data Science',
        description: 'Machine learning, AI, and deep analytics'
      }
    ]
  },
  
  keyServices: [
    {
      title: 'Data Infrastructure',
      description: 'Build modern data platforms for analytics',
      features: [
        'Data lake implementation',
        'Data warehouse design',
        'ETL/ELT pipelines',
        'Real-time streaming',
        'Data quality management'
      ]
    },
    {
      title: 'Business Intelligence',
      description: 'Transform data into business insights',
      features: [
        'Dashboard development',
        'Self-service analytics',
        'Automated reporting',
        'KPI monitoring',
        'Mobile BI solutions'
      ]
    },
    {
      title: 'Analytics Consulting',
      description: 'Strategic guidance for data initiatives',
      features: [
        'Data strategy development',
        'Analytics maturity assessment',
        'Use case identification',
        'Tool selection',
        'Team enablement'
      ]
    }
  ],
  
  benefits: [
    {
      title: 'Informed Decisions',
      description: 'Make data-backed decisions with confidence'
    },
    {
      title: 'Operational Efficiency',
      description: 'Identify inefficiencies and optimization opportunities'
    },
    {
      title: 'Revenue Growth',
      description: 'Discover new revenue streams and opportunities'
    },
    {
      title: 'Risk Mitigation',
      description: 'Identify and address risks before they impact business'
    },
    {
      title: 'Customer Insights',
      description: 'Understand customer behavior and preferences'
    },
    {
      title: 'Competitive Advantage',
      description: 'Stay ahead with data-driven strategies'
    }
  ],
  
  industries: [
    {
      name: 'Retail',
      applications: ['Sales analytics', 'Customer segmentation', 'Inventory optimization', 'Price optimization']
    },
    {
      name: 'Healthcare',
      applications: ['Clinical analytics', 'Population health', 'Operational efficiency', 'Cost analysis']
    },
    {
      name: 'Financial Services',
      applications: ['Risk analytics', 'Portfolio analysis', 'Regulatory reporting', 'Customer analytics']
    },
    {
      name: 'Manufacturing',
      applications: ['Production analytics', 'Supply chain optimization', 'Quality metrics', 'Predictive maintenance']
    },
    {
      name: 'Telecommunications',
      applications: ['Network analytics', 'Customer churn', 'Revenue assurance', 'Service quality']
    }
  ],
  
  ctaTitle: 'Ready to Unlock Your Data\'s Potential?',
  ctaDescription: 'Transform your data into a strategic asset with our analytics solutions.',
  ctaButtonText: 'Get Data Assessment',
  
  stats: [
    { value: '10TB+', label: 'Data Processed Daily' },
    { value: '200+', label: 'Dashboards Built' },
    { value: '5x', label: 'Faster Insights' },
    { value: '30%', label: 'Cost Reduction' }
  ]
};

// Export all service data
export const SERVICE_DETAIL_DATA = {
  'ai-ml': AI_ML_DATA,
  'generative-ai': GENERATIVE_AI_DATA,
  'cloud-computing': CLOUD_COMPUTING_DATA,
  'cybersecurity': CYBERSECURITY_DATA,
  'custom-software': CUSTOM_SOFTWARE_DATA,
  'data-analytics': DATA_ANALYTICS_DATA
} as const;

export type ServiceId = keyof typeof SERVICE_DETAIL_DATA;