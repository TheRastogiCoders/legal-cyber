import { Link } from 'react-router-dom';
import { AUDIENCES } from '../data/content';
import { IMAGES, PRACTICE_IMAGES } from '../data/images';
import { CtaBand, PageHero, Reveal } from '../components/ui';

const AUDIENCE_IMAGES = [
  PRACTICE_IMAGES['cyber-crime-online-fraud'],
  PRACTICE_IMAGES['bank-account-unfreeze'],
  PRACTICE_IMAGES['merchant-payment-gateway-holds'],
  PRACTICE_IMAGES['dpdp-compliance'],
  PRACTICE_IMAGES['fintech-banking'],
  PRACTICE_IMAGES.international,
];

export default function WhoWeServe() {
  return (
    <>
      <PageHero
        eyebrow="Clients"
        title="Who we serve"
        lead="Six client situations. One focused practice. Pick the path that matches where you stand today."
        image={IMAGES.contact}
      />
      <section className="section">
        <div className="container grid-3">
          {AUDIENCES.map((a, i) => (
            <Reveal key={a.title}>
              <div className="card-link" style={{ cursor: 'default' }}>
                <div className="card-link__media">
                  <img src={AUDIENCE_IMAGES[i]} alt="" loading="lazy" />
                </div>
                <div className="card-link__body">
                  <h3>{a.title}</h3>
                  <p>{a.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="container btn-row" style={{ marginTop: '2rem' }}>
          <Link className="btn btn--primary" to="/contact">
            Request a Consultation
          </Link>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
