import { GLOSSARY } from '../data/content';
import { CtaBand, PageHero } from '../components/ui';

export default function Glossary() {
  return (
    <>
      <PageHero eyebrow="Knowledge" title="Glossary" lead="Key terms used across cybercrime investigations, freezes, PMLA, and data protection." />
      <section className="section">
        <div className="container">
          {GLOSSARY.map((g) => (
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
