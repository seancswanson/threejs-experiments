let canvasContainer = document.querySelector('#main-canvas-container');
let scene, camera, renderer;
let controls;

//----------
let randomInRange = (from, to) => {
  let x = Math.random() * (to - from);
  return x + from;
}

//----------
// Initialize scene, camera, objects and renderer.
let init = () => {
  // Set up the environment scene and color it.
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xababab);

  // Set up the camera and position it.
  camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(0, 5, 20);

  // Set up the renderer and size it.
  renderer = new THREE.WebGLRenderer();
  renderer.setSize((window.innerWidth / 1.01), (window.innerHeight / 1.09));

  controls = new THREE.OrbitControls( camera );

  //controls.update() must be called after any manual changes to the camera's transform
  camera.position.set( 0, 20, 100 );
  controls.update();

  var light = new THREE.AmbientLight( 0x404040 ); // soft white light
  scene.add( light );

  // Attach the canvas to the DOM.
  canvasContainer.appendChild(renderer.domElement);

  createButterfly();
}

//----------
let mainLoop = () => {
  requestAnimationFrame(mainLoop);

  controls.update();
  renderer.render(scene, camera);
}

//----------
init();
mainLoop();
