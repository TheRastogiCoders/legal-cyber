import { PageHero } from '../components/ui';
import { SITE } from '../data/content';
import { IMAGES } from '../data/images';

const INTERN_WORK = [
  'Research on IT Act, BNS/BNSS, DPDP, and PMLA questions from live matters (anonymised)',
  'Drafting support: complaints, representations, applications, and articles',
  'Pan-India cyber police-station and jurisdiction mapping',
  'Knowledge Centre contributions under supervision',
];

export default function Internships() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Internships at Lawsake"
        lead="A structured internship programme training law students in live cyber-law research and drafting — not photocopy duty."
        image={IMAGES.about}
      />
      <section className="section">
        <div className="container detail-layout">
          <div className="detail-main">
            <div className="detail-block">
              <h2>What interns work on</h2>
              <ul className="list-check">
                {INTERN_WORK.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="detail-block">
              <h2>What we look for</h2>
              <p>
                Law students (3-year or 5-year) or fresh graduates; strong written English; genuine interest
                in technology law; reliability with deadlines. Remote-first, with in-person opportunities in
                Delhi NCR.
              </p>
            </div>

            <div className="detail-block">
              <h2>How to apply</h2>
              <p>
                Email a CV and a one-page note on a cyber-law issue that interests you to{' '}
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>, subject line:{' '}
                <em>Internship Application — [Name] — [Month]</em>.
              </p>
            </div>
          </div>

          <aside className="detail-sidebar">
            <figure className="media-frame media-frame--sidebar">
              <img src={IMAGES.experience} alt="Internship research and drafting environment" loading="lazy" />
            </figure>
            <div className="contact-aside">
              <h3>Apply by email</h3>
              <p>
                Send your CV and a short note to{' '}
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
