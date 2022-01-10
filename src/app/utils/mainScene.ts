import { AnimationObject, CanvasSize, PointerCoords } from 'src/app/models/types';
import { Controls } from 'src/app/utils/controls';
import { Light } from 'src/app/utils/light';
import { Renderer } from 'src/app/utils/renderer';
import { XZPlane } from 'src/app/utils/XZPlane';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Title } from './title';


export class MainScene {
  textureLoader = new THREE.TextureLoader();
  scene: THREE.Scene;
  clock: THREE.Clock;
  mixers: AnimationObject[] = [];
  mixer: THREE.AnimationMixer;
  raycaster: THREE.Raycaster;
  XZPlane: THREE.Mesh;
  light: Light;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  renderer: THREE.WebGLRenderer;
  timeTarget = 0;
  animationFrame: number;
  title: THREE.Group;

  constructor() {
    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();

    this.XZPlane = XZPlane.create();
    this.add(this.XZPlane);

    this.raycaster = new THREE.Raycaster();

    this.light = new Light();
    this.add(this.light.ambiantLight);
  }

  initCamera(canvasSizes: CanvasSize) {
    const fov = 50;
    const near = 0.1;
    const far = 5000;
    const ratio = canvasSizes.width / canvasSizes.height;

    this.camera = new THREE.PerspectiveCamera(fov, ratio, near, far);
    this.camera.position.set(0, 0, 10);

    this.add(this.camera);
  }

  updateCamera(canvasSizes: CanvasSize) {
    this.camera.aspect = canvasSizes.width / canvasSizes.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(canvasSizes.width, canvasSizes.height);
  }

  initControls(canvas: HTMLCanvasElement) {
    this.controls = Controls.create(this.camera, canvas);
  }

  add(object: THREE.Object3D) {
    this.scene.add(object);
  }

  remove(object: THREE.Object3D) {
    this.scene.remove(object);
  }

  lockControls() {
    this.controls.enablePan = false;
    this.controls.enableRotate = false;
  }

  unlockControls() {
    this.controls.enablePan = true;
    this.controls.enableRotate = true;
  }

  initRenderer(canvasSizes: CanvasSize, canvas: HTMLCanvasElement) {
    this.renderer = Renderer.create(canvas, canvasSizes);
  }

  getXZIntersections() {
    const intersections = this.raycaster.intersectObject(this.XZPlane);
    return intersections ? intersections[0] : null;
  }

  getObjectsIntersection(objects: THREE.Object3D[]) {
    const intersections = this.raycaster.intersectObjects(objects, true);
    return intersections ? intersections[0] : null;
  }

  CreateTitle() {
    this.title = Title.create(this.textureLoader);
    this.scene.add(this.title);
  }


  tick() {
    // FPS COUNTER
    // this.stats.begin();

    const fpsInterval = 1000 / 60;
    if (Date.now() >= this.timeTarget) {
      this.controls.update();
      this.updateAnimation();
      this.renderer.render(this.scene, this.camera);
      this.timeTarget += fpsInterval;

      if (Date.now() >= this.timeTarget) {
        this.timeTarget = Date.now();
      }
    }

    // FPS COUNTER
    // this.stats.end();

    this.animationFrame = requestAnimationFrame(() => this.tick());
  }

  // ANIMATIONS
  updateAnimation() {
    const delta = this.clock.getDelta();
    this.mixers.forEach((animation, index) => {
      animation.mixer.update(delta);
      if (animation.mixer.time >= animation.duration) {
        this.mixers.splice(index, 1);
      }
    })
  }

  // RAYCASTER
  updateRaycaster(coords: PointerCoords, viewportOffset: DOMRect) {
    const containerOffsetTop = viewportOffset.top;
    const containerOffsetLeft = viewportOffset.left;

    const mouseCoords = {
      x: (coords.x - containerOffsetLeft) / viewportOffset.width * 2 - 1,
      y: - ((coords.y - containerOffsetTop) / viewportOffset.height) * 2 + 1
    }
    this.raycaster.setFromCamera(mouseCoords, this.camera);
  }

  destroy() {
    cancelAnimationFrame(this.animationFrame);
  }
}
