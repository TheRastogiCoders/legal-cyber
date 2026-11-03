import { Link } from 'react-router-dom';
import { useContent } from '../cms/ContentContext';
import { featuredPracticeAreas } from '../cms/utils';
import { CtaBand, CtaButtons, Reveal } from '../components/ui';

export default function Home() {
  const { content } = useContent();
  const home = content.home;
  const featured = featuredPracticeAreas(content);

  return (
    <>
      <section className="hero">
        <img className="hero-media" src={content.images.hero} alt={home.heroImageAlt} />
        <div className="hero-shade" aria-hidden="true" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <h1>
              <span className="hero-title-line">{home.heroLine1}</span>
              <span className="hero-title-line">{home.heroLine2}</span>
              <span className="hero-title-line hero-title-line--firm">{home.heroLine3}</span>
            </h1>
            <p className="lead">{home.heroLead}</p>
            <CtaButtons light primaryOnly />
          </div>
          <ul className="trust-strip">
            {(home.trust || []).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            {content.stats.map((s) => (
              <div className="stat" key={s.value}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <p className="stats-note">{home.statsNote}</p>
        </div>
      </section>

      <section className="section">
        <div className="container section-split-media">
          <Reveal>
            <div className="eyebrow">{home.problemEyebrow}</div>
            <h2>{home.problemTitle}</h2>
            <p>{home.problemP1}</p>
            <p>{home.problemP2}</p>
            <p className="highlight-line">{home.problemHighlight}</p>
          </Reveal>
          <Reveal>
            <figure className="media-frame media-frame--tall">
              <img src={content.images.problem} alt={home.problemImageAlt} loading="lazy" />
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">{home.whyEyebrow}</div>
            <h2>{home.whyTitle}</h2>
            <p className="lead">{home.whyLead}</p>
          </div>
          <div className="principle-grid">
            {content.why.map((w) => (
              <article className="principle" key={w.title}>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">{home.helpEyebrow}</div>
            <h2>{home.helpTitle}</h2>
            <p className="lead">{home.helpLead}</p>
          </div>
          <div className="grid-3">
            {featured.map((p) => (
              <Reveal key={p.slug}>
                <Link className="card-link" to={`/practice-areas/${p.slug}`}>
                  <div className="card-link__media">
                    <img src={content.practiceImages[p.slug]} alt="" loading="lazy" />
                  </div>
                  <div className="card-link__body">
                    <div className="card-link__eyebrow">{p.urgent ? 'High urgency' : ''}</div>
                    <h3>{p.title}</h3>
                    <p>{p.short}</p>
                    <span className="more">Explore →</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="btn-row" style={{ marginTop: '2rem' }}>
            <Link className="btn btn--outline" to="/practice-areas">
              {home.helpCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">{home.processEyebrow}</div>
            <h2>{home.processTitle}</h2>
          </div>
          <div className="steps-layout">
            <div className="steps-grid">
              {content.steps.map((s) => (
                <article className="step" key={s.n}>
                  <span className="n">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </article>
              ))}
            </div>
            <figure className="media-frame media-frame--steps">
              <img src={content.images.process} alt={home.processImageAlt} loading="lazy" />
            </figure>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">{home.knowledgeEyebrow}</div>
            <h2>{home.knowledgeTitle}</h2>
          </div>
          <div>
            {content.articles.slice(0, 3).map((a) => (
              <Link className="article-card" to={`/knowledge/${a.slug}`} key={a.slug}>
                <div className="article-card__media">
                  <img src={content.articleImages[a.slug]} alt="" loading="lazy" />
                </div>
                <div>
                  <div className="meta-row">
                    <span>{a.readTime} read</span>
                  </div>
                  <h3>{a.title}</h3>
                  <p>{a.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="btn-row">
            <Link className="btn btn--outline" to="/knowledge">
              {home.knowledgeCta}
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
