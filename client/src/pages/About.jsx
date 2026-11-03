import { Link } from 'react-router-dom';
import { CtaBand, CtaButtons, PageHero } from '../components/ui';
import { useContent } from '../cms/ContentContext';

export default function About() {
  const { content } = useContent();
  const about = content.about;

  return (
    <>
      <PageHero eyebrow={about.eyebrow} title={about.title} lead={about.lead} image={content.images.about} />
      <section className="section">
        <div className="container detail-layout">
          <div className="detail-main">
            <div className="detail-block">
              <h2>{about.founderTitle}</h2>
              <p>{about.founderP1}</p>
              <p>{about.founderP2}</p>
              <p>{about.founderP3}</p>
            </div>
            <CtaButtons />
          </div>

          <aside className="detail-sidebar">
            <figure className="media-frame media-frame--sidebar">
              <img src={content.images.experience} alt={about.sidebarImageAlt} loading="lazy" />
            </figure>
            <div className="contact-aside">
              <h3>{about.credentialsTitle}</h3>
              <ul className="cred-list">
                {(about.credentials || []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">{about.forumsEyebrow}</div>
            <h2>{about.forumsTitle}</h2>
            <p className="lead">{about.forumsLead}</p>
          </div>

          <div className="section-head">
            <div className="eyebrow">{about.approachEyebrow}</div>
            <h2>{about.approachTitle}</h2>
          </div>
          <div className="principle-grid">
            {(about.principles || []).map((item) => (
              <article className="principle" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <div className="btn-row">
            <Link className="btn btn--outline" to="/experience">
              {about.experienceCta}
            </Link>
            <Link className="btn btn--outline" to="/who-we-serve">
              {about.whoWeServeCta}
            </Link>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
