import { CtaBand, PageHero } from '../components/ui';
import { useContent } from '../cms/ContentContext';

export default function Glossary() {
  const { content } = useContent();
  const page = content.glossaryPage;
  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} lead={page.lead} />
      <section className="section">
        <div className="container">
          {content.glossary.map((g) => (
            <div className="feature" key={g.term}>
              <h3>{g.term}</h3>
              <p>{g.def}</p>
            </div>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
