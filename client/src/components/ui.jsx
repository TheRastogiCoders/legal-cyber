import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../cms/ContentContext';
import { siteWhatsApp } from '../cms/utils';

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

export function CtaButtons({ light = false, urgent = false, primaryOnly = false }) {
  const { content } = useContent();
  const shared = content.shared || {};
  return (
    <div className="btn-row">
      <Link className={`btn ${light ? 'btn--light' : 'btn--primary'}`} to="/contact">
        <span className="btn-label--full">{shared.consultCta}</span>
        <span className="btn-label--short">{shared.consultCtaShort}</span>
      </Link>
      {!primaryOnly &&
        (urgent ? (
          <Link className="btn btn--urgent" to="/practice-areas/bank-account-unfreeze">
            <span className="btn-label--full">{shared.frozenCta}</span>
            <span className="btn-label--short">{shared.frozenCtaShort}</span>
          </Link>
        ) : (
          <a className={`btn ${light ? 'btn--ghost' : 'btn--outline'}`} href={siteWhatsApp(content)} target="_blank" rel="noreferrer">
            <span className="btn-label--full">{shared.whatsappCta}</span>
            <span className="btn-label--short">{shared.whatsappCtaShort}</span>
          </a>
        ))}
    </div>
  );
}

export function CtaBand({ title, text, image }) {
  const { content } = useContent();
  const resolvedTitle = title ?? content.shared?.ctaTitle;
  const resolvedText = text ?? content.shared?.ctaText;
  const resolvedImage = image ?? content.images?.cta;
  return (
    <section className="cta-band">
      {resolvedImage ? (
        <>
          <img className="cta-band__media" src={resolvedImage} alt="" aria-hidden="true" loading="lazy" />
          <div className="cta-band__shade" aria-hidden="true" />
        </>
      ) : null}
      <div className="container">
        <h2>{resolvedTitle}</h2>
        <p>{resolvedText}</p>
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
