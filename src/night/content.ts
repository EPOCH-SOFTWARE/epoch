// Content accepted in the Night prototype, preserved without new claims.
export const GOALS = [
  {
    id: 'automate',
    title: 'Automate a workflow',
    service: 'generative-ai',
    headline: 'Give your team back the workday.',
    description:
      'Connect the documents, decisions and systems behind a repetitive process. Keep people involved where judgement matters.',
    stages: [
      'Understand the workflow',
      'Connect AI to your systems',
      'Review, measure and improve',
    ],
    capabilities: ['generative-ai', 'ai-ml', 'data-analytics'],
    question: 'Which task takes more time than it should?',
  },
  {
    id: 'build',
    title: 'Build an AI product',
    service: 'ai-ml',
    headline: 'Make the idea work in the real world.',
    description:
      'Bring the model, the interface and the engineering together. Build around the people who will use it, from the first interaction to production.',
    stages: ['Define the product', 'Build and evaluate', 'Launch and support'],
    capabilities: ['ai-ml', 'generative-ai', 'custom-software'],
    question: 'What should someone be able to do with your product?',
  },
  {
    id: 'modernise',
    title: 'Modernise a platform',
    service: 'custom-software',
    headline: 'Move forward. Bring your systems with you.',
    description:
      'Connect existing infrastructure to modern software, data and AI capabilities. Work through the dependencies and the path to production.',
    stages: ['Map the existing systems', 'Build the next capability', 'Integrate and operate'],
    capabilities: ['custom-software', 'cloud-computing', 'devops'],
    question: 'Where is your current platform holding you back?',
  },
];
export const INDUSTRIES = [
  {
    id: 'insurance',
    name: 'Insurance',
    headline: 'AI for insurance, from claims to underwriting.',
    intro:
      'Insurers run on documents, decisions and regulation. We build AI that speeds up all three and keeps the audit trail intact.',
    challenges: [
      'Legacy systems that slow claims down and keep operating costs high',
      'Manual underwriting that makes risk assessment inconsistent',
      'Customer data scattered across systems that don’t talk to each other',
      'Compliance rules that change from one jurisdiction to the next',
    ],
    whatWeBuild: [
      'AI-powered risk assessment',
      'Automated claim processing workflows',
      'Fraud detection with behavioral pattern analysis',
      'Voice-to-text claim reporting',
      'Automated document verification',
      'Automated compliance reporting',
      'Real-time analytics dashboards',
      'Integration layers that connect legacy systems',
    ],
    clientIds: ['hub-international'],
    caseStudyId: 'hub-international',
    serviceIds: ['ai-ml', 'data-analytics', 'custom-software'],
  },
  {
    id: 'financial-services',
    name: 'Financial services',
    headline: 'AI for financial services, built to pass an audit.',
    intro:
      'Retirement, payments and lending teams need systems that are fast for customers and airtight for regulators.',
    challenges: [
      'Legacy platforms that slow down enrollment and transactions',
      'Customer data split across platforms, with no single view of each account',
      'Compliance reporting that eats up administrative time',
      'Limited self-service that pushes customers to the call center',
    ],
    whatWeBuild: [
      'Self-service portals and mobile apps',
      'Real-time compliance monitoring and reporting',
      'Fraud detection',
      'Risk assessment and customer analytics',
      'Personalized recommendations with machine learning',
      'Predictive analytics to spot at-risk customers',
      'Document management with electronic signatures',
      'API gateways that connect third-party systems',
    ],
    clientIds: ['inspira-financial', 'shift4', 'skeps'],
    caseStudyId: 'inspira-financial',
    serviceIds: ['digital-transformation', 'cloud-computing', 'mobile', 'ai-ml'],
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    headline: 'AI for healthcare, where accuracy isn’t optional.',
    intro:
      'Healthcare data is sensitive, scattered and high-stakes. We build systems that respect all three, from patient data to clinical workflows.',
    challenges: [
      'Patient and operational data spread across systems',
      'Strict privacy and security requirements, including HIPAA',
      'Manual workflows that take time away from patients',
      'Models that look promising in a pilot but never reach production',
    ],
    whatWeBuild: [
      'Patient outcome predictions',
      'Patient monitoring',
      'Clinical documentation with generative AI',
      'Patient management systems and clinical workflow tools',
      'Compliant hybrid cloud and patient data management',
      'Patient data protection and HIPAA compliance',
      'Telemedicine and patient tracking apps',
      'Resource optimization',
    ],
    clientIds: ['cardinal-health'],
    caseStudyId: null,
    serviceIds: ['ai-ml', 'data-analytics', 'cybersecurity', 'cloud-computing'],
  },
  {
    id: 'retail',
    name: 'Retail',
    headline: 'AI for retail, from forecast to checkout.',
    intro:
      'Margins are thin and customers are impatient. We build AI and commerce systems that keep inventory right and checkouts fast.',
    challenges: [
      'Demand that’s hard to predict, season to season',
      'Inventory spread across stores, warehouses and channels',
      'Personalization that doesn’t scale past a few segments',
      'Systems that slow down when traffic peaks',
    ],
    whatWeBuild: [
      'Demand forecasting',
      'Recommendation engines',
      'Price optimization',
      'Inventory management',
      'Customer behavior insights',
      'Scalable e-commerce platforms and integrations',
      'Personalized shopping apps',
      'Omnichannel experiences',
    ],
    clientIds: ['rural-king', 'bluesky'],
    caseStudyId: null,
    serviceIds: ['ai-ml', 'data-analytics', 'custom-software', 'cloud-computing'],
  },
];
export const ARTICLES = [
  {
    slug: 'why-ai-pilots-stall',
    title: 'Why AI pilots stall before production',
    dek: 'When a pilot stalls, the model is rarely the problem. The trouble is everything the demo didn’t have to handle.',
    date: '2026-09-09',
    related: ['ai-ml', 'data-analytics', 'devops'],
    body: [
      {
        p: 'A pilot is built to answer one question: can this work? Usually, it can. A capable team, a clean sample of data and a few focused weeks will produce a demo that impresses the room. Then the project goes quiet. The demo still works, but it never becomes something the business relies on.',
      },
      {
        p: 'The cause is rarely the model. It’s the parts of a real system that a pilot is allowed to skip. Here are five of them, and what to do about each before you start.',
      },
      {
        h2: 'Nobody owns it after the demo',
      },
      {
        p: 'Pilots often begin as side projects: an innovation team, a curious executive, a vendor keen to show what’s possible. That’s a fine way to explore and a poor way to ship. A production system needs an owner who answers for the outcome, has a budget beyond the pilot and can make decisions when the work runs into real constraints.',
      },
      {
        p: 'Before the pilot starts, name the person who will own the system if it works, and agree on what “works” means to them. If nobody will own it, you’ve learned something important for the price of a conversation.',
      },
      {
        h2: 'It ran on data production won’t have',
      },
      {
        p: 'Pilot data is usually a hand-picked export: cleaned, de-duplicated and frozen in time. Production data arrives late, incomplete and in formats that change without warning. A model that looked accurate on the export can behave very differently on the live feed.',
      },
      {
        p: 'Run the pilot on data pulled the way production will pull it, even if that’s slower. Write down every manual cleanup step you take, because each one is a pipeline you’ll have to build later.',
      },
      {
        h2: 'There’s no baseline to beat',
      },
      {
        p: '“The model looks good” isn’t a decision anyone can defend. Good compared to what? The current process? A simple rule? The judgment of your most experienced people? Without a baseline, every review turns into a debate about impressions.',
      },
      {
        p: 'Measure the current process before you build anything: how long it takes, how often it’s wrong, what it costs and what its worst mistakes look like. Then agree on the bar the pilot has to clear to earn a place in production, and write it down.',
      },
      {
        h2: 'Integration and security were left for later',
      },
      {
        p: 'A pilot can live in a notebook or a standalone app. A production system has to live inside your business: reading from the systems of record, writing results back, respecting permissions, logging what it did and passing a security review. That work is often bigger than the model itself, and it’s where timelines quietly double.',
      },
      {
        p: 'Sketch the production path during the pilot. Which systems will it read and write? Who is allowed to see its outputs? What will security need to approve? You don’t have to build it all up front, but you can’t afford to discover it at the end.',
      },
      {
        h2: 'Nobody is watching it after launch',
      },
      {
        p: 'Models rarely fail loudly. Inputs drift, upstream systems change and quality erodes without a single error message. If nobody is measuring, the first sign of trouble is a frustrated user, or a bad decision someone has to explain.',
      },
      {
        p: 'Plan monitoring as part of the build. Track the quality of what goes in and what comes out, set thresholds, and decide in advance who gets alerted and what they do next. Budget for retraining and prompt updates as a normal cost of running the system, not a surprise.',
      },
      {
        quote:
          'A pilot answers “can this work?” Production answers “can we rely on it?” Plan for the second question from the first day.',
      },
      {
        h2: 'What to do instead',
      },
      {
        ul: [
          'Name an owner and a success bar before anyone writes code.',
          'Use production-shaped data, and log every manual fix.',
          'Measure the current process so the pilot has something to beat.',
          'Map integrations, permissions and security review early.',
          'Treat monitoring and maintenance as part of the scope.',
        ],
      },
      {
        p: 'None of this slows a pilot down in any way that matters. It makes the decision at the end of it real: either you have a system the business can rely on, or you know exactly what it would take to get there.',
      },
    ],
    closing:
      'If you have a pilot that’s stuck, or one you’d like to start properly, we’d be glad to look at it with you.',
  },
  {
    slug: 'evaluating-llm-systems',
    title: 'How to evaluate an LLM system before you trust it',
    dek: 'A handful of good answers in a demo isn’t evidence. Here’s how to build the evidence before real people depend on the system.',
    date: '2026-09-23',
    related: ['generative-ai', 'ai-ml', 'cybersecurity'],
    body: [
      {
        p: 'Large language models are persuasive by design. They answer fluently, sound confident and handle the examples you try in a demo. That’s exactly why evaluating them takes discipline: their failures are rarer, quieter and easy to miss until someone acts on one.',
      },
      {
        p: 'Evaluation isn’t a test you pass once. It’s a set of habits that runs from the first prototype through every change after launch.',
      },
      {
        h2: 'Define the job, and how it can fail',
      },
      {
        p: 'Start by writing down what the system is for, in plain language: who asks it things, what they ask and what a good answer lets them do next. Then list the ways it can go wrong. Some failures are merely annoying, like a clumsy summary. Others are expensive: a confident answer that cites a policy that doesn’t exist, data shown to someone who shouldn’t see it, or an action nobody approved.',
      },
      {
        p: 'Be specific about scope as well. A support assistant that answers billing questions shouldn’t attempt legal advice, and deciding what the system should decline is part of defining the job.',
      },
      {
        p: 'Rank those failures by what they would cost you. The ranking decides where to spend evaluation effort, and which mistakes you can tolerate at what rate.',
      },
      {
        h2: 'Build an evaluation set from real cases',
      },
      {
        p: 'Public benchmarks describe a model in general, not your task. The most useful evaluation set is made of real inputs from your domain: questions from actual support tickets, the documents your teams really use, the edge cases your experts remember.',
      },
      {
        ul: [
          'Cover the common cases, the hard cases and the cases that must never go wrong.',
          'For each case, write down the expected answer, or what a good answer must include and must avoid.',
          'Keep part of the set aside and never tune against it, so you can tell real improvement from memorizing the test.',
        ],
      },
      {
        p: 'Start small. A few dozen well-chosen cases beat thousands that nobody has read. Add a new case every time you find a new failure.',
      },
      {
        h2: 'Combine automated checks with human review',
      },
      {
        p: 'Some qualities can be checked automatically: whether the output follows the required format, whether cited sources exist and actually support the claim, whether sensitive fields appear where they shouldn’t. Using a second model to grade answers can help at scale, but treat its scores as a reason to look closer, not a verdict, and check them against human judgment regularly.',
      },
      {
        p: 'For the failures that matter most, keep people in the loop. Domain experts reviewing a sample of real outputs every week will catch problems no metric was designed to see.',
      },
      {
        h2: 'Test every change like a release',
      },
      {
        p: 'Prompts, retrieval settings, model versions and source documents all change behavior, sometimes in places you didn’t touch. Run the full evaluation set on every change and compare the results with the last version you trusted. A fix for one case can quietly break others, and only regression tests catch that before your users do.',
      },
      {
        p: 'Keep the history of results, too. When quality shifts, you want to see exactly which change caused it and roll back in minutes, rather than debate it for days.',
      },
      {
        h2: 'Keep evaluating in production',
      },
      {
        p: 'Real users will ask things your evaluation set never imagined. Log inputs and outputs with the privacy controls your data requires, review a sample on a regular schedule, and watch signals like user corrections, escalations and abandoned sessions. The interesting failures go back into the evaluation set.',
      },
      {
        p: 'Set a review rhythm and stick to it. A weekly look at a small sample, owned by a named person, beats an annual audit that nobody remembers to run.',
      },
      {
        h2: 'Put guardrails where mistakes are expensive',
      },
      {
        ul: [
          'Give the system the least access it needs: read-only unless an action is truly required.',
          'Require confirmation before anything that can’t be undone.',
          'Ground answers in approved sources, and let the system say “I don’t know.”',
          'Route low-confidence or high-risk cases to a person.',
        ],
      },
      {
        p: 'Guardrails aren’t a sign of distrust in the model. They’re how you decide, deliberately, which mistakes the system is allowed to make on its own and which ones need a person.',
      },
      {
        quote:
          'Trust in an AI system should be earned the way trust in any system is: with evidence, collected continuously.',
      },
      {
        p: 'Done well, evaluation doesn’t slow a team down. It’s what lets you change prompts, switch models and ship improvements with confidence instead of crossed fingers.',
      },
    ],
    closing:
      'If you’re about to put an LLM system in front of customers or employees and want a second opinion on how it’s evaluated, let’s talk.',
  },
  {
    slug: 'first-30-days',
    title: 'The first 30 days of an AI project',
    dek: 'The first month decides whether an AI project becomes a working system or a slide. Here’s how we spend it.',
    date: '2026-10-01',
    related: ['ai-ml', 'digital-transformation'],
    body: [
      {
        p: 'Most of the risk in an AI project is visible early, if you go looking for it. Can we get the data? Is it good enough? Does the approach work on real cases? Will anyone actually use the result? The first 30 days are for answering those questions with evidence instead of opinions, so the decision at the end is easy to make.',
      },
      {
        p: 'A month is long enough to test an idea on real data and short enough that stopping is cheap. It forces the hard questions to the front, where they belong.',
      },
      {
        p: 'Here’s what that month looks like when we run it.',
      },
      {
        h2: 'Week 1: Discovery',
      },
      {
        p: 'We start with people, not models. We meet the stakeholders who own the outcome, the experts who do the work today and the team that runs the systems involved.',
      },
      {
        ul: [
          'Goals: what changes for the business if this works, and how we’ll measure it.',
          'Constraints: budget, deadlines, compliance requirements and the systems we can’t touch.',
          'Stakeholders: who decides, who will use it and who will support it after launch.',
          'Data access: what exists, where it lives and which approvals we need to reach it.',
        ],
      },
      {
        p: 'We also ask what has been tried before. Earlier attempts, even failed ones, are often the fastest way to learn where the real problems are.',
      },
      {
        p: 'Access approvals can take time, so we start them on day one.',
      },
      {
        h2: 'Week 2: Assessment and a written plan',
      },
      {
        p: 'With access in hand, we look at the real data: its quality, its gaps and how it changes over time. We measure how the current process performs, so there’s a baseline to beat, and we test the riskiest assumptions first. If the data can’t support the idea, this is where we say so: it’s far cheaper to change course in week 2 than in month six.',
      },
      {
        p: 'The week ends with a written plan: the approach, the architecture, what the prototype will and won’t do, how we’ll judge it, and the risks we can already see. It’s short enough to read in one sitting and specific enough to disagree with.',
      },
      {
        h2: 'Weeks 3–4: A working prototype on your data',
      },
      {
        p: 'Then we build. Not a slide deck or a mock-up, but a working prototype running on your real data and shaped like the production system it could become. It handles the core job end to end, even if some edges are still rough.',
      },
      {
        ul: [
          'We demo progress every week, to the people who will actually use it.',
          'We evaluate it against the baseline and the bar we agreed on in week 2.',
          'We keep a running list of what production would need: integrations, security, monitoring and support.',
        ],
      },
      {
        p: 'By the end of week four, the people who will use the system have already tried it, and their feedback has shaped what gets built next.',
      },
      {
        h2: 'Day 30: A decision',
      },
      {
        p: 'At the end of the month you have three things: a prototype you’ve seen working on your own data, results measured against a bar you agreed to, and a clear view of what production would take in time and cost. The decision is then straightforward:',
      },
      {
        ul: [
          'Go to production: the prototype cleared the bar and the path is clear.',
          'Adjust: the idea holds, but something has to change first, such as the scope, the data or the approach.',
          'Stop: the evidence says it isn’t worth it, and you found out in a month instead of a year.',
        ],
      },
      {
        p: 'Whichever way it goes, you decide with evidence in hand rather than a hunch.',
      },
      {
        quote: 'Stopping at day 30 isn’t a failure. Finding out a year later would have been.',
      },
      {
        h2: 'What we need from you',
      },
      {
        p: 'A month moves quickly when a few things are in place: a decision-maker who can make calls fast, someone who can unblock access to data and systems, and a few hours each week from the people who know the work best. Their judgment is the difference between a prototype that impresses and one that’s genuinely useful.',
      },
      {
        p: 'If any of these are hard to arrange, tell us early. We would rather plan around a constraint than discover it in week three.',
      },
    ],
    closing:
      'If you have an AI idea you’d like to test properly, a 30-minute call is a good place to start.',
  },
];
