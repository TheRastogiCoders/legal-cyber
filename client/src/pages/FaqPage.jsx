import { FAQS } from '../data/content';
import { CtaBand, FaqList, PageHero } from '../components/ui';

export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow="Knowledge" title="Frequently asked questions" lead="Straight answers on process, geography, confidentiality, and urgency." />
      <section className="section">
        <div className="container" style={{ maxWidth: '760px' }}>
          <FaqList items={FAQS} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
