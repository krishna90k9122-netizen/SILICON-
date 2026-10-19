export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "Thermal Threshold Breached",
    message: "CNC-01 reached 82°C (+12°C above target). Inspect secondary cooling line.",
    machineId: "CNC-01",
    severity: "critical",
    time: "14:32",
    date: "Today",
    read: false,
    link: "/alerts/ALT-1092"
  },
  {
    id: "notif-2",
    title: "Vibration Warning Spike",
    message: "PRESS-02 hydraulic ram axis vibration spiked to 8.4 mm/s during downstroke.",
    machineId: "PRESS-02",
    severity: "warning",
    time: "12:17",
    date: "Today",
    read: false,
    link: "/alerts/ALT-1088"
  },
  {
    id: "notif-3",
    title: "Daily OEE Report Generated",
    message: "Plant performance report for Oct 14 is compiled and ready for preview.",
    machineId: null,
    severity: "info",
    time: "10:00",
    date: "Today",
    read: false,
    link: "/reports"
  },
  {
    id: "notif-4",
    title: "Maintenance Completed",
    message: "CONV-01 optical lens alignment signed off by Marcus Vance.",
    machineId: "CONV-01",
    severity: "success",
    time: "06:50",
    date: "Today",
    read: true,
    link: "/maintenance"
  },
  {
    id: "notif-5",
    title: "Process Restored to Baseline",
    message: "FURN-01 vacuum chamber stabilized within ±0.2°C nominal envelope.",
    machineId: "FURN-01",
    severity: "success",
    time: "08:17",
    date: "Yesterday",
    read: true,
    link: "/machines/FURN-01"
  }
];
