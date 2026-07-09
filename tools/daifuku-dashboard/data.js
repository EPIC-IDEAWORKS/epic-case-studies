// Simulated data for DMCA Smart Dashboard Demo

const CELLS = [
  { id: 'brake-press', name: 'Brake Press', hasMachineMonitoring: true },
  { id: 'c017', name: 'C017 - John', hasMachineMonitoring: true },
  { id: 'c018', name: 'C018 - Jeff', hasMachineMonitoring: true },
  { id: 'c019', name: 'C019 - Joe', hasMachineMonitoring: false },
  { id: 'c020', name: 'C020 - Josh', hasMachineMonitoring: true },
  { id: 'co2-laser', name: 'CO2 Laser', hasMachineMonitoring: true },
  { id: 'welding-1', name: 'Welding 1', hasMachineMonitoring: true },
  { id: 'assembly', name: 'Assembly', hasMachineMonitoring: false },
];

const WORK_ORDERS = [
  {
    id: '1099121',
    name: 'ELECTRICAL KIT-UPCPP...',
    fullName: 'ELECTRICAL KIT-UPCPP CONVEYOR',
    project: 'P.CNC0216.002.403',
    dueDate: '2024-11-09',
    quantity: 0,
    priority: 5,
    materialId: 'EK-2024-001',
    extraInfo: 'Paint required before assembly',
    cellId: 'brake-press',
    lastScanned: new Date(Date.now() - 2 * 60 * 60 * 1000),
    history: [
      { location: 'Brake Press', from: new Date(Date.now() - 2 * 60 * 60 * 1000), to: null },
      { location: 'C017 - John', from: new Date(Date.now() - 8 * 60 * 60 * 1000), to: new Date(Date.now() - 2 * 60 * 60 * 1000) },
      { location: 'Receiving', from: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), to: new Date(Date.now() - 8 * 60 * 60 * 1000) },
    ]
  },
  {
    id: '1119311',
    name: '6" OH WW RH SWITCH T...',
    fullName: '6" OH WW RH SWITCH TRACK',
    project: 'MERCH/STOCK',
    dueDate: '2024-02-29',
    quantity: 0,
    priority: 5,
    materialId: 'SW-2024-002',
    extraInfo: null,
    cellId: 'c017',
    lastScanned: new Date(Date.now() - 2 * 60 * 60 * 1000),
    history: [
      { location: 'C017 - John', from: new Date(Date.now() - 2 * 60 * 60 * 1000), to: null },
      { location: 'Brake Press', from: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), to: new Date(Date.now() - 2 * 60 * 60 * 1000) },
      { location: 'Receiving', from: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), to: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
    ]
  },
  {
    id: '1135355',
    name: 'SWITCH LOAD MERCH/ST...',
    fullName: 'SWITCH LOAD MERCH/STOCK',
    project: 'MERCH/STOCK',
    dueDate: '2024-03-15',
    quantity: 0,
    priority: 5,
    materialId: 'SL-2024-003',
    extraInfo: null,
    cellId: 'c017',
    lastScanned: new Date(Date.now() - 2 * 60 * 60 * 1000),
    history: [
      { location: 'C017 - John', from: new Date(Date.now() - 2 * 60 * 60 * 1000), to: null },
      { location: 'CO2 Laser', from: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), to: new Date(Date.now() - 2 * 60 * 60 * 1000) },
    ]
  },
  {
    id: '1117392',
    name: 'CYCLO MOTOR 0.4KW X ...',
    fullName: 'CYCLO MOTOR 0.4KW X 1/60HP',
    project: 'P.CNC0222.002.403',
    dueDate: '2024-02-28',
    quantity: 0,
    priority: 5,
    materialId: 'CM-2024-004',
    extraInfo: null,
    cellId: 'c018',
    lastScanned: new Date(Date.now() - 2 * 60 * 60 * 1000),
    history: [
      { location: 'C018 - Jeff', from: new Date(Date.now() - 2 * 60 * 60 * 1000), to: null },
      { location: 'Welding 1', from: new Date(Date.now() - 6 * 60 * 60 * 1000), to: new Date(Date.now() - 2 * 60 * 60 * 1000) },
      { location: 'Brake Press', from: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), to: new Date(Date.now() - 6 * 60 * 60 * 1000) },
    ]
  },
  {
    id: '1124373',
    name: 'BASE FRAME FOR CARO...',
    fullName: 'BASE FRAME FOR CAROUSEL UNIT',
    project: 'P.CNC0222.002.403',
    dueDate: '2024-03-01',
    quantity: 0,
    priority: 5,
    materialId: 'BF-2024-005',
    extraInfo: 'Needs powder coat - grey',
    cellId: 'c018',
    lastScanned: new Date(Date.now() - 2 * 60 * 60 * 1000),
    history: [
      { location: 'C018 - Jeff', from: new Date(Date.now() - 2 * 60 * 60 * 1000), to: null },
      { location: 'Assembly', from: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), to: new Date(Date.now() - 2 * 60 * 60 * 1000) },
    ]
  },
  {
    id: '1124374',
    name: 'MAIN ARM FOR CAROUS...',
    fullName: 'MAIN ARM FOR CAROUSEL DRIVE',
    project: 'P.CNC0222.002.403',
    dueDate: '2024-03-01',
    quantity: 0,
    priority: 5,
    materialId: 'MA-2024-006',
    extraInfo: null,
    cellId: 'c018',
    lastScanned: new Date(Date.now() - 2 * 60 * 60 * 1000),
    history: [
      { location: 'C018 - Jeff', from: new Date(Date.now() - 2 * 60 * 60 * 1000), to: null },
      { location: 'C017 - John', from: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), to: new Date(Date.now() - 2 * 60 * 60 * 1000) },
    ]
  },
  {
    id: '1117399',
    name: 'LOAD DOLLY FRAME FOR...',
    fullName: 'LOAD DOLLY FRAME FOR CONVEYOR',
    project: 'P.CNC0222.002.403',
    dueDate: '2024-02-16',
    quantity: 0,
    priority: 5,
    materialId: 'LDF-2024-007',
    extraInfo: null,
    cellId: 'c020',
    lastScanned: new Date(Date.now() - 2 * 60 * 60 * 1000),
    history: [
      { location: 'C020 - Glen', from: new Date(Date.now() - 2 * 60 * 60 * 1000), to: null },
      { location: 'Welding 1', from: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), to: new Date(Date.now() - 2 * 60 * 60 * 1000) },
      { location: 'Brake Press', from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), to: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
    ]
  },
  {
    id: '1119942',
    name: 'OH FDS DRIVE PIVOT A...',
    fullName: 'OH FDS DRIVE PIVOT ASSEMBLY',
    project: 'P.TNC0708.002.404',
    dueDate: '2024-05-02',
    quantity: 0,
    priority: 5,
    materialId: 'FDS-2024-008',
    extraInfo: null,
    cellId: 'co2-laser',
    lastScanned: new Date(Date.now() - 2 * 60 * 60 * 1000),
    history: [
      { location: 'CO2 Laser', from: new Date(Date.now() - 2 * 60 * 60 * 1000), to: null },
      { location: 'C018 - Gary', from: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), to: new Date(Date.now() - 2 * 60 * 60 * 1000) },
    ]
  },
  {
    id: '1128613',
    name: '6" OH FDS DRIVE 1HP ...',
    fullName: '6" OH FDS DRIVE 1HP ASSEMBLY',
    project: 'P.TNC0708.002.404',
    dueDate: '2024-05-14',
    quantity: 0,
    priority: 5,
    materialId: 'FDS-2024-009',
    extraInfo: null,
    cellId: 'co2-laser',
    lastScanned: new Date(Date.now() - 2 * 60 * 60 * 1000),
    history: [
      { location: 'CO2 Laser', from: new Date(Date.now() - 2 * 60 * 60 * 1000), to: null },
      { location: 'C020 - Glen', from: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), to: new Date(Date.now() - 2 * 60 * 60 * 1000) },
    ]
  },
  {
    id: '1131628',
    name: '6" OH FDS DRIVE 1HP ...',
    fullName: '6" OH FDS DRIVE 1HP BRACKET',
    project: 'P.TNC0708.002.404',
    dueDate: '2024-05-14',
    quantity: 0,
    priority: 5,
    materialId: 'FDS-2024-010',
    extraInfo: null,
    cellId: 'co2-laser',
    lastScanned: new Date(Date.now() - 2 * 60 * 60 * 1000),
    history: [
      { location: 'CO2 Laser', from: new Date(Date.now() - 2 * 60 * 60 * 1000), to: null },
    ]
  },
  {
    id: '1136947',
    name: '6" OH FDS DRIVE 1HP ...',
    fullName: '6" OH FDS DRIVE 1HP MOUNT',
    project: 'P.TNC0708.002.404',
    dueDate: '2024-05-20',
    quantity: 2,
    priority: 3,
    materialId: 'FDS-2024-011',
    extraInfo: null,
    cellId: 'co2-laser',
    lastScanned: new Date(Date.now() - 2 * 60 * 60 * 1000),
    history: [
      { location: 'CO2 Laser', from: new Date(Date.now() - 2 * 60 * 60 * 1000), to: null },
    ]
  },
  {
    id: '1142301',
    name: 'CONVEYOR SIDE RAIL ...',
    fullName: 'CONVEYOR SIDE RAIL BRACKET',
    project: 'P.CNC0216.002.403',
    dueDate: '2024-06-10',
    quantity: 4,
    priority: 4,
    materialId: 'CSR-2024-012',
    extraInfo: null,
    cellId: 'welding-1',
    lastScanned: new Date(Date.now() - 45 * 60 * 1000),
    history: [
      { location: 'Welding 1', from: new Date(Date.now() - 45 * 60 * 1000), to: null },
      { location: 'Brake Press', from: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), to: new Date(Date.now() - 45 * 60 * 1000) },
    ]
  },
  {
    id: '1143872',
    name: 'DRIVE SHAFT ASSEMBLY...',
    fullName: 'DRIVE SHAFT ASSEMBLY UNIT',
    project: 'P.TNC0708.002.404',
    dueDate: '2024-06-15',
    quantity: 1,
    priority: 1,
    materialId: 'DS-2024-013',
    extraInfo: 'Check weld seam on end cap',
    cellId: 'assembly',
    lastScanned: new Date(Date.now() - 30 * 60 * 1000),
    history: [
      { location: 'Assembly', from: new Date(Date.now() - 30 * 60 * 1000), to: null },
      { location: 'Welding 1', from: new Date(Date.now() - 6 * 60 * 60 * 1000), to: new Date(Date.now() - 30 * 60 * 1000) },
      { location: 'CO2 Laser', from: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), to: new Date(Date.now() - 6 * 60 * 60 * 1000) },
      { location: 'Brake Press', from: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), to: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
    ]
  },
];

const IOT_DEVICES = [
  // Raspberry Pi devices
  { id: 'rpi-001', name: 'Brake Press', subtitle: 'Machine Monitor + RFID', type: 'Raspberry Pi', status: 'online', inMaintenance: false, lastSeen: new Date() },
  { id: 'rpi-002', name: 'C017 - John', subtitle: 'Machine Monitor + RFID', type: 'Raspberry Pi', status: 'online', inMaintenance: false, lastSeen: new Date() },
  { id: 'rpi-003', name: 'C018 - Jeff', subtitle: 'Machine Monitor', type: 'Raspberry Pi', status: 'online', inMaintenance: false, lastSeen: new Date() },
  { id: 'rpi-004', name: 'C020 - Josh', subtitle: 'Machine Monitor + RFID', type: 'Raspberry Pi', status: 'offline', inMaintenance: false, lastSeen: new Date(Date.now() - 15 * 60 * 1000) },
  { id: 'rpi-005', name: 'CO2 Laser', subtitle: 'Machine Monitor', type: 'Raspberry Pi', status: 'online', inMaintenance: false, lastSeen: new Date() },
  { id: 'rpi-006', name: 'Welding 1', subtitle: 'Machine Monitor + Welding Params', type: 'Raspberry Pi', status: 'online', inMaintenance: false, lastSeen: new Date() },
  { id: 'rpi-007', name: 'Assembly', subtitle: 'RFID + Call Help', type: 'Raspberry Pi', status: 'online', inMaintenance: true, lastSeen: new Date() },
  // Zebra scanners
  { id: 'zebra-001', name: 'Brake Press', subtitle: 'FX9600 RFID Reader', type: 'Zebra FX9600', status: 'online', inMaintenance: false, lastSeen: new Date() },
  { id: 'zebra-002', name: 'C017 - John', subtitle: 'FX9600 RFID Reader', type: 'Zebra FX9600', status: 'online', inMaintenance: false, lastSeen: new Date() },
  { id: 'zebra-003', name: 'CO2 Laser', subtitle: 'FX9600 RFID Reader', type: 'Zebra FX9600', status: 'offline', inMaintenance: false, lastSeen: new Date(Date.now() - 3 * 60 * 1000) },
];

const CELL_HELP_STATES = {
  CLEAR: { color: '#a9a9a9', textColor: '#fff', label: 'CLEAR' },
  FORKLIFT: { color: '#ff00ff', textColor: '#fff', label: 'FORKLIFT' },
  SUPERVISOR: { color: '#ffd700', textColor: '#333', label: 'SUPERVISOR' },
  MAINTENANCE: { color: '#e53935', textColor: '#fff', label: 'MAINTENANCE' },
  ENGINEERING: { color: '#1565c0', textColor: '#fff', label: 'ENGINEERING' },
  PROCUREMENT: { color: '#ff6600', textColor: '#fff', label: 'PROCUREMENT' },
  SEEN: { color: '#43a047', textColor: '#fff', label: 'SEEN' },
};

// Generate 30 days of machine efficiency data
function generateEfficiencyData() {
  const data = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    data.push({
      date: d.toLocaleDateString('en-CA', { month: 'short', day: 'numeric' }),
      value: Math.round(40 + Math.random() * 50)
    });
  }
  return data;
}

// Generate power history data (3 hours, one reading per minute = 180 points)
function generatePowerHistory(baseWatts = 3500) {
  const data = [];
  let current = baseWatts;
  const now = Date.now();
  for (let i = 179; i >= 0; i--) {
    current += (Math.random() - 0.5) * 400;
    current = Math.max(200, Math.min(8000, current));
    data.push({
      time: new Date(now - i * 60 * 1000),
      value: Math.round(current)
    });
  }
  return data;
}

// Machine states per cell
const MACHINE_STATES = {};
CELLS.forEach(cell => {
  if (cell.hasMachineMonitoring) {
    const states = ['On', 'Idle', 'Off'];
    MACHINE_STATES[cell.id] = states[Math.floor(Math.random() * 2)]; // bias toward On/Idle
  }
});

const CELL_HELP = {};
CELLS.forEach(cell => {
  CELL_HELP[cell.id] = 'CLEAR';
});

const EFFICIENCY_DATA = {};
const POWER_HISTORY = {};
CELLS.forEach(cell => {
  if (cell.hasMachineMonitoring) {
    EFFICIENCY_DATA[cell.id] = generateEfficiencyData();
    POWER_HISTORY[cell.id] = generatePowerHistory();
  }
});
