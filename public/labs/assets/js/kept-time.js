// Pure helpers for the living marks, page interactions and the document review demo.
// Loads as window.KeptTime in the browser and as a CommonJS module in the tests.
// Angles are in degrees, measured clockwise from twelve o'clock.
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.KeptTime = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var RADIANS = Math.PI / 180;
  var DAY = 86400;

  // Seven-segment display: a top, b top right, c bottom right, d bottom, e bottom left, f top left, g middle.
  var SEGMENTS = {
    0: 'abcdef',
    1: 'bc',
    2: 'abdeg',
    3: 'abcdg',
    4: 'bcfg',
    5: 'acdfg',
    6: 'acdefg',
    7: 'abc',
    8: 'abcdefg',
    9: 'abcdfg',
    E: 'adefg',
    P: 'abefg',
    O: 'abcdef',
    C: 'adef',
    H: 'bcefg',
    ' ': '',
  };

  function mod(value, base) {
    return ((value % base) + base) % base;
  }

  function pad(value) {
    return String(value).padStart(2, '0');
  }

  // Two decimals, no trailing zeros and no "-0", so paths stay short and stable.
  function num(value) {
    var rounded = Math.round(value * 100) / 100;
    return String(rounded === 0 ? 0 : rounded);
  }

  function polar(cx, cy, r, angle) {
    return { x: cx + r * Math.sin(angle * RADIANS), y: cy - r * Math.cos(angle * RADIANS) };
  }

  function point(p) {
    return num(p.x) + ' ' + num(p.y);
  }

  function arcTo(cx, cy, r, angle, large) {
    return 'A' + num(r) + ' ' + num(r) + ' 0 ' + large + ' 1 ' + point(polar(cx, cy, r, angle));
  }

  // A clockwise arc; a full turn is drawn as two halves because SVG cannot arc back to its own start.
  function arcPath(cx, cy, r, start, sweep) {
    var from = 'M' + point(polar(cx, cy, r, start));
    if (sweep >= 360) return from + arcTo(cx, cy, r, start + 180, 0) + arcTo(cx, cy, r, start + 360, 0);
    return from + arcTo(cx, cy, r, start + sweep, sweep > 180 ? 1 : 0);
  }

  function cutsFor(gaps) {
    var cuts = [];
    gaps.forEach(function (gap) {
      if (gap.width <= 0) return;
      if (gap.width >= 360) {
        cuts.push([0, 360]);
        return;
      }
      var from = mod(gap.center - gap.width / 2, 360);
      var to = from + gap.width;
      if (to <= 360) {
        cuts.push([from, to]);
      } else {
        cuts.push([from, 360], [0, to - 360]);
      }
    });
    return cuts;
  }

  function mergeCuts(cuts) {
    var sorted = cuts.slice().sort(function (a, b) {
      return a[0] - b[0];
    });
    var merged = [sorted[0].slice()];
    sorted.slice(1).forEach(function (cut) {
      var last = merged[merged.length - 1];
      if (cut[0] <= last[1]) {
        last[1] = Math.max(last[1], cut[1]);
      } else {
        merged.push(cut.slice());
      }
    });
    return merged;
  }

  // The parts of a ring left standing once its openings ({ center, width }) are cut out.
  function visibleArcs(gaps) {
    var cuts = cutsFor(gaps);
    if (cuts.length === 0) return [{ start: 0, sweep: 360 }];
    var merged = mergeCuts(cuts);
    var arcs = [];
    merged.forEach(function (cut, index) {
      var end = index + 1 < merged.length ? merged[index + 1][0] : merged[0][0] + 360;
      if (end > cut[1]) arcs.push({ start: mod(cut[1], 360), sweep: end - cut[1] });
    });
    return arcs;
  }

  function clockParts(fraction) {
    var seconds = Math.round(mod(fraction, 1) * DAY) % DAY;
    return { hours: Math.floor(seconds / 3600), minutes: Math.floor(seconds / 60) % 60 };
  }

  function clockText(fraction) {
    var parts = clockParts(fraction);
    return pad(parts.hours) + ':' + pad(parts.minutes);
  }

  // "9:05 PM" in an IANA time zone (omit it for the visitor's own), with a no-break space so it never wraps.
  function zoneTime(date, timeZone) {
    return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: timeZone })
      .format(date)
      .replace(/\s/g, '\u00a0');
  }

  function localDayFraction(date) {
    var seconds = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds() + date.getMilliseconds() / 1000;
    return seconds / DAY;
  }

  // A time-lapse: from a starting time of day, one whole day passes every `secondsPerDay`.
  function lapse(startFraction, elapsedSeconds, secondsPerDay) {
    return mod(startFraction + elapsedSeconds / secondsPerDay, 1);
  }

  function watchAngles(fraction) {
    var seconds = mod(fraction, 1) * DAY;
    return { hour: (mod(seconds, 43200) / 43200) * 360, minute: (mod(seconds, 3600) / 3600) * 360 };
  }

  // Full at midnight, closed by the end of the day.
  function openingWidth(fraction, widest) {
    return widest * (1 - Math.min(Math.max(fraction, 0), 1));
  }

  // The Swiss railway clock's second hand: one lap in 58.5 s, then it waits at the top for the minute.
  function lapAngle(secondsIntoMinute) {
    return secondsIntoMinute < 58.5 ? (secondsIntoMinute / 58.5) * 360 : 0;
  }

  function segmentsFor(character) {
    if (!Object.prototype.hasOwnProperty.call(SEGMENTS, character)) {
      throw new Error('A seven-segment display cannot show "' + character + '"');
    }
    return SEGMENTS[character];
  }

  // Five cells: the name, or the time with the O's cell left for the separator point.
  function displayCells(mode, fraction) {
    if (mode === 'name') return ['E', 'P', 'O', 'C', 'H'];
    if (mode === 'time') {
      var text = clockText(fraction);
      return [text[0], text[1], ' ', text[3], text[4]];
    }
    throw new Error('unknown display mode "' + mode + '"');
  }

  function engraving(date) {
    var iso = date.toISOString();
    return 'EPOCH OR NOTHING · ' + iso.slice(0, 10) + ' · ' + iso.slice(11, 19) + ' UTC · ' + Math.floor(date.getTime() / 1000);
  }

  // In an eclipse the light gathers on one side; the moon sits on the other.
  function moonCenter(cx, cy, offset, angle) {
    return polar(cx, cy, offset, angle + 180);
  }

  // A known new moon and the mean lunar month; good to within about a day.
  var NEW_MOON_2000 = Date.UTC(2000, 0, 6, 18, 14) / 1000;
  var SYNODIC_MONTH = 29.530588853 * DAY;

  function lunarPhase(seconds) {
    return mod((seconds - NEW_MOON_2000) / SYNODIC_MONTH, 1);
  }

  function phaseName(phase) {
    if (phase < 0.03 || phase > 0.97) return 'new moon';
    if (phase < 0.22) return 'waxing crescent';
    if (phase < 0.28) return 'first quarter';
    if (phase < 0.47) return 'waxing gibbous';
    if (phase < 0.53) return 'full moon';
    if (phase < 0.72) return 'waning gibbous';
    if (phase < 0.78) return 'last quarter';
    return 'waning crescent';
  }

  // The lit part of the moon as seen from the north: the sunlit limb, closed by the terminator ellipse.
  function moonPath(phase, cx, cy, r) {
    var waxing = phase < 0.5;
    var bulge = Math.cos(2 * Math.PI * phase);
    var limbSweep = waxing ? 1 : 0;
    var terminatorSweep = (bulge > 0) === waxing ? 0 : 1;
    var top = num(cx) + ' ' + num(cy - r);
    var bottom = num(cx) + ' ' + num(cy + r);
    return 'M' + top + 'A' + num(r) + ' ' + num(r) + ' 0 0 ' + limbSweep + ' ' + bottom +
      'A' + num(Math.abs(bulge) * r) + ' ' + num(r) + ' 0 0 ' + terminatorSweep + ' ' + top + 'Z';
  }

  function clamp(value, low, high) {
    return Math.min(Math.max(value, low), high);
  }

  // How far `value` has travelled from `start` to `end`, from 0 to 1; an empty range counts as reached.
  function rangeProgress(value, start, end) {
    if (end <= start) return value >= end ? 1 : 0;
    return clamp((value - start) / (end - start), 0, 1);
  }

  // How far down the page the reader is: 0 at the top, 1 at the bottom, 0 when the page cannot scroll.
  function readingProgress(scrollTop, pageHeight, viewportHeight) {
    var travel = pageHeight - viewportHeight;
    if (travel <= 0) return 0;
    return clamp(scrollTop / travel, 0, 1);
  }

  // How far a magnetic button drifts toward the pointer, given the pointer's offset from its centre:
  // in proportion across each half of the button, never further than `limit` in any direction.
  function magnet(dx, dy, halfWidth, halfHeight, limit) {
    var x = clamp(dx / halfWidth, -1, 1) * limit;
    var y = clamp(dy / halfHeight, -1, 1) * limit;
    var scale = Math.min(1, limit / (Math.hypot(x, y) || 1));
    return { x: x * scale, y: y * scale };
  }

  // Which step of a list the reader is on: the last one whose top has reached the reading line
  // (tops and line in the same coordinates, list order), or -1 before the first gets there.
  function stepAt(tops, line) {
    var current = -1;
    tops.forEach(function (top, index) {
      if (top <= line) current = index;
    });
    return current;
  }

  // A sequence told on the O: the point waits at the start of the ring, then step `index` carries it
  // to stops[index] degrees. `lit` is how much of the ring (start to start + sweep) lies behind it.
  function ringStop(start, sweep, stops, index) {
    var angle = index < 0 ? start : stops[Math.min(index, stops.length - 1)];
    return { angle: angle, lit: clamp((angle - start) / sweep, 0, 1) };
  }

  // The number of months in a timeline such as "8 months", or null when it is not written that way.
  function monthsIn(timeline) {
    var match = /^(\d+) months?$/.exec(String(timeline).trim());
    return match ? Number(match[1]) : null;
  }

  // The document demo reads explicitly labelled fields. It does not infer facts from prose.
  // Keep exact source offsets so each result can take the reader back to its evidence.
  function reviewBrief(text) {
    if (text.length > 10000) throw new Error('Use a document of 10,000 characters or fewer.');
    var aliases = { project: 'project', request: 'project', owner: 'owner', lead: 'owner', target: 'target', 'target date': 'target', due: 'target' };
    var fields = { project: [], owner: [], target: [] };
    var offset = 0;
    text.split('\n').forEach(function (raw, index) {
      var quote = raw.replace(/\r$/, '');
      var match = /^\s*([a-z ]+)\s*:\s*(.*?)\s*$/i.exec(quote);
      var key = match && aliases[match[1].trim().toLowerCase()];
      if (key && Object.prototype.hasOwnProperty.call(fields, key)) {
        fields[key].push({ value: match[2], line: index + 1, quote: quote, start: offset, end: offset + quote.length });
      }
      offset += raw.length + 1;
    });
    var result = {};
    Object.keys(fields).forEach(function (key) {
      var entries = fields[key];
      var values = [];
      var seen = [];
      var unconfirmed = false;
      entries.forEach(function (entry) {
        var normalized = entry.value.toLowerCase().replace(/\s+/g, ' ').trim();
        if (/^(|tbd|pending|not confirmed|unknown|\?)$/.test(normalized)) {
          unconfirmed = true;
        } else if (seen.indexOf(normalized) === -1) {
          seen.push(normalized);
          values.push(entry.value);
        }
      });
      var status = !values.length ? 'missing' : values.length > 1 || unconfirmed ? 'conflict' : 'found';
      result[key] = {
        status: status,
        value: status === 'found' ? values[0] : null,
        values: values,
        sources: entries.map(function (entry) {
          return { line: entry.line, quote: entry.quote, start: entry.start, end: entry.end };
        }),
      };
    });
    return result;
  }

  // Resolve only known catalogue entries. Query text never becomes visitor copy.
  function contactContext(search, services, goals) {
    var params = new URLSearchParams(search);
    var goal = goals.find(function (item) { return item.id === params.get('goal'); });
    var service = services.find(function (item) { return item.id === (goal ? goal.service : params.get('service')); });
    if (!service) return null;
    return { label: goal ? goal.title : service.title, service: service.id, goal: goal ? goal.id : null };
  }

  function spiralPath(cx, cy, r0, r1, start, sweep, steps) {
    var points = [];
    for (var step = 0; step <= steps; step++) {
      var t = step / steps;
      points.push(point(polar(cx, cy, r0 + (r1 - r0) * t, start + sweep * t)));
    }
    return 'M' + points.join('L');
  }

  return {
    num: num,
    pad: pad,
    polar: polar,
    arcPath: arcPath,
    visibleArcs: visibleArcs,
    clockText: clockText,
    localDayFraction: localDayFraction,
    zoneTime: zoneTime,
    lapse: lapse,
    watchAngles: watchAngles,
    openingWidth: openingWidth,
    lapAngle: lapAngle,
    segmentsFor: segmentsFor,
    displayCells: displayCells,
    engraving: engraving,
    moonCenter: moonCenter,
    spiralPath: spiralPath,
    lunarPhase: lunarPhase,
    phaseName: phaseName,
    moonPath: moonPath,
    readingProgress: readingProgress,
    rangeProgress: rangeProgress,
    magnet: magnet,
    stepAt: stepAt,
    ringStop: ringStop,
    monthsIn: monthsIn,
    reviewBrief: reviewBrief,
    contactContext: contactContext,
  };
});
