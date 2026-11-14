"use client";

import React, { useActionState, useState } from "react";
import { loginAction, type LoginActionResult } from "./actions";
import { Lock, Mail, Eye, EyeOff, Loader2, ShieldCheck, AlertCircle } from "lucide-react";

export default function AdminLoginForm() {
  const [state, formAction, isPending] = useActionState<LoginActionResult | null, FormData>(
    loginAction,
    null
  );
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0D1016] p-6 sm:p-8 shadow-2xl text-white">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#1B2A4A] text-[#B98B63] mb-3 shadow-md">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-extrabold uppercase tracking-tight text-white">
          Owner Portal
        </h1>
        <p className="mt-1 text-xs text-zinc-400">
          Sign in to manage products, update inventory, and adjust prices.
        </p>
      </div>

      {/* Error Alert */}
      {state?.error && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-950/40 p-3.5 text-xs text-red-200"
        >
          <AlertCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
          <span className="leading-relaxed">{state.error}</span>
        </div>
      )}

      {/* Login Form */}
      <form action={formAction} className="space-y-4">
        {/* Email Field */}
        <div>
          <label
            htmlFor="admin-email"
            className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5"
          >
            Owner Email
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
              <Mail className="h-5 w-5" />
            </div>
            <input
              id="admin-email"
              name="email"
              type="email"
              inputMode="email"
              required
              autoComplete="email"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              placeholder="owner@sheikhsshop.com"
              className="w-full h-12 rounded-xl border border-white/15 bg-white/5 pl-11 pr-4 text-base sm:text-sm text-white placeholder-zinc-500 transition-colors focus:border-white focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-white"
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="admin-password"
            className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5"
          >
            Password
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
              <Lock className="h-5 w-5" />
            </div>
            <input
              id="admin-password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              placeholder="••••••••••••"
              className="w-full h-12 rounded-xl border border-white/15 bg-white/5 pl-11 pr-12 text-base sm:text-sm text-white placeholder-zinc-500 transition-colors focus:border-white focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 flex h-12 w-12 items-center justify-center text-zinc-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full mt-2 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#1B2A4A] hover:bg-[#141F38] py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Signing In...</span>
            </>
          ) : (
            <span>Sign In to Dashboard</span>
          )}
        </button>
      </form>

      {/* Security Notice */}
      <div className="mt-6 pt-5 border-t border-white/10 text-center">
        <p className="text-[11px] text-zinc-500">
          🔒 Private store administration. Public registration is permanently disabled.
        </p>
      </div>
    </div>
  );
}
