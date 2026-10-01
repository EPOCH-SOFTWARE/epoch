// EPOCH identity prototype: shared chrome, the direction/logo switcher and the page renderers.
// Content comes from data.js, which is exported from src/shared/constants.
(function () {
  'use strict';

  var DATA = window.EPOCH_DATA;
  var root = document.documentElement;
  var page = document.body.dataset.page || '';

  var DIRECTIONS = { a: 'Midnight', b: 'Draftsman', c: 'Ultramarine' };
  var LOGOS = ['1', '2', '3'];

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

  function save(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      console.warn('Could not save the prototype choice; it still applies to this page.', error);
    }
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
    '<symbol id="wm-integrated" viewBox="-0.5 -1 208 42">' +
    '<g fill="none" stroke="currentColor" stroke-width="4.4">' +
    '<path d="M26 2.2H2.2V37.8H26M2.2 20H23"/>' +
    '<path transform="translate(39 0)" d="M2.2 40V2.2H14A9.9 9.9 0 0 1 14 22H2.2"/>' +
    '<path transform="translate(78.5 0)" d="M27.4 3.37A18.2 18.2 0 1 1 12.6 3.37"/>' +
    '<path transform="translate(131.3 0)" d="M33.53 7.82A18.2 18.2 0 1 0 33.53 32.18"/>' +
    '<path transform="translate(176.5 0)" d="M2.2 0V40M27.8 0V40M2.2 20H27.8"/>' +
    '</g>' +
    '<circle cx="98.5" cy="1.8" r="3" style="fill:var(--logo-dot,currentColor)"/>' +
    '</symbol>' +
    '<symbol id="wm-plain" viewBox="-0.5 -1 208 42">' +
    '<g fill="none" stroke="currentColor" stroke-width="4.4">' +
    '<path d="M26 2.2H2.2V37.8H26M2.2 20H23"/>' +
    '<path transform="translate(39 0)" d="M2.2 40V2.2H14A9.9 9.9 0 0 1 14 22H2.2"/>' +
    '<circle cx="98.5" cy="20" r="18.2"/>' +
    '<path transform="translate(131.3 0)" d="M33.53 7.82A18.2 18.2 0 1 0 33.53 32.18"/>' +
    '<path transform="translate(176.5 0)" d="M2.2 0V40M27.8 0V40M2.2 20H27.8"/>' +
    '</g>' +
    '</symbol>' +
    '<symbol id="mark" viewBox="0 0 48 48">' +
    '<path d="M31.45 8.72A17 17 0 1 1 16.55 8.72" fill="none" stroke="currentColor" stroke-width="5.2"/>' +
    '<circle cx="24" cy="7" r="3.6" style="fill:var(--logo-dot,currentColor)"/>' +
    '</symbol>' +
    '</svg>';

  var WORDMARK_BOX = '-0.5 -1 208 42';

  function logo() {
    return (
      '<span class="logo logo-1"><svg viewBox="' + WORDMARK_BOX + '"><use href="#wm-integrated"/></svg></span>' +
      '<span class="logo logo-2"><svg class="mk" viewBox="0 0 48 48"><use href="#mark"/></svg>' +
      '<svg viewBox="' + WORDMARK_BOX + '"><use href="#wm-plain"/></svg></span>' +
      '<span class="logo logo-3"><svg viewBox="' + WORDMARK_BOX + '"><use href="#wm-plain"/></svg></span>'
    );
  }

  // ---------- Header and footer ----------

  var NAV = [
    { href: 'work.html', label: 'Work', pages: ['work', 'case'] },
    { href: 'services.html', label: 'Services', pages: ['services', 'service'] },
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
      '<nav class="foot-col" aria-label="Company"><h2>Company</h2><a href="work.html">Work</a><a href="about.html">About</a><a href="contact.html">Contact</a></nav>' +
      '<div class="foot-col"><h2>Talk to us</h2><a href="mailto:' + contact.email + '">' + esc(contact.email) + '</a>' +
      '<a href="' + contact.phoneHref + '">' + esc(contact.phone) + '</a>' + social + '</div>' +
      '</div>' +
      '<div class="legal"><span>© ' + new Date().getFullYear() + ' Epoch Software Services</span><span>Charlotte, NC and Ahmedabad, India</span></div>' +
      '</div></footer>'
    );
  }

  // ---------- Prototype switcher ----------

  function switcher() {
    var themes = list(Object.keys(DIRECTIONS), function (key) {
      return '<button type="button" data-theme-set="' + key + '" title="' + DIRECTIONS[key] + '">' + key.toUpperCase() + '</button>';
    });
    var logos = list(LOGOS, function (key) {
      return '<button type="button" data-logo-set="' + key + '" title="Logo ' + key + '">' + key + '</button>';
    });
    return (
      '<div class="proto" role="group" aria-label="Prototype: choose a direction and a logo">' +
      '<span class="proto-name" data-proto-name></span>' +
      '<div class="proto-group">' + themes + '</div>' +
      '<span class="proto-sep"></span><span>Logo</span>' +
      '<div class="proto-group">' + logos + '</div>' +
      '</div>'
    );
  }

  function syncSwitcher() {
    all('[data-theme-set]').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.themeSet === root.dataset.theme));
    });
    all('[data-logo-set]').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.logoSet === root.dataset.logo));
    });
    all('[data-proto-name]').forEach(function (label) {
      label.textContent = DIRECTIONS[root.dataset.theme];
    });
  }

  function bindSwitcher() {
    document.addEventListener('click', function (event) {
      var themeButton = event.target.closest('[data-theme-set]');
      var logoButton = event.target.closest('[data-logo-set]');
      if (themeButton) {
        root.dataset.theme = themeButton.dataset.themeSet;
        save('epoch-theme', root.dataset.theme);
      }
      if (logoButton) {
        root.dataset.logo = logoButton.dataset.logoSet;
        save('epoch-logo', root.dataset.logo);
      }
      if (themeButton || logoButton) syncSwitcher();
    });
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

  function caseCard(study) {
    return (
      '<article class="card">' +
      '<div class="client" data-client="' + study.id + '"><img src="' + asset(study.logo) + '" alt="' + esc(study.name) + '"></div>' +
      '<p class="meta">' + esc(study.industry) + '</p>' +
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
    '<a class="btn secondary" href="mailto:operator@epoch.sh">operator@epoch.sh</a></div></div>' +
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
    document.title = summary.title + ' — EPOCH';

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
    document.title = study.name + ' — EPOCH';

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

  // ---------- Home hero: the dial ----------

  function initDial() {
    var ticks = document.querySelector('[data-dial-ticks]');
    var readout = document.querySelector('[data-unix]');
    if (!ticks || !readout) return;

    var NS = 'http://www.w3.org/2000/svg';
    var OUTER = 479;
    for (var i = 0; i < 360; i++) {
      var major = i % 30 === 0;
      var length = major ? 22 : i % 5 === 0 ? 12 : 6;
      var angle = (i * Math.PI) / 180;
      var sin = Math.sin(angle);
      var cos = Math.cos(angle);
      var line = document.createElementNS(NS, 'line');
      line.setAttribute('x1', (sin * OUTER).toFixed(2));
      line.setAttribute('y1', (-cos * OUTER).toFixed(2));
      line.setAttribute('x2', (sin * (OUTER - length)).toFixed(2));
      line.setAttribute('y2', (-cos * (OUTER - length)).toFixed(2));
      line.setAttribute('class', major ? 't-major' : i % 5 === 0 ? 't-mid' : 't-minor');
      ticks.appendChild(line);
      if (major) {
        var x = (sin * (OUTER - 36)).toFixed(2);
        var y = (-cos * (OUTER - 36)).toFixed(2);
        var label = document.createElementNS(NS, 'text');
        label.setAttribute('x', x);
        label.setAttribute('y', y);
        label.setAttribute('transform', 'rotate(' + i + ' ' + x + ' ' + y + ')');
        label.textContent = String(i).padStart(3, '0');
        ticks.appendChild(label);
      }
    }

    // One tick per second since the Unix epoch: the bezel steps under the fixed zero marker.
    var start = Math.floor(Date.now() / 1000);
    var base = -(start % 360);
    function show(seconds, animate) {
      ticks.style.transition = animate ? 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)' : 'none';
      ticks.style.transform = 'rotate(' + (base - (seconds - start)) + 'deg)';
      readout.textContent = String(seconds);
    }
    show(start, false);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    function step() {
      var now = Date.now();
      show(Math.floor(now / 1000), true);
      window.setTimeout(step, 1000 - (now % 1000) + 10);
    }
    window.setTimeout(step, 1000 - (Date.now() % 1000) + 10);
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
  document.body.insertAdjacentHTML('beforeend', footer() + switcher());

  if (page === 'service') renderService();
  if (page === 'case') renderCase();
  renderBlocks();
  initDial();
  initForm();
  bindMenu();
  bindSwitcher();
  syncSwitcher();
})();
