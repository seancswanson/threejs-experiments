let canvasContainer = document.querySelector("#main-canvas-container");
let scene, camera, renderer;
let donuts = [];
let torus;
let controls;
//----------
// Initialize scene, camera, objects and renderer.
let init = () => {
  // Set up the environment scene and color it.
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xababab);

  // Set up the camera and position it.
  camera =  new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(0, 5, 100);

  // Set up the renderer and size it.
  renderer = new THREE.WebGLRenderer();
  renderer.setSize((window.innerWidth / 1.01), (window.innerHeight / 1.09));

  // controls = new THREE.OrbitControls(camera);
  // camera.position.set( 0, 20, 100 );
  // controls.update();

  // Attach the canvas to the DOM.
  canvasContainer.appendChild(renderer.domElement);
}

//----------
let mainLoop = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(mainLoop);
}

//----------
let createSaturnMass = () => {
  // Geometry takes in width, height, depth values, depending on the shape.
  let geometry = new THREE.TorusGeometry(randomInRange(1.7, 2.5), 1, 30, 50);
  // Material takes in an object to configure the geometry's appearance.
  let material = new THREE.MeshBasicMaterial({color: randomColor()})

  // Assign a new Mesh object to the shape variable and pass in geometry and material.
  planetBody = new THREE.Mesh(geometry, material);

  // Add it to the scene.
  scene.add(planetBody);
}

//----------
let createSaturnRings = () => {
}

//----------
init();
mainLoop();
