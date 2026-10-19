# DRIFTLENS-Q — Human-Aware Industrial Process Drift Detection

> Premium-quality, mobile-first Android frontend application for real-time machine telemetry monitoring, industrial drift detection, OEE analysis, and alert resolution.

---

## 🌟 Highlights & Features

- **Mobile-First Android Design**: Tailored for Android touch screens (Pixel, Galaxy, etc.) with safe-area insets, Android status bar, 48px+ touch targets, and fixed bottom navigation.
- **Visual Design System**: Industrial Deep Navy (`#102438`), Electric Industrial Orange accent (`#FF4D0A`), emerald health badges (`#16A36A`), and clean cards.
- **Slide-Over Dark Navy Navigation Drawer**: Matching the reference image (`DRYFTQ` logo, navigation links, and AI footer).
- **Desktop Phone Frame Toggle**: On desktop monitors, toggle between a realistic Android phone frame mockup and fluid responsive view.
- **Local Persistence & Zero Backend Requirement**: Fully functional local storage service with instant localStorage caching for added machines, acknowledged alerts, reports, and settings.
- **Instant CSV Export**: Working client-side CSV downloads for telemetry history and custom report builder without fake links or mock downloads.
- **Capacitor-Ready**: Prepared for one-command packaging into an Android APK (see `ANDROID_BUILD.md`).

---

## 📱 Core Screens & Route Map

| Screen | Route | Description |
|---|---|---|
| **Process Overview** | `/` | Live telemetry, machine health cards, temperature actual vs target Recharts line chart, vibration sparkline, quality meter, critical alert banner. |
| **Machines** | `/machines` | Equipment search, status filter pills (All, Running, Idle, Error), machine cards with live load meters, and "+ Add New Machine" modal. |
| **Machine Details** | `/machines/:machineId` | Hardware card, running duration, tabs (Overview, Metrics, History), load/temp/vibration progress gauges. |
| **Machine History** | `/history` | Machine selector dropdown, time range filter, 7-day temperature & vibration telemetry curves, chronological event logs with modal inspector. |
| **Analytics** | `/analytics` | Key Performance KPI cards (OEE 85.6%, Availability 92.3%, Performance 88.3%, Quality 98.7%), Downtime donut chart with category legend, asset rankings. |
| **OEE Analysis** | `/analytics/oee` | Semi-circular OEE gauge, Availability/Performance/Quality factor breakdown progress bars, OEE trend chart. |
| **Alerts Management** | `/alerts` | Active and Resolved tabs, severity filters, search, severity badges, quick navigation to details. |
| **Alert Details** | `/alerts/:alertId` | Circular alert icon, threshold vs current readings, telemetry breach curve, uncertainty/evidence analysis, recommended actions checklist, UI acknowledge/resolve actions. |
| **Reports** | `/reports` | Standard reports, instant CSV download, report preview modal, custom report builder modal with date/machine/metric selection. |
| **Profile** | `/profile` | Shlok Kumar (Product Specialist), menu items (Profile Information, Password Change demo, Team Management, Plant Settings, Subscription, Support, About, Logout). |
| **Settings** | `/settings` | General language selector, Push/Email/SMS toggles, Cloud Sync frequency, Data usage mode, Factory Demo Reset. |
| **Maintenance** | `/maintenance` | Preventative and corrective work orders, priority badges, technician assignments, status progression. |
| **Integrations** | `/integrations` | Industrial connectivity cards for MQTT Broker, OPC UA Server, Modbus TCP, REST API Gateway. |
| **Notifications** | `/notifications` | Live push event notifications with unread states and mark-all-read action. |
| **Team Management** | `/team` | Plant operator roster, permission roles (Admin, Editor, Viewer), and invite modal. |
| **Plant Settings** | `/plant` | Facility codes, active production cells, timezones, and shift configurations. |
| **About** | `/about` | Architecture overview, versioning, and edge AI drift detection documentation. |

---

## 🛠️ Technology Stack

- **React 19** + **Vite**
- **Tailwind CSS** with custom industrial palette
- **React Router DOM v7**
- **Lucide React Icons**
- **Recharts** (AreaChart, LineChart, PieChart)
- **Local Storage Service** (Safe JSON serialization & demo caching)

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Run production build validation
npm run build
```
