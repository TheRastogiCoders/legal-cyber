import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../cms/ContentContext';

const KEY = 'lc-cookie-choice';

export default function CookieBanner() {
  const { content } = useContent();
  const copy = content.cookieBanner || {};
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
          {copy.text}{' '}
          <Link to="/cookie-policy">{copy.policyLink}</Link>
        </p>
        <div className="cookie-banner__actions">
          <button type="button" className="btn btn--light" onClick={() => choose('all')}>
            {copy.accept}
          </button>
          <button type="button" className="btn btn--ghost" onClick={() => choose('essential')}>
            {copy.essential}
          </button>
        </div>
      </div>
    </div>
  );
}
