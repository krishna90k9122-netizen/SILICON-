export const INITIAL_INTEGRATIONS = [
  {
    id: "mqtt",
    name: "MQTT Telemetry Broker",
    protocol: "MQTT v5.0 / TLS",
    endpoint: "ssl://iot-broker.driftlens.internal:8883",
    status: "Demo Simulated",
    statusType: "demo",
    activeTopics: 14,
    messagesPerMin: 1240,
    description: "High-frequency edge machine sensor pub/sub stream delivering vibration and thermal metrics.",
    lastHeartbeat: "Just now"
  },
  {
    id: "opcua",
    name: "OPC Unified Architecture (OPC UA)",
    protocol: "opc.tcp",
    endpoint: "opc.tcp://scada-gateway.plant4.lan:4840",
    status: "Demo Simulated",
    statusType: "demo",
    activeTopics: 6,
    messagesPerMin: 320,
    description: "Standard industrial interoperability bridge connecting Siemens S7 & Allen-Bradley PLCs.",
    lastHeartbeat: "12s ago"
  },
  {
    id: "modbus",
    name: "Modbus TCP Gateway",
    protocol: "Modbus TCP / Port 502",
    endpoint: "192.168.10.45:502",
    status: "Demo Simulated",
    statusType: "demo",
    activeTopics: 8,
    messagesPerMin: 180,
    description: "Legacy telemetry polling for auxiliary furnace thermocouples and cooling pumps.",
    lastHeartbeat: "45s ago"
  },
  {
    id: "rest-api",
    name: "DRIFTLENS Cloud REST API",
    protocol: "HTTPS / OpenAPI 3.1",
    endpoint: "https://api.driftlens-q.io/v1",
    status: "Ready for Backend",
    statusType: "ready",
    activeTopics: 24,
    messagesPerMin: 0,
    description: "Centralized industrial cloud synchronization, historical warehouse, and AI inference API.",
    lastHeartbeat: "Standby"
  }
];
