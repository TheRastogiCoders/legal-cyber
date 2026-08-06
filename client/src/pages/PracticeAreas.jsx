import { Link } from 'react-router-dom';
import { PRACTICE_AREAS } from '../data/content';
import { IMAGES, PRACTICE_IMAGES } from '../data/images';
import { CtaBand, PageHero, Reveal } from '../components/ui';

export default function PracticeAreas() {
  return (
    <>
      <PageHero
        eyebrow="Practice"
        title="What we handle"
        lead="Thirteen focused practice areas — from same-day cyber fraud response to DPDP compliance and enforcement defence."
        image={IMAGES.process}
      />
      <section className="section">
        <div className="container grid-3">
          {PRACTICE_AREAS.map((p) => (
            <Reveal key={p.slug}>
              <Link className="card-link" to={`/practice-areas/${p.slug}`}>
                <div className="card-link__media">
                  <img src={PRACTICE_IMAGES[p.slug]} alt="" loading="lazy" />
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
