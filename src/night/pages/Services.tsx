import { Closing, ServiceRows } from '../Blocks';
import { GoalExplorer } from '../Explorers';
export function Services() {
  return (
    <main id="main">
      <section className="page-hero services-intro">
        <div className="wrap intro-split">
          <h1 className="display">
            {' Start with'}
            <br />
            {' the hard part. '}
          </h1>
          <div>
            <p className="lede">
              {
                ' The workflow that takes too long. The product ready to be built. The platform holding you back. '
              }
            </p>
            <a className="text-link" href="#capabilities">
              {'See every capability'}
            </a>
          </div>
        </div>
      </section>
      <section className="wrap goal-explorer" aria-labelledby="goals-title">
        <div className="explorer-heading">
          <h2 id="goals-title">{'What do you want to change?'}</h2>
          <span>{'Choose a starting point'}</span>
        </div>
        <GoalExplorer />
        <noscript>
          <p>
            Explore our AI and engineering services below, or{' '}
            <a href="/contact">tell us about your project</a>.
          </p>
        </noscript>
      </section>
      <div className="wrap catalogue-heading" id="capabilities">
        <h2>{'The capabilities behind it.'}</h2>
        <p>{'One team across the model, the product and the infrastructure.'}</p>
      </div>
      <section className="section ruled" id="tier-ai" aria-labelledby="tier-ai-title">
        <div className="wrap">
          <div className="head split">
            <h2 id="tier-ai-title" className="h2">
              {'AI'}
            </h2>
            <p className="body">
              {' Models, agents and data systems that run in production, not in a slide deck. '}
            </p>
          </div>
          <ul className="rows" data-service-rows="ai">
            <ServiceRows tier="ai" />
          </ul>
        </div>
      </section>
      <section className="section ruled" id="tier-engineering" aria-labelledby="tier-eng-title">
        <div className="wrap">
          <div className="head split">
            <h2 id="tier-eng-title" className="h2">
              {'Engineering that makes AI real'}
            </h2>
            <p className="body">
              {' The software, infrastructure and security every AI system depends on. '}
            </p>
          </div>
          <ul className="rows" data-service-rows="engineering">
            <ServiceRows tier="engineering" />
          </ul>
        </div>
      </section>
      <Closing />
    </main>
  );
}
