import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/ui';
import { SITE, WHATSAPP_URL } from '../data/content';
import { IMAGES } from '../data/images';

const initial = {
  name: '',
  phone: '',
  email: '',
  city: '',
  clientType: 'Individual',
  matterType: '',
  urgency: 'Exploratory',
  description: '',
  consent: false,
  website: '',
};

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus({ type: 'err', message: data.message || 'Something went wrong.' });
      } else {
        setStatus({ type: 'ok', message: data.message });
        setForm(initial);
      }
    } catch {
      setStatus({
        type: 'err',
        message: 'Unable to reach the server. Please WhatsApp us directly.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Request a consultation"
        lead="Tell us the essentials. You will get next steps — usually a slot and a document list. Account frozen? Mark Urgent or WhatsApp now."
        image={IMAGES.contact}
      />
      <section className="section">
        <div className="container detail-layout">
          <form className="form" onSubmit={onSubmit} noValidate>
            <div className="honeypot" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" value={form.website} onChange={onChange} tabIndex={-1} autoComplete="off" />
            </div>
            <div className="form-row">
              <div className="field">
                <label htmlFor="name">Full name *</label>
                <input id="name" name="name" value={form.name} onChange={onChange} required />
              </div>
              <div className="field">
                <label htmlFor="phone">Phone (with country code) *</label>
                <input id="phone" name="phone" value={form.phone} onChange={onChange} required />
              </div>
            </div>
            <div className="form-row">
              <div className="field">
                <label htmlFor="email">Email *</label>
                <input id="email" name="email" type="email" value={form.email} onChange={onChange} required />
              </div>
              <div className="field">
                <label htmlFor="city">City & State *</label>
                <input id="city" name="city" value={form.city} onChange={onChange} required />
              </div>
            </div>
            <div className="form-row">
              <div className="field">
                <label htmlFor="clientType">I am a</label>
                <select id="clientType" name="clientType" value={form.clientType} onChange={onChange}>
                  <option>Individual</option>
                  <option>Business</option>
                  <option>Law firm or counsel</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="matterType">Matter type *</label>
                <select id="matterType" name="matterType" value={form.matterType} onChange={onChange} required>
                  <option value="">Select…</option>
                  <option>Account frozen or lien</option>
                  <option>Cyber fraud victim</option>
                  <option>Received summons or police notice</option>
                  <option>ED/EOW/PMLA</option>
                  <option>DPDP or data-protection compliance</option>
                  <option>Contracts or policies</option>
                  <option>Trademark/IP</option>
                  <option>POSH</option>
                  <option>Speaking or training</option>
                  <option>Internship</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label htmlFor="urgency">Urgency</label>
              <select id="urgency" name="urgency" value={form.urgency} onChange={onChange}>
                <option>Urgent — account/business impacted</option>
                <option>This week</option>
                <option>Exploratory</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="description">Brief description *</label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={onChange}
                required
                placeholder="Facts and dates only; please do not share passwords, OTPs, or card numbers."
              />
            </div>
            <label className="checkbox">
              <input type="checkbox" name="consent" checked={form.consent} onChange={onChange} required />
              <span>
                I have read the <Link to="/disclaimer">Disclaimer</Link> and{' '}
                <Link to="/privacy-policy">Privacy Policy</Link>. Submitting this form does not create a
                lawyer-client relationship.
              </span>
            </label>
            {status ? <div className={`form-status ${status.type}`}>{status.message}</div> : null}
            <button className="btn btn--primary" type="submit" disabled={loading}>
              {loading ? 'Sending…' : 'Submit Enquiry'}
            </button>
          </form>

          <aside className="contact-aside contact-aside--panel">
            <h3>Direct contact</h3>
            <dl className="contact-list">
              <div className="contact-row">
                <dt>Phone / WhatsApp</dt>
                <dd>
                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                    {SITE.phone}
                  </a>
                </dd>
              </div>
              <div className="contact-row">
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </dd>
              </div>
              <div className="contact-row">
                <dt>Location</dt>
                <dd>{SITE.location}</dd>
              </div>
              <div className="contact-row">
                <dt>Hours</dt>
                <dd>
                  {SITE.hours}
                  <span className="contact-note">Urgent matters triaged outside hours.</span>
                </dd>
              </div>
            </dl>
            <a className="btn btn--light contact-aside__cta" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              WhatsApp with URGENT
            </a>
          </aside>
        </div>
      </section>
    </>
  );
}
