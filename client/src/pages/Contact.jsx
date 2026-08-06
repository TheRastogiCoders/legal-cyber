import { PageHero } from '../components/ui';
import { SITE, WHATSAPP_URL } from '../data/content';
import { IMAGES } from '../data/images';

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        lead="Reach us directly by phone, WhatsApp, or email. We respond during business hours, and urgent matters are triaged outside hours."
        image={IMAGES.contact}
      />
      <section className="section">
        <div className="container contact-simple">
          <div className="contact-simple__card">
            <h2>Direct contact</h2>
            <dl className="contact-list">
              <div className="contact-row">
                <dt>Phone / WhatsApp</dt>
                <dd>
                  <a href={SITE.phoneHref}>{SITE.phone}</a>
                  <span className="contact-note">
                    Or message on{' '}
                    <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                      WhatsApp
                    </a>
                  </span>
                </dd>
              </div>
              <div className="contact-row">
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </dd>
              </div>
            </dl>
            <div className="btn-row contact-simple__actions">
              <a className="btn btn--primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                WhatsApp Now
              </a>
              <a className="btn btn--outline" href={`mailto:${SITE.email}`}>
                Send Email
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
