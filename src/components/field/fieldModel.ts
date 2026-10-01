/**
 * @fileoverview Pure model behind the Epoch Field: a small layered network that a
 * training pass sweeps through, one layer at a time, until every node is reached.
 */

export interface FieldNode {
  readonly id: number;
  readonly layer: number;
  /** Normalised 0–1 position inside the field. */
  readonly x: number;
  readonly y: number;
  /** Offset used to desynchronise each node's idle drift. */
  readonly phase: number;
}

export interface FieldEdge {
  readonly from: number;
  readonly to: number;
}

export interface FieldNetwork {
  readonly nodes: readonly FieldNode[];
  readonly edges: readonly FieldEdge[];
  readonly layerCount: number;
}

export const LAYERS_WIDE = [4, 7, 9, 10, 9, 7, 5, 3] as const;
export const LAYERS_COMPACT = [3, 5, 7, 5, 3] as const;

/** How long the pass front takes to cross the network. */
export const PASS_MS = 3200;
/** How long the fully reached network holds before the next epoch. */
export const REST_MS = 1100;

const VERTICAL_SPREAD = 0.84;
const LOSS_FLOOR = 0.012;
const LOSS_START = 2.4;
const LOSS_DECAY = 0.11;

/** Mulberry32: tiny seeded PRNG so the layout is stable across renders and resizes. */
function createRng(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function clampUnit(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function placeLayer(
  size: number,
  layer: number,
  layerCount: number,
  firstId: number,
  rng: () => number
): FieldNode[] {
  const columnX = (layer + 0.5) / layerCount;
  const xJitter = 0.35 / layerCount;
  const yJitter = 0.4 / size;

  return Array.from({ length: size }, (_, index) => {
    const slot = (index + 0.5) / size;
    return {
      id: firstId + index,
      layer,
      x: clampUnit(columnX + (rng() - 0.5) * xJitter),
      y: clampUnit(0.5 + (slot - 0.5) * VERTICAL_SPREAD + (rng() - 0.5) * yJitter),
      phase: rng() * Math.PI * 2,
    };
  });
}

function nearestByY(origin: FieldNode, candidates: readonly FieldNode[]): FieldNode[] {
  return [...candidates].sort((a, b) => Math.abs(a.y - origin.y) - Math.abs(b.y - origin.y));
}

function connectLayers(
  current: readonly FieldNode[],
  next: readonly FieldNode[],
  rng: () => number
): FieldEdge[] {
  const edges: FieldEdge[] = [];
  const reached = new Set<number>();

  for (const node of current) {
    const fanOut = rng() < 0.35 ? 3 : 2;
    for (const target of nearestByY(node, next).slice(0, fanOut)) {
      edges.push({ from: node.id, to: target.id });
      reached.add(target.id);
    }
  }

  for (const target of next) {
    if (reached.has(target.id)) continue;
    const [source] = nearestByY(target, current);
    if (source) edges.push({ from: source.id, to: target.id });
  }

  return edges;
}

export function createNetwork(layerSizes: readonly number[], seed: number): FieldNetwork {
  const rng = createRng(seed);
  const layerCount = layerSizes.length;
  const layers: FieldNode[][] = [];
  let nextId = 0;

  layerSizes.forEach((size, layer) => {
    layers.push(placeLayer(size, layer, layerCount, nextId, rng));
    nextId += size;
  });

  const edges = layers.flatMap((layer, index) => {
    const next = layers[index + 1];
    return next ? connectLayers(layer, next, rng) : [];
  });

  return { nodes: layers.flat(), edges, layerCount };
}

/** How many layers the pass front has crossed, from 0 at the start to `layerCount` at the end. */
export function frontPosition(progress: number, layerCount: number): number {
  return clampUnit(progress) * layerCount;
}

export function isReached(layer: number, progress: number, layerCount: number): boolean {
  return frontPosition(progress, layerCount) > layer;
}

export interface PassState {
  /** 1-based count of training passes. */
  readonly epoch: number;
  /** 0 → 1 as the pass front crosses the network. */
  readonly progress: number;
  /** 0 → 1 while the fully reached network rests before the next pass. */
  readonly settle: number;
}

export function passState(elapsedMs: number): PassState {
  const cycle = PASS_MS + REST_MS;
  const epoch = Math.floor(elapsedMs / cycle) + 1;
  const withinCycle = elapsedMs % cycle;

  if (withinCycle < PASS_MS) {
    return { epoch, progress: withinCycle / PASS_MS, settle: 0 };
  }
  return { epoch, progress: 1, settle: (withinCycle - PASS_MS) / REST_MS };
}

export function lossAt(epoch: number): number {
  return LOSS_FLOOR + LOSS_START * Math.exp(-LOSS_DECAY * epoch);
}

export function formatReadout(epoch: number): { epoch: string; loss: string } {
  return {
    epoch: String(epoch).padStart(4, '0'),
    loss: lossAt(epoch).toFixed(3),
  };
}
