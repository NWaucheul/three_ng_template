import { CanvasSize } from 'src/app/models/types';
import * as THREE from 'three';

const DEVICE_PIXEL_RATIO = 2;

export const Renderer = {
  create(canvas: HTMLCanvasElement, canvasSize: CanvasSize): THREE.WebGLRenderer {
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      // NOTE: preserverDrawingBuffer possibly reduce performances.
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance',
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, DEVICE_PIXEL_RATIO));
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.physicallyCorrectLights = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(canvasSize.width, canvasSize.height);

    return renderer;
  }
}
