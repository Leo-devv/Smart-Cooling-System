import { ArrowRight, Shield } from "lucide-react"

export default function WelcomeScreen() {
  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className="mb-8 relative">
          <div className="absolute -inset-4 bg-blue-100/50 rounded-full blur-xl"></div>
          <div className="relative size-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Shield className="size-12 text-white" />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-3 text-slate-800">MobiVault</h1>
        <p className="text-slate-500 mb-8 leading-relaxed">
          Your personal secure vault for files. Local and cloud storage with military-grade encryption.
        </p>

        <div className="flex flex-col gap-3 w-full max-w-xs">
          <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all">
            Get Started
            <ArrowRight className="size-4" />
          </button>

          <button className="text-slate-500 py-3 px-6 rounded-xl font-medium">Learn More</button>
        </div>
      </div>

      <div className="p-8 text-center">
        <p className="text-xs text-slate-400">© 2025 MobiVault • Privacy Policy</p>
      </div>
    </div>
  )
}
