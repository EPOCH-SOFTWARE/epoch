import {
  PASS_MS,
  REST_MS,
  createNetwork,
  formatReadout,
  isReached,
  lossAt,
  passState,
} from '../fieldModel';

const LAYERS = [4, 7, 9, 7, 3] as const;

describe('createNetwork', () => {
  it('creates one node per slot in every layer', () => {
    const network = createNetwork(LAYERS, 7);
    expect(network.nodes).toHaveLength(30);
    expect(network.layerCount).toBe(5);
  });

  it('places every node inside the unit square', () => {
    const { nodes } = createNetwork(LAYERS, 7);
    for (const node of nodes) {
      expect(node.x).toBeGreaterThanOrEqual(0);
      expect(node.x).toBeLessThanOrEqual(1);
      expect(node.y).toBeGreaterThanOrEqual(0);
      expect(node.y).toBeLessThanOrEqual(1);
    }
  });

  it('is deterministic for the same seed', () => {
    expect(createNetwork(LAYERS, 42)).toEqual(createNetwork(LAYERS, 42));
  });

  it('produces a different layout for a different seed', () => {
    expect(createNetwork(LAYERS, 1).nodes).not.toEqual(createNetwork(LAYERS, 2).nodes);
  });

  it('only connects nodes in adjacent layers, left to right', () => {
    const { nodes, edges } = createNetwork(LAYERS, 7);
    for (const edge of edges) {
      const from = nodes[edge.from];
      const to = nodes[edge.to];
      expect(to?.layer).toBe((from?.layer ?? -10) + 1);
    }
  });

  it('leaves no node behind: every node after the input layer has an incoming edge', () => {
    const { nodes, edges } = createNetwork(LAYERS, 7);
    const withIncoming = new Set(edges.map(edge => edge.to));
    const later = nodes.filter(node => node.layer > 0);
    expect(later.every(node => withIncoming.has(node.id))).toBe(true);
  });

  it('leaves no node behind: every node before the output layer has an outgoing edge', () => {
    const { nodes, edges } = createNetwork(LAYERS, 7);
    const withOutgoing = new Set(edges.map(edge => edge.from));
    const earlier = nodes.filter(node => node.layer < LAYERS.length - 1);
    expect(earlier.every(node => withOutgoing.has(node.id))).toBe(true);
  });
});

describe('isReached', () => {
  it('reaches nothing before a pass starts', () => {
    expect(isReached(0, 0, 5)).toBe(false);
  });

  it('reaches earlier layers before later ones', () => {
    expect(isReached(1, 0.4, 5)).toBe(true);
    expect(isReached(3, 0.4, 5)).toBe(false);
  });

  it('reaches every layer by the end of a pass', () => {
    for (let layer = 0; layer < 5; layer++) {
      expect(isReached(layer, 1, 5)).toBe(true);
    }
  });
});

describe('lossAt', () => {
  it('decreases with every epoch', () => {
    for (let epoch = 1; epoch < 200; epoch++) {
      expect(lossAt(epoch + 1)).toBeLessThan(lossAt(epoch));
    }
  });

  it('stays positive', () => {
    expect(lossAt(10_000)).toBeGreaterThan(0);
  });
});

describe('passState', () => {
  it('starts at epoch one with nothing reached', () => {
    expect(passState(0)).toEqual({ epoch: 1, progress: 0, settle: 0 });
  });

  it('sweeps the pass front across the network', () => {
    expect(passState(PASS_MS / 2).progress).toBeCloseTo(0.5);
  });

  it('holds the fully reached network while it settles', () => {
    const state = passState(PASS_MS + REST_MS / 2);
    expect(state.progress).toBe(1);
    expect(state.settle).toBeCloseTo(0.5);
  });

  it('begins the next epoch once the pass has settled', () => {
    expect(passState(PASS_MS + REST_MS)).toEqual({ epoch: 2, progress: 0, settle: 0 });
  });
});

describe('formatReadout', () => {
  it('pads the epoch to four digits', () => {
    expect(formatReadout(7).epoch).toBe('0007');
  });

  it('shows loss to three decimal places', () => {
    expect(formatReadout(7).loss).toMatch(/^\d\.\d{3}$/);
  });
});
