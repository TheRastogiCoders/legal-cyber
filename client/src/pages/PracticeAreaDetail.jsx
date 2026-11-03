import { Link, useParams } from 'react-router-dom';
import { CtaBand, CtaButtons, FaqList, PageHero } from '../components/ui';
import { useContent } from '../cms/ContentContext';

export default function PracticeAreaDetail() {
  const { content } = useContent();
  const { slug } = useParams();
  const labels = content.practiceDetail;
  const area = content.practiceAreas.find((p) => p.slug === slug);
  const image = content.practiceImages[slug];

  if (!area) {
    return (
      <section className="section">
        <div className="container">
          <h1>{labels.notFoundTitle}</h1>
          <Link className="btn btn--primary" to="/practice-areas">
            {labels.notFoundCta}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHero
        eyebrow={area.urgent ? 'High urgency' : 'Practice Area'}
        title={area.title}
        lead={area.short}
        image={image}
      />
      <section className="section">
        <div className="container detail-layout">
          <div className="detail-main">
            <p className="lead lead--body">{area.intro}</p>

            <div className="detail-block">
              <h2>{labels.forWhomTitle}</h2>
              <ul className="list-check">
                {(area.forWhom || []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="detail-block">
              <h2>{labels.whatWeDoTitle}</h2>
              <ul className="list-check">
                {(area.whatWeDo || []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <CtaButtons urgent={Boolean(area.urgent)} />
          </div>

          <aside className="detail-sidebar">
            <figure className="media-frame media-frame--sidebar">
              <img src={image} alt="" loading="lazy" />
            </figure>

            {area.faqs?.length ? (
              <div className="detail-panel">
                <h2>{labels.faqsTitle}</h2>
                <FaqList items={area.faqs} />
              </div>
            ) : (
              <div className="contact-aside">
                <h3>{labels.urgentAsideTitle}</h3>
                <p>{labels.urgentAsideText}</p>
                <div className="btn-row">
                  <Link className="btn btn--light" to="/contact">
                    {labels.consultCta}
                  </Link>
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
      <CtaBand
        title={area.urgent ? labels.ctaUrgentTitle : labels.ctaDefaultTitle}
        text={labels.ctaText}
      />
    </>
  );
}
