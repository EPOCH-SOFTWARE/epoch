import { arcPath, monthsIn, num, polar } from '@/public/night/kept-time';
export function EngagementDial({ timeline }: { timeline: string }) {
  const months = monthsIn(timeline);
  if (!months || months > 12) return null;
  const sweep = months * 30,
    end = polar(220, 200, 130, sweep),
    label = polar(220, 200, 170, sweep),
    side = Math.sin((sweep * Math.PI) / 180);
  return (
    <figure className="case-dial" aria-hidden="true">
      <svg viewBox="0 0 440 400">
        <circle className="dial-year" cx="220" cy="200" r="130" />
        <g className="dial-ticks">
          {Array.from({ length: 12 }, (_, month) => {
            const major = month % 3 === 0,
              inner = polar(220, 200, 140, month * 30),
              outer = polar(220, 200, 130 + (major ? 22 : 16), month * 30);
            return (
              <line
                key={month}
                className={major ? 'major' : undefined}
                x1={num(inner.x)}
                y1={num(inner.y)}
                x2={num(outer.x)}
                y2={num(outer.y)}
              />
            );
          })}
        </g>
        <path className="dial-arc" pathLength="1" d={arcPath(220, 200, 130, 0, sweep)} />
        <g className="dial-end">
          <circle cx={num(end.x)} cy={num(end.y)} r="6" />
          <text
            className="dial-label"
            x={num(label.x)}
            y={num(label.y + 5)}
            textAnchor={side > 0.3 ? 'start' : side < -0.3 ? 'end' : 'middle'}
          >
            {timeline}
          </text>
        </g>
      </svg>
      <figcaption>One turn of the dial is a year.</figcaption>
    </figure>
  );
}
