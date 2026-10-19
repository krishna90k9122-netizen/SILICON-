export const INITIAL_MAINTENANCE = [
  {
    id: "MNT-401",
    title: "Spindle Regreasing & Runout Check",
    machineId: "CNC-01",
    machineName: "CNC Milling Center 01",
    priority: "High",
    status: "Pending", // Pending, In Progress, Completed
    dueDate: "Today, 17:00",
    technician: "Marcus Vance",
    estimatedDuration: "45 mins",
    notes: "Inspect BB-7001 precision angular bearings and check axial runout under 0.003mm."
  },
  {
    id: "MNT-402",
    title: "Hydraulic Fluid & Filter Change",
    machineId: "PRESS-02",
    machineName: "Hydraulic Stamping Press 02",
    priority: "Medium",
    status: "Pending",
    dueDate: "Tomorrow, 09:30",
    technician: "Elena Rostova",
    estimatedDuration: "90 mins",
    notes: "Flush 60L reservoir with ISO VG 46 and replace 10-micron return filter."
  },
  {
    id: "MNT-403",
    title: "Steam Trap ST-04 Replacement",
    machineId: "BOILER-01",
    machineName: "Industrial Steam Boiler 01",
    priority: "Critical",
    status: "In Progress",
    dueDate: "Today, 15:00",
    technician: "Devon Chen",
    estimatedDuration: "60 mins",
    notes: "Isolate steam bypass loop before unbolting thermostatic trap flange."
  },
  {
    id: "MNT-404",
    title: "Optical Lens Alignment & Cleaning",
    machineId: "CONV-01",
    machineName: "Assembly Line Conveyor",
    priority: "Low",
    status: "Completed",
    dueDate: "Yesterday",
    technician: "Marcus Vance",
    estimatedDuration: "25 mins",
    notes: "Wiped quartz optical plate with 99% isopropanol and recalibrated laser baseline."
  },
  {
    id: "MNT-405",
    title: "Vacuum Chamber Seal Inspection",
    machineId: "FURN-01",
    machineName: "Vacuum Induction Furnace 01",
    priority: "Medium",
    status: "Completed",
    dueDate: "2 days ago",
    technician: "Sarah Jenkins",
    estimatedDuration: "35 mins",
    notes: "Viton O-ring lubricated with Krytox vacuum grease. Helium leak check negative."
  }
];
