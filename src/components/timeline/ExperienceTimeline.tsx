import { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { getTimelineEntries } from '../../data/experienceData';
import { useMediaQuery, useReducedMotion } from '../../lib/hooks';
import { isWebGLAvailable } from '../../lib/webgl';
import SectionHeading from '../layout/SectionHeading';
import CareerDetailPanel from './CareerDetailPanel';
import CareerTimelineFallback from './CareerTimelineFallback';

// The Three.js scene is loaded only when the section first approaches the viewport.
const TimelineScene = lazy(() => import('./TimelineScene'));

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export default function ExperienceTimeline() {
  const entries = useMemo(() => getTimelineEntries(), []);
  const count = entries.length;

  const reducedMotion = useReducedMotion();
  const isDesktopOrTablet = useMediaQuery('(min-width: 768px)');
  const isCompact = !useMediaQuery('(min-width: 1100px)');

  const [webglOk] = useState<boolean>(() => isWebGLAvailable());
  const [failed, setFailed] = useState(false);
  const use3D = webglOk && !failed && isDesktopOrTablet && count >= 2;

  const [selected, setSelected] = useState<number | null>(null);
  const [manual, setManual] = useState(false); // true once the visitor chooses a milestone themselves
  const [railHover, setRailHover] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [nearViewport, setNearViewport] = useState(false);
  const [onScreen, setOnScreen] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const railRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Mount the 3D scene when near the viewport; pause rendering when it leaves.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setNearViewport(true);
      setOnScreen(true);
      return;
    }
    const near = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNearViewport(true);
      },
      { rootMargin: '400px 0px' },
    );
    const visible = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0 });
    near.observe(el);
    visible.observe(el);
    return () => {
      near.disconnect();
      visible.disconnect();
    };
  }, []);

  // Scroll progress through the section. This reads scroll position only; it never intercepts scrolling.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !onScreen) return;
    let frame = 0;
    const compute = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      setProgress(clamp01((vh * 0.85 - rect.top) / (rect.height * 0.75)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [onScreen]);

  // Until the visitor picks a milestone, the one matching the scroll position is selected.
  useEffect(() => {
    if (manual || !use3D || !onScreen || count < 2) return;
    let idx = -1;
    for (let i = 0; i < count; i++) {
      if (progress >= i / (count - 1) - 0.001) idx = i;
    }
    setSelected(idx >= 0 ? idx : null);
  }, [progress, manual, use3D, onScreen, count]);

  const choose = useCallback(
    (index: number) => {
      setManual(true);
      setSelected(Math.min(count - 1, Math.max(0, index)));
    },
    [count],
  );

  const onPrev = () => choose((selected ?? 1) - 1);
  const onNext = () => choose((selected ?? -1) + 1);
  const onClose = () => {
    setManual(true);
    setSelected(null);
  };

  const onRailKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = i;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = Math.min(count - 1, i + 1);
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = Math.max(0, i - 1);
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = count - 1;
    else return;
    e.preventDefault();
    choose(next);
    railRefs.current[next]?.focus();
  };

  const sceneMilestones = useMemo(
    () => entries.map((e) => ({ label: e.employer, pending: false })),
    [entries],
  );

  const selectedEntry = selected !== null ? entries[selected] : null;
  const fallbackNotice =
    !webglOk || failed ? 'The interactive 3D view is unavailable on this device, so the timeline is shown in 2D.' : undefined;

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="relative bg-ink py-24 text-ivory md:py-32"
    >
      <div className="container-page">
        <SectionHeading
          id="experience-title"
          eyebrow="Experience"
          title="My Professional Journey"
          intro="From customer communication to social media and content creation, each role has shaped the way I work today."
          tone="dark"
        />

        <div ref={sectionRef}>
          {use3D ? (
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="border border-ivory/10 bg-[radial-gradient(ellipse_at_50%_40%,#1f1d1a,#101010_70%)]">
                  {nearViewport ? (
                    <Suspense
                      fallback={
                        <div role="status" className="flex h-[420px] items-center justify-center text-[0.75rem] uppercase tracking-wide2 text-ivory/60 md:h-[520px]">
                          Loading 3D timeline…
                        </div>
                      }
                    >
                      <TimelineScene
                        milestones={sceneMilestones}
                        selectedIndex={selected}
                        externalHover={railHover}
                        progress={progress}
                        active={onScreen}
                        compact={isCompact}
                        reducedMotion={reducedMotion}
                        onSelect={choose}
                        onFailure={() => setFailed(true)}
                      />
                    </Suspense>
                  ) : (
                    <div className="h-[420px] md:h-[520px]" aria-hidden="true" />
                  )}
                </div>

                <nav aria-label="Experience" className="mt-5">
                  <ol className="grid gap-px bg-ivory/10 sm:grid-cols-2 xl:grid-cols-3">
                    {entries.map((entry, i) => {
                      const isSel = selected === i;
                      return (
                        <li key={entry.id} className="bg-ink">
                          <button
                            ref={(el) => {
                              railRefs.current[i] = el;
                            }}
                            type="button"
                            aria-current={isSel ? 'step' : undefined}
                            aria-label={`Experience ${i + 1} of ${count}: ${entry.employer}, ${entry.title}`}
                            onClick={() => choose(i)}
                            onKeyDown={(e) => onRailKeyDown(e, i)}
                            onMouseEnter={() => setRailHover(i)}
                            onMouseLeave={() => setRailHover(null)}
                            onFocus={() => setRailHover(i)}
                            onBlur={() => setRailHover(null)}
                            className={`block h-full w-full border-t-2 p-4 text-left transition-colors ${
                              isSel ? 'border-champagne bg-charcoal' : 'border-transparent hover:bg-charcoal/60'
                            }`}
                          >
                            <span aria-hidden="true" className="block font-serif text-lg italic text-champagne">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <span className="mt-1 block text-[0.95rem] leading-snug">{entry.employer}</span>
                            <span className="mt-1 block text-[0.68rem] uppercase tracking-wide2 text-ivory/60">
                              {entry.title}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                  {manual && (
                    <button
                      type="button"
                      onClick={() => setManual(false)}
                      className="mt-4 min-h-[44px] text-[0.68rem] uppercase tracking-wide2 text-ivory/70 underline decoration-champagne underline-offset-4 hover:text-champagne"
                    >
                      Follow scroll again
                    </button>
                  )}
                </nav>
              </div>

              <div
                className="lg:col-span-5"
                onKeyDown={(e) => {
                  if (e.key === 'Escape' && selected !== null) onClose();
                }}
              >
                <CareerDetailPanel
                  entry={selectedEntry}
                  index={selected}
                  total={count}
                  onPrev={onPrev}
                  onNext={onNext}
                  onClose={onClose}
                />
              </div>
            </div>
          ) : (
            <CareerTimelineFallback entries={entries} notice={fallbackNotice} />
          )}
        </div>

      </div>
    </section>
  );
}
