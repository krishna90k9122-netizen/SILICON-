# DRIFTLENS-Q — API Integration Architecture & Specification

This document defines the REST / WebSocket contracts and data interchange schemas designed to replace the local `mockDataService.js` with live backend services in future phases.

---

## 1. Centralized Configuration

All API requests route through a single environment-configurable base client:

```javascript
// src/services/apiConfig.js
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.driftlens-q.io/v1',
  WS_URL: import.meta.env.VITE_WS_URL || 'wss://telemetry.driftlens-q.io/v1/stream',
  TIMEOUT_MS: 15000,
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};
```

---

## 2. API Endpoints Specification

### 2.1 Machines & Telemetry

#### `GET /api/v1/machines`
- **Method:** `GET`
- **Description:** Returns the complete list of industrial machines, their online status, load %, and current temperature.
- **Request Headers:** `Authorization: Bearer <token>`
- **Response `200 OK`:**
```json
[
  {
    "id": "CNC-01",
    "name": "CNC Milling Center 01",
    "type": "CNC Milling Center",
    "model": "LA-2500",
    "location": "Zone 3 - Precision Machining",
    "zone": "Zone 3",
    "status": "running",
    "statusText": "Online",
    "uptime": "12h 34m",
    "operatingDuration": "Running for 12h 34m",
    "temperature": 78,
    "targetTemperature": 70,
    "vibration": 2.3,
    "load": 72,
    "rpm": 4200,
    "powerConsumption": 12.4,
    "lastMaintenance": "2 days ago",
    "nextMaintenance": "In 28 days",
    "healthScore": 94,
    "stability": "Stable",
    "coolingEfficiency": "89%",
    "updatedAt": "2026-10-18T13:15:00Z"
  }
]
```
- **Components Using Endpoint:** `Dashboard.jsx`, `Machines.jsx`, `CustomReportModal.jsx`

#### `GET /api/v1/machines/:machineId`
- **Method:** `GET`
- **Description:** Returns full telemetry and specifications for a single machine.
- **Components Using Endpoint:** `MachineDetails.jsx`

#### `GET /api/v1/machines/:machineId/history`
- **Method:** `GET`
- **Query Params:** `?timeRange=24h|7days|30days`
- **Response `200 OK`:**
```json
{
  "machineId": "CNC-01",
  "timeRange": "7days",
  "telemetry": [
    { "day": "Mon", "actual": 68, "target": 70, "vibration": 1.8 },
    { "day": "Tue", "actual": 72, "target": 70, "vibration": 1.9 },
    { "day": "Wed", "actual": 74, "target": 70, "vibration": 2.1 },
    { "day": "Thu", "actual": 82, "target": 70, "vibration": 3.1 },
    { "day": "Fri", "actual": 79, "target": 70, "vibration": 2.4 },
    { "day": "Sat", "actual": 76, "target": 70, "vibration": 2.0 },
    { "day": "Sun", "actual": 75, "target": 70, "vibration": 1.9 }
  ]
}
```
- **Components Using Endpoint:** `MachineHistory.jsx`, `Dashboard.jsx`

#### `POST /api/v1/machines`
- **Method:** `POST`
- **Request Body:**
```json
{
  "id": "CNC-03",
  "name": "Horizontal Milling Lathe",
  "type": "CNC Milling Center",
  "zone": "Zone 3",
  "targetTemperature": 70,
  "load": 65
}
```
- **Response `201 Created`:** Machine object.
- **Components Using Endpoint:** `AddMachineModal.jsx`

---

### 2.2 Process Drift & Alerts

#### `GET /api/v1/alerts`
- **Method:** `GET`
- **Query Params:** `?status=Active|Resolved&severity=High|Medium|Low`
- **Components Using Endpoint:** `Alerts.jsx`, `Dashboard.jsx`, `BottomNavigation.jsx`

#### `POST /api/v1/alerts/:alertId/acknowledge`
- **Method:** `POST`
- **Description:** Acknowledges alert receipt by an operator without controlling physical hardware.
- **Payload:** `{ "acknowledgedBy": "EMP-4091", "timestamp": "2026-10-18T13:40:00Z" }`
- **Components Using Endpoint:** `AlertDetails.jsx`, `AlertCard.jsx`

#### `POST /api/v1/alerts/:alertId/resolve`
- **Method:** `POST`
- **Description:** Marks the alert as resolved in system logs.
- **Payload:** `{ "resolvedBy": "EMP-4091", "resolutionNotes": "Coolant flow restored" }`
- **Components Using Endpoint:** `AlertDetails.jsx`, `AlertCard.jsx`

---

### 2.3 Analytics & OEE

#### `GET /api/v1/analytics/overview`
- **Method:** `GET`
- **Description:** Fetches plant OEE, Availability, Performance, Quality, and Downtime distribution.
- **Response `200 OK`:**
```json
{
  "kpis": {
    "oee": { "value": 85.6, "delta": "+2.4%", "trend": "up" },
    "availability": { "value": 92.3, "delta": "+1.8%", "trend": "up" },
    "performance": { "value": 88.3, "delta": "+2.1%", "trend": "up" },
    "quality": { "value": 98.7, "delta": "+0.9%", "trend": "up" }
  },
  "downtimeTotal": "2h 46m",
  "downtimeDistribution": [
    { "name": "Equipment Failure", "value": 42, "color": "#FF4D0A" },
    { "name": "Setup & Changeover", "value": 23, "color": "#F5A623" },
    { "name": "Planned Maintenance", "value": 18, "color": "#102438" },
    { "name": "Material Shortage", "value": 10, "color": "#2563EB" },
    { "name": "Other", "value": 7, "color": "#94A3B8" }
  ]
}
```
- **Components Using Endpoint:** `Analytics.jsx`, `OEEAnalysis.jsx`

---

### 2.4 Reports

#### `GET /api/v1/reports`
- **Method:** `GET`
- **Components Using Endpoint:** `Reports.jsx`

#### `POST /api/v1/reports/custom`
- **Method:** `POST`
- **Payload:**
```json
{
  "title": "CNC-01 Performance & Drift Audit",
  "category": "telemetry",
  "machineId": "CNC-01",
  "startDate": "2026-10-01",
  "endDate": "2026-10-14",
  "includeTelemetry": true,
  "includeQuality": true,
  "includeAlerts": true,
  "format": "CSV"
}
```
- **Components Using Endpoint:** `CustomReportModal.jsx`

---

## 3. Implementation Transition Plan

To switch from mock data to the backend:
1. Replace `mockDataService.js` internal logic with `fetch(API_CONFIG.BASE_URL + path, ...)` calls.
2. Because the function signatures (`getMachines()`, `getAlertById(id)`, etc.) and return data models match this specification 1-to-1, **no UI component edits are required**.
