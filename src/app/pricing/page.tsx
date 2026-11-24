"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { formatCurrency } from "@/lib/utils";
import {
  Sun,
  ShieldCheck,
  CheckCircle2,
  Droplet,
  Zap,
  Phone,
  ArrowRight,
  Filter,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: "glass-lined" | "stainless-steel";
  capacity: string;
  tubes: string;
  familySize: "2-4" | "4-6" | "6+";
  price: number;
  priceLabel?: string;
  warranty: string;
  bestFor: string;
}

const SUPREME_PRODUCTS: Product[] = [
  {
    id: "spgl-110",
    name: "Supreme SPGL 110 LPD",
    category: "glass-lined",
    capacity: "110 Liters/Day",
    tubes: "8 Tubes",
    familySize: "2-4",
    price: 15900,
    warranty: "10-Year Inner Tank Warranty",
    bestFor: "Hard borewell water, small families (2-3 members)",
  },
  {
    id: "spgl-165",
    name: "Supreme SPGL 165 LPD",
    category: "glass-lined",
    capacity: "165 Liters/Day",
    tubes: "12 Tubes",
    familySize: "4-6",
    price: 20900,
    warranty: "10-Year Inner Tank Warranty",
    bestFor: "Standard bungalows, 4-5 members",
  },
  {
    id: "gl-165-pc",
    name: "Supreme 165 GL PC (Pressurized)",
    category: "glass-lined",
    capacity: "165 Liters/Day",
    tubes: "16 Tubes Pressurized",
    familySize: "4-6",
    price: 23500,
    priceLabel: "Quote on Request",
    warranty: "10-Year Inner Tank Warranty",
    bestFor: "Jacuzzi / Rain shower pressure pumps",
  },
  {
    id: "gl-220-pc",
    name: "Supreme 220 GL PC (Pressurized)",
    category: "glass-lined",
    capacity: "220 Liters/Day",
    tubes: "21 Tubes Pressurized",
    familySize: "4-6",
    price: 27900,
    warranty: "10-Year Inner Tank Warranty",
    bestFor: "Most popular in Sambhajinagar row houses (4-6 members)",
  },
  {
    id: "gl-270-pc",
    name: "Supreme 270 GL PC (Pressurized)",
    category: "glass-lined",
    capacity: "270 Liters/Day",
    tubes: "26 Tubes Pressurized",
    familySize: "6+",
    price: 29900,
    warranty: "10-Year Inner Tank Warranty",
    bestFor: "Large independent houses (6-8 members)",
  },
  {
    id: "gl-300-pc",
    name: "Supreme 300 GL PC (15-Yr Guarantee)",
    category: "glass-lined",
    capacity: "300 Liters/Day",
    tubes: "30 Tubes Heavy Duty",
    familySize: "6+",
    price: 36500,
    warranty: "15-Year Inner Tank Guarantee",
    bestFor: "Premium bungalows, heavy hot water usage",
  },
  {
    id: "sspc-100",
    name: "Supreme SSPC 100 LPD (ETC)",
    category: "stainless-steel",
    capacity: "100 Liters/Day",
    tubes: "10 Tubes ETC",
    familySize: "2-4",
    price: 15600,
    warranty: "5-Year System Warranty",
    bestFor: "Soft municipal water, budget friendly",
  },
  {
    id: "sspc-150",
    name: "Supreme SSPC 150 LPD (ETC)",
    category: "stainless-steel",
    capacity: "150 Liters/Day",
    tubes: "15 Tubes ETC",
    familySize: "4-6",
    price: 18900,
    warranty: "5-Year System Warranty",
    bestFor: "3-4 members, low maintenance",
  },
  {
    id: "sspc-200",
    name: "Supreme SSPC 200 LPD (ETC)",
    category: "stainless-steel",
    capacity: "200 Liters/Day",
    tubes: "20 Tubes ETC",
    familySize: "4-6",
    price: 24900,
    warranty: "5-Year System Warranty",
    bestFor: "Medium families, high efficiency ETC tubes",
  },
  {
    id: "sspc-250",
    name: "Supreme SSPC 250 LPD (ETC)",
    category: "stainless-steel",
    capacity: "250 Liters/Day",
    tubes: "24 Tubes ETC",
    familySize: "6+",
    price: 29600,
    warranty: "5-Year System Warranty",
    bestFor: "5-7 members with multiple bathrooms",
  },
  {
    id: "sspc-300",
    name: "Supreme SSPC 300 LPD (ETC)",
    category: "stainless-steel",
    capacity: "300 Liters/Day",
    tubes: "30 Tubes ETC",
    familySize: "6+",
    price: 35900,
    warranty: "5-Year System Warranty",
    bestFor: "Joint families, hostels, guest houses",
  },
  {
    id: "sspc-500",
    name: "Supreme SSPC 500 LPD (ETC Commercial)",
    category: "stainless-steel",
    capacity: "500 Liters/Day",
    tubes: "50 Tubes Commercial",
    familySize: "6+",
    price: 55900,
    warranty: "5-Year System Warranty",
    bestFor: "Hotels, hospitals, PG accommodations",
  },
];

export default function PricingPage() {
  const [techFilter, setTechFilter] = useState<string>("all");
  const [familyFilter, setFamilyFilter] = useState<string>("all");

  const filteredProducts = SUPREME_PRODUCTS.filter((p) => {
    const matchTech = techFilter === "all" || p.category === techFilter;
    const matchFamily = familyFilter === "all" || p.familySize === familyFilter;
    return matchTech && matchFamily;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <main className="flex-1 py-12 md:py-20 space-y-20">
        {/* Header Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Verified Factory Rates • N-11 HUDCO Showroom
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Supreme Solar Water Heaters & Rooftop Solar Pricing
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            100% transparent pricing for Chhatrapati Sambhajinagar. Zero hidden installation charges.
          </p>
        </div>

        {/* Section 1: Turnkey Rooftop Solar PV EPC Packages */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-2xl font-bold text-slate-900">
              ⚡ PM Surya Ghar Turnkey Rooftop Solar Packages
            </h2>
            <p className="text-xs text-slate-500">
              Includes DCR Tier-1 Mono PERC panels, grid-tie inverter, HDG elevated structure, MSEDCL liaisoning & net meter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 2 kW Package */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Small Bungalow / Row House
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900">2 kW Grid-Tie</h3>
              <div className="space-y-1 font-mono">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Gross Cost:</span>
                  <span>₹1,30,000</span>
                </div>
                <div className="flex justify-between text-xs text-emerald-600 font-bold">
                  <span>PM Surya Ghar Subsidy:</span>
                  <span>- ₹60,000</span>
                </div>
                <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-slate-100">
                  <span>Net Investment:</span>
                  <span className="text-emerald-700">₹70,000</span>
                </div>
              </div>
              <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                <li>• Saves ~240 units/month (~₹2,040/mo)</li>
                <li>• Requires ~190 sq.ft. shadow-free roof</li>
                <li>• 25-Year performance warranty</li>
              </ul>
              <Link
                href="/signup?service=2kW"
                className="block text-center py-2.5 px-4 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
              >
                Book 2 kW Roof Survey
              </Link>
            </div>

            {/* 3 kW Package (MOST POPULAR) */}
            <div className="p-6 rounded-3xl bg-white border-2 border-emerald-600 shadow-xl space-y-4 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-600 text-white uppercase tracking-wider">
                Max Subsidy Tier
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Most Popular in Sambhajinagar
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900">3 kW Grid-Tie</h3>
              <div className="space-y-1 font-mono">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Gross Benchmark:</span>
                  <span>₹1,95,000</span>
                </div>
                <div className="flex justify-between text-xs text-emerald-600 font-bold">
                  <span>PM Surya Ghar Subsidy:</span>
                  <span>- ₹78,000 (Max)</span>
                </div>
                <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-slate-100">
                  <span>Net Investment:</span>
                  <span className="text-emerald-700 font-extrabold">₹1,17,000</span>
                </div>
              </div>
              <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100 font-medium">
                <li>• Saves ~360 units/month (~₹3,060/mo)</li>
                <li>• Requires ~285 sq.ft. shadow-free roof</li>
                <li>• Tata Power / Waaree DCR ALMM Panels</li>
                <li>• Bank loan EMI: ~₹2,260/mo (5 Yrs)</li>
              </ul>
              <Link
                href="/signup?service=3kW"
                className="block text-center py-3 px-4 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition"
              >
                Book 3 kW Survey (₹78k Subsidy)
              </Link>
            </div>

            {/* 5 kW Package */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Large Villa / Joint Family
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900">5 kW Grid-Tie</h3>
              <div className="space-y-1 font-mono">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Gross Cost:</span>
                  <span>₹3,25,000</span>
                </div>
                <div className="flex justify-between text-xs text-emerald-600 font-bold">
                  <span>Govt. Subsidy:</span>
                  <span>- ₹78,000</span>
                </div>
                <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-slate-100">
                  <span>Net Investment:</span>
                  <span className="text-emerald-700">₹2,47,000</span>
                </div>
              </div>
              <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                <li>• Saves ~600 units/month (~₹5,100/mo)</li>
                <li>• Requires ~475 sq.ft. shadow-free roof</li>
                <li>• Dual MPPT high-efficiency inverter</li>
              </ul>
              <Link
                href="/signup?service=5kW"
                className="block text-center py-2.5 px-4 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
              >
                Book 5 kW Roof Survey
              </Link>
            </div>
          </div>
        </section>

        {/* Section 2: Filterable Supreme Solar Water Heater Catalog (All 12 Verified Models) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                ♨️ Supreme Solar Water Heaters (12 Verified Models)
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Authorized dealer warranty with direct Om Agencies technician installation.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 bg-slate-200/80 p-1 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setTechFilter("all")}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    techFilter === "all" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
                  }`}
                >
                  All Tech
                </button>
                <button
                  onClick={() => setTechFilter("glass-lined")}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    techFilter === "glass-lined" ? "bg-white text-emerald-800 font-bold shadow-sm" : "text-slate-600"
                  }`}
                >
                  Glass-Lined (Hard Water)
                </button>
                <button
                  onClick={() => setTechFilter("stainless-steel")}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    techFilter === "stainless-steel" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
                  }`}
                >
                  SSPC (ETC Stainless)
                </button>
              </div>

              <div className="flex items-center gap-1 bg-slate-200/80 p-1 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setFamilyFilter("all")}
                  className={`px-2.5 py-1.5 rounded-lg transition ${
                    familyFilter === "all" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
                  }`}
                >
                  All Sizes
                </button>
                <button
                  onClick={() => setFamilyFilter("2-4")}
                  className={`px-2.5 py-1.5 rounded-lg transition ${
                    familyFilter === "2-4" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
                  }`}
                >
                  2–4 Pers
                </button>
                <button
                  onClick={() => setFamilyFilter("4-6")}
                  className={`px-2.5 py-1.5 rounded-lg transition ${
                    familyFilter === "4-6" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
                  }`}
                >
                  4–6 Pers
                </button>
                <button
                  onClick={() => setFamilyFilter("6+")}
                  className={`px-2.5 py-1.5 rounded-lg transition ${
                    familyFilter === "6+" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
                  }`}
                >
                  6+ Pers
                </button>
              </div>
            </div>
          </div>

          {/* Catalog Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((p) => {
              const whatsappMsg = `*Inquiry: ${p.name}*%0A*Capacity:* ${p.capacity}%0A*Verified Price:* ${p.priceLabel || "₹" + p.price.toLocaleString("en-IN")}%0A%0A_Sent via Om Agencies Website_`;
              const waUrl = `https://wa.me/919423393107?text=${whatsappMsg}`;

              return (
                <div
                  key={p.id}
                  className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">{p.name}</h3>
                        <span className="text-xs text-slate-500 block">{p.tubes}</span>
                      </div>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          p.category === "glass-lined"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : "bg-blue-50 text-blue-800 border border-blue-200"
                        }`}
                      >
                        {p.category === "glass-lined" ? "Glass-Lined" : "ETC Stainless"}
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1 text-xs">
                      <p className="font-semibold text-slate-700">Capacity: {p.capacity}</p>
                      <p className="text-slate-500">{p.bestFor}</p>
                      <p className="text-emerald-700 font-medium">🛡️ {p.warranty}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                        Verified Rate
                      </span>
                      <span className="text-xl font-extrabold text-slate-900 font-mono">
                        {p.priceLabel ? p.priceLabel : formatCurrency(p.price)}
                      </span>
                    </div>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Order / WhatsApp
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
