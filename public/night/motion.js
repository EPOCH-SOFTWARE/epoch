// The accepted Night motion, enhanced after React hydration. Pages use native links.
(function () { 'use strict';
const KEPT = window.KeptTime;
const O_CENTER = '98.5 20';
function all(selector) { return Array.from(document.querySelectorAll(selector)); }
function list(items, render) { return items.map(render).join(''); }
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

  function bindMenu() {
    var toggle = document.querySelector('.menu-toggle');
    var menu = document.getElementById('menu');
    if (!toggle || !menu) return;
    var background = [document.getElementById('main'), document.querySelector('.site-footer')].filter(Boolean);
    var links = Array.from(menu.querySelectorAll('a'));

    function setOpen(open, restoreFocus) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close' : 'Menu';
      menu.hidden = !open;
      document.body.style.overflow = open ? 'hidden' : '';
      background.forEach(function (element) { element.inert = open; });
      if (open) links[0].focus({ preventScroll: true });
      else if (restoreFocus) toggle.focus({ preventScroll: true });
    }

    toggle.addEventListener('click', function () { setOpen(menu.hidden, true); });
    links.forEach(function (anchor) {
      anchor.addEventListener('click', function () { setOpen(false, false); });
    });
    document.addEventListener('keydown', function (event) {
      if (menu.hidden) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false, true);
      }
      if (event.key === 'Tab') {
        var stops = [toggle].concat(links);
        var index = stops.indexOf(document.activeElement);
        if (event.shiftKey && index <= 0) {
          event.preventDefault();
          stops[stops.length - 1].focus();
        } else if (!event.shiftKey && (index === stops.length - 1 || index === -1)) {
          event.preventDefault();
          toggle.focus();
        }
      }
    });
    window.matchMedia('(min-width: 1061px)').addEventListener('change', function (event) {
      if (event.matches && !menu.hidden) setOpen(false, false);
    });
  }

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

  function followContents() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.ins-toc a'));
    if (!links.length) return;
    var headings = links.map(function (link) {
      var heading = document.getElementById(link.hash.slice(1));
      if (!heading) throw new Error('The contents link "' + link.hash + '" has no heading to point to');
      return heading;
    });
    var queued = false;

    function update() {
      queued = false;
      var tops = headings.map(function (heading) {
        return heading.getBoundingClientRect().top;
      });
      var current = window.KeptTime.stepAt(tops, window.innerHeight * 0.3);
      links.forEach(function (link, index) {
        link.classList.toggle('current', index === current);
        if (index === current) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }

    window.addEventListener(
      'scroll',
      function () {
        if (queued) return;
        queued = true;
        window.requestAnimationFrame(update);
      },
      { passive: true }
    );
    update();
  }

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

  // The prototype previews an enquiry without implying it has been delivered.
  function showSent(form, done) {
    var firstName = form.elements.namedItem('name').value.trim().split(/\s+/)[0];
    var title = done.querySelector('[data-done-title]');
    title.textContent = 'Your enquiry is ready, ' + firstName + '.';
    done.querySelector('[data-done-text]').textContent =
      'You’ve added a project brief and the reply address ' + form.elements.namedItem('email').value.trim() + '.';
    var preview = done.querySelector('[data-enquiry-preview]');
    preview.replaceChildren();
    ['company', 'projectType', 'budget', 'timeline'].forEach(function (name) {
      var field = form.elements.namedItem(name);
      if (!field.value) return;
      var row = document.createElement('div');
      var label = document.createElement('dt');
      label.textContent = { company: 'Company', projectType: 'Project type', budget: 'Budget', timeline: 'Timeline' }[name];
      var value = document.createElement('dd');
      value.textContent = field.tagName === 'SELECT' ? field.selectedOptions[0].textContent : field.value;
      row.append(label, value);
      preview.append(row);
    });
    done.querySelector('[data-preview-message]').textContent = form.elements.namedItem('message').value;
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
      done.hidden = true;
      form.hidden = false;
      form.elements.namedItem('name').focus();
    });
  }


function initContactContext() {
  var form = document.querySelector('[data-contact-form]');
  if (!form) return;
  var select = form.elements.namedItem('projectType');
  var services = Array.from(select.options).filter(option => option.value).map(option => ({ id: option.value, title: option.textContent }));
  var context = KEPT.contactContext(location.search, services, JSON.parse(form.dataset.goals));
  var banner = document.querySelector('[data-enquiry-context]');
  function clearContext() {
    banner.hidden = true;
    var url = new URL(location.href);
    url.searchParams.delete('goal'); url.searchParams.delete('service');
    history.replaceState(null, '', url);
  }
  if (context) { select.value = context.service; banner.querySelector('p').textContent = 'Let’s talk about: ' + context.label; banner.hidden = false; }
  select.addEventListener('change', clearContext);
  document.querySelector('[data-clear-context]').addEventListener('click', function () { select.value = ''; clearContext(); form.elements.namedItem('name').focus(); });
}
initContactContext(); initForm(); initClock(); initMeasure(); bindMenu(); initLivingO(); initDrawing(); initMonthRing(); initScroll(); initMagnets(); followContents();
 document.documentElement.dataset.nightReady = 'true';
})();
