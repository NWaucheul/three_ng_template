import * as THREE from 'three';


export class Light {
  ambiantLight: THREE.AmbientLight;

  constructor() {

    // Ambiant
    this.ambiantLight = new THREE.AmbientLight();
    this.ambiantLight.intensity = 3;
  }
}
