"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/Toast";
import { formatCurrency, calculatePMSubsidy } from "@/lib/utils";
import {
  ArrowLeft,
  Sun,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Loader2,
  Phone,
} from "lucide-react";

export default function NewProjectPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [serviceType, setServiceType] = useState("Rooftop Solar EPC");
  const [systemSizeKw, setSystemSizeKw] = useState(3.0);
  const [heaterCapacity, setHeaterCapacity] = useState("220 LPD Glass-Lined");
  const [brand, setBrand] = useState("Tata Power Solar (DCR Mono PERC)");
  const [locality, setLocality] = useState("N-11 HUDCO");
  const [installationSite, setInstallationSite] = useState("Row House / Bungalow, Chhatrapati Sambhajinagar");
  const [scheduledDate, setScheduledDate] = useState(
    new Date(Date.now() + 2 * 86400000).toISOString().split("T")[0]
  );
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  // Compute cost and subsidy
  const grossCost =
    serviceType === "Rooftop Solar EPC"
      ? systemSizeKw * 65000
      : serviceType === "Supreme Solar Water Heater"
      ? 27900
      : 1500;

  const subsidy = serviceType === "Rooftop Solar EPC" ? calculatePMSubsidy(systemSizeKw) : 0;
  const netCost = Math.max(0, grossCost - subsidy);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceType,
          capacity: serviceType === "Rooftop Solar EPC" ? `${systemSizeKw} kW Grid-Tie` : heaterCapacity,
          systemSizeKw: serviceType === "Rooftop Solar EPC" ? systemSizeKw : 0,
          brand,
          locality,
          installationSite,
          grossCost,
          scheduledDate,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to book roof survey");

      showToast(`Booking registered! Project #${data.project.projectNumber}`, "success");
      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      showToast(err.message || "Failed to submit booking", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Book Site Survey / Solar EPC Installation
          </h1>
          <p className="text-xs text-slate-500">
            Select your preferred system capacity and scheduled date for Sambhajinagar technician visit.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
        {/* Service Type */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Select Service Type
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              "Rooftop Solar EPC",
              "Supreme Solar Water Heater",
              "Geyser Repair & Descaling",
            ].map((srv) => (
              <button
                key={srv}
                type="button"
                onClick={() => setServiceType(srv)}
                className={`p-3 rounded-2xl text-xs font-bold border text-left transition ${
                  serviceType === srv
                    ? "bg-emerald-50 border-emerald-500 text-emerald-900 shadow-sm"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {srv}
              </button>
            ))}
          </div>
        </div>

        {/* Capacity Selector */}
        {serviceType === "Rooftop Solar EPC" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Solar System Size
              </label>
              <select
                value={systemSizeKw}
                onChange={(e) => setSystemSizeKw(parseFloat(e.target.value))}
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900"
              >
                <option value={1}>1 kW (Saves ~120 units/mo • ₹30,000 Subsidy)</option>
                <option value={2}>2 kW (Saves ~240 units/mo • ₹60,000 Subsidy)</option>
                <option value={3}>3 kW (Saves ~360 units/mo • ₹78,000 Max Subsidy)</option>
                <option value={5}>5 kW (Saves ~600 units/mo • ₹78,000 Subsidy)</option>
                <option value={10}>10 kW (Commercial / Villa • ₹78,000 Subsidy)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Approved Tier-1 PV Module Brand
              </label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
              >
                <option value="Tata Power Solar (DCR Mono PERC)">Tata Power Solar (DCR Mono PERC 545W)</option>
                <option value="Waaree Solar (ALMM Approved)">Waaree Solar (TOPCon Bifacial)</option>
                <option value="Adani Solar (Tier-1 Modules)">Adani Solar (Mono PERC DCR)</option>
              </select>
            </div>
          </div>
        ) : serviceType === "Supreme Solar Water Heater" ? (
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase block">
              Supreme Model & Capacity
            </label>
            <select
              value={heaterCapacity}
              onChange={(e) => setHeaterCapacity(e.target.value)}
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900"
            >
              <option value="110 LPD SPGL (Glass-Lined)">Supreme SPGL 110 LPD (Glass-Lined • ₹15,900)</option>
              <option value="165 LPD SPGL (Glass-Lined)">Supreme SPGL 165 LPD (Glass-Lined • ₹20,900)</option>
              <option value="220 LPD GL PC (Pressurized)">Supreme 220 GL PC (Pressurized • ₹27,900)</option>
              <option value="270 LPD GL PC (Pressurized)">Supreme 270 GL PC (Pressurized • ₹29,900)</option>
              <option value="300 LPD GL PC (15-Yr Guarantee)">Supreme 300 GL PC (15-Yr Tank Guarantee • ₹36,500)</option>
              <option value="200 LPD SSPC (ETC Stainless)">Supreme SSPC 200 LPD (ETC Stainless • ₹24,900)</option>
            </select>
          </div>
        ) : null}

        {/* Site Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
              Sambhajinagar Locality
            </label>
            <select
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
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
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
              Preferred Site Visit Date
            </label>
            <input
              type="date"
              required
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
            Installation Site Address / Landmarks
          </label>
          <input
            type="text"
            required
            value={installationSite}
            onChange={(e) => setInstallationSite(e.target.value)}
            placeholder="Plot / House No, Street name, Near Landmark"
            className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
          />
        </div>

        {/* Live Cost Summary Box */}
        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
            <span>Gross Benchmark Cost:</span>
            <span className="font-mono text-slate-900">{formatCurrency(grossCost)}</span>
          </div>
          {subsidy > 0 && (
            <div className="flex justify-between items-center text-xs font-bold text-emerald-800">
              <span>PM Surya Ghar Direct Subsidy:</span>
              <span className="font-mono">- {formatCurrency(subsidy)}</span>
            </div>
          )}
          <div className="pt-2 border-t border-emerald-200 flex justify-between items-center">
            <span className="font-extrabold text-sm text-slate-900">Net Estimated Investment:</span>
            <span className="font-mono text-xl font-extrabold text-emerald-700">
              {formatCurrency(netCost)}
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-4 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin inline mr-1" />
              Scheduling Survey...
            </>
          ) : (
            <span>Confirm & Schedule Free Site Survey</span>
          )}
        </button>
      </form>
    </div>
  );
}
