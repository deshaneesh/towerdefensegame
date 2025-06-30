let renderer, scene, camera;
let clock;

function initThree() {
  const container = document.getElementById('canvas-container');
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x222222);

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 35, 35);
  camera.lookAt(0, 0, 0);
  window.camera = camera;
  window.renderer = renderer;
  window.scene = scene;

  window.addEventListener('resize', onWindowResize);

  clock = new THREE.Clock();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  const dt = clock.getDelta() * (window.gameSpeedMultiplier || 1);
  if (window.updateEnemies) window.updateEnemies(dt);
  if (window.updateTowers) window.updateTowers(dt, scene);
  if (window.updateFriendlyTanks) window.updateFriendlyTanks(dt);
  
  // Update traps
  if (window.traps) {
    window.traps.forEach(trap => {
      if (trap && trap.update) {
        trap.update(dt);
      }
    });
  }
  
  // Update spaceships
  if (window.spaceships) {
    console.log("🚀 Updating spaceships, count:", window.spaceships.length);
    window.spaceships.forEach((spaceship, index) => {
      if (spaceship && spaceship.update) {
        console.log(`🚀 Updating spaceship ${index}:`, spaceship);
        spaceship.update(dt);
      } else {
        console.log(`🚀 Spaceship ${index} is invalid:`, spaceship);
      }
    });
  } else {
    console.log("🚀 No spaceships array found");
  }
  
  // Update boost button
  if (window.updateBoostButton) {
    window.updateBoostButton(dt);
  }
  
  renderer.render(scene, camera);
}

window.addEventListener('DOMContentLoaded', () => {
  initThree();
  window.initGame(scene);
  window.initUI(scene);
  animate();
}); 