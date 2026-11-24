"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/Toast";
import { Sun, ArrowRight, Lock, Mail, User, Phone, MapPin, Loader2 } from "lucide-react";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialName = searchParams.get("name") || "";
  const initialPhone = searchParams.get("phone") || "";
  const initialLocality = searchParams.get("locality") || "N-11 HUDCO";
  const { showToast } = useToast();

  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(initialPhone);
  const [locality, setLocality] = useState(initialLocality);
  const [msedclConsumerNo, setMsedclConsumerNo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone, locality, msedclConsumerNo }),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.error || "Registration failed", "error");
        setLoading(false);
        return;
      }

      showToast("Account created successfully! Welcome to Om Agencies.", "success");
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      showToast("Network error. Please try again.", "error");
      setLoading(false);
    }
  };

  return (
    <div className="bg-white py-8 px-6 sm:px-10 shadow-xl rounded-3xl border border-slate-200">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
            Consumer Full Name *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Dr. Rahul Shinde"
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Mobile Number *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="98220 12345"
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Locality
            </label>
            <select
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="N-11 HUDCO">N-11 HUDCO</option>
              <option value="CIDCO">CIDCO</option>
              <option value="Ulkanagari">Ulkanagari</option>
              <option value="Beed Bypass">Beed Bypass</option>
              <option value="Padegaon">Padegaon</option>
              <option value="MIDC Waluj">MIDC Waluj</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
            Email Address *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="rahul@sambhajinagar.in"
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
            MSEDCL Consumer Number (Optional)
          </label>
          <input
            type="text"
            value={msedclConsumerNo}
            onChange={(e) => setMsedclConsumerNo(e.target.value)}
            placeholder="015520948123 (from light bill)"
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
            Create Password (min 6 chars) *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition disabled:opacity-50 mt-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin inline mr-1" />
              Registering Consumer Account...
            </>
          ) : (
            <>
              <span>Create Account & Book Roof Survey</span>
              <ArrowRight className="w-4 h-4 inline ml-1" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default function SignupPage() {
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
          Book Survey & Track Subsidy
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Already registered?{" "}
          <Link href="/login" className="font-bold text-emerald-600 hover:underline">
            Sign In here
          </Link>
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <Suspense fallback={<div className="p-8 text-center text-slate-400 text-sm">Loading signup...</div>}>
          <SignupForm />
        </Suspense>
      </div>
    </div>
  );
}
