import { Link } from 'react-router-dom';
import { ARTICLES, PRACTICE_AREAS, STATS, STEPS, WHY } from '../data/content';
import { ARTICLE_IMAGES, IMAGES, PRACTICE_IMAGES } from '../data/images';
import { CtaBand, CtaButtons, Reveal } from '../components/ui';

export default function Home() {
  const featured = PRACTICE_AREAS.filter((p) =>
    [
      'cyber-crime-online-fraud',
      'bank-account-unfreeze',
      'ed-eow-pmla',
      'dpdp-compliance',
      'platform-documentation',
      'ip',
    ].includes(p.slug)
  );

  return (
    <>
      <section className="hero">
        <img
          className="hero-media"
          src={IMAGES.hero}
          alt="Digital networks over Earth — representing India’s digital economy"
        />
        <div className="hero-shade" aria-hidden="true" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <h1>
              <span className="hero-title-line">Cybercrime &amp;</span>
              <span className="hero-title-line">Technology Law</span>
              <span className="hero-title-line hero-title-line--firm">Advocates &amp; Associates</span>
            </h1>
            <p className="lead">
              Pan-India practice for fraud recovery, frozen accounts, enforcement matters, and DPDP
              compliance. Clear first steps. Direct advocate access.
            </p>
            <CtaButtons light urgent />
          </div>
          <ul className="trust-strip">
            <li>High Courts</li>
            <li>District Courts</li>
            <li>ED, CBI, EOW &amp; cyber police</li>
            <li>8 jurisdictions</li>
          </ul>
        </div>
      </section>

      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            {STATS.map((s) => (
              <div className="stat" key={s.value}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <p className="stats-note">
            Figures from official I4C/MHA disclosures for calendar year 2024. Review annually.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container section-split-media">
          <Reveal>
            <div className="eyebrow">The Problem</div>
            <h2>Cybercrime in India runs at industrial scale. Your response cannot be improvised.</h2>
            <p>
              Investment scams, digital-arrest extortion, and UPI fraud move money in minutes. Recovering
              it — and unfreezing accounts caught in the dragnet — depends on knowing how police, banks,
              and portals actually work.
            </p>
            <p>
              Innocent businesses get accounts frozen over one tainted transfer. Gateways hold settlements.
              Agencies issue summons. The DPDP Act adds penalty risk of up to ₹250 crore for data failures.
            </p>
            <p className="highlight-line">This practice exists for exactly these situations.</p>
          </Reveal>
          <Reveal>
            <figure className="media-frame media-frame--tall">
              <img
                src={IMAGES.problem}
                alt="Cybersecurity operations — digital defence context"
                loading="lazy"
              />
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Why Lawsake</div>
            <h2>Why clients retain this practice</h2>
            <p className="lead">Four reasons matters move faster here than with general counsel.</p>
          </div>
          <div className="principle-grid">
            {WHY.map((w) => (
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
            <div className="eyebrow">How We Help</div>
            <h2>Focused counsel where technology and law collide</h2>
            <p className="lead">
              Start here if you need action fast — each area has a clear process from first response to
              resolution.
            </p>
          </div>
          <div className="grid-3">
            {featured.map((p) => (
              <Reveal key={p.slug}>
                <Link className="card-link" to={`/practice-areas/${p.slug}`}>
                  <div className="card-link__media">
                    <img src={PRACTICE_IMAGES[p.slug]} alt="" loading="lazy" />
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
              View All Practice Areas
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">How It Works</div>
            <h2>Clarity first. Action second. Outcomes through process.</h2>
          </div>
          <div className="steps-layout">
            <div className="steps-grid">
              {STEPS.map((s) => (
                <article className="step" key={s.n}>
                  <span className="n">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </article>
              ))}
            </div>
            <figure className="media-frame media-frame--steps">
              <img src={IMAGES.process} alt="Secure digital infrastructure" loading="lazy" />
            </figure>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Knowledge</div>
            <h2>Practical guidance for high-stakes moments</h2>
          </div>
          <div>
            {ARTICLES.slice(0, 3).map((a) => (
              <Link className="article-card" to={`/knowledge/${a.slug}`} key={a.slug}>
                <div className="article-card__media">
                  <img src={ARTICLE_IMAGES[a.slug]} alt="" loading="lazy" />
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
              Browse Knowledge Centre
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
