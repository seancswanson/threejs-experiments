let canvasContainer = document.querySelector('#main-canvas-container');
let scene, camera, renderer;
let flapFactor = 0.8;
let butterfly;
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
  camera.position.set(0, 5, 30);

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

  let leftWing = butterfly.geometry.vertices[2];
  let rightWing = butterfly.geometry.vertices[3];

  leftWing.y += flapFactor;
  rightWing.y += flapFactor;

  butterfly.geometry.verticesNeedUpdate = true;

  if (leftWing.y >= 5 || leftWing.y <= -4) {
    flapFactor *= -1;
  }


  requestAnimationFrame(mainLoop);
  controls.update();
  renderer.render(scene, camera);
}

//----------
let createButterfly = () => {
  // Geometry takes in width, height, depth values, depending on the shape.
  let geometry = new THREE.Geometry();

  geometry.vertices.push( new THREE.Vector3(0, 0, 0));
  geometry.vertices.push( new THREE.Vector3(5, 0, 0));
  geometry.vertices.push( new THREE.Vector3(2, 4, 3));
  geometry.vertices.push( new THREE.Vector3(2, 4, -3));

  // Make Wing face
  geometry.faces.push( new THREE.Face3(0, 1, 2));
  geometry.faces.push( new THREE.Face3(0, 1, 3));
  // Material takes in an object to configure the geometry's appearance.
  let material = new THREE.MeshPhongMaterial( {color: 0xffffff, side: THREE.DoubleSide, vertexColors: THREE.FaceColors});

  for (let i = 0; i < geometry.faces.length; i++) {
    let face = geometry.faces[i];
    face.color.setHex(Math.random() * 0xffffff);
    for (let j = 0; j < 3; j++) {
      color = new THREE.Color( 0xffffff );
      color.setHex(Math.random() * 0xffffff);
      face.vertexColors[j] = color;
    }
  }

  // Assign a new Mesh object to the shape variable and pass in geometry and material.
  butterfly = new THREE.Mesh(geometry, material);
  butterfly.dynamic = true;
  butterfly.geometry.colorsNeedUpdate = true;

  butterfly.rotation.z = 0.7;
  butterfly.rotation.x = 0.6;

  // Add it to the scene.
  scene.add(butterfly);
}

//----------
init();
mainLoop();
