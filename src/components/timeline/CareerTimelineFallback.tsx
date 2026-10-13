import type { ExperienceEntry } from '../../data/types';
import { EntryBody } from './CareerDetailPanel';

interface CareerTimelineFallbackProps {
  entries: ExperienceEntry[];
  /** Optional explanation shown when the 3D view is unavailable. */
  notice?: string;
}

/**
 * Accessible 2D timeline used on phones and whenever WebGL is unavailable.
 * Shows the same entries as the 3D scene, fully expanded.
 */
export default function CareerTimelineFallback({ entries, notice }: CareerTimelineFallbackProps) {
  return (
    <div>
      {notice && <p className="mb-8 text-[0.8rem] text-ivory/60">{notice}</p>}
      <ol className="relative space-y-12 border-l border-ivory/20 pl-8">
        {entries.map((entry, i) => (
          <li key={entry.id} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[2.45rem] top-1.5 h-3 w-3 rounded-full border border-champagne bg-ink"
            />
            <p className="eyebrow mb-2 text-champagne">Experience {String(i + 1).padStart(2, '0')}</p>
            <h3 className="mb-3 text-3xl leading-tight">{entry.employer}</h3>
            <EntryBody entry={entry} />
          </li>
        ))}
      </ol>
    </div>
  );
}
