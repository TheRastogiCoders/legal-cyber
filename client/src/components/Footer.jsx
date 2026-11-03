import { Link } from 'react-router-dom';
import { useContent } from '../cms/ContentContext';

export default function Footer() {
  const { content } = useContent();
  const site = content.site;
  const shared = content.shared || {};
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src={shared.logo || '/logo.png'} alt={site.name} className="footer-logo" />
          <p>{site.tagline}</p>
          <p>
            {site.location}
            <br />
            <a href={site.phoneHref}>{site.phone}</a>
            {site.phone2 ? (
              <>
                <br />
                <a href={site.phone2Href}>{site.phone2}</a>
              </>
            ) : null}
            <br />
            {shared.servingLine}
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
        <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
        <span>{shared.footerLegal}</span>
      </div>
      <div className="container footer-credit">
        Designed, developed and maintained by{' '}
        <a
          className="footer-credit__name"
          href="https://rastogicodeworks.com"
          target="_blank"
          rel="noreferrer"
        >
          Rastogi Codeworks
        </a>
      </div>
    </footer>
  );
}
