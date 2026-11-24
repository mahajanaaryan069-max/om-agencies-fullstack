"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatCurrency, calculatePMSubsidy, calculateSolarLoanEMI } from "@/lib/utils";
import {
  Sun,
  ShieldCheck,
  CheckCircle2,
  Zap,
  ArrowRight,
  TrendingDown,
  Building,
  Home,
  Users,
  Factory,
} from "lucide-react";

export function SolarCalculatorClient() {
  const [mode, setMode] = useState<"residential" | "smart" | "society" | "commercial">("residential");
  const [bill, setBill] = useState<number>(3500);
  const [loanEnabled, setLoanEnabled] = useState<boolean>(true);

  // Compute Recommended System Size based on Monthly Bill
  // At ~₹8.5/unit average MSEDCL tariff, 1 kW produces ~120 units/month = saves ~₹1,020/month
  let recommendedKw = 3.0;
  if (mode === "smart") {
    recommendedKw = 1.0;
  } else if (mode === "society") {
    recommendedKw = Math.max(5, Math.round(bill / 1200));
  } else if (mode === "commercial") {
    recommendedKw = Math.max(10, Math.round(bill / 1400));
  } else {
    // Residential LT-I
    if (bill < 2200) recommendedKw = 1.0;
    else if (bill < 3800) recommendedKw = 2.0;
    else if (bill < 6000) recommendedKw = 3.0;
    else if (bill < 9500) recommendedKw = 5.0;
    else recommendedKw = Math.min(10, Math.round(bill / 1600));
  }

  // Cost calculations
  const benchmarkRate = mode === "commercial" ? 55000 : 65000;
  const grossCost = recommendedKw * benchmarkRate;
  const subsidy = calculatePMSubsidy(recommendedKw, mode);
  const netCost = Math.max(0, grossCost - subsidy);

  // Shadow-Free Roof Area (~95 sq.ft./kW)
  const roofArea = recommendedKw * 95;

  // Monthly 5-Yr Bank Loan EMI
  const monthlyEmi = calculateSolarLoanEMI(netCost, 6.0, 5);

  // Monthly Solar Generation Savings
  const monthlyUnits = recommendedKw * 120;
  const unitRate = mode === "commercial" ? 11.5 : 8.5;
  const monthlySavings = Math.round(monthlyUnits * unitRate);
  const annualSavings = monthlySavings * 12;
  const twentyFiveYearSavings = annualSavings * 25;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden p-6 sm:p-10 space-y-8">
      {/* Mode Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-1.5 bg-slate-100 rounded-2xl">
        <button
          type="button"
          onClick={() => setMode("residential")}
          className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition ${
            mode === "residential"
              ? "bg-emerald-600 text-white shadow-md"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Residential (LT-I)</span>
        </button>

        <button
          type="button"
          onClick={() => setMode("smart")}
          className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition ${
            mode === "smart"
              ? "bg-emerald-600 text-white shadow-md"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>SMART (&lt;100 Units)</span>
        </button>

        <button
          type="button"
          onClick={() => setMode("society")}
          className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition ${
            mode === "society"
              ? "bg-emerald-600 text-white shadow-md"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Housing Society / RWA</span>
        </button>

        <button
          type="button"
          onClick={() => setMode("commercial")}
          className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition ${
            mode === "commercial"
              ? "bg-emerald-600 text-white shadow-md"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Factory className="w-4 h-4" />
          <span>Commercial / MIDC</span>
        </button>
      </div>

      {/* Monthly Bill Slider */}
      <div className="space-y-4 max-w-2xl mx-auto">
        <div className="flex justify-between items-center">
          <label className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider">
            Your Average Monthly MSEDCL Electricity Bill:
          </label>
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono">
            ₹{bill.toLocaleString("en-IN")}
          </span>
        </div>

        <input
          type="range"
          min="1000"
          max={mode === "commercial" ? "50000" : "20000"}
          step="500"
          value={bill}
          onChange={(e) => setBill(Number(e.target.value))}
          className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
        />

        <div className="flex justify-between text-[11px] text-slate-400 font-medium">
          <span>₹1,000 / mo</span>
          <span>₹10,000 / mo</span>
          <span>{mode === "commercial" ? "₹50,000+ / mo" : "₹20,000 / mo"}</span>
        </div>
      </div>

      {/* Output Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Recommended System */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
          <span className="text-xs text-slate-500 font-semibold uppercase block">
            Recommended System
          </span>
          <p className="text-3xl font-extrabold text-slate-900">{recommendedKw} kW</p>
          <p className="text-xs text-slate-500">Requires ~{roofArea} sq.ft. shadow-free roof</p>
        </div>

        {/* Estimated Gross Benchmark Cost */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
          <span className="text-xs text-slate-500 font-semibold uppercase block">
            Gross Turnkey EPC Cost
          </span>
          <p className="text-3xl font-extrabold text-slate-900 font-mono">
            {formatCurrency(grossCost)}
          </p>
          <p className="text-xs text-slate-400">@ ~₹65,000/kW benchmark</p>
        </div>

        {/* Govt Subsidy DBT */}
        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
          <span className="text-xs text-emerald-700 font-semibold uppercase block flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            PM Surya Ghar Subsidy
          </span>
          <p className="text-3xl font-extrabold text-emerald-700 font-mono">
            {formatCurrency(subsidy)}
          </p>
          <p className="text-xs text-emerald-600">Directly credited to consumer bank account</p>
        </div>

        {/* Net Cost */}
        <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-semibold uppercase block">
            Net Out-of-Pocket Cost
          </span>
          <p className="text-3xl font-extrabold text-emerald-400 font-mono">
            {formatCurrency(netCost)}
          </p>
          <p className="text-xs text-slate-300">
            {loanEnabled ? `Or ~₹${monthlyEmi.toLocaleString("en-IN")}/mo Bank Loan EMI` : "One-time net investment"}
          </p>
        </div>
      </div>

      {/* Visual Cost vs Subsidy Split Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-semibold">
          <span className="text-slate-700">Net Cost: {formatCurrency(netCost)}</span>
          <span className="text-emerald-700">Govt Subsidy: {formatCurrency(subsidy)} ({Math.round((subsidy / grossCost) * 100)}%)</span>
        </div>
        <div className="w-full h-3.5 rounded-full bg-slate-200 overflow-hidden flex">
          <div
            className="bg-slate-900 h-full"
            style={{ width: `${(netCost / grossCost) * 100}%` }}
          />
          <div
            className="bg-emerald-500 h-full"
            style={{ width: `${(subsidy / grossCost) * 100}%` }}
          />
        </div>
      </div>

      {/* Long-Term Savings & Bank Loan Summary */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
        <div className="space-y-1">
          <p className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <TrendingDown className="w-4 h-4 text-emerald-600" />
            Estimated 25-Year Cumulative MSEDCL Bill Savings:
          </p>
          <p className="text-xl font-extrabold text-emerald-700 font-mono">
            {formatCurrency(twentyFiveYearSavings)}
          </p>
          <p className="text-slate-500">
            Based on ~{recommendedKw * 120 * 12} units annual generation and 25-year panel performance guarantee.
          </p>
        </div>

        <Link
          href="/signup"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg shadow-emerald-600/25 transition shrink-0"
        >
          Book Free Roof Survey for {recommendedKw} kW
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
