import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { isHttpUrl } from '../../lib/seo';
import Reveal from '../layout/Reveal';

interface ContactItem {
  label: string;
  text: string;
  href?: string;
  external?: boolean;
  download?: boolean;
}

/** Egyptian mobile numbers written as 01XXXXXXXXX become +20 1XXXXXXXXX for tel: links. */
function toTel(phone: string): string {
  const digits = phone.replace(/[^+\d]/g, '');
  if (digits.startsWith('+')) return digits;
  if (digits.startsWith('0')) return `+20${digits.slice(1)}`;
  return digits;
}

function buildItems(): ContactItem[] {
  const { email, linkedin, phones, location, cvPath } = siteConfig.contact;
  const items: ContactItem[] = [];
  if (email.trim()) items.push({ label: 'Email', text: email.trim(), href: `mailto:${email.trim()}` });
  if (linkedin.trim() && isHttpUrl(linkedin)) {
    items.push({ label: 'LinkedIn', text: 'View LinkedIn profile', href: linkedin.trim(), external: true });
  }
  phones
    .filter((p) => p.trim())
    .forEach((p, i) => items.push({ label: i === 0 ? 'Phone' : 'Phone (2)', text: p.trim(), href: `tel:${toTel(p)}` }));
  if (location.trim()) items.push({ label: 'Location', text: location.trim() });
  if (cvPath.trim()) items.push({ label: 'CV', text: 'Download My CV', href: cvPath.trim(), download: true });
  return items;
}

export default function Contact() {
  const items = buildItems();

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative bg-ink py-28 text-ivory md:py-36">
      <div className="container-page grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="eyebrow mb-6 text-champagne">
            <span aria-hidden="true" className="mr-3 inline-block h-px w-8 translate-y-[-3px] bg-champagne align-middle" />
            Get in touch
          </p>
          <h2 id="contact-title" className="text-6xl leading-[1] sm:text-7xl lg:text-8xl">
            Contact
          </h2>
          <p className="mt-8 max-w-md text-[1rem] leading-relaxed text-ivory/75">
            I&rsquo;m open to Social Media Specialist and Content Creator opportunities. If you&rsquo;d like to talk about
            a role or see more of my work, I&rsquo;d love to hear from you.
          </p>
        </div>

        <div className="lg:col-span-6 lg:pt-4">
          <Reveal>
            <ul className="border-t border-ivory/15">
              {items.map((item) => (
                <li key={item.label} className="border-b border-ivory/15">
                  {item.href ? (
                    <a
                      href={item.href}
                      {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      {...(item.download ? { download: true } : {})}
                      className="group flex items-center justify-between gap-4 py-5 transition-colors hover:text-champagne"
                    >
                      <span>
                        <span className="eyebrow block text-ivory/60">{item.label}</span>
                        <span className="mt-1 block break-all font-serif text-2xl sm:break-normal">{item.text}</span>
                      </span>
                      <ArrowUpRight
                        size={20}
                        aria-hidden="true"
                        className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  ) : (
                    <div className="py-5">
                      <span className="eyebrow block text-ivory/60">{item.label}</span>
                      <span className="mt-1 block font-serif text-2xl">{item.text}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
