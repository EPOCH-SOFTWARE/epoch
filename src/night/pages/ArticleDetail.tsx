import { ARTICLES } from '../content';
import {
  type Article,
  articleSlug,
  readingTime,
  formatArticleDate,
  newestArticles,
} from '../articles';
import { Calls, ServiceChips, Missing, Closing } from '../Blocks';
function Dateline({ article }: { article: Article }) {
  return (
    <>
      <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
      <span>{readingTime(article)} min read</span>
    </>
  );
}
export function InsightCards({ exclude }: { exclude?: string }) {
  return newestArticles()
    .filter(a => a.slug !== exclude)
    .map(a => (
      <article className="card" key={a.slug}>
        <p className="meta ins-meta">
          <Dateline article={a} />
        </p>
        <h3>
          <a href={'/insights/' + a.slug}>{a.title}</a>
        </h3>
        <p className="ins-dek">{a.dek}</p>
        <p className="more" aria-hidden="true">
          Read the article
        </p>
      </article>
    ));
}
export function ArticleDetail({ id }: { id: string }) {
  const a = ARTICLES.find(a => a.slug === id);
  if (!a)
    return (
      <main id="main">
        <div data-article="">
          <Missing
            title="We haven’t published that article."
            href="/insights"
            label="See all insights"
          />
        </div>
        <Closing />
      </main>
    );
  return (
    <main id="main">
      <div data-article="">
        <article className="ins-article" aria-labelledby="article-title">
          <header className="page-hero">
            <div className="wrap">
              <p className="crumbs">
                <a href="/insights">Insights</a>
                <span aria-hidden="true">/</span>
                <span>{a.title}</span>
              </p>
              <h1 id="article-title" className="display ins-title">
                {a.title}
              </h1>
              <p className="lede">{a.dek}</p>
              <p className="ins-byline">
                <span>EPOCH</span>
                <Dateline article={a} />
              </p>
            </div>
          </header>
          <div className="section ruled">
            <div className="wrap ins-layout">
              <aside className="ins-aside">
                <nav className="ins-toc" aria-label="In this article">
                  <p className="ins-toc-title">In this article</p>
                  <ol>
                    {a.body
                      .filter(b => b.h2)
                      .map(b => (
                        <li key={b.h2}>
                          <a href={'#' + articleSlug(b.h2!)}>{b.h2}</a>
                        </li>
                      ))}
                  </ol>
                </nav>
              </aside>
              <div className="ins-body">
                {a.body.map((b, i) =>
                  b.h2 ? (
                    <h2 id={articleSlug(b.h2)} key={b.h2}>
                      {b.h2}
                    </h2>
                  ) : b.ul ? (
                    <ul key={b.ul.join()}>
                      {b.ul.map(item => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : b.quote ? (
                    <blockquote className="ins-quote" key={b.quote}>
                      <p>{b.quote}</p>
                    </blockquote>
                  ) : (
                    <p key={b.p}>
                      {b.p}
                      {i === a.body.length - 1 && <span className="ins-end" aria-hidden="true" />}
                    </p>
                  )
                )}
                <div className="ins-closing">
                  <p>{a.closing}</p>
                  <Calls label="Book a 30-minute call" />
                  <h2 className="ins-related-title">Related services</h2>
                  <ul className="chips">
                    <ServiceChips ids={a.related} />
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>
        <section className="section ruled" aria-labelledby="more-title">
          <div className="wrap">
            <div className="head split">
              <h2 id="more-title" className="h2">
                Keep reading
              </h2>
            </div>
            <div className="cards ins-cards-2">
              <InsightCards exclude={a.slug} />
            </div>
          </div>
        </section>
      </div>
      <Closing />
    </main>
  );
}
