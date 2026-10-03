import { Closing } from '../Blocks';
import { IndustryRows } from '../pages/IndustryDetail';
export function Industries() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="wrap">
          <h1 className="display">{'Industries.'}</h1>
          <p className="lede">
            {
              ' AI only pays off when the people building it understand the business it runs in. These are the industries our clients work in. '
            }
          </p>
        </div>
      </section>
      <section className="section flush" aria-label="Industries we serve">
        <div className="wrap">
          <ul className="rows" data-industry-rows="">
            <IndustryRows />
          </ul>
        </div>
      </section>
      <Closing />
    </main>
  );
}
