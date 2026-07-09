// DMCA Smart Dashboard Demo - Main App Logic

// ── Router ──────────────────────────────────────────────────────
const Router = {
  current: 'rfid-overview',
  currentCellId: null,

  navigate(page, cellId = null) {
    this.current = page;
    this.currentCellId = cellId;
    App.render();
  }
};

// ── Utility functions ────────────────────────────────────────────
function formatDate(date) {
  return date.toLocaleDateString('en-CA', { month: 'short', day: '2-digit', year: 'numeric' });
}

function formatTime(date) {
  return date.toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit', hour12: true });
}

function formatRelative(date) {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(diff / 3600000);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(diff / 86400000);
  return `${days}d ago`;
}

function formatDuration(from, to) {
  const diff = (to || new Date()).getTime() - from.getTime();
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (days > 0) return `${days}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${Math.floor((diff % 3600000) / 60000)}m`;
  return `${Math.floor(diff / 60000)}m`;
}

function getDueDateClass(dateStr, priority) {
  if (priority === 1) return 'critical';
  const due = new Date(dateStr);
  const now = new Date();
  const diffDays = (due - now) / 86400000;
  if (diffDays < 0) return 'critical';
  if (diffDays < 14) return 'warning';
  return 'normal';
}

function formatDueChip(dateStr) {
  const d = new Date(dateStr);
  return `Due - ${d.toLocaleDateString('en-CA', { month: 'short', day: '2-digit', year: 'numeric' })}`;
}

function getPriorityLabel(wo) {
  if (wo.priority === 1) return 'Critical';
  return `Priority: ${wo.priority}`;
}

function getWOsForCell(cellId) {
  return WORK_ORDERS.filter(wo => wo.cellId === cellId);
}

function getCellById(id) {
  return CELLS.find(c => c.id === id);
}

// ── Simulation engine ─────────────────────────────────────────────
const Simulation = {
  interval: null,
  speed: 10000, // ms between movements

  start() {
    this.scheduleNext();
  },

  scheduleNext() {
    clearTimeout(this.interval);
    const jitter = this.speed * (0.7 + Math.random() * 0.6);
    this.interval = setTimeout(() => {
      this.triggerScan();
      this.scheduleNext();
    }, jitter);
  },

  triggerScan(manual = false) {
    // Pick a random WO that has history
    const eligible = WORK_ORDERS.filter(wo => wo.history.length > 0);
    if (!eligible.length) return;

    const wo = eligible[Math.floor(Math.random() * eligible.length)];
    const oldCellId = wo.cellId;

    // Pick a different cell
    const otherCells = CELLS.filter(c => c.id !== oldCellId);
    const newCell = otherCells[Math.floor(Math.random() * otherCells.length)];

    // Update WO
    const now = new Date();
    if (wo.history[0].to === null) {
      wo.history[0].to = now;
    }
    wo.history.unshift({ location: newCell.name, from: now, to: null });
    wo.cellId = newCell.id;
    wo.lastScanned = now;

    // Re-render cell grid only (preserves search input focus), or full render for other pages
    if (Router.current === 'rfid-overview') {
      renderCellGrid();
    } else {
      App.render();
    }
    setTimeout(() => {
      const el = document.querySelector(`[data-wo-id="${wo.id}"]`);
      if (el) el.classList.add('highlighted');
    }, 50);

    // Occasionally toggle a machine state
    if (Math.random() < 0.3) {
      Simulation.randomMachineStateChange();
    }

    // Occasionally toggle a device status
    if (Math.random() < 0.15) {
      Simulation.randomDeviceFlicker();
    }
  },

  randomMachineStateChange() {
    const states = ['On', 'Idle', 'Off'];
    const monitoredCells = CELLS.filter(c => c.hasMachineMonitoring);
    const cell = monitoredCells[Math.floor(Math.random() * monitoredCells.length)];
    MACHINE_STATES[cell.id] = states[Math.floor(Math.random() * states.length)];
    // Re-render if we're on that cell's page
    if (Router.current === 'smartcell' && Router.currentCellId === cell.id) {
      App.render();
    }
  },

  randomDeviceFlicker() {
    const device = IOT_DEVICES[Math.floor(Math.random() * IOT_DEVICES.length)];
    if (device.inMaintenance) return;
    const oldStatus = device.status;
    device.status = oldStatus === 'online' ? 'offline' : 'online';
    device.lastSeen = new Date();
    // Restore after 4s
    setTimeout(() => {
      device.status = oldStatus;
      device.lastSeen = new Date();
      if (Router.current === 'iot') App.render();
    }, 4000);
    if (Router.current === 'iot') App.render();
  },

  setSpeed(ms) {
    this.speed = ms;
    this.scheduleNext();
  }
};

// ── Power chart live update ───────────────────────────────────────
let powerChartInstance = null;
let powerChartTimer = null;

function startPowerChartUpdates(cellId) {
  clearInterval(powerChartTimer);
  if (!POWER_HISTORY[cellId]) return;

  powerChartTimer = setInterval(() => {
    const history = POWER_HISTORY[cellId];
    const last = history[history.length - 1];
    const newVal = Math.max(200, Math.min(8000, last.value + (Math.random() - 0.48) * 300));
    history.push({ time: new Date(), value: Math.round(newVal) });
    if (history.length > 200) history.shift();

    if (powerChartInstance) {
      powerChartInstance.data.labels = history.map(p =>
        p.time.toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit', hour12: false })
      );
      powerChartInstance.data.datasets[0].data = history.map(p => p.value);
      powerChartInstance.update('none');
    }

    // Update machine status power display
    const powerEl = document.getElementById('machine-power-val');
    if (powerEl) powerEl.textContent = `${Math.round(newVal)} W`;
  }, 2000);
}

function stopPowerChartUpdates() {
  clearInterval(powerChartTimer);
  powerChartTimer = null;
  powerChartInstance = null;
}

// ── Modal ─────────────────────────────────────────────────────────
const Modal = {
  open(wo) {
    const existing = document.getElementById('modal-backdrop');
    if (existing) existing.remove();

    const backdrop = document.createElement('div');
    backdrop.id = 'modal-backdrop';
    backdrop.className = 'modal-backdrop';
    backdrop.addEventListener('click', e => { if (e.target === backdrop) Modal.close(); });

    const totalDuration = formatDuration(
      wo.history[wo.history.length - 1].from,
      new Date()
    );

    const current = wo.history[0];
    const pastHistory = wo.history.slice(1);

    backdrop.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <span class="modal-title">W.O. ${wo.id} — ${wo.name}</span>
          <button class="modal-close" onclick="Modal.close()">×</button>
        </div>
        <div class="modal-tabs">
          <button class="modal-tab active">History</button>
          <button class="modal-tab" onclick="Modal.showDetails('${wo.id}')">Details</button>
        </div>
        <div class="modal-body" id="modal-body-content">
          ${Modal.renderHistory(wo, totalDuration, current, pastHistory)}
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);
  },

  renderHistory(wo, totalDuration, current, pastHistory) {
    const totalDays = ((new Date() - wo.history[wo.history.length - 1].from) / 86400000).toFixed(2);
    return `
      <div class="history-summary">
        Total tracked: <strong>${totalDays} days</strong>
      </div>
      <div class="history-current">
        <div class="history-current-label">Current Location</div>
        <div class="history-current-location">${current.location}</div>
        <div class="history-current-time">${formatRelative(current.from)}</div>
        <div class="history-current-scan">Last Scanned: ${formatDate(current.from)} ${formatTime(current.from)}</div>
      </div>
      ${pastHistory.length > 0 ? `
        <div class="history-list-title">Past Locations</div>
        ${pastHistory.map(h => `
          <div class="history-entry">
            <div class="history-entry-content">
              <div class="history-entry-location">${h.location}</div>
              <div class="history-entry-duration">${formatDuration(h.from, h.to)}</div>
              <div class="history-entry-range">${formatDate(h.from)} ${formatTime(h.from)} — ${h.to ? formatDate(h.to) + ' ' + formatTime(h.to) : 'Now'}</div>
            </div>
          </div>
        `).join('')}
      ` : '<div style="color:var(--gray-400);font-size:0.8rem;text-align:center;padding:12px 0">No past locations recorded.</div>'}
    `;
  },

  showDetails(woId) {
    const wo = WORK_ORDERS.find(w => w.id === woId);
    if (!wo) return;
    // Switch active tab
    document.querySelectorAll('.modal-tab').forEach((t, i) => {
      t.classList.toggle('active', i === 1);
    });
    document.getElementById('modal-body-content').innerHTML = `
      ${[
        ['W.O.', wo.id],
        ['Description', wo.fullName],
        ['Material ID', wo.materialId],
        ['Project', wo.project],
        ['Quantity', wo.quantity],
        ['Priority', wo.priority === 1 ? 'Critical' : wo.priority],
        ['Due Date', formatDate(new Date(wo.dueDate))],
        ['Extra Info', wo.extraInfo || '—'],
        ['Last Scanned', formatDate(wo.lastScanned) + ' ' + formatTime(wo.lastScanned)],
        ['Location', getCellById(wo.cellId)?.name || '—'],
      ].map(([label, val]) => `
        <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--gray-100);font-size:0.85rem">
          <span style="color:var(--gray-400);font-weight:600">${label}</span>
          <span style="color:var(--gray-800);font-weight:500;text-align:right;max-width:65%">${val}</span>
        </div>
      `).join('')}
    `;
  },

  close() {
    const el = document.getElementById('modal-backdrop');
    if (el) el.remove();
  }
};

// ── Search ────────────────────────────────────────────────────────
let searchTerm = '';
let filterCellId = '';

// ── Renderers ─────────────────────────────────────────────────────
function renderWOItem(wo) {
  const dueClass = getDueDateClass(wo.dueDate, wo.priority);
  const chip = formatDueChip(wo.dueDate);
  return `
    <div class="wo-item" data-wo-id="${wo.id}" onclick="Modal.open(WORK_ORDERS.find(w=>w.id==='${wo.id}'))">
      <div class="wo-tag-icon">🏷</div>
      <div class="wo-content">
        <div class="wo-name">${wo.id} - ${wo.name}</div>
        <div class="wo-project">${wo.project}</div>
        ${wo.extraInfo ? `<div class="wo-project" style="color:var(--amber);font-weight:600">${wo.extraInfo}</div>` : ''}
        <span class="wo-due-chip ${dueClass}">${chip}</span>
        <div class="wo-meta">
          <span>Quantity: ${wo.quantity}</span>
          <span>${getPriorityLabel(wo)}</span>
        </div>
        <div class="wo-scan">Scan - ${formatDate(wo.lastScanned)}, ${formatTime(wo.lastScanned)}</div>
      </div>
      <button class="wo-menu-btn" onclick="event.stopPropagation();Modal.open(WORK_ORDERS.find(w=>w.id==='${wo.id}'))">⋮</button>
    </div>
  `;
}

function renderCellCard(cell) {
  let wos = getWOsForCell(cell.id);
  if (searchTerm) {
    wos = wos.filter(wo =>
      wo.id.includes(searchTerm) ||
      wo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wo.project.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return `
    <div class="cell-card">
      <div class="cell-card-header" onclick="Router.navigate('smartcell','${cell.id}')">
        ${cell.name}
      </div>
      <div class="cell-card-body">
        ${wos.length === 0
          ? '<div class="no-orders">There are no work orders currently available.</div>'
          : wos.map(renderWOItem).join('')
        }
      </div>
    </div>
  `;
}

function renderCellGrid() {
  let cells = CELLS;
  if (filterCellId) cells = CELLS.filter(c => c.id === filterCellId);
  const grid = document.getElementById('cell-grid');
  if (grid) grid.innerHTML = cells.map(renderCellCard).join('');
}

function renderRFIDOverview() {
  let cells = CELLS;
  if (filterCellId) cells = CELLS.filter(c => c.id === filterCellId);

  return `
    <div class="page-content">
      <div class="page-title">RFID Overview</div>
      <div class="controls-bar">
        <input
          class="search-input"
          id="search-input"
          type="text"
          placeholder="Search..."
          value="${searchTerm}"
          oninput="searchTerm=this.value;renderCellGrid()"
        />
        <select class="filter-btn" onchange="filterCellId=this.value;renderCellGrid()" style="cursor:pointer">
          <option value="">Filter by Equipment ▾</option>
          ${CELLS.map(c => `<option value="${c.id}" ${filterCellId===c.id?'selected':''}>${c.name}</option>`).join('')}
        </select>
      </div>
      <div class="cell-grid" id="cell-grid">
        ${cells.map(renderCellCard).join('')}
      </div>
    </div>
  `;
}

function renderSmartCell(cellId) {
  const cell = getCellById(cellId);
  if (!cell) return '<div class="page-content"><p>Cell not found.</p></div>';

  const wos = getWOsForCell(cellId);
  const state = MACHINE_STATES[cellId] || 'Off';
  const helpState = CELL_HELP[cellId] || 'CLEAR';
  const helpConfig = CELL_HELP_STATES[helpState];

  const stateClass = state === 'On' ? 'status-on' : state === 'Idle' ? 'status-idle' : 'status-off';
  const stateTextClass = state === 'On' ? 'status-on-text' : state === 'Idle' ? 'status-idle-text' : 'status-off-text';

  const latestPower = cell.hasMachineMonitoring && POWER_HISTORY[cellId]
    ? POWER_HISTORY[cellId][POWER_HISTORY[cellId].length - 1].value
    : null;

  return `
    <div class="page-content">
      <button class="back-btn" onclick="Router.navigate('rfid-overview')">← Back to RFID Overview</button>
      <div class="page-title">Smart Cell — ${cell.name}</div>
      <div class="smartcell-layout">
        <!-- Left: RFID list -->
        <div class="smartcell-left">
          <div class="smartcell-left-header">
            <span class="cell-name">${cell.name}</span>
            <span class="tag-count">Count — ${wos.length}</span>
          </div>
          ${wos.length === 0
            ? '<div class="no-orders">No work orders in this cell.</div>'
            : wos.map(wo => `
              <div class="smartcell-wo-card" data-wo-id="${wo.id}" onclick="Modal.open(WORK_ORDERS.find(w=>w.id==='${wo.id}'))">
                <div class="smartcell-wo-header">
                  <span>${wo.fullName}</span>
                  <span>W.O. ${wo.id}</span>
                </div>
                <div class="smartcell-wo-body">
                  <div class="smartcell-wo-field">
                    <span class="label">Quantity</span>
                    <span class="value">${wo.quantity}</span>
                  </div>
                  <div class="smartcell-wo-field">
                    <span class="label">Priority</span>
                    <span class="value">${wo.priority === 1 ? 'Critical' : wo.priority}</span>
                  </div>
                  <div class="smartcell-wo-field">
                    <span class="label">Due Date</span>
                    <span class="value">${new Date(wo.dueDate).toLocaleDateString('en-CA', {month:'short',day:'2-digit',year:'2-digit'})}</span>
                  </div>
                </div>
                <div class="smartcell-wo-footer">
                  <span>Last scan: ${formatRelative(wo.lastScanned)}</span>
                  <span>🏷 RFID</span>
                </div>
              </div>
            `).join('')
          }
        </div>

        <!-- Right: monitoring panels -->
        <div class="smartcell-right">
          <!-- Call Help -->
          <div class="call-help-widget">
            <div class="call-help-title">Call Help Status</div>
            <div class="help-state-display">
              <span class="help-state-badge" id="help-badge"
                style="background:${helpConfig.color};color:${helpConfig.textColor}">
                ${helpState}
              </span>
            </div>
            <div class="help-state-buttons">
              ${Object.entries(CELL_HELP_STATES).map(([key, cfg]) => `
                <button class="help-state-btn" onclick="setHelpState('${cellId}','${key}')"
                  style="background:${cfg.color};color:${cfg.textColor};border-color:${cfg.color}">
                  ${cfg.label}
                </button>
              `).join('')}
            </div>
          </div>

          ${cell.hasMachineMonitoring ? `
            <!-- Machine status -->
            <div class="machine-status-widget">
              <div class="machine-status-indicator ${stateClass}" id="machine-indicator">${state}</div>
              <div class="machine-status-info">
                <div class="machine-status-label">Machine Status</div>
                <div class="machine-status-value ${stateTextClass}" id="machine-state-val">${state}</div>
                ${latestPower !== null ? `<div class="machine-status-power" id="machine-power-val">${latestPower} W</div>` : ''}
              </div>
            </div>

            <!-- Power draw chart -->
            <div class="chart-widget">
              <div class="chart-title">
                <span class="live-dot"></span>Power Draw — Last 3 Hours
              </div>
              <div class="chart-canvas-wrapper" style="height:150px">
                <canvas id="power-chart"></canvas>
              </div>
            </div>

            <!-- 30-day efficiency -->
            <div class="chart-widget">
              <div class="chart-title">30-Day Machine Efficiency (Value-Add Time %)</div>
              <div class="chart-canvas-wrapper" style="height:120px">
                <canvas id="efficiency-chart"></canvas>
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

function renderIOTOverview() {
  const byType = {};
  IOT_DEVICES.forEach(d => {
    if (!byType[d.type]) byType[d.type] = [];
    byType[d.type].push(d);
  });

  return `
    <div class="page-content">
      <div class="page-title">IoT Device Overview</div>
      ${Object.entries(byType).map(([type, devices]) => `
        <div class="iot-section">
          <div class="iot-section-title">${type}</div>
          <div class="iot-grid">
            ${devices.map(d => {
              const statusClass = d.inMaintenance ? 'maintenance' : d.status;
              const icon = d.inMaintenance ? '[M]' : d.status === 'online' ? '[+]' : '[x]';
              const cell = CELLS.find(c => c.name === d.name);
              const clickHandler = cell ? `Router.navigate('smartcell','${cell.id}')` : '';
              return `
                <div class="iot-card ${statusClass}" ${cell ? `onclick="${clickHandler}" style="cursor:pointer"` : ''}>
                  <div class="iot-card-icon">${icon}</div>
                  <div class="iot-card-info">
                    <div class="iot-card-name">${d.name}</div>
                    <div class="iot-card-sub">${d.subtitle}</div>
                    <div class="iot-card-time">
                      ${d.inMaintenance ? 'In Maintenance' : d.status === 'online' ? 'Online' : `Offline — last seen ${formatRelative(d.lastSeen)}`}
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `).join('<hr style="border:none;border-top:1px solid var(--gray-200);margin:8px 0 20px">')}
    </div>
  `;
}

function renderSidebar() {
  const navItems = [
    { id: 'rfid-overview', label: 'RFID Overview', arrow: true },
    { id: 'iot', label: 'IoT Devices', arrow: true },
  ];

  return `
    <div class="sidebar">
      <div class="sidebar-logo">
        <div class="logo-text">Demo Dashboard</div>
      </div>
      <nav class="sidebar-nav">
        ${navItems.map(item => `
          <button class="nav-item ${Router.current === item.id ? 'active' : ''}"
            onclick="Router.navigate('${item.id}')">
            ${item.label}
            <span class="nav-arrow">◀</span>
          </button>
        `).join('')}
      </nav>
    </div>
  `;
}

function renderTopbar() {
  return `
    <div class="topbar">
      <div class="connection-status">
        <span class="live-dot"></span>Live Demo
      </div>
      <span class="topbar-user">Hello</span>
      <button class="btn-signout" onclick="alert('Sign-in available in full app')">Sign out</button>
    </div>
  `;
}

function renderDemoControls() {
  return `
    <button class="demo-controls-toggle" onclick="toggleDemoPanel()">⚙ Demo Controls</button>
    <div class="demo-controls-panel" id="demo-panel">
      <h3>Demo Controls</h3>
      <p class="demo-note">This is a simulated demo of the DMCA Smart Dashboard. Data is randomly generated.</p>
      <div class="demo-ctrl">
        <label>Simulation Speed</label>
        <input type="range" min="3000" max="20000" step="1000" value="${Simulation.speed}"
          oninput="Simulation.setSpeed(parseInt(this.value));this.nextElementSibling.textContent=Math.round(this.value/1000)+'s'"
        />
        <span style="font-size:0.75rem;color:var(--gray-400)">${Simulation.speed/1000}s</span>
      </div>
      <button class="demo-btn" onclick="Simulation.triggerScan(true);toggleDemoPanel()">Trigger RFID Scan</button>
      <button class="demo-btn" onclick="Simulation.randomDeviceFlicker();toggleDemoPanel()">Flicker Random Device</button>
      <button class="demo-btn" onclick="Simulation.randomMachineStateChange();toggleDemoPanel()">Change Machine State</button>
      <button class="demo-btn" style="background:#555" onclick="Router.navigate('iot');toggleDemoPanel()">View IoT Devices</button>
    </div>
  `;
}

function toggleDemoPanel() {
  document.getElementById('demo-panel')?.classList.toggle('open');
}

// ── Help state setter ─────────────────────────────────────────────
function setHelpState(cellId, state) {
  CELL_HELP[cellId] = state;
  const cfg = CELL_HELP_STATES[state];
  const badge = document.getElementById('help-badge');
  if (badge) {
    badge.textContent = state;
    badge.style.background = cfg.color;
    badge.style.color = cfg.textColor;
  }
}

// ── Chart rendering (Chart.js from CDN) ───────────────────────────
function renderCharts(cellId) {
  if (!window.Chart || !POWER_HISTORY[cellId]) return;

  const history = POWER_HISTORY[cellId];
  const labels = history.map(p =>
    p.time.toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit', hour12: false })
  );

  // Power chart
  const powerCanvas = document.getElementById('power-chart');
  if (powerCanvas) {
    if (powerChartInstance) powerChartInstance.destroy();
    powerChartInstance = new Chart(powerCanvas, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          data: history.map(p => p.value),
          borderColor: '#3f3380',
          backgroundColor: 'rgba(63,51,128,0.08)',
          borderWidth: 1.5,
          pointRadius: 0,
          fill: true,
          tension: 0.3,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            ticks: { maxTicksLimit: 8, font: { size: 10 }, color: '#999' },
            grid: { color: '#f0f0f0' }
          },
          y: {
            ticks: { font: { size: 10 }, color: '#999',
              callback: v => v >= 1000 ? (v/1000).toFixed(1)+'kW' : v+'W'
            },
            grid: { color: '#f0f0f0' }
          }
        },
        layout: { padding: 0 }
      }
    });

    startPowerChartUpdates(cellId);
  }

  // Efficiency chart
  const effCanvas = document.getElementById('efficiency-chart');
  const effData = EFFICIENCY_DATA[cellId];
  if (effCanvas && effData) {
    new Chart(effCanvas, {
      type: 'bar',
      data: {
        labels: effData.map(d => d.date),
        datasets: [{
          data: effData.map(d => d.value),
          backgroundColor: effData.map(d =>
            d.value >= 70 ? 'rgba(76,175,80,0.7)' :
            d.value >= 45 ? 'rgba(255,152,0,0.7)' :
            'rgba(244,67,54,0.7)'
          ),
          borderRadius: 3,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            ticks: { maxTicksLimit: 10, font: { size: 9 }, color: '#999', maxRotation: 45 },
            grid: { display: false }
          },
          y: {
            min: 0, max: 100,
            ticks: { font: { size: 10 }, color: '#999', callback: v => v + '%' },
            grid: { color: '#f0f0f0' }
          }
        },
        layout: { padding: 0 }
      }
    });
  }
}

// ── Main App ──────────────────────────────────────────────────────
const App = {
  render() {
    stopPowerChartUpdates();

    let pageHTML = '';
    switch (Router.current) {
      case 'rfid-overview':
        pageHTML = renderRFIDOverview();
        break;
      case 'smartcell':
        pageHTML = renderSmartCell(Router.currentCellId);
        break;
      case 'iot':
        pageHTML = renderIOTOverview();
        break;
      default:
        pageHTML = renderRFIDOverview();
    }

    document.getElementById('sidebar').innerHTML = renderSidebar();
    document.getElementById('topbar').innerHTML = renderTopbar();
    document.getElementById('page').innerHTML = pageHTML;

    // Render charts after DOM is ready
    if (Router.current === 'smartcell' && Router.currentCellId) {
      requestAnimationFrame(() => renderCharts(Router.currentCellId));
    }
  }
};

// ── Boot ──────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  App.render();
  Simulation.start();

  // Close demo panel on outside click
  document.addEventListener('click', e => {
    const panel = document.getElementById('demo-panel');
    const toggle = document.querySelector('.demo-controls-toggle');
    if (panel && panel.classList.contains('open') && !panel.contains(e.target) && e.target !== toggle) {
      panel.classList.remove('open');
    }
  });
});
