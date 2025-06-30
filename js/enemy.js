// Enemy types
window.ENEMY_TYPES = {
  zombie: { color: 0xff3333, speed: 4, health: 10, reward: 10, name: "Zombie" },
  babyZombie:  { color: 0x33aaff, speed: 7, health: 5, reward: 8, name: "Baby Zombie" },
  grandpaZombie:  { color: 0x888888, speed: 2, health: 30, reward: 20, name: "Grandpa Zombie" },
  speedDemon: { color: 0xFF00FF, speed: 25, health: 3, reward: 15, name: "Speed Demon" },
  ironTitan: { color: 0x8B4513, speed: 1, health: 100000, reward: 10000, name: "Iron Titan" },
  acidSpitter: { color: 0x00FF00, speed: 3, health: 50, reward: 25, name: "Acid Spitter" },
  electricZombie: { color: 0xFFFF00, speed: 5, health: 40, reward: 30, name: "Electric Zombie" },
  iceZombie: { color: 0x00FFFF, speed: 2, health: 60, reward: 35, name: "Ice Zombie" },
  fireZombie: { color: 0xFF4500, speed: 4, health: 45, reward: 40, name: "Fire Zombie" },
  shadowZombie: { color: 0x800080, speed: 8, health: 35, reward: 45, name: "Shadow Zombie" },
  // New enemies
  armoredZombie: { color: 0x555555, speed: 2, health: 80, reward: 60, name: "Armored Zombie", armor: 0.7 },
  toxicSlime: { color: 0x39ff14, speed: 3, health: 30, reward: 25, name: "Toxic Slime" },
  bomber: { color: 0xffa500, speed: 4, health: 20, reward: 30, name: "Bomber" },
  healerZombie: { color: 0x00ffcc, speed: 3, health: 35, reward: 40, name: "Healer Zombie" },
  swarmBug: { color: 0x996600, speed: 4, health: 4, reward: 3, name: "Swarm Bug" },
  shieldDrone: { color: 0x00bfff, speed: 5, health: 25, reward: 35, name: "Shield Drone" },
  leech: { color: 0x8b0000, speed: 4, health: 18, reward: 20, name: "Leech" },
  phantom: { color: 0xcccccc, speed: 7, health: 22, reward: 30, name: "Phantom" },
  juggernaut: { color: 0x222222, speed: 1, health: 400, reward: 200, name: "Juggernaut" },
  frostWraith: { color: 0x99ffff, speed: 3, health: 28, reward: 30, name: "Frost Wraith" },
  godZombie: { color: 0xFFD700, speed: 3, health: 50000, reward: 50000, name: "God Zombie" }
};

globalThis.enemies = [];
window.enemies = globalThis.enemies;

// Path waypoints (proper spiral path)
const PATH_POINTS = [];
const spiralRadius = 3; // Starting radius
const spiralSpacing = 8; // Distance between spiral turns
const spiralTurns = 4; // Number of complete turns
const pointsPerTurn = 12; // Points per complete turn

for (let turn = 0; turn < spiralTurns; turn++) {
  for (let j = 0; j <= pointsPerTurn; j++) {
    const angle = (j / pointsPerTurn) * Math.PI; // 0 to PI (half circle)
    const radius = spiralRadius + (turn + j / pointsPerTurn) * spiralSpacing;
    // Original x, z
    let x = Math.cos(angle) * radius;
    let z = Math.sin(angle) * radius;
    // Rotate 90 degrees counterclockwise: (x, z) -> (-z, x)
    const rotX = -z;
    const rotZ = x;
    // Shift right by 30 units
    PATH_POINTS.push({x: rotX + 30, z: rotZ});
  }
}

// Make PATH_POINTS globally accessible
window.PATH_POINTS = PATH_POINTS;

function Enemy(scene, type) {
  const t = ENEMY_TYPES[type] || ENEMY_TYPES.zombie;
  this.type = type;
  this.maxHealth = t.health;
  this.health = t.health;
  this.speed = t.speed;
  this.reward = t.reward;
  this.name = t.name;
  
  // Path following variables
  this.pathProgress = 0; // 0 = start, 1 = end
  
  // Create zombie mesh
  this.mesh = this.createZombieMesh(t.color);
  this.mesh.position.set(PATH_POINTS[0].x, 1, PATH_POINTS[0].z);
  scene.add(this.mesh);
  this.reachedEnd = false;

  // Health bar (larger and more visible)
  this.healthBar = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 0.3),
    new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide })
  );
  this.healthBar.position.y = 2.5;
  this.mesh.add(this.healthBar);
  
  // Health bar background
  this.healthBarBg = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 0.3),
    new THREE.MeshBasicMaterial({ color: 0x333333, side: THREE.DoubleSide })
  );
  this.healthBarBg.position.y = 2.5;
  this.healthBarBg.position.z = -0.01;
  this.mesh.add(this.healthBarBg);
}

Enemy.prototype.createZombieMesh = function(color) {
  const zombieGroup = new THREE.Group();
  
  // Body
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.6, 0.8, 1.5, 8),
    new THREE.MeshPhongMaterial({ color: color })
  );
  body.position.y = 0.75;
  
  // Head
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 8, 8),
    new THREE.MeshPhongMaterial({ color: color })
  );
  head.position.y = 1.5;
  
  // Arms
  const armGeometry = new THREE.CylinderGeometry(0.15, 0.15, 1, 6);
  const leftArm = new THREE.Mesh(armGeometry, new THREE.MeshPhongMaterial({ color: color }));
  const rightArm = new THREE.Mesh(armGeometry, new THREE.MeshPhongMaterial({ color: color }));
  leftArm.position.set(-0.8, 1, 0);
  rightArm.position.set(0.8, 1, 0);
  
  // Legs
  const legGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.8, 6);
  const leftLeg = new THREE.Mesh(legGeometry, new THREE.MeshPhongMaterial({ color: color }));
  const rightLeg = new THREE.Mesh(legGeometry, new THREE.MeshPhongMaterial({ color: color }));
  leftLeg.position.set(-0.3, 0, 0);
  rightLeg.position.set(0.3, 0, 0);
  
  zombieGroup.add(body);
  zombieGroup.add(head);
  zombieGroup.add(leftArm);
  zombieGroup.add(rightArm);
  zombieGroup.add(leftLeg);
  zombieGroup.add(rightLeg);
  
  return zombieGroup;
};

Enemy.prototype.update = function(dt) {
  // Move along the path
  const totalPathLength = this.calculateTotalPathLength();
  const distanceToMove = this.speed * dt;
  
  // Update path progress
  this.pathProgress += distanceToMove / totalPathLength;
  
  if (this.pathProgress >= 1) {
    this.pathProgress = 1;
    this.reachedEnd = true;
    console.log("🎯 ENEMY REACHED END IN UPDATE:", this.name || this.type, "Path progress:", this.pathProgress);
  }
  
  // Calculate position along path
  const position = this.getPositionAlongPath(this.pathProgress);
  this.mesh.position.x = position.x;
  this.mesh.position.z = position.z;
  
  // Make health bar face camera
  if (window.camera) {
    this.healthBar.lookAt(window.camera.position);
    this.healthBarBg.lookAt(window.camera.position);
  }
};

Enemy.prototype.calculateTotalPathLength = function() {
  let totalLength = 0;
  for (let i = 0; i < PATH_POINTS.length - 1; i++) {
    const start = PATH_POINTS[i];
    const end = PATH_POINTS[i + 1];
    const distance = Math.sqrt((end.x - start.x) ** 2 + (end.z - start.z) ** 2);
    totalLength += distance;
  }
  return totalLength;
};

Enemy.prototype.getPositionAlongPath = function(progress) {
  if (progress <= 0) return PATH_POINTS[0];
  if (progress >= 1) return PATH_POINTS[PATH_POINTS.length - 1];
  
  // Calculate total path length
  const totalLength = this.calculateTotalPathLength();
  const targetDistance = progress * totalLength;
  
  let currentDistance = 0;
  for (let i = 0; i < PATH_POINTS.length - 1; i++) {
    const start = PATH_POINTS[i];
    const end = PATH_POINTS[i + 1];
    const segmentLength = Math.sqrt((end.x - start.x) ** 2 + (end.z - start.z) ** 2);
    
    if (currentDistance + segmentLength >= targetDistance) {
      // We're in this segment
      const segmentProgress = (targetDistance - currentDistance) / segmentLength;
      return {
        x: start.x + (end.x - start.x) * segmentProgress,
        z: start.z + (end.z - start.z) * segmentProgress
      };
    }
    
    currentDistance += segmentLength;
  }
  
  return PATH_POINTS[PATH_POINTS.length - 1];
};

Enemy.prototype.takeDamage = function(dmg) {
  this.health -= dmg;
  // Update health bar
  const healthRatio = this.health / this.maxHealth;
  this.healthBar.scale.x = Math.max(0, healthRatio);
  this.healthBar.material.color.set(healthRatio > 0.5 ? 0x00ff00 : (healthRatio > 0.2 ? 0xffff00 : 0xff0000));
  if (this.health <= 0 && !this.dead) {
    this.dead = true;
    // Only award money if not already dead and if reward is a number
    if (typeof this.reward === 'number') {
      window.money += this.reward;
      window.updateUI && window.updateUI();
    }
    // Remove mesh from scene
    if (this.mesh && this.mesh.parent) {
      this.mesh.parent.remove(this.mesh);
    }
  }
};

window.spawnEnemy = function(scene, type) {
  const enemy = new Enemy(scene, type);
  enemies.push(enemy);
};

window.updateEnemies = function(dt) {
  for (let i = enemies.length - 1; i >= 0; i--) {
    try {
      if (!enemies[i] || enemies[i].dead) {
        // Remove mesh from scene if present
        if (enemies[i] && enemies[i].mesh && enemies[i].mesh.parent) {
          enemies[i].mesh.parent.remove(enemies[i].mesh);
        }
        enemies.splice(i, 1);
        continue;
      }
      enemies[i].update(dt);
      // Leech: if reached end, steal money
      if (enemies[i].type === 'leech' && enemies[i].reachedEnd) {
        window.money = Math.max(0, window.money - 100);
        window.updateUI && window.updateUI();
        if (enemies[i].mesh && enemies[i].mesh.parent) {
          enemies[i].mesh.parent.remove(enemies[i].mesh);
        }
        enemies.splice(i, 1);
        continue;
      }
      // Regular enemies: if reached end
      if (enemies[i].reachedEnd) {
        console.log("🎯 ENEMY REACHED END:", enemies[i].name || enemies[i].type, "Is boss:", enemies[i].isBoss);
        console.log("🎯 Current health before damage:", window.health);
        console.log("🎯 loseHealth function exists:", typeof window.loseHealth);
        
        if (enemies[i].mesh && enemies[i].mesh.parent) {
          enemies[i].mesh.parent.remove(enemies[i].mesh);
        }
        // CRITICAL: Bosses should NEVER cause health loss
        if (enemies[i].isBoss === true) {
          console.log("🎯 Boss reached end - NO HEALTH LOSS - this should not happen!");
          // Boss reached end - just remove it without health loss
        } else if (window.loseHealth) {
          console.log("🎯 Losing health from regular enemy - calling loseHealth(1)");
          window.loseHealth(1);
          console.log("🎯 Health after damage:", window.health);
        } else {
          console.log("🎯 ERROR: loseHealth function not found!");
        }
        enemies.splice(i, 1);
      }
    } catch (error) {
      console.error("Error updating enemy:", error);
      // Remove problematic enemy
      if (enemies[i] && enemies[i].mesh && enemies[i].mesh.parent) {
        enemies[i].mesh.parent.remove(enemies[i].mesh);
      }
      enemies.splice(i, 1);
    }
  }
  // Check if wave is complete (all enemies defeated)
  if (enemies.length === 0 && window.waveInProgress) {
    console.log("Wave complete! Starting next wave...");
    window.waveInProgress = false;
    window.wave++;
    // Apply money multiplier every 10 waves
    if (window.wave % 10 === 0) {
      const multiplier = 1 + (window.wave / 10) * 0.1; // 0.1x per 10 waves
      window.money = Math.floor(window.money * multiplier);
      console.log(`💰 Wave ${window.wave} bonus! Money multiplied by ${multiplier.toFixed(1)}x`);
      // Show money bonus notification
      const bonusNotification = document.createElement('div');
      bonusNotification.style.position = 'fixed';
      bonusNotification.style.top = '30%';
      bonusNotification.style.left = '50%';
      bonusNotification.style.transform = 'translate(-50%, -50%)';
      bonusNotification.style.padding = '15px';
      bonusNotification.style.background = 'rgba(255, 215, 0, 0.9)';
      bonusNotification.style.border = '2px solid #FFD700';
      bonusNotification.style.borderRadius = '8px';
      bonusNotification.style.color = '#000';
      bonusNotification.style.fontSize = '18px';
      bonusNotification.style.fontWeight = 'bold';
      bonusNotification.style.textAlign = 'center';
      bonusNotification.style.zIndex = '10000';
      bonusNotification.innerHTML = `\n        <h3>💰 Wave ${window.wave} Bonus! 💰</h3>\n        <p>Money multiplied by ${multiplier.toFixed(1)}x</p>\n      `;
      document.body.appendChild(bonusNotification);
      // Remove notification after 3 seconds
      setTimeout(() => {
        if (bonusNotification.parentElement) {
          document.body.removeChild(bonusNotification);
        }
      }, 3000);
    }
    // Show crate reward
    if (window.showCrateReward) {
      window.showCrateReward();
    }
    // Start next wave after a short delay
    setTimeout(() => {
      if (window.startWave) {
        window.startWave();
      }
    }, 100); // 0.1 second delay between waves
  }
};

// Gargantuan Zombie class - massive zombie with 1 billion HP
function GargantuanZombie(scene) {
  this.maxHealth = 1000; // Reduced from 1 billion to 1000
  this.health = 1000;
  this.speed = 0.5; // Increased from 0.2 to 0.5
  this.reward = 500; // Reduced from Infinity to 500
  this.name = "Gargantuan Zombie";
  this.dead = false;
  
  // Path following variables
  this.pathProgress = 0; // 0 = start, 1 = end
  
  // Create gargantuan zombie mesh (massive zombie)
  this.mesh = new THREE.Group();
  
  // Massive body (simplified)
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(3, 3, 8, 16),
    new THREE.MeshPhongMaterial({ color: 0xFF4500 }) // Orange-red for fire effect
  );
  body.position.y = 4;
  
  // Massive head
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(2.5, 16, 16),
    new THREE.MeshPhongMaterial({ color: 0xFF4500 })
  );
  head.position.y = 8.5;
  
  // Eyes (glowing red)
  const eyeGeometry = new THREE.SphereGeometry(0.3, 8, 8);
  const leftEye = new THREE.Mesh(eyeGeometry, new THREE.MeshPhongMaterial({ 
    color: 0xFF0000,
    emissive: 0x330000
  }));
  const rightEye = new THREE.Mesh(eyeGeometry, new THREE.MeshPhongMaterial({ 
    color: 0xFF0000,
    emissive: 0x330000
  }));
  leftEye.position.set(-1, 9, 2);
  rightEye.position.set(1, 9, 2);
  
  this.mesh.add(body);
  this.mesh.add(head);
  this.mesh.add(leftEye);
  this.mesh.add(rightEye);
  
  this.mesh.position.set(PATH_POINTS[0].x, 1, PATH_POINTS[0].z);
  scene.add(this.mesh);
  this.reachedEnd = false;

  // Health bar
  this.healthBar = new THREE.Mesh(
    new THREE.PlaneGeometry(8, 0.5),
    new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide })
  );
  this.healthBar.position.y = 12;
  this.mesh.add(this.healthBar);
}

GargantuanZombie.prototype.update = function(dt) {
  // Move along the path (same logic as regular enemies)
  const totalPathLength = this.calculateTotalPathLength();
  const distanceToMove = this.speed * dt;
  
  // Update path progress
  this.pathProgress += distanceToMove / totalPathLength;
  
  if (this.pathProgress >= 1) {
    this.reachedEnd = true;
    console.log("🎯 GARGANTUAN ZOMBIE REACHED END");
    return false; // Let main enemy update loop handle damage
  }
  
  // Calculate position along path
  const position = this.getPositionAlongPath(this.pathProgress);
  this.mesh.position.x = position.x;
  this.mesh.position.z = position.z;
  
  // Make health bar face camera
  if (window.camera) {
    this.healthBar.lookAt(window.camera.position);
  }
  
  return false; // Keep in enemies array
};

GargantuanZombie.prototype.calculateTotalPathLength = function() {
  let totalLength = 0;
  for (let i = 0; i < PATH_POINTS.length - 1; i++) {
    const start = PATH_POINTS[i];
    const end = PATH_POINTS[i + 1];
    const distance = Math.sqrt((end.x - start.x) ** 2 + (end.z - start.z) ** 2);
    totalLength += distance;
  }
  return totalLength;
};

GargantuanZombie.prototype.getPositionAlongPath = function(progress) {
  if (progress <= 0) return PATH_POINTS[0];
  if (progress >= 1) return PATH_POINTS[PATH_POINTS.length - 1];
  
  // Calculate total path length
  const totalLength = this.calculateTotalPathLength();
  const targetDistance = progress * totalLength;
  
  let currentDistance = 0;
  for (let i = 0; i < PATH_POINTS.length - 1; i++) {
    const start = PATH_POINTS[i];
    const end = PATH_POINTS[i + 1];
    const segmentLength = Math.sqrt((end.x - start.x) ** 2 + (end.z - start.z) ** 2);
    
    if (currentDistance + segmentLength >= targetDistance) {
      // We're in this segment
      const segmentProgress = (targetDistance - currentDistance) / segmentLength;
      return {
        x: start.x + (end.x - start.x) * segmentProgress,
        z: start.z + (end.z - start.z) * segmentProgress
      };
    }
    
    currentDistance += segmentLength;
  }
  
  return PATH_POINTS[PATH_POINTS.length - 1];
};

GargantuanZombie.prototype.takeDamage = function(dmg) {
  console.log("Gargantuan taking damage:", dmg, "Current health:", this.health);
  this.health -= dmg;
  console.log("Gargantuan new health:", this.health);
  
  // Update health bar
  const healthRatio = this.health / this.maxHealth;
  this.healthBar.scale.x = Math.max(0, healthRatio);
  this.healthBar.material.color.set(healthRatio > 0.5 ? 0x00ff00 : (healthRatio > 0.2 ? 0xffff00 : 0xff0000));
  
  if (this.health <= 0) {
    console.log("Gargantuan zombie killed!");
    this.dead = true;
    if (window.addMoney) {
      window.addMoney(this.reward);
      console.log("Added money for killing gargantuan:", this.reward);
    }
    // Unlock Duck God when gargantuan is killed
    if (window.unlockDuckGod) {
      window.unlockDuckGod();
    }
  }
};

// Admin Zombie class - ultimate zombie with massive HP
function AdminZombie(scene) {
  this.maxHealth = 5000; // Reduced from 999 trillion to 5000
  this.health = this.maxHealth;
  this.speed = 0.3; // Reduced from 35 to 0.3
  this.reward = 1000; // Changed from -99999999999 to 1000 (positive reward)
  this.name = "Admin Zombie";
  this.dead = false;
  
  // Path following variables
  this.pathProgress = 0; // 0 = start, 1 = end
  
  // Create admin zombie mesh (divine zombie)
  this.mesh = new THREE.Group();
  
  // Divine aura (massive glowing sphere)
  const aura = new THREE.Mesh(
    new THREE.SphereGeometry(4, 32, 32),
    new THREE.MeshPhongMaterial({ 
      color: 0xFFFFFF,
      transparent: true,
      opacity: 0.4,
      emissive: 0xFFFFFF,
      emissiveIntensity: 0.8
    })
  );
  
  // Admin body (crown-like)
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(2, 2, 6, 24),
    new THREE.MeshPhongMaterial({ 
      color: 0xFFD700,
      emissive: 0xFFD700,
      emissiveIntensity: 0.5
    })
  );
  body.position.y = 3;
  
  // Crown
  const crown = new THREE.Mesh(
    new THREE.CylinderGeometry(2.5, 2.5, 1, 24),
    new THREE.MeshPhongMaterial({ 
      color: 0xFFD700,
      emissive: 0xFFD700,
      emissiveIntensity: 0.7
    })
  );
  crown.position.y = 6.5;
  
  // Crown spikes
  for (let i = 0; i < 8; i++) {
    const spike = new THREE.Mesh(
      new THREE.ConeGeometry(0.3, 1, 8),
      new THREE.MeshPhongMaterial({ 
        color: 0xFF4500,
        emissive: 0xFF4500,
        emissiveIntensity: 0.5
      })
    );
    spike.position.y = 7;
    spike.position.x = Math.cos(i * Math.PI / 4) * 2.5;
    spike.position.z = Math.sin(i * Math.PI / 4) * 2.5;
    this.mesh.add(spike);
  }
  
  // Divine eyes (glowing purple)
  const eyeGeometry = new THREE.SphereGeometry(0.4, 16, 16);
  const leftEye = new THREE.Mesh(eyeGeometry, new THREE.MeshPhongMaterial({ 
    color: 0x800080,
    emissive: 0x800080,
    emissiveIntensity: 1.0
  }));
  const rightEye = new THREE.Mesh(eyeGeometry, new THREE.MeshPhongMaterial({ 
    color: 0x800080,
    emissive: 0x800080,
    emissiveIntensity: 1.0
  }));
  leftEye.position.set(-0.8, 5, 1.5);
  rightEye.position.set(0.8, 5, 1.5);
  
  // Admin staff
  const staff = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.2, 8, 16),
    new THREE.MeshPhongMaterial({ 
      color: 0x4B0082,
      emissive: 0x4B0082,
      emissiveIntensity: 0.3
    })
  );
  staff.position.set(2, 4, 0);
  staff.rotation.z = Math.PI / 6;
  
  // Staff orb
  const orb = new THREE.Mesh(
    new THREE.SphereGeometry(0.8, 16, 16),
    new THREE.MeshPhongMaterial({ 
      color: 0x00FFFF,
      emissive: 0x00FFFF,
      emissiveIntensity: 0.8
    })
  );
  orb.position.set(3, 6, 0);
  
  this.mesh.add(aura);
  this.mesh.add(body);
  this.mesh.add(crown);
  this.mesh.add(leftEye);
  this.mesh.add(rightEye);
  this.mesh.add(staff);
  this.mesh.add(orb);
  
  this.mesh.position.set(PATH_POINTS[0].x, 1, PATH_POINTS[0].z);
  scene.add(this.mesh);
  this.reachedEnd = false;

  // Massive health bar
  this.healthBar = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 0.8),
    new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide })
  );
  this.healthBar.position.y = 10;
  this.mesh.add(this.healthBar);
}

AdminZombie.prototype.update = function(dt) {
  // Move along the path (same logic as regular enemies)
  const totalPathLength = this.calculateTotalPathLength();
  const distanceToMove = this.speed * dt;
  
  // Update path progress
  this.pathProgress += distanceToMove / totalPathLength;
  
  if (this.pathProgress >= 1) {
    this.reachedEnd = true;
    console.log("🎯 ADMIN ZOMBIE REACHED END");
    return false; // Let main enemy update loop handle damage
  }
  
  // Calculate position along path
  const position = this.getPositionAlongPath(this.pathProgress);
  this.mesh.position.x = position.x;
  this.mesh.position.z = position.z;
  
  // Make health bar face camera
  if (window.camera) {
    this.healthBar.lookAt(window.camera.position);
  }
  
  return false; // Keep in enemies array
};

AdminZombie.prototype.calculateTotalPathLength = function() {
  let totalLength = 0;
  for (let i = 0; i < PATH_POINTS.length - 1; i++) {
    const start = PATH_POINTS[i];
    const end = PATH_POINTS[i + 1];
    const distance = Math.sqrt((end.x - start.x) ** 2 + (end.z - start.z) ** 2);
    totalLength += distance;
  }
  return totalLength;
};

AdminZombie.prototype.getPositionAlongPath = function(progress) {
  if (progress <= 0) return PATH_POINTS[0];
  if (progress >= 1) return PATH_POINTS[PATH_POINTS.length - 1];
  
  // Calculate total path length
  const totalLength = this.calculateTotalPathLength();
  const targetDistance = progress * totalLength;
  
  let currentDistance = 0;
  for (let i = 0; i < PATH_POINTS.length - 1; i++) {
    const start = PATH_POINTS[i];
    const end = PATH_POINTS[i + 1];
    const segmentLength = Math.sqrt((end.x - start.x) ** 2 + (end.z - start.z) ** 2);
    
    if (currentDistance + segmentLength >= targetDistance) {
      // We're in this segment
      const segmentProgress = (targetDistance - currentDistance) / segmentLength;
      return {
        x: start.x + (end.x - start.x) * segmentProgress,
        z: start.z + (end.z - start.z) * segmentProgress
      };
    }
    
    currentDistance += segmentLength;
  }
  
  return PATH_POINTS[PATH_POINTS.length - 1];
};

AdminZombie.prototype.takeDamage = function(dmg) {
  console.log("Admin taking damage:", dmg, "Current health:", this.health);
  this.health -= dmg;
  console.log("Admin new health:", this.health);
  
  // Update health bar
  const healthRatio = this.health / this.maxHealth;
  this.healthBar.scale.x = Math.max(0, healthRatio);
  this.healthBar.material.color.set(healthRatio > 0.5 ? 0x00ff00 : (healthRatio > 0.2 ? 0xffff00 : 0xff0000));
  
  if (this.health <= 0) {
    console.log("Admin zombie killed!");
    this.dead = true;
    if (window.addMoney) {
      window.addMoney(this.reward);
      console.log("Added infinite money for killing admin!");
    }
  }
};

// Speed Demon class - really really really fast zombie
function SpeedDemon(scene) {
  this.maxHealth = 3; // Very low health due to speed
  this.health = 3;
  this.speed = 25; // Really really really fast!
  this.reward = 15;
  this.name = "Speed Demon";
  this.dead = false;
  
  // Path following variables
  this.pathProgress = 0; // 0 = start, 1 = end
  
  // Create speed demon mesh (streamlined for speed)
  this.mesh = new THREE.Group();
  
  // Streamlined body (aerodynamic)
  const body = new THREE.Mesh(
    new THREE.ConeGeometry(0.4, 1.2, 8),
    new THREE.MeshPhongMaterial({ 
      color: 0xFF00FF,
      emissive: 0xFF00FF,
      emissiveIntensity: 0.3
    })
  );
  body.position.y = 0.6;
  body.rotation.x = Math.PI / 2;
  
  // Speed lines (trail effect)
  for (let i = 0; i < 5; i++) {
    const speedLine = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, 1, 4),
      new THREE.MeshPhongMaterial({ 
        color: 0x00FFFF,
        emissive: 0x00FFFF,
        emissiveIntensity: 0.8
      })
    );
    speedLine.position.set(
      (Math.random() - 0.5) * 0.8,
      0.6,
      -0.5 - i * 0.3
    );
    speedLine.rotation.x = Math.PI / 2;
    this.mesh.add(speedLine);
  }
  
  // Glowing eyes (intense)
  const eyeGeometry = new THREE.SphereGeometry(0.1, 8, 8);
  const leftEye = new THREE.Mesh(eyeGeometry, new THREE.MeshPhongMaterial({ 
    color: 0xFFFF00,
    emissive: 0xFFFF00,
    emissiveIntensity: 1.0
  }));
  const rightEye = new THREE.Mesh(eyeGeometry, new THREE.MeshPhongMaterial({ 
    color: 0xFFFF00,
    emissive: 0xFFFF00,
    emissiveIntensity: 1.0
  }));
  leftEye.position.set(-0.2, 0.8, 0.3);
  rightEye.position.set(0.2, 0.8, 0.3);
  
  // Speed aura (energy field)
  const aura = new THREE.Mesh(
    new THREE.SphereGeometry(0.8, 8, 8),
    new THREE.MeshPhongMaterial({ 
      color: 0xFF00FF,
      transparent: true,
      opacity: 0.3,
      emissive: 0xFF00FF,
      emissiveIntensity: 0.5
    })
  );
  aura.position.y = 0.6;
  
  this.mesh.add(body);
  this.mesh.add(leftEye);
  this.mesh.add(rightEye);
  this.mesh.add(aura);
  
  this.mesh.position.set(PATH_POINTS[0].x, 1, PATH_POINTS[0].z);
  scene.add(this.mesh);
  this.reachedEnd = false;

  // Health bar
  this.healthBar = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 0.2),
    new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide })
  );
  this.healthBar.position.y = 1.5;
  this.mesh.add(this.healthBar);
  
  // Health bar background
  this.healthBarBg = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 0.2),
    new THREE.MeshBasicMaterial({ color: 0x333333, side: THREE.DoubleSide })
  );
  this.healthBarBg.position.y = 1.5;
  this.healthBarBg.position.z = -0.01;
  this.mesh.add(this.healthBarBg);
  
  // Add speed trail effect
  this.trailTime = 0;
  this.trailSpeed = 0.1;
}

SpeedDemon.prototype.update = function(dt) {
  // Move along the path (same logic as regular enemies)
  const totalPathLength = this.calculateTotalPathLength();
  const distanceToMove = this.speed * dt;
  
  // Update path progress
  this.pathProgress += distanceToMove / totalPathLength;
  
  if (this.pathProgress >= 1) {
    this.pathProgress = 1;
    this.reachedEnd = true;
  }
  
  // Calculate position along path
  const position = this.getPositionAlongPath(this.pathProgress);
  this.mesh.position.x = position.x;
  this.mesh.position.z = position.z;
  
  // Make health bar face camera
  if (window.camera) {
    this.healthBar.lookAt(window.camera.position);
    this.healthBarBg.lookAt(window.camera.position);
  }
  
  // Update speed trail effect
  this.trailTime += dt;
  const trailPulse = Math.sin(this.trailTime * this.trailSpeed) * 0.2 + 1;
  this.mesh.children.forEach(child => {
    if (child.material && child.material.emissive) {
      child.material.emissiveIntensity = 0.5 * trailPulse;
    }
  });
};

SpeedDemon.prototype.calculateTotalPathLength = function() {
  let totalLength = 0;
  for (let i = 0; i < PATH_POINTS.length - 1; i++) {
    const start = PATH_POINTS[i];
    const end = PATH_POINTS[i + 1];
    const distance = Math.sqrt((end.x - start.x) ** 2 + (end.z - start.z) ** 2);
    totalLength += distance;
  }
  return totalLength;
};

SpeedDemon.prototype.getPositionAlongPath = function(progress) {
  if (progress <= 0) return PATH_POINTS[0];
  if (progress >= 1) return PATH_POINTS[PATH_POINTS.length - 1];
  
  // Calculate total path length
  const totalLength = this.calculateTotalPathLength();
  const targetDistance = progress * totalLength;
  
  let currentDistance = 0;
  for (let i = 0; i < PATH_POINTS.length - 1; i++) {
    const start = PATH_POINTS[i];
    const end = PATH_POINTS[i + 1];
    const segmentLength = Math.sqrt((end.x - start.x) ** 2 + (end.z - start.z) ** 2);
    
    if (currentDistance + segmentLength >= targetDistance) {
      // We're in this segment
      const segmentProgress = (targetDistance - currentDistance) / segmentLength;
      return {
        x: start.x + (end.x - start.x) * segmentProgress,
        z: start.z + (end.z - start.z) * segmentProgress
      };
    }
    
    currentDistance += segmentLength;
  }
  
  return PATH_POINTS[PATH_POINTS.length - 1];
};

SpeedDemon.prototype.takeDamage = function(dmg) {
  this.health -= dmg;
  // Update health bar
  const healthRatio = this.health / this.maxHealth;
  this.healthBar.scale.x = Math.max(0, healthRatio);
  this.healthBar.material.color.set(healthRatio > 0.5 ? 0x00ff00 : (healthRatio > 0.2 ? 0xffff00 : 0xff0000));

  if (this.health <= 0) {
    this.dead = true;
  }
};

// Iron Titan class - very very very strong zombie
function IronTitan(scene) {
  this.maxHealth = 100000; // 100k HP as requested
  this.health = 100000;
  this.speed = 1; // Very slow due to massive weight
  this.reward = 10000; // Increased to $10,000
  this.name = "Iron Titan";
  this.dead = false;
  
  // Path following variables
  this.pathProgress = 0; // 0 = start, 1 = end
  
  // Create iron titan mesh (massive and armored)
  this.mesh = new THREE.Group();
  
  // Massive armored body (multiple layers)
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(2, 2.5, 6, 12),
    new THREE.MeshPhongMaterial({ 
      color: 0x8B4513,
      emissive: 0x4A4A4A,
      emissiveIntensity: 0.2
    })
  );
  body.position.y = 3;
  
  // Iron armor plates
  for (let i = 0; i < 8; i++) {
    const armorPlate = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 1, 2),
      new THREE.MeshPhongMaterial({ 
        color: 0x696969,
        emissive: 0x2A2A2A,
        emissiveIntensity: 0.3
      })
    );
    armorPlate.position.y = 3;
    armorPlate.position.x = Math.cos(i * Math.PI / 4) * 2.2;
    armorPlate.position.z = Math.sin(i * Math.PI / 4) * 2.2;
    this.mesh.add(armorPlate);
  }
  
  // Massive head with helmet
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(1.5, 12, 12),
    new THREE.MeshPhongMaterial({ 
      color: 0x8B4513,
      emissive: 0x4A4A4A,
      emissiveIntensity: 0.2
    })
  );
  head.position.y = 6.5;
  
  // Helmet visor
  const visor = new THREE.Mesh(
    new THREE.BoxGeometry(2, 0.5, 0.1),
    new THREE.MeshPhongMaterial({ 
      color: 0x000000,
      emissive: 0x000000,
      emissiveIntensity: 0.5
    })
  );
  visor.position.y = 6.5;
  visor.position.z = 1.2;
  this.mesh.add(visor);
  
  // Massive arms with armor
  const armGeometry = new THREE.CylinderGeometry(0.8, 0.8, 3, 8);
  const leftArm = new THREE.Mesh(armGeometry, new THREE.MeshPhongMaterial({ 
    color: 0x8B4513,
    emissive: 0x4A4A4A,
    emissiveIntensity: 0.2
  }));
  const rightArm = new THREE.Mesh(armGeometry, new THREE.MeshPhongMaterial({ 
    color: 0x8B4513,
    emissive: 0x4A4A4A,
    emissiveIntensity: 0.2
  }));
  leftArm.position.set(-2.5, 4, 0);
  rightArm.position.set(2.5, 4, 0);
  
  // Massive legs with armor
  const legGeometry = new THREE.CylinderGeometry(1, 1, 4, 8);
  const leftLeg = new THREE.Mesh(legGeometry, new THREE.MeshPhongMaterial({ 
    color: 0x8B4513,
    emissive: 0x4A4A4A,
    emissiveIntensity: 0.2
  }));
  const rightLeg = new THREE.Mesh(legGeometry, new THREE.MeshPhongMaterial({ 
    color: 0x8B4513,
    emissive: 0x4A4A4A,
    emissiveIntensity: 0.2
  }));
  leftLeg.position.set(-1, 0, 0);
  rightLeg.position.set(1, 0, 0);
  
  // Strength aura (energy field)
  const aura = new THREE.Mesh(
    new THREE.SphereGeometry(4, 12, 12),
    new THREE.MeshPhongMaterial({ 
      color: 0xFF4500,
      transparent: true,
      opacity: 0.2,
      emissive: 0xFF4500,
      emissiveIntensity: 0.3
    })
  );
  aura.position.y = 3;
  
  // Ground impact effect (dust cloud)
  const dustCloud = new THREE.Mesh(
    new THREE.SphereGeometry(3, 8, 8),
    new THREE.MeshPhongMaterial({ 
      color: 0x8B4513,
      transparent: true,
      opacity: 0.4
    })
  );
  dustCloud.position.y = 0.5;
  
  this.mesh.add(body);
  this.mesh.add(head);
  this.mesh.add(leftArm);
  this.mesh.add(rightArm);
  this.mesh.add(leftLeg);
  this.mesh.add(rightLeg);
  this.mesh.add(aura);
  this.mesh.add(dustCloud);
  
  this.mesh.position.set(PATH_POINTS[0].x, 1, PATH_POINTS[0].z);
  scene.add(this.mesh);
  this.reachedEnd = false;

  // Massive health bar
  this.healthBar = new THREE.Mesh(
    new THREE.PlaneGeometry(6, 0.5),
    new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide })
  );
  this.healthBar.position.y = 9;
  this.mesh.add(this.healthBar);
  
  // Health bar background
  this.healthBarBg = new THREE.Mesh(
    new THREE.PlaneGeometry(6, 0.5),
    new THREE.MeshBasicMaterial({ color: 0x333333, side: THREE.DoubleSide })
  );
  this.healthBarBg.position.y = 9;
  this.healthBarBg.position.z = -0.01;
  this.mesh.add(this.healthBarBg);
  
  // Add strength pulse effect
  this.pulseTime = 0;
  this.pulseSpeed = 0.05;
}

IronTitan.prototype.update = function(dt) {
  // Move along the path (same logic as regular enemies)
  const totalPathLength = this.calculateTotalPathLength();
  const distanceToMove = this.speed * dt;
  
  // Update path progress
  this.pathProgress += distanceToMove / totalPathLength;
  
  if (this.pathProgress >= 1) {
    this.pathProgress = 1;
    this.reachedEnd = true;
  }
  
  // Calculate position along path
  const position = this.getPositionAlongPath(this.pathProgress);
  this.mesh.position.x = position.x;
  this.mesh.position.z = position.z;
  
  // Make health bar face camera
  if (window.camera) {
    this.healthBar.lookAt(window.camera.position);
    this.healthBarBg.lookAt(window.camera.position);
  }
  
  // Update strength pulse effect
  this.pulseTime += dt;
  const pulse = Math.sin(this.pulseTime * this.pulseSpeed) * 0.2 + 1;
  this.mesh.children.forEach(child => {
    if (child.material && child.material.emissive) {
      child.material.emissiveIntensity = 0.2 * pulse;
    }
  });
  
  // Ground shake effect (make dust cloud pulse)
  const dustPulse = Math.sin(this.pulseTime * this.pulseSpeed * 2) * 0.3 + 1;
  this.mesh.children.forEach(child => {
    if (child.material && child.material.opacity === 0.4) {
      child.scale.set(dustPulse, dustPulse, dustPulse);
    }
  });
};

IronTitan.prototype.calculateTotalPathLength = function() {
  let totalLength = 0;
  for (let i = 0; i < PATH_POINTS.length - 1; i++) {
    const start = PATH_POINTS[i];
    const end = PATH_POINTS[i + 1];
    const distance = Math.sqrt((end.x - start.x) ** 2 + (end.z - start.z) ** 2);
    totalLength += distance;
  }
  return totalLength;
};

IronTitan.prototype.getPositionAlongPath = function(progress) {
  if (progress <= 0) return PATH_POINTS[0];
  if (progress >= 1) return PATH_POINTS[PATH_POINTS.length - 1];
  
  // Calculate total path length
  const totalLength = this.calculateTotalPathLength();
  const targetDistance = progress * totalLength;
  
  let currentDistance = 0;
  for (let i = 0; i < PATH_POINTS.length - 1; i++) {
    const start = PATH_POINTS[i];
    const end = PATH_POINTS[i + 1];
    const segmentLength = Math.sqrt((end.x - start.x) ** 2 + (end.z - start.z) ** 2);
    
    if (currentDistance + segmentLength >= targetDistance) {
      // We're in this segment
      const segmentProgress = (targetDistance - currentDistance) / segmentLength;
      return {
        x: start.x + (end.x - start.x) * segmentProgress,
        z: start.z + (end.z - start.z) * segmentProgress
      };
    }
    
    currentDistance += segmentLength;
  }
  
  return PATH_POINTS[PATH_POINTS.length - 1];
};

IronTitan.prototype.takeDamage = function(dmg) {
  // Iron Titan takes reduced damage (50% damage resistance)
  const actualDamage = dmg * 0.5;
  this.health -= actualDamage;
  
  console.log(`🛡️ Iron Titan took ${dmg} damage, but only ${actualDamage} due to armor!`);
  
  // Update health bar
  const healthRatio = this.health / this.maxHealth;
  this.healthBar.scale.x = Math.max(0, healthRatio);
  this.healthBar.material.color.set(healthRatio > 0.5 ? 0x00ff00 : (healthRatio > 0.2 ? 0xffff00 : 0xff0000));

  if (this.health <= 0) {
    this.dead = true;
    console.log("🛡️ Iron Titan defeated!");
  }
};

// Acid Spitter class - spits acid that damages towers
function AcidSpitter(scene) {
  this.maxHealth = 50;
  this.health = 50;
  this.speed = 3;
  this.reward = 25;
  this.name = "Acid Spitter";
  this.dead = false;
  this.lastSpit = 0;
  this.spitRate = 3; // Spit every 3 seconds
  
  // Path following variables
  this.pathProgress = 0;
  
  // Create acid spitter mesh
  this.mesh = new THREE.Group();
  
  // Bloated body (full of acid)
  const body = new THREE.Mesh(
    new THREE.SphereGeometry(0.8, 8, 8),
    new THREE.MeshPhongMaterial({ 
      color: 0x00FF00,
      emissive: 0x00FF00,
      emissiveIntensity: 0.3
    })
  );
  body.position.y = 0.8;
  
  // Acid sacs
  for (let i = 0; i < 3; i++) {
    const sac = new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 6, 6),
      new THREE.MeshPhongMaterial({ 
        color: 0x00FF00,
        transparent: true,
        opacity: 0.7
      })
    );
    sac.position.set(
      (Math.random() - 0.5) * 1.2,
      0.8,
      (Math.random() - 0.5) * 1.2
    );
    this.mesh.add(sac);
  }
  
  // Acid drool
  const drool = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.05, 0.5, 6),
    new THREE.MeshPhongMaterial({ 
      color: 0x00FF00,
      emissive: 0x00FF00,
      emissiveIntensity: 0.8
    })
  );
  drool.position.y = 0.3;
  drool.position.z = 0.5;
  
  this.mesh.add(body);
  this.mesh.add(drool);
  
  this.mesh.position.set(PATH_POINTS[0].x, 1, PATH_POINTS[0].z);
  scene.add(this.mesh);
  this.reachedEnd = false;

  // Health bar
  this.healthBar = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 0.3),
    new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide })
  );
  this.healthBar.position.y = 2.5;
  this.mesh.add(this.healthBar);
  
  this.healthBarBg = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 0.3),
    new THREE.MeshBasicMaterial({ color: 0x333333, side: THREE.DoubleSide })
  );
  this.healthBarBg.position.y = 2.5;
  this.healthBarBg.position.z = -0.01;
  this.mesh.add(this.healthBarBg);
}

AcidSpitter.prototype.update = function(dt) {
  try {
    // Standard path following
    const totalPathLength = this.calculateTotalPathLength();
    const distanceToMove = this.speed * dt;
    
    this.pathProgress += distanceToMove / totalPathLength;
    
    if (this.pathProgress >= 1) {
      this.pathProgress = 1;
      this.reachedEnd = true;
    }
    
    const position = this.getPositionAlongPath(this.pathProgress);
    this.mesh.position.x = position.x;
    this.mesh.position.z = position.z;
    
    // Make health bar face camera
    if (window.camera && this.healthBar) {
      this.healthBar.lookAt(window.camera.position);
      this.healthBarBg.lookAt(window.camera.position);
    }
    
    // Acid spit ability
    this.lastSpit += dt;
    if (this.lastSpit >= this.spitRate && window.towers) {
      this.spitAcid();
      this.lastSpit = 0;
    }
  } catch (error) {
    console.error("Error in AcidSpitter update:", error);
  }
};

AcidSpitter.prototype.spitAcid = function() {
  // Find closest tower
  let closestTower = null;
  let closestDistance = Infinity;
  
  for (let i = 0; i < window.towers.length; i++) {
    const tower = window.towers[i];
    if (tower && tower.mesh) {
      const distance = Math.sqrt(
        Math.pow(tower.mesh.position.x - this.mesh.position.x, 2) +
        Math.pow(tower.mesh.position.z - this.mesh.position.z, 2)
      );
      
      if (distance < closestDistance && distance < 10) { // Range of 10
        closestDistance = distance;
        closestTower = tower;
      }
    }
  }
  
  if (closestTower) {
    console.log(`🧪 Acid Spitter damaged tower: ${closestTower.type || 'Unknown'}`);
    // Damage the tower (reduce its damage temporarily)
    closestTower.damage *= 0.8; // 20% damage reduction
    
    // Create acid projectile effect
    this.createAcidProjectile(closestTower.mesh.position);
  }
};

AcidSpitter.prototype.createAcidProjectile = function(targetPosition) {
  const projectile = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 6, 6),
    new THREE.MeshBasicMaterial({ 
      color: 0x00FF00,
      emissive: 0x00FF00,
      emissiveIntensity: 1.0
    })
  );
  
  projectile.position.copy(this.mesh.position);
  projectile.position.y += 1;
  window.scene.add(projectile);
  
  // Animate projectile to target
  const startPos = projectile.position.clone();
  const endPos = targetPosition.clone();
  endPos.y += 1;
  
  let progress = 0;
  const animate = () => {
    progress += 0.05;
    projectile.position.lerpVectors(startPos, endPos, progress);
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      window.scene.remove(projectile);
    }
  };
  animate();
};

// Electric Zombie class - shocks nearby towers
function ElectricZombie(scene) {
  this.maxHealth = 40;
  this.health = 40;
  this.speed = 5;
  this.reward = 30;
  this.name = "Electric Zombie";
  this.dead = false;
  this.lastShock = 0;
  this.shockRate = 2; // Shock every 2 seconds
  
  // Path following variables
  this.pathProgress = 0;
  
  // Create electric zombie mesh
  this.mesh = new THREE.Group();
  
  // Body with electric effects
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.6, 0.8, 1.5, 8),
    new THREE.MeshPhongMaterial({ 
      color: 0xFFFF00,
      emissive: 0xFFFF00,
      emissiveIntensity: 0.5
    })
  );
  body.position.y = 0.75;
  
  // Electric arcs
  for (let i = 0; i < 5; i++) {
    const arc = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, 1, 4),
      new THREE.MeshPhongMaterial({ 
        color: 0xFFFF00,
        emissive: 0xFFFF00,
        emissiveIntensity: 1.0
      })
    );
    arc.position.set(
      (Math.random() - 0.5) * 1.5,
      0.75,
      (Math.random() - 0.5) * 1.5
    );
    arc.rotation.x = Math.random() * Math.PI;
    arc.rotation.z = Math.random() * Math.PI;
    this.mesh.add(arc);
  }
  
  this.mesh.add(body);
  
  this.mesh.position.set(PATH_POINTS[0].x, 1, PATH_POINTS[0].z);
  scene.add(this.mesh);
  this.reachedEnd = false;

  // Health bar
  this.healthBar = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 0.3),
    new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide })
  );
  this.healthBar.position.y = 2.5;
  this.mesh.add(this.healthBar);
  
  this.healthBarBg = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 0.3),
    new THREE.MeshBasicMaterial({ color: 0x333333, side: THREE.DoubleSide })
  );
  this.healthBarBg.position.y = 2.5;
  this.healthBarBg.position.z = -0.01;
  this.mesh.add(this.healthBarBg);
}

ElectricZombie.prototype.update = function(dt) {
  try {
    // Standard path following
    const totalPathLength = this.calculateTotalPathLength();
    const distanceToMove = this.speed * dt;
    
    this.pathProgress += distanceToMove / totalPathLength;
    
    if (this.pathProgress >= 1) {
      this.pathProgress = 1;
      this.reachedEnd = true;
    }
    
    const position = this.getPositionAlongPath(this.pathProgress);
    this.mesh.position.x = position.x;
    this.mesh.position.z = position.z;
    
    // Make health bar face camera
    if (window.camera && this.healthBar) {
      this.healthBar.lookAt(window.camera.position);
      this.healthBarBg.lookAt(window.camera.position);
    }
    
    // Electric shock ability
    this.lastShock += dt;
    if (this.lastShock >= this.shockRate && window.towers) {
      this.electricShock();
      this.lastShock = 0;
    }
  } catch (error) {
    console.error("Error in ElectricZombie update:", error);
  }
};

ElectricZombie.prototype.electricShock = function() {
  // Shock all towers within range
  let shockedCount = 0;
  
  for (let i = 0; i < window.towers.length; i++) {
    const tower = window.towers[i];
    if (tower && tower.mesh) {
      const distance = Math.sqrt(
        Math.pow(tower.mesh.position.x - this.mesh.position.x, 2) +
        Math.pow(tower.mesh.position.z - this.mesh.position.z, 2)
      );
      
      if (distance < 8) { // Shock range of 8
        console.log(`⚡ Electric Zombie shocked tower: ${tower.type || 'Unknown'}`);
        // Temporarily disable the tower
        tower.fireRate *= 2; // Slower firing
        shockedCount++;
        
        // Create electric arc effect
        this.createElectricArc(tower.mesh.position);
      }
    }
  }
  
  if (shockedCount > 0) {
    console.log(`⚡ Electric Zombie shocked ${shockedCount} towers!`);
  }
};

ElectricZombie.prototype.createElectricArc = function(targetPosition) {
  const arc = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.1, 8, 6),
    new THREE.MeshBasicMaterial({ 
      color: 0xFFFF00,
      emissive: 0xFFFF00,
      emissiveIntensity: 1.0
    })
  );
  
  arc.position.copy(this.mesh.position);
  arc.position.y += 1;
  arc.lookAt(targetPosition);
  window.scene.add(arc);
  
  // Remove after short time
  setTimeout(() => {
    window.scene.remove(arc);
  }, 500);
};

// Ice Zombie class - freezes towers
function IceZombie(scene) {
  this.maxHealth = 60;
  this.health = 60;
  this.speed = 2;
  this.reward = 35;
  this.name = "Ice Zombie";
  this.dead = false;
  this.lastFreeze = 0;
  this.freezeRate = 4; // Freeze every 4 seconds
  
  // Path following variables
  this.pathProgress = 0;
  
  // Create ice zombie mesh
  this.mesh = new THREE.Group();
  
  // Icy body
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.6, 0.8, 1.5, 8),
    new THREE.MeshPhongMaterial({ 
      color: 0x00FFFF,
      emissive: 0x00FFFF,
      emissiveIntensity: 0.4
    })
  );
  body.position.y = 0.75;
  
  // Ice crystals
  for (let i = 0; i < 6; i++) {
    const crystal = new THREE.Mesh(
      new THREE.ConeGeometry(0.1, 0.3, 4),
      new THREE.MeshPhongMaterial({ 
        color: 0xFFFFFF,
        emissive: 0xFFFFFF,
        emissiveIntensity: 0.8
      })
    );
    crystal.position.set(
      (Math.random() - 0.5) * 1.2,
      0.75 + Math.random() * 1,
      (Math.random() - 0.5) * 1.2
    );
    crystal.rotation.x = Math.random() * Math.PI;
    crystal.rotation.z = Math.random() * Math.PI;
    this.mesh.add(crystal);
  }
  
  this.mesh.add(body);
  
  this.mesh.position.set(PATH_POINTS[0].x, 1, PATH_POINTS[0].z);
  scene.add(this.mesh);
  this.reachedEnd = false;

  // Health bar
  this.healthBar = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 0.3),
    new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide })
  );
  this.healthBar.position.y = 2.5;
  this.mesh.add(this.healthBar);
  
  this.healthBarBg = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 0.3),
    new THREE.MeshBasicMaterial({ color: 0x333333, side: THREE.DoubleSide })
  );
  this.healthBarBg.position.y = 2.5;
  this.healthBarBg.position.z = -0.01;
  this.mesh.add(this.healthBarBg);
}

IceZombie.prototype.update = function(dt) {
  try {
    // Standard path following
    const totalPathLength = this.calculateTotalPathLength();
    const distanceToMove = this.speed * dt;
    
    this.pathProgress += distanceToMove / totalPathLength;
    
    if (this.pathProgress >= 1) {
      this.pathProgress = 1;
      this.reachedEnd = true;
    }
    
    const position = this.getPositionAlongPath(this.pathProgress);
    this.mesh.position.x = position.x;
    this.mesh.position.z = position.z;
    
    // Make health bar face camera
    if (window.camera && this.healthBar) {
      this.healthBar.lookAt(window.camera.position);
      this.healthBarBg.lookAt(window.camera.position);
    }
    
    // Freeze ability
    this.lastFreeze += dt;
    if (this.lastFreeze >= this.freezeRate && window.towers) {
      this.freezeTowers();
      this.lastFreeze = 0;
    }
  } catch (error) {
    console.error("Error in IceZombie update:", error);
  }
};

IceZombie.prototype.freezeTowers = function() {
  // Freeze all towers within range
  let frozenCount = 0;
  
  for (let i = 0; i < window.towers.length; i++) {
    const tower = window.towers[i];
    if (tower && tower.mesh) {
      const distance = Math.sqrt(
        Math.pow(tower.mesh.position.x - this.mesh.position.x, 2) +
        Math.pow(tower.mesh.position.z - this.mesh.position.z, 2)
      );
      
      if (distance < 6) { // Freeze range of 6
        console.log(`🧊 Ice Zombie froze tower: ${tower.type || 'Unknown'}`);
        // Completely freeze the tower for 3 seconds
        tower.frozen = true;
        tower.frozenTime = 3;
        frozenCount++;
        
        // Create ice effect
        this.createIceEffect(tower.mesh.position);
      }
    }
  }
  
  if (frozenCount > 0) {
    console.log(`🧊 Ice Zombie froze ${frozenCount} towers!`);
  }
};

IceZombie.prototype.createIceEffect = function(targetPosition) {
  const iceBlock = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshPhongMaterial({ 
      color: 0x00FFFF,
      transparent: true,
      opacity: 0.6
    })
  );
  
  iceBlock.position.copy(targetPosition);
  iceBlock.position.y += 1;
  window.scene.add(iceBlock);
  
  // Remove after 3 seconds
  setTimeout(() => {
    window.scene.remove(iceBlock);
  }, 3000);
};

// Fire Zombie class - burns towers
function FireZombie(scene) {
  this.maxHealth = 45;
  this.health = 45;
  this.speed = 4;
  this.reward = 40;
  this.name = "Fire Zombie";
  this.dead = false;
  this.lastBurn = 0;
  this.burnRate = 2.5; // Burn every 2.5 seconds
  
  // Path following variables
  this.pathProgress = 0;
  
  // Create fire zombie mesh
  this.mesh = new THREE.Group();
  
  // Burning body
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.6, 0.8, 1.5, 8),
    new THREE.MeshPhongMaterial({ 
      color: 0xFF4500,
      emissive: 0xFF4500,
      emissiveIntensity: 0.6
    })
  );
  body.position.y = 0.75;
  
  // Fire particles
  for (let i = 0; i < 8; i++) {
    const flame = new THREE.Mesh(
      new THREE.ConeGeometry(0.1, 0.4, 4),
      new THREE.MeshPhongMaterial({ 
        color: 0xFF0000,
        emissive: 0xFF0000,
        emissiveIntensity: 1.0
      })
    );
    flame.position.set(
      (Math.random() - 0.5) * 1.2,
      0.75 + Math.random() * 1.5,
      (Math.random() - 0.5) * 1.2
    );
    flame.rotation.x = Math.random() * Math.PI;
    flame.rotation.z = Math.random() * Math.PI;
    this.mesh.add(flame);
  }
  
  this.mesh.add(body);
  
  this.mesh.position.set(PATH_POINTS[0].x, 1, PATH_POINTS[0].z);
  scene.add(this.mesh);
  this.reachedEnd = false;

  // Health bar
  this.healthBar = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 0.3),
    new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide })
  );
  this.healthBar.position.y = 2.5;
  this.mesh.add(this.healthBar);
  
  this.healthBarBg = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 0.3),
    new THREE.MeshBasicMaterial({ color: 0x333333, side: THREE.DoubleSide })
  );
  this.healthBarBg.position.y = 2.5;
  this.healthBarBg.position.z = -0.01;
  this.mesh.add(this.healthBarBg);
}

FireZombie.prototype.update = function(dt) {
  try {
    // Standard path following
    const totalPathLength = this.calculateTotalPathLength();
    const distanceToMove = this.speed * dt;
    
    this.pathProgress += distanceToMove / totalPathLength;
    
    if (this.pathProgress >= 1) {
      this.pathProgress = 1;
      this.reachedEnd = true;
    }
    
    const position = this.getPositionAlongPath(this.pathProgress);
    this.mesh.position.x = position.x;
    this.mesh.position.z = position.z;
    
    // Make health bar face camera
    if (window.camera && this.healthBar) {
      this.healthBar.lookAt(window.camera.position);
      this.healthBarBg.lookAt(window.camera.position);
    }
    
    // Burn ability
    this.lastBurn += dt;
    if (this.lastBurn >= this.burnRate && window.towers) {
      this.burnTowers();
      this.lastBurn = 0;
    }
  } catch (error) {
    console.error("Error in FireZombie update:", error);
  }
};

FireZombie.prototype.burnTowers = function() {
  // Burn all towers within range
  let burnedCount = 0;
  
  for (let i = 0; i < window.towers.length; i++) {
    const tower = window.towers[i];
    if (tower && tower.mesh) {
      const distance = Math.sqrt(
        Math.pow(tower.mesh.position.x - this.mesh.position.x, 2) +
        Math.pow(tower.mesh.position.z - this.mesh.position.z, 2)
      );
      
      if (distance < 7) { // Burn range of 7
        console.log(`🔥 Fire Zombie burned tower: ${tower.type || 'Unknown'}`);
        // Reduce tower damage permanently
        tower.damage *= 0.9; // 10% permanent damage reduction
        burnedCount++;
        
        // Create fire effect
        this.createFireEffect(tower.mesh.position);
      }
    }
  }
  
  if (burnedCount > 0) {
    console.log(`🔥 Fire Zombie burned ${burnedCount} towers!`);
  }
};

FireZombie.prototype.createFireEffect = function(targetPosition) {
  const fireRing = new THREE.Mesh(
    new THREE.RingGeometry(0.5, 1, 8),
    new THREE.MeshPhongMaterial({ 
      color: 0xFF0000,
      emissive: 0xFF0000,
      emissiveIntensity: 0.8
    })
  );
  
  fireRing.position.copy(targetPosition);
  fireRing.position.y += 0.1;
  fireRing.rotation.x = -Math.PI / 2;
  window.scene.add(fireRing);
  
  // Remove after 2 seconds
  setTimeout(() => {
    window.scene.remove(fireRing);
  }, 2000);
};

// Shadow Zombie class - teleports and phases through towers
function ShadowZombie(scene) {
  this.maxHealth = 35;
  this.health = 35;
  this.speed = 8;
  this.reward = 45;
  this.name = "Shadow Zombie";
  this.dead = false;
  this.lastTeleport = 0;
  this.teleportRate = 5; // Teleport every 5 seconds
  this.phaseTime = 0;
  this.phaseDuration = 2; // Phase for 2 seconds
  
  // Path following variables
  this.pathProgress = 0;
  
  // Create shadow zombie mesh
  this.mesh = new THREE.Group();
  
  // Shadowy body
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.6, 0.8, 1.5, 8),
    new THREE.MeshPhongMaterial({ 
      color: 0x800080,
      emissive: 0x800080,
      emissiveIntensity: 0.4,
      transparent: true,
      opacity: 0.8
    })
  );
  body.position.y = 0.75;
  
  // Shadow tendrils
  for (let i = 0; i < 4; i++) {
    const tendril = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, 1, 4),
      new THREE.MeshPhongMaterial({ 
        color: 0x800080,
        emissive: 0x800080,
        emissiveIntensity: 0.8
      })
    );
    tendril.position.set(
      Math.cos(i * Math.PI / 2) * 0.8,
      0.75,
      Math.sin(i * Math.PI / 2) * 0.8
    );
    tendril.rotation.x = Math.random() * Math.PI;
    tendril.rotation.z = Math.random() * Math.PI;
    this.mesh.add(tendril);
  }
  
  this.mesh.add(body);
  
  this.mesh.position.set(PATH_POINTS[0].x, 1, PATH_POINTS[0].z);
  scene.add(this.mesh);
  this.reachedEnd = false;

  // Health bar
  this.healthBar = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 0.3),
    new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide })
  );
  this.healthBar.position.y = 2.5;
  this.mesh.add(this.healthBar);
  
  this.healthBarBg = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 0.3),
    new THREE.MeshBasicMaterial({ color: 0x333333, side: THREE.DoubleSide })
  );
  this.healthBarBg.position.y = 2.5;
  this.healthBarBg.position.z = -0.01;
  this.mesh.add(this.healthBarBg);
}

ShadowZombie.prototype.update = function(dt) {
  try {
    // Standard path following
    const totalPathLength = this.calculateTotalPathLength();
    const distanceToMove = this.speed * dt;
    
    this.pathProgress += distanceToMove / totalPathLength;
    
    if (this.pathProgress >= 1) {
      this.pathProgress = 1;
      this.reachedEnd = true;
    }
    
    const position = this.getPositionAlongPath(this.pathProgress);
    this.mesh.position.x = position.x;
    this.mesh.position.z = position.z;
    
    // Make health bar face camera
    if (window.camera && this.healthBar) {
      this.healthBar.lookAt(window.camera.position);
      this.healthBarBg.lookAt(window.camera.position);
    }
    
    // Teleport ability
    this.lastTeleport += dt;
    if (this.lastTeleport >= this.teleportRate) {
      this.teleport();
      this.lastTeleport = 0;
    }
    
    // Phase ability
    this.phaseTime += dt;
    if (this.phaseTime >= this.phaseDuration) {
      this.phaseTime = 0;
      this.togglePhase();
    }
  } catch (error) {
    console.error("Error in ShadowZombie update:", error);
  }
};

ShadowZombie.prototype.teleport = function() {
  // Teleport forward on the path
  this.pathProgress += 0.1; // Jump 10% forward
  
  if (this.pathProgress >= 1) {
    this.pathProgress = 1;
    this.reachedEnd = true;
  }
  
  const position = this.getPositionAlongPath(this.pathProgress);
  this.mesh.position.x = position.x;
  this.mesh.position.z = position.z;
  
  console.log("👻 Shadow Zombie teleported forward!");
  
  // Create teleport effect
  this.createTeleportEffect();
};

ShadowZombie.prototype.togglePhase = function() {
  // Toggle transparency for phase effect
  this.mesh.children.forEach(child => {
    if (child.material && child.material.opacity !== undefined) {
      child.material.opacity = child.material.opacity === 0.8 ? 0.3 : 0.8;
    }
  });
  
  console.log("👻 Shadow Zombie phased!");
};

ShadowZombie.prototype.createTeleportEffect = function() {
  const teleportRing = new THREE.Mesh(
    new THREE.RingGeometry(0.5, 1.5, 8),
    new THREE.MeshPhongMaterial({ 
      color: 0x800080,
      emissive: 0x800080,
      emissiveIntensity: 1.0,
      transparent: true,
      opacity: 0.8
    })
  );
  
  teleportRing.position.copy(this.mesh.position);
  teleportRing.position.y += 0.1;
  teleportRing.rotation.x = -Math.PI / 2;
  window.scene.add(teleportRing);
  
  // Remove after 1 second
  setTimeout(() => {
    window.scene.remove(teleportRing);
  }, 1000);
};

// Add path following methods to AcidSpitter
AcidSpitter.prototype.calculateTotalPathLength = function() {
  let totalLength = 0;
  for (let i = 0; i < PATH_POINTS.length - 1; i++) {
    const dx = PATH_POINTS[i + 1].x - PATH_POINTS[i].x;
    const dz = PATH_POINTS[i + 1].z - PATH_POINTS[i].z;
    totalLength += Math.sqrt(dx * dx + dz * dz);
  }
  return totalLength;
};

AcidSpitter.prototype.getPositionAlongPath = function(progress) {
  const totalLength = this.calculateTotalPathLength();
  const targetDistance = progress * totalLength;
  
  
  let currentDistance = 0;
  for (let i = 0; i < PATH_POINTS.length - 1; i++) {
    const dx = PATH_POINTS[i + 1].x - PATH_POINTS[i].x;
    const dz = PATH_POINTS[i + 1].z - PATH_POINTS[i].z;
    const segmentLength = Math.sqrt(dx * dx + dz * dz);
    
    if (currentDistance + segmentLength >= targetDistance) {
      const segmentProgress = (targetDistance - currentDistance) / segmentLength;
      return {
        x: PATH_POINTS[i].x + dx * segmentProgress,
        z: PATH_POINTS[i].z + dz * segmentProgress
      };
    }
    currentDistance += segmentLength;
  }
  
  return PATH_POINTS[PATH_POINTS.length - 1];
};

AcidSpitter.prototype.takeDamage = function(damage) {
  try {
    this.health -= damage;
    const healthPercent = this.health / this.maxHealth;
    
    // Update health bar if it exists
    if (this.healthBar) {
      this.healthBar.scale.x = Math.max(0, healthPercent);
      this.healthBar.material.color.set(healthPercent > 0.5 ? 0x00ff00 : (healthPercent > 0.2 ? 0xffff00 : 0xff0000));
    }
    
    if (this.health <= 0 && !this.dead) {
      this.die();
    }
  } catch (error) {
    console.error("Error in AcidSpitter takeDamage:", error);
  }
};

AcidSpitter.prototype.die = function() {
  try {
    this.dead = true;
    window.money += this.reward;
    if (this.mesh && this.mesh.parent) {
      this.mesh.parent.remove(this.mesh);
    }
  } catch (error) {
    console.error("Error in AcidSpitter die:", error);
  }
};

// Add path following methods to ElectricZombie
ElectricZombie.prototype.calculateTotalPathLength = function() {
  let totalLength = 0;
  for (let i = 0; i < PATH_POINTS.length - 1; i++) {
    const dx = PATH_POINTS[i + 1].x - PATH_POINTS[i].x;
    const dz = PATH_POINTS[i + 1].z - PATH_POINTS[i].z;
    totalLength += Math.sqrt(dx * dx + dz * dz);
  }
  return totalLength;
};

ElectricZombie.prototype.getPositionAlongPath = function(progress) {
  const totalLength = this.calculateTotalPathLength();
  const targetDistance = progress * totalLength;
  
  let currentDistance = 0;
  for (let i = 0; i < PATH_POINTS.length - 1; i++) {
    const dx = PATH_POINTS[i + 1].x - PATH_POINTS[i].x;
    const dz = PATH_POINTS[i + 1].z - PATH_POINTS[i].z;
    const segmentLength = Math.sqrt(dx * dx + dz * dz);
    
    if (currentDistance + segmentLength >= targetDistance) {
      const segmentProgress = (targetDistance - currentDistance) / segmentLength;
      return {
        x: PATH_POINTS[i].x + dx * segmentProgress,
        z: PATH_POINTS[i].z + dz * segmentProgress
      };
    }
    currentDistance += segmentLength;
  }
  
  return PATH_POINTS[PATH_POINTS.length - 1];
};

ElectricZombie.prototype.takeDamage = function(damage) {
  try {
    this.health -= damage;
    const healthPercent = this.health / this.maxHealth;
    
    // Update health bar if it exists
    if (this.healthBar) {
      this.healthBar.scale.x = Math.max(0, healthPercent);
      this.healthBar.material.color.set(healthPercent > 0.5 ? 0x00ff00 : (healthPercent > 0.2 ? 0xffff00 : 0xff0000));
    }
    
    if (this.health <= 0 && !this.dead) {
      this.die();
    }
  } catch (error) {
    console.error("Error in ElectricZombie takeDamage:", error);
  }
};

ElectricZombie.prototype.die = function() {
  try {
    this.dead = true;
    window.money += this.reward;
    if (this.mesh && this.mesh.parent) {
      this.mesh.parent.remove(this.mesh);
    }
  } catch (error) {
    console.error("Error in ElectricZombie die:", error);
  }
};

// Add path following methods to IceZombie
IceZombie.prototype.calculateTotalPathLength = function() {
  let totalLength = 0;
  for (let i = 0; i < PATH_POINTS.length - 1; i++) {
    const dx = PATH_POINTS[i + 1].x - PATH_POINTS[i].x;
    const dz = PATH_POINTS[i + 1].z - PATH_POINTS[i].z;
    totalLength += Math.sqrt(dx * dx + dz * dz);
  }
  return totalLength;
};

IceZombie.prototype.getPositionAlongPath = function(progress) {
  const totalLength = this.calculateTotalPathLength();
  const targetDistance = progress * totalLength;
  
  let currentDistance = 0;
  for (let i = 0; i < PATH_POINTS.length - 1; i++) {
    const dx = PATH_POINTS[i + 1].x - PATH_POINTS[i].x;
    const dz = PATH_POINTS[i + 1].z - PATH_POINTS[i].z;
    const segmentLength = Math.sqrt(dx * dx + dz * dz);
    
    if (currentDistance + segmentLength >= targetDistance) {
      const segmentProgress = (targetDistance - currentDistance) / segmentLength;
      return {
        x: PATH_POINTS[i].x + dx * segmentProgress,
        z: PATH_POINTS[i].z + dz * segmentProgress
      };
    }
    currentDistance += segmentLength;
  }
  
  return PATH_POINTS[PATH_POINTS.length - 1];
};

IceZombie.prototype.takeDamage = function(damage) {
  try {
    this.health -= damage;
    const healthPercent = this.health / this.maxHealth;
    
    // Update health bar if it exists
    if (this.healthBar) {
      this.healthBar.scale.x = Math.max(0, healthPercent);
      this.healthBar.material.color.set(healthPercent > 0.5 ? 0x00ff00 : (healthPercent > 0.2 ? 0xffff00 : 0xff0000));
    }
    
    if (this.health <= 0 && !this.dead) {
      this.die();
    }
  } catch (error) {
    console.error("Error in IceZombie takeDamage:", error);
  }
};

IceZombie.prototype.die = function() {
  try {
    this.dead = true;
    window.money += this.reward;
    if (this.mesh && this.mesh.parent) {
      this.mesh.parent.remove(this.mesh);
    }
  } catch (error) {
    console.error("Error in IceZombie die:", error);
  }
};

// Add path following methods to FireZombie
FireZombie.prototype.calculateTotalPathLength = function() {
  let totalLength = 0;
  for (let i = 0; i < PATH_POINTS.length - 1; i++) {
    const dx = PATH_POINTS[i + 1].x - PATH_POINTS[i].x;
    const dz = PATH_POINTS[i + 1].z - PATH_POINTS[i].z;
    totalLength += Math.sqrt(dx * dx + dz * dz);
  }
  return totalLength;
};

FireZombie.prototype.getPositionAlongPath = function(progress) {
  const totalLength = this.calculateTotalPathLength();
  const targetDistance = progress * totalLength;
  
  let currentDistance = 0;
  for (let i = 0; i < PATH_POINTS.length - 1; i++) {
    const dx = PATH_POINTS[i + 1].x - PATH_POINTS[i].x;
    const dz = PATH_POINTS[i + 1].z - PATH_POINTS[i].z;
    const segmentLength = Math.sqrt(dx * dx + dz * dz);
    
    if (currentDistance + segmentLength >= targetDistance) {
      const segmentProgress = (targetDistance - currentDistance) / segmentLength;
      return {
        x: PATH_POINTS[i].x + dx * segmentProgress,
        z: PATH_POINTS[i].z + dz * segmentProgress
      };
    }
    currentDistance += segmentLength;
  }
  
  return PATH_POINTS[PATH_POINTS.length - 1];
};

FireZombie.prototype.takeDamage = function(damage) {
  try {
    this.health -= damage;
    const healthPercent = this.health / this.maxHealth;
    
    // Update health bar if it exists
    if (this.healthBar) {
      this.healthBar.scale.x = Math.max(0, healthPercent);
      this.healthBar.material.color.set(healthPercent > 0.5 ? 0x00ff00 : (healthPercent > 0.2 ? 0xffff00 : 0xff0000));
    }
    
    if (this.health <= 0 && !this.dead) {
      this.die();
    }
  } catch (error) {
    console.error("Error in FireZombie takeDamage:", error);
  }
};

FireZombie.prototype.die = function() {
  try {
    this.dead = true;
    window.money += this.reward;
    if (this.mesh && this.mesh.parent) {
      this.mesh.parent.remove(this.mesh);
    }
  } catch (error) {
    console.error("Error in FireZombie die:", error);
  }
};

// Add path following methods to ShadowZombie
ShadowZombie.prototype.calculateTotalPathLength = function() {
  let totalLength = 0;
  for (let i = 0; i < PATH_POINTS.length - 1; i++) {
    const dx = PATH_POINTS[i + 1].x - PATH_POINTS[i].x;
    const dz = PATH_POINTS[i + 1].z - PATH_POINTS[i].z;
    totalLength += Math.sqrt(dx * dx + dz * dz);
  }
  return totalLength;
};

ShadowZombie.prototype.getPositionAlongPath = function(progress) {
  const totalLength = this.calculateTotalPathLength();
  const targetDistance = progress * totalLength;
  
  let currentDistance = 0;
  for (let i = 0; i < PATH_POINTS.length - 1; i++) {
    const dx = PATH_POINTS[i + 1].x - PATH_POINTS[i].x;
    const dz = PATH_POINTS[i + 1].z - PATH_POINTS[i].z;
    const segmentLength = Math.sqrt(dx * dx + dz * dz);
    
    if (currentDistance + segmentLength >= targetDistance) {
      const segmentProgress = (targetDistance - currentDistance) / segmentLength;
      return {
        x: PATH_POINTS[i].x + dx * segmentProgress,
        z: PATH_POINTS[i].z + dz * segmentProgress
      };
    }
    currentDistance += segmentLength;
  }
  
  return PATH_POINTS[PATH_POINTS.length - 1];
};

ShadowZombie.prototype.takeDamage = function(damage) {
  try {
    this.health -= damage;
    const healthPercent = this.health / this.maxHealth;
    
    // Update health bar if it exists
    if (this.healthBar) {
      this.healthBar.scale.x = Math.max(0, healthPercent);
      this.healthBar.material.color.set(healthPercent > 0.5 ? 0x00ff00 : (healthPercent > 0.2 ? 0xffff00 : 0xff0000));
    }
    
    if (this.health <= 0 && !this.dead) {
      this.die();
    }
  } catch (error) {
    console.error("Error in ShadowZombie takeDamage:", error);
  }
};

ShadowZombie.prototype.die = function() {
  try {
    this.dead = true;
    window.money += this.reward;
    if (this.mesh && this.mesh.parent) {
      this.mesh.parent.remove(this.mesh);
    }
  } catch (error) {
    console.error("Error in ShadowZombie die:", error);
  }
}; 

// Armored Zombie
function ArmoredZombie(scene) {
  const t = ENEMY_TYPES.armoredZombie;
  this.type = 'armoredZombie';
  this.maxHealth = t.health;
  this.health = t.health;
  this.speed = t.speed;
  this.reward = t.reward;
  this.name = t.name;
  this.armor = t.armor;
  this.pathProgress = 0;
  this.mesh = new THREE.Group();
  // Body
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.8, 1, 2, 12),
    new THREE.MeshPhongMaterial({ color: t.color })
  );
  body.position.y = 1;
  // Armor plates
  for (let i = 0; i < 4; i++) {
    const plate = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 1, 0.1),
      new THREE.MeshPhongMaterial({ color: 0x333333 })
    );
    plate.position.set(Math.cos(i * Math.PI / 2) * 0.7, 1, Math.sin(i * Math.PI / 2) * 0.7);
    this.mesh.add(plate);
  }
  this.mesh.add(body);
  this.mesh.position.set(PATH_POINTS[0].x, 1, PATH_POINTS[0].z);
  scene.add(this.mesh);
  this.reachedEnd = false;
  this.healthBar = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 0.3),
    new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide })
  );
  this.healthBar.position.y = 2.5;
  this.mesh.add(this.healthBar);
  this.healthBarBg = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 0.3),
    new THREE.MeshBasicMaterial({ color: 0x333333, side: THREE.DoubleSide })
  );
  this.healthBarBg.position.y = 2.5;
  this.healthBarBg.position.z = -0.01;
  this.mesh.add(this.healthBarBg);
}
ArmoredZombie.prototype.update = Enemy.prototype.update;
ArmoredZombie.prototype.calculateTotalPathLength = Enemy.prototype.calculateTotalPathLength;
ArmoredZombie.prototype.getPositionAlongPath = Enemy.prototype.getPositionAlongPath;
ArmoredZombie.prototype.takeDamage = function(dmg) {
  // Takes only 30% damage
  this.health -= dmg * (1 - this.armor);
  const healthRatio = this.health / this.maxHealth;
  this.healthBar.scale.x = Math.max(0, healthRatio);
  this.healthBar.material.color.set(healthRatio > 0.5 ? 0x00ff00 : (healthRatio > 0.2 ? 0xffff00 : 0xff0000));
  if (this.health <= 0) this.dead = true;
};

// Toxic Slime
function ToxicSlime(scene) {
  const t = ENEMY_TYPES.toxicSlime;
  this.type = 'toxicSlime';
  this.maxHealth = t.health;
  this.health = t.health;
  this.speed = t.speed;
  this.reward = t.reward;
  this.name = t.name;
  this.pathProgress = 0;
  this.mesh = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.SphereGeometry(0.7, 12, 12),
    new THREE.MeshPhongMaterial({ color: t.color, transparent: true, opacity: 0.7 })
  );
  body.position.y = 0.7;
  this.mesh.add(body);
  this.mesh.position.set(PATH_POINTS[0].x, 0.7, PATH_POINTS[0].z);
  scene.add(this.mesh);
  this.reachedEnd = false;
  this.healthBar = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 0.2),
    new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide })
  );
  this.healthBar.position.y = 1.5;
  this.mesh.add(this.healthBar);
  this.healthBarBg = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 0.2),
    new THREE.MeshBasicMaterial({ color: 0x333333, side: THREE.DoubleSide })
  );
  this.healthBarBg.position.y = 1.5;
  this.healthBarBg.position.z = -0.01;
  this.mesh.add(this.healthBarBg);
  this.lastTrail = 0;
}
ToxicSlime.prototype.update = function(dt) {
  Enemy.prototype.update.call(this, dt);
  this.lastTrail += dt;
  if (this.lastTrail > 1) {
    this.lastTrail = 0;
    // Leave a poison puddle (visual only, but could damage towers if implemented)
    const puddle = new THREE.Mesh(
      new THREE.CircleGeometry(0.8, 16),
      new THREE.MeshPhongMaterial({ color: 0x39ff14, transparent: true, opacity: 0.3 })
    );
    puddle.position.set(this.mesh.position.x, 0.01, this.mesh.position.z);
    puddle.rotation.x = -Math.PI / 2;
    window.scene.add(puddle);
    setTimeout(() => window.scene.remove(puddle), 3000);
  }
};
ToxicSlime.prototype.calculateTotalPathLength = Enemy.prototype.calculateTotalPathLength;
ToxicSlime.prototype.getPositionAlongPath = Enemy.prototype.getPositionAlongPath;
ToxicSlime.prototype.takeDamage = Enemy.prototype.takeDamage;

// Bomber
function Bomber(scene) {
  const t = ENEMY_TYPES.bomber;
  this.type = 'bomber';
  this.maxHealth = t.health;
  this.health = t.health;
  this.speed = t.speed;
  this.reward = t.reward;
  this.name = t.name;
  this.pathProgress = 0;
  this.mesh = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.SphereGeometry(0.6, 10, 10),
    new THREE.MeshPhongMaterial({ color: t.color })
  );
  body.position.y = 0.6;
  const fuse = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 0.4, 6),
    new THREE.MeshPhongMaterial({ color: 0xffffff })
  );
  fuse.position.y = 1.1;
  this.mesh.add(body);
  this.mesh.add(fuse);
  this.mesh.position.set(PATH_POINTS[0].x, 0.6, PATH_POINTS[0].z);
  scene.add(this.mesh);
  this.reachedEnd = false;
  this.healthBar = new THREE.Mesh(
    new THREE.PlaneGeometry(1.2, 0.2),
    new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide })
  );
  this.healthBar.position.y = 1.2;
  this.mesh.add(this.healthBar);
  this.healthBarBg = new THREE.Mesh(
    new THREE.PlaneGeometry(1.2, 0.2),
    new THREE.MeshBasicMaterial({ color: 0x333333, side: THREE.DoubleSide })
  );
  this.healthBarBg.position.y = 1.2;
  this.healthBarBg.position.z = -0.01;
  this.mesh.add(this.healthBarBg);
}
Bomber.prototype.update = Enemy.prototype.update;
Bomber.prototype.calculateTotalPathLength = Enemy.prototype.calculateTotalPathLength;
Bomber.prototype.getPositionAlongPath = Enemy.prototype.getPositionAlongPath;
Bomber.prototype.takeDamage = function(dmg) {
  this.health -= dmg;
  const healthRatio = this.health / this.maxHealth;
  this.healthBar.scale.x = Math.max(0, healthRatio);
  this.healthBar.material.color.set(healthRatio > 0.5 ? 0x00ff00 : (healthRatio > 0.2 ? 0xffff00 : 0xff0000));
  if (this.health <= 0) {
    this.dead = true;
    // Explode on death (damage towers in range)
    if (window.towers) {
      for (const tower of window.towers) {
        if (tower.mesh && tower.mesh.position.distanceTo(this.mesh.position) < 4) {
          // Visual effect
          tower.mesh.scale.set(1.3, 1.3, 1.3);
          setTimeout(() => tower.mesh.scale.set(1, 1, 1), 200);
        }
      }
    }
    // Explosion visual
    const explosion = new THREE.Mesh(
      new THREE.SphereGeometry(1.2, 12, 12),
      new THREE.MeshPhongMaterial({ color: 0xffa500, transparent: true, opacity: 0.5 })
    );
    explosion.position.copy(this.mesh.position);
    window.scene.add(explosion);
    setTimeout(() => window.scene.remove(explosion), 600);
  }
};

// Healer Zombie
function HealerZombie(scene) {
  const t = ENEMY_TYPES.healerZombie;
  this.type = 'healerZombie';
  this.maxHealth = t.health;
  this.health = t.health;
  this.speed = t.speed;
  this.reward = t.reward;
  this.name = t.name;
  this.pathProgress = 0;
  this.mesh = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.5, 0.7, 1.5, 10),
    new THREE.MeshPhongMaterial({ color: t.color })
  );
  body.position.y = 0.75;
  // Healing cross
  const cross = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 0.1, 0.1),
    new THREE.MeshPhongMaterial({ color: 0xffffff })
  );
  cross.position.y = 1.3;
  this.mesh.add(body);
  this.mesh.add(cross);
  this.mesh.position.set(PATH_POINTS[0].x, 1, PATH_POINTS[0].z);
  scene.add(this.mesh);
  this.reachedEnd = false;
  this.healthBar = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 0.2),
    new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide })
  );
  this.healthBar.position.y = 1.7;
  this.mesh.add(this.healthBar);
  this.healthBarBg = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 0.2),
    new THREE.MeshBasicMaterial({ color: 0x333333, side: THREE.DoubleSide })
  );
  this.healthBarBg.position.y = 1.7;
  this.healthBarBg.position.z = -0.01;
  this.mesh.add(this.healthBarBg);
  this.healCooldown = 0;
}
HealerZombie.prototype.update = function(dt) {
  Enemy.prototype.update.call(this, dt);
  this.healCooldown += dt;
  if (this.healCooldown > 2) {
    this.healCooldown = 0;
    // Heal nearby enemies
    for (const enemy of enemies) {
      if (enemy !== this && !enemy.dead && this.mesh.position.distanceTo(enemy.mesh.position) < 5) {
        enemy.health = Math.min(enemy.maxHealth, enemy.health + 5);
        // Visual effect
        if (enemy.healthBar) enemy.healthBar.material.color.set(0x00ffff);
        setTimeout(() => { if (enemy.healthBar) enemy.healthBar.material.color.set(0x00ff00); }, 400);
      }
    }
  }
};
HealerZombie.prototype.calculateTotalPathLength = Enemy.prototype.calculateTotalPathLength;
HealerZombie.prototype.getPositionAlongPath = Enemy.prototype.getPositionAlongPath;
HealerZombie.prototype.takeDamage = Enemy.prototype.takeDamage;

// Swarm Bug
function SwarmBug(scene) {
  const t = ENEMY_TYPES.swarmBug;
  this.type = 'swarmBug';
  this.maxHealth = t.health;
  this.health = t.health;
  this.speed = t.speed;
  this.reward = t.reward;
  this.name = t.name;
  this.pathProgress = 0;
  this.mesh = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 8, 8),
    new THREE.MeshPhongMaterial({ color: t.color })
  );
  body.position.y = 0.3;
  // Wings
  for (let i = 0; i < 2; i++) {
    const wing = new THREE.Mesh(
      new THREE.PlaneGeometry(0.3, 0.15),
      new THREE.MeshPhongMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 })
    );
    wing.position.set(i === 0 ? -0.2 : 0.2, 0.4, 0);
    this.mesh.add(wing);
  }
  this.mesh.add(body);
  this.mesh.position.set(PATH_POINTS[0].x, 0.3, PATH_POINTS[0].z);
  scene.add(this.mesh);
  this.reachedEnd = false;
  this.healthBar = new THREE.Mesh(
    new THREE.PlaneGeometry(0.7, 0.1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide })
  );
  this.healthBar.position.y = 0.7;
  this.mesh.add(this.healthBar);
  this.healthBarBg = new THREE.Mesh(
    new THREE.PlaneGeometry(0.7, 0.1),
    new THREE.MeshBasicMaterial({ color: 0x333333, side: THREE.DoubleSide })
  );
  this.healthBarBg.position.y = 0.7;
  this.healthBarBg.position.z = -0.01;
  this.mesh.add(this.healthBarBg);
}
SwarmBug.prototype.update = Enemy.prototype.update;
SwarmBug.prototype.calculateTotalPathLength = Enemy.prototype.calculateTotalPathLength;
SwarmBug.prototype.getPositionAlongPath = Enemy.prototype.getPositionAlongPath;
SwarmBug.prototype.takeDamage = function(dmg) {
  this.health -= dmg;
  const healthRatio = this.health / this.maxHealth;
  this.healthBar.scale.x = Math.max(0, healthRatio);
  this.healthBar.material.color.set(healthRatio > 0.5 ? 0x00ff00 : (healthRatio > 0.2 ? 0xffff00 : 0xff0000));
  if (this.health <= 0 && !this.dead) {
    this.dead = true;
    // Only 30% chance to spawn more bugs, and only 1-2 instead of 2-4
    if (Math.random() < 0.3) {
      const count = 1 + Math.floor(Math.random() * 2); // 1-2 bugs instead of 2-4
      for (let i = 0; i < count; i++) {
        setTimeout(() => window.spawnEnemy(window.scene, 'swarmBug'), 200 * i); // Slower spawning
      }
    }
  }
};

// Shield Drone
function ShieldDrone(scene) {
  const t = ENEMY_TYPES.shieldDrone;
  this.type = 'shieldDrone';
  this.maxHealth = t.health;
  this.health = t.health;
  this.speed = t.speed;
  this.reward = t.reward;
  this.name = t.name;
  this.pathProgress = 0;
  this.mesh = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 10, 10),
    new THREE.MeshPhongMaterial({ color: t.color })
  );
  body.position.y = 0.5;
  // Shield ring
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.7, 0.08, 8, 24),
    new THREE.MeshPhongMaterial({ color: 0x00bfff, emissive: 0x00bfff, emissiveIntensity: 0.5 })
  );
  ring.position.y = 0.5;
  this.mesh.add(body);
  this.mesh.add(ring);
  this.mesh.position.set(PATH_POINTS[0].x, 0.5, PATH_POINTS[0].z);
  scene.add(this.mesh);
  this.reachedEnd = false;
  this.healthBar = new THREE.Mesh(
    new THREE.PlaneGeometry(1.2, 0.15),
    new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide })
  );
  this.healthBar.position.y = 1.1;
  this.mesh.add(this.healthBar);
  this.healthBarBg = new THREE.Mesh(
    new THREE.PlaneGeometry(1.2, 0.15),
    new THREE.MeshBasicMaterial({ color: 0x333333, side: THREE.DoubleSide })
  );
  this.healthBarBg.position.y = 1.1;
  this.healthBarBg.position.z = -0.01;
  this.mesh.add(this.healthBarBg);
  this.shieldCooldown = 0;
}
ShieldDrone.prototype.update = function(dt) {
  Enemy.prototype.update.call(this, dt);
  this.shieldCooldown += dt;
  if (this.shieldCooldown > 2) {
    this.shieldCooldown = 0;
    // Grant shield to nearby enemies
    for (const enemy of enemies) {
      if (enemy !== this && !enemy.dead && !enemy.shielded && this.mesh.position.distanceTo(enemy.mesh.position) < 2) { // Reduced from 4 to 2
        enemy.shielded = true;
        // Visual effect: blue outline and glow
        if (enemy.mesh) {
          enemy.mesh.traverse(child => {
            if (child.material) {
              child.material.emissive = new THREE.Color(0x00bfff);
              child.material.emissiveIntensity = 0.8; // Make it more visible
            }
          });
        }
        // Add shield indicator text
        console.log(`🛡️ ${enemy.name || enemy.type} is now SHIELDED!`);
        setTimeout(() => {
          enemy.shielded = false;
          if (enemy.mesh) {
            enemy.mesh.traverse(child => {
              if (child.material) {
                child.material.emissive = new THREE.Color(0x000000);
                child.material.emissiveIntensity = 0;
              }
            });
          }
          console.log(`🛡️ ${enemy.name || enemy.type} shield expired!`);
        }, 500); // Reduced from 2000 to 500 (0.5 seconds)
      }
    }
  }
};
ShieldDrone.prototype.calculateTotalPathLength = Enemy.prototype.calculateTotalPathLength;
ShieldDrone.prototype.getPositionAlongPath = Enemy.prototype.getPositionAlongPath;
ShieldDrone.prototype.takeDamage = function(dmg) {
  if (this.shielded) {
    // Absorb one hit
    this.shielded = false;
    return;
  }
  this.health -= dmg;
  const healthRatio = this.health / this.maxHealth;
  this.healthBar.scale.x = Math.max(0, healthRatio);
  this.healthBar.material.color.set(healthRatio > 0.5 ? 0x00ff00 : (healthRatio > 0.2 ? 0xffff00 : 0xff0000));
  if (this.health <= 0) this.dead = true;
};

// Leech
function Leech(scene) {
  const t = ENEMY_TYPES.leech;
  this.type = 'leech';
  this.maxHealth = t.health;
  this.health = t.health;
  this.speed = t.speed;
  this.reward = t.reward;
  this.name = t.name;
  this.pathProgress = 0;
  this.mesh = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.4, 1.2, 8),
    new THREE.MeshPhongMaterial({ color: t.color })
  );
  body.position.y = 0.6;
  // Mouth
  const mouth = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 8, 8),
    new THREE.MeshPhongMaterial({ color: 0xff0000 })
  );
  mouth.position.y = 1.1;
  this.mesh.add(body);
  this.mesh.add(mouth);
  this.mesh.position.set(PATH_POINTS[0].x, 0.6, PATH_POINTS[0].z);
  scene.add(this.mesh);
  this.reachedEnd = false;
  this.healthBar = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 0.15),
    new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide })
  );
  this.healthBar.position.y = 1.2;
  this.mesh.add(this.healthBar);
  this.healthBarBg = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 0.15),
    new THREE.MeshBasicMaterial({ color: 0x333333, side: THREE.DoubleSide })
  );
  this.healthBarBg.position.y = 1.2;
  this.healthBarBg.position.z = -0.01;
  this.mesh.add(this.healthBarBg);
}
Leech.prototype.update = Enemy.prototype.update;
Leech.prototype.calculateTotalPathLength = Enemy.prototype.calculateTotalPathLength;
Leech.prototype.getPositionAlongPath = Enemy.prototype.getPositionAlongPath;
Leech.prototype.takeDamage = Enemy.prototype.takeDamage;

// Phantom
function Phantom(scene) {
  const t = ENEMY_TYPES.phantom;
  
  this.type = 'phantom';
  this.maxHealth = t.health;
  this.health = t.health;
  this.speed = t.speed;
  this.reward = t.reward;
  this.name = t.name;
  this.pathProgress = 0;
  this.mesh = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.4, 0.6, 1.2, 10),
    new THREE.MeshPhongMaterial({ color: t.color, transparent: true, opacity: 0.5 })
  );
  body.position.y = 0.6;
  this.mesh.add(body);
  this.mesh.position.set(PATH_POINTS[0].x, 0.6, PATH_POINTS[0].z);
  scene.add(this.mesh);
  this.reachedEnd = false;
  this.healthBar = new THREE.Mesh(
    new THREE.PlaneGeometry(1.2, 0.15),
    new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide })
  );
  this.healthBar.position.y = 1.2;
  this.mesh.add(this.healthBar);
  this.healthBarBg = new THREE.Mesh(
    new THREE.PlaneGeometry(1.2, 0.15),
    new THREE.MeshBasicMaterial({ color: 0x333333, side: THREE.DoubleSide })
  );
  this.healthBarBg.position.y = 1.2;
  this.healthBarBg.position.z = -0.01;
  this.mesh.add(this.healthBarBg);
  this.phaseCooldown = 0;
  this.phased = false;
}
Phantom.prototype.update = function(dt) {
  Enemy.prototype.update.call(this, dt);
  this.phaseCooldown += dt;
  if (!this.phased && this.phaseCooldown > 8) { // Increased from 3 to 8 seconds
    this.phased = true;
    this.phaseCooldown = 0;
    // Become untargetable for 1 second
    this.mesh.traverse(child => {
      if (child.material) child.material.opacity = 0.15;
    });
    setTimeout(() => {
      this.phased = false;
      this.mesh.traverse(child => {
        if (child.material) child.material.opacity = 0.5;
      });
    }, 1000); // Reduced from 2000 to 1000 (1 second)
  }
};
Phantom.prototype.calculateTotalPathLength = Enemy.prototype.calculateTotalPathLength;
Phantom.prototype.getPositionAlongPath = Enemy.prototype.getPositionAlongPath;
Phantom.prototype.takeDamage = function(dmg) {
  if (this.phased) return; // Immune while phased
  this.health -= dmg;
  const healthRatio = this.health / this.maxHealth;
  this.healthBar.scale.x = Math.max(0, healthRatio);
  this.healthBar.material.color.set(healthRatio > 0.5 ? 0x00ff00 : (healthRatio > 0.2 ? 0xffff00 : 0xff0000));
  if (this.health <= 0) this.dead = true;
};

// Juggernaut
function Juggernaut(scene) {
  const t = ENEMY_TYPES.juggernaut;
  this.type = 'juggernaut';
  this.maxHealth = t.health;
  this.health = t.health;
  this.speed = t.speed;
  this.reward = t.reward;
  this.name = t.name;
  this.pathProgress = 0;
  this.mesh = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(1.2, 1.5, 3, 16),
    new THREE.MeshPhongMaterial({ color: t.color })
  );
  body.position.y = 1.5;
  // Spikes
  for (let i = 0; i < 6; i++) {
    const spike = new THREE.Mesh(
      new THREE.ConeGeometry(0.15, 0.7, 6),
      new THREE.MeshPhongMaterial({ color: 0x888888 })
    );
    spike.position.set(Math.cos(i * Math.PI / 3) * 1.2, 2.2, Math.sin(i * Math.PI / 3) * 1.2);
    this.mesh.add(spike);
  }
  this.mesh.add(body);
  this.mesh.position.set(PATH_POINTS[0].x, 1.5, PATH_POINTS[0].z);
  scene.add(this.mesh);
  this.reachedEnd = false;
  this.healthBar = new THREE.Mesh(
    new THREE.PlaneGeometry(2.5, 0.3),
    new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide })
  );
  this.healthBar.position.y = 3.2;
  this.mesh.add(this.healthBar);
  this.healthBarBg = new THREE.Mesh(
    new THREE.PlaneGeometry(2.5, 0.3),
    new THREE.MeshBasicMaterial({ color: 0x333333, side: THREE.DoubleSide })
  );
  this.healthBarBg.position.y = 3.2;
  this.healthBarBg.position.z = -0.01;
  this.mesh.add(this.healthBarBg);
}
Juggernaut.prototype.update = Enemy.prototype.update;
Juggernaut.prototype.calculateTotalPathLength = Enemy.prototype.calculateTotalPathLength;
Juggernaut.prototype.getPositionAlongPath = Enemy.prototype.getPositionAlongPath;
Juggernaut.prototype.takeDamage = Enemy.prototype.takeDamage;

// Frost Wraith
function FrostWraith(scene) {
  const t = ENEMY_TYPES.frostWraith;
  this.type = 'frostWraith';
  this.maxHealth = t.health;
  this.health = t.health;
  this.speed = t.speed;
  this.reward = t.reward;
  this.name = t.name;
  this.pathProgress = 0;
  this.mesh = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.5, 0.7, 1.5, 10),
    new THREE.MeshPhongMaterial({ color: t.color, transparent: true, opacity: 0.7 })
  );
  body.position.y = 0.75;
  // Frost particles
  for (let i = 0; i < 6; i++) {
    const frost = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 6, 6),
      new THREE.MeshPhongMaterial({ color: 0x99ffff, transparent: true, opacity: 0.5 })
    );
    frost.position.set(Math.cos(i * Math.PI / 3) * 0.7, 1.2, Math.sin(i * Math.PI / 3) * 0.7);
    this.mesh.add(frost);
  }
  this.mesh.add(body);
  this.mesh.position.set(PATH_POINTS[0].x, 1, PATH_POINTS[0].z);
  scene.add(this.mesh);
  this.reachedEnd = false;
  this.healthBar = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 0.2),
    new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide })
  );
  this.healthBar.position.y = 1.7;
  this.mesh.add(this.healthBar);
  this.healthBarBg = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 0.2),
    new THREE.MeshBasicMaterial({ color: 0x333333, side: THREE.DoubleSide })
  );
  this.healthBarBg.position.y = 1.7;
  this.healthBarBg.position.z = -0.01;
  this.mesh.add(this.healthBarBg);
}
FrostWraith.prototype.update = function(dt) {
  Enemy.prototype.update.call(this, dt);
  // Slow towers in range
  for (const tower of window.towers) {
    if (tower.mesh && this.mesh.position.distanceTo(tower.mesh.position) < 5) {
      tower.frozen = true;
      tower.frozenTime = 1.5;
    }
  }
};
FrostWraith.prototype.calculateTotalPathLength = Enemy.prototype.calculateTotalPathLength;
FrostWraith.prototype.getPositionAlongPath = Enemy.prototype.getPositionAlongPath;
FrostWraith.prototype.takeDamage = Enemy.prototype.takeDamage;

// SPAWN LOGIC
window.spawnEnemy = function(scene, type) {
  let enemy;
  switch(type) {
    case 'adminZombie': enemy = new AdminZombie(scene); break;
    case 'gargantuan': enemy = new GargantuanZombie(scene); break;
    case 'ironTitan': enemy = new IronTitan(scene); break;
    case 'godZombie': enemy = new GodZombie(scene); break;
    case 'armoredZombie': enemy = new ArmoredZombie(scene); break;
    case 'toxicSlime': enemy = new ToxicSlime(scene); break;
    case 'bomber': enemy = new Bomber(scene); break;
    case 'healerZombie': enemy = new HealerZombie(scene); break;
    case 'swarmBug': enemy = new SwarmBug(scene); break;
    case 'shieldDrone': enemy = new ShieldDrone(scene); break;
    case 'leech': enemy = new Leech(scene); break;
    case 'phantom': enemy = new Phantom(scene); break;
    case 'juggernaut': enemy = new Juggernaut(scene); break;
    case 'frostWraith': enemy = new FrostWraith(scene); break;
    default: enemy = new Enemy(scene, type); break;
  }
  enemies.push(enemy);
};
// ... existing code ...

// God Zombie class - divine zombie with godlike powers
function GodZombie(scene) {
  this.maxHealth = 50000; // 50k HP
  this.health = 50000;
  this.speed = 3; // Moderate speed
  this.reward = 50000; // $50,000 reward
  this.name = "God Zombie";
  this.dead = false;
  this.divineAura = true;
  this.lastDivineAttack = 0;
  this.divineAttackCooldown = 5; // Attack every 5 seconds
  
  // Path following variables
  this.pathProgress = 0;
  
  // Create god zombie mesh (divine being)
  this.mesh = new THREE.Group();
  
  // Divine aura (massive golden sphere)
  const aura = new THREE.Mesh(
    new THREE.SphereGeometry(6, 32, 32),
    new THREE.MeshPhongMaterial({ 
      color: 0xFFD700,
      transparent: true,
      opacity: 0.6,
      emissive: 0xFFD700,
      emissiveIntensity: 0.8
    })
  );
  
  // Divine body (golden and glowing)
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(2.5, 2.5, 8, 24),
    new THREE.MeshPhongMaterial({ 
      color: 0xFFD700,
      emissive: 0xFFD700,
      emissiveIntensity: 0.7
    })
  );
  body.position.y = 4;
  
  // Divine crown with jewels
  const crown = new THREE.Mesh(
    new THREE.CylinderGeometry(3, 3, 1.5, 24),
    new THREE.MeshPhongMaterial({ 
      color: 0xFFD700,
      emissive: 0xFFD700,
      emissiveIntensity: 0.9
    })
  );
  crown.position.y = 8.5;
  
  // Crown jewels (different colors)
  const jewelColors = [0xFF0000, 0x00FF00, 0x0000FF, 0xFFFF00, 0xFF00FF, 0x00FFFF];
  for (let i = 0; i < 6; i++) {
    const jewel = new THREE.Mesh(
      new THREE.SphereGeometry(0.4, 16, 16),
      new THREE.MeshPhongMaterial({ 
        color: jewelColors[i],
        emissive: jewelColors[i],
        emissiveIntensity: 1.0
      })
    );
    jewel.position.y = 9.5;
    jewel.position.x = Math.cos(i * Math.PI / 3) * 3;
    jewel.position.z = Math.sin(i * Math.PI / 3) * 3;
    this.mesh.add(jewel);
  }
  
  // Divine eyes (glowing white)
  const eyeGeometry = new THREE.SphereGeometry(0.6, 16, 16);
  const leftEye = new THREE.Mesh(eyeGeometry, new THREE.MeshPhongMaterial({ 
    color: 0xFFFFFF,
    emissive: 0xFFFFFF,
    emissiveIntensity: 1.0
  }));
  const rightEye = new THREE.Mesh(eyeGeometry, new THREE.MeshPhongMaterial({ 
    color: 0xFFFFFF,
    emissive: 0xFFFFFF,
    emissiveIntensity: 1.0
  }));
  leftEye.position.set(-1.2, 7, 2);
  rightEye.position.set(1.2, 7, 2);
  
  // Divine staff with orb
  const staff = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.3, 10, 16),
    new THREE.MeshPhongMaterial({ 
      color: 0x4B0082,
      emissive: 0x4B0082,
      emissiveIntensity: 0.5
    })
  );
  staff.position.set(3, 5, 0);
  staff.rotation.z = Math.PI / 6;
  
  // Divine orb (pulsing)
  const orb = new THREE.Mesh(
    new THREE.SphereGeometry(1.2, 16, 16),
    new THREE.MeshPhongMaterial({ 
      color: 0xFFFFFF,
      emissive: 0xFFFFFF,
      emissiveIntensity: 1.0
    })
  );
  orb.position.set(4, 8, 0);
  
  // Divine wings
  const wingGeometry = new THREE.PlaneGeometry(4, 2);
  const leftWing = new THREE.Mesh(wingGeometry, new THREE.MeshPhongMaterial({ 
    color: 0xFFD700,
    emissive: 0xFFD700,
    emissiveIntensity: 0.6,
    transparent: true,
    opacity: 0.8
  }));
  const rightWing = new THREE.Mesh(wingGeometry, new THREE.MeshPhongMaterial({ 
    color: 0xFFD700,
    emissive: 0xFFD700,
    emissiveIntensity: 0.6,
    transparent: true,
    opacity: 0.8
  }));
  leftWing.position.set(-3, 6, 0);
  rightWing.position.set(3, 6, 0);
  leftWing.rotation.y = Math.PI / 4;
  rightWing.rotation.y = -Math.PI / 4;
  
  this.mesh.add(aura);
  this.mesh.add(body);
  this.mesh.add(crown);
  this.mesh.add(leftEye);
  this.mesh.add(rightEye);
  this.mesh.add(staff);
  this.mesh.add(orb);
  this.mesh.add(leftWing);
  this.mesh.add(rightWing);
  
  this.mesh.position.set(PATH_POINTS[0].x, 1, PATH_POINTS[0].z);
  scene.add(this.mesh);
  this.reachedEnd = false;

  // Divine health bar
  this.healthBar = new THREE.Mesh(
    new THREE.PlaneGeometry(15, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide })
  );
  this.healthBar.position.y = 12;
  this.mesh.add(this.healthBar);
  
  // Animation variables
  this.pulseTime = 0;
  this.pulseSpeed = 2;
  this.wingFlapTime = 0;
  this.wingFlapSpeed = 3;
}

GodZombie.prototype.update = function(dt) {
  // Move along the path
  const totalPathLength = this.calculateTotalPathLength();
  const distanceToMove = this.speed * dt;
  
  // Update path progress
  this.pathProgress += distanceToMove / totalPathLength;
  
  if (this.pathProgress >= 1) {
    this.reachedEnd = true;
    console.log("🎯 GOD ZOMBIE REACHED END");
    return false; // Let main enemy update loop handle damage
  }
  
  // Calculate position along path
  const position = this.getPositionAlongPath(this.pathProgress);
  this.mesh.position.x = position.x;
  this.mesh.position.z = position.z;
  
  // Make health bar face camera
  if (window.camera) {
    this.healthBar.lookAt(window.camera.position);
  }
  
  // Divine attack on towers
  this.lastDivineAttack += dt;
  if (this.lastDivineAttack >= this.divineAttackCooldown) {
    this.divineAttack();
    this.lastDivineAttack = 0;
  }
  
  // Animate divine effects
  this.pulseTime += dt;
  this.wingFlapTime += dt;
  
  // Pulse aura and orb
  const pulse = Math.sin(this.pulseTime * this.pulseSpeed) * 0.3 + 1;
  this.mesh.children.forEach(child => {
    if (child.material && child.material.emissive && 
        (child.material.color.getHex() === 0xFFD700 || child.material.color.getHex() === 0xFFFFFF)) {
      child.material.emissiveIntensity = 0.7 * pulse;
    }
  });
  
  // Flap wings
  const wingFlap = Math.sin(this.wingFlapTime * this.wingFlapSpeed) * 0.2;
  this.mesh.children.forEach(child => {
    if (child.geometry && child.geometry.type === 'PlaneGeometry') {
      child.rotation.z = wingFlap;
    }
  });
  
  return false; // Keep in enemies array
};

GodZombie.prototype.divineAttack = function() {
  // Divine attack: damage all towers in range
  for (const tower of window.towers) {
    if (tower.mesh) {
      const dist = this.mesh.position.distanceTo(tower.mesh.position);
      if (dist < 15) { // 15 unit range
        // Damage tower
        if (tower.takeDamage) {
          tower.takeDamage(100); // 100 damage to towers
        }
        
        // Visual effect
        tower.mesh.scale.set(1.3, 1.3, 1.3);
        setTimeout(() => tower.mesh.scale.set(1, 1, 1), 300);
        
        console.log(`⚡ God Zombie divine attack hit ${tower.type} tower!`);
      }
    }
  }
  
  // Create divine lightning effect
  this.createDivineLightning();
};

GodZombie.prototype.createDivineLightning = function() {
  // Create lightning bolts from the orb
  for (let i = 0; i < 8; i++) {
    const lightning = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.1, 8, 6),
      new THREE.MeshBasicMaterial({ 
        color: 0xFFFFFF,
        emissive: 0xFFFFFF,
        emissiveIntensity: 1.0
      })
    );
    
    lightning.position.copy(this.mesh.position);
    lightning.position.y += 8;
    lightning.rotation.y = (i * Math.PI / 4);
    lightning.rotation.x = Math.PI / 2;
    
    window.scene.add(lightning);
    
    // Remove after short time
    setTimeout(() => {
      if (window.scene && lightning.parent) {
        window.scene.remove(lightning);
      }
    }, 500);
  }
};

GodZombie.prototype.calculateTotalPathLength = function() {
  let totalLength = 0;
  for (let i = 0; i < PATH_POINTS.length - 1; i++) {
    const start = PATH_POINTS[i];
    const end = PATH_POINTS[i + 1];
    const distance = Math.sqrt((end.x - start.x) ** 2 + (end.z - start.z) ** 2);
    totalLength += distance;
  }
  return totalLength;
};

GodZombie.prototype.getPositionAlongPath = function(progress) {
  if (progress <= 0) return PATH_POINTS[0];
  if (progress >= 1) return PATH_POINTS[PATH_POINTS.length - 1];
  
  // Calculate total path length
  const totalLength = this.calculateTotalPathLength();
  const targetDistance = progress * totalLength;
  
  let currentDistance = 0;
  for (let i = 0; i < PATH_POINTS.length - 1; i++) {
    const start = PATH_POINTS[i];
    const end = PATH_POINTS[i + 1];
    const segmentLength = Math.sqrt((end.x - start.x) ** 2 + (end.z - start.z) ** 2);
    
    if (currentDistance + segmentLength >= targetDistance) {
      // We're in this segment
      const segmentProgress = (targetDistance - currentDistance) / segmentLength;
      return {
        x: start.x + (end.x - start.x) * segmentProgress,
        z: start.z + (end.z - start.z) * segmentProgress
      };
    }
    
    currentDistance += segmentLength;
  }
  
  return PATH_POINTS[PATH_POINTS.length - 1];
};

GodZombie.prototype.takeDamage = function(dmg) {
  console.log("God Zombie taking damage:", dmg, "Current health:", this.health);
  this.health -= dmg;
  console.log("God Zombie new health:", this.health);
  
  // Update health bar
  const healthRatio = this.health / this.maxHealth;
  this.healthBar.scale.x = Math.max(0, healthRatio);
  this.healthBar.material.color.set(healthRatio > 0.5 ? 0x00ff00 : (healthRatio > 0.2 ? 0xffff00 : 0xff0000));
  
  if (this.health <= 0) {
    console.log("God Zombie defeated!");
    this.dead = true;
    if (window.addMoney) {
      window.addMoney(this.reward);
      console.log("Added money for killing God Zombie:", this.reward);
    }
    // Unlock God Tower when God Zombie is killed
    if (window.unlockGodTower) {
      window.unlockGodTower();
    }
  }
};


