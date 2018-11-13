let donutClickPrompt = document.querySelector('.donut-click-prompt');
let startDonutAnimation;
let donutAnimationId;
let donutSpinFactor = 0.03;
let donutFallFactor = 0.09;
let donuts = [];
let donutFloor;
let donutTorus;

//----------
let initDonuts = () => {
  startDonutAnimation = false;
  donutClickPrompt.classList.remove('hidden');
  donuts = [];

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87cefa);
  scene.fog = new THREE.Fog(0x87cefa, 0.005, 600);

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

  camera.position.set(0, 8.5, 60);
  controls.update();

  createDonutSkyDome();
  createDonutFloor();
  handleDonutPromptClick();
  mainDonutLoop();
};

//----------
let mainDonutLoop = () => {
  donutLoopId = requestAnimationFrame(mainDonutLoop);

  if (startDonutAnimation) {
    let x = throttleDonuts();

    if (x) {
      createDonuts();
    }

    donuts.forEach((donut, index) => {
      donut.donut.position.y -= 1 * donutFallFactor;

      if (donut.rotateCW) {
        donut.donut.rotation.y -= 1 * donutSpinFactor;
      } else {
        donut.donut.rotation.y += 1 * donutSpinFactor;
      }

      if (donut.donut.position.y <= -20) {
        donuts.splice(donuts.indexOf(donut), 1);
        scene.remove(donut.donut);
        donut.donut.geometry.dispose();
        donut.donut.material.dispose();
      }
    });
  }

  renderer.render(scene, camera);
};

//----------
let createDonutSkyDome = () => {
  let geometry = new THREE.SphereGeometry(400, 60, 40);

  let uniforms = {
    texture: {
      type: 't',
      value: new THREE.TextureLoader().load('../img/textures/sky.jpg')
    }
  };

  let material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: document.getElementById('sky-vertex').textContent,
    fragmentShader: document.getElementById('sky-fragment').textContent
  });

  let skybox = new THREE.Mesh(geometry, material);
  skybox.material.side = THREE.BackSide;
  skybox.scale.set(1, -1, 1);
  skybox.rotation.order = 'XYZ';
  skybox.renderDepth = 1000.0;
  scene.add(skybox);
};

//----------
let createDonuts = () => {
  // Geometry takes in width, height, depth values, depending on the shape.
  let geometry = new THREE.TorusGeometry(randomInRange(1.7, 2.5), 1, 30, 50);
  // Material takes in an object to configure the geometry's appearance.
  let material = new THREE.MeshBasicMaterial({ color: randomColor() });

  // Assign a new Mesh object to the shape variable and pass in geometry and material.
  donutTorus = new THREE.Mesh(geometry, material);
  donutTorus.position.set(
    randomInRange(-120, 120),
    randomInRange(40, 50),
    randomInRange(-120, 120)
  );

  donutTorus.rotation.y += randomInRange(-2, 1);

  // Add it to the scene.
  scene.add(donutTorus);
  donuts.push({ donut: donutTorus, rotateCW: Math.random() < 0.5 });
};

//----------
let createDonutFloor = () => {
  var texture = new THREE.TextureLoader().load(
    '../img/textures/grass.jpg',
    function(texture) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.offset.set(0, 0);
      texture.repeat.set(4, 4);
    }
  );
  let geometry = new THREE.PlaneGeometry(300, 300);
  let material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide
  });
  let donutFloor = new THREE.Mesh(geometry, material);
  scene.add(donutFloor);
  donutFloor.position.set(0, -10, 0);
  donutFloor.rotation.set(Math.PI / 2, 0, 0);
};

//----------
handleDonutPromptClick = event => {
  donutClickPrompt.addEventListener('click', function(event) {
    startDonutAnimation = true;
    donutClickPrompt.classList.add('hidden');
  });
};

//----------
let throttleDonuts = () => Math.random() < 0.1;
