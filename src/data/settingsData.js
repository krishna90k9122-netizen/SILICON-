export const INITIAL_SETTINGS = {
  general: {
    language: "English (US)",
    theme: "light", // light or dark
    autoRefreshInterval: 5, // seconds
    temperatureUnit: "Celsius (°C)",
    pressureUnit: "bar",
    vibrationUnit: "mm/s"
  },
  notifications: {
    pushEnabled: true,
    emailAlerts: true,
    smsAlerts: false,
    criticalOnly: false,
    shiftSummary: true
  },
  dataSync: {
    cloudSync: "Every 5 minutes",
    wifiOnly: true,
    localCacheRetention: "30 Days",
    offlineMode: false
  },
  plant: {
    plantName: "Precision Aero Plant 4",
    facilityCode: "FAC-NY-420",
    timezone: "America/New_York (UTC-5)",
    activeLine: "Primary CNC Cell B"
  }
};
