import { PageHero } from '../components/ui';
import { useContent } from '../cms/ContentContext';
import { siteWhatsApp } from '../cms/utils';

export default function Contact() {
  const { content } = useContent();
  const page = content.contact;
  const site = content.site;
  const wa = siteWhatsApp(content);

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} lead={page.lead} image={content.images.contact} />
      <section className="section">
        <div className="container contact-simple">
          <div className="contact-simple__card">
            <h2>{page.cardTitle}</h2>
            <dl className="contact-list">
              <div className="contact-row">
                <dt>{page.phoneLabel}</dt>
                <dd>
                  <span className="contact-phones">
                    <a href={site.phoneHref}>{site.phone}</a>
                    {site.phone2 ? <a href={site.phone2Href}>{site.phone2}</a> : null}
                  </span>
                  <span className="contact-note">
                    {page.whatsappNote}{' '}
                    <a href={wa} target="_blank" rel="noreferrer">
                      WhatsApp
                    </a>
                  </span>
                </dd>
              </div>
              <div className="contact-row">
                <dt>{page.emailLabel}</dt>
                <dd>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </dd>
              </div>
            </dl>
            <div className="btn-row contact-simple__actions">
              <a className="btn btn--primary" href={wa} target="_blank" rel="noreferrer">
                {page.whatsappCta}
              </a>
              <a className="btn btn--outline" href={`mailto:${site.email}`}>
                {page.emailCta}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
