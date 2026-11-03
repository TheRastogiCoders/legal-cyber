import { CtaBand, PageHero, Reveal } from '../components/ui';
import { useContent } from '../cms/ContentContext';

export default function Experience() {
  const { content } = useContent();
  const page = content.experiencePage;

  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        lead={page.lead}
        image={content.images.experience}
      />
      <section className="section">
        <div className="container section-split-media" style={{ marginBottom: '2.5rem' }}>
          <figure className="media-frame">
            <img src={content.images.process} alt={page.introImageAlt} loading="lazy" />
          </figure>
          <div>
            <h2>{page.introTitle}</h2>
            <p>{page.introText}</p>
          </div>
        </div>
        <div className="container">
          {content.experienceItems.map((e) => (
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
