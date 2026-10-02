'use strict';

// Run: node --test 'prototype/tests/*.test.js'
const test = require('node:test');
const assert = require('node:assert/strict');
const K = require('../assets/js/kept-time.js');

function assertNear(actual, expected, label) {
  assert.ok(Math.abs(actual - expected) < 1e-9, label + ': expected ' + expected + ', got ' + actual);
}

function minutesOfDay(hours, minutes) {
  return (hours * 60 + minutes) / 1440;
}

test('polar measures angles clockwise from twelve o’clock', () => {
  const top = K.polar(24, 24, 17, 0);
  const right = K.polar(24, 24, 17, 90);
  const bottom = K.polar(24, 24, 17, 180);
  assertNear(top.x, 24, 'top x');
  assertNear(top.y, 7, 'top y');
  assertNear(right.x, 41, 'right x');
  assertNear(right.y, 24, 'right y');
  assertNear(bottom.x, 24, 'bottom x');
  assertNear(bottom.y, 41, 'bottom y');
});

test('arcPath reproduces the ring of the site mark', () => {
  assert.equal(K.arcPath(24, 24, 17, 26, 308), 'M31.45 8.72A17 17 0 1 1 16.55 8.72');
});

test('arcPath draws a whole circle as two halves', () => {
  assert.equal(K.arcPath(24, 24, 17, 0, 360), 'M24 7A17 17 0 0 1 24 41A17 17 0 0 1 24 7');
});

test('visibleArcs keeps the ring whole when nothing is cut', () => {
  assert.deepEqual(K.visibleArcs([]), [{ start: 0, sweep: 360 }]);
  assert.deepEqual(K.visibleArcs([{ center: 0, width: 0 }]), [{ start: 0, sweep: 360 }]);
});

test('visibleArcs cuts one opening', () => {
  assert.deepEqual(K.visibleArcs([{ center: 0, width: 52 }]), [{ start: 26, sweep: 308 }]);
});

test('visibleArcs cuts two separate openings', () => {
  assert.deepEqual(K.visibleArcs([{ center: 0, width: 52 }, { center: 90, width: 14 }]), [
    { start: 26, sweep: 57 },
    { start: 97, sweep: 237 },
  ]);
});

test('visibleArcs merges openings that overlap', () => {
  assert.deepEqual(K.visibleArcs([{ center: 0, width: 52 }, { center: 10, width: 14 }]), [{ start: 26, sweep: 308 }]);
  assert.deepEqual(K.visibleArcs([{ center: 0, width: 52 }, { center: 30, width: 14 }]), [{ start: 37, sweep: 297 }]);
});

test('visibleArcs merges openings across twelve o’clock', () => {
  assert.deepEqual(K.visibleArcs([{ center: 350, width: 52 }, { center: 10, width: 14 }]), [{ start: 17, sweep: 307 }]);
});

test('clockText reads a fraction of the day', () => {
  assert.equal(K.clockText(0), '00:00');
  assert.equal(K.clockText(0.5), '12:00');
  assert.equal(K.clockText(minutesOfDay(7, 36)), '07:36');
  assert.equal(K.clockText(minutesOfDay(23, 59)), '23:59');
});

test('localDayFraction uses the local clock', () => {
  assertNear(K.localDayFraction(new Date(2026, 9, 2, 7, 36, 0)), minutesOfDay(7, 36), 'fraction');
});

test('lapse runs a day in the given number of seconds and wraps', () => {
  assertNear(K.lapse(0.5, 12, 24), 0, 'half a day later');
  assertNear(K.lapse(0.25, 6, 24), 0.5, 'quarter of a day later');
});

test('watchAngles reads like the hands of a watch', () => {
  const tenPastTen = K.watchAngles(minutesOfDay(10, 10));
  assertNear(tenPastTen.hour, 305, '10:10 hour');
  assertNear(tenPastTen.minute, 60, '10:10 minute');
  const quarterToFour = K.watchAngles(minutesOfDay(15, 45));
  assertNear(quarterToFour.hour, 112.5, '15:45 hour');
  assertNear(quarterToFour.minute, 270, '15:45 minute');
  const noon = K.watchAngles(0.5);
  assertNear(noon.hour, 0, 'noon hour');
  assertNear(noon.minute, 0, 'noon minute');
});

test('openingWidth closes the ring by midnight', () => {
  assertNear(K.openingWidth(0, 52), 52, 'midnight');
  assertNear(K.openingWidth(0.5, 52), 26, 'noon');
  assertNear(K.openingWidth(1, 52), 0, 'end of day');
});

test('lapAngle laps the ring in 58.5 seconds, then waits at the top', () => {
  assertNear(K.lapAngle(0), 0, 'start');
  assertNear(K.lapAngle(29.25), 180, 'halfway');
  assertNear(K.lapAngle(58.5), 0, 'arrived');
  assertNear(K.lapAngle(59.9), 0, 'waiting');
});

test('segmentsFor spells E, P, O, C and H on a clock display', () => {
  assert.equal(K.segmentsFor('E'), 'adefg');
  assert.equal(K.segmentsFor('P'), 'abefg');
  assert.equal(K.segmentsFor('O'), 'abcdef');
  assert.equal(K.segmentsFor('C'), 'adef');
  assert.equal(K.segmentsFor('H'), 'bcefg');
  assert.equal(K.segmentsFor(' '), '');
});

test('segmentsFor draws every digit', () => {
  const digits = ['abcdef', 'bc', 'abdeg', 'abcdg', 'bcfg', 'acdfg', 'acdefg', 'abc', 'abcdefg', 'abcdfg'];
  digits.forEach((segments, digit) => assert.equal(K.segmentsFor(String(digit)), segments));
});

test('segmentsFor refuses characters a display cannot show', () => {
  assert.throws(() => K.segmentsFor('X'), /cannot show "X"/);
});

test('displayCells shows the name, or the time with the O cell as the separator', () => {
  assert.deepEqual(K.displayCells('name', 0.3), ['E', 'P', 'O', 'C', 'H']);
  assert.deepEqual(K.displayCells('time', minutesOfDay(7, 36)), ['0', '7', ' ', '3', '6']);
});

test('displayCells refuses unknown modes', () => {
  assert.throws(() => K.displayCells('date', 0.3), /unknown display mode "date"/);
});

test('engraving records the exact second', () => {
  assert.equal(
    K.engraving(new Date(Date.UTC(2026, 9, 2, 11, 36, 21))),
    'EPOCH OR NOTHING · 2026-10-02 · 11:36:21 UTC · 1790940981'
  );
});

test('moonCenter sits opposite the current time', () => {
  const atMidnight = K.moonCenter(24, 24, 3.4, 0);
  const atSix = K.moonCenter(24, 24, 3.4, 90);
  assertNear(atMidnight.x, 24, 'midnight x');
  assertNear(atMidnight.y, 27.4, 'midnight y');
  assertNear(atSix.x, 20.6, 'six x');
  assertNear(atSix.y, 24, 'six y');
});

test('spiralPath starts and ends where it is asked to', () => {
  const path = K.spiralPath(24, 24, 14, 20, 0, 400, 80);
  assert.ok(path.startsWith('M24 10L'), path.slice(0, 20));
  assert.ok(path.endsWith('L36.86 8.68'), path.slice(-20));
});
