import { education } from '../../data/content';
import Reveal from '../layout/Reveal';
import SectionHeading from '../layout/SectionHeading';

export default function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="on-light bg-cream py-24 text-ink md:py-32">
      <div className="container-page">
        <SectionHeading id="education-title" eyebrow="Education" title="Education & Professional Development" />

        <ul className="grid gap-6 md:grid-cols-3">
          {education.map((item, i) => (
            <li key={item.title}>
              <Reveal delay={i * 100} className="h-full">
                <article className="flex h-full flex-col border border-charcoal/20 bg-ivory p-8">
                  <p aria-hidden="true" className="mb-8 h-px w-10 bg-champagne" />
                  <h3 className="text-2xl leading-tight">{item.title}</h3>
                  <p className="mt-3 text-[0.95rem] text-ink/85">{item.institution}</p>
                  {(item.period || item.detail) && (
                    <p className="mt-auto pt-8 text-[0.75rem] uppercase tracking-wide2 text-ink/70">
                      {[item.period, item.detail].filter(Boolean).join(' · ')}
                    </p>
                  )}
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
