window.health = 20;
window.money = 500;
window.wave = 1;
window.waveInProgress = false;
window.availableTowers = [
  'minigun', 'rpg', 'sniper',
  'medic', 'engineer', 'laser', 'poison', 'freeze', 'rocket', 'plasma', 'gold', 'builder', 'banker', 'demolishinist', 'duckgod', 'general', 'godtower'
];
window.selectedTower = null;
window.traps = [];
window.spaceships = [];
window.friendlyTanks = [];

console.log("🎮 GAME INITIALIZING...");
console.log("🎮 Health:", window.health);
console.log("🎮 Money:", window.money);
console.log("🎮 Available towers:", window.availableTowers);

let sceneRef;

// Global trap array
let traps = [];
window.traps = traps;

// Key sequence for 1337
let keySequence = [];

// Global spaceship array
let spaceships = [];
window.spaceships = spaceships;

// Global boost button reference
let boostButton = null;

window.initGame = function(scene) {
  sceneRef = scene;

  // Randomly select map theme
  let themeRand = Math.random();
  let mapTheme;
  if (themeRand < 0.5) mapTheme = 'grasslands';
  else if (themeRand < 0.85) mapTheme = 'desert';
  else if (themeRand < 0.95) mapTheme = 'metropolis';
  else if (themeRand < 0.999) mapTheme = 'mars';
  else mapTheme = 'universe';
  window.mapTheme = mapTheme;
  console.log('[MAP] Selected theme:', mapTheme);

  // Set ground color/material based on theme
  let groundColor = 0x228B22;
  switch(mapTheme) {
    case 'grasslands':
      groundColor = 0x228B22;
      break;
    case 'desert':
      groundColor = 0xEDC9Af;
      break;
    case 'metropolis':
      groundColor = 0x888888;
      break;
    case 'mars':
      groundColor = 0xB22222;
      break;
    case 'universe':
      groundColor = 0x000000;
      break;
  }
  const groundGeometry = new THREE.PlaneGeometry(80, 80);
  const groundMaterial = new THREE.MeshPhongMaterial({ color: groundColor });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = 0;
  ground.receiveShadow = true;
  scene.add(ground);
  window.ground = ground;

  // Extended curved path (spiral path)
  const pathMaterial = new THREE.MeshPhongMaterial({ color: 0xCCCC00 });
  const pathWidth = 3;
  
  // Use the global PATH_POINTS array for visual path rendering
  const pathPoints = window.PATH_POINTS || [
    {x: -15, z: -20}, // Start
    {x: -10, z: -15},
    {x: -5, z: -10},
    {x: 0, z: -5},
    {x: 5, z: 0},
    {x: 10, z: 5},
    {x: 15, z: 10},
    {x: 10, z: 15},
    {x: 5, z: 20},
    {x: 0, z: 25},
    {x: -5, z: 30},
    {x: -10, z: 35},
    {x: -15, z: 40},
    // Spiral extension
    {x: -20, z: 35},
    {x: -25, z: 30},
    {x: -30, z: 25},
    {x: -35, z: 20},
    {x: -40, z: 15},
    {x: -45, z: 10},
    {x: -50, z: 5},
    {x: -55, z: 0},
    {x: -60, z: -5},
    {x: -65, z: -10},
    {x: -70, z: -15},
    {x: -75, z: -20},
    {x: -80, z: -25},
    {x: -85, z: -30},
    {x: -90, z: -35},
    {x: -95, z: -40},
    {x: -100, z: -45},
    {x: -105, z: -50},
    {x: -110, z: -55},
    {x: -115, z: -60},
    {x: -120, z: -65},
    {x: -125, z: -70},
    {x: -130, z: -75},
    {x: -135, z: -80},
    {x: -140, z: -85},
    {x: -145, z: -90},
    {x: -150, z: -95},
    {x: -155, z: -100},
    {x: -160, z: -105},
    {x: -165, z: -110},
    {x: -170, z: -115},
    {x: -175, z: -120},
    {x: -180, z: -125},
    {x: -185, z: -130},
    {x: -190, z: -135},
    {x: -195, z: -140},
    {x: -200, z: -145},
    {x: -205, z: -150},
    {x: -210, z: -155},
    {x: -215, z: -160},
    {x: -220, z: -165},
    {x: -225, z: -170},
    {x: -230, z: -175},
    {x: -235, z: -180},
    {x: -240, z: -185},
    {x: -245, z: -190},
    {x: -250, z: -195},
    {x: -255, z: -200},
    {x: -260, z: -205},
    {x: -265, z: -210},
    {x: -270, z: -215},
    {x: -275, z: -220},
    {x: -280, z: -225},
    {x: -285, z: -230},
    {x: -290, z: -235},
    {x: -295, z: -240},
    {x: -300, z: -245}, // End
  ];
  
  for (let i = 0; i < pathPoints.length - 1; i++) {
    const start = pathPoints[i];
    const end = pathPoints[i + 1];
    const distance = Math.sqrt((end.x - start.x) ** 2 + (end.z - start.z) ** 2);
    const segments = Math.ceil(distance / 3);
    
    for (let j = 0; j < segments; j++) {
      const t = j / segments;
      const x = start.x + (end.x - start.x) * t;
      const z = start.z + (end.z - start.z) * t;
      
      const pathGeometry = new THREE.BoxGeometry(pathWidth, 0.3, pathWidth);
      const path = new THREE.Mesh(pathGeometry, pathMaterial);
      path.position.set(x, 0.15, z);
      path.castShadow = false;
      path.receiveShadow = true;
      scene.add(path);
    }
  }

  // Add environment based on theme
  switch(mapTheme) {
    case 'grasslands':
      window.addEnvironment(scene);
      break;
    case 'desert':
      window.addDesertEnvironment(scene);
      break;
    case 'metropolis':
      window.addMetropolisEnvironment(scene);
      break;
    case 'mars':
      window.addMarsEnvironment(scene);
      break;
    case 'universe':
      window.addUniverseEnvironment(scene);
      break;
  }

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(10, 20, 10);
  dirLight.castShadow = true;
  scene.add(dirLight);

  // Remove any previous placement handler
  if (window._placementHandler) {
    window.renderer && window.renderer.domElement && window.renderer.domElement.removeEventListener('click', window._placementHandler);
    document.getElementById('canvas-container') && document.getElementById('canvas-container').removeEventListener('click', window._placementHandler);
  }

  // Add a robust placement handler
  window._placementHandler = function(e) {
    const rendererDom = window.renderer ? window.renderer.domElement : document.getElementById('canvas-container');
    const rect = rendererDom.getBoundingClientRect();
    const mouse = {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: -((e.clientY - rect.top) / rect.height) * 2 + 1
    };
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, window.camera);

    // 1. Check for tower intersection
    const towerMeshes = towers.map(t => t.mesh);
    const towerIntersects = raycaster.intersectObjects(towerMeshes);
    if (towerIntersects.length > 0) {
      window.selectedPlacedTower = towerIntersects[0].object.userData.tower;
      window.showTowerInfoPanel(window.selectedPlacedTower);
      return;
    }

    // 2. Check for ground intersection (to place a tower)
    const intersects = raycaster.intersectObject(window.ground);
    if (intersects.length > 0) {
      window.hideTowerInfoPanel();
      window.selectedPlacedTower = null;
      const pos = intersects[0].point;
      const onPath = window.isOnPath(pos);
      if (!onPath) {
        if (!window.availableTowers.includes(window.selectedTowerType)) return;
        let towerCost = 0;
        if (window.selectedTowerType === 'general') towerCost = 5000;
        else if (window.selectedTowerType === 'duckgod') towerCost = 25000;
        else if (window.selectedTowerType === 'godtower') towerCost = 100000;
        else towerCost = window.TOWER_TYPES[window.selectedTowerType].levels[0].cost;
        if (window.money >= towerCost) {
          window.placeTower(scene, window.selectedTowerType, pos);
          if (!['general', 'duckgod', 'godtower'].includes(window.selectedTowerType)) {
            window.money -= towerCost;
          }
          window.updateUI();
        }
      } else {
        alert('You cannot place towers on the path!');
      }
    }
  };
  // Attach to renderer DOM
  window.renderer && window.renderer.domElement && window.renderer.domElement.addEventListener('click', window._placementHandler);

  // Touch support for mobile devices
  const touchHandler = function(e) {
    if (!e.changedTouches || e.changedTouches.length === 0) return;
    const touch = e.changedTouches[0];
    // Create a synthetic event object with clientX/Y so our handler can reuse its logic
    const fakeEvent = {
      clientX: touch.clientX,
      clientY: touch.clientY
    };
    window._placementHandler(fakeEvent);
  };
  window.renderer && window.renderer.domElement && window.renderer.domElement.addEventListener('touchend', touchHandler);
  document.getElementById('canvas-container') && document.getElementById('canvas-container').addEventListener('touchend', touchHandler);

  // Cheat code: Press 'E' to spawn 100 medic-boosted shooters with infinite range
  document.addEventListener('keydown', function(e) {
    // --- CORE CHEAT CODES ---
    if (e.key === '1') {
      console.log("🔓 CHEAT: Reset health to normal!");
      window.health = 20;
      updateUI();
    }
    if (e.key === '3') {
      console.log("🔓 CHEAT: Delete all cheat towers and get infinite money!");
      window.deleteCheatTowersAndGetMoney();
    }
    if (e.key.toLowerCase() === 'e') {
      console.log("🔓 CHEAT: Spawning 100 medic-boosted shooters!");
      window.spawnCheatTowers(scene);
    }
    if (e.key.toLowerCase() === 'i') {
      console.log("🔓 CHEAT: Infinite money!");
      window.money = Infinity;
      updateUI();
    }
    // ...existing cheat code logic continues below...

    // Add key to sequence
    keySequence.push(e.key);
    if (keySequence.length > 4) keySequence.shift();
    if (keySequence.join('') === '1337') {
      console.log("1337 HACKER MODE ACTIVATED!");
      window.spawnSpaceship(scene);
      window.put1337OnTree(scene);
      keySequence = [];
    }
    if (e.key.toLowerCase() === 'f') { window.spawnCheatTanks(scene); }
    if (e.key === 'T') { if (window.loseHealth) window.loseHealth(5); }
    if (e.key === 'Y') { const testEnemy = new Enemy(scene, 'babyZombie'); testEnemy.speed = 100; testEnemy.name = "TEST ENEMY"; testEnemy.isBoss = false; enemies.push(testEnemy); }
    if (e.key === 'Z') { const endEnemy = new Enemy(scene, 'zombie'); endEnemy.pathProgress = 1.0; endEnemy.reachedEnd = true; endEnemy.name = "END ENEMY"; endEnemy.isBoss = false; const endPoint = window.PATH_POINTS[window.PATH_POINTS.length - 1]; endEnemy.mesh.position.set(endPoint.x, 1, endPoint.z); enemies.push(endEnemy); }
    if (e.key.toLowerCase() === 'x') { window.spawnGargantuanZombieWave(); }
    if (e.key === '2') { window.disableStrongestTower(); }
    if (e.key === '4') { window.spawnDuckGod(scene); }
    if (e.key === '5') { window.spawnAdminZombie(scene); }
    if (e.key.toLowerCase() === 'j') { window.currentWave = 1000; updateUI(); }
    if (e.key.toLowerCase() === 'k') { towers.forEach(tower => { scene.remove(tower.mesh); }); towers = []; }
    if (e.key.toLowerCase() === 'l') { towers.forEach(tower => { tower.level = 10; tower.damage *= 100; tower.range *= 2; tower.fireRate *= 0.1; }); }
    if (e.key.toLowerCase() === 'm') { window.money = 999999999; updateUI(); }
    if (e.key.toLowerCase() === 'n') { startWave(); }
    if (e.key.toLowerCase() === 'o') { towers.forEach(tower => { tower.damage = 999999999; tower.range = 1000; tower.fireRate = 0.01; }); }
    if (e.key.toLowerCase() === 'p') { window.gamePaused = !window.gamePaused; }
    if (e.key.toLowerCase() === 'q') { window.health = Infinity; window.money = Infinity; window.currentWave = 9999; updateUI(); }
    if (e.key.toLowerCase() === 'r') { location.reload(); }
    if (e.key.toLowerCase() === 's') { for (let i = 0; i < 1000; i++) { window.spawnEnemy(scene, 'babyZombie'); } }
    if (e.key.toLowerCase() === 't') {
      console.log("🔓 CHEAT: Spawning a trap!");
      const pos = { x: Math.random() * 20 - 10, z: Math.random() * 20 - 10 };
      const trap = new Trap(scene, pos);
      traps.push(trap);
    }
    if (e.key.toLowerCase() === 'u') { if (!window.availableTowers.includes('duckgod')) { window.availableTowers.push('duckgod'); window.updateTowerSelectionUI(); alert("🦆 Duck God unlocked! You can now place it for $25,000."); } }
    if (e.key === 'U') { if (window.selectedTower) { if (window.selectedTower.upgrade()) { window.updateUI(); window.showTowerInfoPanel(window.selectedTower); } else { alert("Cannot upgrade: Not enough money or tower is at max level!"); } } else { alert("Click on a tower first to select it for upgrade!"); } }
    if (e.key.toLowerCase() === 'v') { window.spawnEnemy(scene, 'ironTitan'); }
  });

  // Auto-start waves after a short delay
  window.autoStartWaves();

  // Create the green boost button on a tree
  boostButton = window.createBoostButton(scene);
}

// Spawn trap on the path
window.spawnTrap = function(scene) {
  console.log("💀 Spawning deadly trap on the path...");
  
  try {
    const trap = new Trap(scene);
    window.traps.push(trap);
    console.log("💀 DEADLY TRAP SPAWNED! 💀");
    console.log("💀 Any enemy that touches it will die instantly! 💀");
    console.log("💀 Total traps:", window.traps.length);
  } catch (error) {
    console.error("Error spawning trap:", error);
  }
}

// Trap class
function Trap(scene) {
  this.active = true;
  this.killCount = 0;
  
  // Create trap mesh (spiky death trap)
  this.mesh = new THREE.Group();
  
  // Base platform
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(2, 2, 0.5, 16),
    new THREE.MeshPhongMaterial({ 
      color: 0x8B0000,
      emissive: 0x8B0000,
      emissiveIntensity: 0.3
    })
  );
  base.position.y = 0.25;
  
  // Spikes (deadly weapons)
  for (let i = 0; i < 12; i++) {
    const spike = new THREE.Mesh(
      new THREE.ConeGeometry(0.3, 1.5, 8),
      new THREE.MeshPhongMaterial({ 
        color: 0xFF0000,
        emissive: 0xFF0000,
        emissiveIntensity: 0.8
      })
    );
    spike.position.y = 1.25;
    spike.position.x = Math.cos(i * Math.PI / 6) * 1.5;
    spike.position.z = Math.sin(i * Math.PI / 6) * 1.5;
    this.mesh.add(spike);
  }
  
  // Central death spike
  const centerSpike = new THREE.Mesh(
    new THREE.ConeGeometry(0.5, 2, 8),
    new THREE.MeshPhongMaterial({ 
      color: 0x800000,
      emissive: 0x800000,
      emissiveIntensity: 1.0
    })
  );
  centerSpike.position.y = 1.5;
  
  // Death aura (red energy field)
  const aura = new THREE.Mesh(
    new THREE.SphereGeometry(3, 16, 16),
    new THREE.MeshPhongMaterial({ 
      color: 0xFF0000,
      transparent: true,
      opacity: 0.2,
      emissive: 0xFF0000,
      emissiveIntensity: 0.5
    })
  );
  aura.position.y = 1;
  
  this.mesh.add(base);
  this.mesh.add(centerSpike);
  this.mesh.add(aura);
  
  // Position trap randomly on the path
  const randomPathPoint = Math.floor(Math.random() * (window.PATH_POINTS.length - 2)) + 1;
  const pathPoint = window.PATH_POINTS[randomPathPoint];
  this.mesh.position.set(pathPoint.x, 0, pathPoint.z);
  
  scene.add(this.mesh);
  
  // Add pulsing animation
  this.pulseSpeed = 0.05;
  this.pulseTime = 0;
}

Trap.prototype.update = function(dt) {
  // Pulsing animation
  this.pulseTime += dt;
  const pulse = Math.sin(this.pulseTime * this.pulseSpeed) * 0.2 + 1;
  this.mesh.scale.set(pulse, pulse, pulse);
  
  // Check collision with enemies (use global enemies array)
  if (window.enemies) {
    for (let i = window.enemies.length - 1; i >= 0; i--) {
      const enemy = window.enemies[i];
      if (enemy && enemy.mesh) {
        const distance = Math.sqrt(
          Math.pow(enemy.mesh.position.x - this.mesh.position.x, 2) +
          Math.pow(enemy.mesh.position.z - this.mesh.position.z, 2)
        );
        
        // Debug: Log when enemies are close to trap
        if (distance < 5) {
          console.log(`💀 Enemy near trap: ${enemy.name || enemy.type}, Distance: ${distance.toFixed(2)}`);
        }
        
        // Kill radius of 3 units
        if (distance < 3 && this.active) {
          console.log(`💀 TRAP KILLED: ${enemy.name || enemy.type}! 💀`);
          enemy.health = 0;
          enemy.dead = true;
          this.killCount++;
          
          // Visual effect - make trap flash
          this.mesh.children.forEach(child => {
            if (child.material && child.material.emissive) {
              child.material.emissiveIntensity = 2.0;
              setTimeout(() => {
                if (child.material && child.material.emissive) {
                  child.material.emissiveIntensity = child.material.emissiveIntensity > 1 ? 0.8 : 0.3;
                }
              }, 100);
            }
          });
        }
      }
    }
  }
};

// Spawn spaceship
window.spawnSpaceship = function(scene) {
  console.log("🚀 Spawning hacker spaceship...");
  
  try {
    console.log("🚀 Creating spaceship object...");
    const spaceship = new Spaceship(scene);
    console.log("🚀 Spaceship created successfully:", spaceship);
    
    console.log("🚀 Adding to spaceships array...");
    window.spaceships.push(spaceship);
    console.log("🚀 Total spaceships:", window.spaceships.length);
    
    console.log("🚀 HACKER SPACESHIP SPAWNED! 🚀");
    console.log("🚀 It will shoot down enemies from above! 🚀");
    console.log("🚀 Spaceship position:", spaceship.mesh.position);
    console.log("🚀 Spaceship visible:", spaceship.mesh.visible);
    
    // Make sure spaceship is visible and properly positioned
    spaceship.mesh.visible = true;
    spaceship.mesh.position.set(0, 30, 0); // Lower position for better visibility
    spaceship.mesh.scale.set(2, 2, 2); // Make it larger
    console.log("🚀 Spaceship positioned at:", spaceship.mesh.position);
    console.log("🚀 Spaceship scale:", spaceship.mesh.scale);
    
    return spaceship;
  } catch (error) {
    console.error("Error spawning spaceship:", error);
    console.error("Error stack:", error.stack);
    return null;
  }
}

// Put 1337 on a tree
window.put1337OnTree = function(scene) {
  console.log("🌳 Putting 1337 on a tree...");
  
  // Find all trees in the scene
  const trees = [];
  scene.traverse(function(child) {
    if (child.userData && child.userData.isTree) {
      trees.push(child);
    }
  });
  
  if (trees.length > 0) {
    // Pick a random tree
    const randomTree = trees[Math.floor(Math.random() * trees.length)];
    
    // Create 1337 text
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 128;
    
    // Background
    context.fillStyle = '#000000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // 1337 text
    context.fillStyle = '#00FF00';
    context.font = 'bold 48px monospace';
    context.textAlign = 'center';
    context.fillText('1337', canvas.width / 2, canvas.height / 2 + 10);
    
    // Add some hacker effects
    context.fillStyle = '#FF0000';
    context.font = 'bold 24px monospace';
    context.fillText('H4X0R', canvas.width / 2, canvas.height - 20);
    
    // Create texture
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshBasicMaterial({ 
      map: texture,
      transparent: true,
      side: THREE.DoubleSide
    });
    
    // Create plane for the text
    const textPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(4, 2),
      material
    );
    
    // Position it on the tree
    textPlane.position.set(
      randomTree.position.x + 2,
      randomTree.position.y + 3,
      randomTree.position.z
    );
    textPlane.lookAt(camera.position);
    
    scene.add(textPlane);
    console.log("🌳 1337 H4X0R text added to tree! 🌳");
  } else {
    console.log("🌳 No trees found to put 1337 on! 🌳");
  }
}

// Create green boost button on a tree
window.createBoostButton = function(scene) {
  const buttonGroup = new THREE.Group();
  
  // Button base
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(1, 1, 0.5, 16),
    new THREE.MeshPhongMaterial({ color: 0x00FF00 })
  );
  base.position.y = 0.25;
  
  // Button text (simplified as a cube)
  const text = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 0.3, 0.1),
    new THREE.MeshPhongMaterial({ color: 0xFFFFFF })
  );
  text.position.y = 0.5;
  
  buttonGroup.add(base);
  buttonGroup.add(text);
  
  // Position on a tree
  buttonGroup.position.set(20, 0, 20);
  
  // Add click functionality
  buttonGroup.userData = {
    isBoostButton: true,
    onClick: function() {
      console.log("🟢 BOOST BUTTON CLICKED! 🟢");
      // Apply boost to all towers
      if (window.towers) {
        window.towers.forEach(tower => {
          if (tower.damage) {
            tower.damage *= 2;
            console.log(`🟢 Tower ${tower.type} damage boosted: ${tower.damage}`);
          }
        });
      }
    },
    pulseTime: 0,
    pulseSpeed: 2
  };
  
  scene.add(buttonGroup);
  return buttonGroup;
}

// Apply 999 trillion% boost to everything
window.apply999TrillionBoost = function() {
  const boostMultiplier = 9990000000000; // 999 trillion%
  
  console.log("🚀 APPLYING 999 TRILLION% BOOST TO EVERYTHING! 🚀");
  
  // Boost all towers
  if (window.towers) {
    window.towers.forEach(tower => {
      if (tower) {
        tower.damage *= boostMultiplier;
        tower.range *= boostMultiplier;
        tower.fireRate /= boostMultiplier; // Faster firing
        tower.level = 999;
        console.log(`🚀 Tower boosted: ${tower.type || 'Unknown'}`);
      }
    });
  }
  
  // Boost all spaceships
  if (window.spaceships) {
    window.spaceships.forEach(spaceship => {
      if (spaceship) {
        spaceship.fireRate *= boostMultiplier;
        spaceship.killCount *= boostMultiplier;
        console.log("🚀 Spaceship boosted!");
      }
    });
  }
  
  // Boost all traps
  if (window.traps) {
    window.traps.forEach(trap => {
      if (trap) {
        trap.killCount *= boostMultiplier;
        console.log("🚀 Trap boosted!");
      }
    });
  }
  
  // Boost player stats
  if (window.health) {
    window.health *= boostMultiplier;
    window.maxHealth *= boostMultiplier;
  }
  
  if (window.money) {
    window.money *= boostMultiplier;
  }
  
  // Boost wave
  if (window.wave) {
    window.wave *= boostMultiplier;
  }
  
  // Update UI
  if (window.updateUI) {
    window.updateUI();
  }
  
  console.log("🚀 999 TRILLION% BOOST APPLIED TO EVERYTHING! 🚀");
  console.log("🚀 You are now UNSTOPPABLE! 🚀");
  
  // Visual effect - flash the screen green
  const flash = document.createElement('div');
  flash.style.position = 'fixed';
  flash.style.top = '0';
  flash.style.left = '0';
  flash.style.width = '100%';
  flash.style.height = '100%';
  flash.style.backgroundColor = '#00FF00';
  flash.style.opacity = '0.5';
  flash.style.zIndex = '9999';
  flash.style.pointerEvents = 'none';
  document.body.appendChild(flash);
  
  // Remove flash after 1 second
  setTimeout(() => {
    document.body.removeChild(flash);
  }, 1000);
}

// Spaceship class
function Spaceship(scene) {
  console.log("🚀 Spaceship constructor called...");
  
  this.active = true;
  this.killCount = 0;
  this.lastShot = 0;
  this.fireRate = 0.5; // Shots per second
  
  // Create spaceship mesh (futuristic hacker ship)
  this.mesh = new THREE.Group();
  console.log("🚀 Spaceship mesh group created");
  
  try {
    // Main body (triangular)
    const body = new THREE.Mesh(
      new THREE.ConeGeometry(2, 4, 8),
      new THREE.MeshPhongMaterial({ 
        color: 0x00FF00,
        emissive: 0x00FF00,
        emissiveIntensity: 0.5
      })
    );
    body.position.y = 2;
    body.rotation.x = Math.PI / 2;
    console.log("🚀 Body created");
    
    // Wings
    const wingGeometry = new THREE.BoxGeometry(6, 0.5, 2);
    const leftWing = new THREE.Mesh(wingGeometry, new THREE.MeshPhongMaterial({ 
      color: 0x00FFFF,
      emissive: 0x00FFFF,
      emissiveIntensity: 0.3
    }));
    const rightWing = new THREE.Mesh(wingGeometry, new THREE.MeshPhongMaterial({ 
      color: 0x00FFFF,
      emissive: 0x00FFFF,
      emissiveIntensity: 0.3
    }));
    leftWing.position.set(-3, 2, 0);
    rightWing.position.set(3, 2, 0);
    console.log("🚀 Wings created");
    
    // Engine glow
    const engine = new THREE.Mesh(
      new THREE.SphereGeometry(0.8, 16, 16),
      new THREE.MeshPhongMaterial({ 
        color: 0xFF0000,
        emissive: 0xFF0000,
        emissiveIntensity: 1.0
      })
    );
    engine.position.y = 0;
    console.log("🚀 Engine created");
    
    // Laser cannon
    const cannon = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.2, 3, 8),
      new THREE.MeshPhongMaterial({ 
        color: 0xFFFF00,
        emissive: 0xFFFF00,
        emissiveIntensity: 0.8
      })
    );
    cannon.position.y = 4;
    cannon.rotation.x = Math.PI / 2;
    console.log("🚀 Cannon created");
    
    // Hacker symbols
    const symbolGeometry = new THREE.PlaneGeometry(1, 1);
    const symbolMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xFFFFFF,
      transparent: true,
      opacity: 0.8
    });
    
    const symbol1 = new THREE.Mesh(symbolGeometry, symbolMaterial);
    const symbol2 = new THREE.Mesh(symbolGeometry, symbolMaterial);
    symbol1.position.set(-1, 3, 0);
    symbol2.position.set(1, 3, 0);
    console.log("🚀 Symbols created");
    
    this.mesh.add(body);
    this.mesh.add(leftWing);
    this.mesh.add(rightWing);
    this.mesh.add(engine);
    this.mesh.add(cannon);
    this.mesh.add(symbol1);
    this.mesh.add(symbol2);
    console.log("🚀 All parts added to mesh");
    
    // Position spaceship high above the battlefield
    this.mesh.position.set(0, 30, 0); // Lower position for better visibility
    this.mesh.scale.set(2, 2, 2); // Make it larger
    console.log("🚀 Spaceship positioned at:", this.mesh.position);
    console.log("🚀 Spaceship scale:", this.mesh.scale);
    
    scene.add(this.mesh);
    console.log("🚀 Spaceship added to scene");
    
    // Add hovering animation
    this.hoverSpeed = 0.02;
    this.hoverTime = 0;
    console.log("🚀 Spaceship constructor completed successfully");
    
  } catch (error) {
    console.error("🚀 Error in Spaceship constructor:", error);
    console.error("🚀 Error stack:", error.stack);
    throw error;
  }
}

Spaceship.prototype.update = function(dt) {
  // Hovering animation
  this.hoverTime += dt;
  const hover = Math.sin(this.hoverTime * this.hoverSpeed) * 2;
  this.mesh.position.y = 50 + hover;
  
  // Rotate slowly
  this.mesh.rotation.y += dt * 0.5;
  
  // Shoot at enemies
  this.lastShot += dt;
  if (this.lastShot >= 1 / this.fireRate && window.enemies) {
    this.shoot();
    this.lastShot = 0;
  }
};

Spaceship.prototype.shoot = function() {
  if (!window.enemies || window.enemies.length === 0) return;
  
  // Find closest enemy
  let closestEnemy = null;
  let closestDistance = Infinity;
  
  for (let i = 0; i < window.enemies.length; i++) {
    const enemy = window.enemies[i];
    if (enemy && enemy.mesh) {
      const distance = Math.sqrt(
        Math.pow(enemy.mesh.position.x - this.mesh.position.x, 2) +
        Math.pow(enemy.mesh.position.z - this.mesh.position.z, 2)
      );
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestEnemy = enemy;
      }
    }
  }
  
  if (closestEnemy) {
    console.log(`🚀 SPACESHIP SHOT: ${closestEnemy.name || closestEnemy.type}! 🚀`);
    closestEnemy.health = 0;
    closestEnemy.dead = true;
    this.killCount++;
    
    // Create laser beam effect
    this.createLaserBeam(closestEnemy.mesh.position);
  }
};

Spaceship.prototype.createLaserBeam = function(targetPosition) {
  // Create laser beam geometry
  const beamGeometry = new THREE.CylinderGeometry(0.1, 0.1, 50, 8);
  const beamMaterial = new THREE.MeshBasicMaterial({ 
    color: 0x00FFFF,
    transparent: true,
    opacity: 0.8
  });
  
  const beam = new THREE.Mesh(beamGeometry, beamMaterial);
  
  // Position beam from spaceship to target
  beam.position.copy(this.mesh.position);
  beam.lookAt(targetPosition);
  
  // Add to scene temporarily
  window.scene.add(beam);
  
  // Remove after short time
  setTimeout(() => {
    window.scene.remove(beam);
  }, 200);
};

// Spawn 10 normal shooters with infinite range
window.spawnInfiniteRangeShooters = function(scene) {
  console.log("🔫 Spawning 10 normal shooters with infinite range...");
  
  try {
    for (let i = 0; i < 10; i++) {
      // Generate random position off the path
      let pos;
      let attempts = 0;
      do {
        pos = {
          x: (Math.random() - 0.5) * 50,
          z: (Math.random() - 0.5) * 50
        };
        attempts++;
      } while (window.isOnPath(pos) && attempts < 50);
      
      if (!window.isOnPath(pos)) {
        // Create a normal shooter with infinite range
        const shooter = new InfiniteRangeShooter(scene, pos);
        towers.push(shooter);
        console.log(`🔫 Infinite range shooter ${i + 1} spawned at (${pos.x.toFixed(1)}, ${pos.z.toFixed(1)})`);
      }
    }
    
    console.log("🔫 10 INFINITE RANGE SHOOTERS SPAWNED! 🔫");
    console.log("🔫 They can shoot enemies anywhere on the map! 🔫");
    window.updateUI();
  } catch (error) {
    console.error("Error spawning infinite range shooters:", error);
  }
}

// Infinite Range Shooter class
function InfiniteRangeShooter(scene, pos) {
  this.type = 'infiniteShooter';
  this.level = 1;
  this.damage = 50;
  this.range = Infinity; // Infinite range
  this.fireRate = 1.0; // 1 shot per second
  this.lastShot = 0;
  this.cost = 0; // Free
  
  // Create shooter mesh (simple tower)
  this.mesh = new THREE.Group();
  
  // Base
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(1, 1.5, 2, 8),
    new THREE.MeshPhongMaterial({ color: 0x4444FF })
  );
  base.position.y = 1;
  
  // Turret
  const turret = new THREE.Mesh(
    new THREE.CylinderGeometry(0.5, 0.5, 1, 8),
    new THREE.MeshPhongMaterial({ color: 0x6666FF })
  );
  turret.position.y = 2.5;
  
  // Barrel
  const barrel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.1, 2, 8),
    new THREE.MeshPhongMaterial({ color: 0x8888FF })
  );
  barrel.position.y = 2.5;
  barrel.position.z = 1;
  barrel.rotation.x = Math.PI / 2;
  
  // Infinite range indicator (glowing sphere)
  const rangeIndicator = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 8, 8),
    new THREE.MeshPhongMaterial({ 
      color: 0x00FFFF,
      emissive: 0x00FFFF,
      emissiveIntensity: 0.8
    })
  );
  rangeIndicator.position.y = 3.5;
  
  this.mesh.add(base);
  this.mesh.add(turret);
  this.mesh.add(barrel);
  this.mesh.add(rangeIndicator);
  
  this.mesh.position.set(pos.x, 0, pos.z);
  scene.add(this.mesh);
}

InfiniteRangeShooter.prototype.update = function(dt, scene) {
  this.lastShot += dt;
  
  if (this.lastShot >= 1 / this.fireRate && window.enemies) {
    // Find closest enemy (anywhere on the map)
    let closestEnemy = null;
    let closestDistance = Infinity;
    
    for (let i = 0; i < window.enemies.length; i++) {
      const enemy = window.enemies[i];
      if (enemy && enemy.mesh) {
        const distance = Math.sqrt(
          Math.pow(enemy.mesh.position.x - this.mesh.position.x, 2) +
          Math.pow(enemy.mesh.position.z - this.mesh.position.z, 2)
        );
        
        if (distance < closestDistance) {
          closestDistance = distance;
          closestEnemy = enemy;
        }
      }
    }
    
    // Shoot at closest enemy (infinite range)
    if (closestEnemy) {
      console.log(`🔫 Infinite shooter hit: ${closestEnemy.name || closestEnemy.type} at distance ${closestDistance.toFixed(1)}`);
      closestEnemy.takeDamage(this.damage);
      this.lastShot = 0;
      
      // Create laser beam effect
      this.createLaserBeam(closestEnemy.mesh.position);
    }
  }
};

InfiniteRangeShooter.prototype.createLaserBeam = function(targetPosition) {
  // Create laser beam geometry
  const distance = Math.sqrt(
    Math.pow(targetPosition.x - this.mesh.position.x, 2) +
    Math.pow(targetPosition.z - this.mesh.position.z, 2)
  );
  
  const beamGeometry = new THREE.CylinderGeometry(0.05, 0.05, distance, 8);
  const beamMaterial = new THREE.MeshBasicMaterial({ 
    color: 0x00FFFF,
    transparent: true,
    opacity: 0.8
  });
  
  const beam = new THREE.Mesh(beamGeometry, beamMaterial);
  
  // Position beam from shooter to target
  beam.position.copy(this.mesh.position);
  beam.position.y += 2.5; // Height of turret
  beam.lookAt(targetPosition);
  
  // Add to scene temporarily
  window.scene.add(beam);
  
  // Remove after short time
  setTimeout(() => {
    window.scene.remove(beam);
  }, 200);
};

// Unlock Duck God tower
window.unlockDuckGod = function() {
  if (!window.availableTowers.includes('duckgod')) {
    window.availableTowers.push('duckgod');
    console.log('🦆 Duck God tower unlocked!');
    window.updateTowerSelectionUI();
    
    // Show unlock panel
    let unlockPanel = document.getElementById('unlock-panel');
    if (!unlockPanel) {
      unlockPanel = document.createElement('div');
      unlockPanel.id = 'unlock-panel';
      unlockPanel.style.position = 'absolute';
      unlockPanel.style.top = '50%';
      unlockPanel.style.left = '50%';
      unlockPanel.style.transform = 'translate(-50%, -50%)';
      unlockPanel.style.padding = '30px';
      unlockPanel.style.background = 'rgba(0,0,0,0.95)';
      unlockPanel.style.border = '3px solid #FFD700';
      unlockPanel.style.borderRadius = '15px';
      unlockPanel.style.color = '#fff';
      unlockPanel.style.textAlign = 'center';
      unlockPanel.style.zIndex = '1000';
      unlockPanel.style.fontFamily = 'Arial, sans-serif';
      unlockPanel.style.fontSize = '16px';
      document.body.appendChild(unlockPanel);
    }
    
    unlockPanel.innerHTML = `
      <h1>🦆 DUCK GOD UNLOCKED! 🦆</h1>
      <h2>The Ultimate Tower</h2>
      <p>Damage: 100</p>
      <p>Range: 15</p>
      <p>Cost: $25,000</p>
      <p>Boost: 50%</p>
      <button onclick="this.parentElement.remove()" style="margin-top: 15px; padding: 10px 20px; background: #FF4500; color: white; border: none; border-radius: 5px; cursor: pointer;">Accept Divine Power</button>
    `;
    unlockPanel.style.display = 'block';
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
      unlockPanel.style.display = 'none';
    }, 10000);
  }
};

// Unlock God Tower
window.unlockGodTower = function() {
  if (!window.availableTowers.includes('godtower')) {
    window.availableTowers.push('godtower');
    console.log('✨ God Tower unlocked!');
    window.updateTowerSelectionUI();
    
    // Show unlock panel
    let unlockPanel = document.getElementById('unlock-panel');
    if (!unlockPanel) {
      unlockPanel = document.createElement('div');
      unlockPanel.id = 'unlock-panel';
      unlockPanel.style.position = 'absolute';
      unlockPanel.style.top = '50%';
      unlockPanel.style.left = '50%';
      unlockPanel.style.transform = 'translate(-50%, -50%)';
      unlockPanel.style.padding = '30px';
      unlockPanel.style.background = 'rgba(0,0,0,0.95)';
      unlockPanel.style.border = '3px solid #FFD700';
      unlockPanel.style.borderRadius = '15px';
      unlockPanel.style.color = '#fff';
      unlockPanel.style.textAlign = 'center';
      unlockPanel.style.zIndex = '1000';
      unlockPanel.style.fontFamily = 'Arial, sans-serif';
      unlockPanel.style.fontSize = '16px';
      document.body.appendChild(unlockPanel);
    }
    
    unlockPanel.innerHTML = `
      <h1>✨ GOD TOWER UNLOCKED! ✨</h1>
      <h2>The Divine Tower</h2>
      <p>Damage: 1000</p>
      <p>Range: 25</p>
      <p>Cost: $100,000</p>
      <p>Boost: 200%</p>
      <p>Divine Blessing: Heals & Protects</p>
      <button onclick="this.parentElement.remove()" style="margin-top: 15px; padding: 10px 20px; background: #FFD700; color: black; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">Accept Divine Power</button>
    `;
    unlockPanel.style.display = 'block';
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
      unlockPanel.style.display = 'none';
    }, 10000);
  }
};

// Check if a position is on the path
window.isOnPath = function(pos) {
  const pathPoints = window.PATH_POINTS || [];
  for (let i = 0; i < pathPoints.length - 1; i++) {
    const start = pathPoints[i];
    const end = pathPoints[i + 1];
    const distance = Math.sqrt((end.x - start.x) ** 2 + (end.z - start.z) ** 2);
    const segments = Math.ceil(distance / 3);
    for (let j = 0; j < segments; j++) {
      const t = j / segments;
      const pathX = start.x + (end.x - start.x) * t;
      const pathZ = start.z + (end.z - start.z) * t;
      const distToPath = Math.sqrt((pos.x - pathX) ** 2 + (pos.z - pathZ) ** 2);
      if (distToPath < 2) return true;
    }
  }
  return false;
}

// Helper: check if a position is near the path (within a given distance)
window.isNearPath = function(pos, minDist = 7) {
  const pathPoints = window.PATH_POINTS || [];
  for (let i = 0; i < pathPoints.length - 1; i++) {
    const start = pathPoints[i];
    const end = pathPoints[i + 1];
    const distance = Math.sqrt((end.x - start.x) ** 2 + (end.z - start.z) ** 2);
    const segments = Math.ceil(distance / 3);
    for (let j = 0; j < segments; j++) {
      const t = j / segments;
      const pathX = start.x + (end.x - start.x) * t;
      const pathZ = start.z + (end.z - start.z) * t;
      const distToPath = Math.sqrt((pos.x - pathX) ** 2 + (pos.z - pathZ) ** 2);
      if (distToPath < minDist) return true;
    }
  }
  return false;
}

// Add environment objects
window.addEnvironment = function(scene) {
  // Trees - only at the edge of the map
  for (let i = 0; i < 20; i++) {
    // Generate position at the edge of the map (within 5 units of border)
    let treeX, treeZ;
    const edgeDistance = 5;
    const mapSize = 40; // Cover the spiral path area
    
    // Randomly choose which edge to place the tree on
    const edge = Math.floor(Math.random() * 4);
    switch(edge) {
      case 0: // Top edge
        treeX = (Math.random() - 0.5) * 80;
        treeZ = mapSize - Math.random() * edgeDistance;
        break;
      case 1: // Bottom edge
        treeX = (Math.random() - 0.5) * 80;
        treeZ = -mapSize + Math.random() * edgeDistance;
        break;
      case 2: // Left edge
        treeX = -mapSize + Math.random() * edgeDistance;
        treeZ = (Math.random() - 0.5) * 80;
        break;
      case 3: // Right edge
        treeX = mapSize - Math.random() * edgeDistance;
        treeZ = (Math.random() - 0.5) * 80;
        break;
    }
    
    // Don't place trees on the path
    if (!window.isOnPath({x: treeX, z: treeZ})) {
      const treeGroup = new THREE.Group();
      
      // Tree trunk
      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.5, 3, 8),
        new THREE.MeshPhongMaterial({ color: 0x8B4513 })
      );
      trunk.position.y = 1.5;
      
      // Tree leaves
      const leaves = new THREE.Mesh(
        new THREE.SphereGeometry(2, 8, 8),
        new THREE.MeshPhongMaterial({ color: 0x228B22 })
      );
      leaves.position.y = 4;
      
      treeGroup.add(trunk);
      treeGroup.add(leaves);
      treeGroup.position.set(treeX, 0, treeZ);
      treeGroup.userData = { isTree: true }; // Mark as tree for 1337 text
      scene.add(treeGroup);
    }
  }
  
  // Grass patches
  for (let i = 0; i < 40; i++) {
    const grassX = (Math.random() - 0.5) * 80;
    const grassZ = (Math.random() - 0.5) * 80;
    
    if (!window.isOnPath({x: grassX, z: grassZ})) {
      const grass = new THREE.Mesh(
        new THREE.PlaneGeometry(0.5, 0.5),
        new THREE.MeshPhongMaterial({ color: 0x32CD32 })
      );
      grass.rotation.x = -Math.PI / 2;
      grass.position.set(grassX, 0.01, grassZ);
      scene.add(grass);
    }
  }
  
  // Flowers
  for (let i = 0; i < 25; i++) {
    const flowerX = (Math.random() - 0.5) * 80;
    const flowerZ = (Math.random() - 0.5) * 80;
    
    if (!window.isOnPath({x: flowerX, z: flowerZ})) {
      const flowerColors = [0xFF69B4, 0xFFD700, 0xFF6347, 0x9370DB];
      const flower = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 8, 8),
        new THREE.MeshPhongMaterial({ color: flowerColors[Math.floor(Math.random() * flowerColors.length)] })
      );
      flower.position.set(flowerX, 0.2, flowerZ);
      scene.add(flower);
    }
  }
}

window.loseHealth = function(amount) {
  // Reset infinite health to normal if it was set by cheat codes
  if (window.health === Infinity) {
    window.health = 20; // Reset to normal starting health
    console.log("🔄 Infinite health reset to normal (20)");
  }
  
  window.health -= amount;
  window.updateUI();
  if (window.health <= 0) {
    alert('Game Over!');
    location.reload();
  }
}

window.addMoney = function(amount) {
  window.money += amount;
  window.updateUI();
}

window.updateUI = function() {
  const healthElement = document.getElementById('health');
  const moneyElement = document.getElementById('money');
  const waveElement = document.getElementById('wave');
  
  if (healthElement) healthElement.innerHTML = `Health: ${window.health}`;
  if (moneyElement) moneyElement.innerHTML = `Money: $${window.money}`;
  if (waveElement) waveElement.innerHTML = `Wave: ${window.wave}`;
}

// Auto-start waves after a short delay
window.autoStartWaves = function() {
  console.log("Auto-starting waves...");
  console.log("Scene reference:", sceneRef);
  console.log("Window scene:", window.scene);
  setTimeout(() => {
    if (window.startWave) {
      console.log("Starting first wave...");
      window.startWave();
    } else {
      console.log("ERROR: startWave function not found!");
    }
  }, 2000); // 2 second delay between waves
}

// Wave spawning system
window.startWave = function() {
  if (window.waveInProgress) return;
  window.waveInProgress = true;
  let count = 0;
  
  // Calculate wave size with a maximum limit to prevent crashes
  let waveSize = 5 + window.wave * 2;
  const maxWaveSize = 1000; // Maximum 1000 enemies per wave to prevent crashes
  
  if (waveSize > maxWaveSize) {
    console.log(`🌊 Wave size capped at ${maxWaveSize} to prevent crashes (calculated: ${waveSize})`);
    waveSize = maxWaveSize;
  }
  
  console.log(`🌊 Starting Wave ${window.wave} with ${waveSize} enemies...`);

  // Spawn enemies based on wave number
  for (let i = 0; i < waveSize; i++) {
    let enemyType = window.selectEnemyTypeForWave(window.wave);
    window.spawnEnemyForWave(window.scene, enemyType);
    count++;
  }

  console.log(`🌊 Wave ${window.wave} spawned ${count} enemies`);
}

// Select enemy type based on wave number
window.selectEnemyTypeForWave = function(waveNumber) {
  const rand = Math.random();
  
  // Early waves (1-5): Basic enemies only
  if (waveNumber <= 5) {
    if (rand < 0.4) return 'zombie';
    if (rand < 0.7) return 'babyZombie';
    if (rand < 0.9) return 'grandpaZombie';
    if (rand < 0.95) return 'speedDemon'; // 5% chance
    return 'acidSpitter'; // 5% chance
  }
  
  // Mid waves (6-9): Basic enemies + some mutated zombies
  if (waveNumber <= 9) {
    if (rand < 0.25) return 'zombie';
    if (rand < 0.45) return 'babyZombie';
    if (rand < 0.6) return 'grandpaZombie';
    if (rand < 0.75) return 'speedDemon'; // 15% chance
    if (rand < 0.8) return 'acidSpitter'; // 5% chance
    if (rand < 0.85) return 'electricZombie'; // 5% chance
    if (rand < 0.9) return 'iceZombie'; // 5% chance
    return 'fireZombie'; // 10% chance
  }
  
  // Wave 10-49: All enemies except Iron Titan
  if (waveNumber <= 49) {
    if (rand < 0.08) return 'zombie';
    if (rand < 0.15) return 'babyZombie';
    if (rand < 0.22) return 'grandpaZombie';
    if (rand < 0.29) return 'speedDemon'; // 7% chance
    if (rand < 0.34) return 'acidSpitter'; // 5% chance
    if (rand < 0.39) return 'electricZombie'; // 5% chance
    if (rand < 0.44) return 'iceZombie'; // 5% chance
    if (rand < 0.49) return 'fireZombie'; // 5% chance
    if (rand < 0.54) return 'shadowZombie'; // 5% chance
    if (rand < 0.58) return 'gargantuan'; // 4% chance
    if (rand < 0.62) return 'armoredZombie'; // 4% chance
    if (rand < 0.66) return 'toxicSlime'; // 4% chance
    if (rand < 0.70) return 'bomber'; // 4% chance
    if (rand < 0.74) return 'healerZombie'; // 4% chance
    if (rand < 0.78) return 'swarmBug'; // 4% chance
    if (rand < 0.82) return 'shieldDrone'; // 4% chance
    if (rand < 0.86) return 'leech'; // 4% chance
    if (rand < 0.90) return 'phantom'; // 4% chance
    if (rand < 0.94) return 'juggernaut'; // 4% chance
    if (rand < 0.98) return 'frostWraith'; // 4% chance
    return 'adminZombie'; // 2% chance for Admin Zombie
  }
  
  // Wave 50+: All enemies including Iron Titan
  if (waveNumber <= 100) {
    if (rand < 0.06) return 'zombie';
    if (rand < 0.11) return 'babyZombie';
    if (rand < 0.16) return 'grandpaZombie';
    if (rand < 0.21) return 'speedDemon'; // 5% chance
    if (rand < 0.26) return 'ironTitan'; // 5% chance for Iron Titan
    if (rand < 0.30) return 'acidSpitter'; // 4% chance
    if (rand < 0.34) return 'electricZombie'; // 4% chance
    if (rand < 0.38) return 'iceZombie'; // 4% chance
    if (rand < 0.42) return 'fireZombie'; // 4% chance
    if (rand < 0.46) return 'shadowZombie'; // 4% chance
    if (rand < 0.50) return 'gargantuan'; // 4% chance
    if (rand < 0.54) return 'armoredZombie'; // 4% chance
    if (rand < 0.58) return 'toxicSlime'; // 4% chance
    if (rand < 0.62) return 'bomber'; // 4% chance
    if (rand < 0.66) return 'healerZombie'; // 4% chance
    if (rand < 0.70) return 'swarmBug'; // 4% chance
    if (rand < 0.74) return 'shieldDrone'; // 4% chance
    if (rand < 0.78) return 'leech'; // 4% chance
    if (rand < 0.82) return 'phantom'; // 4% chance
    if (rand < 0.86) return 'juggernaut'; // 4% chance
    if (rand < 0.90) return 'frostWraith'; // 4% chance
    return 'adminZombie'; // 10% chance for Admin Zombie
  }
  
  // Extreme waves (101+): Mostly special enemies
  if (rand < 0.02) return 'zombie';
  if (rand < 0.04) return 'babyZombie';
  if (rand < 0.06) return 'grandpaZombie';
  if (rand < 0.10) return 'speedDemon'; // 4% chance
  if (rand < 0.15) return 'ironTitan'; // 5% chance for Iron Titan
  if (rand < 0.19) return 'acidSpitter'; // 4% chance
  if (rand < 0.23) return 'electricZombie'; // 4% chance
  if (rand < 0.27) return 'iceZombie'; // 4% chance
  if (rand < 0.31) return 'fireZombie'; // 4% chance
  if (rand < 0.35) return 'shadowZombie'; // 4% chance
  if (rand < 0.39) return 'gargantuan'; // 4% chance
  if (rand < 0.43) return 'armoredZombie'; // 4% chance
  if (rand < 0.47) return 'toxicSlime'; // 4% chance
  if (rand < 0.51) return 'bomber'; // 4% chance
  if (rand < 0.55) return 'healerZombie'; // 4% chance
  if (rand < 0.59) return 'swarmBug'; // 4% chance
  if (rand < 0.63) return 'shieldDrone'; // 4% chance
  if (rand < 0.67) return 'leech'; // 4% chance
  if (rand < 0.71) return 'phantom'; // 4% chance
  if (rand < 0.75) return 'juggernaut'; // 4% chance
  if (rand < 0.79) return 'frostWraith'; // 4% chance
  if (rand < 0.85) return 'adminZombie'; // 6% chance for Admin Zombie
  return 'godZombie'; // 15% chance for God Zombie
}

// Spawn enemy based on type
window.spawnEnemyForWave = function(scene, enemyType) {
  try {
    console.log(`Spawning enemy: ${enemyType}`);
    window.spawnEnemy(scene, enemyType);
  } catch (error) {
    console.error("Error spawning enemy type:", enemyType, error);
    // Fallback to basic zombie
    window.spawnEnemy(scene, 'zombie');
  }
}

// Show crate reward
window.showCrateReward = function() {
  // Possible new tower types to unlock
  const allTowerTypes = Object.keys(window.TOWER_TYPES || {});
  const lockedTowers = allTowerTypes.filter(type => !window.availableTowers.includes(type));
  
  // Add General tower on wave 20
  if (window.wave === 20 && !window.availableTowers.includes('general')) {
    window.availableTowers.push('general');
    console.log('General tower unlocked!');
  }
  
  if (lockedTowers.length > 0) {
    const newTower = lockedTowers[Math.floor(Math.random() * lockedTowers.length)];
    window.availableTowers.push(newTower);
    
    // Show crate reward UI
    let cratePanel = document.getElementById('crate-panel');
    if (!cratePanel) {
      cratePanel = document.createElement('div');
      cratePanel.id = 'crate-panel';
      cratePanel.style.position = 'absolute';
      cratePanel.style.top = '50%';
      cratePanel.style.left = '50%';
      cratePanel.style.transform = 'translate(-50%, -50%)';
      cratePanel.style.padding = '20px';
      cratePanel.style.background = 'rgba(0,0,0,0.9)';
      cratePanel.style.border = '2px solid #ffd700';
      cratePanel.style.borderRadius = '10px';
      cratePanel.style.color = '#fff';
      cratePanel.style.textAlign = 'center';
      cratePanel.style.zIndex = '1000';
      document.body.appendChild(cratePanel);
    }
    
    const towerInfo = window.TOWER_TYPES && window.TOWER_TYPES[newTower] ? window.TOWER_TYPES[newTower].levels[0] : { name: newTower, cost: 0, range: 0, damage: 0 };
    cratePanel.innerHTML = `
      <h2>🎁 Crate Reward!</h2>
      <h3>New Tower Unlocked: ${towerInfo.name}</h3>
      <p>Cost: $${towerInfo.cost}</p>
      <p>Range: ${towerInfo.range}</p>
      <p>Damage: ${towerInfo.damage}</p>
      <button onclick="document.getElementById('crate-panel').style.display='none'">Continue</button>
    `;
    cratePanel.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      cratePanel.style.display = 'none';
    }, 5000);
  }
  
  // Update tower selection UI
  if (window.updateTowerSelectionUI) {
    window.updateTowerSelectionUI();
  }
}

window.addDesertEnvironment = function(scene) {
  // Add cacti, rocks, sand dunes
  for (let i = 0; i < 20; i++) {
    const cactus = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.3, 3 + Math.random() * 2, 6),
      new THREE.MeshPhongMaterial({ color: 0x228B22 })
    );
    cactus.position.set((Math.random() - 0.5) * 80, 1.5, (Math.random() - 0.5) * 80);
    scene.add(cactus);
  }
  for (let i = 0; i < 30; i++) {
    const rock = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.5 + Math.random()),
      new THREE.MeshPhongMaterial({ color: 0xA0522D })
    );
    rock.position.set((Math.random() - 0.5) * 80, 0.5, (Math.random() - 0.5) * 80);
    scene.add(rock);
  }
};

window.addMetropolisEnvironment = function(scene) {
  // Add buildings, roads, streetlights
  for (let i = 0; i < 15; i++) {
    let bx, bz, height;
    let attempts = 0;
    do {
      bx = (Math.random() - 0.5) * 70;
      bz = (Math.random() - 0.5) * 70;
      height = 8 + Math.random() * 12;
      attempts++;
    } while (window.isNearPath({x: bx, z: bz}, 7) && attempts < 30);
    if (window.isNearPath({x: bx, z: bz}, 7)) continue;
    const building = new THREE.Mesh(
      new THREE.BoxGeometry(3 + Math.random() * 5, height, 3 + Math.random() * 5),
      new THREE.MeshPhongMaterial({ color: 0x444444 })
    );
    building.position.set(bx, height / 2, bz);
    scene.add(building);
  }
  for (let i = 0; i < 10; i++) {
    let sx, sz, attempts = 0;
    do {
      sx = (Math.random() - 0.5) * 80;
      sz = (Math.random() - 0.5) * 80;
      attempts++;
    } while (window.isNearPath({x: sx, z: sz}, 7) && attempts < 30);
    if (window.isNearPath({x: sx, z: sz}, 7)) continue;
    const streetlight = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.1, 6, 8),
      new THREE.MeshPhongMaterial({ color: 0xFFFF00 })
    );
    streetlight.position.set(sx, 3, sz);
    scene.add(streetlight);
  }
};

window.addMarsEnvironment = function(scene) {
  // Add red rocks, craters, alien plants
  for (let i = 0; i < 25; i++) {
    const rock = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.7 + Math.random() * 1.5),
      new THREE.MeshPhongMaterial({ color: 0xB22222 })
    );
    rock.position.set((Math.random() - 0.5) * 80, 0.7, (Math.random() - 0.5) * 80);
    scene.add(rock);
  }
  for (let i = 0; i < 8; i++) {
    const crater = new THREE.Mesh(
      new THREE.TorusGeometry(2 + Math.random() * 3, 0.5, 8, 16),
      new THREE.MeshPhongMaterial({ color: 0x8B0000 })
    );
    crater.position.set((Math.random() - 0.5) * 80, 0.1, (Math.random() - 0.5) * 80);
    crater.rotation.x = -Math.PI / 2;
    scene.add(crater);
  }
};

window.addUniverseEnvironment = function(scene) {
  // Add floating asteroids, stars, and a black hole
  for (let i = 0; i < 10; i++) {
    const asteroid = new THREE.Mesh(
      new THREE.DodecahedronGeometry(1 + Math.random() * 2),
      new THREE.MeshPhongMaterial({ color: 0x888888 })
    );
    asteroid.position.set((Math.random() - 0.5) * 80, 2 + Math.random() * 10, (Math.random() - 0.5) * 80);
    scene.add(asteroid);
  }
  for (let i = 0; i < 50; i++) {
    const star = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 6, 6),
      new THREE.MeshBasicMaterial({ color: 0xFFFFFF })
    );
    star.position.set((Math.random() - 0.5) * 100, 10 + Math.random() * 40, (Math.random() - 0.5) * 100);
    scene.add(star);
  }
  // Black hole
  const blackHole = new THREE.Mesh(
    new THREE.SphereGeometry(4, 32, 32),
    new THREE.MeshPhongMaterial({ color: 0x000000 })
  );
  blackHole.position.set(0, 10, 0);
  scene.add(blackHole);
};
  