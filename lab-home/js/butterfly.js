let butterfly;

//----------
let initButterfly = () => {
  scene = new THREE.scene();
  scene.background = new THREE.Color(0xababab);

  camera = new THREE.PerspectiveCamera(
    45,
    (window.innerWidth - 296) / window.innerHeight,
    1,
    1000
  );

  renderer = new THREE.WebGLRenderer({ canvas: mainCanvasContainer})
}
