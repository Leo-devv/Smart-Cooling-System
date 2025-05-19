import { Bell, ChevronRight, Cloud, Folder, HardDrive, Settings, Shield } from "lucide-react"

export default function DashboardScreen() {
  return (
    <div className="h-full flex flex-col bg-slate-50">
      <div className="p-6 flex items-center justify-between bg-white">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-sm text-slate-500">Welcome back, Alex</p>
        </div>
        <div className="flex gap-3">
          <button className="size-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 relative">
            <Bell className="size-5" />
            <span className="absolute top-1 right-1 size-2.5 bg-red-500 rounded-full"></span>
          </button>
          <button className="size-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-600">
            <Settings className="size-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <div className="mb-6">
          <h2 className="text-sm font-medium text-slate-500 mb-3">STORAGE SUMMARY</h2>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Shield className="size-5 text-blue-500" />
                <span className="font-medium text-slate-800">Total Storage</span>
              </div>
              <span className="text-sm text-slate-500">10 GB available</span>
            </div>

            <div className="h-2 bg-slate-100 rounded-full mb-4 overflow-hidden">
              <div className="h-full w-[65%] bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
            </div>

            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <div className="size-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-slate-600">Local (4.2 GB)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-3 bg-indigo-600 rounded-full"></div>
                <span className="text-sm text-slate-600">Cloud (1.8 GB)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-sm font-medium text-slate-500 mb-3">QUICK ACCESS</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-2">
              <div className="size-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Folder className="size-6 text-blue-500" />
              </div>
              <span className="text-sm font-medium text-slate-700">File Manager</span>
            </button>
            <button className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-2">
              <div className="size-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                <Cloud className="size-6 text-indigo-500" />
              </div>
              <span className="text-sm font-medium text-slate-700">Cloud Sync</span>
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-slate-500 mb-3">RECENT ACTIVITY</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-100">
            {[
              { icon: Cloud, name: "Project_Proposal.pdf", time: "2 hours ago", type: "cloud" },
              { icon: HardDrive, name: "Family_Photos.zip", time: "Yesterday", type: "local" },
              { icon: Cloud, name: "Financial_Report.xlsx", time: "3 days ago", type: "cloud" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`size-10 rounded-lg ${item.type === "cloud" ? "bg-indigo-100" : "bg-blue-100"} flex items-center justify-center`}
                  >
                    <item.icon className={`size-5 ${item.type === "cloud" ? "text-indigo-500" : "text-blue-500"}`} />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.time}</p>
                  </div>
                </div>
                <button className="text-slate-400">
                  <ChevronRight className="size-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border-t border-slate-200 p-4 grid grid-cols-4">
        {[
          { icon: HardDrive, label: "Home", active: true },
          { icon: Folder, label: "Files", active: false },
          { icon: Cloud, label: "Cloud", active: false },
          { icon: Settings, label: "Settings", active: false },
        ].map((item, i) => (
          <button
            key={i}
            className={`flex flex-col items-center gap-1 ${item.active ? "text-blue-500" : "text-slate-400"}`}
          >
            <item.icon className="size-6" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
