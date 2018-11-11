(function() {
  let selectedProject = "";
  let projects = [];
  let projectLinks = document.querySelectorAll(".left-experiment-list-item");
  let canvasContainer = document.querySelector("#main-canvas-container");

  let rightViewport = document.querySelector(".right");
  let viewportSize = getViewportSize();

  let rightIntro = document.querySelector(".intro");
  let rightCornerTitle = document.querySelector(".right-corner-title");
  let rightCornerGitHubLink = document.querySelector(".right-corner-github");

  let scene, camera, renderer;

  let donuts = [];
  let torus;
  let floor;
  let controls;
  let startDonutAnimation = false;
  let spinFactor = 0.03;
  let fallFactor = 0.05;

  //----------
  function initPage() {
    projectLinks.forEach(function(project) {
      project.isSelected = toArray(project.classList).indexOf("selected");
      project.id = project.dataset.id;
      projects.push(project);
      project.addEventListener("click", function(event) {
        handleProjectSelection(event, project.id);
      });
    });

    changeGitHubHref(projects[0].id);
  }

  //----------
  function handleProjectSelection(event, projectId) {
    projectLinks.forEach(function(project) {
      project.classList.remove("selected");
    });

    selectedProject = event.currentTarget.dataset.id;
    rightCornerTitle.innerText = selectedProject;
    event.currentTarget.classList.add("selected");

    if (projectId !== "Intro") {
      rightIntro.classList.add("hidden");
      canvasContainer.classList.remove("hidden");
      window.addEventListener("resize", resizeCanvas, false);
    } else {
      rightIntro.classList.remove("hidden");
      canvasContainer.classList.add("hidden");
    }

    if (projectId === "Donuts") {
      changeGitHubHref(projectId);
      initDonuts();
      mainDonutLoop();
    } else if (projectId === "Saturn") {
      changeGitHubHref(projectId);
    } else if (projectId === "Thing 1") {
      changeGitHubHref(projectId);
    } else if (projectId === "Thing 2") {
      changeGitHubHref(projectId);
    }
  }

  //----------
  function cleanUpScene() {
    scene.traverse( function ( object ) {

    	if ( object.geometry ) object.geometry.dispose();
    	if ( object.material ) {
    		if (object.material.map) object.material.map.dispose();
    		object.material.dispose();
    	}
    	scene.remove(object);
    } );
  }

  //----------
  let initDonuts = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xababab);

    camera = new THREE.PerspectiveCamera(
      30,
      (window.innerWidth - 296) / window.innerHeight,
      1,
      1000
    );
    camera.position.set(0, 5, 100);

    renderer = new THREE.WebGLRenderer({ canvas: canvasContainer });
    renderer.setSize(viewportSize.width, viewportSize.height);

    console.log(scene, camera, renderer);
    // controls = new THREE.OrbitControls(camera);
    // camera.position.set( 0, 20, 100 );
    // controls.update();
    //
    // createFloor();
    // handleClickPromptClick();
    // handleDonutClick();
    // Attach the canvasContainer to the DOM.
  };

  //----------
  let mainDonutLoop = () => {
    // if (startDonutAnimation) {
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

    // }

    renderer.render(scene, camera);
    requestAnimationFrame(mainDonutLoop);
  };

  //----------
  let createDonuts = () => {
    // Geometry takes in width, height, depth values, depending on the shape.
    let geometry = new THREE.TorusGeometry(randomInRange(1.7, 2.5), 1, 30, 50);
    // Material takes in an object to configure the geometry's appearance.
    let material = new THREE.MeshBasicMaterial({ color: randomColor() });

    // Assign a new Mesh object to the shape variable and pass in geometry and material.
    torus = new THREE.Mesh(geometry, material);
    torus.position.z = randomInRange(-30, 10);
    torus.position.x = randomInRange(-15, 15);
    torus.position.y = randomInRange(18, 24);
    torus.rotation.y += randomInRange(-5, 5);

    // Add it to the scene.
    scene.add(torus);
    donuts.push({ donut: torus, rotateCW: Math.random() < 0.5 });
  };

  //----------
  let throttleDonuts = () => Math.random() < 0.03;

  //----------
  let randomColor = () => Math.random() * 0xff0000;

  //----------
  let randomInRange = (from, to) => {
    let x = Math.random() * (to - from);
    return x + from;
  };

  //----------
  function changeGitHubHref(projectId) {
    switch (projectId) {
      case "Intro":
        rightCornerGitHubLink.href = "http://www.github.com/seanthaswan";
        break;
      case "Donuts":
        rightCornerGitHubLink.href = "http://www.github.com/seanthaswan";
        break;
      case "Saturn":
        rightCornerGitHubLink.href = "http://www.github.com/seanthaswan";
        break;
      case "Thing 1":
        rightCornerGitHubLink.href = "http://www.github.com/seanthaswan";
        break;
      case "Thing 2":
        rightCornerGitHubLink.href = "http://www.github.com/seanthaswan";
        break;
    }
  }

  //----------
  function resizeCanvas() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  //----------
  function toArray(obj) {
    var array = [];
    // iterate backwards ensuring that length is an UInt32
    for (var i = obj.length >>> 0; i--; ) {
      array[i] = obj[i];
    }
    return array;
  }

  //----------
  function getViewportSize() {
    return {
      width: rightViewport.getBoundingClientRect().width,
      height: rightViewport.getBoundingClientRect().height
    };
  }

  initPage();
})();
