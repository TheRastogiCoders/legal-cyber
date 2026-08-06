import { Link } from 'react-router-dom';
import { SITE } from '../data/content';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src="/logo.png" alt="Lawsake" className="footer-logo" />
          <p>{SITE.tagline}</p>
          <p>
            {SITE.location}
            <br />
            Serving clients pan-India and internationally.
          </p>
        </div>
        <div>
          <h4>Practice</h4>
          <Link to="/practice-areas/cyber-crime-online-fraud">Cyber Crime & Fraud</Link>
          <Link to="/practice-areas/bank-account-unfreeze">Account Unfreeze</Link>
          <Link to="/practice-areas/ed-eow-pmla">ED / EOW / PMLA</Link>
          <Link to="/practice-areas/dpdp-compliance">DPDP Compliance</Link>
          <Link to="/practice-areas">View all practice areas</Link>
        </div>
        <div>
          <h4>Knowledge</h4>
          <Link to="/knowledge">Articles</Link>
          <Link to="/knowledge/faq">FAQs</Link>
          <Link to="/knowledge/resources">Resources</Link>
          <Link to="/knowledge/glossary">Glossary</Link>
          <Link to="/internships">Internships</Link>
        </div>
        <div>
          <h4>Legal</h4>
          <Link to="/disclaimer">Disclaimer</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-of-use">Terms of Use</Link>
          <Link to="/cookie-policy">Cookie Policy</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Legal-Cyber. All rights reserved.</span>
        <span>This website is for information only and is not an advertisement or solicitation.</span>
      </div>
    </footer>
  );
}
