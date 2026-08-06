import { Link } from 'react-router-dom';
import { CtaBand, CtaButtons, PageHero } from '../components/ui';
import { IMAGES } from '../data/images';

const CREDENTIALS = [
  'BBA LL.B. (Hons.), First Division — Dibrugarh University (2021)',
  'Advocate, Bar Council of Delhi',
  'Certified Internal Auditor, ISO/IEC 27001:2022',
  'Panel Advocate — leading private-sector scheduled commercial bank',
  'Founder, Cyber Legal Group',
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="An independent practice built for digital-age disputes"
        lead="New Delhi–based, pan-India counsel for cyber crime, financial fraud, data protection, and enforcement-agency matters — founded in 2022."
        image={IMAGES.about}
      />
      <section className="section">
        <div className="container detail-layout">
          <div className="detail-main">
            <div className="detail-block">
              <h2>The Founding Advocate</h2>
              <p>
                Lawsake is led by its founding advocate — a lawyer practising since 2021, focused on
                cyber crime, financial fraud, data protection, and enforcement-agency litigation. She
                founded the practice in June 2022 to build a dedicated technology-law practice as cyber
                fraud in India began its steepest climb.
              </p>
              <p>
                Her work spans first response on the National Cybercrime Reporting Portal, coordination
                with cyber police stations across states, bank and payment-gateway escalations, magistrate
                and High Court proceedings for frozen accounts, bail and quashing, and representation
                before the ED, CBI, and EOW.
              </p>
              <p>
                On the advisory side, she counsels startups, FinTech entities, and digital platforms on the
                DPDP Act, 2023 and Rules, 2025, the IT Act, CERT-In directions, and ISO/IEC 27001 and
                42001. She has represented clients in matters arising out of the ₹2,200 crore HPZ Token
                case and in cross-border matters spanning eight jurisdictions.
              </p>
            </div>
            <CtaButtons />
          </div>

          <aside className="detail-sidebar">
            <figure className="media-frame media-frame--sidebar">
              <img src={IMAGES.experience} alt="Professional counsel workspace" loading="lazy" />
            </figure>
            <div className="contact-aside">
              <h3>Education &amp; Credentials</h3>
              <ul className="cred-list">
                {CREDENTIALS.map((item) => (
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
            <div className="eyebrow">Forums</div>
            <h2>Where we appear</h2>
            <p className="lead">
              High Courts — Delhi, Punjab &amp; Haryana, Gauhati · District &amp; Sessions Courts · Magistrate
              courts · Cyber police stations (multi-state) · ED · CBI · EOW/CEN · Consumer forums ·
              Regulatory authorities.
            </p>
          </div>

          <div className="section-head">
            <div className="eyebrow">Approach</div>
            <h2>How this practice thinks</h2>
          </div>
          <div className="principle-grid">
            <article className="principle">
              <h3>Process before promises</h3>
              <p>Every matter starts with a written assessment — forum, remedy, sequence, timeline, risk.</p>
            </article>
            <article className="principle">
              <h3>The investigation stage matters most</h3>
              <p>
                Cyber matters are often decided at the police-station and bank-escalation stage, months
                before a courtroom is involved.
              </p>
            </article>
            <article className="principle">
              <h3>Documentation wins cases</h3>
              <p>Meticulous paper trails convert dead-end matters into releasable ones.</p>
            </article>
            <article className="principle">
              <h3>Confidentiality is absolute</h3>
              <p>No client names appear on this website. Matters are described only in anonymised terms.</p>
            </article>
          </div>
          <div className="btn-row">
            <Link className="btn btn--outline" to="/experience">
              Representative Experience
            </Link>
            <Link className="btn btn--outline" to="/who-we-serve">
              Who We Serve
            </Link>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
