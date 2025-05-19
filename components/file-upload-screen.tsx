import { ArrowLeft, Cloud, File, HardDrive, Lock, Upload } from "lucide-react"

export default function FileUploadScreen() {
  return (
    <div className="h-full flex flex-col bg-slate-50">
      <div className="p-6 flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          <button className="size-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-600">
            <ArrowLeft className="size-5" />
          </button>
          <h1 className="text-xl font-bold text-slate-800">Upload File</h1>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <div className="mb-8">
          <div className="bg-white border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
            <div className="size-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Upload className="size-8 text-blue-500" />
            </div>
            <h3 className="text-lg font-medium text-slate-800 mb-2">Drag & Drop Files</h3>
            <p className="text-sm text-slate-500 mb-4">Upload documents, images, videos or audio files</p>
            <button className="bg-blue-500 text-white px-6 py-3 rounded-xl font-medium">Browse Files</button>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-sm font-medium text-slate-500 mb-3">STORAGE LOCATION</h2>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 flex-1">
                <input type="radio" id="local" name="storage" className="size-5 accent-blue-500" defaultChecked />
                <div className="size-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <HardDrive className="size-5 text-blue-500" />
                </div>
                <label htmlFor="local" className="font-medium text-slate-800">
                  Local Storage
                </label>
              </div>
              <span className="text-xs text-slate-500">4.2/5 GB used</span>
            </div>

            <div className="my-4 h-px bg-slate-100"></div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 flex-1">
                <input type="radio" id="cloud" name="storage" className="size-5 accent-indigo-500" />
                <div className="size-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <Cloud className="size-5 text-indigo-500" />
                </div>
                <label htmlFor="cloud" className="font-medium text-slate-800">
                  Cloud Storage
                </label>
              </div>
              <span className="text-xs text-slate-500">1.8/10 GB used</span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-sm font-medium text-slate-500 mb-3">SECURITY OPTIONS</h2>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <Lock className="size-5 text-green-500" />
                </div>
                <div>
                  <p className="font-medium text-slate-800">End-to-end encryption</p>
                  <p className="text-xs text-slate-500">Military-grade AES-256 encryption</p>
                </div>
              </div>
              <div className="relative inline-flex items-center">
                <input type="checkbox" id="encryption" className="peer sr-only" defaultChecked />
                <div className="w-11 h-6 bg-slate-200 peer-checked:bg-green-500 rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <File className="size-5 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-800">Document.pdf</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-500">2.4 MB</p>
                  <button className="text-xs text-red-500">Remove</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-xl font-medium shadow-lg shadow-blue-100 hover:shadow-xl hover:shadow-blue-200 transition-all flex items-center justify-center gap-2">
          Upload File
          <Upload className="size-5" />
        </button>
      </div>
    </div>
  )
}
