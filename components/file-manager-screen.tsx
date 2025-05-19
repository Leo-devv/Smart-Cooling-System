import {
  ArrowLeft,
  ChevronDown,
  Cloud,
  File,
  FileText,
  ImageIcon,
  MoreVertical,
  Music,
  Search,
  Video,
} from "lucide-react"

export default function FileManagerScreen() {
  return (
    <div className="h-full flex flex-col bg-slate-50">
      <div className="p-6 flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          <button className="size-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-600">
            <ArrowLeft className="size-5" />
          </button>
          <h1 className="text-xl font-bold text-slate-800">File Manager</h1>
        </div>
        <button className="size-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-600">
          <MoreVertical className="size-5" />
        </button>
      </div>

      <div className="px-6 pt-4 pb-2">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="size-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search files..."
            className="block w-full pl-10 pr-3 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="px-6 py-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">
          All Files
        </button>
        {[
          { icon: ImageIcon, label: "Images" },
          { icon: FileText, label: "Documents" },
          { icon: Video, label: "Videos" },
          { icon: Music, label: "Audio" },
        ].map((item, i) => (
          <button
            key={i}
            className="bg-white text-slate-600 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1 whitespace-nowrap"
          >
            <item.icon className="size-4" />
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-slate-500">RECENT FILES</h2>
          <button className="text-sm text-blue-500 font-medium flex items-center">
            Sort by <ChevronDown className="size-4 ml-1" />
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-100">
          {[
            { icon: FileText, name: "Project_Proposal.pdf", size: "2.4 MB", date: "May 15, 2025", type: "cloud" },
            { icon: ImageIcon, name: "Screenshot_2025.png", size: "1.8 MB", date: "May 14, 2025", type: "local" },
            { icon: FileText, name: "Financial_Report.xlsx", size: "4.2 MB", date: "May 12, 2025", type: "cloud" },
            { icon: Video, name: "Product_Demo.mp4", size: "18.6 MB", date: "May 10, 2025", type: "local" },
            { icon: Music, name: "Meeting_Recording.mp3", size: "8.3 MB", date: "May 8, 2025", type: "cloud" },
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
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>{item.size}</span>
                    <span>•</span>
                    <span>{item.date}</span>
                    <span>•</span>
                    <span className="flex items-center">
                      {item.type === "cloud" ? (
                        <>
                          <Cloud className="size-3 mr-1 text-indigo-500" /> Cloud
                        </>
                      ) : (
                        <>
                          <File className="size-3 mr-1 text-blue-500" /> Local
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <button className="text-slate-400">
                <MoreVertical className="size-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6">
        <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-xl font-medium shadow-lg shadow-blue-100 hover:shadow-xl hover:shadow-blue-200 transition-all flex items-center justify-center gap-2">
          Upload New File
        </button>
      </div>
    </div>
  )
}
