export const INITIAL_REPORTS = [
  {
    id: "REP-2026-101",
    title: "Daily Machine Report",
    type: "Summary",
    category: "daily",
    description: "Daily runtime telemetry, operational alerts, thermal stability scores, and shift breakdown.",
    createdAt: "Oct 14, 2026",
    format: "PDF",
    size: "2.4 MB",
    status: "Ready",
    dataPoints: 1440,
    summaryMetrics: {
      uptimePercent: "94.2%",
      totalCycles: "1,840 parts",
      anomaliesLogged: 4,
      avgPowerKW: "14.2 kW"
    }
  },
  {
    id: "REP-2026-102",
    title: "Quality Report",
    type: "Quality metrics",
    category: "quality",
    description: "Dimensional deviation statistics, surface roughness analysis, and optical rejection rates.",
    createdAt: "Oct 14, 2026",
    format: "PDF",
    size: "3.1 MB",
    status: "Ready",
    dataPoints: 2200,
    summaryMetrics: {
      firstPassYield: "98.7%",
      scrapRate: "0.85%",
      reworkParts: 14,
      cpkIndex: "1.67"
    }
  },
  {
    id: "REP-2026-103",
    title: "Energy Report",
    type: "Energy consumption",
    category: "energy",
    description: "Line-by-line kWh consumption, peak demand charge windows, and power factor logs.",
    createdAt: "Oct 14, 2026",
    format: "PDF",
    size: "1.8 MB",
    status: "Ready",
    dataPoints: 890,
    summaryMetrics: {
      totalKWh: "4,210 kWh",
      peakKW: "340 kW",
      carbonOffset: "-4.2%",
      powerFactor: "0.96"
    }
  },
  {
    id: "REP-2026-104",
    title: "Performance Report",
    type: "OEE",
    category: "oee",
    description: "Plant-wide Overall Equipment Effectiveness breakdown across shifts and production cells.",
    createdAt: "Oct 14, 2026",
    format: "PDF",
    size: "2.7 MB",
    status: "Ready",
    dataPoints: 1720,
    summaryMetrics: {
      plantOEE: "85.6%",
      availability: "92.3%",
      performance: "88.3%",
      qualityRate: "98.7%"
    }
  },
  {
    id: "REP-2026-105",
    title: "Maintenance Report",
    type: "Asset health",
    category: "maintenance",
    description: "Spindle bearing vibration wear index, hydraulic oil cleanliness, and planned service tasks.",
    createdAt: "Oct 14, 2026",
    format: "PDF",
    size: "2.3 MB",
    status: "Ready",
    dataPoints: 640,
    summaryMetrics: {
      mtbf: "348 hrs",
      mttr: "42 min",
      overdueTasks: 1,
      healthIndex: "91/100"
    }
  },
  {
    id: "REP-2026-106",
    title: "Production Report",
    type: "Output & efficiency",
    category: "production",
    description: "Takt time adherence, target output vs actual batch completions, and bottleneck telemetry.",
    createdAt: "Oct 14, 2026",
    format: "PDF",
    size: "2.6 MB",
    status: "Ready",
    dataPoints: 1980,
    summaryMetrics: {
      targetUnits: "3,500 units",
      actualUnits: "3,412 units",
      planAttainment: "97.5%",
      bottleneck: "CONV-01"
    }
  }
];
