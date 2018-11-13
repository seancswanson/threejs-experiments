  let selectedProject = '';
  let projects = [];
  let projectLinks = document.querySelectorAll('.left-experiment-list-item');
  let canvasContainer = document.querySelector('#main-canvas-container');

  let rightViewport = document.querySelector('.right');
  let viewportSize = getViewportSize();

  let rightIntro = document.querySelector('.intro');
  let rightCornerTitle = document.querySelector('.right-corner-title');
  let rightCornerGitHubLink = document.querySelector('.right-corner-github');

  let scene, camera, renderer;

  let controls;

  //----------
  function initPage() {
    projectLinks.forEach(function(project) {
      project.isSelected = toArray(project.classList).indexOf('selected');
      project.id = project.dataset.id;
      projects.push(project);
      project.addEventListener('click', function(event) {
        handleProjectSelection(event, project.id);
      });
    });

    changeGitHubHref(projects[0].id);
  }

  //----------
  function handleProjectSelection(event, projectId) {
    projectLinks.forEach(function(project) {
      project.classList.remove('selected');
    });

    selectedProject = event.currentTarget.dataset.id;
    rightCornerTitle.innerText = selectedProject;
    event.currentTarget.classList.add('selected');

    if (projectId !== 'Intro') {
      rightIntro.classList.add('hidden');
      canvasContainer.classList.remove('hidden');
      window.addEventListener('resize', resizeCanvas, false);
    } else {
      rightIntro.classList.remove('hidden');
      canvasContainer.classList.add('hidden');
    }

    if (projectId !== 'Donuts') {
      donutClickPrompt.classList.add('hidden');
      cancelAnimationFrame( donutLoopId );
    }

    if (projectId !== 'Saturn') {
      cancelAnimationFrame( saturnLoopId );
    }

    if (projectId === 'Donuts') {
      changeGitHubHref(projectId);
      initDonuts();
    } else if (projectId === 'Saturn') {
      changeGitHubHref(projectId);
      initSaturn();
    } else if (projectId === 'Thing 1') {
      changeGitHubHref(projectId);
    } else if (projectId === 'Thing 2') {
      changeGitHubHref(projectId);
    }
  }

  //----------
  function cleanUpScene() {
    scene.traverse(function(object) {
      if (object.geometry) object.geometry.dispose();
      if (object.material) {
        if (object.material.map) object.material.map.dispose();
        object.material.dispose();
      }
      scene.remove(object);
    });
  }

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
      case 'Intro':
        rightCornerGitHubLink.href = 'http://www.github.com/seanthaswan';
        break;
      case 'Donuts':
        rightCornerGitHubLink.href = 'http://www.github.com/seanthaswan';
        break;
      case 'Saturn':
        rightCornerGitHubLink.href = 'http://www.github.com/seanthaswan';
        break;
      case 'Thing 1':
        rightCornerGitHubLink.href = 'http://www.github.com/seanthaswan';
        break;
      case 'Thing 2':
        rightCornerGitHubLink.href = 'http://www.github.com/seanthaswan';
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
