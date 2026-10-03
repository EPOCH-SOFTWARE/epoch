import { Closing, Clients, FeaturedWork } from '../Blocks';
export function Work() {
  return (
    <main id="main">
      <section className="page-hero work-intro">
        <div className="wrap">
          <h1 className="display">
            {'Built for'}
            <br />
            {' the real world.'}
          </h1>
          <p className="lede">
            {' Inside two engagements: the challenge, the system and the work behind it. '}
          </p>
          <nav className="work-index" aria-label="Project index">
            <a href="#featured-hub-international">
              {'HUB International '}
              <span>{'Insurance'}</span>
            </a>
            <a href="#featured-inspira-financial">
              {'Inspira Financial '}
              <span>{'Financial services'}</span>
            </a>
          </nav>
        </div>
      </section>
      <section className="section ruled" aria-labelledby="cases-title">
        <div className="wrap">
          <div className="head split">
            <h2 id="cases-title" className="h2">
              {'Case studies'}
            </h2>
            <p className="body">
              {'What we built, how the teams worked, where it got hard and what changed.'}
            </p>
          </div>
          <div data-featured-work="full">
            <FeaturedWork full />
          </div>
        </div>
      </section>
      <section className="section ruled" aria-labelledby="demo-title">
        <div className="wrap demo-invite">
          <h2 id="demo-title" className="h2">
            {'Every answer should have evidence.'}
          </h2>
          <div>
            <p>
              {
                'Try a document review. Follow a result back to its source, remove a detail, or give it two different dates. See what needs a human decision.'
              }
            </p>
            <div className="actions">
              <a className="btn" href="/document-demo">
                {'Try the document demo'}
              </a>
            </div>
            <p className="demo-note">
              {
                'Fictional sample documents. Explore the instant preview or try AI review when connected.'
              }
            </p>
          </div>
        </div>
      </section>
      <section className="section ruled" aria-labelledby="clients-title">
        <div className="wrap">
          <div className="head split">
            <h2 id="clients-title" className="h2">
              {'Everyone we’ve worked with'}
            </h2>
          </div>
          <ul className="clients grid" data-clients="">
            <Clients />
          </ul>
        </div>
      </section>
      <Closing />
    </main>
  );
}
