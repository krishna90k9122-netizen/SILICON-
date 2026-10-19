export const INITIAL_ALERTS = [
  {
    id: "ALT-1092",
    title: "High Temperature",
    machineId: "CNC-01",
    machineName: "CNC Milling Center 01",
    location: "Zone 3 - Precision Machining",
    zone: "Zone 3",
    severity: "High", // Critical, High, Medium, Low
    status: "Active", // Active, Resolved, Acknowledged
    detectedAt: "Oct 14, 2026 14:32",
    detectedTimeFormatted: "14:32, Oct 14, 2026",
    currentValue: "82°C",
    threshold: "70°C",
    deviation: "+12°C above target",
    duration: "02:35",
    description: "Temperature is 12°C higher than expected. This may indicate a cooling issue or spindle load increase. Immediate inspection recommended.",
    uncertaintyNote: "Drift analysis indicates an 87% statistical probability of localized heat exchanger clogging. This is an algorithmic prediction and does not replace certified mechanical diagnostics.",
    evidence: [
      { metric: "Spindle Thermal Probe #2", reading: "82.4°C", normal: "68.0°C - 71.0°C" },
      { metric: "Secondary Coolant Flow", reading: "1.4 L/min", normal: "3.2 L/min - 3.8 L/min" },
      { metric: "Chamber Ambient Temp", reading: "24.1°C", normal: "22.0°C - 25.0°C" }
    ],
    recommendedActions: [
      { id: "act-1", title: "Check secondary coolant supply valve and line pressure", completed: true },
      { id: "act-2", title: "Inspect heat sink fan filter and exhaust vents for particulate blockage", completed: true },
      { id: "act-3", title: "Temporarily reduce machining feed rate by 15% if cutting titanium alloy", completed: false },
      { id: "act-4", title: "Verify spindle temperature sensor calibration if readings fluctuate", completed: false }
    ],
    telemetrySnippet: [
      { time: "14:00", temp: 70, threshold: 70 },
      { time: "14:10", temp: 71, threshold: 70 },
      { time: "14:20", temp: 74, threshold: 70 },
      { time: "14:25", temp: 78, threshold: 70 },
      { time: "14:30", temp: 81, threshold: 70 },
      { time: "14:32", temp: 82, threshold: 70 },
      { time: "14:35", temp: 82.4, threshold: 70 }
    ],
    timeline: [
      { time: "14:32", text: "Alert triggered: Temperature breached 70°C safety envelope" },
      { time: "14:28", text: "Coolant return flow dropped below 2.0 L/min threshold" },
      { time: "14:15", text: "High-load toolpath cycle initialized for Part #B-882" },
      { time: "12:00", text: "Routine shift start and machine inspection passed" }
    ]
  },
  {
    id: "ALT-1088",
    title: "Abnormal Vibration",
    machineId: "PRESS-02",
    machineName: "Hydraulic Stamping Press 02",
    location: "Zone 1 - Heavy Stamping",
    zone: "Zone 1",
    severity: "Medium",
    status: "Active",
    detectedAt: "Oct 14, 2026 12:17",
    detectedTimeFormatted: "12:17, Oct 14, 2026",
    currentValue: "8.4 mm/s",
    threshold: "5.0 mm/s",
    deviation: "+3.4 mm/s above safe band",
    duration: "04:12",
    description: "Harmonic vibration on hydraulic ram axis has spiked above normal operating band during stroke down cycle.",
    uncertaintyNote: "Telemetry indicates mechanical resonance. Root cause hypothesis: loose dampener mounting bolt or hydraulic valve pulsation.",
    evidence: [
      { metric: "Tri-axial Accelerometer Y-axis", reading: "8.4 mm/s", normal: "1.2 - 4.5 mm/s" },
      { metric: "Ram Pressure Relief Valve", reading: "240 bar", normal: "210 - 230 bar" }
    ],
    recommendedActions: [
      { id: "act-1", title: "Inspect lower bolster mounting torque", completed: true },
      { id: "act-2", title: "Check hydraulic pulsation dampener bladder pre-charge", completed: false }
    ],
    telemetrySnippet: [
      { time: "11:50", temp: 68, threshold: 70 },
      { time: "12:00", temp: 72, threshold: 70 },
      { time: "12:10", temp: 76, threshold: 70 },
      { time: "12:17", temp: 84, threshold: 70 }
    ],
    timeline: [
      { time: "12:17", text: "Abnormal vibration spike detected during 500-ton stamping stroke" },
      { time: "11:45", text: "Sheet coil batch #SC-449 loaded" }
    ]
  },
  {
    id: "ALT-1081",
    title: "Pressure Fluctuation",
    machineId: "BOILER-01",
    machineName: "Industrial Steam Boiler 01",
    location: "Zone 4 - Utility Plant",
    zone: "Zone 4",
    severity: "High",
    status: "Active",
    detectedAt: "Oct 14, 2026 11:03",
    detectedTimeFormatted: "11:03, Oct 14, 2026",
    currentValue: "2.3 bar",
    threshold: "1.8 bar",
    deviation: "+0.5 bar cyclical drift",
    duration: "01:45",
    description: "Steam drum output pressure is fluctuating outside allowable tolerance curve, indicating potential steam trap failure.",
    uncertaintyNote: "Sensor telemetry cross-correlated with bypass valves. Potential boiler feedwater pre-heater imbalance.",
    evidence: [
      { metric: "Main Header Pressure", reading: "2.3 bar", normal: "1.6 - 1.8 bar" },
      { metric: "Steam Trap ST-04 Temp", reading: "142°C", normal: "98°C - 105°C" }
    ],
    recommendedActions: [
      { id: "act-1", title: "Inspect steam trap ST-04 for live steam blow-through", completed: false },
      { id: "act-2", title: "Verify modulating feed valve positioning feedback", completed: false }
    ],
    telemetrySnippet: [
      { time: "10:45", temp: 60, threshold: 60 },
      { time: "10:55", temp: 64, threshold: 60 },
      { time: "11:03", temp: 69, threshold: 60 }
    ],
    timeline: [
      { time: "11:03", text: "Pressure sensor alarm threshold exceeded" }
    ]
  },
  {
    id: "ALT-1077",
    title: "Quality Deviation",
    machineId: "CONV-01",
    machineName: "Assembly Line Conveyor",
    location: "Zone 1 - Main Packaging",
    zone: "Zone 1",
    severity: "Low",
    status: "Active",
    detectedAt: "Oct 14, 2026 09:48",
    detectedTimeFormatted: "09:48, Oct 14, 2026",
    currentValue: "2.1% defect rate",
    threshold: "1.0% limit",
    deviation: "+1.1% over limit",
    duration: "00:55",
    description: "Optical vision camera flagged 7 misaligned caps out of 330 units on conveyor segment 2.",
    uncertaintyNote: "Optical lighting variance or belt slip could cause false rejection. Camera lens cleanliness checked.",
    evidence: [
      { metric: "Vision System Camera 2", reading: "2.1% fail", normal: "< 0.8%" },
      { metric: "Belt Linear Velocity", reading: "0.85 m/s", normal: "0.92 m/s" }
    ],
    recommendedActions: [
      { id: "act-1", title: "Clean vision sensor protective optical glass", completed: true },
      { id: "act-2", title: "Calibrate diverter pneumatic gate timing", completed: false }
    ],
    telemetrySnippet: [
      { time: "09:30", temp: 32, threshold: 32 },
      { time: "09:40", temp: 33, threshold: 32 },
      { time: "09:48", temp: 34, threshold: 32 }
    ],
    timeline: [
      { time: "09:48", text: "Defect count exceeded 5 consecutive pieces" }
    ]
  },
  {
    id: "ALT-1070",
    title: "Maintenance Required",
    machineId: "CNC-01",
    machineName: "CNC Milling Center 01",
    location: "Zone 3 - Precision Machining",
    zone: "Zone 3",
    severity: "Low",
    status: "Active",
    detectedAt: "Oct 14, 2026 09:12",
    detectedTimeFormatted: "09:12, Oct 14, 2026",
    currentValue: "428 hrs",
    threshold: "400 hrs",
    deviation: "28 hrs over interval",
    duration: "28:00",
    description: "Spindle bearing run-time has exceeded the manufacturer preventative maintenance service threshold.",
    uncertaintyNote: "Advisory schedule reminder. Machine can continue standard production under supervision.",
    evidence: [
      { metric: "Spindle Total Operation", reading: "428.4 hrs", normal: "400.0 hrs max" }
    ],
    recommendedActions: [
      { id: "act-1", title: "Schedule spindle regreasing and runout check", completed: false }
    ],
    telemetrySnippet: [],
    timeline: [
      { time: "09:12", text: "Preventative maintenance interval counter exceeded 400 hrs" }
    ]
  },
  {
    id: "ALT-1065",
    title: "Temperature Rising",
    machineId: "FURN-01",
    machineName: "Vacuum Induction Furnace 01",
    location: "Zone 2 - Thermal Processing",
    zone: "Zone 2",
    severity: "Low",
    status: "Active",
    detectedAt: "Oct 14, 2026 07:26",
    detectedTimeFormatted: "07:26, Oct 14, 2026",
    currentValue: "56°C",
    threshold: "50°C",
    deviation: "+6°C gradual increase",
    duration: "00:42",
    description: "Standby temperature rose steadily during purge cycle. Chamber cooling coils may be warm.",
    uncertaintyNote: "Ambient temperature in Zone 2 is elevated today due to nearby casting operations.",
    evidence: [
      { metric: "Internal Chamber Pyrometer", reading: "56.2°C", normal: "< 48°C idle" }
    ],
    recommendedActions: [
      { id: "act-1", title: "Verify vacuum door seal compression", completed: true }
    ],
    telemetrySnippet: [],
    timeline: [
      { time: "07:26", text: "Rate of rise exceeded 0.5°C/minute" }
    ]
  },
  // Resolved Alerts
  {
    id: "ALT-1054",
    title: "Spindle Vibration Normalized",
    machineId: "CNC-01",
    machineName: "CNC Milling Center 01",
    location: "Zone 3 - Precision Machining",
    zone: "Zone 3",
    severity: "Medium",
    status: "Resolved",
    detectedAt: "Oct 13, 2026 16:20",
    detectedTimeFormatted: "16:20, Oct 13, 2026",
    currentValue: "1.9 mm/s",
    threshold: "3.5 mm/s",
    deviation: "Normal operating zone",
    duration: "01:10",
    description: "Vibration on B-axis spindle returned to safe baseline following tool re-balancing.",
    uncertaintyNote: "Resolved after toolholder taper was wiped and reseated.",
    evidence: [],
    recommendedActions: [],
    telemetrySnippet: [],
    timeline: [
      { time: "17:30", text: "Alert resolved by Tech Team" },
      { time: "16:20", text: "Transient vibration warning recorded" }
    ]
  },
  {
    id: "ALT-1049",
    title: "Hydraulic Fluid Level Restored",
    machineId: "PRESS-02",
    machineName: "Hydraulic Stamping Press 02",
    location: "Zone 1 - Heavy Stamping",
    zone: "Zone 1",
    severity: "Low",
    status: "Resolved",
    detectedAt: "Oct 12, 2026 10:14",
    detectedTimeFormatted: "10:14, Oct 12, 2026",
    currentValue: "88%",
    threshold: "40%",
    deviation: "Reservoir filled to nominal capacity",
    duration: "00:30",
    description: "Hydraulic reservoir tank fluid sensor was replenished during morning scheduled maintenance.",
    uncertaintyNote: "No leaks found along main hydraulic lines.",
    evidence: [],
    recommendedActions: [],
    telemetrySnippet: [],
    timeline: [
      { time: "10:44", text: "Reservoir topped with ISO VG 46 fluid" }
    ]
  }
];
