import { ArrowLeft, Fingerprint, Mail, Lock, Eye } from "lucide-react"

export default function LoginScreen() {
  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-6">
        <button className="size-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-600">
          <ArrowLeft className="size-5" />
        </button>
      </div>

      <div className="flex-1 flex flex-col px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2 text-slate-800">Welcome back</h1>
          <p className="text-slate-500">Sign in to access your secure vault</p>
        </div>

        <div className="space-y-5 mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-slate-100 rounded-xl blur opacity-80"></div>
            <div className="relative bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="flex items-center px-4 border-b border-slate-100">
                <Mail className="size-5 text-slate-400" />
                <input
                  type="email"
                  placeholder="Email address"
                  className="flex-1 py-4 px-3 outline-none text-slate-800"
                />
              </div>
              <div className="flex items-center px-4">
                <Lock className="size-5 text-slate-400" />
                <input
                  type="password"
                  placeholder="Password"
                  className="flex-1 py-4 px-3 outline-none text-slate-800"
                />
                <button className="text-slate-400">
                  <Eye className="size-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <div className="relative inline-flex items-center">
                <input type="checkbox" id="biometric" className="peer sr-only" defaultChecked />
                <div className="w-11 h-6 bg-slate-200 peer-checked:bg-blue-500 rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </div>
              <label htmlFor="biometric" className="text-sm text-slate-600 flex items-center gap-1">
                <Fingerprint className="size-4" /> Biometric login
              </label>
            </div>
            <a href="#" className="text-sm text-blue-500 font-medium">
              Forgot?
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 rounded-xl font-medium shadow-lg shadow-blue-100 hover:shadow-xl hover:shadow-blue-200 transition-all">
            Sign In
          </button>

          <div className="flex items-center gap-4 py-4">
            <div className="h-px bg-slate-200 flex-1"></div>
            <span className="text-sm text-slate-400">or</span>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>

          <button className="w-full bg-slate-100 text-slate-700 py-4 px-6 rounded-xl font-medium hover:bg-slate-200 transition-all">
            Create Account
          </button>
        </div>
      </div>
    </div>
  )
}
