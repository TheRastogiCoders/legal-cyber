import { PageHero } from '../components/ui';

export function Disclaimer() {
  return (
    <>
      <PageHero title="Disclaimer" eyebrow="Legal" />
      <section className="section">
        <div className="container prose">
          <h2>No advertisement or solicitation</h2>
          <p>
            The Bar Council of India does not permit advocates to advertise or solicit work. This website
            exists solely to provide general information about Lawsake to visitors who seek it of their
            own accord.
          </p>
          <h2>No legal advice</h2>
          <p>
            Content on this website is general information. It is not legal advice and may not reflect the
            most current legal position. Do not act on the basis of this website without professional advice
            on your specific facts.
          </p>
          <h2>No lawyer-client relationship</h2>
          <p>
            Accessing this website or submitting an enquiry does not create a lawyer-client relationship.
            Such a relationship is created only by an express, mutual engagement confirmed in writing.
          </p>
          <h2>No guarantee of outcomes</h2>
          <p>
            Descriptions of experience are illustrative, anonymised, and generalised. Past results do not
            guarantee outcomes in any other matter.
          </p>
          <h2>Jurisdiction</h2>
          <p>
            This website and its terms are governed by the laws of India. Courts at New Delhi have exclusive
            jurisdiction.
          </p>
        </div>
      </section>
    </>
  );
}

export function PrivacyPolicy() {
  return (
    <>
      <PageHero title="Privacy Policy" eyebrow="Legal" lead="Last updated: August 2026" />
      <section className="section">
        <div className="container prose">
          <p>
            Lawsake operates lawsake.com and is the data fiduciary for personal data collected
            through the Website under the DPDP Act, 2023.
          </p>
          <h2>Personal data we collect</h2>
          <p>
            Data you provide through the contact form or email (name, phone, email, city/state, enquiry
            description), and technical data such as IP address, device/browser information, and usage data
            through cookies/analytics as described in the Cookie Policy. Do not submit passwords, OTPs, or
            financial credentials through the Website.
          </p>
          <h2>Purposes</h2>
          <p>
            We process personal data to respond to enquiries, schedule consultations, maintain professional
            records, improve the Website, and comply with legal obligations — based on your consent when you
            submit the form.
          </p>
          <h2>Sharing & retention</h2>
          <p>
            We do not sell personal data. Data may be shared with hosting/communication providers under
            confidentiality obligations, or where required by law. Enquiry data is retained as needed to deal
            with your enquiry and for professional record-keeping, then deleted or anonymised.
          </p>
          <h2>Your rights & grievance</h2>
          <p>
            Subject to the DPDP Act, you may request access, correction, or erasure, and raise grievances at
            contact@lawsake.com / +91 93951 59957 — New Delhi, India.
          </p>
        </div>
      </section>
    </>
  );
}

export function TermsOfUse() {
  return (
    <>
      <PageHero title="Terms of Use" eyebrow="Legal" />
      <section className="section">
        <div className="container prose">
          <p>
            By accessing lawsake.com you agree to these Terms, the Disclaimer, Privacy Policy, and Cookie
            Policy. The Website provides general information only and does not create a lawyer-client
            relationship.
          </p>
          <h2>Intellectual property</h2>
          <p>
            All content is owned by or licensed to Lawsake. You may view and print for personal,
            non-commercial use with attribution. Republication or scraping without written permission is
            prohibited.
          </p>
          <h2>Limitation of liability</h2>
          <p>
            The Website is provided “as is”. To the maximum extent permitted by law, Lawsake shall not be
            liable for loss arising from use of or reliance on the Website. These terms are governed by
            Indian law; courts at New Delhi have exclusive jurisdiction.
          </p>
        </div>
      </section>
    </>
  );
}

export function CookiePolicy() {
  return (
    <>
      <PageHero title="Cookie Policy" eyebrow="Legal" />
      <section className="section">
        <div className="container prose">
          <p>
            This Website uses essential cookies (including recording Disclaimer acceptance) and, with your
            consent, analytics cookies that collect aggregated usage statistics. Analytics cookies are set
            only after you accept them. Blocking essential cookies may affect functionality. See the Privacy
            Policy for how personal data is handled generally.
          </p>
        </div>
      </section>
    </>
  );
}
