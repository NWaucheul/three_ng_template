
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const enableDamping = true;
const dampingFactor = 0.1;
const minDistance = 1;
const maxDistance = 200;
const rotatingSpeed = 0.2;



export const Controls = {
  create(camera: THREE.Camera, canvas: HTMLElement): OrbitControls {

    const controls = new OrbitControls(camera, canvas);

    controls.enableDamping = enableDamping;
    controls.dampingFactor = dampingFactor;
    controls.minDistance = minDistance;
    controls.maxDistance = maxDistance;
    controls.screenSpacePanning = false;
    controls.rotateSpeed = rotatingSpeed;
    controls.enableRotate = true;

    return controls;
  }
}
