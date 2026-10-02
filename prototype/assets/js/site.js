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

  // Mark 08, "In the name": the wordmark's O is a clock. Its opening and the orange point
  // turn once a day with the local time, midnight at the top.
  var KEPT = window.KeptTime;
  if (!KEPT) throw new Error('site.js needs kept-time.js to be loaded before it');

  // Monoline caps, stroke 6.6 on a 40-unit cap height. Paths sit half a stroke inside the
  // letter edges so the ink keeps the same outer bounds (and spacing) at any weight.
  var STROKES = '<g fill="none" stroke="currentColor" stroke-width="6.6">';
  var E_AND_P =
    '<path d="M26 3.3H3.3V36.7H26M3.3 20H23"/>' +
    '<path transform="translate(39 0)" d="M3.3 40V3.3H14A9.2 9.2 0 0 1 14 21.7H3.3"/>';
  var C_AND_H =
    '<path transform="translate(131.3 0)" d="M32.71 8.56A17.1 17.1 0 1 0 32.71 31.44"/>' +
    '<path transform="translate(176.5 0)" d="M3.3 0V40M26.7 0V40M3.3 20H26.7"/>';
  var O_CENTER = '98.5 20';
  var WORDMARK_BOX = '-0.5 -1 208 42';

  var SPRITE =
    '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden">' +
    '<symbol id="wm-plain" viewBox="' + WORDMARK_BOX + '">' +
    STROKES + E_AND_P + '<circle cx="98.5" cy="20" r="17.1"/>' + C_AND_H + '</g>' +
    '</symbol>' +
    '<symbol id="wm-clock" viewBox="' + WORDMARK_BOX + '">' +
    STROKES + E_AND_P + C_AND_H + '</g>' +
    '<g data-clock-o>' +
    '<path d="' + KEPT.arcPath(98.5, 20, 17.1, 28, 304) + '" fill="none" stroke="currentColor" stroke-width="6.6"/>' +
    '<circle cx="98.5" cy="2.9" r="4.2" style="fill:var(--logo-dot,currentColor)"/>' +
    '</g>' +
    '</symbol>' +
    '</svg>';

  function logo() {
    return (
      '<span class="logo"><svg viewBox="' + WORDMARK_BOX + '"><use href="#wm-clock"/></svg>' +
      '<span class="logo-note" aria-hidden="true" data-logo-note></span></span>'
    );
  }

  // The browser tab shows the same clock.
  function clockIcon(angle) {
    return (
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">' +
      '<rect width="48" height="48" rx="10" fill="#000"/>' +
      '<g transform="rotate(' + angle + ' 24 24)">' +
      '<path d="' + KEPT.arcPath(24, 24, 15, 28, 304) + '" fill="none" stroke="#f2efe8" stroke-width="4.6"/>' +
      '<circle cx="24" cy="9" r="3.8" fill="#ff4f00"/>' +
      '</g></svg>'
    );
  }

  // ---------- Office clocks ----------

  var OFFICE_ZONES = { 'Charlotte, NC': 'America/New_York', 'Ahmedabad, India': 'Asia/Kolkata' };

  function officeClock(city) {
    if (!OFFICE_ZONES[city]) throw new Error('No time zone for the office in "' + city + '"');
    return '<time data-zone="' + OFFICE_ZONES[city] + '"></time>';
  }

  // ---------- Header and footer ----------

  var NAV = [
    { href: 'work.html', label: 'Work', pages: ['work', 'case'] },
    { href: 'services.html', label: 'Services', pages: ['services', 'service'] },
    { href: 'how-we-work.html', label: 'How we work', pages: ['how-we-work'] },
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
      '</div></header>' +
      '<nav class="menu" id="menu" aria-label="Menu" hidden>' + navLinks() +
      '<a href="contact.html">Start a project</a></nav>'
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
      '<footer class="site-footer ruled"><span class="foot-glow" aria-hidden="true"></span><div class="wrap">' +
      '<div class="foot-grid">' +
      '<div class="foot-brand">' + logo() + '<p class="foot-tag">AI, engineered all the way to production.</p></div>' +
      '<nav class="foot-col" aria-label="AI services"><h2>AI</h2>' + footerServices('ai') + '</nav>' +
      '<nav class="foot-col" aria-label="Engineering services"><h2>Engineering</h2>' + footerServices('engineering') + '</nav>' +
      '<nav class="foot-col" aria-label="Company"><h2>Company</h2><a href="work.html">Work</a><a href="industries.html">Industries</a>' +
      '<a href="how-we-work.html">How we work</a><a href="insights.html">Insights</a><a href="about.html">About</a><a href="contact.html">Contact</a></nav>' +
      '<div class="foot-col"><h2>Talk to us</h2><a href="mailto:' + contact.email + '">' + esc(contact.email) + '</a>' +
      '<a href="' + contact.phoneHref + '">' + esc(contact.phone) + '</a>' + social + '</div>' +
      '</div>' +
      '<div class="legal"><span>© ' + new Date().getFullYear() + ' Epoch Software Services</span></div>' +
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
    // --i orders the drawing: each node, then the line down to the next, top to bottom.
    return '<ol class="sketch" aria-label="How the system fits together">' + list(system.steps, function (step, index) {
      return '<li style="--i:' + index + '"' + (index === system.ai ? ' class="ai"' : '') + '>' +
        '<svg class="node" viewBox="0 0 9 9" aria-hidden="true"><circle cx="4.5" cy="4.5" r="4" pathLength="1"/></svg>' +
        esc(step) + '</li>';
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

  // A larger editorial view of the existing case study, using its published scope verbatim.
  function featuredProject(study, full) {
    return '<article class="project-feature" id="featured-' + study.id + '">' +
      '<div class="project-mast"><img src="' + asset(study.logo) + '" alt="' + esc(study.name) + '">' +
      '<span>' + esc(study.industry) + '</span></div>' +
      '<div class="project-layout"><div class="project-story">' +
      '<h3><a href="case.html?id=' + study.id + '">' + esc(study.headline) + '</a></h3>' +
      '<p>' + esc(study.summary) + '</p>' +
      '<a class="text-link" href="case.html?id=' + study.id + '">Inside the project</a></div>' +
      '<div class="project-scope"><p class="scope-caption">Selected deliverables</p>' +
      '<ul>' + list(study.deliverables.slice(0, 3), function (item) {
        return '<li><span class="scope-node" aria-hidden="true"></span>' + esc(item) + '</li>';
      }) + '</ul><p class="scope-foot">' + esc(study.deliverables[study.id === 'hub-international' ? 4 : 6]) + '</p></div></div>' +
      (full ? '<div class="project-context"><div><h4>The challenge</h4><p>' + esc(study.generalChallenges[0]) +
        '.</p></div><div><h4>EPOCH’s scope</h4><p>' + esc(study.projectScope) + '</p></div></div>' : '') +
      '</article>';
  }

  function projectCompanion(study) {
    return '<article class="project-companion"><div><img src="' + asset(study.logo) + '" alt="' + esc(study.name) + '">' +
      '<p>' + esc(study.industry) + '</p></div><div><h3><a href="case.html?id=' + study.id + '">' + esc(study.headline) +
      '</a></h3><p>' + esc(study.summary) + '</p><a class="text-link" href="case.html?id=' + study.id + '">Inside the project</a></div></article>';
  }

  // The two ways in, offered the same way on every page.
  var CALLS =
    '<div class="actions"><a class="btn" href="contact.html">Start a project</a>' +
    '<a class="btn secondary" href="contact.html#book">Book a 30-minute call</a></div>';

  var CLOSING =
    '<section class="section ruled closing" aria-labelledby="closing-title"><div class="wrap">' +
    '<h2 id="closing-title" class="display">Bring us the project that matters most.</h2>' +
    '<div class="closing-foot"><p class="lede">Tell us what you’re building and what’s in the way. You’ll hear back within 24 hours.</p>' +
    CALLS + '</div>' +
    '</div></section>';

  function office(item) {
    return (
      '<li class="office"><h3>' + esc(item.city) + '</h3>' +
      '<p class="office-time">Local time ' + officeClock(item.city) + '</p>' +
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

  // A section whose content runs the full width under its title, for tables and long rows.
  function wideSection(title, content) {
    return (
      '<section class="section ruled"><div class="wrap">' +
      '<div class="head split"><h2 class="h2">' + esc(title) + '</h2></div>' + content + '</div></section>'
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
    all('[data-featured-work]').forEach(function (target) {
      target.innerHTML = featuredProject(DATA.caseStudies[0], target.dataset.featuredWork === 'full') +
        projectCompanion(DATA.caseStudies[1]);
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
        return '<div class="def"><dt>' + esc(group.category) + '</dt><dd><ul class="chips">' +
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
      CALLS +
      '</div></section>' +
      section(detail.problemStatement.title, '<p class="lede strong">' + esc(detail.problemStatement.description) + '</p>' + bulletList(detail.problemStatement.painPoints, 'list mt-m')) +
      section(detail.overview.title, '<p class="lede strong">' + esc(detail.overview.description) + '</p>' +
        list(detail.overview.keyPoints, function (point) {
          return '<p class="body mt-s">' + esc(point) + '</p>';
        }) + '<h3 class="sub-h mt-l">' + esc(detail.expertise.title) + '</h3>' + skills) +
      wideSection('What we deliver', deliver) +
      section(detail.process.title, steps) +
      section('Industries', industries) +
      section('Why EPOCH', bulletList(detail.whyEpoch)) +
      section('Questions', faqs) +
      '<section class="section ruled closing"><div class="wrap">' +
      '<h2 class="display">' + esc(detail.ctaTitle) + '</h2>' +
      '<div class="closing-foot"><p class="lede">' + esc(detail.ctaDescription) + '</p>' +
      CALLS + '</div>' +
      '</div></section>';
  }

  // ---------- Case study ----------

  // The engagement drawn on the O: one turn is a year, and the arc runs for the real timeline.
  // Nothing is drawn for a timeline that is not written in months or runs past a year.
  var DIAL = { cx: 220, cy: 200, r: 130 };

  function dialTicks() {
    var ticks = '';
    for (var month = 0; month < 12; month++) {
      var major = month % 3 === 0;
      var inner = KEPT.polar(DIAL.cx, DIAL.cy, DIAL.r + 10, month * 30);
      var outer = KEPT.polar(DIAL.cx, DIAL.cy, DIAL.r + (major ? 22 : 16), month * 30);
      ticks += '<line' + (major ? ' class="major"' : '') + ' x1="' + KEPT.num(inner.x) + '" y1="' + KEPT.num(inner.y) +
        '" x2="' + KEPT.num(outer.x) + '" y2="' + KEPT.num(outer.y) + '"/>';
    }
    return '<g class="dial-ticks">' + ticks + '</g>';
  }

  // The label sits just outside the end of the arc, reading away from the ring.
  function dialLabel(text, angle) {
    var spot = KEPT.polar(DIAL.cx, DIAL.cy, DIAL.r + 40, angle);
    var side = Math.sin((angle * Math.PI) / 180);
    var anchor = side > 0.3 ? 'start' : side < -0.3 ? 'end' : 'middle';
    return '<text class="dial-label" x="' + KEPT.num(spot.x) + '" y="' + KEPT.num(spot.y + 5) + '" text-anchor="' + anchor + '">' +
      esc(text) + '</text>';
  }

  function engagementDial(study) {
    var months = KEPT.monthsIn(study.timeline);
    if (!months || months > 12) return '';
    var sweep = months * 30;
    var end = KEPT.polar(DIAL.cx, DIAL.cy, DIAL.r, sweep);
    return (
      // A picture of the Timeline fact below it, so assistive technology reads the fact instead.
      '<figure class="case-dial" aria-hidden="true">' +
      '<svg viewBox="0 0 440 400">' +
      '<circle class="dial-year" cx="' + DIAL.cx + '" cy="' + DIAL.cy + '" r="' + DIAL.r + '"/>' + dialTicks() +
      '<path class="dial-arc" pathLength="1" d="' + KEPT.arcPath(DIAL.cx, DIAL.cy, DIAL.r, 0, sweep) + '"/>' +
      '<g class="dial-end"><circle cx="' + KEPT.num(end.x) + '" cy="' + KEPT.num(end.y) + '" r="6"/>' +
      dialLabel(study.timeline, sweep) + '</g>' +
      '</svg>' +
      '<figcaption>One turn of the dial is a year.</figcaption>' +
      '</figure>'
    );
  }

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
      '<div><dt>Team</dt><dd>' + study.teamSize.epoch + ' from EPOCH<br />' + study.teamSize.client + ' from ' + esc(study.name) + '</dd></div>' +
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
      }) + '</tbody></table>' +
      '<div class="split on-baseline mt-l"><h3 class="sub-h">What else changed</h3>' + bulletList(study.qualitativeResults) + '</div>';
    var related = study.relatedServices.map(findService).filter(Boolean);
    var testimonial = study.testimonial
      ? '<section class="section ruled"><div class="wrap"><figure><blockquote class="display quote">' + esc(study.testimonial.quote) +
        '</blockquote><figcaption class="label mt-m">' + esc(study.testimonial.author) + ', ' + esc(study.testimonial.position) + '</figcaption></figure></div></section>'
      : '';

    main.innerHTML =
      '<section class="page-hero"><div class="wrap">' +
      '<p class="crumbs"><a href="work.html">Work</a><span aria-hidden="true">/</span><span>' + esc(study.name) + '</span></p>' +
      '<div class="case-intro"><div>' +
      '<ul class="clients"><li class="client" data-client="' + study.id + '"><img src="' + asset(study.logo) + '" alt="' + esc(study.name) + '"></li></ul>' +
      '<h1 class="display mt-m">' + esc(study.headline) + '</h1>' +
      '<p class="lede">' + esc(study.summary) + '</p></div>' + engagementDial(study) + '</div>' + facts +
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
      wideSection('Outcomes', outcomes) +
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

  // ---------- The living O ----------

  // Every O on the page is a 24-hour clock: the logo (one shared symbol), the favicon and the home drawing.
  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var HERO_PIVOT = '320 340';

  function nowAngle() {
    return KEPT.localDayFraction(new Date()) * 360;
  }

  function turn(node, degrees, pivot) {
    node.setAttribute('transform', 'rotate(' + KEPT.num(degrees) + ' ' + pivot + ')');
  }

  // Turns an O from midnight to the current time, easing out, then calls done.
  function windToNow(node, pivot, duration, done) {
    var started = null;
    function frame(time) {
      if (started === null) started = time;
      var progress = Math.min((time - started) / duration, 1);
      turn(node, nowAngle() * (1 - Math.pow(1 - progress, 3)), pivot);
      if (progress < 1) {
        window.requestAnimationFrame(frame);
      } else {
        done();
      }
    }
    window.requestAnimationFrame(frame);
  }

  // The logo winds once per visit, so people notice that it is a clock.
  function firstPageThisVisit() {
    try {
      if (window.sessionStorage.getItem('epoch-wound')) return false;
      window.sessionStorage.setItem('epoch-wound', '1');
      return true;
    } catch (error) {
      // Storage can be blocked (private browsing); winding on every page is the acceptable fallback.
      return true;
    }
  }

  // The label sits a little clockwise of the hand so the line never runs through the text.
  function placeNowLabel(label) {
    var spot = KEPT.polar(320, 340, 96, nowAngle() + 24);
    label.setAttribute('x', KEPT.num(spot.x));
    label.setAttribute('y', KEPT.num(spot.y + 5));
    label.textContent = 'now ' + KEPT.zoneTime(new Date());
  }

  // Everything that reads the clock as text: the logo's note, the favicon and the office clocks.
  function showTime() {
    var now = new Date();
    all('[data-logo-note]').forEach(function (note) {
      note.textContent = 'It’s ' + KEPT.zoneTime(now) + '. The O points to now.';
    });
    var icon = document.querySelector('link[rel="icon"]');
    if (icon) icon.setAttribute('href', 'data:image/svg+xml,' + encodeURIComponent(clockIcon(KEPT.num(nowAngle()))));
    all('time[data-zone]').forEach(function (clock) {
      clock.textContent = KEPT.zoneTime(now, clock.dataset.zone);
    });
  }

  function initLivingO() {
    var logoO = document.querySelector('[data-clock-o]');
    var heroO = document.querySelector('[data-hero-o]');
    var heroNow = document.querySelector('[data-hero-now]');
    showTime();

    if (REDUCED || !firstPageThisVisit()) {
      turn(logoO, nowAngle(), O_CENTER);
    } else {
      windToNow(logoO, O_CENTER, 1400, function () {});
    }

    if (heroO) {
      var showNow = function () {
        placeNowLabel(heroNow);
        heroNow.classList.add('on');
      };
      if (REDUCED) {
        turn(heroO, nowAngle(), HERO_PIVOT);
        showNow();
      } else {
        // Wait for the ring to finish drawing itself, then wind it round to now.
        window.setTimeout(function () {
          windToNow(heroO, HERO_PIVOT, 1600, showNow);
        }, 2400);
      }
    }

    window.setInterval(function () {
      turn(logoO, nowAngle(), O_CENTER);
      if (heroO) {
        turn(heroO, nowAngle(), HERO_PIVOT);
        placeNowLabel(heroNow);
      }
      showTime();
    }, 60000);
  }

  // ---------- Lines that draw themselves ----------

  // Section rules and the case-card sketches draw once, as they come into view. Text never moves.
  function initDrawing() {
    var drawings = all('.ruled, .sketch');
    if (REDUCED || !drawings.length || !('IntersectionObserver' in window)) return;
    document.documentElement.classList.add('draws');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('drawn');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    drawings.forEach(function (drawing) {
      observer.observe(drawing);
    });
  }

  // ---------- How we work: the first 30 days on the O ----------

  // Four equal week arcs run round the logo's O, from the start of the ring to its end, and day 30
  // sits in the opening at the top, where the logo keeps its point. Reading the steps carries the
  // point round, so the plan finishes as the mark. Proportions follow the logo: stroke 0.386 r, point 0.246 r.
  // `weeks` are the ticks between the week arcs; `stops` are where each step leaves the point.
  var MONTH = {
    cx: 240,
    cy: 200,
    r: 118,
    start: 28,
    sweep: 304,
    weeks: [28, 104, 180, 256, 332],
    stops: [104, 180, 332, 360],
  };
  var MONTH_LABELS = [
    { text: 'Week 1', angle: 66, anchor: 'start' },
    { text: 'Week 2', angle: 142, anchor: 'start' },
    { text: 'Weeks 3–4', angle: 240, anchor: 'end' },
    { text: 'Day 30', angle: 0, anchor: 'middle' },
  ];

  function monthRing() {
    var ring = KEPT.arcPath(MONTH.cx, MONTH.cy, MONTH.r, MONTH.start, MONTH.sweep);
    var ticks = list(MONTH.weeks, function (angle) {
      var inner = KEPT.polar(MONTH.cx, MONTH.cy, MONTH.r + 30, angle);
      var outer = KEPT.polar(MONTH.cx, MONTH.cy, MONTH.r + 40, angle);
      return '<line x1="' + KEPT.num(inner.x) + '" y1="' + KEPT.num(inner.y) + '" x2="' + KEPT.num(outer.x) + '" y2="' + KEPT.num(outer.y) + '"/>';
    });
    var labels = list(MONTH_LABELS, function (label) {
      var spot = KEPT.polar(MONTH.cx, MONTH.cy, MONTH.r + 57, label.angle);
      return '<text class="mr-label" x="' + KEPT.num(spot.x) + '" y="' + KEPT.num(spot.y + 6) + '" text-anchor="' + label.anchor + '">' +
        label.text + '</text>';
    });
    return (
      '<svg viewBox="0 0 480 400" aria-hidden="true">' +
      '<g class="mr-ticks">' + ticks + '</g>' + labels +
      '<path class="mr-track" d="' + ring + '"/>' +
      '<path class="mr-lit" pathLength="1" d="' + ring + '"/>' +
      '<g class="mr-point"><circle cx="' + MONTH.cx + '" cy="' + (MONTH.cy - MONTH.r) + '" r="29"/></g>' +
      '</svg>'
    );
  }

  function initMonthRing() {
    var holder = document.querySelector('[data-month-ring]');
    var steps = all('[data-ring-steps] > li');
    if (!holder || !steps.length) return;
    holder.innerHTML = monthRing();
    var svg = holder.querySelector('svg');
    var labels = all('[data-month-ring] .mr-label');
    var beside = window.matchMedia('(min-width: 901px)');
    var queued = false;

    // `current` is the step being read, or -1 when the ring simply shows the whole month.
    function show(index, current) {
      var stop = KEPT.ringStop(MONTH.start, MONTH.sweep, MONTH.stops, index);
      svg.style.setProperty('--angle', stop.angle + 'deg');
      svg.style.setProperty('--lit', KEPT.num(stop.lit));
      steps.forEach(function (step, i) {
        step.classList.toggle('current', i === current);
      });
      labels.forEach(function (label, i) {
        label.classList.toggle('current', i === current);
      });
    }

    // Beside the steps the ring follows the reader; stacked above them, or without motion, it rests complete.
    function update() {
      queued = false;
      if (REDUCED || !beside.matches) {
        show(MONTH.stops.length - 1, -1);
        return;
      }
      var tops = steps.map(function (step) {
        return step.getBoundingClientRect().top;
      });
      var index = KEPT.stepAt(tops, window.innerHeight * 0.55);
      show(index, index);
    }

    function queue() {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(update);
    }

    window.addEventListener('scroll', queue, { passive: true });
    beside.addEventListener('change', update);
    update();
  }

  // ---------- Scrolling: the header's blur and the reading clock ----------

  // The logo's O again, keeping reading time: the point goes once round as the page is read.
  function readingClock() {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'reading-clock';
    button.setAttribute('aria-label', 'Back to top');
    button.innerHTML =
      '<svg viewBox="77 -1.5 43 43" aria-hidden="true"><g data-reading-o>' +
      '<path d="' + KEPT.arcPath(98.5, 20, 17.1, 28, 304) + '" fill="none" stroke="currentColor" stroke-width="6.6"/>' +
      '<circle cx="98.5" cy="2.9" r="4.2" style="fill:var(--logo-dot)"/></g></svg>';
    button.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' });
      document.querySelector('.brand').focus({ preventScroll: true });
    });
    document.body.appendChild(button);
    return button;
  }

  function initScroll() {
    var header = document.querySelector('.site-header');
    var footer = document.querySelector('.site-footer');
    var clock = readingClock();
    var hand = clock.querySelector('[data-reading-o]');
    var queued = false;

    function update() {
      queued = false;
      var top = window.scrollY;
      var page = document.documentElement.scrollHeight;
      var view = window.innerHeight;
      header.classList.toggle('scrolled', top > 4);
      // Only long pages get the clock, and only once the reader is past the first screen.
      clock.classList.toggle('shown', page > view * 2.2 && top > view * 0.6);
      turn(hand, KEPT.readingProgress(top, page, view) * 360, O_CENTER);
      // The footer's dusk rises like a sunrise: dim as the footer enters, fully lit at the very end of the page.
      var footerTop = footer.getBoundingClientRect().top + top;
      footer.style.setProperty('--rise', REDUCED ? 1 : KEPT.num(KEPT.rangeProgress(top + view, footerTop, page)));
    }

    function queue() {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(update);
    }

    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    update();
  }

  // ---------- Magnetic buttons ----------

  // Primary buttons lean up to 6px toward a mouse pointer and settle back when it leaves.
  function initMagnets() {
    if (REDUCED || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    all('.btn:not(.secondary)').forEach(function (button) {
      var pull = { x: 0, y: 0 };
      button.addEventListener('pointermove', function (event) {
        var box = button.getBoundingClientRect();
        // Measure from where the button rests, not from where it has drifted to.
        var centerX = box.left - pull.x + box.width / 2;
        var centerY = box.top - pull.y + box.height / 2;
        pull = KEPT.magnet(event.clientX - centerX, event.clientY - centerY, box.width / 2, box.height / 2, 6);
        button.style.translate = KEPT.num(pull.x) + 'px ' + KEPT.num(pull.y) + 'px';
      });
      button.addEventListener('pointerleave', function () {
        pull = { x: 0, y: 0 };
        button.style.translate = '';
      });
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

  // Shows or clears one field's message and returns the field when it needs fixing.
  function checkField(form, name) {
    var input = form.elements.namedItem(name);
    var error = form.querySelector('[data-error-for="' + name + '"]');
    var message = RULES[name](input.value);
    input.setAttribute('aria-invalid', String(Boolean(message)));
    error.textContent = message;
    error.hidden = !message;
    return message ? input : null;
  }

  // A field explains a problem once you leave it with something typed, then clears the message the
  // moment it is fixed. Sending checks every field and takes you to the first one that needs fixing.
  function watchField(form, name) {
    var input = form.elements.namedItem(name);
    input.addEventListener('blur', function () {
      if (input.value.trim() || input.getAttribute('aria-invalid') === 'true') checkField(form, name);
    });
    input.addEventListener('input', function () {
      if (input.getAttribute('aria-invalid') === 'true') checkField(form, name);
    });
  }

  // The form gives way to a confirmation in the same place, addressed to the sender.
  function showSent(form, done) {
    var firstName = form.elements.namedItem('name').value.trim().split(/\s+/)[0];
    var title = done.querySelector('[data-done-title]');
    title.textContent = 'Thanks, ' + firstName + '. Your message is in.';
    done.querySelector('[data-done-text]').textContent =
      'We’ll reply to ' + form.elements.namedItem('email').value.trim() + ' within 24 hours.';
    form.hidden = true;
    done.hidden = false;
    title.focus();
  }

  function initForm() {
    var form = document.querySelector('[data-contact-form]');
    var done = document.querySelector('[data-form-done]');
    if (!form || !done) return;
    var names = Object.keys(RULES);
    names.forEach(function (name) {
      watchField(form, name);
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var needsFixing = names
        .map(function (name) {
          return checkField(form, name);
        })
        .filter(Boolean);
      if (needsFixing.length) {
        needsFixing[0].focus();
        return;
      }
      showSent(form, done);
    });

    done.querySelector('[data-form-again]').addEventListener('click', function () {
      form.reset();
      done.hidden = true;
      form.hidden = false;
      form.elements.namedItem('name').focus();
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
  initLivingO();
  initDrawing();
  initMonthRing();
  initScroll();
  initMagnets();
})();
