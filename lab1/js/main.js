let canvasContainer = document.querySelector("#main-canvas-container");
let scene, camera, renderer;
let cube
let factor = 0.05;

//----------
// Initialize scene, camera, objects and renderer.
let init = () => {
  // Set up the environment scene and color it.
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xababab);

  // Set up the camera and position it.
  camera =  new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 10;

  // Set up the renderer and size it.
  renderer = new THREE.WebGLRenderer();
  renderer.setSize((window.innerWidth / 1.1), (window.innerHeight / 1.5));

  // Attach the canvas to the DOM.
  canvasContainer.appendChild(renderer.domElement);
  createCube();
}

//----------
let mainLoop = () => {
  cube.rotation.y += factor;
  cube.position.x += factor;
  console.log(cube.position.x);

  if (cube.position.x <= -2 || cube.position.x >= 2) {
    factor *= -1;
  }

  renderer.render(scene, camera);
  requestAnimationFrame(mainLoop);
}

//----------
let createCube = () => {
  // Geometry takes in width, height, depth values
  let geometry = new THREE.BoxGeometry(.5, .5, .5);
  // Material takes in an object to configure the geometry's appearance.
  let material = new THREE.MeshBasicMaterial({color: 0x00a1cb, wireframe:true})

  // Assign a new Mesh object to the shape variable and pass in geometry and material.
  cube = new THREE.Mesh(geometry, material);

  // Add it to the scene.
  scene.add(cube);
}

//----------
init();
mainLoop();
