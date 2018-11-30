(function() {
  //----------
  window.App = {
    // DOM Variables
    projectLinks: document.querySelectorAll('.left-experiment-list-item'),
    canvasContainer: document.querySelector('#main-canvas-container'),
    rightViewport: document.querySelector('.right'),
    // viewportSize: getViewportSize(),
    rightIntro: document.querySelector('.intro'),
    rightCornerTitle: document.querySelector('.right-corner-title'),
    rightCornerGitHubLink: document.querySelector('.right-corner-github'),
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    projects: [
      {
        key: 0,
        id: 'Intro',
        githubUrl: 'http://www.github.com/seanthaswan',
        scriptUrl: ''
      },
      {
        key: 1,
        id: 'Donuts',
        githubUrl: 'http://www.github.com/seanthaswan',
        scriptUrl: 'js/donutScene.js'
      },
      {
        key: 2,
        id: 'Saturn',
        githubUrl: 'http://www.github.com/seanthaswan',
        scriptUrl: 'js/saturnScene.js'
      },
      {
        key: 3,
        id: 'Butterfly',
        githubUrl: 'http://www.github.com/seanthaswan',
        scriptUrl: 'js/butterflyScene.js'
      },
      {
        key: 4,
        id: 'Text',
        githubUrl: 'http://www.github.com/seanthaswan',
        scriptUrl: 'js/butterflyScene.js'
      }
    ],

    //----------
    initPage: function() {
      var self = this;

      this.projectLinks.forEach(function(project) {
        project.addEventListener('click', function(event) {
          self.handleProjectSelection(event);
          self.setSelectedLink(event);
        });
      });
    },

    //----------
    handleProjectSelection: function(e) {

      this.selectedProject = this.projects.filter(function(project) {
        return project.id === e.target.dataset.id;
      });

      var script = document.createElement('script');
      script.onload = function() {
        console.log('script loaded');
      }
      script.src = this.selectedProject[0].scriptUrl;
      document.body.appendChild(script);


      this.rightCornerTitle.innerText = this.selectedProject[0].id;
      this.rightCornerGitHubLink.href = this.selectedProject[0].githubUrl;
    },

    //----------
    cleanUpScene: function() {
      this.scene.traverse(function(object) {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (object.material.map) object.material.map.dispose();
          object.material.dispose();
        }
        this.scene.remove(object);
      });
    },

    //----------
    getRandomColor: function() {
      return Math.random() * 0xff0000;
    },

    //----------
    randomInRange: function(from, to) {
      var x = Math.random() * (to - from);
      return x + from;
    },

    //----------
    resizeCanvas: function() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    },


    //----------
    toArray: function(obj) {
      var array = [];
      // iterate backwards ensuring that length is an UInt32
      for (var i = obj.length >>> 0; i--; ) {
        array[i] = obj[i];
      }
      return array;
    },

    //----------
    getViewportSize: function() {
      return {
        width: rightViewport.getBoundingClientRect().width,
        height: rightViewport.getBoundingClientRect().height
      };
    },

    //----------
    setSelectedLink: function(e) {
      this.projectLinks.forEach(function(project) {
        project.classList.remove('selected');
      });
      e.currentTarget.classList.add('selected');
    }
  }
})();
App.initPage();
  // //----------
  // function handleProjectSelection(event, projectId) {
  //   projectLinks.forEach(function(project) {
  //     project.classList.remove('selected');
  //   });
  //
  //   selectedProject = event.currentTarget.dataset.id;
  //   rightCornerTitle.innerText = selectedProject;
  //   event.currentTarget.classList.add('selected');
  //
  //   if (projectId !== 'Intro') {
  //     rightIntro.classList.add('hidden');
  //     canvasContainer.classList.remove('hidden');
  //     window.addEventListener('resize', resizeCanvas, false);
  //   } else {
  //     rightIntro.classList.remove('hidden');
  //     canvasContainer.classList.add('hidden');
  //   }
  //
  //   if (projectId !== 'Donuts') {
  //     donutClickPrompt.classList.add('hidden');
  //     cancelAnimationFrame( donutLoopId );
  //   }
  //
  //   if (projectId !== 'Saturn') {
  //     cancelAnimationFrame( saturnLoopId );
  //   }
  //
  //   if (projectId === 'Donuts') {
  //     changeGitHubHref(projectId);
  //     initDonuts();
  //   } else if (projectId === 'Saturn') {
  //     changeGitHubHref(projectId);
  //     initSaturn();
  //   } else if (projectId === 'Thing 1') {
  //     changeGitHubHref(projectId);
  //   } else if (projectId === 'Thing 2') {
  //     changeGitHubHref(projectId);
  //   }
  // }
