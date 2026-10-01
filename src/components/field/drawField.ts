/**
 * @fileoverview Canvas drawing for the Epoch Field. Stateless: everything it needs
 * arrives in the frame, so the loop owns time and the model owns the network.
 */

import { frontPosition, type FieldNetwork, type PassState } from './fieldModel';

export interface Pointer {
  readonly x: number;
  readonly y: number;
}

export interface FieldFrame {
  readonly width: number;
  readonly height: number;
  /** Milliseconds of animated time, used for idle drift. */
  readonly time: number;
  readonly pass: PassState;
  readonly pointer: Pointer | null;
}

interface Point {
  readonly x: number;
  readonly y: number;
  /** 0–1 closeness to the pointer. */
  readonly near: number;
}

const SIGNAL = '155, 193, 54';
const BONE = '238, 240, 230';
const IDLE_EDGE = 'rgba(69, 84, 34, 0.5)';
const IDLE_NODE = 'rgba(135, 138, 115, 0.55)';

const PADDING_X = 0.06;
const PADDING_Y = 0.1;
const DRIFT_PX = 3;
const POINTER_RADIUS_PX = 150;
const POINTER_PUSH_PX = 20;
/** How many layers behind the front a node keeps its arrival flash. */
const FLASH_LAYERS = 0.6;
const NODE_RADIUS_PX = 2.2;

function closeness(x: number, y: number, pointer: Pointer | null): number {
  if (!pointer) return 0;
  const distance = Math.hypot(x - pointer.x, y - pointer.y);
  return distance < POINTER_RADIUS_PX ? 1 - distance / POINTER_RADIUS_PX : 0;
}

function placeNodes(network: FieldNetwork, frame: FieldFrame): Point[] {
  const innerWidth = frame.width * (1 - PADDING_X * 2);
  const innerHeight = frame.height * (1 - PADDING_Y * 2);

  return network.nodes.map(node => {
    let x = frame.width * PADDING_X + node.x * innerWidth;
    let y = frame.height * PADDING_Y + node.y * innerHeight;
    x += Math.sin(frame.time * 0.0007 + node.phase) * DRIFT_PX;
    y += Math.cos(frame.time * 0.0006 + node.phase * 1.3) * DRIFT_PX;

    const near = closeness(x, y, frame.pointer);
    if (near > 0 && frame.pointer) {
      const angle = Math.atan2(y - frame.pointer.y, x - frame.pointer.x);
      const push = near * near * POINTER_PUSH_PX;
      x += Math.cos(angle) * push;
      y += Math.sin(angle) * push;
    }
    return { x, y, near };
  });
}

function drawEdges(
  context: CanvasRenderingContext2D,
  network: FieldNetwork,
  points: readonly Point[],
  front: number,
  trained: number
): void {
  context.lineWidth = 1;

  for (const edge of network.edges) {
    const from = points[edge.from];
    const to = points[edge.to];
    const layer = network.nodes[edge.from]?.layer ?? 0;
    if (!from || !to) continue;

    const travelled = front - layer;
    const near = Math.max(from.near, to.near);

    context.beginPath();
    context.moveTo(from.x, from.y);
    context.lineTo(to.x, to.y);
    context.strokeStyle =
      travelled >= 1
        ? `rgba(${SIGNAL}, ${0.1 + 0.3 * trained + 0.3 * near})`
        : near > 0
          ? `rgba(${BONE}, ${0.12 + 0.3 * near})`
          : IDLE_EDGE;
    context.stroke();

    if (travelled > 0 && travelled < 1) {
      const x = from.x + (to.x - from.x) * travelled;
      const y = from.y + (to.y - from.y) * travelled;
      context.beginPath();
      context.moveTo(from.x, from.y);
      context.lineTo(x, y);
      context.strokeStyle = `rgba(${SIGNAL}, 0.85)`;
      context.stroke();
      context.beginPath();
      context.arc(x, y, 2, 0, Math.PI * 2);
      context.fillStyle = `rgb(${SIGNAL})`;
      context.fill();
    }
  }
}

function drawNodes(
  context: CanvasRenderingContext2D,
  network: FieldNetwork,
  points: readonly Point[],
  front: number,
  trained: number
): void {
  network.nodes.forEach((node, index) => {
    const point = points[index];
    if (!point) return;

    const since = front - node.layer;
    const flash = since > 0 && since < FLASH_LAYERS ? 1 - since / FLASH_LAYERS : 0;
    const radius = NODE_RADIUS_PX + flash * 4 + point.near * 1.5;

    context.beginPath();
    context.arc(point.x, point.y, radius, 0, Math.PI * 2);
    context.fillStyle =
      since > 0 ? `rgba(${SIGNAL}, ${0.45 + 0.4 * trained + 0.15 * flash})` : IDLE_NODE;
    context.fill();

    if (flash > 0) {
      context.beginPath();
      context.arc(point.x, point.y, radius + 9 * flash, 0, Math.PI * 2);
      context.strokeStyle = `rgba(${SIGNAL}, ${0.4 * flash})`;
      context.stroke();
    }
  });
}

export function drawField(
  context: CanvasRenderingContext2D,
  network: FieldNetwork,
  frame: FieldFrame
): void {
  context.clearRect(0, 0, frame.width, frame.height);

  const points = placeNodes(network, frame);
  const front = frontPosition(frame.pass.progress, network.layerCount);
  const trained = 1 - frame.pass.settle * 0.8;

  drawEdges(context, network, points, front, trained);
  drawNodes(context, network, points, front, trained);
}
