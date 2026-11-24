"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/Toast";
import { Sun, ArrowRight, Lock, Mail, Loader2, Phone } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.error || "Login failed. Please check your credentials.", "error");
        setLoading(false);
        return;
      }

      showToast(`Welcome back, ${data.user.name || "Customer"}!`, "success");
      router.push(callbackUrl);
      router.refresh();
    } catch (err) {
      showToast("Network error. Please try again.", "error");
      setLoading(false);
    }
  };

  const loginAsDemo = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="bg-white py-8 px-6 sm:px-10 shadow-xl rounded-3xl border border-slate-200">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Registered Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="rahul@sambhajinagar.in"
              className="block w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Password
            </label>
            <a href="#" className="text-xs font-semibold text-emerald-600 hover:text-emerald-500">
              Forgot?
            </a>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="block w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/20 transition disabled:opacity-50 mt-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Signing In...
            </>
          ) : (
            <>
              <span>Sign In to Project Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* 1-Click Testing Credentials */}
      <div className="mt-6 pt-6 border-t border-slate-100">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center mb-3">
          ⚡ 1-Click Verification Accounts
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            type="button"
            onClick={() => loginAsDemo("rahul@sambhajinagar.in", "customer123")}
            className="p-2.5 text-left border border-slate-200 rounded-xl hover:border-emerald-400 hover:bg-emerald-50/50 transition"
          >
            <div className="font-bold text-slate-900 text-xs">Dr. Rahul Shinde</div>
            <div className="text-[10px] text-slate-500">N-11 HUDCO (Homeowner)</div>
          </button>
          <button
            type="button"
            onClick={() => loginAsDemo("dbmagar005@yahoo.co.in", "admin123")}
            className="p-2.5 text-left border border-slate-200 rounded-xl hover:border-slate-800 hover:bg-slate-50 transition"
          >
            <div className="font-bold text-slate-900 text-xs">D. B. Magar Sir</div>
            <div className="text-[10px] text-emerald-600 font-bold">Proprietor (Admin)</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
            <Sun className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-2xl text-slate-900">
            Om Agencies<span className="text-emerald-600">.</span>
          </span>
        </Link>
        <h2 className="text-2xl font-bold text-slate-900">
          Customer & EPC Portal
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Track your MSEDCL solar net metering, installation schedule & Supreme water heater warranty.
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <Suspense fallback={<div className="p-8 text-center text-slate-400 text-sm">Loading login...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
