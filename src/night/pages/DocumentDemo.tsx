export function DocumentDemo() {
  return (
    <main id="main">
      <section className="demo-hero wrap" aria-labelledby="demo-title">
        <a className="demo-back" href="/work">
          {'Back to our work'}
        </a>
        <h1 id="demo-title">
          {'An answer should'}
          <br />
          {'come with evidence.'}
        </h1>
        <p className="lede">
          {'Find the source. Catch what’s missing. Keep the human in the decision.'}
        </p>
        <p className="demo-caption">{'Explore the sample, then review your own text with AI.'}</p>
      </section>
      <section className="wrap demo-stage" aria-label="Interactive document review">
        <div className="demo-scenarios" role="group" aria-label="Choose a sample document">
          <button type="button" data-sample="complete" aria-pressed="true">
            {'Complete brief'}
          </button>
          <button type="button" data-sample="missing" aria-pressed="false">
            {'Missing detail'}
          </button>
          <button type="button" data-sample="conflict" aria-pressed="false">
            {'Conflicting dates'}
          </button>
        </div>
        <div className="demo-workspace">
          <form className="demo-document" id="review-form">
            <div className="document-heading">
              <label htmlFor="source-document">{'Source document'}</label>
              <span>{'handover.txt'}</span>
            </div>
            <p id="document-help">
              {
                'Edit the brief or paste your own notes. AI review reads prose and labelled fields, and sends your text to OpenAI.'
              }
            </p>
            <textarea
              id="source-document"
              name="document"
              maxLength={10000}
              spellCheck="false"
              aria-describedby="document-help demo-method"
              aria-label="Source document, editable project brief"
            ></textarea>
            <div className="document-actions">
              <button type="submit" className="btn">
                {'Review with AI'}
              </button>
              <button type="button" className="demo-preview" data-preview="">
                {'Preview labelled fields'}
              </button>
              <button type="button" className="demo-reset">
                {'Reset sample'}
              </button>
            </div>
            <p className="demo-connection" data-ai-connection="" role="status">
              {'Checking AI connection…'}
            </p>
          </form>
          <section className="demo-results" aria-labelledby="results-title">
            <div className="results-heading">
              <h2 id="results-title">{'What the document says'}</h2>
              <span className="review-state" data-review-state="">
                {'Sample preview'}
              </span>
            </div>
            <div data-review-results=""></div>
            <p
              className="review-summary"
              role="status"
              aria-live="polite"
              data-review-summary=""
            ></p>
            <p className="demo-error" role="alert" data-review-error="" hidden></p>
          </section>
        </div>
        <p className="demo-method" id="demo-method">
          {
            'The samples are fictional. Sample preview reads labelled fields in your browser. Review with AI sends this document to OpenAI. Source quotes are checked against your text, but AI can still misread it. Check the evidence before using an answer.'
          }
        </p>
        <noscript>
          <p className="demo-error">Enable JavaScript to try the document review.</p>
        </noscript>
      </section>
      <section className="section ruled" aria-labelledby="principle-title">
        <div className="wrap split">
          <h2 className="h2" id="principle-title">
            {'Make uncertainty visible.'}
          </h2>
          <div className="demo-principles">
            <div>
              <h3>{'Trace the answer'}</h3>
              <p>
                {
                  'Select a source beneath any result. The exact line is highlighted in the document.'
                }
              </p>
            </div>
            <div>
              <h3>{'Leave a gap when the source does'}</h3>
              <p>
                {
                  'Remove the owner. The review flags the missing detail so a person can resolve it.'
                }
              </p>
            </div>
            <div>
              <h3>{'Keep conflicting evidence'}</h3>
              <p>
                {
                  'Two different dates stay visible. The review asks for a decision instead of choosing one silently.'
                }
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section ruled closing" aria-labelledby="demo-close">
        <div className="wrap">
          <h2 className="h2" id="demo-close">
            {'What do your teams spend hours reading?'}
          </h2>
          <p className="lede mt-m">
            {'Bring us the workflow, the documents and the decisions that matter.'}
          </p>
          <div className="actions">
            <a className="btn" href="/contact">
              {'Talk through your workflow'}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
