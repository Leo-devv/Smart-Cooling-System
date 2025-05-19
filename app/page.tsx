"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Thermometer,
  Droplet,
  Fan,
  AlertTriangle,
  CheckCircle,
  Power,
  Clock,
  PenToolIcon as Tool,
  Activity,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Log {
  timestamp: string
  temperature: number
  bearingWear: number
  flow: number
  dryCooling: boolean
  machineRunning: boolean
  reconfigurationTime: number
  downtime: number
  serviceRequest: boolean
  status: string
}

interface CoolingData {
  wetCoolingFlow: number
  bearingTemperature: number
  bearingWear: number
  dryCoolingActive: boolean
  machineRunning: boolean
  reconfigurationTime: number
  downtime: number
  serviceRequest: boolean
  logs: Log[]
  analysis: {
    warningCount: number
    criticalCount: number
    problemPeriods: {
      period: string
      issues: number
    }[]
  }
}

export default function Dashboard() {
  const [data, setData] = useState<CoolingData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      const response = await fetch("/api/data")
      if (!response.ok) {
        throw new Error("Failed to fetch data")
      }
      const result = await response.json()
      setData(result)
      setError(null)
    } catch (err) {
      setError("Error fetching data. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()

    // Set up auto-refresh every 5 seconds
    const intervalId = setInterval(() => {
      fetchData()
    }, 5000)

    // Clean up interval on component unmount
    return () => clearInterval(intervalId)
  }, [])

  const getFlowRateCardClass = (flowRate: number) => {
    if (flowRate < 4 || flowRate > 8) {
      return "bg-red-100 border-red-300 text-red-800"
    }
    return "bg-green-100 border-green-300 text-green-800"
  }

  const getTemperatureCardClass = (temperature: number) => {
    if (temperature < 40 || temperature > 60) {
      return "bg-orange-100 border-orange-300 text-orange-800"
    }
    return "bg-blue-100 border-blue-300 text-blue-800"
  }

  const getBearingWearCardClass = (wear: number) => {
    if (wear < 0.01 || wear > 0.99) {
      return "bg-red-100 border-red-300 text-red-800"
    }
    return "bg-green-100 border-green-300 text-green-800"
  }

  const getDryCoolingCardClass = (active: boolean) => {
    return active ? "bg-green-100 border-green-300 text-green-800" : "bg-gray-100 border-gray-300 text-gray-800"
  }

  const getMachineStatusCardClass = (running: boolean) => {
    return running ? "bg-green-100 border-green-300 text-green-800" : "bg-gray-100 border-gray-300 text-gray-800"
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status.toUpperCase()) {
      case "OK":
        return "bg-green-100 text-green-800 border-green-300"
      case "WARNING":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "CRITICAL":
        return "bg-red-100 text-red-800 border-red-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Smart Cooling System Monitor</h1>
            <Badge variant="outline" className="text-sm">
              Machine1
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {loading && !data ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        ) : data ? (
          <>
            <Tabs defaultValue="dashboard" className="mb-8">
              <TabsList className="mb-4">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {/* Wet Cooling Flow Rate Card */}
                  <Card className={cn("border", getFlowRateCardClass(data.wetCoolingFlow))}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Droplet className="mr-2 h-5 w-5" />
                        Wet Cooling Flow Rate
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold">{data.wetCoolingFlow.toFixed(1)} L/min</div>
                      <p className="text-sm mt-2">
                        {data.wetCoolingFlow < 4 || data.wetCoolingFlow > 8 ? (
                          <span className="flex items-center">
                            <AlertTriangle className="mr-1 h-4 w-4" />
                            {data.wetCoolingFlow < 4 ? "Flow rate too low" : "Flow rate too high"}
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <CheckCircle className="mr-1 h-4 w-4" />
                            Normal flow rate
                          </span>
                        )}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Bearing Temperature Card */}
                  <Card className={cn("border", getTemperatureCardClass(data.bearingTemperature))}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Thermometer className="mr-2 h-5 w-5" />
                        Bearing Temperature
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold">{data.bearingTemperature}°C</div>
                      <p className="text-sm mt-2">
                        {data.bearingTemperature < 40 || data.bearingTemperature > 60 ? (
                          <span className="flex items-center">
                            <AlertTriangle className="mr-1 h-4 w-4" />
                            {data.bearingTemperature < 40 ? "Temperature too low" : "Temperature too high"}
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <CheckCircle className="mr-1 h-4 w-4" />
                            Normal temperature
                          </span>
                        )}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Dry Cooling Status Card */}
                  <Card className={cn("border", getDryCoolingCardClass(data.dryCoolingActive))}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Fan className="mr-2 h-5 w-5" />
                        Dry Cooling Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold flex items-center">
                        {data.dryCoolingActive ? "Active" : "Inactive"}
                      </div>
                      <p className="text-sm mt-2">
                        {data.dryCoolingActive ? (
                          <span className="flex items-center">
                            <CheckCircle className="mr-1 h-4 w-4" />
                            System running normally
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <AlertTriangle className="mr-1 h-4 w-4" />
                            System inactive
                          </span>
                        )}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {/* Bearing Wear Card */}
                  <Card className={cn("border", getBearingWearCardClass(data.bearingWear))}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Tool className="mr-2 h-5 w-5" />
                        Bearing Wear
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold">{data.bearingWear.toFixed(2)} mm</div>
                      <p className="text-sm mt-2">
                        {data.bearingWear < 0.01 || data.bearingWear > 0.99 ? (
                          <span className="flex items-center">
                            <AlertTriangle className="mr-1 h-4 w-4" />
                            {data.bearingWear < 0.01 ? "Wear too low" : "Wear too high"}
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <CheckCircle className="mr-1 h-4 w-4" />
                            Normal wear level
                          </span>
                        )}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Machine Status Card */}
                  <Card className={cn("border", getMachineStatusCardClass(data.machineRunning))}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Power className="mr-2 h-5 w-5" />
                        Machine Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold">{data.machineRunning ? "Running" : "Stopped"}</div>
                      <p className="text-sm mt-2">
                        {data.machineRunning ? (
                          <span className="flex items-center">
                            <CheckCircle className="mr-1 h-4 w-4" />
                            Machine operational
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <AlertTriangle className="mr-1 h-4 w-4" />
                            Machine not running
                          </span>
                        )}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Service Request Card */}
                  <Card
                    className={cn(
                      "border",
                      data.serviceRequest
                        ? "bg-red-100 border-red-300 text-red-800"
                        : "bg-green-100 border-green-300 text-green-800",
                    )}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Tool className="mr-2 h-5 w-5" />
                        Service Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold">{data.serviceRequest ? "Required" : "Not Required"}</div>
                      <p className="text-sm mt-2">
                        {data.serviceRequest ? (
                          <span className="flex items-center">
                            <AlertTriangle className="mr-1 h-4 w-4" />
                            Service needed
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <CheckCircle className="mr-1 h-4 w-4" />
                            No service needed
                          </span>
                        )}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Reconfiguration Time Card */}
                  <Card className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Clock className="mr-2 h-5 w-5" />
                        Reconfiguration Time
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold">{data.reconfigurationTime} min</div>
                      <p className="text-sm mt-2">
                        <span className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          Last reconfiguration time
                        </span>
                      </p>
                    </CardContent>
                  </Card>

                  {/* Downtime Card */}
                  <Card className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Activity className="mr-2 h-5 w-5" />
                        Downtime
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold">{data.downtime} min</div>
                      <p className="text-sm mt-2">
                        <span className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          Total downtime
                        </span>
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="px-4 py-5 sm:px-6">
                    <h2 className="text-lg font-medium text-gray-900">Recent Sensor Logs</h2>
                    <p className="mt-1 text-sm text-gray-500">Last updated: {new Date().toLocaleTimeString()}</p>
                  </div>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Timestamp</TableHead>
                          <TableHead>Temp (°C)</TableHead>
                          <TableHead>Wear (mm)</TableHead>
                          <TableHead>Flow (L/min)</TableHead>
                          <TableHead>Dry Cooling</TableHead>
                          <TableHead>Machine</TableHead>
                          <TableHead>Service</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data.logs.map((log, index) => (
                          <TableRow key={index}>
                            <TableCell>{log.timestamp}</TableCell>
                            <TableCell>{log.temperature}</TableCell>
                            <TableCell>{log.bearingWear.toFixed(2)}</TableCell>
                            <TableCell>{log.flow.toFixed(1)}</TableCell>
                            <TableCell>
                              {log.dryCooling ? (
                                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                                  Active
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">
                                  Inactive
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              {log.machineRunning ? (
                                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                                  Running
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">
                                  Stopped
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              {log.serviceRequest ? (
                                <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
                                  Required
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                                  Not Required
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={getStatusBadgeClass(log.status)}>
                                {log.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analysis">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Warning/Critical Count Card */}
                  <Card className="border">
                    <CardHeader>
                      <CardTitle className="text-lg">Alert Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300 mr-2">
                              Warning
                            </Badge>
                            Warning Alerts
                          </span>
                          <span className="text-xl font-bold">{data.analysis.warningCount}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300 mr-2">
                              Critical
                            </Badge>
                            Critical Alerts
                          </span>
                          <span className="text-xl font-bold">{data.analysis.criticalCount}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Problem Periods Card */}
                  <Card className="border">
                    <CardHeader>
                      <CardTitle className="text-lg">Problem Periods</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {data.analysis.problemPeriods.map((period, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span>{period.period}</span>
                            <span className="text-xl font-bold">{period.issues} issues</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </>
        ) : null}
      </main>
    </div>
  )
}
