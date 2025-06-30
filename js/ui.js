window.initUI = function(scene) {
  createUI();
  window.updateUI();
  window.hideTowerInfoPanel(); // Ensure it's hidden on init
}

window.updateTowerSelectionUI = function() {
  // Update regular tower buttons
  const towerTypes = Object.keys(window.TOWER_TYPES);
  towerTypes.forEach(type => {
    if (type === 'general' || type === 'duckgod') return; // Handled separately
    
    let button = document.getElementById(`${type}-button`);
    
    // If button doesn't exist and tower is available, create it
    if (!button && window.availableTowers.includes(type)) {
      const towerButtonContainer = document.querySelector('div[style*="flex-direction: column"]');
      if (towerButtonContainer) {
        button = document.createElement('button');
        button.id = `${type}-button`;
        const towerCost = window.TOWER_TYPES[type].levels[0].cost;
        button.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} ($${towerCost})`;
        button.style.margin = '0';
        button.style.padding = '8px 12px';
        button.style.backgroundColor = '#4CAF50'; // Green for unlocked towers
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.borderRadius = '4px';
        button.style.cursor = 'pointer';
        button.style.width = '140px'; // Increased width to accommodate cost
        button.onclick = () => selectTower(type);
        towerButtonContainer.appendChild(button);
      }
    }
    
    // Show/hide button based on availability
    if (button) {
      if (window.availableTowers.includes(type)) {
        button.style.display = 'block';
        button.style.backgroundColor = '#4CAF50'; // Green for unlocked
      } else {
        button.style.display = 'none';
      }
    }
  });
  
  // Show/hide General tower button based on availability
  const generalButton = document.getElementById('general-button');
  if (generalButton) {
    if (window.availableTowers && window.availableTowers.includes('general')) {
      generalButton.style.display = 'block';
      generalButton.style.backgroundColor = '#FFD700'; // Gold for General
    } else {
      generalButton.style.display = 'none';
    }
  }
  
  // Show/hide Duck God button based on availability
  const duckGodButton = document.getElementById('duckgod-button');
  if (duckGodButton) {
    if (window.availableTowers && window.availableTowers.includes('duckgod')) {
      duckGodButton.style.display = 'block';
      duckGodButton.style.backgroundColor = '#FFD700'; // Gold for Duck God
    } else {
      duckGodButton.style.display = 'none';
    }
  }
  
  // Show/hide God Tower button based on availability
  const godTowerButton = document.getElementById('godtower-button');
  if (godTowerButton) {
    if (window.availableTowers && window.availableTowers.includes('godtower')) {
      godTowerButton.style.display = 'block';
      godTowerButton.style.backgroundColor = '#FFD700'; // Gold for God Tower
    } else {
      godTowerButton.style.display = 'none';
    }
  }
  
  // Show/hide Builder Tower button based on availability
  const builderButton = document.getElementById('builder-button');
  if (builderButton) {
    if (window.availableTowers && window.availableTowers.includes('builder')) {
      builderButton.style.display = 'block';
      builderButton.style.backgroundColor = '#8B4513';
    } else {
      builderButton.style.display = 'none';
    }
  }
}

window.showTowerInfoPanel = function(tower) {
  console.log("Showing tower info panel for:", tower.type, "level:", tower.level);
  
  let panel = document.getElementById('tower-info-panel');
  if (!panel) {
    panel = document.createElement('div');
    panel.id = 'tower-info-panel';
    panel.style.position = 'absolute';
    panel.style.padding = '7px';
    panel.style.background = 'rgba(0,0,0,0.92)';
    panel.style.border = '2px solid #fff';
    panel.style.color = '#fff';
    panel.style.fontFamily = 'Arial, sans-serif';
    panel.style.borderRadius = '6px';
    panel.style.minWidth = '140px';
    panel.style.maxWidth = '180px';
    panel.style.zIndex = '1001';
    panel.style.fontSize = '12px';
    document.body.appendChild(panel);
  }

  const currentLevel = tower.level || 0;
  
  // Handle different tower types for stats
  let currentStats = null;
  let nextLevelStats = null;
  
  if (tower.type === 'builder') {
    // Builder tower uses currentForm for stats
    const formType = tower.currentForm || 'builder';
    currentStats = window.TOWER_TYPES[formType] ? window.TOWER_TYPES[formType].levels[currentLevel] : window.TOWER_TYPES.builder.levels[currentLevel];
    nextLevelStats = window.TOWER_TYPES[formType] ? window.TOWER_TYPES[formType].levels[currentLevel + 1] : null;
  } else if (tower.type === 'general') {
    // General tower has fixed stats
    currentStats = { name: 'General Tower', damage: tower.damage || 50, range: tower.range || 10, fireRate: tower.fireRate || 1.0, boost: 5.0, cooldownReduction: 0.5 };
    nextLevelStats = null; // General towers can't be upgraded
  } else if (tower.type === 'duckgod') {
    // Duck God has fixed stats
    currentStats = { name: '🦆 Duck God', damage: tower.damage || 100, range: tower.range || 15, fireRate: tower.fireRate || 0.5, boost: 1.5 };
    nextLevelStats = null; // Duck God can't be upgraded
  } else if (tower.type === 'godtower') {
    // God Tower has fixed stats
    currentStats = { name: '✨ God Tower', damage: tower.damage || 200, range: tower.range || 20, fireRate: tower.fireRate || 0.3, boost: 2.0, cooldownReduction: 0.8 };
    nextLevelStats = null; // God Tower can't be upgraded
  } else {
    // Regular towers
    currentStats = window.TOWER_TYPES[tower.type] ? window.TOWER_TYPES[tower.type].levels[currentLevel] : null;
    nextLevelStats = window.TOWER_TYPES[tower.type] ? window.TOWER_TYPES[tower.type].levels[currentLevel + 1] : null;
  }
  
  console.log("Current stats:", currentStats);
  console.log("Next level stats:", nextLevelStats);
  console.log("Tower type:", tower.type, "Level:", currentLevel);
  
  // Calculate DPS properly
  let dps = 0;
  if (currentStats && currentStats.damage > 0 && currentStats.fireRate > 0) {
    dps = (currentStats.damage / currentStats.fireRate).toFixed(1);
  }

  let content = `<h4 style="margin: 0 0 7px 0; color: #FFD700; font-size: 15px;">${currentStats ? currentStats.name : tower.type}</h4>`;
  content += `<p style="margin: 3px 0;"><strong>Level:</strong> ${currentLevel + 1}</p>`;
  
  if (currentStats) {
    content += `<p style="margin: 5px 0;"><strong>DPS:</strong> ${dps}</p>`;
    content += `<p style="margin: 5px 0;"><strong>Damage:</strong> ${currentStats.damage}</p>`;
    content += `<p style="margin: 5px 0;"><strong>Range:</strong> ${currentStats.range}</p>`;
    content += `<p style="margin: 5px 0;"><strong>Fire Rate:</strong> ${currentStats.fireRate.toFixed(2)}s</p>`;
    
    // Add special abilities info
    if (currentStats.splash) {
      content += `<p style="margin: 5px 0; color: #FF6B6B;">💥 Splash Damage (${currentStats.splashRadius}m radius)</p>`;
    }
    if (currentStats.chain) {
      content += `<p style="margin: 5px 0; color: #4ECDC4;">⚡ Chain Lightning (${currentStats.chainCount} targets)</p>`;
    }
    if (currentStats.boost) {
      content += `<p style="margin: 5px 0; color: #45B7D1;">💊 Damage Boost (${(currentStats.boost * 100).toFixed(0)}%)</p>`;
    }
    if (currentStats.spawnChance) {
      content += `<p style="margin: 5px 0; color: #96CEB4;">🔧 Spawn Tank (${(currentStats.spawnChance * 100).toFixed(1)}%)</p>`;
    }
    if (currentStats.poison) {
      content += `<p style="margin: 5px 0; color: #9B59B6;">☠️ Poison (${currentStats.poisonDuration}s)</p>`;
    }
    if (currentStats.slow) {
      content += `<p style="margin: 5px 0; color: #3498DB;">❄️ Slow (${(currentStats.slowAmount * 100).toFixed(0)}% for ${currentStats.slowDuration}s)</p>`;
    }
    if (currentStats.knockback) {
      content += `<p style="margin: 5px 0; color: #E67E22;">💨 Knockback (${currentStats.knockbackAmount}m)</p>`;
    }
    if (currentStats.gold) {
      content += `<p style="margin: 5px 0; color: #F1C40F;">💰 Gold per hit: $${currentStats.goldPerHit}</p>`;
    }
    
    // Special tower info
    if (tower.type === 'builder' && tower.currentForm) {
      content += `<p style="margin: 5px 0; color: #FFD700;">🏗️ Current Form: ${tower.currentForm}</p>`;
      content += `<p style="margin: 5px 0; color: #FFD700;">🔄 Transforms every 10 waves</p>`;
    }
  }

  // Show upgrade information
  if (nextLevelStats) {
    const nextDps = (nextLevelStats.damage / nextLevelStats.fireRate).toFixed(1);
    const dpsIncrease = (nextDps - dps).toFixed(1);
    const canAfford = window.money >= nextLevelStats.cost;
    
    content += `<hr style="margin: 15px 0; border: 1px solid #555;">`;
    content += `<h4 style="margin: 10px 0; color: #4CAF50;">⬆️ Upgrade to Level ${currentLevel + 2}</h4>`;
    content += `<p style="margin: 5px 0;"><strong>Cost:</strong> $${nextLevelStats.cost}</p>`;
    content += `<p style="margin: 5px 0;"><strong>DPS:</strong> ${dps} → ${nextDps} <span style="color: #4CAF50;">(+${dpsIncrease})</span></p>`;
    content += `<p style="margin: 5px 0;"><strong>Damage:</strong> ${currentStats.damage} → ${nextLevelStats.damage}</p>`;
    content += `<p style="margin: 5px 0;"><strong>Range:</strong> ${currentStats.range} → ${nextLevelStats.range}</p>`;
    content += `<p style="margin: 5px 0;"><strong>Fire Rate:</strong> ${currentStats.fireRate.toFixed(2)}s → ${nextLevelStats.fireRate.toFixed(2)}s</p>`;
    
    const upgradeBtnColor = canAfford ? '#4CAF50' : '#f44336';
    const upgradeBtnText = canAfford ? 'UPGRADE' : 'NOT ENOUGH MONEY';
    
    content += `<button id="upgradeBtn" style="margin: 10px 5px; padding: 10px 15px; background: ${upgradeBtnColor}; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; width: 100%;">${upgradeBtnText}</button>`;
  } else {
    content += `<hr style="margin: 15px 0; border: 1px solid #555;">`;
    content += `<p style="margin: 10px 0; color: #FFD700; font-weight: bold;">🏆 MAX LEVEL REACHED</p>`;
  }

  content += `<button id="sellBtn" style="margin: 5px; padding: 8px 12px; background: #f44336; color: white; border: none; border-radius: 5px; cursor: pointer; width: 100%;">SELL ($${tower.getSellValue()})</button>`;
  panel.innerHTML = content;
  panel.style.display = 'block';

  function clampPanel() {
    const rect = panel.getBoundingClientRect();
    const padding = 10;
    let left = rect.left, top = rect.top;
    if (rect.right > window.innerWidth - padding) {
      left = window.innerWidth - rect.width - padding;
    }
    if (rect.left < padding) {
      left = padding;
    }
    if (rect.bottom > window.innerHeight - padding) {
      top = window.innerHeight - rect.height - padding;
    }
    if (rect.top < padding) {
      top = padding;
    }
    panel.style.left = left + 'px';
    panel.style.top = top + 'px';
  }
  setTimeout(clampPanel, 0);
  window.addEventListener('resize', clampPanel);

  // Add event listeners after a short delay to ensure DOM is ready
  setTimeout(() => {
    if (nextLevelStats) {
      const upgradeBtn = document.getElementById('upgradeBtn');
      if (upgradeBtn) {
        console.log("Adding upgrade button listener for tower:", tower.type);
        upgradeBtn.onclick = () => {
          console.log("Upgrade button clicked! Money:", window.money, "Cost:", nextLevelStats.cost, "Tower:", tower.type);
          if (tower.upgrade()) {
            console.log("Upgrade successful!");
            window.updateUI();
            window.showTowerInfoPanel(tower); // Refresh panel
          } else {
            console.log("Upgrade failed - not enough money or max level");
            alert('Cannot upgrade: Not enough money or tower is at max level!');
          }
        };
      } else {
        console.log("Upgrade button not found!");
      }
    }

    const sellBtn = document.getElementById('sellBtn');
    if (sellBtn) {
      console.log("Adding sell button listener");
      sellBtn.onclick = () => {
        console.log("Sell button clicked!");
        window.money += tower.getSellValue();
        tower.mesh.parent.remove(tower.mesh);
        window.towers.splice(window.towers.indexOf(tower), 1);
        window.updateUI();
        window.hideTowerInfoPanel();
      };
    } else {
      console.log("Sell button not found!");
    }
  }, 100);
}

window.hideTowerInfoPanel = function() {
  let panel = document.getElementById('tower-info-panel');
  if (panel) panel.style.display = 'none';
}

function selectTower(type) {
  window.selectedTowerType = type;
  window.hideTowerInfoPanel();
  console.log("Selected tower:", type);
}

function createUI() {
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.top = '10px';
  container.style.left = '10px';
  container.style.color = 'white';
  container.style.fontFamily = 'Arial, sans-serif';
  container.style.fontSize = '16px';
  container.style.textShadow = '2px 2px 4px rgba(0,0,0,0.8)';
  container.style.zIndex = '1000';

  // Health display
  const healthDiv = document.createElement('div');
  healthDiv.id = 'health';
  healthDiv.innerHTML = 'Health: 100';
  healthDiv.style.marginBottom = '10px';
  healthDiv.style.display = 'inline-block';
  healthDiv.style.verticalAlign = 'middle';

  // SPEED BUTTONS (inline with health)
  const speedDiv = document.createElement('div');
  speedDiv.style.display = 'inline-block';
  speedDiv.style.marginLeft = '18px';
  speedDiv.style.verticalAlign = 'middle';
  speedDiv.innerHTML = '<strong>Game Speed:</strong>';
  speedDiv.style.gap = '8px';
  speedDiv.style.alignItems = 'center';

  const speeds = [0, 1, 2, 3, 5, 10, 20, 50, 100, 1000, 10000, 100000, 1000000000];
  speeds.forEach(mult => {
    const btn = document.createElement('button');
    btn.id = `speed-btn-${mult}`;
    btn.textContent = mult === 0 ? 'Pause' : (mult >= 1000000 ? (mult === 1000000000 ? '1B x' : `${mult.toExponential(0)}x`) : `${mult}x`);
    btn.style.padding = '2px 7px';
    btn.style.fontSize = '12px';
    btn.style.marginLeft = '3px';
    btn.style.backgroundColor = (mult === (window.gameSpeedMultiplier ?? 1)) ? '#FFD700' : '#444';
    btn.style.color = (mult === (window.gameSpeedMultiplier ?? 1)) ? '#222' : '#fff';
    btn.style.border = 'none';
    btn.style.borderRadius = '4px';
    btn.style.cursor = 'pointer';
    btn.style.fontWeight = 'bold';
    btn.onclick = () => {
      window.gameSpeedMultiplier = mult;
      speeds.forEach(m => {
        const b = document.getElementById(`speed-btn-${m}`);
        if (b) {
          b.style.backgroundColor = m === mult ? '#FFD700' : '#444';
          b.style.color = m === mult ? '#222' : '#fff';
        }
      });
    };
    speedDiv.appendChild(btn);
  });

  // Add health and speed to a flex row
  const healthRow = document.createElement('div');
  healthRow.style.display = 'flex';
  healthRow.style.alignItems = 'center';
  healthRow.appendChild(healthDiv);
  healthRow.appendChild(speedDiv);
  healthRow.style.marginBottom = '10px';
  container.appendChild(healthRow);

  // Money display
  const moneyDiv = document.createElement('div');
  moneyDiv.id = 'money';
  moneyDiv.innerHTML = 'Money: $500';
  moneyDiv.style.marginBottom = '10px';
  container.appendChild(moneyDiv);

  // Wave display
  const waveDiv = document.createElement('div');
  waveDiv.id = 'wave';
  waveDiv.innerHTML = 'Wave: 1';
  waveDiv.style.marginBottom = '10px';
  container.appendChild(waveDiv);

  // Auto-wave status
  const autoWaveDiv = document.createElement('div');
  autoWaveDiv.id = 'auto-wave';
  autoWaveDiv.innerHTML = 'Auto-Wave: Active';
  autoWaveDiv.style.color = '#00ff00';
  autoWaveDiv.style.marginBottom = '20px';
  container.appendChild(autoWaveDiv);

  // Tower selection
  const towerDiv = document.createElement('div');
  towerDiv.style.marginBottom = '20px';
  towerDiv.innerHTML = '<strong>Select Tower:</strong>';
  container.appendChild(towerDiv);

  // Create a container for tower buttons with vertical layout
  const towerButtonContainer = document.createElement('div');
  towerButtonContainer.style.display = 'flex';
  towerButtonContainer.style.flexDirection = 'column';
  towerButtonContainer.style.alignItems = 'flex-start';
  towerButtonContainer.style.gap = '5px';
  container.appendChild(towerButtonContainer);

  // Add all available towers to the UI
  const towerTypes = Object.keys(window.TOWER_TYPES);
  towerTypes.forEach(type => {
    if (type === 'general' || type === 'duckgod') return; // Handled separately
    
    // Only show towers that are unlocked
    if (!window.availableTowers.includes(type)) return;
    
    const button = document.createElement('button');
    button.id = `${type}-button`;
    const towerCost = window.TOWER_TYPES[type].levels[0].cost;
    button.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} ($${towerCost})`;
    button.style.margin = '0';
    button.style.padding = '8px 12px';
    button.style.backgroundColor = '#4CAF50'; // Green for unlocked towers
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '4px';
    button.style.cursor = 'pointer';
    button.style.width = '140px'; // Increased width to accommodate cost
    button.onclick = () => selectTower(type);
    towerButtonContainer.appendChild(button);
  });

  // General tower button (initially hidden)
  const generalButton = document.createElement('button');
  generalButton.id = 'general-button';
  generalButton.textContent = 'General ($5000)';
  generalButton.style.margin = '0';
  generalButton.style.padding = '8px 12px';
  generalButton.style.backgroundColor = '#FFD700';
  generalButton.style.color = 'black';
  generalButton.style.border = 'none';
  generalButton.style.borderRadius = '4px';
  generalButton.style.cursor = 'pointer';
  generalButton.style.display = 'none';
  generalButton.style.width = '140px'; // Increased width to match other buttons
  generalButton.onclick = () => selectTower('general');
  towerButtonContainer.appendChild(generalButton);

  // Duck God button (initially hidden)
  const duckGodButton = document.createElement('button');
  duckGodButton.id = 'duckgod-button';
  duckGodButton.textContent = '🦆 Duck God ($25,000) 🦆';
  duckGodButton.style.margin = '0';
  duckGodButton.style.padding = '8px 12px';
  duckGodButton.style.backgroundColor = '#FFD700';
  duckGodButton.style.color = 'black';
  duckGodButton.style.border = 'none';
  duckGodButton.style.borderRadius = '4px';
  duckGodButton.style.cursor = 'pointer';
  duckGodButton.style.display = 'none';
  duckGodButton.style.width = '160px'; // Increased width to accommodate text
  duckGodButton.style.fontWeight = 'bold';
  duckGodButton.style.fontSize = '14px';
  duckGodButton.onclick = () => selectTower('duckgod');
  towerButtonContainer.appendChild(duckGodButton);

  // God Tower button (initially hidden)
  const godTowerButton = document.createElement('button');
  godTowerButton.id = 'godtower-button';
  godTowerButton.textContent = '✨ God Tower ($100,000) ✨';
  godTowerButton.style.margin = '0';
  godTowerButton.style.padding = '8px 12px';
  godTowerButton.style.backgroundColor = '#FFD700';
  godTowerButton.style.color = 'black';
  godTowerButton.style.border = 'none';
  godTowerButton.style.borderRadius = '4px';
  godTowerButton.style.cursor = 'pointer';
  godTowerButton.style.display = 'none';
  godTowerButton.style.width = '160px'; // Increased width to accommodate text
  godTowerButton.style.fontWeight = 'bold';
  godTowerButton.style.fontSize = '14px';
  godTowerButton.onclick = () => selectTower('godtower');
  towerButtonContainer.appendChild(godTowerButton);

  // Builder Tower button
  const builderButton = document.createElement('button');
  builderButton.id = 'builder-button';
  builderButton.textContent = '🏗️ Builder ($1500)';
  builderButton.style.margin = '0';
  builderButton.style.padding = '8px 12px';
  builderButton.style.backgroundColor = '#8B4513';
  builderButton.style.color = 'white';
  builderButton.style.border = 'none';
  builderButton.style.borderRadius = '4px';
  builderButton.style.cursor = 'pointer';
  builderButton.style.width = '140px';
  builderButton.style.fontWeight = 'bold';
  builderButton.onclick = () => selectTower('builder');
  towerButtonContainer.appendChild(builderButton);

  // Banker Tower button
  const bankerButton = document.createElement('button');
  bankerButton.id = 'banker-button';
  bankerButton.textContent = '💰 Banker ($2000)';
  bankerButton.style.margin = '0';
  bankerButton.style.padding = '8px 12px';
  bankerButton.style.backgroundColor = '#00FF00';
  bankerButton.style.color = 'black';
  bankerButton.style.border = 'none';
  bankerButton.style.borderRadius = '4px';
  bankerButton.style.cursor = 'pointer';
  bankerButton.style.width = '140px';
  bankerButton.style.fontWeight = 'bold';
  bankerButton.onclick = () => selectTower('banker');
  towerButtonContainer.appendChild(bankerButton);

  // Demolishinist Tower button
  const demolishinistButton = document.createElement('button');
  demolishinistButton.id = 'demolishinist-button';
  demolishinistButton.textContent = '💣 Demolishinist ($600)';
  demolishinistButton.style.margin = '0';
  demolishinistButton.style.padding = '8px 12px';
  demolishinistButton.style.backgroundColor = '#888888';
  demolishinistButton.style.color = 'white';
  demolishinistButton.style.border = 'none';
  demolishinistButton.style.borderRadius = '4px';
  demolishinistButton.style.cursor = 'pointer';
  demolishinistButton.style.width = '140px';
  demolishinistButton.style.fontWeight = 'bold';
  demolishinistButton.onclick = () => selectTower('demolishinist');
  towerButtonContainer.appendChild(demolishinistButton);

  // Tower info panel (initially hidden)
  const towerInfoPanel = document.createElement('div');
  towerInfoPanel.id = 'tower-info-panel';
  towerInfoPanel.style.position = 'absolute';
  towerInfoPanel.style.right = '10px';
  towerInfoPanel.style.top = '10px';
  towerInfoPanel.style.backgroundColor = 'rgba(0,0,0,0.8)';
  towerInfoPanel.style.color = 'white';
  towerInfoPanel.style.padding = '15px';
  towerInfoPanel.style.borderRadius = '8px';
  towerInfoPanel.style.display = 'none';
  towerInfoPanel.style.maxWidth = '250px';
  towerInfoPanel.style.fontFamily = 'Arial, sans-serif';
  towerInfoPanel.style.fontSize = '14px';
  towerInfoPanel.style.zIndex = '1001';
  document.body.appendChild(towerInfoPanel);

  // Crate reward panel (initially hidden)
  const cratePanel = document.createElement('div');
  cratePanel.id = 'crate-panel';
  cratePanel.style.position = 'absolute';
  cratePanel.style.top = '50%';
  cratePanel.style.left = '50%';
  cratePanel.style.transform = 'translate(-50%, -50%)';
  cratePanel.style.backgroundColor = 'rgba(0,0,0,0.9)';
  cratePanel.style.color = 'white';
  cratePanel.style.padding = '20px';
  cratePanel.style.borderRadius = '10px';
  cratePanel.style.display = 'none';
  cratePanel.style.textAlign = 'center';
  cratePanel.style.fontFamily = 'Arial, sans-serif';
  cratePanel.style.fontSize = '16px';
  cratePanel.style.zIndex = '1002';
  cratePanel.style.border = '2px solid #FFD700';
  document.body.appendChild(cratePanel);

  document.body.appendChild(container);
} 