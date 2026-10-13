import { useCallback, useMemo, useState } from 'react';
import { categories, projects } from '../../data/projects';
import type { CategoryId, Project } from '../../data/types';
import SectionHeading from '../layout/SectionHeading';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

type Filter = 'all' | CategoryId;

export default function Portfolio() {
  const [filter, setFilter] = useState<Filter>('all');
  const [openProject, setOpenProject] = useState<Project | null>(null);

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter],
  );

  const handleClose = useCallback(() => setOpenProject(null), []);
  const activeLabel = categories.find((c) => c.id === filter)?.label ?? 'All Work';

  return (
    <section id="work" aria-labelledby="work-title" className="on-light bg-cream py-24 text-ink md:py-32">
      <div className="container-page">
        <SectionHeading
          id="work-title"
          eyebrow="Portfolio"
          title="Selected Work & Creative Concepts"
          intro="A selection of content, creative ideas, and marketing materials from my work across different industries."
        />

        <div role="group" aria-label="Filter projects by category" className="mb-6 flex flex-wrap gap-2">
          {categories.map((c) => {
            const active = c.id === filter;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(c.id)}
                className={`min-h-[44px] border px-4 text-[0.68rem] font-medium uppercase tracking-wide2 transition-colors ${
                  active
                    ? 'border-charcoal bg-charcoal text-ivory'
                    : 'border-charcoal/30 text-ink hover:border-charcoal'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        <p className="sr-only" role="status" aria-live="polite">
          Showing {visible.length} of {projects.length} projects: {activeLabel}
        </p>

        {visible.length > 0 ? (
          <ul className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p) => (
              <ProjectCard key={p.id} project={p} onOpen={setOpenProject} />
            ))}
          </ul>
        ) : (
          <div className="mt-10 border border-dashed border-charcoal/35 p-12 text-center">
            <p className="font-serif text-2xl">Nothing in this category yet</p>
            <button
              type="button"
              onClick={() => setFilter('all')}
              className="mt-6 border-b border-champagne pb-0.5 text-[0.72rem] uppercase tracking-wide2"
            >
              Show all work
            </button>
          </div>
        )}
      </div>

      {openProject && <ProjectModal project={openProject} onClose={handleClose} />}
    </section>
  );
}
