import * as THREE from 'three';

const TUBULAR_SEGMENTS = 240;
const RADIAL_SEGMENTS = 8;
const SAMPLES = 600;
export const MILESTONE_STEP = 3.6;
export const FLOOR_Y = -2.5;

/**
 * The sculptural curve that carries the milestones, plus a muted full-length
 * guide tube and a champagne tube that is revealed as the visitor scrolls.
 */
export class TimelinePath {
  readonly group = new THREE.Group();
  readonly points: THREE.Vector3[];
  readonly curve: THREE.CatmullRomCurve3;
  /** Cumulative arc length at SAMPLES+1 evenly spaced curve parameters, normalised to 0..1. */
  private readonly arc: number[];
  private readonly baseGeometry: THREE.TubeGeometry;
  private readonly progressGeometry: THREE.TubeGeometry;
  private readonly dropGeometry: THREE.BufferGeometry;
  private readonly materials: THREE.Material[] = [];

  constructor(count: number) {
    this.points = TimelinePath.buildPoints(count);
    this.curve = new THREE.CatmullRomCurve3(this.points, false, 'catmullrom', 0.5);

    // arc-length lookup so scroll progress (curve parameter t) maps to the drawn tube fraction
    const lengths: number[] = [0];
    let prev = this.curve.getPoint(0);
    for (let k = 1; k <= SAMPLES; k++) {
      const p = this.curve.getPoint(k / SAMPLES);
      lengths.push(lengths[k - 1] + p.distanceTo(prev));
      prev = p;
    }
    const total = lengths[SAMPLES] || 1;
    this.arc = lengths.map((l) => l / total);

    const baseMat = new THREE.MeshBasicMaterial({ color: 0x8c8881, transparent: true, opacity: 0.4 });
    const progressMat = new THREE.MeshBasicMaterial({ color: 0xb9a276 });
    this.materials.push(baseMat, progressMat);

    this.baseGeometry = new THREE.TubeGeometry(this.curve, TUBULAR_SEGMENTS, 0.016, RADIAL_SEGMENTS, false);
    this.progressGeometry = new THREE.TubeGeometry(this.curve, TUBULAR_SEGMENTS, 0.03, RADIAL_SEGMENTS, false);
    this.progressGeometry.setDrawRange(0, 0);

    this.group.add(new THREE.Mesh(this.baseGeometry, baseMat));
    this.group.add(new THREE.Mesh(this.progressGeometry, progressMat));

    // fine vertical guide lines from each milestone down to a floor level
    const dropPositions: number[] = [];
    for (let i = 0; i < count; i++) {
      const p = this.points[i];
      dropPositions.push(p.x, p.y - 0.5, p.z, p.x, FLOOR_Y, p.z);
    }
    this.dropGeometry = new THREE.BufferGeometry();
    this.dropGeometry.setAttribute('position', new THREE.Float32BufferAttribute(dropPositions, 3));
    const dropMat = new THREE.LineBasicMaterial({ color: 0xf5f1e9, transparent: true, opacity: 0.14 });
    this.materials.push(dropMat);
    this.group.add(new THREE.LineSegments(this.dropGeometry, dropMat));
  }

  static buildPoints(count: number): THREE.Vector3[] {
    const n = Math.max(count, 2);
    const half = ((n - 1) * MILESTONE_STEP) / 2;
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < n; i++) {
      pts.push(
        new THREE.Vector3(
          -half + i * MILESTONE_STEP,
          Math.sin(i * 1.35 + 0.6) * 1.1,
          Math.cos(i * 1.1) * 1.6 - (i % 2 === 1 ? 0.4 : 0),
        ),
      );
    }
    return pts;
  }

  /** Total width of the path, used by the camera to frame the whole timeline. */
  get width(): number {
    return (this.points.length - 1) * MILESTONE_STEP + 3;
  }

  /** Converts a curve parameter t (0..1, milestone i sits at i/(n-1)) to the fraction of tube length. */
  fractionAtT(t: number): number {
    const clamped = Math.min(1, Math.max(0, t));
    const f = clamped * SAMPLES;
    const lo = Math.floor(f);
    const hi = Math.min(SAMPLES, lo + 1);
    return this.arc[lo] + (this.arc[hi] - this.arc[lo]) * (f - lo);
  }

  /** Reveal the gold tube up to curve parameter t. */
  setProgress(t: number): void {
    const frac = this.fractionAtT(t);
    const segments = Math.floor(frac * TUBULAR_SEGMENTS);
    this.progressGeometry.setDrawRange(0, segments * RADIAL_SEGMENTS * 6);
  }

  dispose(): void {
    this.baseGeometry.dispose();
    this.progressGeometry.dispose();
    this.dropGeometry.dispose();
    this.materials.forEach((m) => m.dispose());
  }
}
