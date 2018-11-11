let canvasContainer = document.querySelector("#main-canvas-container");
let scene, camera, renderer;
let rings = [];
let torus;
let controls;
let factor = .03;

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
  camera =  new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(0, 5, 100);

  // Set up the renderer and size it.
  renderer = new THREE.WebGLRenderer();
  renderer.setSize((window.innerWidth / 1.01), (window.innerHeight / 1.09));

  controls = new THREE.OrbitControls( camera );

  //controls.update() must be called after any manual changes to the camera's transform
  camera.position.set( 0, 20, 100 );
  controls.update();

  // Attach the canvas to the DOM.
  canvasContainer.appendChild(renderer.domElement);

  createSaturnMass();
  createSaturnRings();
}

//----------
let mainLoop = () => {
  requestAnimationFrame(mainLoop);

  console.log(camera.position)
  camera.position.y += 2 * factor;
  camera.position.z += 3 * factor;

  if (camera.position.y <= 10 || camera.position.y >= 30) {
    factor *= -1;
  }

  rings.forEach(ring => ring.rotation.x *=1)

  controls.update();
  renderer.render(scene, camera);
}

//----------
let createSaturnMass = () => {
  // Geometry takes in width, height, depth values, depending on the shape.
  let geometry = new THREE.SphereGeometry(10, 30, 30);
  // Material takes in an object to configure the geometry's appearance.
  let material = new THREE.MeshNormalMaterial({wireframe: true})

  // Assign a new Mesh object to the shape variable and pass in geometry and material.
  planetBody = new THREE.Mesh(geometry, material);

  // Add it to the scene.
  scene.add(planetBody);
}

//----------
let createSaturnRings = () => {
  let radius = 13;
  let tubeRadius = 2;

  for (let i = 0; i < 3; i++) {
    let geometry = new THREE.TorusGeometry(randomInRange(radius - .3, radius + .4), tubeRadius, 2, 50);
    let material = new THREE.MeshNormalMaterial({color: 0xff0000});
    let ring = new THREE.Mesh(geometry, material);
    ring.rotation.x = 80.2;
    ring.rotation.y = 3;
    console.log(ring.rotation)

    radius += 5;
    rings.push(ring);
    scene.add(ring);
  }

}

//----------
init();
mainLoop();
