import { Link } from 'react-router-dom';
import { CtaBand, PageHero, Reveal } from '../components/ui';
import { useContent } from '../cms/ContentContext';

export default function WhoWeServe() {
  const { content } = useContent();
  const page = content.whoWeServe;

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} lead={page.lead} image={content.images.contact} />
      <section className="section">
        <div className="container grid-3">
          {content.audiences.map((a) => (
            <Reveal key={a.title}>
              <div className="card-link" style={{ cursor: 'default' }}>
                <div className="card-link__media">
                  <img src={a.image} alt="" loading="lazy" />
                </div>
                <div className="card-link__body">
                  <h3>{a.title}</h3>
                  <p>{a.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="container btn-row" style={{ marginTop: '2rem' }}>
          <Link className="btn btn--primary" to="/contact">
            {page.consultCta}
          </Link>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
