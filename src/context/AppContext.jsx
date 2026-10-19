import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockDataService } from '../services/mockDataService';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [machines, setMachines] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [reports, setReports] = useState([]);
  const [maintenance, setMaintenance] = useState([]);
  const [settings, setSettings] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [integrations, setIntegrations] = useState([]);
  
  // UI States
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isPhoneFrame, setIsPhoneFrame] = useState(false); // Can toggle phone mockup on desktop
  const [toast, setToast] = useState(null); // { message, type }

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const loadAllData = () => {
    setMachines(mockDataService.getMachines());
    setAlerts(mockDataService.getAlerts());
    setReports(mockDataService.getReports());
    setMaintenance(mockDataService.getMaintenance());
    setSettings(mockDataService.getSettings());
    setNotifications(mockDataService.getNotifications());
    setIntegrations(mockDataService.getIntegrations());
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const activeAlerts = alerts.filter(a => a.status === 'Active' || a.status === 'Acknowledged');
  const activeAlertsCount = activeAlerts.length;
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const handleAddMachine = (machineData) => {
    const created = mockDataService.addMachine(machineData);
    setMachines(mockDataService.getMachines());
    showToast(`Machine ${created.id} added successfully!`, 'success');
    return created;
  };

  const handleUpdateMachine = (id, updates) => {
    const updated = mockDataService.updateMachine(id, updates);
    setMachines(mockDataService.getMachines());
    showToast(`Machine ${id} updated`, 'info');
    return updated;
  };

  const handleDeleteMachine = (id) => {
    mockDataService.deleteMachine(id);
    setMachines(mockDataService.getMachines());
    showToast(`Machine ${id} deleted`, 'info');
  };

  const handleAcknowledgeAlert = (id) => {
    mockDataService.acknowledgeAlert(id);
    setAlerts(mockDataService.getAlerts());
    showToast(`Alert ${id} acknowledged (UI state only)`, 'success');
  };

  const handleResolveAlert = (id) => {
    mockDataService.resolveAlert(id);
    setAlerts(mockDataService.getAlerts());
    showToast(`Alert ${id} resolved (UI state only)`, 'success');
  };

  const handleReopenAlert = (id) => {
    mockDataService.reopenAlert(id);
    setAlerts(mockDataService.getAlerts());
    showToast(`Alert ${id} reopened`, 'info');
  };

  const handleGenerateReport = (config) => {
    const newReport = mockDataService.generateReport(config);
    setReports(mockDataService.getReports());
    showToast(`Report "${newReport.title}" generated!`, 'success');
    return newReport;
  };

  const handleUpdateSettings = (newSettings) => {
    const saved = mockDataService.updateSettings(newSettings);
    setSettings(saved);
    showToast('Settings saved locally', 'success');
  };

  const handleUpdateMaintenanceStatus = (id, status) => {
    mockDataService.updateMaintenanceStatus(id, status);
    setMaintenance(mockDataService.getMaintenance());
    showToast(`Maintenance status updated to ${status}`, 'info');
  };

  const handleMarkNotificationRead = (id) => {
    const updated = mockDataService.markNotificationAsRead(id);
    setNotifications(updated);
  };

  const handleMarkAllNotificationsRead = () => {
    const updated = mockDataService.markAllNotificationsAsRead();
    setNotifications(updated);
    showToast('All notifications marked as read', 'info');
  };

  const handleResetDemoData = () => {
    mockDataService.resetDemoData();
    loadAllData();
    showToast('Demo data reset to factory defaults', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        machines,
        alerts,
        reports,
        maintenance,
        settings,
        notifications,
        integrations,
        activeAlertsCount,
        unreadNotificationsCount,
        drawerOpen,
        setDrawerOpen,
        toggleDrawer: () => setDrawerOpen(prev => !prev),
        isPhoneFrame,
        setIsPhoneFrame,
        toast,
        showToast,
        addMachine: handleAddMachine,
        updateMachine: handleUpdateMachine,
        deleteMachine: handleDeleteMachine,
        acknowledgeAlert: handleAcknowledgeAlert,
        resolveAlert: handleResolveAlert,
        reopenAlert: handleReopenAlert,
        generateReport: handleGenerateReport,
        updateSettings: handleUpdateSettings,
        updateMaintenanceStatus: handleUpdateMaintenanceStatus,
        markNotificationRead: handleMarkNotificationRead,
        markAllNotificationsRead: handleMarkAllNotificationsRead,
        resetDemoData: handleResetDemoData,
        refreshData: loadAllData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
