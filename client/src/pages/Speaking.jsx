import { Link } from 'react-router-dom';
import { CtaBand, PageHero } from '../components/ui';
import { useContent } from '../cms/ContentContext';
import { siteWhatsApp } from '../cms/utils';

export default function Speaking() {
  const { content } = useContent();
  const page = content.speaking;
  const site = content.site;

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} lead={page.lead} image={content.images.speaking} />
      <section className="section">
        <div className="container detail-layout">
          <div className="detail-main">
            <div className="detail-block">
              <h2>{page.engagementsTitle}</h2>
              <ul className="list-check">
                {(page.engagements || []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="detail-block">
              <h2>{page.trainingTitle}</h2>
              <ul className="list-check">
                {(page.training || []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="detail-sidebar">
            <figure className="media-frame media-frame--sidebar">
              <img src={content.images.speaking} alt={page.imageAlt} loading="lazy" />
            </figure>
            <div className="contact-aside">
              <h3>{page.inviteTitle}</h3>
              <p>{page.inviteText}</p>
              <p>
                Email: <a href={`mailto:${site.email}`}>{site.email}</a>
                <br />
                Phone:{' '}
                <a href={site.phoneHref}>{site.phone}</a>
                {site.phone2 ? (
                  <>
                    {' · '}
                    <a href={site.phone2Href}>{site.phone2}</a>
                  </>
                ) : null}
                <br />
                WhatsApp:{' '}
                <a href={siteWhatsApp(content)} target="_blank" rel="noreferrer">
                  {site.phone}
                </a>
              </p>
              <Link className="btn btn--light" to="/contact">
                {page.inviteCta}
              </Link>
            </div>
          </aside>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
