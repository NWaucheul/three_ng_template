import * as THREE from 'three';

export const XZPlane = {
  create: () => {
    const XZPlane = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(200, 200),
      new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0
      })
    );

    XZPlane.position.y = -0.05; // To avoid pixel fighting when you zoom out
    XZPlane.rotation.x = - Math.PI * 0.5;
    XZPlane.name = 'XZPlane';

    return XZPlane;
  }
};
