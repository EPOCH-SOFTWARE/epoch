// Industry pages: the rows on industries.html and the industry.html?id= template.
// Content is grounded in EPOCH's case studies, client list and the industry applications
// already listed in the service content. No new claims about results.
(function () {
  'use strict';

  var DATA = window.EPOCH_DATA;

  var INDUSTRIES = [
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

  // ---------- Helpers ----------

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  function list(items, render) {
    return items.map(render).join('');
  }

  function byId(items, id) {
    return items.filter(function (item) {
      return item.id === id;
    })[0];
  }

  function resolve(items, ids) {
    return ids
      .map(function (id) {
        return byId(items, id);
      })
      .filter(Boolean);
  }

  function bullets(items, className) {
    return (
      '<ul class="' + className + '">' +
      list(items, function (item) {
        return '<li>' + esc(item) + '</li>';
      }) +
      '</ul>'
    );
  }

  function section(title, content) {
    return (
      '<section class="section ruled"><div class="wrap split">' +
      '<h2 class="h2">' + esc(title) + '</h2><div>' + content + '</div></div></section>'
    );
  }

  // ---------- Shared blocks (same markup as the site's cards and logo rows) ----------

  function caseCard(study) {
    return (
      '<article class="card">' +
      '<div class="client" data-client="' + study.id + '"><img src="assets' + study.logo + '" alt="' + esc(study.name) + '"></div>' +
      '<p class="meta">' + esc(study.industry) + '</p>' +
      '<h3><a href="case.html?id=' + study.id + '">' + esc(study.headline) + '</a></h3>' +
      '<div class="facts"><span>' + esc(study.timeline) + '</span><span>Team of ' + study.teamSize.epoch + ' from EPOCH</span></div>' +
      '<p class="more" aria-hidden="true">Read the case study</p>' +
      '</article>'
    );
  }

  function clientLogo(client) {
    var inner = client.logo
      ? '<img src="assets' + client.logo + '" alt="' + esc(client.name) + '">'
      : '<span class="wordmark">' + esc(client.name) + '</span>';
    return '<li class="client" data-client="' + client.id + '">' + inner + '</li>';
  }

  // ---------- industries.html ----------

  function renderIndex(target) {
    target.innerHTML = list(INDUSTRIES, function (industry) {
      var names = resolve(DATA.clients, industry.clientIds).map(function (client) {
        return client.name;
      });
      return (
        '<li class="row"><h3><a href="industry.html?id=' + industry.id + '">' + esc(industry.name) + '</a></h3>' +
        '<p>' + esc(industry.intro) + '</p>' +
        '<p class="small">' + esc(names.join(', ')) + '</p></li>'
      );
    });
  }

  // ---------- industry.html?id= ----------

  function removeClosing() {
    var closing = document.getElementById('closing-title');
    if (closing) closing.closest('section').remove();
  }

  function notFound(target) {
    target.innerHTML =
      '<section class="page-hero"><div class="wrap"><p class="mono">404</p>' +
      '<h1 class="display">We don’t have a page for that industry.</h1>' +
      '<div class="actions"><a class="btn" href="industries.html">See all industries</a></div></div></section>';
    removeClosing();
  }

  function logoList(label, clients) {
    return '<p class="pg-label">' + esc(label) + '</p><ul class="clients">' + list(clients, clientLogo) + '</ul>';
  }

  // The case study leads; the other clients in the industry follow without repeating its logo.
  function proof(industry) {
    var clients = resolve(DATA.clients, industry.clientIds);
    var study = industry.caseStudyId ? byId(DATA.caseStudies, industry.caseStudyId) : null;
    var place = industry.name.toLowerCase();
    if (!study) return section('Who we’ve worked with', logoList('Teams we’ve worked with in ' + place, clients));
    var others = clients.filter(function (client) {
      return client.id !== study.id;
    });
    var also = others.length ? '<div>' + logoList('Also in ' + place, others) + '</div>' : '';
    return section('Proof', '<div class="pg-proof">' + caseCard(study) + also + '</div>');
  }

  function renderIndustry(target) {
    var id = new URLSearchParams(window.location.search).get('id');
    var industry = byId(INDUSTRIES, id);
    if (!industry) {
      notFound(target);
      return;
    }
    document.title = industry.name + ' | EPOCH';

    var services = resolve(DATA.services, industry.serviceIds);
    target.innerHTML =
      '<section class="page-hero"><div class="wrap">' +
      '<p class="crumbs"><a href="industries.html">Industries</a><span aria-hidden="true">/</span><span>' + esc(industry.name) + '</span></p>' +
      '<h1 class="display">' + esc(industry.headline) + '</h1>' +
      '<p class="lede">' + esc(industry.intro) + '</p>' +
      '<div class="actions"><a class="btn" href="contact.html">Start a project</a>' +
      '<a class="btn secondary" href="contact.html#book">Book a 30-minute call</a></div>' +
      '</div></section>' +
      section('What gets in the way', bullets(industry.challenges, 'list')) +
      section('What we build', bullets(industry.whatWeBuild, 'pg-two-list')) +
      proof(industry) +
      section(
        'Services that fit',
        '<ul class="chips">' +
          list(services, function (service) {
            return '<li><a class="chip" href="service.html?id=' + service.id + '">' + esc(service.title) + '</a></li>';
          }) +
          '</ul>'
      );
  }

  // ---------- Boot ----------

  var index = document.querySelector('[data-industry-rows]');
  if (index) renderIndex(index);

  var detail = document.querySelector('[data-industry]');
  if (detail) renderIndustry(detail);
})();
