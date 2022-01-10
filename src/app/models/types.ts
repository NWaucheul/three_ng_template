export interface CanvasSize {
  width: number;
  height: number;
}

export interface AnimationObject {
  mixer: THREE.AnimationMixer,
  duration: number,
  keyFrameSumDuration: number
}

export interface PointerCoords {
  x: number;
  y: number;
}