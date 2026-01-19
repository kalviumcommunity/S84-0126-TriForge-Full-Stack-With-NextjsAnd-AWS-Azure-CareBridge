export default function LoginPage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-slate-950 text-white flex items-center justify-center px-4 py-12">
      <div className="auth-gradient" aria-hidden />
      <div className="floating-dots" aria-hidden />

      <div className="relative w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center glass-card border border-white/10 shadow-2xl px-6 py-8 md:px-10 md:py-12">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 text-emerald-300 px-3 py-1 text-xs font-semibold border border-emerald-500/20">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Secure & HIPAA-ready
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Welcome back to CareBridge
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Access your appointments, patient charts, and care teams in a
              beautifully simple workspace. Your data is protected with
              end-to-end security.
            </p>
          </div>
        </div>

        <div className="space-y-6 rounded-2xl bg-slate-900/50 border border-white/10 p-6 md:p-8 shadow-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Login</h2>
            <div className="shimmer-badge">New UI</div>
          </div>
          <form className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm text-slate-200">Email</label>
              <input
                type="email"
                placeholder="doctor@carebridge.com"
                className="fancy-input"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-200">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="fancy-input"
              />
            </div>

          <button type="submit" className="cta-button">
            <span>Login</span>
            <span className="cta-glow" aria-hidden />
          </button>
          </form>

          <p className="text-sm text-slate-400 text-center">
            Don’t have an account?{" "}
            <a
              href="/auth/signup"
              className="text-emerald-300 hover:text-emerald-200 underline-offset-4 hover:underline"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
