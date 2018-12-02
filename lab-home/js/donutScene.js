if (typeof donutScene !== 'object') {
  donutScene = {
    torus: null,
    init: () => {},
    mainLoop: () => {},
    donuts: [],
    floor: null,
    startDonutAnimation: false,
    spinFactor: 0.03,
    fallFactor: 0.05,
    loader: new THREE.FontLoader(),
    clickPrompt: App.donutClickPrompt,
  }
}

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
donutScene.init = () => {
  donutScene.showClickPrompt();

  // Set up the environment scene and color it.
  App.scene = new THREE.Scene();
  App.scene.background = new THREE.Color(0xababab);

  // Set up the camera and position it.
  App.camera =  new THREE.PerspectiveCamera(30, (window.innerWidth - 200) / window.innerHeight, 1, 1000);
  App.camera.position.set(0, 5, 100);

  // Set up the renderer and size it.
  App.renderer = new THREE.WebGLRenderer();
  App.renderer.setSize(App.canvasDimensions.width, App.canvasDimensions.height);

  App.controls = new THREE.OrbitControls(App.camera);
  App.camera.position.set( 0, 20, 100 );
  App.controls.update();

  donutScene.createFloor();
  donutScene.handleClickPromptClick();
  // Attach the canvas to the DOM.
  App.canvasContainer.appendChild(App.renderer.domElement);
}

//----------
donutScene.mainLoop = () => {
  App.donutLoopId = requestAnimationFrame(donutScene.mainLoop);

  if (donutScene.startDonutAnimation) {
    let x = donutScene.throttleDonuts();

    if (x) {
      donutScene.createDonuts();
    }

    donutScene.donuts.forEach((donut, index) => {
      donut.donut.position.y -= 1 * donutScene.fallFactor;

      if (donut.rotateCW) {
        donut.donut.rotation.y -= 1 * donutScene.spinFactor;
      } else {
        donut.donut.rotation.y += 1 * donutScene.spinFactor;
      }

      if (donut.donut.position.y <= -20) {
        App.scene.remove(donut);
        donut.donut.geometry.dispose();
        donut.donut.material.dispose();
      }
    });

  }

  App.renderer.render(App.scene, App.camera);
}

//----------
donutScene.createDonuts = () => {
  // Geometry takes in width, height, depth values, depending on the shape.
  let geometry = new THREE.TorusGeometry(App.randomInRange(1.7, 2.5), 1, 30, 50);
  // Material takes in an object to configure the geometry's appearance.
  let material = new THREE.MeshBasicMaterial({color: App.getRandomColor()})

  // Assign a new Mesh object to the shape variable and pass in geometry and material.
  donutScene.torus = new THREE.Mesh(geometry, material);
  donutScene.torus.position.z = App.randomInRange(-30, 30);
  donutScene.torus.position.x = App.randomInRange(-40, 40);
  donutScene.torus.position.y = App.randomInRange(18, 24);
  donutScene.torus.rotation.y += App.randomInRange(-5, 5);

  // Add it to the scene.
  App.scene.add(donutScene.torus);
  donutScene.donuts.push({donut: donutScene.torus, rotateCW: Math.random() < .5});
}

//----------
donutScene.createFloor = () => {
  var texture = new THREE.TextureLoader()
              .load('../img/textures/grass.jpg', function ( texture ) {
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                texture.offset.set( 0, 0 );
                texture.repeat.set( 5, 5 );
  });
  let geometry = new THREE.PlaneGeometry(100, 70);
  let material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide});
  donutScene.floor = new THREE.Mesh(geometry, material);
  App.scene.add(donutScene.floor);
  donutScene.floor.position.set(0,-10,0);
  donutScene.floor.rotation.set(90,0,0);
}

//----------
donutScene.handleClickPromptClick = (event) => {
  donutScene.clickPrompt.addEventListener('click', function(event) {
    donutScene.startDonutAnimation = true;
    event.target.classList.add('hidden');
  })
}

//----------
donutScene.showClickPrompt = () => {
  donutScene.clickPrompt.classList.remove('hidden');
}

//----------
donutScene.throttleDonuts = () => Math.random() < .03;

//----------
donutScene.init();
donutScene.mainLoop();
