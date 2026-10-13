import { siteConfig } from '../../data/siteConfig';
import Reveal from '../layout/Reveal';
import SectionHeading from '../layout/SectionHeading';

export default function About() {
  const { about } = siteConfig;

  return (
    <section id="about" aria-labelledby="about-title" className="on-light bg-ivory py-24 text-ink md:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <SectionHeading id="about-title" eyebrow="About" title={about.heading} />

          <Reveal>
            <h3 className="eyebrow mb-5 text-ink/70">Where I focus</h3>
            <ul>
              {about.focus.map((item) => (
                <li key={item} className="flex gap-4 border-t border-charcoal/20 py-4 font-serif text-xl leading-snug">
                  <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-champagne" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:pt-6">
          <Reveal>
            <div className="space-y-6 text-[1.05rem] leading-[1.85] text-ink/85">
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
