"use client";

import Link from "next/link";
import AuthFlipWrapper from "../AuthFlipWrapper";

export default function SignupPage() {
  return (
    <AuthFlipWrapper flipKey="signup">
      <main className="min-h-screen relative overflow-hidden bg-slate-950 text-white flex items-center justify-center px-4 py-12">
        <div className="auth-gradient" aria-hidden />
        <div className="floating-dots" aria-hidden />

        <div className="relative w-full max-w-5xl grid lg:grid-cols-2 gap-10 items-center glass-card border border-white/10 shadow-2xl px-6 py-8 md:px-10 md:py-12">
          {/* Left */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 text-emerald-300 px-3 py-1 text-xs font-semibold border border-emerald-500/20">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Fast onboarding
            </div>

            <h1 className="text-3xl md:text-4xl font-bold">
              Create your CareBridge account
            </h1>

            <p className="text-slate-300 text-sm md:text-base">
              Secure collaboration between doctors and patients — built for
              real-world healthcare.
            </p>
          </div>

          {/* Right */}
          <div className="space-y-6 rounded-2xl bg-slate-900/50 border border-white/10 p-6 md:p-8 shadow-lg">
            <h2 className="text-2xl font-semibold">Sign up</h2>

            <form className="space-y-5">
              <div>
                <label className="text-sm text-slate-200">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="fancy-input"
                />
              </div>

              <div>
                <label className="text-sm text-slate-200">Email</label>
                <input
                  type="email"
                  placeholder="user@carebridge.com"
                  className="fancy-input"
                />
              </div>

              <div>
                <label className="text-sm text-slate-200">Role</label>
                <select className="fancy-input">
                  <option value="">Select role</option>
                  <option value="PATIENT">Patient</option>
                  <option value="DOCTOR">Doctor</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-slate-200">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="fancy-input"
                />
              </div>

              <button type="submit" className="cta-button">
                <span>Sign up</span>
                <span className="cta-glow" aria-hidden />
              </button>
            </form>

            <p className="text-sm text-slate-400 text-center">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-emerald-300 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>
    </AuthFlipWrapper>
  );
}
