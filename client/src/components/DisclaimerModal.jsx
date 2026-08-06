import { useEffect, useState } from 'react';

const KEY = 'lc-disclaimer-accepted';

export default function DisclaimerModal() {
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
        <h2 id="disclaimer-title">Disclaimer & User Acknowledgement</h2>
        <p>
          As per the rules of the Bar Council of India, advocates are not permitted to solicit work or
          advertise. By clicking “I Agree”, you acknowledge and confirm that:
        </p>
        <ul>
          <li>
            You wish to gain more information about Lawsake and its advocates for your own information
            and personal/professional use, and are accessing this website of your own accord; there has been
            no advertisement, solicitation, invitation, or inducement of any kind.
          </li>
          <li>
            The information on this website is intended for general information only and does not constitute
            legal advice or a legal opinion.
          </li>
          <li>
            No lawyer-client relationship is created by accessing or using this website, or by transmitting
            any enquiry through it.
          </li>
          <li>Where you require legal assistance, you must seek independent legal advice.</li>
        </ul>
        <div className="btn-row">
          <button type="button" className="btn btn--primary" onClick={agree}>
            I Agree
          </button>
          <button type="button" className="btn btn--outline" onClick={disagree}>
            Disagree
          </button>
        </div>
      </div>
    </div>
  );
}
