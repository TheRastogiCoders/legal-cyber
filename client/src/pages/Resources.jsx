import { CtaBand, PageHero } from '../components/ui';
import { useContent } from '../cms/ContentContext';

export default function Resources() {
  const { content } = useContent();
  const page = content.resources;

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} lead={page.lead} />
      <section className="section">
        <div className="container checklist-layout">
          <article className="checklist-card">
            <div className="checklist-card__head">
              <div className="eyebrow">{page.goldenEyebrow}</div>
              <h2>{page.goldenTitle}</h2>
              <p>{page.goldenLead}</p>
            </div>
            <ol className="list-check list-check--numbered">
              {(page.golden || []).map((item, i) => (
                <li key={item}>
                  <span className="list-check__n">{String(i + 1).padStart(2, '0')}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </article>

          <article className="checklist-card">
            <div className="checklist-card__head">
              <div className="eyebrow">{page.unfreezeEyebrow}</div>
              <h2>{page.unfreezeTitle}</h2>
              <p>{page.unfreezeLead}</p>
            </div>
            <ul className="list-check">
              {(page.unfreeze || []).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>
      <CtaBand title={page.ctaTitle} text={page.ctaText} />
    </>
  );
}
