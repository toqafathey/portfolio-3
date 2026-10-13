import { brands } from '../../data/content';
import Reveal from '../layout/Reveal';

/** Compact strip of the logos supplied by Toqa. Names stay in the DOM for screen readers. */
export default function Brands() {
  return (
    <section aria-labelledby="brands-title" className="on-light border-y border-charcoal/15 bg-cream py-16 text-ink">
      <div className="container-page">
        <h2 id="brands-title" className="eyebrow mb-8 text-ink/70">
          <span aria-hidden="true" className="mr-3 inline-block h-px w-8 translate-y-[-3px] bg-champagne align-middle" />
          Brands I&rsquo;ve Worked With
        </h2>
        <Reveal>
          <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {brands.map((b) => (
              <li key={b.name} className="text-center">
                <div className="flex aspect-square items-center justify-center overflow-hidden border border-charcoal/15 bg-white">
                  <img
                    src={b.logo}
                    alt={`${b.name} logo`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain"
                  />
                </div>
                <p className="mt-3 text-[0.72rem] leading-snug text-ink/80">
                  {b.name}
                  {b.note && <span className="block text-ink/70">{b.note}</span>}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
