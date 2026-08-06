import { Link, useParams } from 'react-router-dom';
import { ARTICLES } from '../data/content';
import { ARTICLE_IMAGES } from '../data/images';
import { CtaButtons, PageHero } from '../components/ui';

export default function Article() {
  const { slug } = useParams();
  const article = ARTICLES.find((a) => a.slug === slug);
  const image = ARTICLE_IMAGES[slug];

  if (!article) {
    return (
      <section className="section">
        <div className="container">
          <h1>Article not found</h1>
          <Link className="btn btn--primary" to="/knowledge">
            Back to Knowledge Centre
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHero
        title={article.title}
        lead={article.excerpt}
        eyebrow={`${article.readTime} read`}
        image={image}
      />
      <section className="section">
        <div className="container article-layout">
          <article className="article-body prose">
            {article.body.map((block) => (
              <div key={block.h}>
                <h2>{block.h}</h2>
                <p>{block.p}</p>
              </div>
            ))}
            <p className="article-disclaimer">
              This article is for general information only and is not legal advice or solicitation. Laws
              and procedures change; verify the current position before acting. For advice on your
              specific situation, please consult a qualified advocate.
            </p>
            <CtaButtons />
            <div className="btn-row">
              <Link className="btn btn--outline" to="/knowledge">
                ← All articles
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
