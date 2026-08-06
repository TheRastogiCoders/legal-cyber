import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { WHATSAPP_URL } from '../data/content';
import { IMAGES } from '../data/images';

export function Reveal({ children, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    // Never leave content permanently hidden if the observer misses
    const fallback = window.setTimeout(() => setVisible(true), 900);

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return () => window.clearTimeout(fallback);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
          window.clearTimeout(fallback);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div ref={ref} className={`reveal ${visible ? 'visible' : ''} ${className}`.trim()}>
      {children}
    </div>
  );
}

export function CtaButtons({ light = false, urgent = false }) {
  return (
    <div className="btn-row">
      <Link className={`btn ${light ? 'btn--light' : 'btn--primary'}`} to="/contact">
        <span className="btn-label--full">Request a Consultation</span>
        <span className="btn-label--short">Consult</span>
      </Link>
      {urgent ? (
        <Link className="btn btn--urgent" to="/practice-areas/bank-account-unfreeze">
          <span className="btn-label--full">Account Frozen? Act Now</span>
          <span className="btn-label--short">Account Frozen?</span>
        </Link>
      ) : (
        <a className={`btn ${light ? 'btn--ghost' : 'btn--outline'}`} href={WHATSAPP_URL} target="_blank" rel="noreferrer">
          <span className="btn-label--full">WhatsApp Now</span>
          <span className="btn-label--short">WhatsApp</span>
        </a>
      )}
    </div>
  );
}

export function CtaBand({
  title = 'Ready for a clear next step?',
  text = 'Fraud recovery, frozen accounts, or DPDP readiness — start with a structured consultation and a written plan.',
  image = IMAGES.cta,
}) {
  return (
    <section className="cta-band">
      {image ? (
        <>
          <img className="cta-band__media" src={image} alt="" aria-hidden="true" loading="lazy" />
          <div className="cta-band__shade" aria-hidden="true" />
        </>
      ) : null}
      <div className="container">
        <h2>{title}</h2>
        <p>{text}</p>
        <CtaButtons light />
      </div>
    </section>
  );
}

export function PageHero({ title, lead, eyebrow, image }) {
  return (
    <header className="page-hero">
      {image ? (
        <>
          <img className="page-hero__media" src={image} alt="" aria-hidden="true" />
          <div className="page-hero__shade" aria-hidden="true" />
        </>
      ) : null}
      <div className="container page-hero__content">
        {eyebrow ? <div className="eyebrow page-hero__eyebrow">{eyebrow}</div> : null}
        <h1>{title}</h1>
        {lead ? <p className="lead">{lead}</p> : null}
      </div>
    </header>
  );
}

export function FaqList({ items }) {
  if (!items?.length) return null;
  return (
    <div className="faq">
      {items.map((item) => (
        <details key={item.q}>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}
