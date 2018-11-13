let saturnRings = [];
let scale = .03;
let saturnLoopId;

//----------
// Initialize scene, camera, objects and renderer.
let initSaturn = () => {
  // Set up the environment scene and color it.
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xababab);

  // Set up the camera and position it.
  camera = new THREE.PerspectiveCamera(
    45,
    (window.innerWidth - 296) / window.innerHeight,
    1,
    1000
  );
  renderer = new THREE.WebGLRenderer({ canvas: canvasContainer });
  renderer.setSize(viewportSize.width, viewportSize.height);

  console.log(scene, camera, renderer);
  controls = new THREE.OrbitControls(camera);
  controls.enablePan = false;
  // How far you can orbit vertically, upper and lower limits.
  // Range is 0 to Math.PI radians.
  controls.minPolarAngle = 0; // radians
  controls.maxPolarAngle = Math.PI / 2; // radians

  // How far you can orbit horizontally, upper and lower limits.
  // If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
  controls.minAzimuthAngle = -Infinity; // radians
  controls.maxAzimuthAngle = Infinity; // radians

  camera.position.set(50, 20, 100);
  controls.update();

  createSaturnMass();
  createSaturnRings();
  mainSaturnLoop();
}

//----------
let mainSaturnLoop = () => {
  saturnLoopId = requestAnimationFrame(mainSaturnLoop);

  console.log(camera.position)
  camera.position.y += 2 * scale;
  camera.position.z += 3 * scale;

  if (camera.position.y <= 10 || camera.position.y >= 30) {
    scale *= -1;
  }

  saturnRings.forEach(ring => ring.rotation.x *=1)

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
    saturnRings.push(ring);
    scene.add(ring);
  }
}
