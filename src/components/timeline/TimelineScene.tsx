import { useEffect, useRef, useState } from 'react';
import { SceneController } from './SceneController';

export interface SceneMilestone {
  label: string;
  pending: boolean;
}

interface TimelineSceneProps {
  milestones: SceneMilestone[];
  selectedIndex: number | null;
  /** Hover coming from the HTML milestone rail (keyboard focus or mouse), mirrored in 3D. */
  externalHover: number | null;
  /** Curve parameter 0..1 driven by page scroll. */
  progress: number;
  /** True while the section is on screen. The render loop pauses otherwise. */
  active: boolean;
  compact: boolean;
  reducedMotion: boolean;
  onSelect: (index: number) => void;
  onFailure: () => void;
}

export default function TimelineScene(props: TimelineSceneProps) {
  const { milestones, selectedIndex, externalHover, progress, active, compact, reducedMotion } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controllerRef = useRef<SceneController | null>(null);
  const [hover, setHover] = useState<{ index: number; x: number; y: number } | null>(null);

  // Always read the latest props from callbacks without re-creating the scene.
  const latest = useRef(props);
  latest.current = props;

  const pendingKey = milestones.map((m) => (m.pending ? '1' : '0')).join('');

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let controller: SceneController;
    try {
      controller = new SceneController({
        canvas,
        container,
        pending: pendingKey.split('').map((c) => c === '1'),
        compact,
        reducedMotion: latest.current.reducedMotion,
        onSelect: (i) => latest.current.onSelect(i),
        onHover: (index, x, y) => setHover(index === null ? null : { index, x, y }),
        onFailure: () => latest.current.onFailure(),
      });
    } catch {
      latest.current.onFailure();
      return;
    }
    controllerRef.current = controller;

    // Apply the current state to the new scene.
    controller.setReducedMotion(latest.current.reducedMotion);
    controller.setSelected(latest.current.selectedIndex);
    controller.setExternalHover(latest.current.externalHover);
    controller.setProgress(latest.current.progress);
    controller.setActive(latest.current.active);

    return () => {
      controller.dispose();
      controllerRef.current = null;
    };
  }, [pendingKey, compact]);

  useEffect(() => controllerRef.current?.setSelected(selectedIndex), [selectedIndex]);
  useEffect(() => controllerRef.current?.setExternalHover(externalHover), [externalHover]);
  useEffect(() => controllerRef.current?.setProgress(progress), [progress]);
  useEffect(() => controllerRef.current?.setActive(active), [active]);
  useEffect(() => controllerRef.current?.setReducedMotion(reducedMotion), [reducedMotion]);

  return (
    <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden md:h-[520px]">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Interactive 3D career timeline. Select a milestone marker, or use the milestone buttons below, to read about each role."
        className="block h-full w-full touch-pan-y"
      />
      {hover && milestones[hover.index] && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute z-10 whitespace-nowrap border border-champagne/60 bg-ink/90 px-3 py-1.5 text-[0.68rem] uppercase tracking-wide2 text-ivory"
          style={{ left: Math.max(8, hover.x + 14), top: Math.max(8, hover.y - 40) }}
        >
          {milestones[hover.index].label}
        </div>
      )}
    </div>
  );
}
