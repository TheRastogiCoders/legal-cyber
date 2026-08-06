import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const KEY = 'lc-cookie-choice';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  useEffect(() => {
    document.body.classList.toggle('has-cookie-banner', show);
    return () => document.body.classList.remove('has-cookie-banner');
  }, [show]);

  const choose = (value) => {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* ignore */
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie notice">
      <div className="cookie-banner__inner">
        <p>
          We use essential cookies to run this site, and optional analytics only with your consent.{' '}
          <Link to="/cookie-policy">Cookie Policy</Link>
        </p>
        <div className="cookie-banner__actions">
          <button type="button" className="btn btn--light" onClick={() => choose('all')}>
            Accept
          </button>
          <button type="button" className="btn btn--ghost" onClick={() => choose('essential')}>
            Essential only
          </button>
        </div>
      </div>
    </div>
  );
}
