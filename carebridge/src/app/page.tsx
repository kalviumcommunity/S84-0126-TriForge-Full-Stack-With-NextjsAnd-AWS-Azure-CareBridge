export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center px-6">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            CareBridge
          </h1>

          <p className="text-lg text-slate-300 mb-6">
            A secure and interoperable digital health record platform designed
            to unify fragmented medical records while preserving patient privacy.
          </p>

          <ul className="space-y-3 text-slate-300 mb-8">
            <li>✅ Unified patient medical records</li>
            <li>✅ Consent-based access control</li>
            <li>✅ Secure doctor & patient dashboards</li>
            <li>✅ Privacy-first healthcare data sharing</li>
          </ul>

          <div className="flex gap-4">
            <a
              href="/auth/login"
              className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-6 py-3 rounded-lg transition"
            >
              Get Started
            </a>

            <a
              href="/about"
              className="border border-slate-600 hover:border-slate-400 px-6 py-3 rounded-lg transition"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Right Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Why CareBridge?
          </h2>

          <p className="text-slate-300 mb-4">
            Rural healthcare systems often suffer from fragmented records.
            CareBridge securely connects clinics, doctors, and patients into
            one unified system.
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm text-slate-300">
            <div className="bg-slate-900 rounded-lg p-4">
              🔒 Secure Access
            </div>
            <div className="bg-slate-900 rounded-lg p-4">
              🤝 Interoperable
            </div>
            <div className="bg-slate-900 rounded-lg p-4">
              👩‍⚕️ Doctor-Friendly
            </div>
            <div className="bg-slate-900 rounded-lg p-4">
              🧑‍🤝‍🧑 Patient Controlled
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
