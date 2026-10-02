// Marks 08 onwards on marks.html: logos that keep time themselves.
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

  function watchSamples(options) {
    return [[10, 10], [12, 0], [3, 45], [6, 30], [9, 5], [11, 55]].map(function (time) {
      return { caption: K.pad(time[0]) + ':' + K.pad(time[1]), state: { fraction: (time[0] * 60 + time[1]) / 1440 }, options: options || {} };
    });
  }

  // A ring read like a watch: the opening holding the orange point is the hour, the narrow cut the minute.
  function watchRing(svg, ring) {
    var arcs = [0, 1].map(function () {
      return make(svg, 'path', { fill: 'none', stroke: INK, 'stroke-width': ring.weight });
    });
    var hand = make(svg, 'circle', { r: ring.point, fill: SIGNAL });
    return function (fraction) {
      var angles = K.watchAngles(fraction);
      var visible = K.visibleArcs([{ center: angles.hour, width: ring.opening }, { center: angles.minute, width: ring.cut }]);
      arcs.forEach(function (path, index) {
        var arc = visible[index];
        path.style.display = arc ? '' : 'none';
        if (arc) path.setAttribute('d', K.arcPath(ring.cx, ring.cy, ring.r, arc.start, arc.sweep));
      });
      movePoint(hand, K.polar(ring.cx, ring.cy, ring.r, angles.hour));
    };
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
  var SYMBOL_WATCH = { cx: MARK.cx, cy: MARK.cy, r: MARK.r, weight: MARK.weight, opening: MARK.opening, point: MARK.point, cut: MINUTE_CUT };

  var WATCH = {
    build: function (svg, options) {
      svg.setAttribute('viewBox', options.stage ? STAGE_BOX : MARK_BOX);
      if (options.stage) minuteDial(svg, 21.2);
      var show = watchRing(svg, SYMBOL_WATCH);
      return function (state) {
        show(state.fraction);
      };
    },
    live: function (clock) {
      return { fraction: clock.lapse(720) };
    },
    label: function (state) {
      return local(state.fraction);
    },
    strip: watchSamples(),
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

  // ---------- 16 In the name, to the minute: 08's O read like 11's watch ----------

  var NAME_WATCH_RING = { cx: O_CENTER.x, cy: O_CENTER.y, r: 17.1, weight: 6.6, opening: 56, point: 4.2, cut: 12 };

  var NAME_WATCH = {
    build: function (svg, options) {
      svg.setAttribute('viewBox', options.icon ? '76.5 -2 44 44' : WORD_BOX);
      if (!options.icon) drawLetters(svg);
      var show = watchRing(svg, NAME_WATCH_RING);
      return function (state) {
        show(state.fraction);
      };
    },
    live: function (clock) {
      return { fraction: clock.lapse(720) };
    },
    label: function (state) {
      return local(state.fraction);
    },
    strip: watchSamples({ icon: true }),
  };

  // ---------- 17 Parallel lines: after Lance Wyman's Mexico 68 ----------

  // A stroke laid down in alternating ivory and black widths turns into parallel lines.
  var WYMAN = {
    word: [9, 6.6, 4.2, 1.8],
    rings: [12.4, 14.7, 17, 19.3, 21.6],
    ringWeight: 1.3,
    hourSlot: 4.6,
    minuteSlot: 1.3,
  };
  var WORD_LETTERS =
    '<path d="M26 3.3H3.3V36.7H26M3.3 20H23"/>' +
    '<path transform="translate(39 0)" d="M3.3 40V3.3H14A9.2 9.2 0 0 1 14 21.7H3.3"/>' +
    '<circle cx="98.5" cy="20" r="17.1"/>' +
    '<path transform="translate(131.3 0)" d="M32.71 8.56A17.1 17.1 0 1 0 32.71 31.44"/>' +
    '<path transform="translate(176.5 0)" d="M3.3 0V40M26.7 0V40M3.3 20H26.7"/>';
  var masks = 0;

  // Two parallel-sided slots from the center outward, cut through everything under the mask.
  function slotMask(svg, center, reach, box) {
    masks += 1;
    var id = 'slots-' + masks;
    var mask = make(make(svg, 'defs', {}), 'mask', { id: id, maskUnits: 'userSpaceOnUse', x: box[0], y: box[1], width: box[2], height: box[3] });
    make(mask, 'rect', { x: box[0], y: box[1], width: box[2], height: box[3], fill: 'white' });
    function slot(half) {
      return make(mask, 'rect', { x: center.x - half, y: center.y - reach, width: half * 2, height: reach, fill: 'black' });
    }
    var hour = slot(WYMAN.hourSlot);
    var minute = slot(WYMAN.minuteSlot);
    return {
      id: id,
      turn: function (angles) {
        hour.setAttribute('transform', 'rotate(' + K.num(angles.hour) + ' ' + center.x + ' ' + center.y + ')');
        minute.setAttribute('transform', 'rotate(' + K.num(angles.minute) + ' ' + center.x + ' ' + center.y + ')');
      },
    };
  }

  function parallelLines(parent, widths, inner) {
    widths.forEach(function (width, index) {
      var group = make(parent, 'g', { fill: 'none', stroke: index % 2 ? BLACK : INK, 'stroke-width': width });
      group.innerHTML = inner;
    });
  }

  var PARALLEL = {
    build: function (svg, options) {
      var center = options.icon ? { x: MARK.cx, y: MARK.cy } : O_CENTER;
      var radius = options.icon ? MARK.r : 17.1;
      svg.setAttribute('viewBox', options.icon ? MARK_BOX : WORD_BOX);
      var slots = slotMask(svg, center, 23, options.icon ? [0, 0, 48, 48] : [-12, -16, 232, 72]);
      var lines = make(svg, 'g', { mask: 'url(#' + slots.id + ')' });
      if (options.icon) {
        WYMAN.rings.forEach(function (r) {
          make(lines, 'circle', { cx: MARK.cx, cy: MARK.cy, r: r, fill: 'none', stroke: INK, 'stroke-width': WYMAN.ringWeight });
        });
      } else {
        parallelLines(lines, WYMAN.word, WORD_LETTERS);
      }
      var hand = make(svg, 'circle', { r: options.icon ? MARK.point : 4.2, fill: SIGNAL });
      return function (state) {
        var angles = K.watchAngles(state.fraction);
        slots.turn(angles);
        movePoint(hand, K.polar(center.x, center.y, radius, angles.hour));
      };
    },
    live: function (clock) {
      return { fraction: clock.lapse(720) };
    },
    label: function (state) {
      return local(state.fraction);
    },
    strip: watchSamples({ icon: true }),
  };

  // ---------- 18 Slashed zero: after Stankowski's slash and the programmer's zero ----------

  var SLASH = { reach: 13.8, weight: 4.4 };

  function drawO(parent, color) {
    return make(parent, 'circle', { cx: O_CENTER.x, cy: O_CENTER.y, r: 17.1, fill: 'none', stroke: color, 'stroke-width': 6.6 });
  }

  var SLASHED_ZERO = {
    build: function (svg, options) {
      svg.setAttribute('viewBox', options.icon ? '76.5 -2 44 44' : WORD_BOX);
      if (!options.icon) drawLetters(svg);
      drawO(svg, INK);
      var slash = make(svg, 'line', { stroke: INK, 'stroke-width': SLASH.weight });
      var hand = make(svg, 'circle', { r: 4.2, fill: SIGNAL });
      return function (state) {
        var hour = K.watchAngles(state.fraction).hour;
        var tip = K.polar(O_CENTER.x, O_CENTER.y, SLASH.reach, hour);
        var tail = K.polar(O_CENTER.x, O_CENTER.y, SLASH.reach, hour + 180);
        slash.setAttribute('x1', K.num(tail.x));
        slash.setAttribute('y1', K.num(tail.y));
        slash.setAttribute('x2', K.num(tip.x));
        slash.setAttribute('y2', K.num(tip.y));
        movePoint(hand, K.polar(O_CENTER.x, O_CENTER.y, 17.1, hour));
      };
    },
    live: function (clock) {
      return { fraction: clock.lapse(24) };
    },
    label: function (state) {
      return local(state.fraction);
    },
    strip: watchSamples({ icon: true }),
  };

  // ---------- 19 One orange letter: after Mobil's red O ----------

  var ORANGE_O = {
    build: function (svg, options) {
      svg.setAttribute('viewBox', options.icon ? '76.5 -2 44 44' : WORD_BOX);
      if (!options.icon) drawLetters(svg);
      var arcs = [0, 1].map(function () {
        return make(svg, 'path', { fill: 'none', stroke: SIGNAL, 'stroke-width': 6.6 });
      });
      return function (state) {
        var angles = K.watchAngles(state.fraction);
        var visible = K.visibleArcs([{ center: angles.hour, width: 56 }, { center: angles.minute, width: 12 }]);
        arcs.forEach(function (path, index) {
          var arc = visible[index];
          path.style.display = arc ? '' : 'none';
          if (arc) path.setAttribute('d', K.arcPath(O_CENTER.x, O_CENTER.y, 17.1, arc.start, arc.sweep));
        });
      };
    },
    live: function (clock) {
      return { fraction: clock.lapse(720) };
    },
    label: function (state) {
      return local(state.fraction);
    },
    strip: watchSamples({ icon: true }),
  };

  // ---------- 20 Stencil: every letter has bridges, and the O's two bridges are the hands ----------

  var STENCIL = { gap: 2.6, bridge: 8.7 };
  var STENCIL_STRAIGHTS = [
    'M3.3 0V40', 'M26 3.3H9.2', 'M9.2 20H23', 'M26 36.7H9.2',
    'M42.3 0V40', 'M48.2 3.3H53A9.2 9.2 0 0 1 53 21.7H48.2',
    'M179.8 0V40', 'M203.2 0V40', 'M185.7 20H197.3',
  ];
  var C_CENTER = { x: 151.3, y: 20 };

  var STENCIL_PIECE = {
    build: function (svg, options) {
      svg.setAttribute('viewBox', options.icon ? '76.5 -2 44 44' : WORD_BOX);
      var group = make(svg, 'g', { fill: 'none', stroke: INK, 'stroke-width': 6.6 });
      if (!options.icon) {
        STENCIL_STRAIGHTS.forEach(function (d) {
          make(group, 'path', { d: d });
        });
        K.visibleArcs([{ center: 90, width: 84 }, { center: 0, width: STENCIL.bridge }, { center: 180, width: STENCIL.bridge }]).forEach(function (arc) {
          make(group, 'path', { d: K.arcPath(C_CENTER.x, C_CENTER.y, 17.1, arc.start, arc.sweep) });
        });
      }
      var show = watchRing(svg, { cx: O_CENTER.x, cy: O_CENTER.y, r: 17.1, weight: 6.6, opening: 56, point: 4.2, cut: STENCIL.bridge });
      return function (state) {
        show(state.fraction);
      };
    },
    live: function (clock) {
      return { fraction: clock.lapse(720) };
    },
    label: function (state) {
      return local(state.fraction);
    },
    strip: watchSamples({ icon: true }),
  };

  // ---------- 21 Flip: after Louis Vuitton's Tambour Spin Time ----------

  // Twelve hour tiles. The current hour's tile stands edge-on, which is the opening; on the hour the
  // next tile turns away and the last one turns back, like a card on its axis.
  var TILES = { count: 12, seam: 0.8, turn: 0.22 };

  function tileTurn(progress) {
    var eased = Math.min(progress / TILES.turn, 1);
    return 0.5 - Math.cos(eased * Math.PI) / 2;
  }

  var FLIP = {
    build: function (svg, options) {
      svg.setAttribute('viewBox', options.stage ? STAGE_BOX : MARK_BOX);
      if (options.stage) dial(svg, 12, 21.2, function () {
        return 1.9;
      }, 3);
      var step = 360 / TILES.count;
      var half = step / 2 - TILES.seam;
      var tiles = [];
      for (var index = 0; index < TILES.count; index++) {
        var holder = make(svg, 'g', { transform: 'rotate(' + index * step + ' ' + MARK.cx + ' ' + MARK.cy + ')' });
        tiles.push(make(holder, 'path', {
          d: K.arcPath(MARK.cx, MARK.cy, MARK.r, -half, half * 2),
          fill: 'none',
          stroke: INK,
          'stroke-width': MARK.weight,
        }));
      }
      var point = orangePoint(svg, { x: MARK.cx, y: MARK.cy });
      return function (state) {
        var hours = (state.fraction * 24) % 12;
        var current = Math.floor(hours);
        var turned = tileTurn(hours - current);
        var previous = (current + TILES.count - 1) % TILES.count;
        tiles.forEach(function (tile, index) {
          var width = index === current ? 1 - turned : index === previous ? turned : 1;
          tile.setAttribute('transform', 'translate(' + MARK.cx + ' 0) scale(' + K.num(width) + ' 1) translate(' + -MARK.cx + ' 0)');
          tile.setAttribute('stroke-opacity', K.num(0.35 + 0.65 * width));
        });
        movePoint(point, K.polar(MARK.cx, MARK.cy, MARK.r, (previous + turned) * step));
      };
    },
    live: function (clock) {
      return { fraction: clock.lapse(48) };
    },
    label: function (state) {
      return local(state.fraction);
    },
    strip: watchSamples(),
  };

  // ---------- 22 Wandering point: after Urwerk's wandering hours ----------

  // The opening jumps once an hour; inside it the orange point drifts from one edge to the other,
  // so the opening says the hour and the point's place in it says the minute.
  var WANDER = {
    build: function (svg, options) {
      svg.setAttribute('viewBox', options.stage ? STAGE_BOX : MARK_BOX);
      if (options.stage) minuteDial(svg, 21.2);
      var ring = ringStroke(svg);
      var point = orangePoint(svg, { x: MARK.cx, y: MARK.cy });
      var travel = MARK.opening - 2 * (MARK.point / MARK.r) * (180 / Math.PI);
      return function (state) {
        var hours = (state.fraction * 24) % 12;
        var center = Math.floor(hours) * 30 + 15;
        var arc = K.visibleArcs([{ center: center, width: MARK.opening }])[0];
        ring.setAttribute('d', K.arcPath(MARK.cx, MARK.cy, MARK.r, arc.start, arc.sweep));
        movePoint(point, K.polar(MARK.cx, MARK.cy, MARK.r, center - travel / 2 + (hours % 1) * travel));
      };
    },
    live: function (clock) {
      return { fraction: clock.lapse(720) };
    },
    label: function (state) {
      return local(state.fraction);
    },
    strip: watchSamples(),
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
    namewatch: NAME_WATCH,
    parallel: PARALLEL,
    slashed: SLASHED_ZERO,
    orange: ORANGE_O,
    stencil: STENCIL_PIECE,
    flip: FLIP,
    wander: WANDER,
  };

  function pieceFor(key) {
    if (!Object.prototype.hasOwnProperty.call(PIECES, key)) throw new Error('marks-live: no mark called "' + key + '"');
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
