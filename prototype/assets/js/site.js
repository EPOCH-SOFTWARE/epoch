// EPOCH prototype: shared chrome (logo, header, footer) and the page renderers.
// Content comes from data.js, which is exported from src/shared/constants.
(function () {
  'use strict';

  var DATA = window.EPOCH_DATA;
  var page = document.body.dataset.page || '';

  // ---------- Helpers ----------

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  function all(selector) {
    return Array.prototype.slice.call(document.querySelectorAll(selector));
  }

  function list(items, render) {
    return items.map(render).join('');
  }

  function asset(path) {
    return 'assets' + path;
  }

  function param(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function findService(id) {
    return DATA.services.filter(function (service) {
      return service.id === id;
    })[0];
  }

  function servicesIn(tier) {
    return DATA.services.filter(function (service) {
      return service.tier === tier;
    });
  }

  // ---------- Logo ----------

  var SPRITE =
    '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden">' +
    // Monoline caps, stroke 6.6 on a 40-unit cap height. Paths sit half a stroke inside the
    // letter edges so the ink keeps the same outer bounds (and spacing) at any weight.
    '<symbol id="wm-plain" viewBox="-0.5 -1 208 42">' +
    '<g fill="none" stroke="currentColor" stroke-width="6.6">' +
    '<path d="M26 3.3H3.3V36.7H26M3.3 20H23"/>' +
    '<path transform="translate(39 0)" d="M3.3 40V3.3H14A9.2 9.2 0 0 1 14 21.7H3.3"/>' +
    '<circle cx="98.5" cy="20" r="17.1"/>' +
    '<path transform="translate(131.3 0)" d="M32.71 8.56A17.1 17.1 0 1 0 32.71 31.44"/>' +
    '<path transform="translate(176.5 0)" d="M3.3 0V40M26.7 0V40M3.3 20H26.7"/>' +
    '</g>' +
    '</symbol>' +
    '<symbol id="mark" viewBox="0 0 48 48">' +
    '<path d="M31.45 8.72A17 17 0 1 1 16.55 8.72" fill="none" stroke="currentColor" stroke-width="5.2"/>' +
    '<circle cx="24" cy="7" r="3.6" style="fill:var(--logo-dot,currentColor)"/>' +
    '</symbol>' +
    '</svg>';

  var WORDMARK_BOX = '-0.5 -1 208 42';

  // The symbol (a full pass with its zero point) beside the wordmark.
  function logo() {
    return (
      '<span class="logo"><svg class="mk" viewBox="0 0 48 48"><use href="#mark"/></svg>' +
      '<svg viewBox="' + WORDMARK_BOX + '"><use href="#wm-plain"/></svg></span>'
    );
  }

  // ---------- Header and footer ----------

  var NAV = [
    { href: 'work.html', label: 'Work', pages: ['work', 'case'] },
    { href: 'services.html', label: 'Services', pages: ['services', 'service'] },
    { href: 'industries.html', label: 'Industries', pages: ['industries', 'industry'] },
    { href: 'how-we-work.html', label: 'How we work', pages: ['how-we-work'] },
    { href: 'insights.html', label: 'Insights', pages: ['insights', 'article'] },
    { href: 'about.html', label: 'About', pages: ['about'] },
  ];

  function navLinks() {
    return list(NAV, function (item) {
      var current = item.pages.indexOf(page) !== -1 ? ' aria-current="page"' : '';
      return '<a href="' + item.href + '"' + current + '>' + item.label + '</a>';
    });
  }

  function header() {
    return (
      '<a class="skip" href="#main">Skip to content</a>' +
      '<header class="site-header"><div class="wrap bar">' +
      '<a class="brand" href="index.html" aria-label="EPOCH home">' + logo() + '</a>' +
      '<nav class="nav" aria-label="Main">' + navLinks() + '</nav>' +
      '<a class="btn sm" href="contact.html">Start a project</a>' +
      '<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="menu">Menu</button>' +
      '</div>' +
      '<nav class="menu" id="menu" aria-label="Menu" hidden>' + navLinks() +
      '<a href="contact.html">Start a project</a></nav>' +
      '</header>'
    );
  }

  function footerServices(tier) {
    return list(servicesIn(tier), function (service) {
      return '<a href="service.html?id=' + service.id + '">' + esc(service.title) + '</a>';
    });
  }

  function footer() {
    var contact = DATA.contact;
    var social = list(contact.social, function (profile) {
      return '<a href="' + profile.href + '" target="_blank" rel="noopener noreferrer">' + esc(profile.label) + '</a>';
    });
    return (
      '<footer class="site-footer"><div class="wrap">' +
      '<div class="foot-grid">' +
      '<div class="foot-brand">' + logo() + '<p class="foot-tag">AI, engineered all the way to production.</p></div>' +
      '<nav class="foot-col" aria-label="AI services"><h2>AI</h2>' + footerServices('ai') + '</nav>' +
      '<nav class="foot-col" aria-label="Engineering services"><h2>Engineering</h2>' + footerServices('engineering') + '</nav>' +
      '<nav class="foot-col" aria-label="Company"><h2>Company</h2><a href="work.html">Work</a><a href="industries.html">Industries</a>' +
      '<a href="how-we-work.html">How we work</a><a href="insights.html">Insights</a><a href="about.html">About</a><a href="contact.html">Contact</a></nav>' +
      '<div class="foot-col"><h2>Talk to us</h2><a href="mailto:' + contact.email + '">' + esc(contact.email) + '</a>' +
      '<a href="' + contact.phoneHref + '">' + esc(contact.phone) + '</a>' + social + '</div>' +
      '</div>' +
      '<div class="legal"><span>© ' + new Date().getFullYear() + ' Epoch Software Services</span><span>Charlotte, NC and Ahmedabad, India</span></div>' +
      '<div class="foot-mark" aria-hidden="true"><svg viewBox="' + WORDMARK_BOX + '"><use href="#wm-plain"/></svg></div>' +
      '</div></footer>'
    );
  }

  function bindMenu() {
    var toggle = document.querySelector('.menu-toggle');
    var menu = document.getElementById('menu');
    if (!toggle || !menu) return;

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close' : 'Menu';
      menu.hidden = !open;
      document.body.style.overflow = open ? 'hidden' : '';
    }

    toggle.addEventListener('click', function () {
      setOpen(menu.hidden);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !menu.hidden) setOpen(false);
    });
  }

  // ---------- Shared blocks ----------

  function client(item) {
    var inner = item.logo
      ? '<img src="' + asset(item.logo) + '" alt="' + esc(item.name) + '">'
      : '<span class="wordmark">' + esc(item.name) + '</span>';
    return '<li class="client" data-client="' + item.id + '">' + inner + '</li>';
  }

  function serviceRow(service) {
    return (
      '<li class="row"><h3><a href="service.html?id=' + service.id + '">' + esc(service.title) + '</a></h3>' +
      '<p>' + esc(service.description) + '</p>' +
      '<p class="small">' + esc(service.highlights.join(', ')) + '</p></li>'
    );
  }

  // Prototype content: the main parts of each system, taken from the case study deliverables.
  // `ai` marks the step where the AI does its work.
  var SYSTEM_SKETCH = {
    'hub-international': {
      steps: ['Legacy systems', 'API integration layer', 'AI risk assessment', 'Automated claims workflow', 'Real-time analytics'],
      ai: 2,
    },
    'inspira-financial': {
      steps: ['Participant portal', 'API gateway', 'Plan administration engine', 'AI retirement guidance', 'Compliance monitoring'],
      ai: 3,
    },
  };

  function sketch(studyId) {
    var system = SYSTEM_SKETCH[studyId];
    if (!system) return '';
    return '<ol class="sketch" aria-label="How the system fits together">' + list(system.steps, function (step, index) {
      return '<li' + (index === system.ai ? ' class="ai"' : '') + '><span class="node" aria-hidden="true"></span>' + esc(step) + '</li>';
    }) + '</ol>';
  }

  function caseCard(study) {
    return (
      '<article class="card">' +
      '<div class="client" data-client="' + study.id + '"><img src="' + asset(study.logo) + '" alt="' + esc(study.name) + '"></div>' +
      '<p class="meta">' + esc(study.industry) + '</p>' +
      sketch(study.id) +
      '<h3><a href="case.html?id=' + study.id + '">' + esc(study.headline) + '</a></h3>' +
      '<div class="facts"><span>' + esc(study.timeline) + '</span><span>Team of ' + study.teamSize.epoch + ' from EPOCH</span></div>' +
      '<p class="more" aria-hidden="true">Read the case study</p>' +
      '</article>'
    );
  }

  var PROJECT_CARD =
    '<article class="card invert"><p class="meta">Your project</p>' +
    '<h3>One team, from the first model to long after launch.</h3>' +
    '<a class="btn sm" href="contact.html">Start a project</a></article>';

  var CLOSING =
    '<section class="section ruled closing" aria-labelledby="closing-title"><div class="wrap">' +
    '<h2 id="closing-title" class="display">Bring us the project that matters most.</h2>' +
    '<div class="closing-foot"><p class="lede">Tell us what you’re building and what’s in the way. You’ll hear back within 24 hours.</p>' +
    '<div class="actions"><a class="btn" href="contact.html">Start a project</a>' +
    '<a class="btn secondary" href="contact.html#book">Book a 30-minute call</a></div></div>' +
    '</div></section>';

  function office(item) {
    return (
      '<li class="office"><h3>' + esc(item.city) + '</h3>' +
      '<address>' + item.address.map(esc).join('<br>') + '</address>' +
      '<a href="' + item.mapHref + '" target="_blank" rel="noopener noreferrer">Get directions</a></li>'
    );
  }

  function bulletList(items, className) {
    return '<ul class="' + (className || 'list') + '">' + list(items, function (item) {
      return '<li>' + esc(item) + '</li>';
    }) + '</ul>';
  }

  function section(title, content, id) {
    return (
      '<section class="section ruled"' + (id ? ' id="' + id + '"' : '') + '><div class="wrap split">' +
      '<h2 class="h2">' + esc(title) + '</h2><div>' + content + '</div></div></section>'
    );
  }

  function notFound(title, href, label) {
    return (
      '<section class="page-hero"><div class="wrap"><p class="mono">404</p>' +
      '<h1 class="display">' + esc(title) + '</h1>' +
      '<div class="actions"><a class="btn" href="' + href + '">' + esc(label) + '</a></div></div></section>'
    );
  }

  function renderBlocks() {
    all('[data-clients]').forEach(function (target) {
      target.innerHTML = list(DATA.clients, client);
    });
    all('[data-service-rows]').forEach(function (target) {
      target.innerHTML = list(servicesIn(target.dataset.serviceRows), serviceRow);
    });
    all('[data-service-chips]').forEach(function (target) {
      target.innerHTML = list(servicesIn(target.dataset.serviceChips), function (service) {
        return '<li><a class="chip" href="service.html?id=' + service.id + '">' + esc(service.title) + '</a></li>';
      });
    });
    all('[data-case-cards]').forEach(function (target) {
      target.innerHTML = list(DATA.caseStudies, caseCard) + (target.dataset.caseCards === 'with-cta' ? PROJECT_CARD : '');
    });
    all('[data-commitments]').forEach(function (target) {
      target.innerHTML = list(DATA.commitments, function (item) {
        return '<li class="statement"><h3>' + esc(item.title) + '</h3><p>' + esc(item.detail) + '</p></li>';
      });
    });
    all('[data-offices]').forEach(function (target) {
      target.innerHTML = list(DATA.contact.offices, office);
    });
    all('[data-tech]').forEach(function (target) {
      target.innerHTML = list(DATA.techStack, function (group) {
        return '<div class="def"><dt class="mono">' + esc(group.category) + '</dt><dd><ul class="chips">' +
          list(group.technologies, function (name) {
            return '<li class="chip">' + esc(name) + '</li>';
          }) + '</ul></dd></div>';
      });
    });
    all('[data-closing]').forEach(function (target) {
      target.outerHTML = CLOSING;
    });
  }

  // ---------- Service detail ----------

  function renderService() {
    var main = document.getElementById('main');
    var id = param('id') || 'ai-ml';
    var detail = DATA.serviceDetails[id];
    var summary = findService(id);
    if (!detail || !summary) {
      main.innerHTML = notFound('We don’t offer that service.', 'services.html', 'See all services');
      return;
    }
    var tier = DATA.tiers.filter(function (item) {
      return item.id === summary.tier;
    })[0];
    document.title = summary.title + ' | EPOCH';

    var skills = '<ul class="skills">' + list(detail.expertise.skills, function (skill) {
      return '<li><strong>' + esc(skill.name) + '</strong><span>' + esc(skill.description) + '</span></li>';
    }) + '</ul>';
    var steps = '<ol class="steps">' + list(detail.process.steps, function (step) {
      return '<li><span class="num" aria-hidden="true">' + esc(step.step) + '</span><h3>' + esc(step.title) + '</h3><p>' + esc(step.description) + '</p></li>';
    }) + '</ol>';
    var deliver = '<ul class="rows">' + list(detail.keyServices, function (item) {
      return '<li class="row"><h3>' + esc(item.title) + '</h3><p>' + esc(item.description) + '</p><p class="small">' + esc(item.features.join(', ')) + '</p></li>';
    }) + '</ul>';
    var industries = '<ul class="industries">' + list(detail.industries, function (item) {
      return '<li><strong>' + esc(item.name) + '</strong><span>' + esc(item.applications.join(', ')) + '</span></li>';
    }) + '</ul>';
    var faqs = '<div class="faq">' + list(detail.faqs, function (item) {
      return '<details><summary>' + esc(item.question) + '</summary><p>' + esc(item.answer) + '</p></details>';
    }) + '</div>';

    main.innerHTML =
      '<section class="page-hero"><div class="wrap">' +
      '<p class="crumbs"><a href="services.html">Services</a><span aria-hidden="true">/</span><a href="services.html#tier-' + tier.id + '">' + esc(tier.title) + '</a></p>' +
      '<h1 class="display">' + esc(summary.title) + '</h1>' +
      '<p class="lede">' + esc(detail.heroDescription) + '</p>' +
      '<div class="actions"><a class="btn" href="contact.html">' + esc(detail.ctaButtonText) + '</a><a class="btn secondary" href="services.html">All services</a></div>' +
      '</div></section>' +
      section(detail.problemStatement.title, '<p class="lede strong">' + esc(detail.problemStatement.description) + '</p>' + bulletList(detail.problemStatement.painPoints, 'list mt-m')) +
      section(detail.overview.title, '<p class="lede strong">' + esc(detail.overview.description) + '</p>' +
        list(detail.overview.keyPoints, function (point) {
          return '<p class="body mt-s">' + esc(point) + '</p>';
        }) + '<h3 class="sub-h mt-l">' + esc(detail.expertise.title) + '</h3>' + skills) +
      '<section class="section ruled"><div class="wrap"><div class="head split"><h2 class="h2">What we deliver</h2></div>' + deliver + '</div></section>' +
      section(detail.process.title, steps) +
      section('Industries', industries) +
      section('Why EPOCH', bulletList(detail.whyEpoch)) +
      section('Questions', faqs) +
      '<section class="section ruled closing"><div class="wrap">' +
      '<h2 class="display">' + esc(detail.ctaTitle) + '</h2>' +
      '<div class="closing-foot"><p class="lede">' + esc(detail.ctaDescription) + '</p>' +
      '<div class="actions"><a class="btn" href="contact.html">' + esc(detail.ctaButtonText) + '</a><a class="btn secondary" href="services.html">All services</a></div></div>' +
      '</div></section>';
  }

  // ---------- Case study ----------

  function renderCase() {
    var main = document.getElementById('main');
    var id = param('id') || 'hub-international';
    var study = DATA.caseStudies.filter(function (item) {
      return item.id === id;
    })[0];
    if (!study) {
      main.innerHTML = notFound('We haven’t published that case study.', 'work.html', 'See all work');
      return;
    }
    document.title = study.name + ' | EPOCH';

    var facts =
      '<dl class="facts-row">' +
      '<div><dt>Industry</dt><dd>' + esc(study.industry) + '</dd></div>' +
      '<div><dt>Company size</dt><dd>' + esc(study.companySize) + '</dd></div>' +
      '<div><dt>Timeline</dt><dd>' + esc(study.timeline) + '</dd></div>' +
      '<div><dt>Team</dt><dd>' + study.teamSize.epoch + ' from EPOCH, ' + study.teamSize.client + ' from ' + esc(study.name) + '</dd></div>' +
      '</dl>';
    var process = study.workingProcess;
    var worked =
      '<dl class="facts-row single">' +
      '<div><dt>Method</dt><dd>' + esc(process.methodology) + '</dd></div>' +
      '<div><dt>Cadence</dt><dd>' + esc(process.meetingFrequency) + '</dd></div>' +
      '<div><dt>Tools</dt><dd>' + esc(process.communicationTools.join(', ')) + '</dd></div></dl>' +
      '<div class="two-col mt-l"><div><h3 class="sub-h">EPOCH team</h3>' + bulletList(study.teamRoles.epochRoles) + '</div>' +
      '<div><h3 class="sub-h">' + esc(study.name) + ' team</h3>' + bulletList(study.teamRoles.clientRoles) + '</div></div>';
    var outcomes =
      '<table class="outcomes"><caption class="sr-only">Outcomes for ' + esc(study.name) + '</caption>' +
      '<thead><tr><th scope="col">Area</th><th scope="col">Before</th><th scope="col">After</th><th scope="col">Result</th></tr></thead><tbody>' +
      list(study.quantifiableResults, function (result) {
        return '<tr><td>' + esc(result.metric) + '</td><td data-label="Before">' + esc(result.before) + '</td><td data-label="After">' + esc(result.after) + '</td><td data-label="Result">' + esc(result.improvement) + '</td></tr>';
      }) + '</tbody></table>' + bulletList(study.qualitativeResults, 'list mt-l');
    var related = study.relatedServices.map(findService).filter(Boolean);
    var testimonial = study.testimonial
      ? '<section class="section ruled"><div class="wrap"><figure><blockquote class="display quote">' + esc(study.testimonial.quote) +
        '</blockquote><figcaption class="label mt-m">' + esc(study.testimonial.author) + ', ' + esc(study.testimonial.position) + '</figcaption></figure></div></section>'
      : '';

    main.innerHTML =
      '<section class="page-hero"><div class="wrap">' +
      '<p class="crumbs"><a href="work.html">Work</a><span aria-hidden="true">/</span><span>' + esc(study.name) + '</span></p>' +
      '<ul class="clients"><li class="client" data-client="' + study.id + '"><img src="' + asset(study.logo) + '" alt="' + esc(study.name) + '"></li></ul>' +
      '<h1 class="display mt-m">' + esc(study.headline) + '</h1>' +
      '<p class="lede">' + esc(study.summary) + '</p>' + facts +
      '</div></section>' +
      section('The problem', bulletList(study.generalChallenges) + '<h3 class="sub-h mt-l">Why EPOCH</h3><p class="body">' + esc(study.whyChoseEpoch) + '</p>') +
      section('What we built', '<p class="lede strong">' + esc(study.projectScope) + '</p>' + bulletList(study.deliverables, 'list mt-m')) +
      section('How we worked', worked) +
      section('Where it got hard', bulletList(study.challengesOvercome, 'hard')) +
      section('Under the hood',
        '<h3 class="sub-h">Technical highlights</h3>' + bulletList(study.technicalHighlights) +
        '<h3 class="sub-h mt-l">What made it different</h3>' + bulletList(study.innovativeFeatures) +
        '<h3 class="sub-h mt-l">Technologies</h3><ul class="chips">' + list(study.technologies, function (name) {
          return '<li class="chip">' + esc(name) + '</li>';
        }) + '</ul>') +
      section('Outcomes', outcomes) +
      testimonial +
      section('Related services', '<ul class="chips">' + list(related, function (service) {
        return '<li><a class="chip" href="service.html?id=' + service.id + '">' + esc(service.title) + '</a></li>';
      }) + '</ul>') +
      CLOSING;
  }

  // ---------- Home hero: live time since t0 ----------

  function initClock() {
    var labels = all('[data-unix-label]');
    if (!labels.length) return;

    function show() {
      var seconds = Math.floor(Date.now() / 1000);
      labels.forEach(function (label) {
        label.textContent = 't = ' + seconds + ' s';
      });
    }

    show();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    function step() {
      show();
      window.setTimeout(step, 1000 - (Date.now() % 1000) + 10);
    }
    window.setTimeout(step, 1000 - (Date.now() % 1000) + 10);
  }

  // ---------- Home hero: measuring crosshair ----------

  function initMeasure() {
    var panel = document.querySelector('.v-draft');
    var svg = panel && panel.querySelector('svg');
    if (!panel || !svg || !window.matchMedia('(pointer: fine)').matches) return;

    panel.classList.add('measuring');
    panel.insertAdjacentHTML('beforeend', '<div class="xhair" aria-hidden="true"><span class="xh-h"></span><span class="xh-v"></span><span class="xh-label"></span></div>');
    var guide = panel.querySelector('.xhair');
    var label = panel.querySelector('.xh-label');
    var point = svg.createSVGPoint();

    panel.addEventListener('pointermove', function (event) {
      var box = panel.getBoundingClientRect();
      var x = event.clientX - box.left;
      var y = event.clientY - box.top;
      point.x = event.clientX;
      point.y = event.clientY;
      var local = point.matrixTransform(svg.getScreenCTM().inverse());
      label.textContent = 'x ' + local.x.toFixed(1) + '   y ' + local.y.toFixed(1);
      // Keep the readout inside the panel near the right and bottom edges.
      var flipX = x > box.width - 170;
      var flipY = y > box.height - 40;
      guide.style.setProperty('--x', x + 'px');
      guide.style.setProperty('--y', y + 'px');
      guide.style.setProperty('--lx', (flipX ? x - label.offsetWidth - 10 : x + 10) + 'px');
      guide.style.setProperty('--ly', (flipY ? y - label.offsetHeight - 10 : y + 10) + 'px');
    });
  }

  // ---------- Booking ----------

  // Set this to the scheduling link (Calendly, Cal.com, ...) to switch "Choose a time" over.
  // Until then the button opens an email asking for a call.
  var BOOKING_URL = '';

  function initBooking() {
    if (!BOOKING_URL) return;
    all('[data-booking]').forEach(function (link) {
      link.href = BOOKING_URL;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    });
  }

  // ---------- Contact form ----------

  var RULES = {
    name: function (value) {
      return value.trim() ? '' : 'Enter your name.';
    },
    email: function (value) {
      if (!value.trim()) return 'Enter your email address.';
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? '' : 'Enter an email address like name@company.com.';
    },
    message: function (value) {
      return value.trim() ? '' : 'Tell us a little about the project.';
    },
  };

  function initForm() {
    var form = document.querySelector('[data-contact-form]');
    var status = document.querySelector('[data-form-status]');
    if (!form || !status) return;

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var firstInvalid = null;
      Object.keys(RULES).forEach(function (name) {
        var input = form.elements.namedItem(name);
        var error = form.querySelector('[data-error-for="' + name + '"]');
        var message = RULES[name](input.value);
        input.setAttribute('aria-invalid', String(Boolean(message)));
        error.textContent = message;
        error.hidden = !message;
        if (message && !firstInvalid) firstInvalid = input;
      });
      if (firstInvalid) {
        status.hidden = true;
        firstInvalid.focus();
        return;
      }
      status.hidden = false;
      status.textContent = 'Prototype: on the live site this sends your message to operator@epoch.sh and confirms it here.';
    });
  }

  // ---------- Boot ----------

  document.body.insertAdjacentHTML('afterbegin', SPRITE + header());
  document.body.insertAdjacentHTML('beforeend', footer());

  if (page === 'service') renderService();
  if (page === 'case') renderCase();
  renderBlocks();
  initClock();
  initMeasure();
  initBooking();
  initForm();
  bindMenu();
})();
