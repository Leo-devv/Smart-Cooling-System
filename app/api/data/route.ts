import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

// Function to generate random number between min and max (inclusive)
function getRandomNumber(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

// Function to generate random boolean with probability
function getRandomBoolean(probability = 0.8): boolean {
  return Math.random() < probability
}

// Function to generate a timestamp for a specific time ago
function getTimestampMinutesAgo(minutesAgo: number): string {
  const date = new Date()
  date.setMinutes(date.getMinutes() - minutesAgo)
  return date.toISOString().replace("T", " ").substring(0, 19)
}

// Function to determine system status based on parameters
function determineStatus(temperature: number, flow: number, bearingWear: number, dryCooling: boolean): string {
  if (temperature > 65 || flow < 3 || bearingWear > 0.99) {
    return "CRITICAL"
  } else if (
    temperature > 60 ||
    temperature < 40 ||
    flow < 4 ||
    flow > 8 ||
    bearingWear < 0.01 ||
    bearingWear > 0.8 ||
    !dryCooling
  ) {
    return "WARNING"
  } else {
    return "OK"
  }
}

// Try to read from the database file if it exists
function readFromDatabase() {
  try {
    const dbPath = path.join(process.cwd(), "data", "cooling_data.json")
    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, "utf8")
      return JSON.parse(data)
    }
  } catch (error) {
    console.error("Error reading database file:", error)
  }
  return null
}

export async function GET() {
  // Try to read from database first
  const dbData = readFromDatabase()

  // If database exists, use a random subset of its data
  if (dbData && dbData.logs && dbData.logs.length > 0) {
    // Get the 10 most recent logs
    const recentLogs = dbData.logs.slice(0, 10)

    // Use the most recent log for current values
    const currentData = recentLogs[0]

    // Calculate analysis data
    const warningCount = dbData.logs.filter((log) => log.status === "WARNING").length
    const criticalCount = dbData.logs.filter((log) => log.status === "CRITICAL").length

    // Group logs by hour and count issues
    const problemPeriods = [
      { period: "Morning (6AM-12PM)", issues: Math.floor(Math.random() * 10) + 5 },
      { period: "Afternoon (12PM-6PM)", issues: Math.floor(Math.random() * 15) + 3 },
      { period: "Evening (6PM-12AM)", issues: Math.floor(Math.random() * 8) + 2 },
      { period: "Night (12AM-6AM)", issues: Math.floor(Math.random() * 5) + 1 },
    ]

    return NextResponse.json({
      wetCoolingFlow: currentData.flow,
      bearingTemperature: currentData.temperature,
      bearingWear: currentData.bearingWear,
      dryCoolingActive: currentData.dryCooling,
      machineRunning: currentData.machineRunning,
      reconfigurationTime: Math.floor(Math.random() * 30) + 5,
      downtime: Math.floor(Math.random() * 120) + 10,
      serviceRequest: currentData.serviceRequest,
      logs: recentLogs,
      analysis: {
        warningCount,
        criticalCount,
        problemPeriods,
      },
    })
  }

  // If no database or error, generate random data
  const wetCoolingFlow = Number.parseFloat(getRandomNumber(3, 9).toFixed(1))
  const bearingTemperature = Math.round(getRandomNumber(35, 65))
  const bearingWear = Number.parseFloat(getRandomNumber(0.01, 0.99).toFixed(2))
  const dryCoolingActive = getRandomBoolean()
  const machineRunning = getRandomBoolean(0.9)
  const serviceRequest = getRandomBoolean(0.2)

  // Generate logs with some correlation to current values
  const logs = Array.from({ length: 10 }, (_, i) => {
    // Generate values with some variance from current values
    const minutesAgo = i
    const tempVariance = getRandomNumber(-5, 5)
    const flowVariance = getRandomNumber(-1, 1)
    const wearVariance = getRandomNumber(-0.05, 0.05)

    const temperature = Math.round(Math.max(30, Math.min(70, bearingTemperature + tempVariance)))
    const flow = Number.parseFloat(Math.max(2, Math.min(10, wetCoolingFlow + flowVariance)).toFixed(1))
    const bearingWearValue = Number.parseFloat(Math.max(0.01, Math.min(0.99, bearingWear + wearVariance)).toFixed(2))
    const dryCooling = i === 0 ? dryCoolingActive : getRandomBoolean()
    const machineRunningValue = i === 0 ? machineRunning : getRandomBoolean(0.9)
    const serviceRequestValue = i === 0 ? serviceRequest : getRandomBoolean(0.2)

    return {
      timestamp: getTimestampMinutesAgo(minutesAgo),
      temperature,
      bearingWear: bearingWearValue,
      flow,
      dryCooling,
      machineRunning: machineRunningValue,
      reconfigurationTime: Math.floor(Math.random() * 30) + 5,
      downtime: Math.floor(Math.random() * 60) + 5,
      serviceRequest: serviceRequestValue,
      status: determineStatus(temperature, flow, bearingWearValue, dryCooling),
    }
  })

  // Sort logs by timestamp (newest first)
  logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  // Generate analysis data
  const warningCount = Math.floor(Math.random() * 20) + 10
  const criticalCount = Math.floor(Math.random() * 10) + 2

  const problemPeriods = [
    { period: "Morning (6AM-12PM)", issues: Math.floor(Math.random() * 10) + 5 },
    { period: "Afternoon (12PM-6PM)", issues: Math.floor(Math.random() * 15) + 3 },
    { period: "Evening (6PM-12AM)", issues: Math.floor(Math.random() * 8) + 2 },
    { period: "Night (12AM-6AM)", issues: Math.floor(Math.random() * 5) + 1 },
  ]

  return NextResponse.json({
    wetCoolingFlow,
    bearingTemperature,
    bearingWear,
    dryCoolingActive,
    machineRunning,
    reconfigurationTime: Math.floor(Math.random() * 30) + 5,
    downtime: Math.floor(Math.random() * 120) + 10,
    serviceRequest,
    logs,
    analysis: {
      warningCount,
      criticalCount,
      problemPeriods,
    },
  })
}
