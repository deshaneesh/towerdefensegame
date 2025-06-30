// Tower types with upgrade paths
window.TOWER_TYPES = {
  minigun: {
    levels: [
      { name: 'Minigun Mk I', cost: 100, range: 10.5, fireRate: 0.2, damage: 3 },
      { name: 'Minigun Mk II', cost: 150, range: 12, fireRate: 0.18, damage: 5 },
      { name: 'Minigun Mk III', cost: 250, range: 13.5, fireRate: 0.15, damage: 8 }
    ]
  },
  rpg: {
    levels: [
      { name: 'RPG Mk I', cost: 200, range: 7.5, fireRate: 2.5, damage: 8, splash: true, splashRadius: 3 },
      { name: 'RPG Mk II', cost: 300, range: 9, fireRate: 2.3, damage: 15, splash: true, splashRadius: 3.5 },
      { name: 'RPG Mk III', cost: 450, range: 10.5, fireRate: 2.0, damage: 25, splash: true, splashRadius: 4 }
    ]
  },
  sniper: {
    levels: [
      { name: 'Sniper Mk I', cost: 150, range: 18, fireRate: 1.5, damage: 15 },
      { name: 'Sniper Mk II', cost: 250, range: 21, fireRate: 1.3, damage: 25 },
      { name: 'Sniper Mk III', cost: 400, range: 24, fireRate: 1.1, damage: 40 }
    ]
  },
  flamethrower: {
    levels: [
      { name: 'Flamethrower Mk I', cost: 180, range: 6, fireRate: 0.1, damage: 2, splash: true, splashRadius: 2 },
      { name: 'Flamethrower Mk II', cost: 280, range: 7.5, fireRate: 0.08, damage: 3, splash: true, splashRadius: 2.5 },
      { name: 'Flamethrower Mk III', cost: 450, range: 9, fireRate: 0.06, damage: 5, splash: true, splashRadius: 3 }
    ]
  },
  tesla: {
    levels: [
      { name: 'Tesla Mk I', cost: 250, range: 9, fireRate: 1.0, damage: 6, chain: true, chainCount: 2 },
      { name: 'Tesla Mk II', cost: 400, range: 10.5, fireRate: 0.8, damage: 10, chain: true, chainCount: 3 },
      { name: 'Tesla Mk III', cost: 600, range: 12, fireRate: 0.6, damage: 18, chain: true, chainCount: 4 }
    ]
  },
  medic: {
    levels: [
      { name: 'Medic Mk I', cost: 120, range: 12, fireRate: 3.0, damage: 0, boost: 0.05 },
      { name: 'Medic Mk II', cost: 200, range: 13.5, fireRate: 2.5, damage: 0, boost: 0.08 },
      { name: 'Medic Mk III', cost: 350, range: 15, fireRate: 2.0, damage: 0, boost: 0.12 }
    ]
  },
  engineer: {
    levels: [
      { name: 'Engineer Mk I', cost: 300, range: 9, fireRate: 10.0, damage: 0, spawnChance: 0.01 },
      { name: 'Engineer Mk II', cost: 500, range: 10.5, fireRate: 8.0, damage: 0, spawnChance: 0.015 },
      { name: 'Engineer Mk III', cost: 800, range: 12, fireRate: 6.0, damage: 0, spawnChance: 0.02 }
    ]
  },
  // New towers
  laser: {
    levels: [
      { name: 'Laser Tower Mk I', cost: 300, range: 12, fireRate: 0.5, damage: 12, pierce: true },
      { name: 'Laser Tower Mk II', cost: 500, range: 13.5, fireRate: 0.4, damage: 20, pierce: true },
      { name: 'Laser Tower Mk III', cost: 800, range: 15, fireRate: 0.3, damage: 35, pierce: true }
    ]
  },
  poison: {
    levels: [
      { name: 'Poison Tower Mk I', cost: 220, range: 10.5, fireRate: 1.2, damage: 4, poison: true, poisonDuration: 5 },
      { name: 'Poison Tower Mk II', cost: 350, range: 12, fireRate: 1.0, damage: 7, poison: true, poisonDuration: 7 },
      { name: 'Poison Tower Mk III', cost: 500, range: 13.5, fireRate: 0.8, damage: 12, poison: true, poisonDuration: 10 }
    ]
  },
  freeze: {
    levels: [
      { name: 'Freeze Tower Mk I', cost: 250, range: 9, fireRate: 1.5, damage: 3, slow: true, slowAmount: 0.5, slowDuration: 2 },
      { name: 'Freeze Tower Mk II', cost: 400, range: 10.5, fireRate: 1.2, damage: 5, slow: true, slowAmount: 0.6, slowDuration: 3 },
      { name: 'Freeze Tower Mk III', cost: 600, range: 12, fireRate: 1.0, damage: 8, slow: true, slowAmount: 0.7, slowDuration: 4 }
    ]
  },
  bomb: {
    levels: [
      { name: 'Bomb Tower Mk I', cost: 350, range: 7.5, fireRate: 2.5, damage: 20, splash: true, splashRadius: 4 },
      { name: 'Bomb Tower Mk II', cost: 500, range: 9, fireRate: 2.0, damage: 35, splash: true, splashRadius: 5 },
      { name: 'Bomb Tower Mk III', cost: 700, range: 10.5, fireRate: 1.7, damage: 55, splash: true, splashRadius: 6 }
    ]
  },
  rocket: {
    levels: [
      { name: 'Rocket Tower Mk I', cost: 400, range: 12, fireRate: 2.0, damage: 30, splash: true, splashRadius: 3 },
      { name: 'Rocket Tower Mk II', cost: 600, range: 13.5, fireRate: 1.7, damage: 50, splash: true, splashRadius: 4 },
      { name: 'Rocket Tower Mk III', cost: 900, range: 15, fireRate: 1.3, damage: 80, splash: true, splashRadius: 5 }
    ]
  },
  plasma: {
    levels: [
      { name: 'Plasma Tower Mk I', cost: 500, range: 13.5, fireRate: 1.0, damage: 25, chain: true, chainCount: 3 },
      { name: 'Plasma Tower Mk II', cost: 800, range: 15, fireRate: 0.8, damage: 40, chain: true, chainCount: 4 },
      { name: 'Plasma Tower Mk III', cost: 1200, range: 18, fireRate: 0.6, damage: 65, chain: true, chainCount: 5 }
    ]
  },
  wind: {
    levels: [
      { name: 'Wind Tower Mk I', cost: 200, range: 10.5, fireRate: 1.0, damage: 2, knockback: true, knockbackAmount: 2 },
      { name: 'Wind Tower Mk II', cost: 350, range: 12, fireRate: 0.8, damage: 4, knockback: true, knockbackAmount: 3 },
      { name: 'Wind Tower Mk III', cost: 500, range: 13.5, fireRate: 0.6, damage: 7, knockback: true, knockbackAmount: 4 }
    ]
  },
  gold: {
    levels: [
      { name: 'Gold Tower Mk I', cost: 1000, range: 12, fireRate: 2.0, damage: 10, gold: true, goldPerHit: 10 },
      { name: 'Gold Tower Mk II', cost: 2000, range: 13.5, fireRate: 1.7, damage: 18, gold: true, goldPerHit: 20 },
      { name: 'Gold Tower Mk III', cost: 4000, range: 15, fireRate: 1.3, damage: 30, gold: true, goldPerHit: 40 }
    ]
  },
  // Special Builder Tower
  builder: {
    levels: [
      { name: 'Builder Tower', cost: 1500, range: 12, fireRate: 1.0, damage: 15, builder: true },
      { name: 'Builder Tower Mk II', cost: 2500, range: 13.5, fireRate: 0.8, damage: 25, builder: true },
      { name: 'Builder Tower Mk III', cost: 4000, range: 15, fireRate: 0.6, damage: 40, builder: true }
    ]
  },
  // Banker Tower - Generates money every wave
  banker: {
    levels: [
      { name: 'Banker Tower', cost: 2000, range: 0, fireRate: 0, damage: 0, moneyPerWave: 100, banker: true },
      { name: 'Banker Tower Mk II', cost: 3500, range: 0, fireRate: 0, damage: 0, moneyPerWave: 200, banker: true },
      { name: 'Banker Tower Mk III', cost: 6000, range: 0, fireRate: 0, damage: 0, moneyPerWave: 400, banker: true }
    ]
  },
  demolishinist: {
    levels: [
      { name: 'Demolishinist Mk I', cost: 600, range: 10, fireRate: 2.0, damage: 20, mineType: 'landmine', grenadeType: 'grenade' },
      { name: 'Demolishinist Mk II', cost: 1200, range: 11, fireRate: 1.5, damage: 40, mineType: 'bomb', grenadeType: 'bomb' },
      { name: 'Demolishinist Mk III', cost: 2500, range: 12, fireRate: 1.0, damage: 100, mineType: 'nuke', grenadeType: 'missile' }
    ]
  },
};

globalThis.towers = [];
globalThis.friendlyTanks = [];

// Friendly Tank class
function FriendlyTank(scene) {
  this.health = 1000;
  this.maxHealth = 1000;
  this.speed = 2;
  this.damage = 50;
  this.lastShot = 0;
  this.fireRate = 1.0;
  
  this.mesh = new THREE.Group();
  
  // Tank body
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(2, 1, 3),
    new THREE.MeshPhongMaterial({ color: 0x0066cc })
  );
  
  // Tank turret
  const turret = new THREE.Mesh(
    new THREE.CylinderGeometry(0.8, 0.8, 0.5, 8),
    new THREE.MeshPhongMaterial({ color: 0x004499 })
  );
  turret.position.y = 0.75;
  
  // Tank cannon
  const cannon = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.2, 2, 8),
    new THREE.MeshPhongMaterial({ color: 0x333333 })
  );
  cannon.position.y = 0.75;
  cannon.position.z = 1.5;
  
  this.mesh.add(body);
  this.mesh.add(turret);
  this.mesh.add(cannon);
  
  this.mesh.position.set(-15, 0.5, -20);
  scene.add(this.mesh);
  
  // Health bar
  this.healthBar = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 0.2),
    new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide })
  );
  this.healthBar.position.y = 2;
  this.mesh.add(this.healthBar);
}

FriendlyTank.prototype.update = function(dt) {
  // Move along path
  const endZ = 40;
  this.mesh.position.z += this.speed * dt;
  if (this.mesh.position.z >= endZ) {
    this.mesh.parent.remove(this.mesh);
    return true; // Remove from array
  }
  
  // Make health bar face camera
  if (window.camera) {
    this.healthBar.lookAt(window.camera.position);
  }
  
  // Attack enemies
  this.lastShot += dt;
  if (this.lastShot >= this.fireRate) {
    for (const enemy of enemies) {
      const dist = this.mesh.position.distanceTo(enemy.mesh.position);
      if (dist < 5) {
        enemy.takeDamage(this.damage);
        this.lastShot = 0;
        break;
      }
    }
  }
  
  return false;
};

FriendlyTank.prototype.takeDamage = function(dmg) {
  this.health -= dmg;
  const healthRatio = this.health / this.maxHealth;
  this.healthBar.scale.x = Math.max(0, healthRatio);
  this.healthBar.material.color.set(healthRatio > 0.5 ? 0x00ff00 : (healthRatio > 0.2 ? 0xffff00 : 0xff0000));
  
  if (this.health <= 0) {
    this.dead = true;
  }
};

function Tower(scene, type, pos) {
  this.type = type;
  this.level = 0;
  this.updateStats();

  this.investedCost = this.cost;
  this.lastShot = 0;
  
  // Create tower mesh based on type
  this.mesh = this.createTowerMesh();
  this.mesh.position.set(pos.x, 1, pos.z);
  this.mesh.userData.tower = this; // Link mesh back to tower object
  scene.add(this.mesh);
}

Tower.prototype.createTowerMesh = function() {
  let mesh;
  switch(this.type) {
    case 'minigun':
      // Minigun: tall cylinder with barrel
      const minigunGroup = new THREE.Group();
      const base = new THREE.Mesh(
        new THREE.CylinderGeometry(0.8, 0.8, 2, 16),
        new THREE.MeshPhongMaterial({ color: 0x444444 })
      );
      const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.2, 1.5, 8),
        new THREE.MeshPhongMaterial({ color: 0x222222 })
      );
      barrel.position.y = 1.5;
      barrel.rotation.z = Math.PI / 2;
      minigunGroup.add(base);
      minigunGroup.add(barrel);
      mesh = minigunGroup;
      break;
      
    case 'rpg':
      // RPG: rocket launcher on tripod
      const rpgGroup = new THREE.Group();
      const tripod = new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.3, 1.5, 8),
        new THREE.MeshPhongMaterial({ color: 0x666666 })
      );
      const launcher = new THREE.Mesh(
        new THREE.CylinderGeometry(0.4, 0.4, 2, 8),
        new THREE.MeshPhongMaterial({ color: 0x333333 })
      );
      launcher.position.y = 1.5;
      tripod.position.y = 0.75;
      rpgGroup.add(tripod);
      rpgGroup.add(launcher);
      mesh = rpgGroup;
      break;
      
    case 'sniper':
      // Sniper: long barrel on base
      const sniperGroup = new THREE.Group();
      const sniperBase = new THREE.Mesh(
        new THREE.CylinderGeometry(0.6, 0.6, 1.5, 16),
        new THREE.MeshPhongMaterial({ color: 0x555555 })
      );
      const sniperBarrel = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.1, 2.5, 8),
        new THREE.MeshPhongMaterial({ color: 0x111111 })
      );
      sniperBarrel.position.y = 1.5;
      sniperGroup.add(sniperBase);
      sniperGroup.add(sniperBarrel);
      mesh = sniperGroup;
      break;
      
    case 'flamethrower':
      // Flamethrower: wide nozzle
      const flameGroup = new THREE.Group();
      const flameBase = new THREE.Mesh(
        new THREE.CylinderGeometry(0.7, 0.7, 1.8, 16),
        new THREE.MeshPhongMaterial({ color: 0x444444 })
      );
      const flameNozzle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.5, 1, 8),
        new THREE.MeshPhongMaterial({ color: 0x222222 })
      );
      flameNozzle.position.y = 1.5;
      flameGroup.add(flameBase);
      flameGroup.add(flameNozzle);
      mesh = flameGroup;
      break;
      
    case 'tesla':
      // Tesla: coil tower
      const teslaGroup = new THREE.Group();
      const teslaBase = new THREE.Mesh(
        new THREE.CylinderGeometry(0.6, 0.6, 1.5, 16),
        new THREE.MeshPhongMaterial({ color: 0x444444 })
      );
      const teslaCoil = new THREE.Mesh(
        new THREE.TorusGeometry(0.4, 0.1, 8, 16),
        new THREE.MeshPhongMaterial({ color: 0x0066ff })
      );
      teslaCoil.position.y = 1.5;
      teslaGroup.add(teslaBase);
      teslaGroup.add(teslaCoil);
      mesh = teslaGroup;
      break;
      
    case 'medic':
      // Medic: cross symbol
      const medicGroup = new THREE.Group();
      const medicBase = new THREE.Mesh(
        new THREE.CylinderGeometry(0.6, 0.6, 1.5, 16),
        new THREE.MeshPhongMaterial({ color: 0xffffff })
      );
      const cross = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 0.2, 0.2),
        new THREE.MeshPhongMaterial({ color: 0xff0000 })
      );
      cross.position.y = 1.5;
      medicGroup.add(medicBase);
      medicGroup.add(cross);
      mesh = medicGroup;
      break;
      
    case 'engineer':
      // Engineer: wrench symbol
      const engineerGroup = new THREE.Group();
      const engineerBase = new THREE.Mesh(
        new THREE.CylinderGeometry(0.6, 0.6, 1.5, 16),
        new THREE.MeshPhongMaterial({ color: 0x666666 })
      );
      const wrench = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 0.1, 0.1),
        new THREE.MeshPhongMaterial({ color: 0x333333 })
      );
      wrench.position.y = 1.5;
      engineerGroup.add(engineerBase);
      engineerGroup.add(wrench);
      mesh = engineerGroup;
      break;
      
    case 'laser':
      // Laser: tall, glowing blue rod
      const laserGroup = new THREE.Group();
      const laserBase = new THREE.Mesh(
        new THREE.CylinderGeometry(0.5, 0.5, 1.2, 12),
        new THREE.MeshPhongMaterial({ color: 0x222244 })
      );
      const laserRod = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.2, 2.5, 16),
        new THREE.MeshPhongMaterial({ color: 0x00ccff, emissive: 0x00ccff, emissiveIntensity: 0.7 })
      );
      laserRod.position.y = 1.5;
      laserGroup.add(laserBase);
      laserGroup.add(laserRod);
      mesh = laserGroup;
      break;
      
    case 'poison':
      // Poison: green barrel with bubbles
      const poisonGroup = new THREE.Group();
      const poisonBase = new THREE.Mesh(
        new THREE.CylinderGeometry(0.6, 0.6, 1.2, 12),
        new THREE.MeshPhongMaterial({ color: 0x228B22 })
      );
      const poisonBubble = new THREE.Mesh(
        new THREE.SphereGeometry(0.4, 8, 8),
        new THREE.MeshPhongMaterial({ color: 0x00ff00, emissive: 0x00ff00, emissiveIntensity: 0.5 })
      );
      poisonBubble.position.y = 1.2;
      poisonGroup.add(poisonBase);
      poisonGroup.add(poisonBubble);
      mesh = poisonGroup;
      break;
      
    case 'freeze':
      // Freeze: icy blue crystal
      const freezeGroup = new THREE.Group();
      const freezeBase = new THREE.Mesh(
        new THREE.CylinderGeometry(0.5, 0.5, 1.2, 12),
        new THREE.MeshPhongMaterial({ color: 0x99ccff })
      );
      const freezeCrystal = new THREE.Mesh(
        new THREE.ConeGeometry(0.5, 1.5, 8),
        new THREE.MeshPhongMaterial({ color: 0x00ffff, emissive: 0x00ffff, emissiveIntensity: 0.7 })
      );
      freezeCrystal.position.y = 1.5;
      freezeGroup.add(freezeBase);
      freezeGroup.add(freezeCrystal);
      mesh = freezeGroup;
      break;
      
    case 'bomb':
      // Bomb: black sphere with fuse
      const bombGroup = new THREE.Group();
      const bombBody = new THREE.Mesh(
        new THREE.SphereGeometry(0.7, 12, 12),
        new THREE.MeshPhongMaterial({ color: 0x222222 })
      );
      const bombFuse = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 0.5, 6),
        new THREE.MeshPhongMaterial({ color: 0xffd700 })
      );
      bombFuse.position.y = 1.1;
      bombGroup.add(bombBody);
      bombGroup.add(bombFuse);
      mesh = bombGroup;
      break;
      
    case 'rocket':
      // Rocket: red rocket on stand
      const rocketGroup = new THREE.Group();
      const rocketStand = new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.3, 1.2, 8),
        new THREE.MeshPhongMaterial({ color: 0x444444 })
      );
      const rocketBody = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.2, 1.5, 8),
        new THREE.MeshPhongMaterial({ color: 0xff0000 })
      );
      rocketBody.position.y = 1.2;
      rocketGroup.add(rocketStand);
      rocketGroup.add(rocketBody);
      mesh = rocketGroup;
      break;
      
    case 'plasma':
      // Plasma: purple orb with rings
      const plasmaGroup = new THREE.Group();
      const plasmaBase = new THREE.Mesh(
        new THREE.CylinderGeometry(0.5, 0.5, 1.2, 12),
        new THREE.MeshPhongMaterial({ color: 0x800080 })
      );
      const plasmaOrb = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 12, 12),
        new THREE.MeshPhongMaterial({ color: 0xcc00ff, emissive: 0xcc00ff, emissiveIntensity: 0.7 })
      );
      plasmaOrb.position.y = 1.2;
      plasmaGroup.add(plasmaBase);
      plasmaGroup.add(plasmaOrb);
      mesh = plasmaGroup;
      break;
      
    case 'wind':
      // Wind: white spiral
      const windGroup = new THREE.Group();
      const windBase = new THREE.Mesh(
        new THREE.CylinderGeometry(0.5, 0.5, 1.2, 12),
        new THREE.MeshPhongMaterial({ color: 0xdddddd })
      );
      const windSpiral = new THREE.Mesh(
        new THREE.TorusGeometry(0.7, 0.1, 8, 24),
        new THREE.MeshPhongMaterial({ color: 0xffffff })
      );
      windSpiral.position.y = 1.2;
      windGroup.add(windBase);
      windGroup.add(windSpiral);
      mesh = windGroup;
      break;
      
    case 'gold':
      // Gold: gold bar on pedestal
      const goldGroup = new THREE.Group();
      const goldBase = new THREE.Mesh(
        new THREE.CylinderGeometry(0.6, 0.6, 1.2, 12),
        new THREE.MeshPhongMaterial({ color: 0xFFD700 })
      );
      const goldBar = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 0.3, 0.4),
        new THREE.MeshPhongMaterial({ color: 0xFFD700, emissive: 0xFFD700, emissiveIntensity: 0.5 })
      );
      goldBar.position.y = 1.1;
      goldGroup.add(goldBase);
      goldGroup.add(goldBar);
      mesh = goldGroup;
      break;
      
    default:
      // Default cylinder
      mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(1, 1, 2, 16),
        new THREE.MeshPhongMaterial({ color: this.color })
      );
  }
  return mesh;
};

Tower.prototype.updateStats = function() {
  const stats = TOWER_TYPES[this.type].levels[this.level];
  for (const key in stats) {
    this[key] = stats[key];
  }
  // This is a bit of a hack for now to set a base color
  if (!this.color) this.color = this.type === 'minigun' ? 0x00ff00 : 0xffa500;
};

Tower.prototype.upgrade = function() {
  const nextLevel = this.level + 1;
  if (nextLevel < TOWER_TYPES[this.type].levels.length) {
    const upgradeCost = TOWER_TYPES[this.type].levels[nextLevel].cost;
    if (window.money >= upgradeCost) {
      window.money -= upgradeCost;
      this.level = nextLevel;
      this.investedCost += upgradeCost;
      this.updateStats();
      // Visual feedback for upgrade
      this.mesh.scale.set(1.2, 1.2, 1.2);
      setTimeout(() => this.mesh.scale.set(1, 1, 1), 200);
      return true;
    }
  }
  return false;
};

Tower.prototype.getSellValue = function() {
  return Math.floor(this.investedCost * 0.7);
};

Tower.prototype.mutate = function() {
  console.log(`🧬 Tower ${this.type} has MUTATED!`);
  
  // Store original stats
  this.originalStats = {
    damage: this.damage,
    fireRate: this.fireRate,
    range: this.range,
    color: this.color
  };
  
  // Apply massive stat boosts
  this.damage *= 10; // 10x damage
  this.fireRate *= 0.1; // 10x faster firing
  this.range *= 3; // 3x range
  
  // Add special abilities based on tower type
  this.mutated = true;
  this.mutationType = this.getRandomMutation();
  
  // Update visual appearance
  this.updateMutatedAppearance();
  
  console.log(`🧬 Mutation: ${this.mutationType} - Damage: ${this.damage}, Fire Rate: ${this.fireRate}, Range: ${this.range}`);
};

Tower.prototype.getRandomMutation = function() {
  const mutations = [
    'plasma',
    'void',
    'time',
    'chaos',
    'crystal',
    'shadow',
    'storm',
    'inferno'
  ];
  return mutations[Math.floor(Math.random() * mutations.length)];
};

Tower.prototype.updateMutatedAppearance = function() {
  // Remove existing mesh
  if (this.mesh && this.mesh.parent) {
    this.mesh.parent.remove(this.mesh);
  }
  
  // Create mutated mesh
  this.mesh = this.createMutatedMesh();
  this.mesh.position.set(this.mesh.position.x, 1, this.mesh.position.z);
  this.mesh.userData.tower = this;
  window.scene.add(this.mesh);
};

Tower.prototype.createMutatedMesh = function() {
  const group = new THREE.Group();
  
  // Base mutated appearance
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(1, 1, 3, 16),
    new THREE.MeshPhongMaterial({ 
      color: this.getMutationColor(),
      emissive: this.getMutationColor(),
      emissiveIntensity: 0.3
    })
  );
  base.position.y = 1.5;
  
  // Mutation-specific additions
  switch(this.mutationType) {
    case 'plasma':
      // Plasma orbs floating around
      for (let i = 0; i < 4; i++) {
        const orb = new THREE.Mesh(
          new THREE.SphereGeometry(0.3, 8, 8),
          new THREE.MeshPhongMaterial({ 
            color: 0x00FFFF,
            emissive: 0x00FFFF,
            emissiveIntensity: 1.0
          })
        );
        orb.position.set(
          Math.cos(i * Math.PI / 2) * 1.5,
          1.5,
          Math.sin(i * Math.PI / 2) * 1.5
        );
        group.add(orb);
      }
      break;
      
    case 'void':
      // Dark void particles
      for (let i = 0; i < 6; i++) {
        const particle = new THREE.Mesh(
          new THREE.SphereGeometry(0.1, 4, 4),
          new THREE.MeshPhongMaterial({ 
            color: 0x000000,
            emissive: 0x800080,
            emissiveIntensity: 0.8
          })
        );
        particle.position.set(
          (Math.random() - 0.5) * 2,
          1.5 + Math.random() * 2,
          (Math.random() - 0.5) * 2
        );
        group.add(particle);
      }
      break;
      
    case 'time':
      // Clock-like structure
      const clockRing = new THREE.Mesh(
        new THREE.RingGeometry(1.2, 1.5, 8),
        new THREE.MeshPhongMaterial({ 
          color: 0xFFFF00,
          emissive: 0xFFFF00,
          emissiveIntensity: 0.6
        })
      );
      clockRing.position.y = 2.5;
      clockRing.rotation.x = -Math.PI / 2;
      group.add(clockRing);
      break;
      
    case 'chaos':
      // Chaotic spikes
      for (let i = 0; i < 8; i++) {
        const spike = new THREE.Mesh(
          new THREE.ConeGeometry(0.1, 0.8, 4),
          new THREE.MeshPhongMaterial({ 
            color: 0xFF0000,
            emissive: 0xFF0000,
            emissiveIntensity: 0.7
          })
        );
        spike.position.set(
          Math.cos(i * Math.PI / 4) * 1.2,
          1.5 + Math.random() * 1,
          Math.sin(i * Math.PI / 4) * 1.2
        );
        spike.rotation.x = Math.random() * Math.PI;
        spike.rotation.z = Math.random() * Math.PI;
        group.add(spike);
      }
      break;
      
    case 'crystal':
      // Crystal formations
      for (let i = 0; i < 5; i++) {
        const crystal = new THREE.Mesh(
          new THREE.ConeGeometry(0.2, 1, 4),
          new THREE.MeshPhongMaterial({ 
            color: 0x00FF00,
            emissive: 0x00FF00,
            emissiveIntensity: 0.8
          })
        );
        crystal.position.set(
          (Math.random() - 0.5) * 1.5,
          1.5 + Math.random() * 1.5,
          (Math.random() - 0.5) * 1.5
        );
        crystal.rotation.x = Math.random() * Math.PI;
        crystal.rotation.z = Math.random() * Math.PI;
        group.add(crystal);
      }
      break;
      
    case 'shadow':
      // Shadow tendrils
      for (let i = 0; i < 6; i++) {
        const tendril = new THREE.Mesh(
          new THREE.CylinderGeometry(0.05, 0.05, 1.5, 4),
          new THREE.MeshPhongMaterial({ 
            color: 0x800080,
            emissive: 0x800080,
            emissiveIntensity: 0.6
          })
        );
        tendril.position.set(
          Math.cos(i * Math.PI / 3) * 1.2,
          1.5,
          Math.sin(i * Math.PI / 3) * 1.2
        );
        tendril.rotation.x = Math.random() * Math.PI;
        tendril.rotation.z = Math.random() * Math.PI;
        group.add(tendril);
      }
      break;
      
    case 'storm':
      // Lightning bolts
      for (let i = 0; i < 4; i++) {
        const bolt = new THREE.Mesh(
          new THREE.CylinderGeometry(0.05, 0.05, 2, 4),
          new THREE.MeshPhongMaterial({ 
            color: 0xFFFF00,
            emissive: 0xFFFF00,
            emissiveIntensity: 1.0
          })
        );
        bolt.position.set(
          Math.cos(i * Math.PI / 2) * 1.3,
          1.5,
          Math.sin(i * Math.PI / 2) * 1.3
        );
        bolt.rotation.x = Math.random() * Math.PI;
        bolt.rotation.z = Math.random() * Math.PI;
        group.add(bolt);
      }
      break;
      
    case 'inferno':
      // Fire effects
      for (let i = 0; i < 7; i++) {
        const flame = new THREE.Mesh(
          new THREE.ConeGeometry(0.15, 0.6, 4),
          new THREE.MeshPhongMaterial({ 
            color: 0xFF4500,
            emissive: 0xFF4500,
            emissiveIntensity: 0.9
          })
        );
        flame.position.set(
          (Math.random() - 0.5) * 1.8,
          1.5 + Math.random() * 1.2,
          (Math.random() - 0.5) * 1.8
        );
        flame.rotation.x = Math.random() * Math.PI;
        flame.rotation.z = Math.random() * Math.PI;
        group.add(flame);
      }
      break;
  }
  
  group.add(base);
  return group;
};

Tower.prototype.getMutationColor = function() {
  const colors = {
    'plasma': 0x00FFFF,
    'void': 0x800080,
    'time': 0xFFFF00,
    'chaos': 0xFF0000,
    'crystal': 0x00FF00,
    'shadow': 0x800080,
    'storm': 0xFFFF00,
    'inferno': 0xFF4500
  };
  return colors[this.mutationType] || 0xFFFFFF;
};

Tower.prototype.update = function(dt, scene) {
  // Handle frozen state
  if (this.frozen) {
    this.frozenTime -= dt;
    if (this.frozenTime <= 0) {
      this.frozen = false;
      console.log(`🧊 Tower ${this.type} unfrozen!`);
    } else {
      // Tower is frozen, don't attack
      return;
    }
  }
  
  // Check if tower can be upgraded and show visual indicator
  this.updateUpgradeIndicator();
  
  this.lastShot += dt;
  if (this.lastShot >= this.fireRate) {
    // Find target
    let target = null;
    let minDist = Infinity;
    for (const enemy of enemies) {
      const dist = this.mesh.position.distanceTo(enemy.mesh.position);
      if (dist < this.range && dist < minDist) {
        minDist = dist;
        target = enemy;
      }
    }
    if (target) {
      this.lastShot = 0;
      // Handle mutated tower special abilities
      if (this.mutated) {
        this.useMutationAbility(target, scene);
      } else {
        // Normal tower behavior
        if (this.splash) {
          // Splash damage
          target.takeDamage(this.damage);
          for (const enemy of enemies) {
            if (enemy !== target && !enemy.dead) {
              const dist = target.mesh.position.distanceTo(enemy.mesh.position);
              if (dist < this.splashRadius) {
                enemy.takeDamage(this.damage * 0.5); // 50% splash damage
              }
            }
          }
        } else if (this.chain) {
          // Chain lightning
          let chainTargets = [target];
          target.takeDamage(this.damage);
          
          for (let i = 1; i < this.chainCount; i++) {
            let nextTarget = null;
            let minDist = Infinity;
            for (const enemy of enemies) {
              if (!enemy.dead && !chainTargets.includes(enemy)) {
                const dist = chainTargets[i-1].mesh.position.distanceTo(enemy.mesh.position);
                if (dist < 5 && dist < minDist) { // Chain range
                  minDist = dist;
                  nextTarget = enemy;
                }
              }
            }
            if (nextTarget) {
              chainTargets.push(nextTarget);
              nextTarget.takeDamage(this.damage * (1 - i * 0.2)); // Decreasing damage
            } else {
              break;
            }
          }
        } else if (this.poison) {
          // Poison damage
          target.takeDamage(this.damage);
          if (!target.poisoned) {
            target.poisoned = true;
            target.poisonDamage = this.damage * 0.3; // 30% of base damage per tick
            target.poisonTicks = Math.floor(this.poisonDuration);
            target.poisonTimer = 0;
          }
        } else if (this.slow) {
          // Slow effect
          target.takeDamage(this.damage);
          if (!target.slowed) {
            target.slowed = true;
            target.originalSpeed = target.speed;
            target.speed *= (1 - this.slowAmount);
            setTimeout(() => {
              if (target && !target.dead) {
                target.speed = target.originalSpeed;
                target.slowed = false;
              }
            }, this.slowDuration * 1000);
          }
        } else if (this.knockback) {
          // Knockback
          target.takeDamage(this.damage);
          if (!target.knockback) target.knockback = 0;
          target.knockback += TOWER_TYPES.wind.levels[this.level].knockbackAmount;
        } else if (this.type === 'gold') {
          // Gold: deal damage and give money per hit
          target.takeDamage(this.damage);
          window.money += TOWER_TYPES.gold.levels[this.level].goldPerHit;
          window.updateUI && window.updateUI();
        } else {
          // Normal tower behavior
          if (this.boost) {
            // Medic boost - increase damage of nearby towers
            for (const tower of towers) {
              if (tower !== this) {
                const dist = this.mesh.position.distanceTo(tower.mesh.position);
                if (dist < this.range) {
                  // Boost effect (visual only for now)
                  setTimeout(() => tower.mesh.scale.set(1, 1, 1), 200);
                }
              }
            }
          }
          target.takeDamage(this.damage);
        }
      }
      
      // Visual effect
      this.mesh.scale.set(1.1, 1.1, 1.1);
      setTimeout(() => this.mesh.scale.set(1, 1, 1), 100);
    }
  }
};

Tower.prototype.updateUpgradeIndicator = function() {
  // Check if tower can be upgraded
  const nextLevel = this.level + 1;
  const canUpgrade = nextLevel < TOWER_TYPES[this.type].levels.length;
  const hasMoney = window.money >= (canUpgrade ? TOWER_TYPES[this.type].levels[nextLevel].cost : 0);
  
  // Add or remove upgrade indicator
  if (canUpgrade && hasMoney) {
    if (!this.upgradeIndicator) {
      // Create upgrade indicator (floating arrow)
      this.upgradeIndicator = new THREE.Mesh(
        new THREE.ConeGeometry(0.3, 0.6, 8),
        new THREE.MeshBasicMaterial({ 
          color: 0x4CAF50,
          emissive: 0x4CAF50,
          emissiveIntensity: 0.8
        })
      );
      this.upgradeIndicator.position.y = 3;
      this.upgradeIndicator.rotation.x = Math.PI;
      this.mesh.add(this.upgradeIndicator);
      
      // Add floating animation
      this.upgradeIndicator.userData.originalY = 3;
      this.upgradeIndicator.userData.floatTime = 0;
    }
    
    // Animate the indicator
    if (this.upgradeIndicator) {
      this.upgradeIndicator.userData.floatTime += 0.016; // Assuming 60fps
      const floatOffset = Math.sin(this.upgradeIndicator.userData.floatTime * 3) * 0.2;
      this.upgradeIndicator.position.y = this.upgradeIndicator.userData.originalY + floatOffset;
      
      // Rotate the arrow
      this.upgradeIndicator.rotation.y += 0.05;
    }
  } else {
    // Remove upgrade indicator
    if (this.upgradeIndicator) {
      this.mesh.remove(this.upgradeIndicator);
      this.upgradeIndicator = null;
    }
  }
};

Tower.prototype.useMutationAbility = function(target, scene) {
  // Deal base damage
  target.takeDamage(this.damage);
  
  // Apply mutation-specific effects
  switch(this.mutationType) {
    case 'plasma':
      // Plasma: Chain to multiple enemies
      this.plasmaChain(target, scene);
      break;
      
    case 'void':
      // Void: Instantly kill low health enemies
      this.voidKill(target);
      break;
      
    case 'time':
      // Time: Slow all enemies
      this.timeSlow();
      break;
      
    case 'chaos':
      // Chaos: Random massive damage
      this.chaosDamage(target);
      break;
      
    case 'crystal':
      // Crystal: Pierce through enemies
      this.crystalPierce(target, scene);
      break;
      
    case 'shadow':
      // Shadow: Stealth damage bonus
      this.shadowStealth(target);
      break;
      
    case 'storm':
      // Storm: Chain lightning
      this.stormLightning(target, scene);
      break;
      
    case 'inferno':
      // Inferno: Burn all enemies in range
      this.infernoBurn(scene);
      break;
  }
};

Tower.prototype.plasmaChain = function(target, scene) {
  let chainCount = 0;
  let currentTarget = target;
  
  while (currentTarget && chainCount < 5) {
    // Find next target
    let nextTarget = null;
    let minDist = Infinity;
    
    for (const enemy of enemies) {
      if (enemy !== currentTarget && !enemy.dead) {
        const dist = currentTarget.mesh.position.distanceTo(enemy.mesh.position);
        if (dist < 8 && dist < minDist) {
          minDist = dist;
          nextTarget = enemy;
        }
      }
    }
    
    if (nextTarget) {
      nextTarget.takeDamage(this.damage * 0.5); // 50% damage to chained targets
      this.createPlasmaArc(currentTarget.mesh.position, nextTarget.mesh.position, scene);
      currentTarget = nextTarget;
      chainCount++;
    } else {
      break;
    }
  }
};

Tower.prototype.voidKill = function(target) {
  if (target.health < target.maxHealth * 0.3) { // 30% health threshold
    target.health = 0;
    target.die();
    console.log(`⚫ Void mutation instantly killed ${target.name}!`);
  }
};

Tower.prototype.timeSlow = function() {
  for (const enemy of enemies) {
    if (!enemy.dead) {
      enemy.speed *= 0.5; // Slow all enemies by 50%
      setTimeout(() => {
        if (enemy && !enemy.dead) {
          enemy.speed *= 2; // Restore speed after 3 seconds
        }
      }, 3000);
    }
  }
  console.log(`⏰ Time mutation slowed all enemies!`);
};

Tower.prototype.chaosDamage = function(target) {
  const chaosMultiplier = Math.random() * 5 + 1; // 1x to 6x damage
  target.takeDamage(this.damage * chaosMultiplier);
  console.log(`🌀 Chaos mutation dealt ${chaosMultiplier.toFixed(1)}x damage!`);
};

Tower.prototype.crystalPierce = function(target, scene) {
  // Pierce through all enemies in a line
  const direction = new THREE.Vector3();
  direction.subVectors(target.mesh.position, this.mesh.position).normalize();
  
  for (const enemy of enemies) {
    if (!enemy.dead) {
      const toEnemy = new THREE.Vector3();
      toEnemy.subVectors(enemy.mesh.position, this.mesh.position).normalize();
      
      const angle = direction.angleTo(toEnemy);
      const distance = this.mesh.position.distanceTo(enemy.mesh.position);
      
      if (angle < 0.3 && distance < this.range) { // 30 degree cone
        enemy.takeDamage(this.damage * 0.7); // 70% damage to pierced enemies
      }
    }
  }
};

Tower.prototype.shadowStealth = function(target) {
  // Stealth damage bonus (invisible to enemies)
  target.takeDamage(this.damage * 2); // Double damage
  console.log(`👻 Shadow mutation dealt stealth damage!`);
};

Tower.prototype.stormLightning = function(target, scene) {
  // Chain lightning to multiple enemies
  let chainCount = 0;
  let currentTarget = target;
  
  while (currentTarget && chainCount < 8) {
    // Find next target
    let nextTarget = null;
    let minDist = Infinity;
    
    for (const enemy of enemies) {
      if (enemy !== currentTarget && !enemy.dead) {
        const dist = currentTarget.mesh.position.distanceTo(enemy.mesh.position);
        if (dist < 6 && dist < minDist) {
          minDist = dist;
          nextTarget = enemy;
        }
      }
    }
    
    if (nextTarget) {
      nextTarget.takeDamage(this.damage * 0.6);
      this.createLightningArc(currentTarget.mesh.position, nextTarget.mesh.position, scene);
      currentTarget = nextTarget;
      chainCount++;
    } else {
      break;
    }
  }
};

Tower.prototype.infernoBurn = function(scene) {
  // Burn all enemies in range
  let burnedCount = 0;
  
  for (const enemy of enemies) {
    if (!enemy.dead) {
      const dist = this.mesh.position.distanceTo(enemy.mesh.position);
      if (dist < this.range) {
        enemy.takeDamage(this.damage * 0.8);
        burnedCount++;
        
        // Apply burn effect
        enemy.burning = true;
        enemy.burnTime = 5; // 5 seconds of burn
      }
    }
  }
  
  if (burnedCount > 0) {
    console.log(`🔥 Inferno mutation burned ${burnedCount} enemies!`);
  }
};

Tower.prototype.createPlasmaArc = function(startPos, endPos, scene) {
  const arc = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.1, 8, 6),
    new THREE.MeshBasicMaterial({ 
      color: 0x00FFFF,
      emissive: 0x00FFFF,
      emissiveIntensity: 1.0
    })
  );
  
  arc.position.copy(startPos);
  arc.position.y += 1;
  arc.lookAt(endPos);
  scene.add(arc);
  
  setTimeout(() => scene.remove(arc), 300);
};

Tower.prototype.createLightningArc = function(startPos, endPos, scene) {
  const arc = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.1, 6, 6),
    new THREE.MeshBasicMaterial({ 
      color: 0xFFFF00,
      emissive: 0xFFFF00,
      emissiveIntensity: 1.0
    })
  );
  
  arc.position.copy(startPos);
  arc.position.y += 1;
  arc.lookAt(endPos);
  scene.add(arc);
  
  setTimeout(() => scene.remove(arc), 200);
};

window.placeTower = function(scene, type, pos) {
  let tower;
  
  if (type === 'builder') {
    tower = new BuilderTower(scene, pos);
  } else if (type === 'banker') {
    tower = new BankerTower(scene, pos);
  } else if (type === 'general') {
    tower = new GeneralTower(scene, pos);
  } else if (type === 'duckgod') {
    tower = new DuckGod(scene, pos);
  } else if (type === 'godtower') {
    tower = new GodTower(scene, pos);
  } else if (type === 'demolishinist') {
    tower = new DemolishinistTower(scene, pos);
  } else {
    tower = new Tower(scene, type, pos);
  }
  
  // 1% chance for tower to become mutated (except Duck God, Builder, and Banker)
  if (type !== 'duckGod' && type !== 'builder' && type !== 'banker' && Math.random() < 0.01) {
    tower.mutate();
  }
  
  towers.push(tower);
};

window.updateTowers = function(dt, scene) {
  for (const tower of towers) {
    tower.update(dt, scene);
  }
};

window.updateFriendlyTanks = function(dt) {
  for (let i = friendlyTanks.length - 1; i >= 0; i--) {
    if (friendlyTanks[i].update(dt)) {
      friendlyTanks.splice(i, 1);
    }
  }
};

// Cheat Tower class - medic-boosted shooter with infinite range
function CheatTower(scene, pos) {
  this.type = 'cheat';
  this.level = 0;
  this.range = Infinity; // Infinite range
  this.fireRate = 0.00000000000000001; // Extremely fast fire rate
  this.damage = 250000000; // 250 million damage per shot
  this.boost = 0.5; // 50% boost
  this.investedCost = 0; // Free
  this.lastShot = 0;
  
  // Create cheat tower mesh (golden tower)
  this.mesh = new THREE.Group();
  
  // Base
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.8, 0.8, 2, 16),
    new THREE.MeshPhongMaterial({ color: 0xFFD700 }) // Gold
  );
  
  // Barrel
  const barrel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.2, 2, 8),
    new THREE.MeshPhongMaterial({ color: 0xFFA500 }) // Orange
  );
  barrel.position.y = 1.5;
  barrel.rotation.z = Math.PI / 2;
  
  // Cross (medic symbol)
  const cross = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 0.1, 0.1),
    new THREE.MeshPhongMaterial({ color: 0xFF0000 }) // Red
  );
  cross.position.y = 1.5;
  cross.position.z = 0.5;
  
  this.mesh.add(base);
  this.mesh.add(barrel);
  this.mesh.add(cross);
  
  this.mesh.position.set(pos.x, 1, pos.z);
  this.mesh.userData.tower = this;
  scene.add(this.mesh);
}

CheatTower.prototype.update = function(dt, scene) {
  // Handle frozen state
  if (this.frozen) {
    this.frozenTime -= dt;
    if (this.frozenTime <= 0) {
      this.frozen = false;
      console.log(`🧊 Cheat Tower unfrozen!`);
    } else {
      // Tower is frozen, don't attack
      return;
    }
  }
  
  this.lastShot += dt;
  if (this.lastShot >= this.fireRate) {
    // Find target (any enemy, infinite range)
    let target = null;
    let minDist = Infinity;
    
    for (const enemy of enemies) {
      if (!enemy || !enemy.mesh || enemy.dead) continue;
      
      try {
        const dist = this.mesh.position.distanceTo(enemy.mesh.position);
        
        if (dist < minDist) {
          minDist = dist;
          target = enemy;
        }
      } catch (error) {
        console.error("Error calculating distance to enemy:", error);
      }
    }
    
    if (target) {
      this.lastShot = 0;
      
      // Deal damage to target
      target.takeDamage(this.damage);
      
      // Boost nearby towers
      for (const tower of towers) {
        if (tower !== this && tower.mesh) {
          const dist = this.mesh.position.distanceTo(tower.mesh.position);
          if (dist < 10) { // Boost range
            // Visual boost effect
            tower.mesh.scale.set(1.2, 1.2, 1.2);
            setTimeout(() => tower.mesh.scale.set(1, 1, 1), 200);
          }
        }
      }
      
      // Visual effect
      this.mesh.scale.set(1.1, 1.1, 1.1);
      setTimeout(() => this.mesh.scale.set(1, 1, 1), 100);
    }
  }
};

CheatTower.prototype.upgrade = function() {
  // Cheat towers can't be upgraded
  return false;
};

CheatTower.prototype.getSellValue = function() {
  return 0; // Can't sell cheat towers
};

// General Tower class - appears on wave 20
function GeneralTower(scene, pos) {
  this.type = 'general';
  this.level = 0;
  this.range = 10000000000; // Effectively infinite
  this.fireRate = 0.5;
  this.damage = 5000;
  this.boost = 5.0; // 500% boost
  this.cooldownReduction = 0.99; // 99% cooldown reduction
  this.investedCost = 5000; // Cost $5000
  this.lastShot = 0;

  // Create general tower mesh (large, gold, with a star)
  this.mesh = new THREE.Group();

  // Base
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(1.2, 1.2, 3, 24),
    new THREE.MeshPhongMaterial({ color: 0xFFD700 }) // Gold
  );
  base.position.y = 1.5;

  // Cannon
  const cannon = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.3, 3, 16),
    new THREE.MeshPhongMaterial({ color: 0x2222FF }) // Blue
  );
  cannon.position.y = 3;
  cannon.rotation.z = Math.PI / 2;

  // Star (as a flat yellow circle)
  const star = new THREE.Mesh(
    new THREE.CircleGeometry(1, 5),
    new THREE.MeshPhongMaterial({ color: 0xFFFF00 }) // Yellow
  );
  star.position.y = 4.5;
  star.rotation.x = -Math.PI / 2;

  this.mesh.add(base);
  this.mesh.add(cannon);
  this.mesh.add(star);

  this.mesh.position.set(pos.x, 1, pos.z);
  this.mesh.userData.tower = this;
  scene.add(this.mesh);
}

GeneralTower.prototype.update = function(dt, scene) {
  // Handle frozen state
  if (this.frozen) {
    this.frozenTime -= dt;
    if (this.frozenTime <= 0) {
      this.frozen = false;
      console.log(`🧊 General Tower unfrozen!`);
    } else {
      // Tower is frozen, don't attack
      return;
    }
  }
  
  this.lastShot += dt;
  if (this.lastShot >= this.fireRate) {
    // Find target
    let target = null;
    let minDist = Infinity;
    
    for (const enemy of enemies) {
      if (!enemy || !enemy.mesh || enemy.dead) continue;
      
      try {
        const dist = this.mesh.position.distanceTo(enemy.mesh.position);
        
        if (dist < this.range && dist < minDist) {
          minDist = dist;
          target = enemy;
        }
      } catch (error) {
        console.error("Error calculating distance to enemy:", error);
      }
    }
    
    if (target) {
      this.lastShot = 0;
      
      // Handle mutated tower special abilities
      if (this.mutated) {
        this.useMutationAbility(target, scene);
      } else {
        // Normal General tower behavior
        // Deal damage to target
        target.takeDamage(this.damage);
        
        // Boost nearby towers
        for (const tower of towers) {
          if (tower !== this && tower.mesh) {
            const dist = this.mesh.position.distanceTo(tower.mesh.position);
            if (dist < this.range) { // Boost range
              // Visual boost effect
              tower.mesh.scale.set(1.1, 1.1, 1.1);
              setTimeout(() => tower.mesh.scale.set(1, 1, 1), 200);
            }
          }
        }
      }
      
      // Visual effect
      this.mesh.scale.set(1.05, 1.05, 1.05);
      setTimeout(() => this.mesh.scale.set(1, 1, 1), 100);
    }
  }
};

GeneralTower.prototype.upgrade = function() { return false; };
GeneralTower.prototype.getSellValue = function() { return Math.floor(this.investedCost / 2); };

GeneralTower.prototype.mutate = function() {
  console.log(`🧬 General Tower has MUTATED!`);
  
  // Store original stats
  this.originalStats = {
    damage: this.damage,
    fireRate: this.fireRate,
    range: this.range
  };
  
  // Apply massive stat boosts
  this.damage *= 15; // 15x damage (even more than regular towers)
  this.fireRate *= 0.05; // 20x faster firing
  this.range *= 5; // 5x range
  
  // Add special abilities
  this.mutated = true;
  this.mutationType = this.getRandomMutation();
  
  // Update visual appearance
  this.updateMutatedAppearance();
  
  console.log(`🧬 General Mutation: ${this.mutationType} - Damage: ${this.damage}, Fire Rate: ${this.fireRate}, Range: ${this.range}`);
};

GeneralTower.prototype.getRandomMutation = function() {
  const mutations = [
    'plasma',
    'void',
    'time',
    'chaos',
    'crystal',
    'shadow',
    'storm',
    'inferno'
  ];
  return mutations[Math.floor(Math.random() * mutations.length)];
};

GeneralTower.prototype.updateMutatedAppearance = function() {
  // Remove existing mesh
  if (this.mesh && this.mesh.parent) {
    this.mesh.parent.remove(this.mesh);
  }
  
  // Create mutated mesh
  this.mesh = this.createMutatedMesh();
  this.mesh.position.set(this.mesh.position.x, 1, this.mesh.position.z);
  this.mesh.userData.tower = this;
  window.scene.add(this.mesh);
};

GeneralTower.prototype.createMutatedMesh = function() {
  const group = new THREE.Group();
  
  // Base mutated appearance (larger than regular towers)
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(1.5, 1.5, 4, 16),
    new THREE.MeshPhongMaterial({ 
      color: this.getMutationColor(),
      emissive: this.getMutationColor(),
      emissiveIntensity: 0.5
    })
  );
  base.position.y = 2;
  
  // Add star on top (General tower signature)
  const star = new THREE.Mesh(
    new THREE.ConeGeometry(0.5, 1, 5),
    new THREE.MeshPhongMaterial({ 
      color: 0xFFD700,
      emissive: 0xFFD700,
      emissiveIntensity: 1.0
    })
  );
  star.position.y = 3.5;
  star.rotation.y = Math.PI / 5;
  group.add(star);
  
  // Mutation-specific additions (more elaborate than regular towers)
  switch(this.mutationType) {
    case 'plasma':
      // Plasma orbs floating around
      for (let i = 0; i < 6; i++) {
        const orb = new THREE.Mesh(
          new THREE.SphereGeometry(0.4, 8, 8),
          new THREE.MeshPhongMaterial({ 
            color: 0x00FFFF,
            emissive: 0x00FFFF,
            emissiveIntensity: 1.0
          })
        );
        orb.position.set(
          Math.cos(i * Math.PI / 3) * 2,
          2,
          Math.sin(i * Math.PI / 3) * 2
        );
        group.add(orb);
      }
      break;
      
    case 'void':
      // Dark void particles
      for (let i = 0; i < 8; i++) {
        const particle = new THREE.Mesh(
          new THREE.SphereGeometry(0.15, 4, 4),
          new THREE.MeshPhongMaterial({ 
            color: 0x000000,
            emissive: 0x800080,
            emissiveIntensity: 1.0
          })
        );
        particle.position.set(
          (Math.random() - 0.5) * 3,
          2 + Math.random() * 3,
          (Math.random() - 0.5) * 3
        );
        group.add(particle);
      }
      break;
      
    case 'time':
      // Clock-like structure
      const clockRing = new THREE.Mesh(
        new THREE.RingGeometry(1.8, 2.2, 8),
        new THREE.MeshPhongMaterial({ 
          color: 0xFFFF00,
          emissive: 0xFFFF00,
          emissiveIntensity: 0.8
        })
      );
      clockRing.position.y = 3;
      clockRing.rotation.x = -Math.PI / 2;
      group.add(clockRing);
      break;
      
    case 'chaos':
      // Chaotic spikes
      for (let i = 0; i < 10; i++) {
        const spike = new THREE.Mesh(
          new THREE.ConeGeometry(0.15, 1, 4),
          new THREE.MeshPhongMaterial({ 
            color: 0xFF0000,
            emissive: 0xFF0000,
            emissiveIntensity: 0.9
          })
        );
        spike.position.set(
          Math.cos(i * Math.PI / 5) * 1.8,
          2 + Math.random() * 2,
          Math.sin(i * Math.PI / 5) * 1.8
        );
        spike.rotation.x = Math.random() * Math.PI;
        spike.rotation.z = Math.random() * Math.PI;
        group.add(spike);
      }
      break;
      
    case 'crystal':
      // Crystal formations
      for (let i = 0; i < 7; i++) {
        const crystal = new THREE.Mesh(
          new THREE.ConeGeometry(0.3, 1.5, 4),
          new THREE.MeshPhongMaterial({ 
            color: 0x00FF00,
            emissive: 0x00FF00,
            emissiveIntensity: 1.0
          })
        );
        crystal.position.set(
          (Math.random() - 0.5) * 2.5,
          2 + Math.random() * 2.5,
          (Math.random() - 0.5) * 2.5
        );
        crystal.rotation.x = Math.random() * Math.PI;
        crystal.rotation.z = Math.random() * Math.PI;
        group.add(crystal);
      }
      break;
      
    case 'shadow':
      // Shadow tendrils
      for (let i = 0; i < 8; i++) {
        const tendril = new THREE.Mesh(
          new THREE.CylinderGeometry(0.08, 0.08, 2, 4),
          new THREE.MeshPhongMaterial({ 
            color: 0x800080,
            emissive: 0x800080,
            emissiveIntensity: 0.8
          })
        );
        tendril.position.set(
          Math.cos(i * Math.PI / 4) * 1.8,
          2,
          Math.sin(i * Math.PI / 4) * 1.8
        );
        tendril.rotation.x = Math.random() * Math.PI;
        tendril.rotation.z = Math.random() * Math.PI;
        group.add(tendril);
      }
      break;
      
    case 'storm':
      // Lightning bolts
      for (let i = 0; i < 6; i++) {
        const bolt = new THREE.Mesh(
          new THREE.CylinderGeometry(0.08, 0.08, 2.5, 4),
          new THREE.MeshPhongMaterial({ 
            color: 0xFFFF00,
            emissive: 0xFFFF00,
            emissiveIntensity: 1.0
          })
        );
        bolt.position.set(
          Math.cos(i * Math.PI / 3) * 1.8,
          2,
          Math.sin(i * Math.PI / 3) * 1.8
        );
        bolt.rotation.x = Math.random() * Math.PI;
        bolt.rotation.z = Math.random() * Math.PI;
        group.add(bolt);
      }
      break;
      
    case 'inferno':
      // Fire effects
      for (let i = 0; i < 9; i++) {
        const flame = new THREE.Mesh(
          new THREE.ConeGeometry(0.2, 0.8, 4),
          new THREE.MeshPhongMaterial({ 
            color: 0xFF4500,
            emissive: 0xFF4500,
            emissiveIntensity: 1.0
          })
        );
        flame.position.set(
          (Math.random() - 0.5) * 2.5,
          2 + Math.random() * 2,
          (Math.random() - 0.5) * 2.5
        );
        flame.rotation.x = Math.random() * Math.PI;
        flame.rotation.z = Math.random() * Math.PI;
        group.add(flame);
      }
      break;
  }
  
  group.add(base);
  return group;
};

GeneralTower.prototype.getMutationColor = function() {
  const colors = {
    'plasma': 0x00FFFF,
    'void': 0x800080,
    'time': 0xFFFF00,
    'chaos': 0xFF0000,
    'crystal': 0x00FF00,
    'shadow': 0x800080,
    'storm': 0xFFFF00,
    'inferno': 0xFF4500
  };
  return colors[this.mutationType] || 0xFFFFFF;
};

// Duck God Tower class - ultimate tower unlocked by killing gargantuan zombies
function DuckGod(scene, pos) {
  this.type = 'duckgod';
  this.level = 0;
  this.range = 15; // Reduced from Infinity to 15
  this.fireRate = 0.5; // Reduced from ultra-fast to 0.5 seconds
  this.damage = 100; // Reduced from 999 trillion to 100
  this.boost = 0.5; // Reduced from 250 trillion% to 50%
  this.cooldownReduction = 0.2; // Reduced from 99.999% to 20%
  this.investedCost = 25000; // Changed from $1 to $25,000
  this.lastShot = 0;

  // Create duck god tower mesh (divine duck)
  this.mesh = new THREE.Group();

  // Divine aura (glowing sphere)
  const aura = new THREE.Mesh(
    new THREE.SphereGeometry(2, 32, 32),
    new THREE.MeshPhongMaterial({ 
      color: 0xFFFFFF,
      transparent: true,
      opacity: 0.3,
      emissive: 0xFFFFFF,
      emissiveIntensity: 0.5
    })
  );

  // Duck body (golden)
  const body = new THREE.Mesh(
    new THREE.SphereGeometry(1, 16, 16),
    new THREE.MeshPhongMaterial({ 
      color: 0xFFD700,
      emissive: 0xFFD700,
      emissiveIntensity: 0.3
    })
  );
  body.position.y = 0.5;

  // Duck head
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.6, 16, 16),
    new THREE.MeshPhongMaterial({ 
      color: 0xFFD700,
      emissive: 0xFFD700,
      emissiveIntensity: 0.3
    })
  );
  head.position.set(0.3, 1.2, 0);

  // Divine beak
  const beak = new THREE.Mesh(
    new THREE.ConeGeometry(0.2, 0.4, 8),
    new THREE.MeshPhongMaterial({ 
      color: 0xFF4500,
      emissive: 0xFF4500,
      emissiveIntensity: 0.5
    })
  );
  beak.position.set(0.8, 1.2, 0);
  beak.rotation.z = Math.PI / 2;

  // Divine eyes (glowing)
  const eyeGeometry = new THREE.SphereGeometry(0.1, 8, 8);
  const leftEye = new THREE.Mesh(eyeGeometry, new THREE.MeshPhongMaterial({ 
    color: 0x00FFFF,
    emissive: 0x00FFFF,
    emissiveIntensity: 1.0
  }));
  const rightEye = new THREE.Mesh(eyeGeometry, new THREE.MeshPhongMaterial({ 
    color: 0x00FFFF,
    emissive: 0x00FFFF,
    emissiveIntensity: 1.0
  }));
  leftEye.position.set(0.2, 1.4, 0.3);
  rightEye.position.set(0.2, 1.4, -0.3);

  // Divine wings
  const wingGeometry = new THREE.PlaneGeometry(1.5, 0.8);
  const leftWing = new THREE.Mesh(wingGeometry, new THREE.MeshPhongMaterial({ 
    color: 0xFFFFFF,
    transparent: true,
    opacity: 0.8,
    emissive: 0xFFFFFF,
    emissiveIntensity: 0.3
  }));
  const rightWing = new THREE.Mesh(wingGeometry, new THREE.MeshPhongMaterial({ 
    color: 0xFFFFFF,
    transparent: true,
    opacity: 0.8,
    emissive: 0xFFFFFF,
    emissiveIntensity: 0.3
  }));
  leftWing.position.set(-0.8, 0.5, 0);
  rightWing.position.set(-0.8, 0.5, 0);
  leftWing.rotation.y = Math.PI / 4;
  rightWing.rotation.y = -Math.PI / 4;

  this.mesh.add(aura);
  this.mesh.add(body);
  this.mesh.add(head);
  this.mesh.add(beak);
  this.mesh.add(leftEye);
  this.mesh.add(rightEye);
  this.mesh.add(leftWing);
  this.mesh.add(rightWing);

  this.mesh.position.set(pos.x, 1, pos.z);
  this.mesh.userData.tower = this;
  scene.add(this.mesh);
}

DuckGod.prototype.update = function(dt, scene) {
  // Handle frozen state
  if (this.frozen) {
    this.frozenTime -= dt;
    if (this.frozenTime <= 0) {
      this.frozen = false;
      console.log(`🧊 Duck God unfrozen!`);
    } else {
      // Tower is frozen, don't attack
      return;
    }
  }
  
  this.lastShot += dt;
  if (this.lastShot >= this.fireRate) {
    // Find target (any enemy, infinite range)
    let target = null;
    let minDist = Infinity;
    
    for (const enemy of enemies) {
      if (!enemy || !enemy.mesh || enemy.dead) continue;
      
      try {
        const dist = this.mesh.position.distanceTo(enemy.mesh.position);
        
        if (dist < minDist) {
          minDist = dist;
          target = enemy;
        }
      } catch (error) {
        console.error("Error calculating distance to enemy:", error);
      }
    }
    
    if (target) {
      this.lastShot = 0;
      
      // Deal massive damage to target
      target.takeDamage(this.damage);
      
      // Boost ALL towers massively
      for (const tower of towers) {
        if (tower !== this && tower.mesh) {
          // Visual boost effect
          tower.mesh.scale.set(1.5, 1.5, 1.5);
          setTimeout(() => tower.mesh.scale.set(1, 1, 1), 300);
        }
      }
      
      // Visual effect
      this.mesh.scale.set(1.2, 1.2, 1.2);
      setTimeout(() => this.mesh.scale.set(1, 1, 1), 200);
    }
  }
};

DuckGod.prototype.upgrade = function() { return false; };
DuckGod.prototype.getSellValue = function() { return 0; };

// Find closest enemy in range
let closestEnemy = null;
let closestDistance = Infinity;

for (let i = 0; i < window.enemies.length; i++) {
  const enemy = window.enemies[i];
  if (enemy && !enemy.dead && enemy.mesh) {
    const distance = Math.sqrt(
      Math.pow(enemy.mesh.position.x - this.mesh.position.x, 2) +
      Math.pow(enemy.mesh.position.z - this.mesh.position.z, 2)
    );
    
    if (distance < this.range && distance < closestDistance) {
      closestDistance = distance;
      closestEnemy = enemy;
    }
  }
}

// Attack if enemy found and not frozen
if (closestEnemy && !this.frozen) {
  closestEnemy.takeDamage(this.damage);
  
  // Create projectile effect
  this.createProjectile(closestEnemy.mesh.position);
  
  // Reset cooldown
  this.lastShot = 0;
} 

// God Tower class - ultimate divine tower unlocked by killing God Zombie
function GodTower(scene, pos) {
  this.type = 'godtower';
  this.level = 0;
  this.range = 25; // Massive range
  this.fireRate = 0.1; // Ultra-fast firing
  this.damage = 1000; // Massive damage
  this.boost = 2.0; // 200% boost to all towers
  this.cooldownReduction = 0.5; // 50% cooldown reduction
  this.divineAura = true; // Divine aura effect
  this.investedCost = 100000; // $100,000 cost
  this.lastShot = 0;
  this.lastDivineBlessing = 0;
  this.divineBlessingCooldown = 10; // Blessing every 10 seconds

  // Create god tower mesh (divine structure)
  this.mesh = new THREE.Group();

  // Divine foundation (floating platform)
  const foundation = new THREE.Mesh(
    new THREE.CylinderGeometry(3, 3, 1, 24),
    new THREE.MeshPhongMaterial({ 
      color: 0xFFD700,
      emissive: 0xFFD700,
      emissiveIntensity: 0.3
    })
  );
  foundation.position.y = 0.5;

  // Divine core (central pillar)
  const core = new THREE.Mesh(
    new THREE.CylinderGeometry(1, 1, 8, 16),
    new THREE.MeshPhongMaterial({ 
      color: 0xFFFFFF,
      emissive: 0xFFFFFF,
      emissiveIntensity: 0.8
    })
  );
  core.position.y = 4;

  // Divine crystal (floating at top)
  const crystal = new THREE.Mesh(
    new THREE.OctahedronGeometry(2),
    new THREE.MeshPhongMaterial({ 
      color: 0x00FFFF,
      emissive: 0x00FFFF,
      emissiveIntensity: 1.0,
      transparent: true,
      opacity: 0.8
    })
  );
  crystal.position.y = 10;

  // Divine aura (massive sphere)
  const aura = new THREE.Mesh(
    new THREE.SphereGeometry(8, 32, 32),
    new THREE.MeshPhongMaterial({ 
      color: 0xFFD700,
      transparent: true,
      opacity: 0.2,
      emissive: 0xFFD700,
      emissiveIntensity: 0.4
    })
  );
  aura.position.y = 5;

  // Divine wings (4 wings)
  const wingGeometry = new THREE.PlaneGeometry(3, 1.5);
  for (let i = 0; i < 4; i++) {
    const wing = new THREE.Mesh(wingGeometry, new THREE.MeshPhongMaterial({ 
      color: 0xFFD700,
      emissive: 0xFFD700,
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.7
    }));
    wing.position.y = 6;
    wing.position.x = Math.cos(i * Math.PI / 2) * 4;
    wing.position.z = Math.sin(i * Math.PI / 2) * 4;
    wing.rotation.y = i * Math.PI / 2;
    this.mesh.add(wing);
  }

  // Divine orbs (floating around)
  for (let i = 0; i < 6; i++) {
    const orb = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 16, 16),
      new THREE.MeshPhongMaterial({ 
        color: 0xFFFFFF,
        emissive: 0xFFFFFF,
        emissiveIntensity: 1.0
      })
    );
    orb.position.y = 5 + Math.sin(i * Math.PI / 3) * 2;
    orb.position.x = Math.cos(i * Math.PI / 3) * 6;
    orb.position.z = Math.sin(i * Math.PI / 3) * 6;
    this.mesh.add(orb);
  }

  this.mesh.add(foundation);
  this.mesh.add(core);
  this.mesh.add(crystal);
  this.mesh.add(aura);

  this.mesh.position.set(pos.x, 1, pos.z);
  this.mesh.userData.tower = this;
  scene.add(this.mesh);

  // Animation variables
  this.pulseTime = 0;
  this.pulseSpeed = 1.5;
  this.rotationTime = 0;
  this.rotationSpeed = 0.5;
}

GodTower.prototype.update = function(dt, scene) {
  // Handle frozen state
  if (this.frozen) {
    this.frozenTime -= dt;
    if (this.frozenTime <= 0) {
      this.frozen = false;
      console.log(`🧊 God Tower unfrozen!`);
    } else {
      // Tower is frozen, don't attack
      return;
    }
  }
  
  this.lastShot += dt;
  this.lastDivineBlessing += dt;
  
  // Divine blessing effect
  if (this.lastDivineBlessing >= this.divineBlessingCooldown) {
    this.divineBlessing();
    this.lastDivineBlessing = 0;
  }
  
  if (this.lastShot >= this.fireRate) {
    // Find target (any enemy, massive range)
    let target = null;
    let minDist = Infinity;
    
    for (const enemy of enemies) {
      if (!enemy || !enemy.mesh || enemy.dead) continue;
      
      try {
        const dist = this.mesh.position.distanceTo(enemy.mesh.position);
        
        if (dist < this.range && dist < minDist) {
          minDist = dist;
          target = enemy;
        }
      } catch (error) {
        console.error("Error calculating distance to enemy:", error);
      }
    }
    
    if (target) {
      this.lastShot = 0;
      
      // Handle mutated tower special abilities
      if (this.mutated) {
        this.useMutationAbility(target, scene);
      } else {
        // Normal God Tower behavior
        // Deal massive damage to target
        target.takeDamage(this.damage);
        
        // Boost ALL towers massively
        for (const tower of towers) {
          if (tower !== this && tower.mesh) {
            const dist = this.mesh.position.distanceTo(tower.mesh.position);
            if (dist < this.range) {
              // Apply divine boost
              if (!tower._originalDamage) tower._originalDamage = tower.damage;
              if (!tower._originalFireRate) tower._originalFireRate = tower.fireRate;
              
              tower.damage = tower._originalDamage * (1 + this.boost);
              tower.fireRate = tower._originalFireRate * (1 - this.cooldownReduction);
              
              // Visual boost effect
              tower.mesh.scale.set(1.3, 1.3, 1.3);
              setTimeout(() => tower.mesh.scale.set(1, 1, 1), 400);
            }
          }
        }
      }
      
      // Visual effect
      this.mesh.scale.set(1.1, 1.1, 1.1);
      setTimeout(() => this.mesh.scale.set(1, 1, 1), 200);
    }
  }
  
  // Animate divine effects
  this.pulseTime += dt;
  this.rotationTime += dt;
  
  // Pulse aura and crystal
  const pulse = Math.sin(this.pulseTime * this.pulseSpeed) * 0.3 + 1;
  this.mesh.children.forEach(child => {
    if (child.material && child.material.emissive) {
      child.material.emissiveIntensity = 0.6 * pulse;
    }
  });
  
  // Rotate crystal
  this.mesh.children.forEach(child => {
    if (child.geometry && child.geometry.type === 'OctahedronGeometry') {
      child.rotation.y += this.rotationSpeed * dt;
    }
  });
  
  // Float orbs
  this.mesh.children.forEach((child, index) => {
    if (child.geometry && child.geometry.type === 'SphereGeometry' && child.geometry.parameters.radius === 0.5) {
      const floatOffset = Math.sin(this.pulseTime * 2 + index) * 0.5;
      child.position.y = 5 + Math.sin(index * Math.PI / 3) * 2 + floatOffset;
    }
  });
};

GodTower.prototype.divineBlessing = function() {
  // Divine blessing: heal all towers and give them temporary invincibility
  for (const tower of towers) {
    if (tower !== this && tower.mesh) {
      const dist = this.mesh.position.distanceTo(tower.mesh.position);
      if (dist < this.range) {
        // Heal tower (if it has health)
        if (tower.health && tower.maxHealth) {
          tower.health = Math.min(tower.maxHealth, tower.health + 100);
        }
        
        // Give temporary invincibility
        tower.divineProtection = true;
        setTimeout(() => {
          tower.divineProtection = false;
        }, 5000); // 5 seconds of protection
        
        // Visual blessing effect
        tower.mesh.scale.set(1.5, 1.5, 1.5);
        setTimeout(() => tower.mesh.scale.set(1, 1, 1), 500);
        
        console.log(`✨ God Tower blessed ${tower.type} tower!`);
      }
    }
  }
  
  // Create divine blessing effect
  this.createDivineBlessingEffect();
};

GodTower.prototype.createDivineBlessingEffect = function() {
  // Create divine light rays
  for (let i = 0; i < 12; i++) {
    const ray = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, 15, 6),
      new THREE.MeshBasicMaterial({ 
        color: 0xFFFFFF,
        emissive: 0xFFFFFF,
        emissiveIntensity: 1.0
      })
    );
    
    ray.position.copy(this.mesh.position);
    ray.position.y += 7.5;
    ray.rotation.y = (i * Math.PI / 6);
    ray.rotation.x = Math.PI / 2;
    
    window.scene.add(ray);
    
    // Remove after short time
    setTimeout(() => {
      if (window.scene && ray.parent) {
        window.scene.remove(ray);
      }
    }, 1000);
  }
};

GodTower.prototype.upgrade = function() { return false; };
GodTower.prototype.getSellValue = function() { return 0; };

GodTower.prototype.mutate = function() {
  console.log(`🧬 God Tower has MUTATED!`);
  
  // Store original stats
  this.originalStats = {
    damage: this.damage,
    fireRate: this.fireRate,
    range: this.range
  };
  
  // Apply divine mutation boosts
  this.damage *= 20; // 20x damage
  this.fireRate *= 0.02; // 50x faster firing
  this.range *= 10; // 10x range
  
  // Add special abilities
  this.mutated = true;
  this.mutationType = 'divine';
  
  // Update visual appearance
  this.updateMutatedAppearance();
  
  console.log(`🧬 Divine Mutation: ${this.mutationType} - Damage: ${this.damage}, Fire Rate: ${this.fireRate}, Range: ${this.range}`);
};

GodTower.prototype.updateMutatedAppearance = function() {
  // Make the tower glow even more intensely
  this.mesh.children.forEach(child => {
    if (child.material && child.material.emissive) {
      child.material.emissiveIntensity = 2.0;
    }
  });
};

// Builder Tower - Automatically switches to random tower types every 10 waves
function BuilderTower(scene, pos) {
  this.type = 'builder';
  this.level = 0;
  this.investedCost = 1500;
  this.lastShot = 0;
  this.lastTransform = 0;
  this.transformInterval = 10; // Transform every 10 waves
  this.currentForm = 'builder';
  this.availableForms = ['minigun', 'rpg', 'sniper', 'flamethrower', 'tesla', 'medic', 'engineer', 'laser', 'poison', 'freeze', 'bomb', 'rocket', 'plasma', 'wind', 'gold'];
  
  // Create builder tower mesh (construction-themed)
  this.mesh = new THREE.Group();
  
  // Base platform (construction site)
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(1.5, 1.5, 0.5, 16),
    new THREE.MeshPhongMaterial({ 
      color: 0x8B4513,
      emissive: 0x8B4513,
      emissiveIntensity: 0.2
    })
  );
  base.position.y = 0.25;
  
  // Construction crane arm
  const craneArm = new THREE.Mesh(
    new THREE.BoxGeometry(3, 0.3, 0.3),
    new THREE.MeshPhongMaterial({ color: 0x696969 })
  );
  craneArm.position.y = 2;
  craneArm.position.x = 1.5;
  
  // Crane tower
  const craneTower = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 4, 0.5),
    new THREE.MeshPhongMaterial({ color: 0x696969 })
  );
  craneTower.position.y = 2;
  
  // Construction materials (scattered around)
  const materials = [
    { geom: new THREE.BoxGeometry(0.5, 0.5, 0.5), pos: [-1, 0.25, -1], color: 0xCD853F },
    { geom: new THREE.BoxGeometry(0.3, 0.8, 0.3), pos: [1, 0.4, -0.5], color: 0x8B4513 },
    { geom: new THREE.SphereGeometry(0.3, 8, 8), pos: [-0.5, 0.3, 1], color: 0x708090 }
  ];
  
  materials.forEach(mat => {
    const material = new THREE.Mesh(mat.geom, new THREE.MeshPhongMaterial({ color: mat.color }));
    material.position.set(...mat.pos);
    this.mesh.add(material);
  });
  
  // Transform indicator (rotating gear)
  this.transformIndicator = new THREE.Mesh(
    new THREE.CylinderGeometry(0.8, 0.8, 0.2, 12),
    new THREE.MeshPhongMaterial({ 
      color: 0xFFD700,
      emissive: 0xFFD700,
      emissiveIntensity: 0.5
    })
  );
  this.transformIndicator.position.y = 3.5;
  this.transformIndicator.rotation.x = Math.PI / 2;
  
  this.mesh.add(base);
  this.mesh.add(craneTower);
  this.mesh.add(craneArm);
  this.mesh.add(this.transformIndicator);
  
  this.mesh.position.set(pos.x, 0, pos.z);
  this.mesh.userData.tower = this;
  scene.add(this.mesh);
  
  // Initialize stats
  this.updateStats();
  
  // Animation variables
  this.rotationTime = 0;
  this.transformTime = 0;
}

BuilderTower.prototype.updateStats = function() {
  const stats = TOWER_TYPES[this.currentForm] ? TOWER_TYPES[this.currentForm].levels[this.level] : TOWER_TYPES.builder.levels[this.level];
  for (const key in stats) {
    this[key] = stats[key];
  }
};

BuilderTower.prototype.transform = function() {
  if (!window.wave) return;
  
  // Check if it's time to transform (every 10 waves)
  const waveNumber = window.wave;
  if (waveNumber > 0 && waveNumber % this.transformInterval === 0) {
    // Transform to a random tower type
    const newForm = this.availableForms[Math.floor(Math.random() * this.availableForms.length)];
    
    if (newForm !== this.currentForm) {
      console.log(`🏗️ Builder Tower transforming from ${this.currentForm} to ${newForm} at wave ${waveNumber}!`);
      
      this.currentForm = newForm;
      this.updateStats();
      this.updateAppearance();
      
      // Visual transformation effect
      this.mesh.scale.set(1.5, 1.5, 1.5);
      setTimeout(() => this.mesh.scale.set(1, 1, 1), 500);
    }
  }
};

BuilderTower.prototype.updateAppearance = function() {
  // Update the tower's appearance based on current form
  const color = this.getTowerColor(this.currentForm);
  
  // Update base color
  this.mesh.children.forEach(child => {
    if (child.material && child.material.color && child !== this.transformIndicator) {
      child.material.color.setHex(color);
    }
  });
  
  // Add form indicator
  if (this.formIndicator) {
    this.mesh.remove(this.formIndicator);
  }
  
  this.formIndicator = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 8, 8),
    new THREE.MeshPhongMaterial({ 
      color: color,
      emissive: color,
      emissiveIntensity: 0.8
    })
  );
  this.formIndicator.position.y = 4;
  this.mesh.add(this.formIndicator);
};

BuilderTower.prototype.getTowerColor = function(towerType) {
  const colors = {
    minigun: 0x00ff00,
    rpg: 0xff0000,
    sniper: 0x0000ff,
    flamethrower: 0xff6600,
    tesla: 0xffff00,
    medic: 0x00ffff,
    engineer: 0x808080,
    laser: 0xff00ff,
    poison: 0x00ff00,
    freeze: 0x00ffff,
    bomb: 0x8b4513,
    rocket: 0xff4500,
    plasma: 0x9932cc,
    wind: 0x87ceeb,
    gold: 0xffd700,
    builder: 0x8b4513
  };
  return colors[towerType] || 0x8b4513;
};

BuilderTower.prototype.update = function(dt, scene) {
  // Handle frozen state
  if (this.frozen) {
    this.frozenTime -= dt;
    if (this.frozenTime <= 0) {
      this.frozen = false;
      console.log(`🧊 Builder Tower unfrozen!`);
    } else {
      return;
    }
  }
  
  // Check for transformation
  this.transform();
  
  // Animate transform indicator
  this.transformTime += dt;
  this.transformIndicator.rotation.z += dt * 2;
  
  // Pulse effect when close to transformation
  if (window.wave && window.wave % this.transformInterval === this.transformInterval - 1) {
    const pulse = Math.sin(this.transformTime * 5) * 0.3 + 1;
    this.transformIndicator.scale.set(pulse, pulse, pulse);
  }
  
  // Normal tower behavior based on current form
  this.lastShot += dt;
  if (this.lastShot >= this.fireRate) {
    // Find target
    let target = null;
    let minDist = Infinity;
    for (const enemy of enemies) {
      const dist = this.mesh.position.distanceTo(enemy.mesh.position);
      if (dist < this.range && dist < minDist) {
        minDist = dist;
        target = enemy;
      }
    }
    
    if (target) {
      this.lastShot = 0;
      
      // Handle different tower types
      if (this.splash) {
        // Splash damage
        for (const enemy of enemies) {
          const dist = this.mesh.position.distanceTo(enemy.mesh.position);
          if (dist < this.splashRadius) {
            enemy.takeDamage(this.damage);
          }
        }
      } else if (this.chain) {
        // Chain lightning
        let chainTargets = [target];
        let remainingChains = this.chainCount;
        
        for (const enemy of enemies) {
          if (remainingChains <= 0) break;
          if (enemy === target) continue;
          
          const dist = this.mesh.position.distanceTo(enemy.mesh.position);
          if (dist < this.range) {
            chainTargets.push(enemy);
            remainingChains--;
          }
        }
        
        chainTargets.forEach(enemy => enemy.takeDamage(this.damage));
        this.createLightningArc(this.mesh.position, target.mesh.position, scene);
      } else if (this.poison) {
        // Poison damage
        target.takeDamage(this.damage);
        if (!target.poisoned) {
          target.poisoned = true;
          target.poisonDamage = this.damage * 0.3;
          target.poisonTicks = Math.floor(this.poisonDuration);
          target.poisonTimer = 0;
        }
      } else if (this.slow) {
        // Slow effect
        target.takeDamage(this.damage);
        if (!target.slowed) {
          target.slowed = true;
          target.originalSpeed = target.speed;
          target.speed *= (1 - this.slowAmount);
          setTimeout(() => {
            if (target && !target.dead) {
              target.speed = target.originalSpeed;
              target.slowed = false;
            }
          }, this.slowDuration * 1000);
        }
      } else if (this.knockback) {
        // Knockback
        target.takeDamage(this.damage);
        if (!target.knockback) target.knockback = 0;
        target.knockback += TOWER_TYPES.wind.levels[this.level].knockbackAmount;
      } else if (this.type === 'gold') {
        // Gold: deal damage and give money per hit
        target.takeDamage(this.damage);
        window.money += TOWER_TYPES.gold.levels[this.level].goldPerHit;
        window.updateUI && window.updateUI();
      } else {
        // Normal damage
        target.takeDamage(this.damage);
      }
      
      // Visual effect
      this.mesh.scale.set(1.1, 1.1, 1.1);
      setTimeout(() => this.mesh.scale.set(1, 1, 1), 100);
    }
  }
};

BuilderTower.prototype.upgrade = function() {
  const nextLevel = this.level + 1;
  if (nextLevel < TOWER_TYPES[this.currentForm].levels.length) {
    const upgradeCost = TOWER_TYPES[this.currentForm].levels[nextLevel].cost;
    if (window.money >= upgradeCost) {
      window.money -= upgradeCost;
      this.level = nextLevel;
      this.investedCost += upgradeCost;
      this.updateStats();
      this.updateAppearance();
      
      // Visual feedback for upgrade
      this.mesh.scale.set(1.2, 1.2, 1.2);
      setTimeout(() => this.mesh.scale.set(1, 1, 1), 200);
      return true;
    }
  }
  return false;
};

BuilderTower.prototype.getSellValue = function() {
  return Math.floor(this.investedCost * 0.7);
};

BuilderTower.prototype.createLightningArc = function(startPos, endPos, scene) {
  const arc = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.1, 6, 6),
    new THREE.MeshBasicMaterial({ 
      color: 0xFFFF00,
      emissive: 0xFFFF00,
      emissiveIntensity: 1.0
    })
  );
  
  arc.position.copy(startPos);
  arc.position.y += 1;
  arc.lookAt(endPos);
  scene.add(arc);
  
  setTimeout(() => scene.remove(arc), 200);
};

// Banker Tower - Generates money every wave
function BankerTower(scene, pos) {
  this.type = 'banker';
  this.level = 0;
  this.investedCost = 2000;
  this.lastWave = 0;
  this.moneyPerWave = 100;
  
  // Create banker tower mesh (bank-themed)
  this.mesh = new THREE.Group();
  
  // Bank building base
  const base = new THREE.Mesh(
    new THREE.BoxGeometry(2, 1, 2),
    new THREE.MeshPhongMaterial({ 
      color: 0x8B4513,
      emissive: 0x8B4513,
      emissiveIntensity: 0.1
    })
  );
  base.position.y = 0.5;
  
  // Bank columns
  for (let i = 0; i < 4; i++) {
    const column = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.2, 2, 8),
      new THREE.MeshPhongMaterial({ color: 0xDAA520 })
    );
    column.position.set(
      (i % 2 === 0 ? -0.6 : 0.6),
      1.5,
      (i < 2 ? -0.6 : 0.6)
    );
    this.mesh.add(column);
  }
  
  // Bank roof
  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(1.5, 1, 4),
    new THREE.MeshPhongMaterial({ color: 0x8B4513 })
  );
  roof.position.y = 2.5;
  
  // Money vault (central structure)
  const vault = new THREE.Mesh(
    new THREE.CylinderGeometry(0.8, 0.8, 1.5, 12),
    new THREE.MeshPhongMaterial({ 
      color: 0xFFD700,
      emissive: 0xFFD700,
      emissiveIntensity: 0.3
    })
  );
  vault.position.y = 1.75;
  
  // Dollar sign indicator
  this.dollarSign = new THREE.Mesh(
    new THREE.PlaneGeometry(0.8, 0.8),
    new THREE.MeshPhongMaterial({ 
      color: 0x00FF00,
      emissive: 0x00FF00,
      emissiveIntensity: 0.8,
      side: THREE.DoubleSide
    })
  );
  this.dollarSign.position.y = 3.5;
  this.dollarSign.rotation.x = -Math.PI / 2;
  
  // Money particles (floating coins)
  this.moneyParticles = [];
  for (let i = 0; i < 6; i++) {
    const coin = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.1, 0.05, 8),
      new THREE.MeshPhongMaterial({ 
        color: 0xFFD700,
        emissive: 0xFFD700,
        emissiveIntensity: 0.5
      })
    );
    coin.position.set(
      (Math.random() - 0.5) * 2,
      2 + Math.random() * 2,
      (Math.random() - 0.5) * 2
    );
    coin.rotation.x = Math.PI / 2;
    coin.userData.originalY = coin.position.y;
    coin.userData.floatTime = Math.random() * Math.PI * 2;
    this.moneyParticles.push(coin);
    this.mesh.add(coin);
  }
  
  this.mesh.add(base);
  this.mesh.add(roof);
  this.mesh.add(vault);
  this.mesh.add(this.dollarSign);
  
  this.mesh.position.set(pos.x, 0, pos.z);
  this.mesh.userData.tower = this;
  scene.add(this.mesh);
  
  // Initialize stats
  this.updateStats();
  
  // Animation variables
  this.rotationTime = 0;
  this.pulseTime = 0;
}

BankerTower.prototype.updateStats = function() {
  const stats = TOWER_TYPES.banker.levels[this.level];
  for (const key in stats) {
    this[key] = stats[key];
  }
};

BankerTower.prototype.generateMoney = function() {
  if (!window.wave || window.wave === this.lastWave) return;
  
  this.lastWave = window.wave;
  const moneyGenerated = this.moneyPerWave;
  
  // Add money to player
  window.money += moneyGenerated;
  
  // Update UI
  if (window.updateUI) {
    window.updateUI();
  }
  
  // Visual money generation effect
  this.createMoneyEffect(moneyGenerated);
  
  console.log(`💰 Banker Tower generated $${moneyGenerated} for wave ${window.wave}!`);
};

BankerTower.prototype.createMoneyEffect = function(amount) {
  // Create floating money text
  const moneyText = document.createElement('div');
  moneyText.style.position = 'absolute';
  moneyText.style.color = '#00FF00';
  moneyText.style.fontSize = '20px';
  moneyText.style.fontWeight = 'bold';
  moneyText.style.textShadow = '2px 2px 4px rgba(0,0,0,0.8)';
  moneyText.style.pointerEvents = 'none';
  moneyText.style.zIndex = '1000';
  moneyText.textContent = `+$${amount}`;
  
  // Position at tower location
  const towerScreenPos = this.getScreenPosition();
  moneyText.style.left = towerScreenPos.x + 'px';
  moneyText.style.top = towerScreenPos.y + 'px';
  
  document.body.appendChild(moneyText);
  
  // Animate floating up and fading out
  let opacity = 1;
  let yOffset = 0;
  const animate = () => {
    opacity -= 0.02;
    yOffset -= 2;
    moneyText.style.opacity = opacity;
    moneyText.style.top = (towerScreenPos.y + yOffset) + 'px';
    
    if (opacity > 0) {
      requestAnimationFrame(animate);
    } else {
      document.body.removeChild(moneyText);
    }
  };
  animate();
  
  // Visual tower effect
  this.mesh.scale.set(1.2, 1.2, 1.2);
  setTimeout(() => this.mesh.scale.set(1, 1, 1), 300);
  
  // Pulse dollar sign
  this.dollarSign.scale.set(1.5, 1.5, 1.5);
  setTimeout(() => this.dollarSign.scale.set(1, 1, 1), 200);
};

BankerTower.prototype.getScreenPosition = function() {
  // Convert 3D position to screen position
  const vector = new THREE.Vector3();
  vector.setFromMatrixPosition(this.mesh.matrixWorld);
  vector.project(window.camera);
  
  return {
    x: (vector.x * 0.5 + 0.5) * window.innerWidth,
    y: (-(vector.y * 0.5) + 0.5) * window.innerHeight
  };
};

BankerTower.prototype.update = function(dt, scene) {
  // Generate money at the start of each wave
  this.generateMoney();
  
  // Animate money particles
  this.pulseTime += dt;
  this.rotationTime += dt;
  
  // Rotate dollar sign
  this.dollarSign.rotation.y += dt * 2;
  
  // Animate money particles (floating coins)
  this.moneyParticles.forEach((coin, index) => {
    coin.userData.floatTime += dt * (1 + index * 0.2);
    const floatOffset = Math.sin(coin.userData.floatTime) * 0.3;
    coin.position.y = coin.userData.originalY + floatOffset;
    coin.rotation.y += dt * (1 + index * 0.1);
  });
  
  // Pulse effect
  const pulse = Math.sin(this.pulseTime * 2) * 0.1 + 1;
  this.dollarSign.material.emissiveIntensity = 0.8 * pulse;
};

BankerTower.prototype.upgrade = function() {
  const nextLevel = this.level + 1;
  if (nextLevel < TOWER_TYPES.banker.levels.length) {
    const upgradeCost = TOWER_TYPES.banker.levels[nextLevel].cost;
    if (window.money >= upgradeCost) {
      window.money -= upgradeCost;
      this.level = nextLevel;
      this.investedCost += upgradeCost;
      this.updateStats();
      
      // Visual feedback for upgrade
      this.mesh.scale.set(1.2, 1.2, 1.2);
      setTimeout(() => this.mesh.scale.set(1, 1, 1), 200);
      
      console.log(`💰 Banker Tower upgraded to level ${this.level + 1}! Now generates $${this.moneyPerWave} per wave.`);
      return true;
    }
  }
  return false;
};

BankerTower.prototype.getSellValue = function() {
  return Math.floor(this.investedCost * 0.7);
};

// Demolishinist Tower
function DemolishinistTower(scene, pos) {
  this.type = 'demolishinist';
  this.level = 0;
  this.investedCost = 600;
  this.lastShot = 0;
  this.lastMine = 0;
  this.mineInterval = 3.0; // seconds between mines
  this.mesh = new THREE.Group();
  this.updateStats();

  // Visual: barrel and crate
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.7, 0.7, 1.2, 10),
    new THREE.MeshPhongMaterial({ color: 0x444444 })
  );
  base.position.y = 0.6;
  const crate = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({ color: 0x8B4513 })
  );
  crate.position.y = 1.2;
  this.mesh.add(base);
  this.mesh.add(crate);
  this.mesh.position.set(pos.x, 1, pos.z);
  this.mesh.userData.tower = this;
  scene.add(this.mesh);
}

DemolishinistTower.prototype.updateStats = function() {
  const stats = window.TOWER_TYPES.demolishinist.levels[this.level];
  for (const key in stats) this[key] = stats[key];
};

DemolishinistTower.prototype.upgrade = function() {
  if (this.level < window.TOWER_TYPES.demolishinist.levels.length - 1) {
    const nextCost = window.TOWER_TYPES.demolishinist.levels[this.level + 1].cost;
    if (window.money >= nextCost) {
      window.money -= nextCost;
      this.level++;
      this.investedCost += nextCost;
      this.updateStats();
      this.mesh.scale.set(1.2, 1.2, 1.2);
      setTimeout(() => this.mesh.scale.set(1, 1, 1), 200);
      return true;
    }
  }
  return false;
};

DemolishinistTower.prototype.getSellValue = function() {
  return Math.floor(this.investedCost * 0.7);
};

DemolishinistTower.prototype.update = function(dt, scene) {
  this.lastShot += dt;
  this.lastMine += dt;
  // Throw grenade/bomb/missile at nearest enemy
  if (this.lastShot >= this.fireRate) {
    let target = null;
    let minDist = Infinity;
    for (const enemy of enemies) {
      if (!enemy || enemy.dead || !enemy.mesh) continue;
      const dist = this.mesh.position.distanceTo(enemy.mesh.position);
      if (dist < this.range && dist < minDist) {
        minDist = dist;
        target = enemy;
      }
    }
    if (target) {
      this.lastShot = 0;
      this.throwProjectile(target, scene);
    }
  }
  // Spawn mine/bomb/nuke on path
  if (this.lastMine >= this.mineInterval) {
    this.lastMine = 0;
    this.spawnMine(scene);
  }
};

DemolishinistTower.prototype.throwProjectile = function(target, scene) {
  const type = this.grenadeType;
  const start = this.mesh.position.clone();
  const end = target.mesh.position.clone();
  let mesh, color;
  if (type === 'grenade') {
    mesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 8, 8),
      new THREE.MeshPhongMaterial({ color: 0x228B22 })
    );
    color = 0x228B22;
  } else if (type === 'bomb') {
    mesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.4, 10, 10),
      new THREE.MeshPhongMaterial({ color: 0x222222 })
    );
    color = 0x222222;
  } else if (type === 'missile') {
    mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.15, 1.2, 8),
      new THREE.MeshPhongMaterial({ color: 0xFF0000 })
    );
    color = 0xFF0000;
  } else {
    mesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 8, 8),
      new THREE.MeshPhongMaterial({ color: 0x888888 })
    );
    color = 0x888888;
  }
  mesh.position.copy(start);
  scene.add(mesh);
  // Animate projectile
  const duration = 0.5;
  let t = 0;
  const animateProjectile = () => {
    t += 0.03;
    mesh.position.lerpVectors(start, end, t / duration);
    mesh.position.y = 1 + Math.sin(Math.PI * (t / duration)) * 3;
    if (t < duration) {
      requestAnimationFrame(animateProjectile);
    } else {
      scene.remove(mesh);
      // Explosion effect
      const explosion = new THREE.Mesh(
        new THREE.SphereGeometry(0.7, 8, 8),
        new THREE.MeshBasicMaterial({ color })
      );
      explosion.position.copy(end);
      scene.add(explosion);
      setTimeout(() => scene.remove(explosion), 300);
      // Damage enemy
      if (target && target.takeDamage) target.takeDamage(this.damage);
      if (type === 'missile') {
        // Ballistic missile: area damage
        for (const enemy of enemies) {
          if (enemy && !enemy.dead && enemy.mesh && enemy.mesh.position.distanceTo(end) < 3) {
            enemy.takeDamage(this.damage * 0.5);
          }
        }
      }
    }
  };
  animateProjectile();
};

DemolishinistTower.prototype.spawnMine = function(scene) {
  const type = this.mineType;
  // Pick a random point on the path
  const path = window.PATH_POINTS;
  const idx = Math.floor(Math.random() * path.length);
  const pos = { x: path[idx].x, z: path[idx].z };
  let mesh, color, radius, damage;
  if (type === 'landmine') {
    mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.3, 0.1, 8),
      new THREE.MeshPhongMaterial({ color: 0x555555 })
    );
    color = 0x555555;
    radius = 2;
    damage = this.damage;
  } else if (type === 'bomb') {
    mesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 10, 10),
      new THREE.MeshPhongMaterial({ color: 0x222222 })
    );
    color = 0x222222;
    radius = 3;
    damage = this.damage * 1.5;
  } else if (type === 'nuke') {
    mesh = new THREE.Mesh(
      new THREE.SphereGeometry(1, 16, 16),
      new THREE.MeshPhongMaterial({ color: 0xFFD700 })
    );
    color = 0xFFD700;
    radius = 6;
    damage = this.damage * 3;
  } else {
    mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.3, 0.1, 8),
      new THREE.MeshPhongMaterial({ color: 0x888888 })
    );
    color = 0x888888;
    radius = 2;
    damage = this.damage;
  }
  mesh.position.set(pos.x, 0.1, pos.z);
  scene.add(mesh);
  // Land mine logic: check for enemies every frame
  let active = true;
  const checkMine = () => {
    if (!active) return;
    for (const enemy of enemies) {
      if (enemy && !enemy.dead && enemy.mesh && mesh.position.distanceTo(enemy.mesh.position) < radius) {
        // Explosion effect
        const explosion = new THREE.Mesh(
          new THREE.SphereGeometry(radius, 8, 8),
          new THREE.MeshBasicMaterial({ color })
        );
        explosion.position.copy(mesh.position);
        scene.add(explosion);
        setTimeout(() => scene.remove(explosion), 400);
        // Damage all enemies in radius
        for (const e2 of enemies) {
          if (e2 && !e2.dead && e2.mesh && mesh.position.distanceTo(e2.mesh.position) < radius) {
            e2.takeDamage(damage);
          }
        }
        scene.remove(mesh);
        active = false;
        return;
      }
    }
    if (active) requestAnimationFrame(checkMine);
  };
  checkMine();
};