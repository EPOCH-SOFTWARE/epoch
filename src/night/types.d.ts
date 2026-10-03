declare module '@/public/night/kept-time' {
  export function num(value: number): number;
  export function polar(
    cx: number,
    cy: number,
    radius: number,
    degrees: number
  ): { x: number; y: number };
  export function arcPath(
    cx: number,
    cy: number,
    radius: number,
    start: number,
    sweep: number
  ): string;
  export function monthsIn(timeline: string): number | null;
  export function stepAt(tops: number[], threshold: number): number;
  export function contactContext(
    search: string,
    services: readonly { id: string; title: string }[],
    goals: readonly { id: string; service: string; title: string }[]
  ): { service: string; label: string } | null;
}
