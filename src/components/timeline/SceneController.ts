import * as THREE from 'three';
import { TimelinePath } from './TimelinePath';
import {
  TimelineMilestone,
  createSharedAssets,
  disposeSharedAssets,
  type SharedMilestoneAssets,
} from './TimelineMilestone';

export interface SceneOptions {
  canvas: HTMLCanvasElement;
  container: HTMLElement;
  /** One flag per milestone: true renders the unconfirmed (outline) style. */
  pending: boolean[];
  compact: boolean;
  reducedMotion: boolean;
  onSelect: (index: number) => void;
  onHover: (index: number | null, x: number, y: number) => void;
  onFailure: () => void;
}

const FOV = 38;

/**
 * Owns the Three.js scene: renderer, camera, lights, path, milestones and particles.
 * React talks to it through a handful of setters; it renders on demand and only
 * runs a continuous loop while visible and motion is allowed.
 */
export class SceneController {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 80);
  private readonly path: TimelinePath;
  private readonly assets: SharedMilestoneAssets;
  private readonly milestones: TimelineMilestone[] = [];
  private readonly hitMeshes: THREE.Object3D[] = [];
  private readonly particles: THREE.Points | null = null;
  private readonly focusLight: THREE.PointLight;
  private readonly raycaster = new THREE.Raycaster();
  private readonly pointer = new THREE.Vector2();
  private readonly resizeObserver: ResizeObserver;

  private selected: number | null = null;
  private pointerHover: number | null = null;
  private externalHover: number | null = null;
  private progressTarget = 0;
  private progressShown = 0;
  private active = false;
  private reduced: boolean;
  private disposed = false;
  private raf = 0;
  private last = 0;
  private time = 0;
  private parallax = new THREE.Vector2();
  private readonly focusTarget = new THREE.Vector3();

  private readonly camPos = new THREE.Vector3();
  private readonly camLook = new THREE.Vector3();
  private readonly camPosTarget = new THREE.Vector3();
  private readonly camLookTarget = new THREE.Vector3();
  private cameraInitialised = false;

  constructor(private readonly opts: SceneOptions) {
    this.reduced = opts.reducedMotion;

    // Throws if WebGL cannot initialise; the React wrapper catches it and shows the 2D fallback.
    this.renderer = new THREE.WebGLRenderer({
      canvas: opts.canvas,
      antialias: !opts.compact,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setClearColor(0x000000, 0);

    this.scene.fog = new THREE.Fog(0x101010, 16, 34);

    // Lighting: soft ambient, warm key, champagne rim and a small focus light that follows the selection.
    this.scene.add(new THREE.AmbientLight(0xf5f1e9, 0.75));
    const key = new THREE.DirectionalLight(0xfff1dc, 1.5);
    key.position.set(4, 6, 6);
    this.scene.add(key);
    const rim = new THREE.DirectionalLight(0xb9a276, 0.6);
    rim.position.set(-6, 2, -4);
    this.scene.add(rim);
    this.focusLight = new THREE.PointLight(0xb9a276, 0.9, 9, 2);
    this.scene.add(this.focusLight);

    this.path = new TimelinePath(opts.pending.length);
    this.scene.add(this.path.group);

    this.assets = createSharedAssets();
    opts.pending.forEach((pending, i) => {
      const m = new TimelineMilestone(i, this.path.points[i], pending, this.assets);
      this.milestones.push(m);
      this.hitMeshes.push(m.hit);
      this.scene.add(m.group);
    });

    this.particles = this.createParticles(opts.compact ? 50 : 110);
    if (this.particles) {
      this.particles.visible = !this.reduced;
      this.scene.add(this.particles);
    }

    opts.canvas.addEventListener('pointermove', this.onPointerMove);
    opts.canvas.addEventListener('pointerleave', this.onPointerLeave);
    opts.canvas.addEventListener('click', this.onClick);
    opts.canvas.addEventListener('webglcontextlost', this.onContextLost);

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(opts.container);
    this.resize();
    this.requestRender();
  }

  // ---------- public API ----------

  setSelected(index: number | null): void {
    this.selected = index;
    this.requestRender();
  }

  setExternalHover(index: number | null): void {
    this.externalHover = index;
    this.requestRender();
  }

  /** t is the curve parameter 0..1; milestone i sits at i/(n-1). */
  setProgress(t: number): void {
    this.progressTarget = Math.min(1, Math.max(0, t));
    this.requestRender();
  }

  setActive(active: boolean): void {
    if (this.active === active) return;
    this.active = active;
    if (active) this.requestRender();
  }

  setReducedMotion(reduced: boolean): void {
    this.reduced = reduced;
    if (this.particles) this.particles.visible = !reduced;
    this.requestRender();
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;

    const { canvas } = this.opts;
    canvas.removeEventListener('pointermove', this.onPointerMove);
    canvas.removeEventListener('pointerleave', this.onPointerLeave);
    canvas.removeEventListener('click', this.onClick);
    canvas.removeEventListener('webglcontextlost', this.onContextLost);
    this.resizeObserver.disconnect();

    this.milestones.forEach((m) => m.dispose());
    disposeSharedAssets(this.assets);
    this.path.dispose();
    if (this.particles) {
      this.particles.geometry.dispose();
      (this.particles.material as THREE.Material).dispose();
    }
    this.renderer.dispose();
    this.renderer.forceContextLoss();
  }

  // ---------- internals ----------

  private createParticles(count: number): THREE.Points {
    // deterministic pseudo-random so the layout is stable between renders
    let seed = 7;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    const w = this.path.width / 2 + 2;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand() * 2 - 1) * w;
      positions[i * 3 + 1] = (rand() * 2 - 1) * 3.6;
      positions[i * 3 + 2] = (rand() * 2 - 1) * 4.5;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0xb9a276,
      size: 0.035,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    });
    return new THREE.Points(geometry, material);
  }

  private resize(): void {
    if (this.disposed) return;
    const { container } = this.opts;
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (w === 0 || h === 0) return;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.opts.compact ? 1.5 : 2));
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.cameraInitialised = false; // re-frame instantly after a resize
    this.requestRender();
  }

  private computeCameraTargets(): void {
    const aspect = this.camera.aspect || 1;
    const tanHalf = Math.tan(THREE.MathUtils.degToRad(FOV / 2));

    if (this.selected !== null && this.milestones[this.selected]) {
      const p = this.milestones[this.selected].position;
      const dist = THREE.MathUtils.clamp(6 / Math.min(1, aspect / 1.2), 5.5, 10);
      this.camPosTarget.set(p.x + 0.9, p.y + 0.7, p.z + dist);
      this.camLookTarget.set(p.x, p.y - 0.1, p.z);
    } else {
      const dist = THREE.MathUtils.clamp(this.path.width / (2 * tanHalf * aspect), 10, 30);
      const pan = (this.progressShown - 0.5) * 1.2;
      this.camPosTarget.set(pan, 1.2, dist);
      this.camLookTarget.set(pan * 0.6, -0.2, 0);
    }

    if (!this.reduced && !this.opts.compact) {
      this.camPosTarget.x += this.parallax.x * 0.35;
      this.camPosTarget.y += this.parallax.y * 0.25;
    }
  }

  private shouldAnimate(): boolean {
    return this.active && !this.reduced;
  }

  requestRender(): void {
    if (this.raf || this.disposed) return;
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.frame);
  }

  private frame = (now: number): void => {
    this.raf = 0;
    if (this.disposed) return;
    const dt = Math.min(0.05, (now - this.last) / 1000 || 0.016);
    this.last = now;
    this.time += dt;
    this.update(dt);
    this.renderer.render(this.scene, this.camera);
    if (this.shouldAnimate()) this.raf = requestAnimationFrame(this.frame);
  };

  private update(dt: number): void {
    const reduced = this.reduced;
    const k = reduced ? 1 : 1 - Math.exp(-dt * 2.6);

    this.progressShown += (this.progressTarget - this.progressShown) * (reduced ? 1 : 1 - Math.exp(-dt * 4));
    this.path.setProgress(this.progressShown);

    const hovered = this.pointerHover ?? this.externalHover;
    this.milestones.forEach((m, i) => {
      const t = this.milestones.length > 1 ? i / (this.milestones.length - 1) : 0;
      m.update(
        dt,
        this.time,
        {
          selected: this.selected === i,
          hovered: hovered === i,
          reached: this.progressShown >= t - 0.001,
        },
        reduced,
      );
    });

    // focus light follows the selected (or hovered) milestone
    const focusIndex = this.selected ?? hovered;
    if (focusIndex !== null && this.milestones[focusIndex]) {
      const p = this.milestones[focusIndex].position;
      this.focusTarget.set(p.x, p.y + 1.2, p.z + 1.8);
      this.focusLight.position.lerp(this.focusTarget, k);
      this.focusLight.intensity += (0.9 - this.focusLight.intensity) * k;
    } else {
      this.focusLight.intensity += (0.25 - this.focusLight.intensity) * k;
    }

    if (this.particles && !reduced) this.particles.rotation.y += dt * 0.01;

    this.computeCameraTargets();
    if (!this.cameraInitialised || reduced) {
      this.camPos.copy(this.camPosTarget);
      this.camLook.copy(this.camLookTarget);
      this.cameraInitialised = true;
    } else {
      this.camPos.lerp(this.camPosTarget, k);
      this.camLook.lerp(this.camLookTarget, k);
    }
    this.camera.position.copy(this.camPos);
    this.camera.lookAt(this.camLook);
  }

  private pick(clientX: number, clientY: number): number | null {
    const rect = this.opts.canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return null;
    this.pointer.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hits = this.raycaster.intersectObjects(this.hitMeshes, false);
    if (hits.length === 0) return null;
    const idx = hits[0].object.userData.index;
    return typeof idx === 'number' ? idx : null;
  }

  private onPointerMove = (e: PointerEvent): void => {
    const rect = this.opts.canvas.getBoundingClientRect();
    this.parallax.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -(((e.clientY - rect.top) / rect.height) * 2 - 1));
    const idx = e.pointerType === 'touch' ? null : this.pick(e.clientX, e.clientY);
    if (idx !== this.pointerHover) {
      this.pointerHover = idx;
      this.opts.canvas.style.cursor = idx !== null ? 'pointer' : 'default';
      this.opts.onHover(idx, e.clientX - rect.left, e.clientY - rect.top);
    }
    this.requestRender();
  };

  private onPointerLeave = (): void => {
    this.parallax.set(0, 0);
    if (this.pointerHover !== null) {
      this.pointerHover = null;
      this.opts.canvas.style.cursor = 'default';
      this.opts.onHover(null, 0, 0);
    }
    this.requestRender();
  };

  private onClick = (e: MouseEvent): void => {
    const idx = this.pick(e.clientX, e.clientY);
    if (idx !== null) this.opts.onSelect(idx);
  };

  private onContextLost = (e: Event): void => {
    e.preventDefault();
    this.opts.onFailure();
  };
}
