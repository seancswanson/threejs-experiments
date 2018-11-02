let canvasContainer = document.querySelector("#main-canvas-container");
let scene, camera, renderer;
let donuts = [];
let torus;
let floor;
let controls;
let startDonutAnimation = false;
let spinFactor = 0.03;
let fallFactor = 0.05;
let loader = new THREE.FontLoader();
let clickPrompt = document.querySelector('.click-prompt');

// //----------
// loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {
// 	var geometry = new THREE.TextGeometry( 'Click to Make it Rain!', {
// 		font: font,
// 		size: 80,
// 		height: 5,
// 		curveSegments: 12,
// 		bevelEnabled: true,
// 		bevelThickness: 10,
// 		bevelSize: 8,
// 		bevelSegments: 5
// 	} );
// } );

//----------
// Initialize scene, camera, objects and renderer.
let init = () => {
  // Set up the environment scene and color it.
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xababab);

  // Set up the camera and position it.
  camera =  new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 50;

  // Set up the renderer and size it.
  renderer = new THREE.WebGLRenderer();
  renderer.setSize((window.innerWidth / 1.01), (window.innerHeight / 1.09));

  // controls = new THREE.OrbitControls(camera);
  // camera.position.set( 0, 20, 100 );
  // controls.update();

  createFloor();
  handleClickPromptClick();
  handleDonutClick();
  // Attach the canvas to the DOM.
  canvasContainer.appendChild(renderer.domElement);
}

//----------
let mainLoop = () => {
  if (startDonutAnimation) {
    let x = throttleDonuts();

    if (x) {
      createDonuts();
    }

    donuts.forEach((donut, index) => {
      donut.donut.position.y -= 1 * fallFactor;

      if (donut.rotateCW) {
        donut.donut.rotation.y -= 1 * spinFactor;
      } else {
        donut.donut.rotation.y += 1 * spinFactor;
      }

      if (donut.donut.position.y <= -20) {
        scene.remove(donut);
        donut.donut.geometry.dispose();
        donut.donut.material.dispose();
      }
    });

  }

  renderer.render(scene, camera);
  requestAnimationFrame(mainLoop);
}

//----------
let createDonuts = () => {
  // Geometry takes in width, height, depth values, depending on the shape.
  let geometry = new THREE.TorusGeometry(randomInRange(1.7, 2.5), 1, 30, 50);
  // Material takes in an object to configure the geometry's appearance.
  let material = new THREE.MeshBasicMaterial({color: randomColor()})

  // Assign a new Mesh object to the shape variable and pass in geometry and material.
  torus = new THREE.Mesh(geometry, material);
  torus.position.z = randomInRange(-30, 10);
  torus.position.x = randomInRange(-15, 15);
  torus.position.y = randomInRange(18, 24);
  torus.rotation.y += randomInRange(-5, 5);

  // Add it to the scene.
  scene.add(torus);
  donuts.push({donut: torus, rotateCW: Math.random() < .5});
}

//----------
let createFloor = () => {
  let geometry = new THREE.PlaneGeometry(100, 100)
  let material = new THREE.MeshBasicMaterial({color: randomColor()})
  let floor = new THREE.Mesh(geometry, material)
  floor.position.y = -12;
  floor.rotation.y = 2;
  scene.add(floor)
}

//----------
let handleDonutClick = (event) => {

}

//----------
handleClickPromptClick = (event) => {
  clickPrompt.addEventListener('click', function(event) {
    startDonutAnimation = true;
    event.target.remove();
  })
}

//----------
let randomInRange = (from, to) => {
  let x = Math.random() * (to - from);
  return x + from;
}

//----------
let throttleDonuts = () => Math.random() < .03;

//----------
let randomColor = () => Math.random() * 0xff0000;


//----------
init();
mainLoop();
