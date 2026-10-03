import { Closing } from '../Blocks';
import { InsightCards } from '../pages/ArticleDetail';
export function Insights() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="wrap">
          <h1 className="display">{'Insights.'}</h1>
          <p className="lede">{'Notes from building AI that has to work in production.'}</p>
        </div>
      </section>
      <section className="section ruled" aria-labelledby="latest-title">
        <div className="wrap">
          <div className="head split">
            <h2 id="latest-title" className="h2">
              {'Latest'}
            </h2>
            <p className="body">
              {'Practical notes on taking AI from a promising pilot to a system people rely on.'}
            </p>
          </div>
          <div className="cards" data-insights="">
            <InsightCards />
          </div>
        </div>
      </section>
      <Closing />
    </main>
  );
}
