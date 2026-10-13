import { navLinks, siteConfig } from '../../data/siteConfig';
import { isHttpUrl } from '../../lib/seo';

export default function Footer() {
  const social = siteConfig.social.filter((s) => s.label.trim() && isHttpUrl(s.url));

  return (
    <footer className="border-t border-ivory/10 bg-ink py-14 text-ivory">
      <div className="container-page grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-serif text-3xl">{siteConfig.name}</p>
          <p className="mt-3 text-[0.85rem] text-ivory/70">{siteConfig.title}</p>
        </div>

        <nav aria-label="Footer" className="md:col-span-4">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-[0.72rem] uppercase tracking-wide2 text-ivory/70">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="transition-colors hover:text-champagne">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {social.length > 0 && (
          <ul className="space-y-3 text-[0.72rem] uppercase tracking-wide2 text-ivory/70 md:col-span-3">
            {social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-champagne"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="container-page mt-12">
        <div className="hairline text-ivory" />
        <p className="mt-6 text-[0.72rem] text-ivory/60">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
