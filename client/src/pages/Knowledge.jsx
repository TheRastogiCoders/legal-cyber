import { Link } from 'react-router-dom';
import { ARTICLES } from '../data/content';
import { ARTICLE_IMAGES, IMAGES } from '../data/images';
import { CtaBand, PageHero } from '../components/ui';

export default function Knowledge() {
  return (
    <>
      <PageHero
        eyebrow="Knowledge Centre"
        title="Plain-language guidance for high-stakes moments"
        lead="Articles, FAQs, checklists, and a glossary — written from daily practice. General information only; not legal advice."
        image={IMAGES.cta}
      />
      <section className="section">
        <div className="container">
          <div className="btn-row" style={{ marginTop: 0, marginBottom: '2rem' }}>
            <Link className="btn btn--outline" to="/knowledge/faq">
              FAQs
            </Link>
            <Link className="btn btn--outline" to="/knowledge/resources">
              Resources
            </Link>
            <Link className="btn btn--outline" to="/knowledge/glossary">
              Glossary
            </Link>
          </div>
          {ARTICLES.map((a) => (
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
      </section>
      <CtaBand title="Facing a similar issue?" text="Get in touch for a structured consultation." />
    </>
  );
}
