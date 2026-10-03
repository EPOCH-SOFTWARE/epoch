/**
 * @fileoverview Content data constants for the application
 * @author Epoch Development Team
 */

import type { ClientLogo } from '../types';

export const COMMITMENTS: ReadonlyArray<{ title: string; detail: string }> = [
  {
    title: "We commit like it's our company.",
    detail:
      "Your outcome is our outcome. We make the calls we'd make if the business were ours, and we tell you early when something isn't working.",
  },
  {
    title: 'We go past the contract.',
    detail:
      'If the problem needs more than the scope says, it gets more. Meeting the spec on paper is not the job. Solving the problem is.',
  },
  {
    title: "We don't disappear at launch.",
    detail:
      'We stay through rollout, monitoring and the first real traffic, until the system works in the real world and not just in the demo.',
  },
];

export const CLIENT_LOGOS: ReadonlyArray<ClientLogo> = [
  { id: 'hub-international', name: 'HUB International', logo: '/logos/HUB-international.png' },
  { id: 'onesix-ai', name: 'OneSix AI' },
  { id: 'inspira-financial', name: 'Inspira Financial', logo: '/logos/inspira-financial.svg' },
  { id: 'cardinal-health', name: 'Cardinal Health', logo: '/logos/cardinal-health.png' },
  { id: 'shift4', name: 'Shift4', logo: '/logos/shift-4.svg' },
  { id: 'rural-king', name: 'Rural King', logo: '/logos/ruralking.png' },
  { id: 'destify', name: 'Destify', logo: '/logos/destify.svg' },
  { id: 'bluesky', name: 'BlueSky Commerce', logo: '/logos/bluesky-logo.svg' },
  { id: 'skeps', name: 'Skeps', logo: '/logos/skeps.svg' },
  { id: 'idrive', name: 'IDrive', logo: '/logos/idrive-logo.png' },
];
