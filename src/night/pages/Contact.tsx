import { DATA } from '../data';
import { GOALS } from '../content';
export function Contact() {
  return (
    <main id="main">
      <section className="page-hero contact-intro">
        <div className="wrap intro-split">
          <h1 className="display">
            {' Let’s build'}
            <br />
            {' what’s next. '}
          </h1>
          <div>
            <p className="lede">
              {' Tell us what you’re building and what’s in the way. We’ll take it from there. '}
            </p>
            <nav className="contact-ways" aria-label="Ways to get in touch">
              <a href="#message">{'Write to us'}</a>
              <a href="#book">{'Arrange a call'}</a>
            </nav>
          </div>
        </div>
      </section>
      <section className="section ruled contact-stage" id="message" aria-labelledby="message-title">
        <div className="wrap contact-grid">
          <form
            className="form"
            data-contact-form=""
            noValidate
            aria-labelledby="message-title"
            data-goals={JSON.stringify(GOALS)}
          >
            <div className="form-heading">
              <h2 id="message-title" className="h3">
                {'Tell us about the project.'}
              </h2>
              <p>{'Start with what you know. The details can follow.'}</p>
            </div>
            <div className="enquiry-context" data-enquiry-context="" hidden>
              <p></p>
              <button type="button" data-clear-context="">
                {'Clear selection'}
              </button>
            </div>
            <div className="pair">
              <div className="field">
                <label htmlFor="name">
                  {'Your name '}
                  <span>{'(required)'}</span>
                </label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  aria-describedby="name-error"
                  required
                />
                <p className="error" id="name-error" data-error-for="name" hidden></p>
              </div>
              <div className="field">
                <label htmlFor="email">
                  {'Work email '}
                  <span>{'(required)'}</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  aria-describedby="email-error"
                  required
                />
                <p className="error" id="email-error" data-error-for="email" hidden></p>
              </div>
            </div>
            <div className="field">
              <label htmlFor="message-body">
                {'What are you building, and what’s in the way? '}
                <span>{'(required)'}</span>
              </label>
              <textarea
                id="message-body"
                name="message"
                aria-describedby="message-error message-hint"
                required
              ></textarea>
              <p className="field-hint" id="message-hint">
                {' The goal, the problem, or simply where you’re stuck. '}
              </p>
              <p className="error" id="message-error" data-error-for="message" hidden></p>
            </div>
            <details className="project-details">
              <summary>
                {'Add project details '}
                <span>{'Optional'}</span>
              </summary>
              <div className="details-fields">
                <div className="pair">
                  <div className="field">
                    <label htmlFor="company">{'Company'}</label>
                    <input id="company" name="company" autoComplete="organization" />
                  </div>
                  <div className="field">
                    <label htmlFor="projectType">{'Project type'}</label>
                    <select id="projectType" name="projectType" defaultValue="">
                      <option value="">{'Not sure yet'}</option>
                      {DATA.services.map(service => (
                        <option key={service.id} value={service.id}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="pair">
                  <div className="field">
                    <label htmlFor="budget">{'Budget'}</label>
                    <select id="budget" name="budget" defaultValue="">
                      <option value="">{'Not sure yet'}</option>
                      <option>{'$25,000–$50,000'}</option>
                      <option>{'$50,000–$100,000'}</option>
                      <option>{'$100,000–$250,000'}</option>
                      <option>{'$250,000+'}</option>
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="timeline">{'Timeline'}</label>
                    <select id="timeline" name="timeline" defaultValue="">
                      <option value="">{'Not sure yet'}</option>
                      <option>{'As soon as possible'}</option>
                      <option>{'1–3 months'}</option>
                      <option>{'3–6 months'}</option>
                      <option>{'6+ months'}</option>
                    </select>
                  </div>
                </div>
              </div>
            </details>
            <div className="form-foot">
              <button className="btn" type="submit">
                {'Preview enquiry'}
              </button>
              <p className="form-note">
                {' This prototype previews your enquiry. To reach us now, use email or phone. '}
              </p>
            </div>
          </form>
          <div className="form-done" data-form-done="" hidden>
            <h2 className="h3" tabIndex={-1} data-done-title="">
              {'Your enquiry is ready.'}
            </h2>
            <p className="body" data-done-text=""></p>
            <dl className="enquiry-preview" data-enquiry-preview=""></dl>
            <p className="preview-message" data-preview-message=""></p>
            <p className="form-note">{'Nothing has been sent. This is a prototype preview.'}</p>
            <a className="btn" href="mailto:operator@epoch.sh">
              {'Email EPOCH'}
            </a>
            <button className="btn secondary sm" type="button" data-form-again="">
              {' Edit your enquiry '}
            </button>
          </div>
          <aside className="direct contact-aside" aria-labelledby="direct-title">
            <section id="book" className="call-note" aria-labelledby="book-title">
              <p className="aside-label">{'Prefer a conversation?'}</p>
              <h2 id="book-title">{'Let’s talk it through.'}</h2>
              <p data-booking-description="">
                {'Email us a few times that work for a 30-minute call.'}
              </p>
              <a
                className="text-link"
                data-booking=""
                href="mailto:operator@epoch.sh?subject=Arrange%20a%2030-minute%20call"
              >
                {'Arrange a call by email'}
              </a>
            </section>
            <div className="direct-details">
              <h2 id="direct-title" className="sub-h">
                {'A direct line to EPOCH'}
              </h2>
              <dl>
                <div>
                  <dt>{'Email'}</dt>
                  <dd>
                    <a href="mailto:operator@epoch.sh">{'operator@epoch.sh'}</a>
                  </dd>
                </div>
                <div>
                  <dt>{'Phone'}</dt>
                  <dd>
                    <a href="tel:+17043145262">{'+1 (704) 314-5262'}</a>
                  </dd>
                </div>
              </dl>
            </div>
            <div className="contact-next">
              <h3>{'What happens next'}</h3>
              <p>
                {
                  ' We read the brief, ask about the constraints and discuss the right next step with you. '
                }
              </p>
              <a className="text-link" href="/how-we-work">
                {'How we work'}
              </a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
