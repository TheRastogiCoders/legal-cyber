import { Link } from 'react-router-dom';
import { CtaBand, PageHero } from '../components/ui';
import { useContent } from '../cms/ContentContext';

export default function Knowledge() {
  const { content } = useContent();
  const page = content.knowledge;

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} lead={page.lead} image={content.images.cta} />
      <section className="section">
        <div className="container">
          <div className="btn-row" style={{ marginTop: 0, marginBottom: '2rem' }}>
            <Link className="btn btn--outline" to="/knowledge/faq">
              {page.faqCta}
            </Link>
            <Link className="btn btn--outline" to="/knowledge/resources">
              {page.resourcesCta}
            </Link>
            <Link className="btn btn--outline" to="/knowledge/glossary">
              {page.glossaryCta}
            </Link>
          </div>
          {content.articles.map((a) => (
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
      </section>
      <CtaBand title={page.ctaTitle} text={page.ctaText} />
    </>
  );
}
