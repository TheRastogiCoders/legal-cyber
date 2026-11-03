import { Link, useParams } from 'react-router-dom';
import { CtaButtons, PageHero } from '../components/ui';
import { useContent } from '../cms/ContentContext';

export default function Article() {
  const { content } = useContent();
  const { slug } = useParams();
  const labels = content.articlePage;
  const article = content.articles.find((a) => a.slug === slug);
  const image = content.articleImages[slug];

  if (!article) {
    return (
      <section className="section">
        <div className="container">
          <h1>{labels.notFoundTitle}</h1>
          <Link className="btn btn--primary" to="/knowledge">
            {labels.notFoundCta}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHero title={article.title} lead={article.excerpt} eyebrow={`${article.readTime} read`} image={image} />
      <section className="section">
        <div className="container article-layout">
          <article className="article-body prose">
            {(article.body || []).map((block) => (
              <div key={block.h}>
                <h2>{block.h}</h2>
                <p>{block.p}</p>
              </div>
            ))}
            <p className="article-disclaimer">{labels.disclaimer}</p>
            <CtaButtons />
            <div className="btn-row">
              <Link className="btn btn--outline" to="/knowledge">
                {labels.allArticlesCta}
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
