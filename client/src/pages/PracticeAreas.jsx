import { Link } from 'react-router-dom';
import { CtaBand, PageHero, Reveal } from '../components/ui';
import { useContent } from '../cms/ContentContext';

export default function PracticeAreas() {
  const { content } = useContent();
  const page = content.practiceIndex;

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} lead={page.lead} image={content.images.process} />
      <section className="section">
        <div className="container grid-3">
          {content.practiceAreas.map((p) => (
            <Reveal key={p.slug}>
              <Link className="card-link" to={`/practice-areas/${p.slug}`}>
                <div className="card-link__media">
                  <img src={content.practiceImages[p.slug]} alt="" loading="lazy" />
                </div>
                <div className="card-link__body">
                  <div className="card-link__eyebrow">{p.urgent ? 'High urgency' : ''}</div>
                  <h3>{p.title}</h3>
                  <p>{p.short}</p>
                  <span className="more">Open practice page →</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
