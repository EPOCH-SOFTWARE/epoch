// Marks 08–15 on marks.html: more logos that keep time themselves.
// Time and geometry come from kept-time.js (unit-tested); this file only draws.
(function () {
  'use strict';

  var K = window.KeptTime;
  var NS = 'http://www.w3.org/2000/svg';
  var INK = '#f2efe8';
  var SIGNAL = '#ff4f00';
  var BLACK = '#050505';
  var REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var STARTED = performance.now();
  var START_FRACTION = K.localDayFraction(new Date());

  // The site symbol: a ring open at the top, holding the orange point.
  var MARK = { cx: 24, cy: 24, r: 17, weight: 5.2, opening: 52, point: 3.6 };
  var MARK_BOX = '0 0 48 48';
  var STAGE_BOX = '-7.5 -7.5 63 63';
  var WORD_BOX = '-12 -16 232 72';
  var LETTERS_WITHOUT_O = [
    { x: 0, d: 'M26 3.3H3.3V36.7H26M3.3 20H23' },
    { x: 39, d: 'M3.3 40V3.3H14A9.2 9.2 0 0 1 14 21.7H3.3' },
    { x: 131.3, d: 'M32.71 8.56A17.1 17.1 0 1 0 32.71 31.44' },
    { x: 176.5, d: 'M3.3 0V40M26.7 0V40M3.3 20H26.7' },
  ];

  // ---------- Drawing helpers ----------

  function make(parent, name, attributes) {
    var node = document.createElementNS(NS, name);
    Object.keys(attributes).forEach(function (key) {
      node.setAttribute(key, attributes[key]);
    });
    parent.appendChild(node);
    return node;
  }

  function movePoint(node, p) {
    node.setAttribute('cx', K.num(p.x));
    node.setAttribute('cy', K.num(p.y));
  }

  function orangePoint(parent, p) {
    return make(parent, 'circle', { cx: K.num(p.x), cy: K.num(p.y), r: MARK.point, fill: SIGNAL });
  }

  function ringStroke(parent) {
    return make(parent, 'path', { fill: 'none', stroke: INK, 'stroke-width': MARK.weight });
  }

  function siteRing(parent) {
    var ring = ringStroke(parent);
    ring.setAttribute('d', K.arcPath(MARK.cx, MARK.cy, MARK.r, MARK.opening / 2, 360 - MARK.opening));
    return ring;
  }

  function drawLetters(svg) {
    var group = make(svg, 'g', { fill: 'none', stroke: INK, 'stroke-width': 6.6 });
    LETTERS_WITHOUT_O.forEach(function (letter) {
      make(group, 'path', { d: letter.d, transform: 'translate(' + letter.x + ' 0)' });
    });
  }

  // Hairline ticks like 01's dial, always one screen pixel wide.
  function dial(svg, ticks, radius, lengthOf, majorEvery) {
    var group = make(svg, 'g', { stroke: INK });
    for (var tick = 0; tick < ticks; tick++) {
      var angle = (tick / ticks) * 360;
      var inner = K.polar(MARK.cx, MARK.cy, radius, angle);
      var outer = K.polar(MARK.cx, MARK.cy, radius + lengthOf(tick), angle);
      make(group, 'line', {
        x1: K.num(inner.x),
        y1: K.num(inner.y),
        x2: K.num(outer.x),
        y2: K.num(outer.y),
        'stroke-opacity': tick % majorEvery === 0 ? 0.42 : 0.14,
        'stroke-width': 1,
        'vector-effect': 'non-scaling-stroke',
      });
    }
  }

  // 24 hours: a tick every 15 minutes, longer each hour, longest every six hours.
  function dayDial(svg, radius) {
    dial(svg, 96, radius, function (tick) {
      return tick % 24 === 0 ? 3.1 : tick % 4 === 0 ? 1.9 : 0.76;
    }, 4);
  }

  // 60 steps: minutes or seconds, longer every five, longest every fifteen.
  function minuteDial(svg, radius) {
    dial(svg, 60, radius, function (tick) {
      return tick % 15 === 0 ? 3.1 : tick % 5 === 0 ? 1.9 : 0.76;
    }, 5);
  }

  function local(fraction) {
    return 'local ' + K.clockText(fraction);
  }

  function withSeconds(date) {
    return 'local ' + K.pad(date.getHours()) + ':' + K.pad(date.getMinutes()) + ':' + K.pad(date.getSeconds());
  }

  function daySamples(options) {
    return [0, 4, 8, 12, 16, 20].map(function (hour) {
      return { caption: K.pad(hour) + ':00', state: { fraction: hour / 24 }, options: options || {} };
    });
  }

  function clockSample(hours, minutes) {
    return { caption: K.pad(hours) + ':' + K.pad(minutes), state: { fraction: (hours * 60 + minutes) / 1440 }, options: {} };
  }

  // ---------- 08 In the name: the wordmark's O is 01's clock ----------

  var O_CENTER = { x: 98.5, y: 20 };

  var IN_NAME = {
    build: function (svg, options) {
      svg.setAttribute('viewBox', options.icon ? '76.5 -2 44 44' : WORD_BOX);
      if (!options.icon) drawLetters(svg);
      var turning = make(svg, 'g', {});
      make(turning, 'path', {
        d: K.arcPath(O_CENTER.x, O_CENTER.y, 17.1, 28, 304),
        fill: 'none',
        stroke: INK,
        'stroke-width': 6.6,
      });
      make(turning, 'circle', { cx: O_CENTER.x, cy: 2.9, r: 4.2, fill: SIGNAL });
      return function (state) {
        turning.setAttribute('transform', 'rotate(' + K.num(state.fraction * 360) + ' ' + O_CENTER.x + ' ' + O_CENTER.y + ')');
      };
    },
    live: function (clock) {
      return { fraction: clock.lapse(24) };
    },
    label: function (state) {
      return local(state.fraction);
    },
    strip: daySamples({ icon: true }),
  };

  // ---------- 09 Display: EPOCH written on clock segments ----------

  var CELL = { width: 26, height: 40, weight: 4.8, gap: 0.6, step: 36 };
  var DISPLAY_CYCLE = { name: 4.2, time: 2.6, ripple: 0.045 };

  function horizontalSegment(x1, x2, y) {
    var h = CELL.weight / 2;
    return [[x1, y], [x1 + h, y - h], [x2 - h, y - h], [x2, y], [x2 - h, y + h], [x1 + h, y + h]];
  }

  function verticalSegment(x, y1, y2) {
    var h = CELL.weight / 2;
    return [[x, y1], [x + h, y1 + h], [x + h, y2 - h], [x, y2], [x - h, y2 - h], [x - h, y1 + h]];
  }

  function segmentPoints(segment, x0) {
    var h = CELL.weight / 2;
    var g = CELL.gap;
    var left = x0 + h;
    var right = x0 + CELL.width - h;
    var top = h;
    var middle = CELL.height / 2;
    var bottom = CELL.height - h;
    var shapes = {
      a: horizontalSegment(left + g, right - g, top),
      b: verticalSegment(right, top + g, middle - g),
      c: verticalSegment(right, middle + g, bottom - g),
      d: horizontalSegment(left + g, right - g, bottom),
      e: verticalSegment(left, middle + g, bottom - g),
      f: verticalSegment(left, top + g, middle - g),
      g: horizontalSegment(left + g, right - g, middle),
    };
    return shapes[segment].map(function (corner) {
      return K.num(corner[0]) + ',' + K.num(corner[1]);
    }).join(' ');
  }

  function drawCell(svg, index) {
    var segments = {};
    'abcdefg'.split('').forEach(function (id) {
      segments[id] = make(svg, 'polygon', { class: 'seg', points: segmentPoints(id, index * CELL.step), fill: INK });
    });
    return segments;
  }

  function displayMode(seconds) {
    if (REDUCE) return 'name';
    var period = DISPLAY_CYCLE.name + DISPLAY_CYCLE.time;
    var phase = ((seconds % period) + period) % period;
    return phase < DISPLAY_CYCLE.name ? 'name' : 'time';
  }

  var DISPLAY = {
    build: function (svg, options) {
      svg.setAttribute('viewBox', options.icon ? '62 -10 46 60' : '-14 -16 198 72');
      var cells = [];
      [0, 1, 2, 3, 4].forEach(function (index) {
        if (!options.icon || index === 2) cells[index] = drawCell(svg, index);
      });
      var center = make(svg, 'circle', { cx: 2 * CELL.step + CELL.width / 2, cy: CELL.height / 2, r: 3.6, fill: SIGNAL });
      return function (state) {
        cells.forEach(function (segments, index) {
          var lit = K.segmentsFor(state.cells[index]);
          Object.keys(segments).forEach(function (id) {
            segments[id].classList.toggle('on', lit.indexOf(id) !== -1);
          });
        });
        center.setAttribute('opacity', state.dim ? 0.3 : 1);
      };
    },
    // Each cell flips a moment after the one before it, left to right.
    live: function (clock) {
      var cells = [0, 1, 2, 3, 4].map(function (index) {
        return K.displayCells(displayMode(clock.elapsed - index * DISPLAY_CYCLE.ripple), clock.fraction)[index];
      });
      var mode = displayMode(clock.elapsed);
      return { cells: cells, mode: mode, fraction: clock.fraction, dim: mode === 'time' && clock.date.getMilliseconds() >= 600 };
    },
    label: function (state) {
      return local(state.fraction) + '   showing the ' + state.mode;
    },
    strip: [
      { caption: 'name', wide: true, state: { cells: K.displayCells('name', 0) }, options: {} },
      { caption: '07:36', wide: true, state: { cells: K.displayCells('time', 456 / 1440) }, options: {} },
      { caption: '23:59', wide: true, state: { cells: K.displayCells('time', 1439 / 1440) }, options: {} },
      { caption: 'app icon', state: { cells: K.displayCells('name', 0) }, options: { icon: true } },
    ],
  };

  // ---------- 10 Overrun: one full turn and then some, tip on the time ----------

  var OVERRUN = { inner: 13.6, outer: 20.4, sweep: 400, box: '-1 -1 50 50' };

  var OVERRUN_PIECE = {
    build: function (svg, options) {
      svg.setAttribute('viewBox', options.stage ? STAGE_BOX : OVERRUN.box);
      if (options.stage) dayDial(svg, 25.2);
      var line = ringStroke(svg);
      var tip = orangePoint(svg, { x: MARK.cx, y: MARK.cy });
      return function (state) {
        var angle = state.fraction * 360;
        line.setAttribute('d', K.spiralPath(MARK.cx, MARK.cy, OVERRUN.inner, OVERRUN.outer, angle - OVERRUN.sweep, OVERRUN.sweep, 120));
        movePoint(tip, K.polar(MARK.cx, MARK.cy, OVERRUN.outer, angle));
      };
    },
    live: function (clock) {
      return { fraction: clock.lapse(24) };
    },
    label: function (state) {
      return local(state.fraction);
    },
    strip: daySamples(),
  };

  // ---------- 11 Hour and minute: two openings read like a watch ----------

  var MINUTE_CUT = 12;

  var WATCH = {
    build: function (svg, options) {
      svg.setAttribute('viewBox', options.stage ? STAGE_BOX : MARK_BOX);
      if (options.stage) minuteDial(svg, 21.2);
      var arcs = [ringStroke(svg), ringStroke(svg)];
      var hand = orangePoint(svg, { x: MARK.cx, y: MARK.cy });
      return function (state) {
        var angles = K.watchAngles(state.fraction);
        var visible = K.visibleArcs([{ center: angles.hour, width: MARK.opening }, { center: angles.minute, width: MINUTE_CUT }]);
        arcs.forEach(function (path, index) {
          var arc = visible[index];
          path.style.display = arc ? '' : 'none';
          if (arc) path.setAttribute('d', K.arcPath(MARK.cx, MARK.cy, MARK.r, arc.start, arc.sweep));
        });
        movePoint(hand, K.polar(MARK.cx, MARK.cy, MARK.r, angles.hour));
      };
    },
    live: function (clock) {
      return { fraction: clock.lapse(720) };
    },
    label: function (state) {
      return local(state.fraction);
    },
    strip: [clockSample(10, 10), clockSample(12, 0), clockSample(3, 45), clockSample(6, 30), clockSample(9, 5), clockSample(11, 55)],
  };

  // ---------- 12 Engraved: the ring carries the exact second it was drawn ----------

  // Small, widely tracked type: legible up close, a plain ring from a distance.
  var ENGRAVING = { baseline: MARK.r - 0.62, margin: 2.2, size: 1.75 };
  var engravings = 0;

  var ENGRAVED = {
    build: function (svg, options) {
      svg.setAttribute('viewBox', options.stage ? STAGE_BOX : MARK_BOX);
      siteRing(svg);
      orangePoint(svg, K.polar(MARK.cx, MARK.cy, MARK.r, 0));
      engravings += 1;
      var id = 'engraving-' + engravings;
      var start = MARK.opening / 2 + ENGRAVING.margin;
      var sweep = 360 - MARK.opening - 2 * ENGRAVING.margin;
      var length = (2 * Math.PI * ENGRAVING.baseline * sweep) / 360;
      make(make(svg, 'defs', {}), 'path', { id: id, d: K.arcPath(MARK.cx, MARK.cy, ENGRAVING.baseline, start, sweep) });
      var text = make(svg, 'text', { fill: BLACK, 'font-family': 'IBM Plex Mono, monospace', 'font-size': ENGRAVING.size, 'font-weight': 500 });
      var along = make(text, 'textPath', { href: '#' + id, textLength: K.num(length), lengthAdjust: 'spacing' });
      return function (state) {
        var words = K.engraving(state.date);
        if (along.textContent !== words) along.textContent = words;
      };
    },
    live: function (clock) {
      return { date: clock.date };
    },
    label: function (state) {
      return withSeconds(state.date);
    },
    strip: [56, 32, 16].map(function (size) {
      return { caption: size + ' px', size: size, state: { date: new Date() }, options: {} };
    }),
  };

  // ---------- 13 Full circle: the opening is what is left of today ----------

  // Twice the logo's opening at midnight, so at noon it is the logo exactly.
  var WIDEST = 2 * MARK.opening;

  var FULL_CIRCLE = {
    build: function (svg, options) {
      svg.setAttribute('viewBox', options.stage ? STAGE_BOX : MARK_BOX);
      var ring = ringStroke(svg);
      orangePoint(svg, K.polar(MARK.cx, MARK.cy, MARK.r, 0));
      return function (state) {
        var arc = K.visibleArcs([{ center: 0, width: K.openingWidth(state.fraction, WIDEST) }])[0];
        ring.setAttribute('d', K.arcPath(MARK.cx, MARK.cy, MARK.r, arc.start, arc.sweep));
      };
    },
    live: function (clock) {
      return { fraction: clock.lapse(24) };
    },
    label: function (state) {
      var minutesLeft = Math.round((1 - state.fraction) * 1440);
      return local(state.fraction) + '   ' + Math.floor(minutesLeft / 60) + ' h ' + (minutesLeft % 60) + ' min left today';
    },
    strip: daySamples(),
  };

  // ---------- 14 Totality: the diamond ring of a total eclipse ----------

  var ECLIPSE = { sun: 19.6, moon: 14.6, offset: 3.4, bead: 15.4 };

  var TOTALITY = {
    build: function (svg, options) {
      svg.setAttribute('viewBox', options.stage ? STAGE_BOX : MARK_BOX);
      if (options.stage) dayDial(svg, 21.2);
      var corona = make(svg, 'path', { fill: INK, 'fill-rule': 'evenodd' });
      var bead = orangePoint(svg, { x: MARK.cx, y: MARK.cy });
      return function (state) {
        var angle = state.fraction * 360;
        var moon = K.moonCenter(MARK.cx, MARK.cy, ECLIPSE.offset, angle);
        corona.setAttribute('d', K.arcPath(MARK.cx, MARK.cy, ECLIPSE.sun, 0, 360) + K.arcPath(moon.x, moon.y, ECLIPSE.moon, 0, 360));
        movePoint(bead, K.polar(MARK.cx, MARK.cy, ECLIPSE.bead, angle));
      };
    },
    live: function (clock) {
      return { fraction: clock.lapse(24) };
    },
    label: function (state) {
      return local(state.fraction);
    },
    strip: daySamples(),
  };

  // ---------- 15 On the minute: a lap a minute, then a pause at the top ----------

  var ON_THE_MINUTE = {
    build: function (svg, options) {
      svg.setAttribute('viewBox', options.stage ? STAGE_BOX : MARK_BOX);
      if (options.stage) minuteDial(svg, 21.2);
      siteRing(svg);
      var runner = orangePoint(svg, K.polar(MARK.cx, MARK.cy, MARK.r, 0));
      return function (state) {
        movePoint(runner, K.polar(MARK.cx, MARK.cy, MARK.r, K.lapAngle(state.seconds)));
      };
    },
    live: function (clock) {
      return { seconds: clock.date.getSeconds() + clock.date.getMilliseconds() / 1000, date: clock.date };
    },
    label: function (state) {
      return withSeconds(state.date);
    },
    strip: [0, 15, 30, 45, 58.5].map(function (second) {
      return { caption: ':' + K.pad(Math.floor(second)), state: { seconds: second }, options: {} };
    }),
  };

  var PIECES = {
    inname: IN_NAME,
    display: DISPLAY,
    overrun: OVERRUN_PIECE,
    watch: WATCH,
    engraved: ENGRAVED,
    fullcircle: FULL_CIRCLE,
    totality: TOTALITY,
    minute: ON_THE_MINUTE,
  };

  function pieceFor(key) {
    if (!Object.prototype.hasOwnProperty.call(PIECES, key)) throw new Error('marks-08-15: no mark called "' + key + '"');
    return PIECES[key];
  }

  // ---------- Mounting and the shared clock ----------

  function clockAt(now) {
    var elapsed = (now - STARTED) / 1000;
    var date = new Date();
    return {
      elapsed: elapsed,
      date: date,
      fraction: K.localDayFraction(date),
      lapse: function (secondsPerDay) {
        return REDUCE ? K.localDayFraction(date) : K.lapse(START_FRACTION, elapsed, secondsPerDay);
      },
    };
  }

  function mountStage(svg) {
    var key = svg.dataset.live;
    var piece = pieceFor(key);
    var show = piece.build(svg, { stage: true });
    var label = document.querySelector('[data-label="' + key + '"]');
    return function (clock) {
      var state = piece.live(clock);
      show(state);
      label.textContent = piece.label(state);
    };
  }

  function mountStrip(container) {
    var piece = pieceFor(container.dataset.strip);
    piece.strip.forEach(function (sample) {
      var figure = document.createElement('figure');
      if (sample.wide) figure.className = 'wide';
      var svg = document.createElementNS(NS, 'svg');
      svg.setAttribute('aria-hidden', 'true');
      if (sample.size) svg.style.width = svg.style.height = sample.size + 'px';
      var caption = document.createElement('figcaption');
      caption.className = 'mono';
      caption.textContent = sample.caption;
      figure.append(svg, caption);
      container.appendChild(figure);
      piece.build(svg, sample.options)(sample.state);
    });
  }

  // Not data-lockup: 01's script already claims that attribute for its canvas.
  function mountLockup(svg, clock) {
    var piece = pieceFor(svg.dataset.lockupMark);
    piece.build(svg, {})(piece.live(clock));
  }

  var firstClock = clockAt(STARTED);
  document.querySelectorAll('[data-strip]').forEach(mountStrip);
  document.querySelectorAll('[data-lockup-mark]').forEach(function (svg) {
    mountLockup(svg, firstClock);
  });
  var stages = Array.prototype.map.call(document.querySelectorAll('[data-live]'), mountStage);

  function tick(now) {
    var clock = clockAt(now);
    stages.forEach(function (update) {
      update(clock);
    });
    if (!REDUCE) window.requestAnimationFrame(tick);
  }
  tick(STARTED);
})();
