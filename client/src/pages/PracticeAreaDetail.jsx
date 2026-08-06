import { Link, useParams } from 'react-router-dom';
import { PRACTICE_AREAS } from '../data/content';
import { PRACTICE_IMAGES } from '../data/images';
import { CtaBand, CtaButtons, FaqList, PageHero } from '../components/ui';

export default function PracticeAreaDetail() {
  const { slug } = useParams();
  const area = PRACTICE_AREAS.find((p) => p.slug === slug);
  const image = PRACTICE_IMAGES[slug];

  if (!area) {
    return (
      <section className="section">
        <div className="container">
          <h1>Practice area not found</h1>
          <Link className="btn btn--primary" to="/practice-areas">
            Back to Practice Areas
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
              <h2>Who this is for</h2>
              <ul className="list-check">
                {area.forWhom.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="detail-block">
              <h2>What we do</h2>
              <ul className="list-check">
                {area.whatWeDo.map((item) => (
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
                <h2>Questions we hear often</h2>
                <FaqList items={area.faqs} />
              </div>
            ) : (
              <div className="contact-aside">
                <h3>Need this handled urgently?</h3>
                <p>
                  Share the facts through the contact form or WhatsApp. Freeze and fraud matters are
                  triaged for rapid first response.
                </p>
                <div className="btn-row">
                  <Link className="btn btn--light" to="/contact">
                    Request a Consultation
                  </Link>
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
      <CtaBand
        title={area.urgent ? 'Account frozen? Time matters.' : 'Facing a similar issue?'}
        text="Get a structured written assessment — forum, remedy, sequence, and realistic expectations."
      />
    </>
  );
}
