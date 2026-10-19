export const ANALYTICS_DATA = {
  kpis: {
    oee: { value: 85.6, delta: "+2.4%", trend: "up", label: "OEE" },
    availability: { value: 92.3, delta: "+1.8%", trend: "up", label: "Availability" },
    performance: { value: 88.3, delta: "+2.1%", trend: "up", label: "Performance" },
    quality: { value: 98.7, delta: "+0.9%", trend: "up", label: "Quality" }
  },
  downtimeTotal: "2h 46m",
  downtimeDistribution: [
    { name: "Equipment Failure", value: 42, duration: "1h 10m", color: "#FF4D0A" },
    { name: "Setup & Changeover", value: 23, duration: "38m", color: "#F5A623" },
    { name: "Planned Maintenance", value: 18, duration: "30m", color: "#102438" },
    { name: "Material Shortage", value: 10, duration: "17m", color: "#2563EB" },
    { name: "Other", value: 7, duration: "11m", color: "#94A3B8" }
  ],
  oeeTrends: {
    "7days": [
      { day: "Mon", oee: 82, availability: 90, performance: 86, quality: 98 },
      { day: "Tue", oee: 84, availability: 91, performance: 87, quality: 98 },
      { day: "Wed", oee: 81, availability: 89, performance: 84, quality: 97 },
      { day: "Thu", oee: 85, availability: 92, performance: 88, quality: 99 },
      { day: "Fri", oee: 87, availability: 93, performance: 90, quality: 99 },
      { day: "Sat", oee: 88, availability: 94, performance: 91, quality: 99 },
      { day: "Sun", oee: 85.6, availability: 92.3, performance: 88.3, quality: 98.7 }
    ],
    "30days": [
      { day: "Week 1", oee: 80.2, availability: 88, performance: 85, quality: 97 },
      { day: "Week 2", oee: 82.5, availability: 90, performance: 86, quality: 98 },
      { day: "Week 3", oee: 84.1, availability: 91, performance: 87, quality: 98 },
      { day: "Week 4", oee: 85.6, availability: 92.3, performance: 88.3, quality: 98.7 }
    ],
    "90days": [
      { day: "Month 1", oee: 79.4, availability: 86, performance: 83, quality: 96 },
      { day: "Month 2", oee: 82.8, availability: 89, performance: 86, quality: 97 },
      { day: "Month 3", oee: 85.6, availability: 92.3, performance: 88.3, quality: 98.7 }
    ]
  },
  productionTrend: [
    { time: "06:00", output: 140, target: 150 },
    { time: "09:00", output: 165, target: 150 },
    { time: "12:00", output: 148, target: 150 },
    { time: "15:00", output: 172, target: 150 },
    { time: "18:00", output: 160, target: 150 },
    { time: "21:00", output: 155, target: 150 }
  ],
  machinePerformanceList: [
    { id: "ROBOT-03", name: "6-Axis Welder", oee: 94.2, availability: 97.1, performance: 96.0, quality: 99.2, status: "Optimal" },
    { id: "CNC-01", name: "Milling Center 01", oee: 91.0, availability: 94.5, performance: 92.0, quality: 98.5, status: "Good" },
    { id: "FURN-01", name: "Induction Furnace", oee: 89.4, availability: 91.0, performance: 90.2, quality: 99.0, status: "Good" },
    { id: "PRESS-02", name: "Hydraulic Press", oee: 83.1, availability: 88.0, performance: 85.4, quality: 97.8, status: "Attention" },
    { id: "BOILER-01", name: "Steam Boiler", oee: 72.5, availability: 78.0, performance: 76.2, quality: 96.0, status: "Warning" },
    { id: "CONV-01", name: "Assembly Conveyor", oee: 68.3, availability: 72.0, performance: 71.0, quality: 95.1, status: "Critical" }
  ]
};
