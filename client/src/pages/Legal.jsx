import { PageHero } from '../components/ui';
import { useContent } from '../cms/ContentContext';

function Sections({ items }) {
  return (items || []).map((item) => (
    <div key={item.heading}>
      <h2>{item.heading}</h2>
      <p>{item.body}</p>
    </div>
  ));
}

export function Disclaimer() {
  const { content } = useContent();
  const legal = content.legal;
  return (
    <>
      <PageHero title={legal.disclaimerTitle} eyebrow="Legal" />
      <section className="section">
        <div className="container prose">
          <Sections items={legal.disclaimerSections} />
        </div>
      </section>
    </>
  );
}

export function PrivacyPolicy() {
  const { content } = useContent();
  const legal = content.legal;
  return (
    <>
      <PageHero title={legal.privacyTitle} eyebrow="Legal" lead={legal.privacyLead} />
      <section className="section">
        <div className="container prose">
          <p>{legal.privacyIntro}</p>
          <Sections items={legal.privacySections} />
        </div>
      </section>
    </>
  );
}

export function TermsOfUse() {
  const { content } = useContent();
  const legal = content.legal;
  return (
    <>
      <PageHero title={legal.termsTitle} eyebrow="Legal" />
      <section className="section">
        <div className="container prose">
          <p>{legal.termsIntro}</p>
          <Sections items={legal.termsSections} />
        </div>
      </section>
    </>
  );
}

export function CookiePolicy() {
  const { content } = useContent();
  const legal = content.legal;
  return (
    <>
      <PageHero title={legal.cookieTitle} eyebrow="Legal" />
      <section className="section">
        <div className="container prose">
          <p>{legal.cookieBody}</p>
        </div>
      </section>
    </>
  );
}
