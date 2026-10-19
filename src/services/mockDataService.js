import { storageService } from './storageService';
import { INITIAL_MACHINES } from '../data/machinesData';
import { INITIAL_ALERTS } from '../data/alertsData';
import { ANALYTICS_DATA } from '../data/analyticsData';
import { INITIAL_REPORTS } from '../data/reportsData';
import { INITIAL_MAINTENANCE } from '../data/maintenanceData';
import { INITIAL_SETTINGS } from '../data/settingsData';
import { INITIAL_NOTIFICATIONS } from '../data/notificationsData';
import { INITIAL_INTEGRATIONS } from '../data/integrationsData';

const KEYS = {
  MACHINES: 'driftlens_machines_v1',
  ALERTS: 'driftlens_alerts_v1',
  REPORTS: 'driftlens_reports_v1',
  MAINTENANCE: 'driftlens_maintenance_v1',
  SETTINGS: 'driftlens_settings_v1',
  NOTIFICATIONS: 'driftlens_notifications_v1',
  INTEGRATIONS: 'driftlens_integrations_v1'
};

export const mockDataService = {
  // --- MACHINES ---
  getMachines: () => {
    const saved = storageService.get(KEYS.MACHINES);
    if (!saved || !Array.isArray(saved) || saved.length === 0) {
      storageService.set(KEYS.MACHINES, INITIAL_MACHINES);
      return INITIAL_MACHINES;
    }
    return saved;
  },

  getMachineById: (id) => {
    const machines = mockDataService.getMachines();
    return machines.find(m => m.id.toLowerCase() === (id || '').toLowerCase()) || null;
  },

  getMachineHistory: (id, timeRange = '7days') => {
    const machine = mockDataService.getMachineById(id) || mockDataService.getMachines()[0];
    if (!machine) return [];

    if (timeRange === '24h') {
      return machine.telemetryHistory || [];
    } else if (timeRange === '7days') {
      // 7 days view
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      return days.map((day, idx) => ({
        day,
        actual: Math.round(machine.temperature + (Math.sin(idx) * 6) + (idx === 4 ? 8 : -2)),
        target: machine.targetTemperature,
        vibration: Number((machine.vibration + (Math.cos(idx) * 0.8)).toFixed(1)),
        quality: Number((98.5 + (Math.sin(idx) * 0.8)).toFixed(1))
      }));
    } else {
      // 30 days view
      const weeks = ['W1', 'W2', 'W3', 'W4'];
      return weeks.map((w, idx) => ({
        day: w,
        actual: Math.round(machine.temperature + (idx * 1.5)),
        target: machine.targetTemperature,
        vibration: Number((machine.vibration + (idx * 0.2)).toFixed(1)),
        quality: Number((98.2 + (idx * 0.2)).toFixed(1))
      }));
    }
  },

  addMachine: (machineData) => {
    const machines = mockDataService.getMachines();
    const newMachine = {
      id: machineData.id || `MCH-0${machines.length + 1}`,
      name: machineData.name || `Industrial Machine ${machines.length + 1}`,
      type: machineData.type || "CNC Center",
      model: machineData.model || "Standard Line",
      location: machineData.location || "Zone 1 - Main Floor",
      zone: machineData.zone || "Zone 1",
      status: machineData.status || "running",
      statusText: machineData.status === 'running' ? "Online" : (machineData.status === 'idle' ? "Idle" : "Warning"),
      uptime: "0h 30m",
      operatingDuration: "Running for 0h 30m",
      temperature: Number(machineData.temperature) || 68,
      targetTemperature: Number(machineData.targetTemperature) || 70,
      vibration: Number(machineData.vibration) || 1.8,
      load: Number(machineData.load) || 65,
      rpm: Number(machineData.rpm) || 3000,
      powerConsumption: Number(machineData.powerConsumption) || 10.5,
      lastMaintenance: "Just registered",
      nextMaintenance: "In 30 days",
      healthScore: 95,
      stability: "Stable",
      coolingEfficiency: "95%",
      updatedAt: new Date().toISOString(),
      description: machineData.description || "Newly commissioned industrial asset.",
      telemetryHistory: [
        { time: "00:00", actual: 68, target: 70, vibration: 1.8, load: 65 },
        { time: "06:00", actual: 69, target: 70, vibration: 1.8, load: 66 },
        { time: "12:00", actual: 68, target: 70, vibration: 1.9, load: 68 },
        { time: "18:00", actual: 70, target: 70, vibration: 1.8, load: 65 }
      ]
    };
    const updated = [newMachine, ...machines];
    storageService.set(KEYS.MACHINES, updated);
    return newMachine;
  },

  updateMachine: (id, updates) => {
    const machines = mockDataService.getMachines();
    const updated = machines.map(m => m.id === id ? { ...m, ...updates, updatedAt: new Date().toISOString() } : m);
    storageService.set(KEYS.MACHINES, updated);
    return updated.find(m => m.id === id);
  },

  deleteMachine: (id) => {
    const machines = mockDataService.getMachines();
    const filtered = machines.filter(m => m.id !== id);
    storageService.set(KEYS.MACHINES, filtered);
    return true;
  },

  // --- ALERTS ---
  getAlerts: () => {
    const saved = storageService.get(KEYS.ALERTS);
    if (!saved || !Array.isArray(saved) || saved.length === 0) {
      storageService.set(KEYS.ALERTS, INITIAL_ALERTS);
      return INITIAL_ALERTS;
    }
    return saved;
  },

  getAlertById: (id) => {
    const alerts = mockDataService.getAlerts();
    return alerts.find(a => a.id.toLowerCase() === (id || '').toLowerCase()) || null;
  },

  acknowledgeAlert: (id) => {
    const alerts = mockDataService.getAlerts();
    const updated = alerts.map(a => {
      if (a.id === id) {
        return {
          ...a,
          status: 'Acknowledged',
          acknowledgedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          timeline: [
            { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), text: "Alert acknowledged by operator (UI action only)" },
            ...(a.timeline || [])
          ]
        };
      }
      return a;
    });
    storageService.set(KEYS.ALERTS, updated);
    return updated.find(a => a.id === id);
  },

  resolveAlert: (id) => {
    const alerts = mockDataService.getAlerts();
    const updated = alerts.map(a => {
      if (a.id === id) {
        return {
          ...a,
          status: 'Resolved',
          resolvedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          timeline: [
            { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), text: "Marked resolved in dashboard (UI simulation)" },
            ...(a.timeline || [])
          ]
        };
      }
      return a;
    });
    storageService.set(KEYS.ALERTS, updated);
    return updated.find(a => a.id === id);
  },

  reopenAlert: (id) => {
    const alerts = mockDataService.getAlerts();
    const updated = alerts.map(a => {
      if (a.id === id) {
        return {
          ...a,
          status: 'Active',
          timeline: [
            { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), text: "Alert reopened by user" },
            ...(a.timeline || [])
          ]
        };
      }
      return a;
    });
    storageService.set(KEYS.ALERTS, updated);
    return updated.find(a => a.id === id);
  },

  // --- ANALYTICS ---
  getAnalytics: () => {
    return ANALYTICS_DATA;
  },

  // --- REPORTS ---
  getReports: () => {
    const saved = storageService.get(KEYS.REPORTS);
    if (!saved || !Array.isArray(saved) || saved.length === 0) {
      storageService.set(KEYS.REPORTS, INITIAL_REPORTS);
      return INITIAL_REPORTS;
    }
    return saved;
  },

  generateReport: (config) => {
    const reports = mockDataService.getReports();
    const newReport = {
      id: `REP-CUSTOM-${Date.now().toString().slice(-4)}`,
      title: config.title || `Custom ${config.category?.toUpperCase() || 'Telemetry'} Report`,
      type: config.category ? `${config.category} analytics` : "Custom analysis",
      category: config.category || "custom",
      description: `Custom report for ${config.machineId || 'All Machines'} covering ${config.startDate || 'start'} to ${config.endDate || 'end'}.`,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      format: config.format || "CSV",
      size: "1.6 MB",
      status: "Ready",
      dataPoints: 1200,
      summaryMetrics: {
        targetAttainment: "96.4%",
        efficiencyScore: "91.8%",
        recordsExtracted: "1,200 rows"
      }
    };
    const updated = [newReport, ...reports];
    storageService.set(KEYS.REPORTS, updated);
    return newReport;
  },

  // --- MAINTENANCE ---
  getMaintenance: () => {
    const saved = storageService.get(KEYS.MAINTENANCE);
    if (!saved || !Array.isArray(saved) || saved.length === 0) {
      storageService.set(KEYS.MAINTENANCE, INITIAL_MAINTENANCE);
      return INITIAL_MAINTENANCE;
    }
    return saved;
  },

  updateMaintenanceStatus: (id, status) => {
    const list = mockDataService.getMaintenance();
    const updated = list.map(item => item.id === id ? { ...item, status } : item);
    storageService.set(KEYS.MAINTENANCE, updated);
    return updated.find(item => item.id === id);
  },

  // --- SETTINGS ---
  getSettings: () => {
    const saved = storageService.get(KEYS.SETTINGS);
    if (!saved) {
      storageService.set(KEYS.SETTINGS, INITIAL_SETTINGS);
      return INITIAL_SETTINGS;
    }
    return saved;
  },

  updateSettings: (newSettings) => {
    storageService.set(KEYS.SETTINGS, newSettings);
    return newSettings;
  },

  // --- NOTIFICATIONS ---
  getNotifications: () => {
    const saved = storageService.get(KEYS.NOTIFICATIONS);
    if (!saved || !Array.isArray(saved) || saved.length === 0) {
      storageService.set(KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
      return INITIAL_NOTIFICATIONS;
    }
    return saved;
  },

  markNotificationAsRead: (id) => {
    const notifs = mockDataService.getNotifications();
    const updated = notifs.map(n => n.id === id ? { ...n, read: true } : n);
    storageService.set(KEYS.NOTIFICATIONS, updated);
    return updated;
  },

  markAllNotificationsAsRead: () => {
    const notifs = mockDataService.getNotifications();
    const updated = notifs.map(n => ({ ...n, read: true }));
    storageService.set(KEYS.NOTIFICATIONS, updated);
    return updated;
  },

  // --- INTEGRATIONS ---
  getIntegrations: () => {
    const saved = storageService.get(KEYS.INTEGRATIONS);
    if (!saved) {
      storageService.set(KEYS.INTEGRATIONS, INITIAL_INTEGRATIONS);
      return INITIAL_INTEGRATIONS;
    }
    return saved;
  },

  // --- RESET ALL ---
  resetDemoData: () => {
    storageService.clearAll();
    storageService.set(KEYS.MACHINES, INITIAL_MACHINES);
    storageService.set(KEYS.ALERTS, INITIAL_ALERTS);
    storageService.set(KEYS.REPORTS, INITIAL_REPORTS);
    storageService.set(KEYS.MAINTENANCE, INITIAL_MAINTENANCE);
    storageService.set(KEYS.SETTINGS, INITIAL_SETTINGS);
    storageService.set(KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    storageService.set(KEYS.INTEGRATIONS, INITIAL_INTEGRATIONS);
    return true;
  }
};
