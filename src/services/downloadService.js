// Browser-compatible file download service for reports and telemetry data

export const downloadService = {
  downloadCSV: (filename, rows, headers) => {
    try {
      const headerLine = headers.join(",");
      const dataLines = rows.map(row => 
        row.map(val => {
          const str = String(val ?? '');
          return str.includes(',') || str.includes('"') || str.includes('\n')
            ? `"${str.replace(/"/g, '""')}"`
            : str;
        }).join(",")
      );

      const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent([headerLine, ...dataLines].join("\n"));
      const link = document.createElement("a");
      link.setAttribute("href", csvContent);
      link.setAttribute("download", filename.endsWith('.csv') ? filename : `${filename}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    } catch (err) {
      console.error("[downloadService] CSV download failed:", err);
      return false;
    }
  },

  downloadMachineReportCSV: (machine) => {
    const filename = `DRIFTLENS_${machine.id}_Telemetry_Report.csv`;
    const headers = ["Timestamp", "Machine ID", "Actual Temp (°C)", "Target Temp (°C)", "Vibration (mm/s)", "Load (%)", "Status"];
    const rows = (machine.telemetryHistory || []).map(entry => [
      entry.time,
      machine.id,
      entry.actual,
      entry.target,
      entry.vibration,
      entry.load,
      machine.statusText || machine.status
    ]);
    return downloadService.downloadCSV(filename, rows, headers);
  },

  downloadReportById: (report, machines) => {
    const filename = `DRIFTLENS_${report.title.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.csv`;
    const headers = ["Report Title", "Category", "Machine ID", "Metric Name", "Reading", "Baseline / Target", "Evaluation", "Timestamp"];
    
    const rows = machines.map(m => [
      report.title,
      report.type,
      m.id,
      report.category === 'energy' ? 'Power Consumption' : (report.category === 'quality' ? 'Defect Probability' : 'Operating Temperature'),
      report.category === 'energy' ? `${m.powerConsumption} kW` : (report.category === 'quality' ? '0.6%' : `${m.temperature}°C`),
      report.category === 'energy' ? '15.0 kW' : (report.category === 'quality' ? '< 1.0%' : `${m.targetTemperature}°C`),
      m.status === 'running' ? 'NOMINAL' : (m.status === 'error' ? 'ACTION_REQUIRED' : 'IDLE'),
      new Date().toISOString()
    ]);

    return downloadService.downloadCSV(filename, rows, headers);
  }
};
