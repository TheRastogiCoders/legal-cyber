import { EXPERIENCE } from '../data/content';
import { IMAGES } from '../data/images';
import { CtaBand, PageHero, Reveal } from '../components/ui';

export default function Experience() {
  return (
    <>
      <PageHero
        eyebrow="Experience"
        title="Representative matters"
        lead="Anonymised examples of the work we do. Past outcomes do not guarantee future results."
        image={IMAGES.experience}
      />
      <section className="section">
        <div className="container section-split-media" style={{ marginBottom: '2.5rem' }}>
          <figure className="media-frame">
            <img src={IMAGES.process} alt="Secure digital systems and counsel work" loading="lazy" />
          </figure>
          <div>
            <h2>Matter experience that matters</h2>
            <p>
              From multi-crore crypto fraud proceedings to parallel unfreeze programmes across 18+ cyber
              police stations — the practice is built for complex, multi-forum cyber and financial matters.
            </p>
          </div>
        </div>
        <div className="container">
          {EXPERIENCE.map((e) => (
            <Reveal key={e.title}>
              <div className="feature">
                <h3>{e.title}</h3>
                <p>{e.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
