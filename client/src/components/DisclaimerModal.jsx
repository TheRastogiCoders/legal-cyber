import { useEffect, useState } from 'react';
import { useContent } from '../cms/ContentContext';

const KEY = 'lc-disclaimer-accepted';

export default function DisclaimerModal() {
  const { content } = useContent();
  const copy = content.disclaimerModal || {};
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const accepted = localStorage.getItem(KEY);
      if (!accepted) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  const agree = () => {
    try {
      localStorage.setItem(KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
    setOpen(false);
  };

  const disagree = () => {
    window.location.href = 'https://www.google.com';
  };

  if (!open) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="disclaimer-title">
      <div className="modal">
        <h2 id="disclaimer-title">{copy.title}</h2>
        <p>{copy.intro}</p>
        <ul>
          {(copy.items || []).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="btn-row">
          <button type="button" className="btn btn--primary" onClick={agree}>
            {copy.agree}
          </button>
          <button type="button" className="btn btn--outline" onClick={disagree}>
            {copy.disagree}
          </button>
        </div>
      </div>
    </div>
  );
}
