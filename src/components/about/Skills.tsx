import { skills, toolGroups } from '../../data/content';
import Reveal from '../layout/Reveal';
import SectionHeading from '../layout/SectionHeading';

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="on-light bg-ivory py-24 text-ink md:py-32">
      <div className="container-page">
        <SectionHeading
          id="skills-title"
          eyebrow="Core Skills"
          title="Skills built through hands-on work"
        />

        <Reveal>
          <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((s) => (
              <li key={s.number} className="flex items-baseline gap-4 border-t border-charcoal/20 py-4">
                <span aria-hidden="true" className="font-serif text-lg italic text-champagne">
                  {s.number}
                </span>
                <span className="font-serif text-[1.3rem] leading-snug">{s.title}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-20">
          <h3 className="mb-8 text-3xl">Tools &amp; Software</h3>
          <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {toolGroups.map((g) => (
              <div key={g.label} className="border-t border-charcoal/20 pt-4">
                <dt className="eyebrow mb-3 text-ink/70">{g.label}</dt>
                <dd>
                  <ul className="space-y-1.5">
                    {g.items.map((t) => (
                      <li key={t} className="font-serif text-xl">
                        {t}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
