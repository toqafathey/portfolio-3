import { approach } from '../../data/content';
import Reveal from '../layout/Reveal';
import SectionHeading from '../layout/SectionHeading';

export default function Approach() {
  return (
    <section id="approach" aria-labelledby="approach-title" className="on-light bg-ivory py-24 text-ink md:py-32">
      <div className="container-page">
        <SectionHeading id="approach-title" eyebrow="Process" title="How I Approach My Work" />

        <ol className="relative grid gap-10 md:grid-cols-5 md:gap-6">
          <span
            aria-hidden="true"
            className="absolute left-[0.45rem] top-2 hidden h-[calc(100%-1rem)] w-px bg-charcoal/20 max-md:block md:left-0 md:top-[0.55rem] md:h-px md:w-full"
          />
          {approach.map((step, i) => (
            <li key={step.number} className="relative pl-9 md:pl-0 md:pt-10">
              <Reveal delay={i * 90}>
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1.5 h-3 w-3 rounded-full border border-champagne bg-ivory md:top-0"
                />
                <p aria-hidden="true" className="font-serif text-2xl italic text-champagne">
                  {step.number}
                </p>
                <h3 className="mt-3 text-[1.3rem] leading-tight">{step.title}</h3>
                <p className="mt-3 text-[0.88rem] leading-relaxed text-ink/75">{step.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
