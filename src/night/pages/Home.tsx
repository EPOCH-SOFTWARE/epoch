import { Closing, Clients, ServiceRows, ServiceChips, FeaturedWork, Commitments } from '../Blocks';
export function Home() {
  return (
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1 id="hero-title" className="display">
              {'AI, engineered all the way to production.'}
            </h1>
            <p className="lede">
              {
                ' EPOCH designs, builds and supports AI systems for enterprises like HUB International and Inspira Financial, with one team from the first model to long after launch. '
              }
            </p>
            <div className="actions">
              <a className="btn" href="/contact">
                {'Start a project'}
              </a>
              <a className="btn secondary" href="/work">
                {'See our work'}
              </a>
            </div>
          </div>
          <div className="v-draft" aria-hidden="true">
            <svg viewBox="0 0 640 640">
              <defs>
                <radialGradient
                  id="hero-beam"
                  gradientUnits="userSpaceOnUse"
                  cx="320"
                  cy="340"
                  r="480"
                >
                  <stop className="glow-stop" offset="0.38" stopOpacity="0"></stop>
                  <stop className="glow-stop" offset="0.48" stopOpacity="0.22"></stop>
                  <stop className="glow-stop" offset="0.64" stopOpacity="0.07"></stop>
                  <stop className="glow-stop" offset="1" stopOpacity="0"></stop>
                </radialGradient>
                <radialGradient
                  id="hero-halo"
                  gradientUnits="userSpaceOnUse"
                  cx="320"
                  cy="150"
                  r="130"
                >
                  <stop className="glow-stop" offset="0.3" stopOpacity="0.3"></stop>
                  <stop className="glow-stop" offset="0.6" stopOpacity="0.08"></stop>
                  <stop className="glow-stop" offset="1" stopOpacity="0"></stop>
                </radialGradient>
                <filter id="hero-soften" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="18"></feGaussianBlur>
                </filter>
              </defs>
              <g className="draft-guides" fill="none" strokeWidth="1" strokeDasharray="2 5">
                <circle cx="320" cy="340" r="226.5"></circle>
                <circle cx="320" cy="340" r="190"></circle>
                <circle cx="320" cy="340" r="153.5"></circle>
                <path d="M320 80V600M60 340H580"></path>
              </g>
              <g className="draft-dial draft-ticks" strokeWidth="1">
                <line x1="320" y1="100" x2="320" y2="82"></line>
                <line x1="382.12" y1="108.18" x2="384.7" y2="98.52" className="minor"></line>
                <line x1="440" y1="132.15" x2="445" y2="123.49" className="minor"></line>
                <line x1="489.71" y1="170.29" x2="496.78" y2="163.22" className="minor"></line>
                <line x1="527.85" y1="220" x2="536.51" y2="215" className="minor"></line>
                <line x1="551.82" y1="277.88" x2="561.48" y2="275.3" className="minor"></line>
                <line x1="560" y1="340" x2="578" y2="340"></line>
                <line x1="551.82" y1="402.12" x2="561.48" y2="404.7" className="minor"></line>
                <line x1="527.85" y1="460" x2="536.51" y2="465" className="minor"></line>
                <line x1="489.71" y1="509.71" x2="496.78" y2="516.78" className="minor"></line>
                <line x1="440" y1="547.85" x2="445" y2="556.51" className="minor"></line>
                <line x1="382.12" y1="571.82" x2="384.7" y2="581.48" className="minor"></line>
                <line x1="320" y1="580" x2="320" y2="598"></line>
                <line x1="257.88" y1="571.82" x2="255.3" y2="581.48" className="minor"></line>
                <line x1="200" y1="547.85" x2="195" y2="556.51" className="minor"></line>
                <line x1="150.29" y1="509.71" x2="143.22" y2="516.78" className="minor"></line>
                <line x1="112.15" y1="460" x2="103.49" y2="465" className="minor"></line>
                <line x1="88.18" y1="402.12" x2="78.52" y2="404.7" className="minor"></line>
                <line x1="80" y1="340" x2="62" y2="340"></line>
                <line x1="88.18" y1="277.88" x2="78.52" y2="275.3" className="minor"></line>
                <line x1="112.15" y1="220" x2="103.49" y2="215" className="minor"></line>
                <line x1="150.29" y1="170.29" x2="143.22" y2="163.22" className="minor"></line>
                <line x1="200" y1="132.15" x2="195" y2="123.49" className="minor"></line>
                <line x1="257.88" y1="108.18" x2="255.3" y2="98.52" className="minor"></line>
              </g>
              <g className="draft-dial draft-hours" fontFamily="var(--font-mono)" fontSize="13">
                <text x="320" y="70" textAnchor="middle">
                  {'00'}
                </text>
                <text x="598" y="344">
                  {'06'}
                </text>
                <text x="320" y="622" textAnchor="middle">
                  {'12'}
                </text>
                <text x="42" y="344" textAnchor="end">
                  {'18'}
                </text>
              </g>
              <g data-hero-o="">
                <g className="draft-light">
                  <path
                    d="M320 340L80 -75.69A480 480 0 0 1 560 -75.69Z"
                    fill="url(#hero-beam)"
                    filter="url(#hero-soften)"
                  ></path>
                  <circle cx="320" cy="150" r="130" fill="url(#hero-halo)"></circle>
                </g>
                <line
                  className="draft-hand"
                  x1="320"
                  y1="340"
                  x2="320"
                  y2="150"
                  strokeWidth="1.5"
                ></line>
                <path
                  className="draft-ring"
                  pathLength="1"
                  d="M409.2 172.24A190 190 0 1 1 230.8 172.24"
                  fill="none"
                  strokeWidth="73"
                ></path>
                <circle className="draft-dot" cx="320" cy="150" r="47"></circle>
              </g>
              <text
                className="draft-now"
                data-hero-now=""
                fontFamily="var(--font-mono)"
                fontSize="15"
                textAnchor="middle"
              ></text>
              <g className="draft-notes">
                <g className="draft-marks" fill="none" strokeWidth="1">
                  <path d="M312 340H328M320 332V348"></path>
                  <path d="M320 340L475.6 449M471 455.6L480.2 442.4"></path>
                </g>
                <text
                  className="draft-data"
                  x="396"
                  y="386"
                  fontFamily="var(--font-mono)"
                  fontSize="15"
                >
                  {'r 1.000'}
                </text>
                <g className="draft-caption" fontSize="14">
                  <text x="20" y="34">
                    {'EPOCH mark'}
                  </text>
                  <text x="20" y="54">
                    {'Construction, rev B'}
                  </text>
                  <text className="draft-mono" x="620" y="34" textAnchor="end" fontSize="13">
                    {'t₀ 1970-01-01 00:00 UTC'}
                  </text>
                  <text
                    className="draft-mono"
                    x="620"
                    y="54"
                    textAnchor="end"
                    fontSize="13"
                    data-unix-label=""
                  ></text>
                  <text x="20" y="592">
                    {'A 24-hour clock: one turn a day.'}
                  </text>
                  <text x="20" y="612">
                    {'The opening points to now.'}
                  </text>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </section>
      <nav className="wrap home-paths" aria-label="Find your starting point">
        <p>{'What brings you here?'}</p>
        <a href="/services?goal=automate#explore">{'Automate a workflow'}</a>
        <a href="/services?goal=build#explore">{'Build an AI product'}</a>
        <a href="/services?goal=modernise#explore">{'Modernise a platform'}</a>
      </nav>
      <section className="wrap logo-strip" aria-labelledby="clients-title">
        <h2 id="clients-title" className="label">
          {'Trusted by teams at'}
        </h2>
        <div className="marquee">
          <div className="marquee-track">
            <ul className="clients" data-clients="">
              <Clients />
            </ul>
            <ul className="clients" data-clients="" aria-hidden="true">
              <Clients />
            </ul>
          </div>
        </div>
      </section>
      <section className="section ruled" aria-labelledby="work-title">
        <div className="wrap">
          <div className="head split">
            <h2 id="work-title" className="h2">
              {'Selected work'}
            </h2>
            <p className="body">
              {'Production systems for companies where getting it wrong is expensive.'}
            </p>
          </div>
          <div data-featured-work="">
            <FeaturedWork />
          </div>
          <div className="actions">
            <a className="text-link" href="/work">
              {'Explore the work and try a demo'}
            </a>
          </div>
        </div>
      </section>
      <section className="section ruled" aria-labelledby="why-title">
        <div className="wrap split">
          <h2 id="why-title" className="h2">
            {'Why EPOCH'}
          </h2>
          <div>
            <dl className="defs">
              <div className="def">
                <dt>{'epoch, in computing'}</dt>
                <dd>{'Time zero: the fixed reference point that Unix time is counted from.'}</dd>
              </div>
              <div className="def">
                <dt>{'epoch, in machine learning'}</dt>
                <dd>{'One complete pass through every example in the data. Nothing skipped.'}</dd>
              </div>
            </dl>
            <p className="body">
              {
                ' We hold our work to both: a standard that doesn’t move, and a complete pass through every requirement, every edge case and every person who will use what we build. '
              }
            </p>
          </div>
        </div>
      </section>
      <section className="section ruled" aria-labelledby="commit-title">
        <div className="wrap">
          <div className="head split">
            <h2 id="commit-title" className="h2">
              {'What you can hold us to'}
            </h2>
            <p className="body">
              {
                'The difference between a vendor and a partner is what happens when the plan meets reality.'
              }
            </p>
          </div>
          <ul className="statements" data-commitments="">
            <Commitments />
          </ul>
        </div>
      </section>
      <section className="section ruled" aria-labelledby="build-title">
        <div className="wrap">
          <div className="head split">
            <h2 id="build-title" className="h2">
              {'AI that makes it to production'}
            </h2>
            <p className="body">
              {
                ' Plenty of AI looks good in a demo. We build the kind that holds up in production: the models, the agents and the data underneath them. '
              }
            </p>
          </div>
          <ul className="rows" data-service-rows="ai">
            <ServiceRows tier="ai" />
          </ul>
          <div className="engineering">
            <h3 className="h3">{'And the engineering that makes it real'}</h3>
            <ul className="chips" data-service-chips="engineering">
              <ServiceChips tier="engineering" />
            </ul>
          </div>
        </div>
      </section>
      <Closing />
    </main>
  );
}
