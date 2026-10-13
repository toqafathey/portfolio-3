import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks, siteConfig } from '../../data/siteConfig';

export default function Navbar({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Close the menu if the viewport grows to desktop width.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open ? 'bg-ink/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <a
          href="#home"
          className="font-serif text-xl tracking-wide text-ivory"
          onClick={() => setOpen(false)}
        >
          {siteConfig.name}
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`group relative py-2 text-[0.7rem] font-medium uppercase tracking-wide2 transition-colors duration-300 ${
                      isActive ? 'text-champagne' : 'text-ivory/70 hover:text-ivory'
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-champagne transition-transform duration-500 ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center text-ivory lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Mobile"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto bg-ink lg:hidden"
      >
        <ul className="container-page flex flex-col py-8">
          {navLinks.map((link, i) => (
            <li key={link.id} className="border-b border-ivory/10">
              <a
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === link.id ? 'true' : undefined}
                className={`flex items-baseline gap-4 py-5 font-serif text-3xl ${
                  active === link.id ? 'text-champagne' : 'text-ivory'
                }`}
              >
                <span className="font-sans text-[0.65rem] tracking-wide2 text-stone">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
