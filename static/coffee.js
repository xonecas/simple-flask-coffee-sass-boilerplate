(function() {
  var delayedText, three;
  delayedText = function(selector, text) {
    var body, insertLetter, letters, wait;
    body = $(selector);
    text = text || body.data("text");
    letters = text.split('');
    wait = 200;
    insertLetter = function() {
      var tag, task;
      tag = $("<span class='fade out'>" + (letters.shift()) + "</span>");
      body.append(tag);
      task = function() {
        tag.removeClass("out");
        tag.addClass("in");
        if (letters.length) {
          return insertLetter();
        }
      };
      return setTimeout(task, wait);
    };
    return setTimeout(insertLetter, wait);
  };
  three = function() {
    var camera, clientX, clientY, cube, geometry, light, material, middleHorizontal, middleVertical, render, renderer, scene;
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, Math.floor(window.innerWidth / window.innerHeight, 0.1, 1000));
    renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    $("#three-test").html(renderer.domElement);
    geometry = new THREE.BoxGeometry(2, 2, 2);
    material = new THREE.MeshDepthMaterial({
      opacity: 0.1,
      wireframe: true,
      wireframeLinewidth: 0.1
    });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    light = new THREE.AmbientLight(0x404040);
    scene.add(light);
    camera.position.z = 5;
    middleVertical = Math.floor(window.innerHeight / 2);
    middleHorizontal = Math.floor(window.innerWidth / 2);
    clientY = 0;
    clientX = 0;
    document.addEventListener("mousemove", function(ev) {
      clientY = ev.clientY;
      return clientX = ev.clientX;
    });
    render = function() {
      requestAnimationFrame(render);
      if (clientX > 0 && clientX < window.innerWidth) {
        cube.rotation.x = (middleVertical - clientY) / 100;
      } else {
        cube.rotation.x += 0.001;
      }
      if (clientY > 0 && clientY < window.innerHeight) {
        cube.rotation.y = (middleHorizontal - clientX) / 100;
      } else {
        cube.rotation.y += 0.001;
      }
      return renderer.render(scene, camera);
    };
    return render();
  };
  return $(function() {
    delayedText("#smooth");
    return three();
  });
})();
