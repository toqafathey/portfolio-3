import { ArrowDownRight } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

const focusAreas = [
  'Social Media Management',
  'Content Creation & Copywriting',
  'Content Planning',
  'Creative Ideas',
];

export default function Hero() {
  const { cvPath } = siteConfig.contact;
  const { portrait } = siteConfig;

  return (
    <section id="home" aria-label="Introduction" className="relative isolate overflow-hidden bg-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_35%,rgba(185,162,118,0.14),transparent_60%)]"
      />

      <div className="container-page grid min-h-[100svh] items-center gap-12 pb-14 pt-28 lg:grid-cols-12 lg:gap-10 lg:pb-16">
        <div className="lg:col-span-7">
          <p className="eyebrow animate-rise mb-7 text-champagne">
            <span aria-hidden="true" className="mr-3 inline-block h-px w-8 translate-y-[-3px] bg-champagne align-middle" />
            {siteConfig.title}
          </p>

          <h1 className="animate-rise whitespace-nowrap text-[clamp(2.6rem,10.5vw,6.6rem)] lg:text-[clamp(3rem,7vw,6.6rem)] leading-[0.95] tracking-[-0.01em] [animation-delay:120ms]">
            Toqa <span className="italic text-ivory/90">Fathey</span>
            <span className="sr-only"> — {siteConfig.title}</span>
          </h1>

          <p className="animate-rise mt-8 max-w-xl font-serif text-2xl italic leading-snug text-champagne sm:text-[1.7rem] [animation-delay:260ms]">
            {siteConfig.headline}
          </p>

          <p className="animate-rise mt-6 max-w-xl text-[0.98rem] leading-relaxed text-ivory/75 [animation-delay:380ms]">
            {siteConfig.intro}
          </p>

          <div className="animate-rise mt-10 flex flex-wrap items-center gap-4 [animation-delay:500ms]">
            <a href="#work" className="btn-primary">
              Explore My Work
              <ArrowDownRight size={16} aria-hidden="true" />
            </a>
            {cvPath && (
              <a href={cvPath} download className="btn-ghost">
                Download My CV
              </a>
            )}
            <a href="#contact" className="btn-ghost">
              Get in Touch
            </a>
          </div>
        </div>

        <div className="animate-rise mx-auto w-full max-w-[320px] sm:max-w-[360px] lg:col-span-5 lg:max-w-[420px] lg:justify-self-end [animation-delay:300ms]">
          <div className="relative">
            <div aria-hidden="true" className="absolute -bottom-4 -right-4 h-full w-full border border-champagne/60" />
            <img
              src={portrait.src}
              alt={portrait.alt}
              width={826}
              height={1100}
              decoding="async"
              className="relative aspect-[3/4] w-full object-cover object-[50%_20%]"
            />
          </div>
        </div>
      </div>

      <div className="container-page pb-10">
        <div className="hairline text-ivory" />
        <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-3 text-[0.68rem] uppercase tracking-wide2 text-ivory/60">
          {focusAreas.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
