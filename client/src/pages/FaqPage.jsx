import { CtaBand, FaqList, PageHero } from '../components/ui';
import { useContent } from '../cms/ContentContext';

export default function FaqPage() {
  const { content } = useContent();
  const page = content.faqPage;
  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} lead={page.lead} />
      <section className="section">
        <div className="container" style={{ maxWidth: '760px' }}>
          <FaqList items={content.faqs} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
