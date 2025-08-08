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
    title: 'Cloud Computing Services',
    description: 'At EPOCH Software Services, we specialize in delivering robust cloud computing solutions that enable US enterprises to achieve agility, scalability, and innovation in a hybrid digital era.',
    keyPoints: [
      'With approximately 94% of organizations already utilizing cloud infrastructure, storage, and software in some format by 2025, our services help you optimize your cloud journey amid surging demand. The global cloud computing market is projected to reach $723.4 billion in 2025, reflecting a 21.5% growth as enterprises prioritize AI integration, cost efficiency, and multi-cloud strategies.',
      'Partner with us to leverage platforms like AWS, Azure, and Google Cloud, ensuring seamless migrations and operations tailored to your enterprise needs.'
    ]
  },
  
  expertise: {
    title: 'Our Expertise in Cloud Computing',
    description: 'With deep experience serving US enterprises, EPOCH excels in designing and managing cloud environments that support emerging trends like AI/ML workloads and quantum computing.',
    skills: [
      {
        name: 'Agile Cloud Approach',
        description: 'Our agile approach focuses on hybrid and multi-cloud setups, addressing complexities such as cost optimization and security'
      },
      {
        name: '2025 Trend Leadership',
        description: 'We stay ahead of 2025 trends, including skyrocketing AI demand and rising cloud dissatisfaction'
      },
      {
        name: 'Resilient Solutions',
        description: 'Deliver resilient, efficient solutions tailored to enterprise needs'
      }
    ]
  },
  
  keyServices: [
    {
      title: 'Cloud Migration',
      description: 'Seamlessly transition your on-premises systems to the cloud with minimal disruption. We handle data transfer, application refactoring, and testing to ensure a smooth shift.',
      features: [
        'Legacy modernization',
        'Disaster recovery',
        'Workload balancing',
        'With 94% cloud adoption, migrations are essential for enterprises seeking flexibility and reduced downtime'
      ]
    },
    {
      title: 'Multi-Cloud Management',
      description: 'Orchestrate operations across multiple providers like AWS, Azure, and Google Cloud for redundancy and optimization. Our tools provide unified monitoring, governance, and automation.',
      features: [
        'Vendor diversification',
        'Compliance management',
        'Cost arbitrage',
        'Multi-cloud complexity persists as a top challenge, with enterprises leveraging it to avoid lock-in and enhance resilience'
      ]
    },
    {
      title: 'Serverless Architecture',
      description: 'Build and deploy applications without managing servers, using services like AWS Lambda or Azure Functions for auto-scaling and pay-per-use models.',
      features: [
        'Event-driven apps',
        'Microservices',
        'API development',
        'Serverless supports AI/ML demand, which is set to skyrocket, enabling faster innovation and lower costs'
      ]
    },
    {
      title: 'Cloud Cost Optimization and FinOps',
      description: 'Implement strategies to monitor and reduce cloud spend through rightsizing, reserved instances, and automated scaling. We integrate FinOps practices for ongoing efficiency.',
      features: [
        'Budget forecasting',
        'Waste elimination',
        'ROI analysis',
        'As cloud growth continues unabated, enterprises are adopting FinOps to manage rising costs despite some repatriation trends'
      ]
    },
    {
      title: 'Hybrid Cloud Solutions',
      description: 'Combine public, private, and on-premises clouds for customized environments that balance security, performance, and compliance.',
      features: [
        'Sensitive data handling',
        'Edge computing',
        'Regulatory adherence',
        'Hybrid models dominate as enterprises navigate dissatisfaction and seek optimized setups in 2025'
      ]
    }
  ],
  
  benefits: [
    {
      title: 'Scalability and Agility',
      description: 'Easily scale resources to meet demand, supporting a 21.5% market growth driven by enterprise needs'
    },
    {
      title: 'Cost Efficiency',
      description: 'Reduce expenses through optimization, with potential savings amid $94 billion quarterly spending'
    },
    {
      title: 'Enhanced Innovation',
      description: 'Integrate AI and quantum technologies for breakthroughs in speed and efficiency'
    },
    {
      title: 'Improved Security and Compliance',
      description: 'Built-in measures to protect data in multi-cloud environments'
    },
    {
      title: 'Future-Proofing',
      description: 'Prepare for trends like rising AI/ML workloads and persistent multi-cloud strategies'
    }
  ],
  
  industries: [
    {
      name: 'Finance',
      applications: ['Secure data storage', 'real-time analytics']
    },
    {
      name: 'Healthcare',
      applications: ['Compliant hybrid clouds', 'patient data management']
    },
    {
      name: 'Retail',
      applications: ['Scalable e-commerce platforms', 'serverless backends']
    },
    {
      name: 'Manufacturing',
      applications: ['IoT integration', 'predictive maintenance via cloud']
    },
    {
      name: 'Technology',
      applications: ['Multi-cloud for dev/test environments', 'AI deployment']
    }
  ],
  
  caseStudies: [
    {
      title: 'Enterprise Migrates to Multi-Cloud for Enhanced Resilience',
      client: 'US Financial Firm',
      challenge: 'Need for improved resilience and cost optimization',
      solution: 'A US financial firm partnered with us for multi-cloud migration, reducing costs by 25% and improving uptime through diversified providers.',
      results: [
        '25% cost reduction',
        'Improved uptime through diversified providers',
        'Enhanced resilience and redundancy'
      ]
    },
    {
      title: 'Retailer Optimizes with Serverless Architecture',
      client: 'Major Retailer',
      challenge: 'Need for faster deployment and peak-season scaling',
      solution: 'We implemented serverless solutions for a major retailer, accelerating app deployment by 40% and supporting peak-season scaling.',
      results: [
        '40% faster app deployment',
        'Support for peak-season scaling',
        'Improved operational efficiency'
      ]
    }
  ],
  
  ctaTitle: 'Ready to Transform Your Business with Cloud Computing?',
  ctaDescription: 'Contact EPOCH Software Services today for a free consultation. Explore how our Cloud Computing Services can elevate your enterprise\'s efficiency and innovation.',
  ctaButtonText: 'Get Free Consultation',
  
  stats: [
    { value: '94%', label: 'Organizations Use Cloud' },
    { value: '$723.4B', label: 'Market Size 2025' },
    { value: '21.5%', label: 'Market Growth Rate' },
    { value: '25%', label: 'Average Cost Savings' }
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
    title: 'Cybersecurity Solutions',
    description: 'At EPOCH Software Services, we provide advanced cybersecurity solutions designed to protect US enterprises from the escalating threats in an increasingly digital world.',
    keyPoints: [
      'With cybercrime projected to cost businesses up to $10.5 trillion globally by 2025, and the US cybersecurity market expected to reach $86.38 billion this year, our services deliver proactive defense, compliance, and resilience. As threats like nation-state attacks, AI exploitation, and supply chain vulnerabilities intensify, we help enterprises fortify their defenses with cutting-edge strategies tailored to 2025\'s risk landscape.',
      'Partner with us to safeguard your assets, ensure regulatory adherence, and maintain operational continuity in a high-stakes environment.'
    ]
  },
  
  expertise: {
    title: 'Our Expertise in Cybersecurity',
    description: 'Leveraging extensive experience with US enterprises, EPOCH specializes in comprehensive cybersecurity frameworks that integrate AI, cloud security, and regulatory compliance.',
    skills: [
      {
        name: 'Agile Methodology',
        description: 'Our agile methodology addresses 2025 trends such as fraud impersonation and supply chain risks'
      },
      {
        name: 'Advanced Security Models',
        description: 'We focus on high-demand areas like zero-trust models and post-quantum encryption'
      },
      {
        name: 'Layered Protection',
        description: 'Deliver layered protection against sophisticated attacks that evolve with threats'
      }
    ]
  },
  
  keyServices: [
    {
      title: 'Penetration Testing',
      description: 'Conduct simulated attacks to identify vulnerabilities in your systems, networks, and applications. We use ethical hacking techniques to uncover weaknesses before adversaries do.',
      features: [
        'Web app security',
        'Network assessments',
        'Red team exercises',
        'With rising cyber threats, penetration testing is a core service for enterprises, helping prevent breaches amid $10.5 trillion in potential costs'
      ]
    },
    {
      title: 'Zero-Trust Architecture',
      description: 'Implement a security model that verifies every access request, regardless of origin, to minimize insider threats and lateral movement.',
      features: [
        'Remote work environments',
        'Cloud integrations',
        'API security',
        'Zero-trust is essential for combating nation-state and AI-driven attacks, a top trend in 2025'
      ]
    },
    {
      title: 'Post-Quantum Cryptography',
      description: 'Upgrade encryption methods to withstand quantum computing threats, ensuring long-term data protection.',
      features: [
        'Secure communications',
        'Data-at-rest encryption',
        'Blockchain integrations',
        'As quantum risks emerge, enterprises prioritize post-quantum solutions to future-proof security'
      ]
    },
    {
      title: 'Managed Detection and Response (MDR)',
      description: 'Provide 24/7 monitoring, threat hunting, and rapid incident response using AI-powered tools for real-time defense.',
      features: [
        'Endpoint protection',
        'SIEM enhancements',
        'Ransomware mitigation',
        'MDR addresses supply chain vulnerabilities and fraud, key concerns for US enterprises in 2025'
      ]
    },
    {
      title: 'Compliance and Risk Management',
      description: 'Assist with regulatory adherence (e.g., GDPR, NIST) through audits, policy development, and risk assessments.',
      features: [
        'Data privacy frameworks',
        'Third-party vendor evaluations',
        'Cyber insurance preparation',
        'Regulatory compliance drives market growth, with enterprises facing stricter standards amid AI and cloud adoption'
      ]
    }
  ],
  
  benefits: [
    {
      title: 'Proactive Threat Mitigation',
      description: 'Reduce breach risks by up to 50% through advanced detection, countering $10.5 trillion in global cybercrime costs'
    },
    {
      title: 'Cost Savings',
      description: 'Optimize security investments in a market growing to $86.38 billion, avoiding downtime and fines'
    },
    {
      title: 'Enhanced Resilience',
      description: 'Build defenses against AI exploitation and supply chain attacks, top trends in 2025'
    },
    {
      title: 'Regulatory Compliance',
      description: 'Ensure adherence to evolving standards, minimizing legal exposures'
    },
    {
      title: 'Scalable Protection',
      description: 'Adapt to enterprise growth with AI-integrated solutions for long-term security'
    }
  ],
  
  industries: [
    {
      name: 'Finance',
      applications: ['Fraud detection', 'secure transactions against impersonation threats']
    },
    {
      name: 'Healthcare',
      applications: ['Patient data safeguarding with compliance to HIPAA', 'quantum risks mitigation']
    },
    {
      name: 'Retail',
      applications: ['Supply chain security', 'endpoint protection for e-commerce']
    },
    {
      name: 'Manufacturing',
      applications: ['Industrial control system defense', 'nation-state attack protection']
    },
    {
      name: 'Technology',
      applications: ['Cloud and AI security', 'exploitation vulnerability countering']
    }
  ],
  
  caseStudies: [
    {
      title: 'Financial Institution Strengthens Defenses with Zero-Trust',
      client: 'Major US Bank',
      challenge: 'Need for enhanced security against unauthorized access',
      solution: 'A major US bank implemented our zero-trust architecture, reducing unauthorized access incidents by 40% and enhancing compliance.',
      results: [
        '40% reduction in unauthorized access incidents',
        'Enhanced compliance posture',
        'Strengthened overall security framework'
      ]
    },
    {
      title: 'Manufacturer Mitigates Supply Chain Risks via MDR',
      client: 'Manufacturing Enterprise',
      challenge: 'Supply chain vulnerabilities and threat detection needs',
      solution: 'We deployed MDR for a manufacturing enterprise, detecting and responding to threats in real-time, preventing potential disruptions and saving millions.',
      results: [
        'Real-time threat detection and response',
        'Prevention of potential disruptions',
        'Millions in cost savings'
      ]
    }
  ],
  
  ctaTitle: 'Ready to Transform Your Business with Cybersecurity Solutions?',
  ctaDescription: 'Contact EPOCH Software Services today for a free consultation. Learn how our Cybersecurity Solutions can protect your enterprise from 2025\'s top threats.',
  ctaButtonText: 'Get Free Consultation',
  
  stats: [
    { value: '$10.5T', label: 'Cybercrime Cost 2025' },
    { value: '$86.38B', label: 'US Market Size 2025' },
    { value: '50%', label: 'Breach Risk Reduction' },
    { value: '24/7', label: 'Threat Monitoring' }
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
    title: 'Custom Software Development',
    description: 'At EPOCH Software Services, we specialize in crafting bespoke software solutions that address the unique challenges and opportunities of US enterprises.',
    keyPoints: [
      'With the US custom software development market valued at approximately $15.19 billion in 2024 and projected to grow at a CAGR of 15.2% through 2033, driven by the need for tailored, scalable applications, our services empower businesses to innovate and compete effectively. Globally, the custom software development sector is anticipated to expand from $43.16 billion in 2024 at a CAGR of 22.6% from 2025 onward, fueled by enterprise demands for AI integration and digital transformation.',
      'Partner with us to build custom platforms that integrate seamlessly, automate workflows, and drive measurable ROI in a landscape where enterprise software spending is set to reach $315 billion by 2025.'
    ]
  },
  
  expertise: {
    title: 'Our Expertise in Custom Software Development',
    description: 'With a proven track record in serving US enterprises, EPOCH delivers agile, end-to-end custom software development using modern frameworks and methodologies.',
    skills: [
      {
        name: 'Full-Stack Engineering',
        description: 'Our expertise spans full-stack engineering, modernization, and emerging trends like AI and low-code platforms'
      },
      {
        name: 'Modern Solutions',
        description: 'Ensure solutions that are secure, scalable, and aligned with 2025 priorities such as automation and data-driven innovation'
      },
      {
        name: 'High-Demand Focus',
        description: 'We focus on high-demand areas to help enterprises overcome developer shortages and accelerate time-to-market'
      }
    ]
  },
  
  keyServices: [
    {
      title: 'Full-Stack Development',
      description: 'Build comprehensive applications from front-end to back-end using technologies like React, Node.js, and databases such as PostgreSQL. We create robust, user-centric software tailored to your operations.',
      features: [
        'E-commerce platforms',
        'Internal dashboards',
        'Enterprise tools',
        'Enterprises require end-to-end solutions for seamless user experiences, with the US market growing at 18.5% CAGR from 2025-2030'
      ]
    },
    {
      title: 'Legacy System Modernization',
      description: 'Update outdated systems to modern architectures, migrating to cloud-native environments while preserving core functionality and data integrity.',
      features: [
        'Refactoring monolithic apps to microservices',
        'Better scalability',
        'Modern architectures',
        'With 60% of the market held by large enterprises, modernization addresses inefficiencies and supports AI/ML integration'
      ]
    },
    {
      title: 'API Development and Integration',
      description: 'Design secure, scalable APIs to connect disparate systems, enabling data flow and third-party integrations for enhanced interoperability.',
      features: [
        'CRM-ERP syncing',
        'Payment gateways',
        'IoT ecosystems',
        'As enterprises adopt hybrid models, API-driven architectures are crucial for automation, with CRM adoption at 79% for customer service'
      ]
    },
    {
      title: 'Low-Code/No-Code Solutions',
      description: 'Leverage platforms like Microsoft Power Apps to enable rapid application development with minimal coding, empowering non-technical teams.',
      features: [
        'Custom workflows',
        'Dashboards',
        'Prototypes',
        'The low-code market is projected to reach $388.6 billion by 2030 at 37.7% CAGR, with 81% of companies viewing it as strategic due to developer shortages'
      ]
    },
    {
      title: 'AI-Integrated Custom Development',
      description: 'Embed AI and ML into bespoke software for predictive features, automation, and intelligent insights.',
      features: [
        'Personalized recommendations',
        'Process optimization',
        'Intelligent automation',
        '85% of businesses will use AI in software by 2025, with 79% experimenting with AI PaaS for profitability gains'
      ]
    }
  ],
  
  benefits: [
    {
      title: 'Tailored Efficiency',
      description: 'Streamline operations with solutions built for your needs, reducing costs and boosting productivity'
    },
    {
      title: 'Scalable Growth',
      description: 'Support enterprise expansion with flexible architectures, aligning with a 22.6% global CAGR'
    },
    {
      title: 'Innovation Edge',
      description: 'Integrate trends like AI and low-code for faster deployment and competitive advantage'
    },
    {
      title: 'Enhanced Security',
      description: 'Incorporate cybersecurity from the ground up, addressing rising threats with $10.5 trillion annual impact'
    },
    {
      title: 'Measurable ROI',
      description: 'Achieve data-driven outcomes, with enterprise software like ERP growing at 11.7% CAGR'
    }
  ],
  
  industries: [
    {
      name: 'Finance',
      applications: ['Secure transaction platforms', 'compliance tools']
    },
    {
      name: 'Healthcare',
      applications: ['Patient management systems with AI diagnostics']
    },
    {
      name: 'Retail',
      applications: ['Inventory and e-commerce integrations']
    },
    {
      name: 'Manufacturing',
      applications: ['Supply chain software for efficiency']
    },
    {
      name: 'Technology',
      applications: ['Agile tools for dev teams', 'with BI as the fastest-growing category']
    }
  ],
  
  caseStudies: [
    {
      title: 'Financial Enterprise Modernizes Legacy Systems',
      client: 'US Bank',
      challenge: 'Need for legacy system modernization and API integration',
      solution: 'A US bank collaborated with us on legacy modernization, integrating APIs for seamless operations, resulting in 30% faster processing and improved compliance.',
      results: [
        '30% faster processing',
        'Improved compliance',
        'Seamless operations integration'
      ]
    },
    {
      title: 'Retailer Accelerates with Low-Code Platform',
      client: 'Major Retailer',
      challenge: 'Need for rapid custom app development and deployment',
      solution: 'We implemented a low-code solution for a major retailer, enabling rapid custom app development and reducing deployment time by 50%.',
      results: [
        '50% reduction in deployment time',
        'Rapid custom app development',
        'Enhanced development capabilities'
      ]
    }
  ],
  
  ctaTitle: 'Ready to Transform Your Business with Custom Software Development?',
  ctaDescription: 'Contact EPOCH Software Services today for a free consultation. Discover how our Custom Software Development services can customize success for your enterprise.',
  ctaButtonText: 'Get Free Consultation',
  
  stats: [
    { value: '$15.19B', label: 'US Market Size 2024' },
    { value: '15.2%', label: 'CAGR Through 2033' },
    { value: '$315B', label: 'Enterprise Spending 2025' },
    { value: '85%', label: 'Businesses Using AI' }
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
    title: 'Data Analytics and Big Data Services',
    description: 'At EPOCH Software Services, we deliver powerful data analytics and big data solutions that enable US enterprises to extract actionable insights from vast datasets, driving informed decision-making and competitive advantage.',
    keyPoints: [
      'With the US data analytics market valued at USD 23.76 billion in 2024 and projected to reach USD 228.60 billion by 2033 at a CAGR of 25.10%, demand for sophisticated analytics services is surging amid the explosion of data volumes and AI integration. Globally, the big data analytics market is expected to grow from USD 303.71 billion in 2025 to USD 1,045.26 billion by 2033, fueled by trends like real-time processing and data democratization.',
      'Partner with us to harness these capabilities, transforming raw data into strategic assets for your enterprise in 2025\'s data-driven landscape.'
    ]
  },
  
  expertise: {
    title: 'Our Expertise in Data Analytics and Big Data',
    description: 'Drawing on extensive experience with US enterprises, EPOCH specializes in scalable analytics frameworks that incorporate AI, edge computing, and cloud integrations.',
    skills: [
      {
        name: 'Agile Analytics Approach',
        description: 'Our agile approach addresses 2025 trends such as the increasing velocity and veracity of big data, ensuring high-quality, real-time insights'
      },
      {
        name: 'In-Demand Skills Focus',
        description: 'We focus on in-demand skills like data visualization and predictive modeling'
      },
      {
        name: 'Enterprise Team Building',
        description: 'Help enterprises build dedicated data teams and overcome talent shortages'
      }
    ]
  },
  
  keyServices: [
    {
      title: 'Big Data Platforms',
      description: 'Design and implement robust platforms using tools like Hadoop, Spark, and cloud-based solutions for storing and processing massive datasets.',
      features: [
        'Scalable storage for IoT data',
        'Enterprise-wide data lakes',
        'Cloud-based solutions',
        'With big data analytics projected to hit USD 395.27 billion in 2025 at 13.5% CAGR, enterprises need platforms to handle exploding data volumes'
      ]
    },
    {
      title: 'Real-Time Analytics',
      description: 'Enable instant data processing and visualization for immediate insights, using streaming technologies like Kafka and Flink.',
      features: [
        'Fraud detection',
        'Live dashboards',
        'Operational monitoring',
        'By 2025, over 50% of enterprise-critical data will be created outside traditional data centers, driving demand for real-time capabilities'
      ]
    },
    {
      title: 'Data Governance Frameworks',
      description: 'Establish policies, standards, and tools for data quality, privacy, and compliance, including GDPR and CCPA adherence.',
      features: [
        'Data lineage tracking',
        'Access controls',
        'Audit readiness',
        'As data volumes grow, governance is critical for trust and regulatory compliance, with 77% of enterprises forming dedicated data teams'
      ]
    },
    {
      title: 'Predictive Analytics and Modeling',
      description: 'Develop models using machine learning to forecast trends, risks, and opportunities from historical and real-time data.',
      features: [
        'Demand forecasting',
        'Customer churn prediction',
        'Performance metrics',
        'Predictive tools are key in a market growing at 28% CAGR, with AI enhancing analytics across industries'
      ]
    },
    {
      title: 'Data Visualization and BI Tools',
      description: 'Create intuitive dashboards and reports with tools like Tableau and Power BI for easy interpretation of complex data.',
      features: [
        'Executive reporting',
        'Performance metrics',
        'Interactive dashboards',
        'Visualization skills are among the top in-demand for data analysts in 2025, aiding data democratization'
      ]
    }
  ],
  
  benefits: [
    {
      title: 'Actionable Insights',
      description: 'Uncover patterns to drive decisions, with the global market reaching USD 132.9 billion by 2026 at 30.08% CAGR'
    },
    {
      title: 'Operational Efficiency',
      description: 'Reduce costs through automation and real-time processing, addressing the $655.53 billion big data market projection by 2029'
    },
    {
      title: 'Scalable Solutions',
      description: 'Handle growing data volumes, with US enterprise data management market expanding to $30.36 billion by 2035'
    },
    {
      title: 'Risk Mitigation',
      description: 'Enhance governance to comply with regulations and build trust'
    },
    {
      title: 'Competitive Advantage',
      description: 'Leverage AI and analytics trends, where data scientists\' employment grows 36% through 2033'
    }
  ],
  
  industries: [
    {
      name: 'Healthcare',
      applications: ['Patient outcome predictions', 'resource optimization']
    },
    {
      name: 'Finance',
      applications: ['Risk assessment', 'fraud analytics']
    },
    {
      name: 'Retail',
      applications: ['Customer behavior insights', 'inventory management']
    },
    {
      name: 'Manufacturing',
      applications: ['Predictive maintenance', 'supply chain efficiency']
    },
    {
      name: 'Government',
      applications: ['Policy analysis', 'public service improvements']
    }
  ],
  
  caseStudies: [
    {
      title: 'Healthcare Provider Enhances Patient Care with Predictive Analytics',
      client: 'US Hospital System',
      challenge: 'Need to reduce patient readmission rates and improve care quality',
      solution: 'A US hospital system implemented our predictive models, reducing readmission rates by 25% through data-driven insights.',
      results: [
        '25% reduction in readmission rates',
        'Improved patient care quality',
        'Data-driven healthcare insights'
      ]
    },
    {
      title: 'Retail Enterprise Optimizes Inventory via Real-Time Analytics',
      client: 'Major Retailer',
      challenge: 'High stockout rates and supply chain inefficiencies',
      solution: 'We deployed real-time dashboards for a major retailer, cutting stockouts by 35% and improving supply chain efficiency.',
      results: [
        '35% reduction in stockouts',
        'Improved supply chain efficiency',
        'Real-time operational insights'
      ]
    }
  ],
  
  ctaTitle: 'Ready to Transform Your Business with Data Analytics and Big Data Services?',
  ctaDescription: 'Contact EPOCH Software Services today for a free consultation. Explore how our Data Analytics and Big Data Services can unlock the full potential of your data.',
  ctaButtonText: 'Get Free Consultation',
  
  stats: [
    { value: '$23.76B', label: 'US Market Size 2024' },
    { value: '25.10%', label: 'CAGR to 2033' },
    { value: '$1,045.26B', label: 'Global Market 2033' },
    { value: '36%', label: 'Data Scientist Growth' }
  ]
};

// IoT Application Development Service Data
const IOT_DATA: ServiceDetailData = {
  id: 'iot',
  name: 'IoT Application Development',
  heroTitle: 'IoT Application Development',
  heroSubtitle: 'Connect your enterprise to the future',
  heroDescription: 'Develop innovative IoT applications that connect devices, streamline operations, and unlock new efficiencies for your enterprise.',
  metaTitle: 'IoT Application Development - EPOCH',
  metaDescription: 'Innovative IoT solutions for enterprise connectivity. Device integration, edge computing, and secure IoT applications.',
  
  overview: {
    title: 'IoT Application Development',
    description: 'At EPOCH Software Services, we specialize in developing innovative IoT applications that connect devices, streamline operations, and unlock new efficiencies for US enterprises.',
    keyPoints: [
      'With the US Internet of Things (IoT) market estimated at USD 413.22 billion in 2024 and projected to grow at a CAGR of 7.6% from 2025 to 2030, driven by advancements in AI integration and edge computing, our services help enterprises capitalize on this expansion. Globally, the IoT market is set to reach USD 629.5 billion in 2025, reflecting surging demand for connected solutions amid trends like 5G and cybersecurity enhancements.',
      'Partner with us to build secure, scalable IoT ecosystems that drive real-time insights and operational excellence in 2025\'s interconnected landscape.'
    ]
  },
  
  expertise: {
    title: 'Our Expertise in IoT Application Development',
    description: 'With deep experience serving US enterprises, EPOCH excels in creating end-to-end IoT solutions that incorporate emerging trends such as AIoT, edge computing, and 5G connectivity.',
    skills: [
      {
        name: 'Agile IoT Development',
        description: 'Our agile development process ensures seamless integration, robust security, and compliance with regulations'
      },
      {
        name: '2025 IoT Challenges',
        description: 'Address 2025 challenges like data privacy and sustainability with cutting-edge solutions'
      },
      {
        name: 'High-Demand Focus',
        description: 'We focus on high-demand areas to enable enterprises to harness IoT for predictive maintenance, automation, and enhanced decision-making'
      }
    ]
  },
  
  keyServices: [
    {
      title: 'Device Integration',
      description: 'Connect diverse devices and sensors into unified ecosystems, enabling data exchange across platforms like AWS IoT or Azure IoT Hub.',
      features: [
        'Smart manufacturing lines',
        'Asset tracking',
        'Remote monitoring',
        'As Industrial IoT (IIoT) leads trends, enterprises seek integration for operational efficiency, with the global IIoT market growing rapidly'
      ]
    },
    {
      title: 'Edge Computing Solutions',
      description: 'Process data at the source with edge devices to reduce latency and bandwidth usage, integrating AI for on-device analytics.',
      features: [
        'Real-time quality control in factories',
        'Autonomous vehicles',
        'Low-latency processing',
        'Edge computing is a top trend, enhancing performance and supporting AIoT systems in low-latency environments'
      ]
    },
    {
      title: 'IoT Security Protocols',
      description: 'Implement advanced security measures, including encryption, blockchain, and zero-trust models, to protect against vulnerabilities.',
      features: [
        'Secure data transmission in healthcare wearables',
        'Supply chain networks',
        'Zero-trust models',
        'With rising cyber threats, IoT cybersecurity is critical, as enterprises prioritize enhanced measures in 2025'
      ]
    },
    {
      title: '5G-Enabled IoT Development',
      description: 'Leverage 5G networks for high-speed, low-latency applications that support massive device connectivity.',
      features: [
        'Smart cities infrastructure',
        'AR/VR industrial training',
        'High-speed connectivity',
        '5G connectivity is transforming IoT, enabling faster data transfer and new use cases across industries'
      ]
    },
    {
      title: 'Digital Twins Implementation',
      description: 'Create virtual replicas of physical assets for simulation, optimization, and predictive analysis.',
      features: [
        'Equipment maintenance in manufacturing',
        'Urban planning',
        'Predictive analysis',
        'Digital twins are a key 2025 trend, empowering predictive capabilities and sustainability efforts'
      ]
    }
  ],
  
  benefits: [
    {
      title: 'Operational Efficiency',
      description: 'Automate processes to cut costs and downtime, aligning with a 14% CAGR in enterprise IoT through 2030'
    },
    {
      title: 'Real-Time Insights',
      description: 'Gain actionable data for faster decisions, supported by trends in AI integration and edge computing'
    },
    {
      title: 'Scalability and Flexibility',
      description: 'Handle growing device networks with 5G and cloud hybrids for future-proof solutions'
    },
    {
      title: 'Enhanced Security',
      description: 'Mitigate risks in connected environments, addressing top concerns like cybersecurity'
    },
    {
      title: 'Sustainability Gains',
      description: 'Optimize resource use through smart monitoring, contributing to environmental trends in IoT'
    }
  ],
  
  industries: [
    {
      name: 'Manufacturing',
      applications: ['Predictive maintenance', 'IIoT for smart factories']
    },
    {
      name: 'Healthcare',
      applications: ['Wearables and remote patient monitoring', 'secure data']
    },
    {
      name: 'Retail',
      applications: ['Inventory tracking', 'customer experience enhancements']
    },
    {
      name: 'Logistics',
      applications: ['Fleet management', 'supply chain visibility']
    },
    {
      name: 'Energy',
      applications: ['Smart grids', 'sustainability monitoring']
    }
  ],
  
  caseStudies: [
    {
      title: 'Manufacturing Firm Boosts Efficiency with Edge Computing',
      client: 'US Manufacturer',
      challenge: 'Need for real-time quality control and reduced latency',
      solution: 'A US manufacturer integrated our edge IoT solutions, reducing latency by 60% and enabling real-time quality control.',
      results: [
        '60% reduction in latency',
        'Real-time quality control enabled',
        'Enhanced manufacturing efficiency'
      ]
    },
    {
      title: 'Healthcare Provider Enhances Care via Secure Wearables',
      client: 'Major Hospital Network',
      challenge: 'Need for secure remote monitoring and compliance',
      solution: 'We developed secure IoT apps for remote monitoring, improving patient outcomes and compliance for a major hospital network.',
      results: [
        'Improved patient outcomes',
        'Enhanced compliance posture',
        'Secure remote monitoring implementation'
      ]
    }
  ],
  
  ctaTitle: 'Ready to Transform Your Business with IoT Application Development?',
  ctaDescription: 'Contact EPOCH Software Services today for a free consultation. Discover how our IoT Application Development services can connect your enterprise to the future.',
  ctaButtonText: 'Get Free Consultation',
  
  stats: [
    { value: '$413.22B', label: 'US IoT Market 2024' },
    { value: '7.6%', label: 'CAGR 2025-2030' },
    { value: '$629.5B', label: 'Global Market 2025' },
    { value: '14%', label: 'Enterprise IoT CAGR' }
  ]
};

// Blockchain Development Service Data
const BLOCKCHAIN_DATA: ServiceDetailData = {
  id: 'blockchain',
  name: 'Blockchain Development',
  heroTitle: 'Blockchain Development',
  heroSubtitle: 'Decentralize and elevate your operations',
  heroDescription: 'Develop secure, decentralized blockchain solutions that enhance transparency, efficiency, and trust for your enterprise.',
  metaTitle: 'Blockchain Development - EPOCH',
  metaDescription: 'Secure blockchain solutions for enterprise. DApp development, smart contracts, tokenization, and blockchain audits.',
  
  overview: {
    title: 'Blockchain Development',
    description: 'At EPOCH Software Services, we specialize in developing secure, decentralized blockchain solutions that enhance transparency, efficiency, and trust for US enterprises.',
    keyPoints: [
      'With the U.S. blockchain technology market valued at USD 9.9 billion in 2024 and projected to grow at a staggering 92.4% CAGR from 2025 to 2032, adoption is accelerating amid trends like AI integration and regulatory advancements. Globally, the blockchain market is anticipated to expand from USD 32.99 billion in 2025 to USD 393.45 billion by 2030, driven by enterprise demands for scalable, hybrid models in fintech, supply chain, and beyond.',
      'Partner with us to implement blockchain technologies that address 2025\'s key challenges, including institutional adoption, scalability, and Web3 opportunities, transforming your operations with immutable, innovative systems.'
    ]
  },
  
  expertise: {
    title: 'Our Expertise in Blockchain Development',
    description: 'Leveraging years of experience with US enterprises, EPOCH delivers comprehensive blockchain development using platforms like Ethereum, Hyperledger, and Solana.',
    skills: [
      {
        name: 'Advanced Blockchain Platforms',
        description: 'Our agile methodology incorporates emerging 2025 trends such as AI-powered smart contracts, decentralized finance (DeFi), and enhanced scalability solutions'
      },
      {
        name: 'Secure & Compliant Implementation',
        description: 'Ensure secure, compliant implementations that align with regulatory frameworks and enterprise needs'
      },
      {
        name: 'Strategic Enterprise Adoption',
        description: 'We excel in high-demand areas like tokenization and audits to help enterprises navigate selective, strategic adoption in a maturing market'
      }
    ]
  },
  
  keyServices: [
    {
      title: 'DApp Development',
      description: 'Build decentralized applications (DApps) for peer-to-peer interactions, leveraging smart contracts for automated, trustless execution.',
      features: [
        'Decentralized marketplaces',
        'Voting systems',
        'Gaming platforms',
        'With increasing institutional adoption, DApps are central to Web3 strategies, as enterprises explore blockchain for digital innovation'
      ]
    },
    {
      title: 'Tokenization Services',
      description: 'Convert assets into digital tokens for fractional ownership, liquidity, and seamless transfers on blockchain networks.',
      features: [
        'Real estate tokenization',
        'NFT creation',
        'Securities trading',
        'Tokenization is a rising trend, enabling efficient asset management in a market projected to hit USD 306 billion by 2030'
      ]
    },
    {
      title: 'Blockchain Audits',
      description: 'Perform thorough security audits and code reviews to identify vulnerabilities and ensure compliance with standards like ISO and regulatory requirements.',
      features: [
        'Smart contract verification',
        'Network penetration testing',
        'Compliance verification',
        'As cyber threats evolve, audits are essential for trust in enterprise blockchain, amid a focus on scalability and security in 2025'
      ]
    },
    {
      title: 'Smart Contract Development',
      description: 'Design self-executing contracts with embedded terms, automating processes like payments and agreements on blockchain.',
      features: [
        'Supply chain automation',
        'Insurance claims processing',
        'Automated payments',
        'AI-powered smart contracts are a top trend, enhancing efficiency in enterprises adopting blockchain selectively'
      ]
    },
    {
      title: 'Supply Chain Blockchain Solutions',
      description: 'Implement traceable, immutable ledgers for end-to-end visibility in supply chains, reducing fraud and improving efficiency.',
      features: [
        'Provenance tracking for goods',
        'Real-time inventory management',
        'Anti-counterfeiting measures',
        'Supply chain is a leading use case for enterprise blockchain in 2025, driven by needs for transparency and resilience'
      ]
    }
  ],
  
  benefits: [
    {
      title: 'Enhanced Transparency and Trust',
      description: 'Immutable records reduce disputes, aligning with a U.S. market growing at 92.4% CAGR'
    },
    {
      title: 'Cost Efficiency',
      description: 'Automate processes to lower operational expenses, in a global market expanding at 64.2% CAGR'
    },
    {
      title: 'Scalability and Innovation',
      description: 'Integrate with AI and DeFi for future-proof solutions, addressing 2025 trends like institutional adoption'
    },
    {
      title: 'Robust Security',
      description: 'Protect against threats with audits and encryption, crucial in enterprise environments'
    },
    {
      title: 'Regulatory Compliance',
      description: 'Ensure adherence to evolving standards, facilitating broader adoption'
    }
  ],
  
  industries: [
    {
      name: 'Finance',
      applications: ['DeFi platforms', 'secure transactions']
    },
    {
      name: 'Supply Chain',
      applications: ['Traceability', 'fraud prevention']
    },
    {
      name: 'Healthcare',
      applications: ['Secure patient data sharing', 'drug tracking']
    },
    {
      name: 'Real Estate',
      applications: ['Asset tokenization', 'smart contracts']
    },
    {
      name: 'Manufacturing',
      applications: ['Provenance', 'quality assurance']
    }
  ],
  
  caseStudies: [
    {
      title: 'Financial Institution Launches DeFi Platform',
      client: 'US Bank',
      challenge: 'Need for faster, more secure transaction processing',
      solution: 'A US bank partnered with us to develop a DeFi solution using smart contracts, reducing transaction times by 70% and enhancing security.',
      results: [
        '70% reduction in transaction times',
        'Enhanced security measures',
        'Successful DeFi platform launch'
      ]
    },
    {
      title: 'Supply Chain Firm Implements Traceability Blockchain',
      client: 'Manufacturing Enterprise',
      challenge: 'Need for supply chain visibility and fraud reduction',
      solution: 'We built a blockchain network for a manufacturing enterprise, improving supply chain visibility and cutting fraud losses by 40%.',
      results: [
        '40% reduction in fraud losses',
        'Improved supply chain visibility',
        'Enhanced traceability implementation'
      ]
    }
  ],
  
  ctaTitle: 'Ready to Transform Your Business with Blockchain Development?',
  ctaDescription: 'Contact EPOCH Software Services today for a free consultation. Explore how our Blockchain Development services can decentralize and elevate your enterprise operations.',
  ctaButtonText: 'Get Free Consultation',
  
  stats: [
    { value: '$9.9B', label: 'US Market Size 2024' },
    { value: '92.4%', label: 'CAGR 2025-2032' },
    { value: '$393.45B', label: 'Global Market 2030' },
    { value: '$306B', label: 'Tokenization Market 2030' }
  ]
};

// DevOps and Automation Service Data
const DEVOPS_DATA: ServiceDetailData = {
  id: 'devops',
  name: 'DevOps and Automation',
  heroTitle: 'DevOps and Automation Services',
  heroSubtitle: 'Accelerate delivery and enhance collaboration',
  heroDescription: 'Comprehensive DevOps and automation services that accelerate software delivery, enhance collaboration, and ensure operational resilience.',
  metaTitle: 'DevOps and Automation Services - EPOCH',
  metaDescription: 'Accelerate software delivery with DevOps automation. CI/CD pipelines, monitoring, DevSecOps, and AIOps solutions.',
  
  overview: {
    title: 'DevOps and Automation Services',
    description: 'At EPOCH Software Services, we offer comprehensive DevOps and automation services that accelerate software delivery, enhance collaboration, and ensure operational resilience for US enterprises.',
    keyPoints: [
      'With the global DevOps market projected to reach $15.06 billion in 2025, growing exponentially from $12.54 billion in 2024, and North America leading with 38.5% market share, demand is driven by the need for faster, more secure deployments amid AI integration and cloud-native shifts.',
      'Partner with us to implement agile pipelines, automation tools, and best practices that align with 2025 trends like DevSecOps, AIOps, and sustainability, empowering your enterprise to thrive in a competitive landscape.'
    ]
  },
  
  expertise: {
    title: 'Our Expertise in DevOps and Automation',
    description: 'With extensive experience supporting US enterprises, EPOCH excels in building scalable DevOps ecosystems using modern tools like GitLab, Kubernetes, and Terraform.',
    skills: [
      {
        name: 'Modern DevOps Tools',
        description: 'Our agile approach incorporates 2025 trends such as AI-driven automation, GitOps, and self-service platforms'
      },
      {
        name: 'Security & Scalability Focus',
        description: 'Focus on security, scalability, and efficiency to address pain points like observability and legacy tool management'
      },
      {
        name: 'High-Demand Skills',
        description: 'We specialize in high-demand skills including Infrastructure as Code (IaC) and cloud-native architectures to help enterprises overcome developer shortages'
      }
    ]
  },
  
  keyServices: [
    {
      title: 'Pipeline Setup (CI/CD)',
      description: 'Design and implement continuous integration and deployment pipelines using tools like GitHub Actions or GitLab CI for automated testing and releases.',
      features: [
        'Software build automation',
        'Microservices deployment',
        'Version control',
        'As over 80% of enterprises adopt DevOps for faster delivery, CI/CD remains core, with automation skills non-negotiable in a market growing at 19.95% CAGR'
      ]
    },
    {
      title: 'Monitoring and Observability Tools',
      description: 'Deploy advanced monitoring solutions like Prometheus and Grafana for real-time insights, alerting, and performance optimization.',
      features: [
        'System health tracking',
        'Anomaly detection',
        'Incident response',
        'Tighter observability is a top trend in 2025, essential for reliability in cloud-native environments amid rising AI impacts'
      ]
    },
    {
      title: 'Process Automation',
      description: 'Automate workflows with IaC tools like Terraform and Ansible, including orchestration for infrastructure provisioning and configuration management.',
      features: [
        'Cloud resource automation',
        'Compliance checks',
        'Scaling operations',
        'AI-driven automation and IaC are high-demand skills, supporting sustainability and efficiency in DevOps-as-a-service models'
      ]
    },
    {
      title: 'DevSecOps Implementation',
      description: 'Integrate security into DevOps pipelines with automated scans, zero-trust models, and compliance tools for secure code-to-production flows.',
      features: [
        'Vulnerability management',
        'Secure deployments',
        'Regulatory adherence',
        'DevSecOps is the flavor of 2025, with security checks in all stages as enterprises prioritize threat mitigation'
      ]
    },
    {
      title: 'AIOps and GitOps Services',
      description: 'Leverage AI for predictive operations and GitOps for declarative infrastructure management, enhancing automation and self-healing systems.',
      features: [
        'Intelligent pipelines',
        'Version-controlled environments',
        'Self-healing systems',
        'AI as copilot and GitOps are emerging trends, with roles evolving toward AI workflow design in 2025'
      ]
    }
  ],
  
  benefits: [
    {
      title: 'Accelerated Delivery',
      description: 'Reduce time-to-market with automated pipelines, aligning with a global market expanding to $25.5 billion by 2028'
    },
    {
      title: 'Improved Reliability',
      description: 'Enhance system maturity through observability and feedback loops, key to 2025\'s focus on speed and resilience'
    },
    {
      title: 'Cost Optimization',
      description: 'Implement FinOps and scalable automation to lower expenses in cloud-native setups'
    },
    {
      title: 'Enhanced Security',
      description: 'Embed DevSecOps to mitigate risks, crucial as threats evolve'
    },
    {
      title: 'Innovation Edge',
      description: 'Adopt AI and GitOps for adaptive, self-service platforms, positioning your enterprise for future growth'
    }
  ],
  
  industries: [
    {
      name: 'Finance',
      applications: ['Secure, compliant pipelines', 'fintech deployments']
    },
    {
      name: 'Healthcare',
      applications: ['Automated workflows', 'patient data systems']
    },
    {
      name: 'Retail',
      applications: ['Scalable e-commerce automation', 'monitoring']
    },
    {
      name: 'Manufacturing',
      applications: ['IIoT integrations with GitOps', 'efficiency']
    },
    {
      name: 'Technology',
      applications: ['Cloud-native DevOps for software firms', 'where demand is highest']
    }
  ],
  
  caseStudies: [
    {
      title: 'Tech Firm Enhances Deployment with CI/CD Pipelines',
      client: 'US Software Company',
      challenge: 'Need for faster release cycles and improved team collaboration',
      solution: 'A US software company implemented our CI/CD setup, reducing release cycles by 50% and improving collaboration across teams.',
      results: [
        '50% reduction in release cycles',
        'Improved team collaboration',
        'Enhanced deployment efficiency'
      ]
    },
    {
      title: 'Financial Enterprise Secures Operations via DevSecOps',
      client: 'Banking Client',
      challenge: 'Need for automated security scanning and vulnerability reduction',
      solution: 'We integrated DevSecOps for a banking client, automating security scans and cutting vulnerability incidents by 35%.',
      results: [
        '35% reduction in vulnerability incidents',
        'Automated security scanning',
        'Improved operational security'
      ]
    }
  ],
  
  ctaTitle: 'Ready to Transform Your Business with DevOps and Automation Services?',
  ctaDescription: 'Contact EPOCH Software Services today for a free consultation. Discover how our DevOps and Automation Services can streamline your enterprise processes.',
  ctaButtonText: 'Get Free Consultation',
  
  stats: [
    { value: '$15.06B', label: 'Global Market 2025' },
    { value: '38.5%', label: 'North America Share' },
    { value: '19.95%', label: 'Market CAGR' },
    { value: '80%+', label: 'Enterprise Adoption' }
  ]
};

// Mobile Application Development Service Data
const MOBILE_DATA: ServiceDetailData = {
  id: 'mobile',
  name: 'Mobile Application Development',
  heroTitle: 'Mobile Application Development',
  heroSubtitle: 'Mobilize your enterprise success',
  heroDescription: 'Craft high-performance mobile applications that engage users, drive mobility, and support enterprise growth in a mobile-first world.',
  metaTitle: 'Mobile Application Development - EPOCH',
  metaDescription: 'High-performance mobile apps for enterprise. Native iOS/Android, hybrid development, PWAs, and AI-enhanced mobile solutions.',
  
  overview: {
    title: 'Mobile Application Development',
    description: 'At EPOCH Software Services, we craft high-performance mobile applications that engage users, drive mobility, and support enterprise growth in a mobile-first world.',
    keyPoints: [
      'With the global mobile application market projected to reach USD 330.61 billion in 2025, driven by rising smartphone adoption and AI integration, US enterprises are increasingly investing in custom apps to enhance customer experiences and internal efficiencies. The US market, where iOS holds a 59% share, is a hotspot for innovation, with trends like cross-platform development and 5G enabling new possibilities amid a global CAGR of over 13% through 2034.',
      'Partner with us to develop intuitive, secure mobile solutions that leverage these trends, ensuring your enterprise stays connected and competitive in 2025.'
    ]
  },
  
  expertise: {
    title: 'Our Expertise in Mobile Application Development',
    description: 'With proven expertise in serving US enterprises, EPOCH delivers end-to-end mobile app development using frameworks like React Native, Flutter, and Swift.',
    skills: [
      {
        name: 'Modern Mobile Frameworks',
        description: 'Our agile process integrates 2025 trends such as AI personalization, AR/VR enhancements, and progressive web apps (PWAs)'
      },
      {
        name: 'User-Centric Design',
        description: 'Focus on user-centric design, security, and seamless cloud connectivity to address challenges like app fragmentation and data privacy'
      },
      {
        name: 'Scalable Solutions',
        description: 'We specialize in high-demand areas to help enterprises build apps that scale with user growth and technological advancements'
      }
    ]
  },
  
  keyServices: [
    {
      title: 'Native and Hybrid App Development',
      description: 'Create platform-specific native apps for iOS/Android or efficient hybrid solutions using cross-platform tools for broader reach and faster deployment.',
      features: [
        'Enterprise mobility tools',
        'Consumer-facing apps',
        'E-commerce platforms',
        'With Android at 70.7% global share and iOS leading in the US, hybrid approaches reduce costs while maintaining performance in a market growing to USD 1,103.48 billion by 2034'
      ]
    },
    {
      title: 'App Security Implementation',
      description: 'Embed robust security features like encryption, biometric authentication, and compliance with standards such as GDPR and CCPA.',
      features: [
        'Secure data handling in finance apps',
        'Health records protection',
        'Biometric authentication',
        'Rising cyber threats make security a priority, especially as mobile apps handle sensitive data in an expanding market'
      ]
    },
    {
      title: 'UX/UI Design',
      description: 'Design intuitive interfaces with user research, wireframing, and prototyping for engaging, accessible experiences across devices.',
      features: [
        'Custom dashboards',
        'Gamified features',
        'Responsive layouts',
        'User experience drives retention, with trends like AI personalization enhancing engagement in 2025'
      ]
    },
    {
      title: 'Progressive Web Apps (PWAs)',
      description: 'Develop web-based apps that function like native ones, offering offline access, push notifications, and fast loading.',
      features: [
        'Cost-effective alternatives for e-commerce',
        'Internal tools',
        'Offline functionality',
        'PWAs bridge web and mobile, gaining traction for their versatility and lower development costs'
      ]
    },
    {
      title: 'AI-Enhanced Mobile Apps',
      description: 'Integrate AI for features like chatbots, predictive analytics, and personalized recommendations within mobile environments.',
      features: [
        'Smart assistants',
        'Augmented reality overlays',
        'Predictive analytics',
        'AI integration is a top trend, boosting app intelligence as enterprises seek competitive edges in 2025'
      ]
    }
  ],
  
  benefits: [
    {
      title: 'User Engagement',
      description: 'Create addictive experiences that boost retention and satisfaction, aligning with a global market surpassing $289 billion in 2025'
    },
    {
      title: 'Scalability and Performance',
      description: 'Support growing user bases with 5G-ready apps for seamless operations'
    },
    {
      title: 'Cost Efficiency',
      description: 'Hybrid and PWA options reduce development time and expenses while maximizing reach'
    },
    {
      title: 'Security and Compliance',
      description: 'Protect user data to build trust and meet regulatory demands'
    },
    {
      title: 'Innovation Boost',
      description: 'Leverage AR/VR and AI trends to differentiate your enterprise in a crowded app ecosystem'
    }
  ],
  
  industries: [
    {
      name: 'Retail',
      applications: ['Personalized shopping apps', 'AR try-ons']
    },
    {
      name: 'Healthcare',
      applications: ['Telemedicine', 'patient tracking tools']
    },
    {
      name: 'Finance',
      applications: ['Secure banking apps', 'biometric features']
    },
    {
      name: 'Logistics',
      applications: ['Real-time tracking', 'workforce management']
    },
    {
      name: 'Education',
      applications: ['Interactive learning platforms', 'AI tutors']
    }
  ],
  
  caseStudies: [
    {
      title: 'Retailer Drives Sales with AI-Personalized App',
      client: 'US E-commerce Giant',
      challenge: 'Need for personalized user experiences and increased engagement',
      solution: 'A US e-commerce giant partnered with us for a hybrid app featuring AI recommendations, increasing user engagement by 45%.',
      results: [
        '45% increase in user engagement',
        'AI-powered personalization',
        'Hybrid app efficiency'
      ]
    },
    {
      title: 'Healthcare Firm Enhances Access via Secure Mobile Platform',
      client: 'Major Healthcare Provider',
      challenge: 'Need for secure telemedicine platform and patient access',
      solution: 'We developed a native iOS app for telemedicine, improving patient satisfaction and compliance for a major provider.',
      results: [
        'Improved patient satisfaction',
        'Enhanced compliance posture',
        'Secure telemedicine platform'
      ]
    }
  ],
  
  ctaTitle: 'Ready to Transform Your Business with Mobile Application Development?',
  ctaDescription: 'Contact EPOCH Software Services today for a free consultation. Learn how our Mobile Application Development services can mobilize your enterprise success.',
  ctaButtonText: 'Get Free Consultation',
  
  stats: [
    { value: '$330.61B', label: 'Global Market 2025' },
    { value: '59%', label: 'iOS Share in US' },
    { value: '13%+', label: 'Global CAGR' },
    { value: '$1,103.48B', label: 'Market by 2034' }
  ]
};

// AR/VR/Spatial Computing Solutions Service Data
const ARVR_DATA: ServiceDetailData = {
  id: 'arvr',
  name: 'AR/VR/Spatial Computing Solutions',
  heroTitle: 'AR VR Spatial Computing Solutions',
  heroSubtitle: 'Enter the era of immersive technology',
  heroDescription: 'Transform your enterprise operations with cutting-edge AR, VR, and spatial computing solutions that redefine how teams collaborate, train, and visualize complex data.',
  metaTitle: 'AR/VR/Spatial Computing Solutions - EPOCH',
  metaDescription: 'Immersive AR/VR solutions for enterprise. Virtual training, spatial analytics, metaverse integration, and digital twins.',
  
  overview: {
    title: 'AR/VR/Spatial Computing Solutions',
    description: 'At EPOCH Software Services, we deliver advanced AR, VR, and spatial computing solutions that enable US enterprises to immerse teams in virtual environments for training, collaboration, and data visualization.',
    keyPoints: [
      'With the global XR (Extended Reality) market projected to reach USD 189.85 billion in 2025, driven by breakthrough advances in headset technology, AI integration, and spatial computing platforms, enterprises are discovering unprecedented opportunities for operational enhancement. The US leads adoption across industries like healthcare, manufacturing, and logistics, where mixed reality is transforming workflows through immersive training, remote collaboration, and real-time data visualization.',
      'Partner with us to implement AR/VR solutions that leverage 2025 trends such as Apple Vision Pro ecosystem expansion, generative AI-powered 3D content creation, and digital twins integration, positioning your enterprise at the forefront of immersive innovation.'
    ]
  },
  
  expertise: {
    title: 'Our Expertise in AR/VR/Spatial Computing',
    description: 'With comprehensive experience serving US enterprises, EPOCH specializes in developing immersive solutions using platforms like Unity, Unreal Engine, and emerging spatial computing frameworks.',
    skills: [
      {
        name: 'Immersive Technology Stack',
        description: 'Our expertise spans modern AR/VR development using Unity 3D, WebXR, and spatial computing APIs for seamless cross-platform experiences'
      },
      {
        name: '2025 Innovation Integration',
        description: 'Integrate 2025 innovations including AI-generated 3D environments, passthrough AR experiences, and metaverse-ready applications'
      },
      {
        name: 'Enterprise-Scale Solutions',
        description: 'Focus on scalable, secure implementations that address enterprise challenges like training consistency, remote collaboration, and data visualization complexity'
      }
    ]
  },
  
  keyServices: [
    {
      title: 'VR Simulations',
      description: 'Develop realistic virtual reality training simulations for high-risk environments, complex procedures, and skill development programs.',
      features: [
        'Safety training for manufacturing environments',
        'Medical procedure simulations',
        'Equipment operation training',
        'Crisis response scenarios'
      ]
    },
    {
      title: 'AR Overlays',
      description: 'Create augmented reality applications that overlay digital information onto real-world environments for enhanced productivity and decision-making.',
      features: [
        'Equipment maintenance guidance',
        'Assembly line quality control',
        'Remote expert assistance',
        'Inventory management visualization'
      ]
    },
    {
      title: 'Metaverse Integrations',
      description: 'Build immersive collaborative spaces and virtual offices that enable seamless remote work, meetings, and team interactions in shared virtual environments.',
      features: [
        'Virtual meeting rooms',
        'Collaborative design spaces',
        'Remote training environments',
        'Digital showrooms'
      ]
    },
    {
      title: 'Digital Twins',
      description: 'Create virtual replicas of physical assets, processes, or environments that enable real-time monitoring, analysis, and predictive maintenance.',
      features: [
        'Facility management systems',
        'Production line optimization',
        'Infrastructure monitoring',
        'Predictive analytics integration'
      ]
    },
    {
      title: 'Spatial Data Visualization',
      description: 'Transform complex datasets into immersive 3D visualizations that enable intuitive data exploration and analysis in spatial environments.',
      features: [
        'Business intelligence dashboards',
        'Scientific data exploration',
        'Financial modeling environments',
        'Geographic information systems'
      ]
    }
  ],
  
  benefits: [
    {
      title: 'Enhanced Training Effectiveness',
      description: 'Immersive training programs show 75% improvement in knowledge retention compared to traditional methods'
    },
    {
      title: 'Reduced Operational Costs',
      description: 'VR training reduces equipment wear, travel costs, and safety incidents while accelerating skill development'
    },
    {
      title: 'Improved Remote Collaboration',
      description: 'Spatial computing enables natural team interactions regardless of geographic location, boosting productivity'
    },
    {
      title: 'Accelerated Decision Making',
      description: '3D data visualization helps executives understand complex information faster and make informed decisions'
    },
    {
      title: 'Competitive Innovation Edge',
      description: 'Early adoption of spatial computing positions your enterprise as an industry leader in digital transformation'
    }
  ],
  
  industries: [
    {
      name: 'Healthcare',
      applications: ['Surgical training simulations', 'patient therapy programs', 'medical education platforms']
    },
    {
      name: 'Manufacturing',
      applications: ['Assembly training', 'quality control AR guides', 'digital factory twins']
    },
    {
      name: 'Retail',
      applications: ['Virtual showrooms', 'product configuration tools', 'immersive shopping experiences']
    },
    {
      name: 'Logistics',
      applications: ['Warehouse navigation', 'package sorting optimization', 'fleet management visualization']
    },
    {
      name: 'Entertainment/Sports',
      applications: ['Fan engagement experiences', 'athlete performance analysis', 'immersive content creation']
    }
  ],
  
  caseStudies: [
    {
      title: 'Healthcare System Transforms Training with VR Simulations',
      client: 'Fraser Health Authority',
      challenge: 'Need for safe, scalable medical training without risk to patients',
      solution: 'Implemented comprehensive VR medical training simulations enabling risk-free practice of complex procedures and emergency response scenarios.',
      results: [
        '40% improvement in procedure accuracy',
        '60% reduction in training costs',
        '85% of staff preferred VR over traditional methods'
      ]
    },
    {
      title: 'Oil & Gas Company Enhances Safety with Digital Twins',
      client: 'Major Energy Corporation',
      challenge: 'High-risk inspection procedures and equipment monitoring challenges',
      solution: 'Developed digital twin infrastructure with AR overlays for equipment inspection, enabling remote monitoring and predictive maintenance.',
      results: [
        '50% reduction in safety incidents',
        '30% decrease in equipment downtime',
        '25% improvement in maintenance efficiency'
      ]
    }
  ],
  
  ctaTitle: 'Ready to Transform Your Business with AR/VR/Spatial Computing?',
  ctaDescription: 'Contact EPOCH Software Services today for a free consultation. Discover how our AR/VR/Spatial Computing Solutions can immerse your enterprise in the future of technology.',
  ctaButtonText: 'Get Free Consultation',
  
  stats: [
    { value: '$189.85B', label: 'Global XR Market 2025' },
    { value: '75%', label: 'Training Retention Improvement' },
    { value: '40%', label: 'Procedure Accuracy Gains' },
    { value: '50%', label: 'Safety Incident Reduction' }
  ]
};

// Digital Transformation Consulting Service Data
const DIGITAL_TRANSFORMATION_DATA: ServiceDetailData = {
  id: 'digital-transformation',
  name: 'Digital Transformation Consulting',
  heroTitle: 'Digital Transformation Consulting',
  heroSubtitle: 'Redefine your enterprise\'s future',
  heroDescription: 'Strategic digital transformation consulting to guide US enterprises through comprehensive tech overhauls, fostering agility, innovation, and long-term growth.',
  metaTitle: 'Digital Transformation Consulting - EPOCH',
  metaDescription: 'Strategic digital transformation consulting for enterprises. Assessments, roadmaps, change management, and implementation support.',
  
  overview: {
    title: 'Digital Transformation Consulting',
    description: 'At EPOCH Software Services, we provide strategic digital transformation consulting to guide US enterprises through comprehensive tech overhauls, fostering agility, innovation, and long-term growth.',
    keyPoints: [
      'With the global digital transformation strategy consulting market valued at USD 141.32 billion in 2025 and projected to reach USD 472.98 billion by 2032, enterprises are increasingly seeking expert guidance to navigate AI-driven changes and regulatory landscapes. The broader US digital transformation market is expected to exceed USD 400 billion in 2025, driven by imperatives like AI integration and sustainability.',
      'Partner with us to develop tailored strategies that leverage 2025 trends such as agentic AI, edge computing, and AI governance, ensuring your enterprise thrives in a rapidly evolving digital ecosystem.'
    ]
  },
  
  expertise: {
    title: 'Our Expertise in Digital Transformation Consulting',
    description: 'With a strong track record in advising US enterprises, EPOCH offers holistic consulting that encompasses strategy formulation, technology assessments, and change management.',
    skills: [
      {
        name: '2025 Trend Integration',
        description: 'Our agile framework integrates 2025 trends like generative AI in operations, decentralized data architectures, and sustainability-focused transformations'
      },
      {
        name: 'Challenge Resolution',
        description: 'Help clients address challenges such as talent gaps and legacy system integration'
      },
      {
        name: 'Strategic Alignment',
        description: 'We specialize in high-demand areas to empower enterprises with roadmaps that align technology with business objectives for measurable outcomes'
      }
    ]
  },
  
  keyServices: [
    {
      title: 'Assessments and Audits',
      description: 'Conduct thorough evaluations of your current tech stack, processes, and readiness for digital initiatives, identifying gaps and opportunities.',
      features: [
        'Maturity assessments for AI adoption',
        'Cloud readiness evaluations',
        'Process optimization analysis',
        'With 80% of enterprises viewing transformation as essential, assessments are foundational for strategic planning in a market growing at over 20% CAGR'
      ]
    },
    {
      title: 'Transformation Roadmaps',
      description: 'Develop customized, phased roadmaps outlining technology adoption, integration strategies, and milestones for AI, cloud, and data-driven initiatives.',
      features: [
        'Multi-year plans incorporating edge computing',
        'Post-quantum security integration',
        'Phased implementation strategies',
        'Roadmaps address top trends like agentic AI and spatial computing, crucial for executives in 2025'
      ]
    },
    {
      title: 'Change Management Support',
      description: 'Guide organizational shifts through training, stakeholder engagement, and cultural adaptation to ensure smooth adoption of new technologies.',
      features: [
        'Employee reskilling for AI tools',
        'Process reengineering',
        'Cultural adaptation strategies',
        'Change management mitigates resistance, a key barrier as consulting revenues grow amid economic optimism'
      ]
    },
    {
      title: 'Implementation Consulting',
      description: 'Provide hands-on advice during rollout, including vendor selection, integration oversight, and performance metrics setup.',
      features: [
        'Deploying AI governance platforms',
        'Ambient intelligence systems',
        'Vendor selection and oversight',
        'Enterprises prioritize implementation support for trends like nuclear-powered AI and micro LLMs in 2025'
      ]
    },
    {
      title: 'Optimization and Sustainability Advisory',
      description: 'Optimize post-implementation performance with ongoing audits, focusing on cost efficiency, scalability, and eco-friendly practices.',
      features: [
        'Sustainable supply chain digitization',
        'Energy-efficient tech stacks',
        'Performance optimization',
        'Sustainability is a rising trend, aligning with operations surveys highlighting AI and green transformations'
      ]
    }
  ],
  
  benefits: [
    {
      title: 'Strategic Agility',
      description: 'Adapt quickly to market changes, with the global market poised for $1,009.8 billion by 2025'
    },
    {
      title: 'Cost Optimization',
      description: 'Achieve efficiencies through targeted tech investments, reducing operational overheads'
    },
    {
      title: 'Innovation Acceleration',
      description: 'Harness trends like generative AI and blockchain for competitive edges'
    },
    {
      title: 'Risk Reduction',
      description: 'Ensure compliance and security in transformations, minimizing disruptions'
    },
    {
      title: 'Sustainable Growth',
      description: 'Build resilient models that support long-term scalability and environmental goals'
    }
  ],
  
  industries: [
    {
      name: 'Finance',
      applications: ['AI-driven risk management', 'decentralized finance integrations']
    },
    {
      name: 'Healthcare',
      applications: ['Telehealth optimizations', 'data privacy frameworks']
    },
    {
      name: 'Retail',
      applications: ['Omnichannel experiences', 'edge computing']
    },
    {
      name: 'Manufacturing',
      applications: ['Smart factories via IoT', 'digital twins']
    },
    {
      name: 'Energy',
      applications: ['Sustainable operations', 'AI governance']
    }
  ],
  
  caseStudies: [
    {
      title: 'Financial Firm Accelerates AI Adoption',
      client: 'US Bank',
      challenge: 'Need for AI integration and operational efficiency',
      solution: 'A US bank engaged our roadmap services, integrating generative AI for operations, resulting in 30% efficiency gains and enhanced compliance.',
      results: [
        '30% efficiency gains',
        'Enhanced compliance posture',
        'Successful generative AI integration'
      ]
    },
    {
      title: 'Manufacturer Achieves Sustainability Goals',
      client: 'Manufacturing Enterprise',
      challenge: 'Need for supply chain optimization and carbon footprint reduction',
      solution: 'We consulted on digital twins for a manufacturing enterprise, optimizing supply chains and reducing carbon footprint by 25%.',
      results: [
        '25% reduction in carbon footprint',
        'Optimized supply chain operations',
        'Digital twins implementation success'
      ]
    }
  ],
  
  ctaTitle: 'Ready to Transform Your Business with Digital Transformation Consulting?',
  ctaDescription: 'Contact EPOCH Software Services today for a free consultation. Discover how our Digital Transformation Consulting can redefine your enterprise\'s future.',
  ctaButtonText: 'Get Free Consultation',
  
  stats: [
    { value: '$141.32B', label: 'Global Market 2025' },
    { value: '$472.98B', label: 'Projected 2032' },
    { value: '$400B+', label: 'US Market 2025' },
    { value: '20%+', label: 'Market CAGR' }
  ]
};

// Export all service data
export const SERVICE_DETAIL_DATA = {
  'ai-ml': AI_ML_DATA,
  'generative-ai': GENERATIVE_AI_DATA,
  'cloud-computing': CLOUD_COMPUTING_DATA,
  'cybersecurity': CYBERSECURITY_DATA,
  'custom-software': CUSTOM_SOFTWARE_DATA,
  'data-analytics': DATA_ANALYTICS_DATA,
  'iot': IOT_DATA,
  'blockchain': BLOCKCHAIN_DATA,
  'devops': DEVOPS_DATA,
  'mobile': MOBILE_DATA,
  'digital-transformation': DIGITAL_TRANSFORMATION_DATA,
  'arvr': ARVR_DATA
} as const;

export type ServiceId = keyof typeof SERVICE_DETAIL_DATA;