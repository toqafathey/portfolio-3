interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  tone?: 'light' | 'dark';
}

export default function SectionHeading({ id, eyebrow, title, intro, tone = 'light' }: SectionHeadingProps) {
  const dark = tone === 'dark';
  return (
    <header className="mb-12 max-w-3xl md:mb-16">
      <p className={`eyebrow mb-5 ${dark ? 'text-champagne' : 'text-ink/70'}`}>
        <span aria-hidden="true" className="mr-3 inline-block h-px w-8 translate-y-[-3px] bg-champagne align-middle" />
        {eyebrow}
      </p>
      <h2 id={id} className="text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {intro && (
        <p className={`mt-6 max-w-2xl text-base leading-relaxed ${dark ? 'text-ivory/70' : 'text-ink/75'}`}>
          {intro}
        </p>
      )}
    </header>
  );
}
