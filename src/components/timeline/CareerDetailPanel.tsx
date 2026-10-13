import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { ExperienceEntry } from '../../data/types';

interface CareerDetailPanelProps {
  entry: ExperienceEntry | null;
  index: number | null;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}

/** Title, business description, responsibilities and skills for one experience. Shared by the 3D panel and the 2D fallback. */
export function EntryBody({ entry }: { entry: ExperienceEntry }) {
  return (
    <>
      <p className="text-[0.95rem] italic leading-relaxed text-champagne">{entry.title}</p>
      <p className="mt-4 text-[0.92rem] leading-relaxed text-ivory/75">{entry.descriptor}</p>

      {entry.note && (
        <p className="mt-5 border-l border-champagne pl-4 text-[0.88rem] leading-relaxed text-ivory/75">{entry.note}</p>
      )}

      <h4 className="eyebrow mb-3 mt-7 text-champagne">Key responsibilities</h4>
      <ul className="space-y-2">
        {entry.responsibilities.map((r) => (
          <li key={r} className="flex gap-3 text-[0.92rem] leading-relaxed text-ivory/85">
            <span aria-hidden="true" className="mt-3 h-px w-3 shrink-0 bg-champagne" />
            {r}
          </li>
        ))}
      </ul>

      {entry.campaign && (
        <div className="mt-7 border border-ivory/15 p-5">
          <h4 className="font-serif text-xl">{entry.campaign.title}</h4>
          <p className="mt-1 text-[0.82rem] text-ivory/70">{entry.campaign.role}</p>
          <ul className="mt-4 space-y-2">
            {entry.campaign.items.map((r) => (
              <li key={r} className="flex gap-3 text-[0.9rem] leading-relaxed text-ivory/85">
                <span aria-hidden="true" className="mt-3 h-px w-3 shrink-0 bg-champagne" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}

      <h4 className="eyebrow mb-3 mt-7 text-champagne">Relevant skills</h4>
      <ul className="flex flex-wrap gap-2">
        {entry.skills.map((s) => (
          <li key={s} className="border border-ivory/25 px-3 py-1.5 text-[0.72rem] text-ivory/80">
            {s}
          </li>
        ))}
      </ul>
    </>
  );
}

export default function CareerDetailPanel({ entry, index, total, onPrev, onNext, onClose }: CareerDetailPanelProps) {
  return (
    <section
      aria-labelledby="career-panel-title"
      className="flex h-full flex-col border border-ivory/15 bg-charcoal/40 p-6 md:p-8"
    >
      <div aria-live="polite" aria-atomic="true" className="flex-1">
        {entry && index !== null ? (
          <div key={entry.id} className="animate-rise">
            <p className="eyebrow mb-3 text-champagne">
              Experience {String(index + 1).padStart(2, '0')} of {String(total).padStart(2, '0')}
            </p>
            <h3 id="career-panel-title" className="mb-3 text-3xl leading-tight md:text-4xl">
              {entry.employer}
            </h3>
            <EntryBody entry={entry} />
          </div>
        ) : (
          <div>
            <p className="eyebrow mb-3 text-champagne">Experience</p>
            <h3 id="career-panel-title" className="mb-4 text-3xl leading-tight">
              Select a role
            </h3>
            <p className="text-[0.92rem] leading-relaxed text-ivory/75">
              Choose a marker in the scene, or one of the buttons below it, to read about that role. Scrolling through
              this section also moves along the timeline.
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between gap-3 border-t border-ivory/15 pt-5">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onPrev}
            disabled={index === null || index <= 0}
            aria-label="Previous experience"
            className="inline-flex h-11 w-11 items-center justify-center border border-ivory/30 transition-colors hover:border-champagne hover:text-champagne disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={index !== null && index >= total - 1}
            aria-label="Next experience"
            className="inline-flex h-11 w-11 items-center justify-center border border-ivory/30 transition-colors hover:border-champagne hover:text-champagne disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
        {entry && (
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-[44px] items-center gap-2 text-[0.68rem] uppercase tracking-wide2 text-ivory/70 hover:text-champagne"
          >
            <X size={14} aria-hidden="true" />
            Deselect
          </button>
        )}
      </div>
    </section>
  );
}
