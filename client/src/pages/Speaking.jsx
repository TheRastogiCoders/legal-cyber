import { Link } from 'react-router-dom';
import { CtaBand, PageHero } from '../components/ui';
import { SITE, WHATSAPP_URL } from '../data/content';
import { IMAGES } from '../data/images';

const ENGAGEMENTS = [
  'Speaker, Legal 40 National Cohort — Cyber Law',
  'Invited cyber-law speaker for Bioshala and Logicalayam',
  'Cyber-law and DPDP training for professional and student audiences',
];

const TRAINING = [
  'Cyber Fraud Response for Teams',
  'DPDP Act for Product & Support Teams',
  'Contracts & Compliance for Founders',
  'POSH & Internal Committee Training',
];

export default function Speaking() {
  return (
    <>
      <PageHero
        eyebrow="Speaking & Training"
        title="Awareness is prevention"
        lead="Talks and training on cyber crime, digital fraud, and data protection — for teams, institutions, and professional cohorts."
        image={IMAGES.speaking}
      />
      <section className="section">
        <div className="container detail-layout">
          <div className="detail-main">
            <div className="detail-block">
              <h2>Selected engagements</h2>
              <ul className="list-check">
                {ENGAGEMENTS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="detail-block">
              <h2>Training offered</h2>
              <ul className="list-check">
                {TRAINING.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="detail-sidebar">
            <figure className="media-frame media-frame--sidebar">
              <img src={IMAGES.speaking} alt="Speaking and training engagement" loading="lazy" />
            </figure>
            <div className="contact-aside">
              <h3>Invite as a speaker</h3>
              <p>
                Use the contact form with the subject “Speaking Invitation”, including event, audience,
                format, and date.
              </p>
              <p>
                Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                <br />
                WhatsApp:{' '}
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                  {SITE.phone}
                </a>
              </p>
              <Link className="btn btn--light" to="/contact">
                Contact for Speaking
              </Link>
            </div>
          </aside>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
