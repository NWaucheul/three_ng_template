import * as THREE from 'three';



export const Title = {
  create(_textureLoader: THREE.TextureLoader): THREE.Group {
    const group = new THREE.Group();

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0, 0);
    group.add(cube);
    return group;
  }
}
