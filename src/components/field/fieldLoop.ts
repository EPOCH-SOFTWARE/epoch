/**
 * @fileoverview Runs the Epoch Field in the browser: sizing, timing, pointer tracking,
 * and pausing whenever nobody can see it.
 */

import {
  LAYERS_COMPACT,
  LAYERS_WIDE,
  createNetwork,
  passState,
  type PassState,
} from './fieldModel';
import { drawField, type Pointer } from './drawField';

const SEED = 1729;
const COMPACT_BELOW_PX = 560;
const THROTTLE_BELOW_PX = 768;
const THROTTLED_FRAME_MS = 1000 / 30;
const MAX_PIXEL_RATIO = 2;
/** Shown to visitors who prefer reduced motion: one complete, settled pass. */
const SETTLED_PASS: PassState = { epoch: 1, progress: 1, settle: 0 };

export function startField(
  wrap: HTMLElement,
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  onEpoch: (epoch: number) => void
): () => void {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let width = 0;
  let height = 0;
  let network = createNetwork(LAYERS_WIDE, SEED);
  let pointer: Pointer | null = null;
  let elapsed = 0;
  let lastTime: number | null = null;
  let frameId: number | null = null;
  let onScreen = true;
  let currentEpoch = 1;

  const draw = () => {
    const pass = reducedMotion ? SETTLED_PASS : passState(elapsed);
    drawField(context, network, { width, height, time: elapsed, pass, pointer });
  };

  const resize = () => {
    const rect = wrap.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    network = createNetwork(width < COMPACT_BELOW_PX ? LAYERS_COMPACT : LAYERS_WIDE, SEED);
    if (frameId === null) draw();
  };

  const tick = (time: number) => {
    frameId = window.requestAnimationFrame(tick);
    const minFrameMs = width < THROTTLE_BELOW_PX ? THROTTLED_FRAME_MS : 0;
    if (lastTime !== null && time - lastTime < minFrameMs) return;

    elapsed += lastTime === null ? 0 : time - lastTime;
    lastTime = time;

    const { epoch } = passState(elapsed);
    if (epoch !== currentEpoch) {
      currentEpoch = epoch;
      onEpoch(epoch);
    }
    draw();
  };

  const start = () => {
    if (reducedMotion || frameId !== null) return;
    lastTime = null;
    frameId = window.requestAnimationFrame(tick);
  };

  const stop = () => {
    if (frameId === null) return;
    window.cancelAnimationFrame(frameId);
    frameId = null;
  };

  const sync = () => {
    if (onScreen && document.visibilityState === 'visible') start();
    else stop();
  };

  const trackPointer = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const resizeObserver = new ResizeObserver(resize);
  const visibilityObserver = new IntersectionObserver(entries => {
    onScreen = entries.some(entry => entry.isIntersecting);
    sync();
  });

  resizeObserver.observe(wrap);
  visibilityObserver.observe(wrap);
  document.addEventListener('visibilitychange', sync);
  if (!reducedMotion) window.addEventListener('pointermove', trackPointer, { passive: true });

  resize();
  sync();

  return () => {
    stop();
    resizeObserver.disconnect();
    visibilityObserver.disconnect();
    document.removeEventListener('visibilitychange', sync);
    window.removeEventListener('pointermove', trackPointer);
  };
}
