import { PageHero } from '../components/ui';
import { useContent } from '../cms/ContentContext';

function WithEmail({ text, email }) {
  const parts = String(text || '').split('{email}');
  if (parts.length === 1) return text;
  return parts.map((part, i) => (
    <span key={i}>
      {part}
      {i < parts.length - 1 ? <a href={`mailto:${email}`}>{email}</a> : null}
    </span>
  ));
}

export default function Internships() {
  const { content } = useContent();
  const page = content.internships;
  const email = content.site.email;

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} lead={page.lead} image={content.images.about} />
      <section className="section">
        <div className="container detail-layout">
          <div className="detail-main">
            <div className="detail-block">
              <h2>{page.workTitle}</h2>
              <ul className="list-check">
                {(page.work || []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="detail-block">
              <h2>{page.lookTitle}</h2>
              <p>{page.lookText}</p>
            </div>

            <div className="detail-block">
              <h2>{page.applyTitle}</h2>
              <p>
                <WithEmail text={page.applyText} email={email} />
              </p>
            </div>
          </div>

          <aside className="detail-sidebar">
            <figure className="media-frame media-frame--sidebar">
              <img src={content.images.experience} alt={page.imageAlt} loading="lazy" />
            </figure>
            <div className="contact-aside">
              <h3>{page.sidebarTitle}</h3>
              <p>
                <WithEmail text={page.sidebarText} email={email} />
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
