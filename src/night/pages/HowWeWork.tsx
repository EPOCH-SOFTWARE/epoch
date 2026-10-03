import { Closing } from '../Blocks';
export function HowWeWork() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="wrap">
          <h1 className="display">{'How we work.'}</h1>
          <p className="lede">
            {
              ' One team from the first conversation to long after launch. Here’s what working with EPOCH looks like, and how pricing works. '
            }
          </p>
          <div className="actions">
            <a className="btn" href="/contact">
              {'Start a project'}
            </a>
            <a className="btn secondary" href="/contact#book">
              {'Book a 30-minute call'}
            </a>
          </div>
        </div>
      </section>
      <section className="section ruled" aria-labelledby="models-title">
        <div className="wrap">
          <div className="head split">
            <h2 id="models-title" className="h2">
              {'Ways to work with us'}
            </h2>
            <p className="body">
              {
                'Start small and prove the idea, or bring us in for the whole build and everything after it.'
              }
            </p>
          </div>
          <ul className="pg-models">
            <li className="pg-model">
              <h3>{'Pilot'}</h3>
              <p>
                {
                  'A working prototype on your own data, so you can see what AI does for the problem before you commit to a full build.'
                }
              </p>
              <dl className="pg-meta">
                <div>
                  <dt>{'Typical length'}</dt>
                  <dd>{'3–4 weeks'}</dd>
                </div>
                <div>
                  <dt>{'Best for'}</dt>
                  <dd>{'Proving an idea and building the case for investment'}</dd>
                </div>
              </dl>
            </li>
            <li className="pg-model">
              <h3>{'Build to production'}</h3>
              <p>
                {
                  'The full system: models, data pipelines, integrations, testing, deployment and monitoring, running in your environment.'
                }
              </p>
              <dl className="pg-meta">
                <div>
                  <dt>{'Typical length'}</dt>
                  <dd>{'8–16 weeks from assessment to production'}</dd>
                </div>
                <div>
                  <dt>{'Best for'}</dt>
                  <dd>{'Taking a proven idea into daily use'}</dd>
                </div>
              </dl>
            </li>
            <li className="pg-model">
              <h3>{'Dedicated team'}</h3>
              <p>
                {
                  'An EPOCH team across the US and India, working inside your process with one accountable lead.'
                }
              </p>
              <dl className="pg-meta">
                <div>
                  <dt>{'Typical length'}</dt>
                  <dd>{'Ongoing, scaled to the work'}</dd>
                </div>
                <div>
                  <dt>{'Best for'}</dt>
                  <dd>{'Roadmaps with more than one project'}</dd>
                </div>
              </dl>
            </li>
            <li className="pg-model">
              <h3>{'Ongoing support'}</h3>
              <p>
                {
                  'Monitoring, retraining, maintenance and new features after launch, so systems keep performing as your data changes.'
                }
              </p>
              <dl className="pg-meta">
                <div>
                  <dt>{'Typical length'}</dt>
                  <dd>{'Monthly'}</dd>
                </div>
                <div>
                  <dt>{'Best for'}</dt>
                  <dd>{'Keeping production systems healthy'}</dd>
                </div>
              </dl>
            </li>
          </ul>
        </div>
      </section>
      <section className="section ruled" aria-labelledby="first-30-title">
        <div className="wrap split">
          <div className="pin month">
            <h2 id="first-30-title" className="h2">
              {'Your first 30 days'}
            </h2>
            <div className="month-ring" data-month-ring=""></div>
          </div>
          <ol className="steps pg-steps" data-ring-steps="">
            <li>
              <span className="num">{'Week 1'}</span>
              <h3>{'Discovery'}</h3>
              <p>
                {
                  'We meet the people who own the problem, agree on goals and constraints, and get access to the data and systems we need.'
                }
              </p>
            </li>
            <li>
              <span className="num">{'Week 2'}</span>
              <h3>{'Assessment and a written plan'}</h3>
              <p>
                {
                  'We check data quality and the existing architecture, then write up what we’ll build, how we’ll measure it and what it will take.'
                }
              </p>
            </li>
            <li>
              <span className="num">{'Weeks 3–4'}</span>
              <h3>{'A working prototype'}</h3>
              <p>
                {
                  'You see a working prototype on your real data, not a slide deck, and test it against the cases that matter to you.'
                }
              </p>
            </li>
            <li>
              <span className="num">{'Day 30'}</span>
              <h3>{'Decision point'}</h3>
              <p>
                {
                  'Together we decide: go to production, adjust the approach, or stop. If it isn’t worth building, we’ll say so.'
                }
              </p>
            </li>
          </ol>
        </div>
      </section>
      <section className="section ruled" aria-labelledby="runs-title">
        <div className="wrap split">
          <h2 id="runs-title" className="h2">
            {'How the work runs'}
          </h2>
          <ul className="list">
            <li>{'Two-week sprints, with a demo of working software at the end of each one.'}</li>
            <li>{'Daily standups with your team, so nothing waits a week to surface.'}</li>
            <li>
              {
                'Stakeholder updates every two weeks: progress, risks and the decisions we need from you.'
              }
            </li>
            <li>{'One accountable lead who owns delivery from start to finish.'}</li>
          </ul>
        </div>
      </section>
      <section className="section ruled" aria-labelledby="pricing-title">
        <div className="wrap">
          <div className="head split">
            <h2 id="pricing-title" className="h2">
              {'How pricing works'}
            </h2>
            <p className="body">
              {
                'Every engagement starts with a conversation, then a written proposal with scope, timeline and cost.'
              }
            </p>
          </div>
          <ul className="pg-pricing">
            <li className="pg-price">
              <h3>{'Pilots'}</h3>
              <p>{'Scoped to one problem and one dataset, priced once we understand both.'}</p>
              <p className="pg-billing">{'Fixed price, agreed after discovery'}</p>
            </li>
            <li className="pg-price">
              <h3>{'Production builds'}</h3>
              <p>{'The full system, from data pipelines to deployment and monitoring.'}</p>
              <p className="pg-billing">{'Fixed scope or time and materials'}</p>
            </li>
            <li className="pg-price">
              <h3>{'Dedicated teams'}</h3>
              <p>{'An EPOCH team working inside your process, scaled up or down with the work.'}</p>
              <p className="pg-billing">{'Monthly'}</p>
            </li>
            <li className="pg-price">
              <h3>{'Support'}</h3>
              <p>{'Monitoring, retraining, maintenance and new features after launch.'}</p>
              <p className="pg-billing">{'Monthly plan sized to your systems'}</p>
            </li>
          </ul>
          <p className="pg-note">{'Most projects start at $25,000.'}</p>
        </div>
      </section>
      <section className="section ruled" aria-labelledby="need-title">
        <div className="wrap split">
          <h2 id="need-title" className="h2">
            {'What we need from you'}
          </h2>
          <ul className="list">
            <li>{'A decision-maker who can say yes, no, or not yet.'}</li>
            <li>{'Access to the data and systems the work touches.'}</li>
            <li>{'A few hours a week from the people who know the domain best.'}</li>
          </ul>
        </div>
      </section>
      <section className="section ruled" aria-labelledby="faq-title">
        <div className="wrap split">
          <h2 id="faq-title" className="h2">
            {'Questions'}
          </h2>
          <div className="faq">
            <details>
              <summary>{'How long does it take to build and deploy a custom ML model?'}</summary>
              <p>
                {
                  'A typical engagement runs 8-16 weeks from data assessment to production deployment, depending on data readiness and model complexity. We deliver working prototypes within the first 3-4 weeks.'
                }
              </p>
            </details>
            <details>
              <summary>{'What data do we need to have ready before starting?'}</summary>
              <p>
                {
                  'You need historical data relevant to the problem you want to solve. We help assess data quality and volume during our initial assessment phase and can assist with data cleaning and preparation.'
                }
              </p>
            </details>
            <details>
              <summary>{'Can you integrate ML models with our existing systems?'}</summary>
              <p>
                {
                  'Yes. We deploy models as APIs or embed them directly into your existing applications and data pipelines. We work with your engineering team to ensure seamless integration.'
                }
              </p>
            </details>
            <details>
              <summary>{'What does ongoing maintenance look like after deployment?'}</summary>
              <p>
                {
                  'We offer support tiers that include monitoring dashboards, periodic model retraining, performance reviews, and infrastructure management. Most clients transition to self-managed operations within 6 months.'
                }
              </p>
            </details>
          </div>
        </div>
      </section>
      <Closing />
    </main>
  );
}
