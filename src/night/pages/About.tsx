import { Closing, Offices, TechStack } from '../Blocks';
export function About() {
  return (
    <main id="main">
      <section className="page-hero about-intro">
        <div className="wrap">
          <h1 className="display">{'We don’t do half-in.'}</h1>
          <p className="lede">
            {
              ' EPOCH is an AI and software engineering company with teams in the US and India. Every engagement gets our full commitment, from the first call to long after launch. '
            }
          </p>
        </div>
      </section>
      <section className="section ruled about-conviction" aria-labelledby="why-title">
        <div className="wrap split">
          <h2 id="why-title" className="h2">
            {'Why it’s all or nothing'}
          </h2>
          <div>
            <p className="lede strong">
              {
                ' Most software problems aren’t hard because of the technology. They’re hard because someone stopped paying attention halfway through: a requirement that got skipped, an edge case nobody owned, a launch nobody stayed for. '
              }
            </p>
            <p className="body mt-m">
              {
                ' EPOCH exists to be the team that doesn’t stop paying attention. We own outcomes, not tickets, and we stay until the work is done. '
              }
            </p>
          </div>
        </div>
      </section>
      <section className="section ruled about-beliefs" aria-labelledby="beliefs-title">
        <div className="wrap split">
          <h2 id="beliefs-title" className="h2">
            {'What we believe'}
          </h2>
          <ul className="beliefs">
            <li>
              <h3>{'Serving the client is the whole job.'}</h3>
              <p>
                {'Technology is how we do it. Your outcome is what we measure ourselves against.'}
              </p>
            </li>
            <li>
              <h3>{'Going further is the default.'}</h3>
              <p>
                {'When the problem needs more than the plan, the plan changes. Not the standard.'}
              </p>
            </li>
            <li>
              <h3>{'Commitment doesn’t end at handoff.'}</h3>
              <p>
                {
                  'We stay through launch, adoption and whatever comes after, with maintenance, optimization and new features.'
                }
              </p>
            </li>
            <li>
              <h3>{'Honesty over comfort.'}</h3>
              <p>{'Honest estimates, early warnings and direct feedback. No surprises.'}</p>
            </li>
          </ul>
        </div>
      </section>
      <section className="section ruled" aria-labelledby="engagement-title">
        <div className="wrap split">
          <h2 id="engagement-title" className="h2">
            {'How an engagement runs'}
          </h2>
          <ol className="steps">
            <li>
              <span className="num" aria-hidden="true">
                {'01'}
              </span>
              <h3>{'Discovery and analysis'}</h3>
              <p>
                {
                  'Every project starts with understanding your challenges, goals and constraints. We gather requirements thoroughly before proposing solutions.'
                }
              </p>
            </li>
            <li>
              <span className="num" aria-hidden="true">
                {'02'}
              </span>
              <h3>{'Iterative development'}</h3>
              <p>
                {
                  'We build in short cycles with continuous feedback. Working software arrives early and improves with real usage.'
                }
              </p>
            </li>
            <li>
              <span className="num" aria-hidden="true">
                {'03'}
              </span>
              <h3>{'Quality assurance'}</h3>
              <p>
                {
                  'Automated testing, code reviews and structured QA before anything reaches production.'
                }
              </p>
            </li>
            <li>
              <span className="num" aria-hidden="true">
                {'04'}
              </span>
              <h3>{'Ongoing support'}</h3>
              <p>
                {
                  'Our engagement doesn’t end at launch. Maintenance, optimization and new features keep your systems running well.'
                }
              </p>
            </li>
          </ol>
        </div>
      </section>
      <section className="section ruled about-places" aria-labelledby="where-title">
        <div className="wrap split">
          <div>
            <h2 id="where-title" className="h2">
              {'Two locations.'}
              <br />
              {' One team.'}
            </h2>
            <p className="body mt-m">
              {'Charlotte, North Carolina.'}
              <br />
              {'Ahmedabad, India.'}
            </p>
          </div>
          <ul className="offices" data-offices="">
            <Offices />
          </ul>
        </div>
      </section>
      <section className="section ruled" aria-labelledby="stack-title">
        <div className="wrap split">
          <h2 id="stack-title" className="h2">
            {'What we build with'}
          </h2>
          <dl className="defs" data-tech="">
            <TechStack />
          </dl>
        </div>
      </section>
      <Closing />
    </main>
  );
}
