import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { Project, ProjectVisual } from '../../data/types';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-charcoal/15 py-7">
      <h3 className="eyebrow mb-4 text-ink/70">{title}</h3>
      {children}
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5 text-[0.95rem] leading-relaxed">
      {items.map((i) => (
        <li key={i} className="flex gap-4">
          <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-champagne" />
          {i}
        </li>
      ))}
    </ul>
  );
}

interface LightboxState {
  visuals: ProjectVisual[];
  index: number;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const lightboxOpen = useRef(false);
  lightboxOpen.current = lightbox !== null;
  const titleId = `case-${project.id}-title`;

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        if (lightboxOpen.current) setLightbox(null);
        else onClose();
        return;
      }
      if (e.key === 'ArrowRight' && lightboxOpen.current) {
        setLightbox((l) => (l ? { ...l, index: Math.min(l.visuals.length - 1, l.index + 1) } : l));
        return;
      }
      if (e.key === 'ArrowLeft' && lightboxOpen.current) {
        setLightbox((l) => (l ? { ...l, index: Math.max(0, l.index - 1) } : l));
        return;
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  const current = lightbox ? lightbox.visuals[lightbox.index] : null;

  return (
    <div className="on-light fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
      <div className="absolute inset-0 bg-ink/85 backdrop-blur-sm" aria-hidden="true" onClick={onClose} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex max-h-[94svh] w-full max-w-4xl animate-rise flex-col bg-ivory text-ink sm:max-h-[92svh]"
      >
        <div className="flex items-start justify-between gap-6 border-b border-charcoal/15 p-6 sm:p-8">
          <div className="flex items-center gap-5">
            {project.logo && (
              <img
                src={project.logo.src}
                alt={project.logo.alt}
                className="h-14 w-14 shrink-0 border border-charcoal/15 bg-white object-contain"
              />
            )}
            <div>
              <p className="text-[0.68rem] uppercase tracking-wide2 text-ink/70">{project.industry}</p>
              <h2 id={titleId} className="mt-1 text-3xl leading-tight sm:text-4xl">
                {project.title}
              </h2>
              <p className="mt-1 text-[0.85rem] text-ink/75">Role: {project.role}</p>
            </div>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-charcoal/25 hover:bg-charcoal hover:text-ivory"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="overflow-y-auto px-6 pb-8 sm:px-8">
          <Block title="Project overview">
            <p className="text-[0.95rem] leading-relaxed">{project.overview}</p>
            <p className="mt-4 text-[0.95rem] leading-relaxed">
              <strong className="font-medium">Goal: </strong>
              {project.goal}
            </p>
          </Block>

          {project.groups.map((group) => (
            <Block key={group.title} title={group.title}>
              {group.note && <p className="mb-5 text-[0.85rem] text-ink/75">{group.note}</p>}
              <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {group.visuals.map((v, i) => (
                  <li key={v.src}>
                    <button
                      type="button"
                      onClick={() => setLightbox({ visuals: group.visuals, index: i })}
                      aria-label={`Enlarge image: ${v.alt}`}
                      className="group block w-full overflow-hidden border border-charcoal/15 bg-cream"
                    >
                      <img
                        src={v.src}
                        alt={v.alt}
                        loading="lazy"
                        decoding="async"
                        className={`w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${
                          group.layout === 'portrait' ? 'aspect-[4/5] object-top' : 'aspect-square'
                        }`}
                      />
                    </button>
                    {v.caption && <p className="mt-2 text-[0.75rem] text-ink/75">{v.caption}</p>}
                  </li>
                ))}
              </ul>
            </Block>
          ))}

          {project.approach.length > 0 && (
            <Block title="My approach">
              <List items={project.approach} />
            </Block>
          )}

          {project.results && project.results.length > 0 && (
            <Block title="Results">
              <List items={project.results} />
            </Block>
          )}
        </div>

        {current && lightbox && (
          <div
            role="group"
            aria-label="Image viewer"
            className="absolute inset-0 z-10 flex flex-col bg-ink/95 text-ivory"
          >
            <div className="flex items-center justify-between p-4">
              <p className="text-[0.7rem] uppercase tracking-wide2 text-ivory/70">
                {lightbox.index + 1} / {lightbox.visuals.length}
              </p>
              <button
                type="button"
                onClick={() => setLightbox(null)}
                aria-label="Close image viewer"
                className="inline-flex h-11 w-11 items-center justify-center border border-ivory/30 hover:border-champagne hover:text-champagne"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <div className="flex min-h-0 flex-1 items-center justify-center gap-2 px-2 pb-4 sm:px-4">
              <button
                type="button"
                aria-label="Previous image"
                disabled={lightbox.index === 0}
                onClick={() => setLightbox({ ...lightbox, index: lightbox.index - 1 })}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-ivory/30 hover:border-champagne disabled:opacity-30"
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
              <img src={current.src} alt={current.alt} className="max-h-full min-w-0 max-w-full object-contain" />
              <button
                type="button"
                aria-label="Next image"
                disabled={lightbox.index === lightbox.visuals.length - 1}
                onClick={() => setLightbox({ ...lightbox, index: lightbox.index + 1 })}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-ivory/30 hover:border-champagne disabled:opacity-30"
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
