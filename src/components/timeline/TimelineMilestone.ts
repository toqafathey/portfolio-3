import * as THREE from 'three';

/** Geometries shared by every milestone so only one copy lives on the GPU. */
export interface SharedMilestoneAssets {
  core: THREE.BufferGeometry;
  ring: THREE.BufferGeometry;
  hit: THREE.BufferGeometry;
  hitMaterial: THREE.Material;
}

export function createSharedAssets(): SharedMilestoneAssets {
  return {
    core: new THREE.IcosahedronGeometry(0.34, 1),
    ring: new THREE.TorusGeometry(0.64, 0.011, 8, 72),
    hit: new THREE.SphereGeometry(0.78, 12, 12),
    hitMaterial: new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }),
  };
}

export function disposeSharedAssets(a: SharedMilestoneAssets): void {
  a.core.dispose();
  a.ring.dispose();
  a.hit.dispose();
  a.hitMaterial.dispose();
}

export interface MilestoneState {
  selected: boolean;
  hovered: boolean;
  reached: boolean;
}

/** One clickable career marker: a faceted ivory core, a thin champagne ring and an invisible hit sphere. */
export class TimelineMilestone {
  readonly group = new THREE.Group();
  readonly hit: THREE.Mesh;
  readonly position: THREE.Vector3;
  private readonly core: THREE.Mesh;
  private readonly ring: THREE.Mesh;
  private readonly coreMaterial: THREE.MeshStandardMaterial;
  private readonly ringMaterial: THREE.MeshBasicMaterial;
  private scale = 1;

  constructor(
    readonly index: number,
    position: THREE.Vector3,
    readonly pending: boolean,
    assets: SharedMilestoneAssets,
  ) {
    this.position = position.clone();
    this.group.position.copy(position);

    this.coreMaterial = new THREE.MeshStandardMaterial({
      color: pending ? 0x8c8881 : 0xf5f1e9,
      roughness: 0.62,
      metalness: 0.05,
      flatShading: true,
      emissive: 0xb9a276,
      emissiveIntensity: 0,
      wireframe: pending, // pending entries read as unconfirmed outlines
      transparent: pending,
      opacity: pending ? 0.8 : 1,
    });
    this.ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xb9a276,
      transparent: true,
      opacity: 0.25,
    });

    this.core = new THREE.Mesh(assets.core, this.coreMaterial);
    this.ring = new THREE.Mesh(assets.ring, this.ringMaterial);
    this.ring.rotation.x = Math.PI / 2.6;
    this.ring.rotation.y = 0.4 + index * 0.35;

    this.hit = new THREE.Mesh(assets.hit, assets.hitMaterial);
    this.hit.userData.index = index;

    this.group.add(this.core, this.ring, this.hit);
  }

  update(dt: number, time: number, state: MilestoneState, reduced: boolean): void {
    const targetScale = state.selected ? 1.45 : state.hovered ? 1.25 : 1;
    const k = reduced ? 1 : 1 - Math.exp(-dt * 8);
    this.scale += (targetScale - this.scale) * k;
    this.core.scale.setScalar(this.scale);
    this.ring.scale.setScalar(0.9 + (this.scale - 1) * 0.6 + 0.1);

    const targetRing = state.selected ? 1 : state.hovered ? 0.85 : state.reached ? 0.6 : 0.22;
    this.ringMaterial.opacity += (targetRing - this.ringMaterial.opacity) * k;

    const targetGlow = state.selected ? 0.32 : state.hovered ? 0.18 : state.reached ? 0.07 : 0;
    this.coreMaterial.emissiveIntensity += (targetGlow - this.coreMaterial.emissiveIntensity) * k;

    if (!reduced) {
      this.ring.rotation.z += dt * 0.25;
      this.core.rotation.y += dt * 0.15;
      this.group.position.y = this.position.y + Math.sin(time * 0.8 + this.index * 1.3) * 0.05;
    } else {
      this.group.position.y = this.position.y;
    }
  }

  dispose(): void {
    // geometries and the hit material are shared and disposed by the owner
    this.coreMaterial.dispose();
    this.ringMaterial.dispose();
  }
}
