import type { Project } from '../../data/types';

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
}

export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <li>
      <article className="h-full">
        <button
          type="button"
          onClick={() => onOpen(project)}
          aria-haspopup="dialog"
          aria-label={`Open case study: ${project.title}`}
          className="group flex h-full w-full flex-col text-left"
        >
          <div className="aspect-[4/5] w-full overflow-hidden bg-charcoal">
            <img
              src={project.cover.src}
              alt={project.cover.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              style={project.cover.position ? { objectPosition: project.cover.position } : undefined}
            />
          </div>
          <div className="flex flex-1 flex-col border-b border-charcoal/20 pb-6 pt-5">
            <p className="text-[0.68rem] uppercase tracking-wide2 text-ink/70">{project.industry}</p>
            <h3 className="mt-2 text-[1.8rem] leading-tight">{project.title}</h3>
            <p className="mt-1 text-[0.82rem] text-ink/70">{project.role}</p>
            <p className="mt-4 text-[0.92rem] leading-relaxed text-ink/80">{project.summary}</p>
            <p className="mt-auto pt-5">
              <span className="inline-block border-b border-champagne pb-0.5 text-[0.7rem] uppercase tracking-wide2 text-ink transition-all group-hover:pl-1">
                View case study
              </span>
            </p>
          </div>
        </button>
      </article>
    </li>
  );
}
