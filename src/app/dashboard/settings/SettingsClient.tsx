"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/Toast";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Sun,
  Save,
  LogOut,
  Zap,
  Loader2,
  Building,
} from "lucide-react";

interface UserProps {
  id: string;
  name?: string | null;
  email: string;
  phone?: string | null;
  locality?: string | null;
  address?: string | null;
  msedclConsumerNo?: string | null;
  sanctionedLoad?: number | null;
  customerType: string;
  role: string;
}

export function SettingsClient({ user }: { user: UserProps }) {
  const router = useRouter();
  const { showToast } = useToast();

  const [name, setName] = useState(user.name || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [locality, setLocality] = useState(user.locality || "N-11 HUDCO");
  const [address, setAddress] = useState(user.address || "");
  const [msedclConsumerNo, setMsedclConsumerNo] = useState(user.msedclConsumerNo || "");
  const [sanctionedLoad, setSanctionedLoad] = useState(user.sanctionedLoad || 5.0);
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/user/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          locality,
          address,
          msedclConsumerNo,
          sanctionedLoad,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      showToast("Consumer profile updated successfully", "success");
      router.refresh();
    } catch (err: any) {
      showToast(err.message || "Failed to update profile", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      showToast("Logged out successfully", "info");
      router.push("/login");
      router.refresh();
    } catch {
      router.push("/login");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Consumer & MSEDCL Connection Details
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Keep your light bill consumer number and address updated for seamless net metering and PM Surya Ghar subsidy approval.
        </p>
      </div>

      {/* Showroom Contact Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Sun className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">Om Agencies Showroom</h3>
            <p className="text-xs text-slate-500">
              Plot No. 11, K-Sector, Near D-Mart, N-11 HUDCO, Sambhajinagar
            </p>
            <p className="text-xs font-mono font-bold text-emerald-700 mt-0.5">
              GSTIN: 27ASIPM4616L1ZD • Open till 8:00 PM
            </p>
          </div>
        </div>

        <a
          href="tel:+919423393107"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition"
        >
          <Phone className="w-4 h-4 text-emerald-400" />
          Call Magar Sir
        </a>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
          Consumer Installation Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">
              Consumer Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">
              Contact Mobile Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">
              Sambhajinagar Locality
            </label>
            <select
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="N-11 HUDCO">N-11 HUDCO</option>
              <option value="CIDCO">CIDCO</option>
              <option value="Ulkanagari">Ulkanagari</option>
              <option value="Beed Bypass">Beed Bypass</option>
              <option value="Padegaon">Padegaon</option>
              <option value="MIDC Waluj">MIDC Waluj</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">
              MSEDCL 12-Digit Consumer Number
            </label>
            <input
              type="text"
              value={msedclConsumerNo}
              onChange={(e) => setMsedclConsumerNo(e.target.value)}
              placeholder="015520948123 (from light bill)"
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">
            Installation Site Address / Bunglow / Landmark
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 flex items-center pointer-events-none text-slate-400">
              <MapPin className="w-4 h-4" />
            </div>
            <textarea
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Row House / Bungalow, Street, Landmark, Sambhajinagar"
              className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save Consumer Profile
          </button>
        </div>
      </form>
    </div>
  );
}
