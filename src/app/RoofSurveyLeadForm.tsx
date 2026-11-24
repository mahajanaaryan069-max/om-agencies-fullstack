"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/Toast";
import { ArrowRight, CheckCircle2, Phone, MapPin, Loader2, Calendar } from "lucide-react";

export function RoofSurveyLeadForm() {
  const router = useRouter();
  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [service, setService] = useState("Rooftop Solar EPC (PM Surya Ghar)");
  const [locality, setLocality] = useState("N-11 HUDCO");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate 10-digit mobile
    const cleanMobile = mobile.replace(/\D/g, "");
    if (cleanMobile.length < 10) {
      showToast("Please enter a valid 10-digit mobile number", "error");
      return;
    }

    setLoading(true);

    // Format WhatsApp message to Magar Sir (+91 94233 93107)
    const text = `*New Roof Survey Booking — Om Agencies*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Mobile:* ${cleanMobile}%0A*Service:* ${encodeURIComponent(service)}%0A*Locality:* ${encodeURIComponent(locality)}%0A%0A_Requested via Om Agencies Web Portal_`;
    const whatsappUrl = `https://wa.me/919423393107?text=${text}`;

    showToast("Connecting to Magar Sir's team on WhatsApp...", "success");

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

    // Redirect to signup or login
    setTimeout(() => {
      setLoading(false);
      router.push(`/signup?name=${encodeURIComponent(name)}&phone=${cleanMobile}&locality=${encodeURIComponent(locality)}`);
    }, 1200);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-6 sm:p-8 space-y-6">
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Same-Day Survey in Sambhajinagar
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Book FREE Roof Survey
        </h3>
        <p className="text-xs text-slate-500">
          Get exact shadow analysis, MSEDCL bill offset calculation & subsidy approval.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Your Full Name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Dr. Rahul Shinde"
            className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            10-Digit Mobile Number *
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs font-bold text-slate-500">
              +91
            </span>
            <input
              type="tel"
              required
              maxLength={10}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="98220 12345"
              className="w-full pl-11 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Required Service
          </label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
          >
            <option value="Rooftop Solar EPC (PM Surya Ghar)">Rooftop Solar EPC (PM Surya Ghar up to ₹78,000 Subsidy)</option>
            <option value="Supreme Solar Water Heater (Glass-Lined)">Supreme Solar Water Heater (Glass-Lined Hard Water)</option>
            <option value="Supreme Solar Water Heater (ETC Stainless Steel)">Supreme Solar Water Heater (ETC Stainless Steel)</option>
            <option value="Same-Day Geyser Repair & Descaling">Same-Day Geyser Repair & Tank Descaling</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Sambhajinagar Locality
          </label>
          <select
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
            className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
          >
            <option value="N-11 HUDCO">N-11 HUDCO</option>
            <option value="CIDCO (N-1 to N-9)">CIDCO (N-1 to N-9)</option>
            <option value="Ulkanagari / Garkheda">Ulkanagari / Garkheda</option>
            <option value="Beed Bypass Road">Beed Bypass Road</option>
            <option value="Padegaon / Cantonment">Padegaon / Cantonment</option>
            <option value="MIDC Waluj / Shendra">MIDC Waluj / Shendra</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-4 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg shadow-emerald-600/25 transition flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Routing to Magar Sir...
            </>
          ) : (
            <>
              <span>Book Survey & Get Instant WhatsApp Quote</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        <p className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Zero upfront cost • Technician arrives with calibrated meters</span>
        </p>
      </form>
    </div>
  );
}
