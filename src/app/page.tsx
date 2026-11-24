import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SolarCalculatorClient } from "./SolarCalculatorClient";
import { RoofSurveyLeadForm } from "./RoofSurveyLeadForm";
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
  Star,
  Clock,
  Phone,
  Award,
  Sparkles,
} from "lucide-react";

export default async function HomePage() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar user={user} />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28 bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Value Prop & Architectural Diagram */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Trust Pills */}
              <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs font-bold">
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-sm flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  4.9★ Google (239+ Reviews)
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  Est. 2010 • 16 Yrs Sambhajinagar Trust
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  Govt. Empanelled EPC
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Chhatrapati Sambhajinagar's Trusted{" "}
                <span className="text-emerald-600 underline decoration-emerald-300 decoration-wavy underline-offset-4">
                  Rooftop Solar & Supreme Water Heater
                </span>{" "}
                Specialist
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Direct proprietor accountability from <strong>D. B. Magar</strong>. Don't risk expensive out-of-town ad portals with call-center delays. Get Tier-1 DCR ALMM solar panels, zero-headache MSEDCL net metering, and up to <strong>₹78,000 PM Surya Ghar Govt. Subsidy</strong>.
              </p>

              {/* Custom Architectural SVG Diagram */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center sm:text-left">
                  ⚡ Official MSEDCL Grid-Connected Turnkey Flow
                </p>
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <Sun className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                    <span className="text-slate-800 block text-[11px]">DCR Solar PV</span>
                    <span className="text-[10px] text-slate-400">Tata / Waaree Mono PERC</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <Zap className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                    <span className="text-slate-800 block text-[11px]">Inverter & ACDB</span>
                    <span className="text-[10px] text-slate-400">Grid-Tie Synchronization</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                    <span className="text-emerald-900 block text-[11px]">MSEDCL Net Meter</span>
                    <span className="text-[10px] text-emerald-700">₹78,000 Subsidy Credited</span>
                  </div>
                </div>
              </div>

              {/* Quick Contact & Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="#calculator"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-md transition"
                >
                  Calculate My Subsidy
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                </a>
                <a
                  href="tel:+919423393107"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-sm transition"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  Call Magar Sir: 94233 93107
                </a>
              </div>
            </div>

            {/* Right Column: High-Converting Roof Survey Lead Card */}
            <div className="lg:col-span-5">
              <RoofSurveyLeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 4-Mode Solar Savings, Subsidy & EMI Calculator */}
      <section id="calculator" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Government Benchmark Rates
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              PM Surya Ghar Subsidy & Solar ROI Calculator
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Select your consumer category and monthly MSEDCL electricity bill to view recommended capacity, subsidy entitlement, and 25-year bill savings.
            </p>
          </div>

          <SolarCalculatorClient />
        </div>
      </section>

      {/* Local EPC (Om Agencies) vs Out-of-Town Aggregators (SolarSquare) */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Local Accountability vs. Online Portals
            </h2>
            <h3 className="text-3xl font-extrabold text-slate-900">
              Why Sambhajinagar Homeowners Choose Om Agencies
            </h3>
            <p className="text-slate-600 text-sm">
              Outside ad aggregators spend crores on online ads and outsource to unknown local sub-contractors. We are based right here in N-11 HUDCO.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="py-4 px-6 font-bold">Comparison Feature</th>
                    <th className="py-4 px-6 font-bold text-emerald-400 bg-slate-800">
                      Om Agencies (N-11 HUDCO)
                    </th>
                    <th className="py-4 px-6 font-semibold text-slate-400">
                      Out-of-Town Portals (e.g. SolarSquare)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  <tr className="hover:bg-slate-50/60">
                    <td className="py-4 px-6 font-bold text-slate-900">3 kW Residential Net Cost</td>
                    <td className="py-4 px-6 font-bold text-emerald-700 bg-emerald-50/40">
                      ~₹1,17,000 (Fair Local Benchmark)
                    </td>
                    <td className="py-4 px-6 text-slate-500">
                      ~₹1,55,000 to ₹1,80,000+ (Heavy Ad Margins)
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/60">
                    <td className="py-4 px-6 font-bold text-slate-900">Physical Showroom Accountability</td>
                    <td className="py-4 px-6 font-semibold text-slate-900 bg-emerald-50/40">
                      ✅ Plot No. 11, K-Sector, Near D-Mart, N-11 HUDCO
                    </td>
                    <td className="py-4 px-6 text-slate-500">
                      ❌ Mumbai/Pune Call Center Only
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/60">
                    <td className="py-4 px-6 font-bold text-slate-900">Technician Response Time</td>
                    <td className="py-4 px-6 font-semibold text-slate-900 bg-emerald-50/40">
                      ⚡ Same-Day / Within 2 to 4 Hours
                    </td>
                    <td className="py-4 px-6 text-slate-500">
                      ⏳ 4 to 8 Days (Ticket Escalation)
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/60">
                    <td className="py-4 px-6 font-bold text-slate-900">Direct Warranty & MSEDCL Net Metering</td>
                    <td className="py-4 px-6 font-semibold text-slate-900 bg-emerald-50/40">
                      ✅ Handled End-to-End by D. B. Magar Sir
                    </td>
                    <td className="py-4 px-6 text-slate-500">
                      ⚠️ Outsourced to Third-Party Labor
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Stage MSEDCL Execution Roadmap */}
      <section id="roadmap" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Zero Headache Execution
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Your 4-Stage Journey to Free Solar Electricity
            </h2>
            <p className="text-slate-600 text-sm">
              From roof survey to direct bank subsidy credit, Om Agencies handles every step with MSEDCL.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm">
                01
              </div>
              <h4 className="font-bold text-slate-900 text-base">Free Roof Survey</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Technician arrives at your home in HUDCO, CIDCO, or Ulkanagari to measure shadow-free roof area, orientation, and load profile.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm">
                02
              </div>
              <h4 className="font-bold text-slate-900 text-base">MSEDCL Portal Filing</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                We handle the National Solar Portal application, MSEDCL technical feasibility, and DISCOM sanctioned load clearances.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm">
                03
              </div>
              <h4 className="font-bold text-slate-900 text-base">HDG Structure & Wiring</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Installation of hot-dip galvanized elevated structure, Tier-1 DCR ALMM solar panels, grid-tie inverter, and dual SPD earthing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center text-sm">
                04
              </div>
              <h4 className="font-bold text-emerald-950 text-base">Net Meter & Subsidy</h4>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Bi-directional net meter commissioned by MSEDCL. Up to ₹78,000 subsidy credited directly to your bank account via DBT.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews & Sambhajinagar Proof */}
      <section id="reviews" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="flex items-center justify-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Trusted Across Chhatrapati Sambhajinagar
            </h2>
            <p className="text-slate-600 text-sm">
              Verified reviews from Sambhajinagar residents who eliminated their MSEDCL electricity bills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <p className="text-xs text-slate-600 italic leading-relaxed">
                “Installed 3 kW solar with D. B. Magar Sir last year. My MSEDCL bill dropped from ₹4,200 to practically zero. Subsidy of ₹78,000 came straight into my SBI account within 28 days of net meter installation.”
              </p>
              <div className="pt-2 border-t border-slate-100">
                <p className="font-bold text-slate-900 text-xs">Pravin Kulkarni</p>
                <p className="text-[11px] text-slate-500">N-11 HUDCO, Sambhajinagar • 3 kW Tata Solar</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <p className="text-xs text-slate-600 italic leading-relaxed">
                “Got Supreme 220 LPD Glass-Lined Solar Water Heater. Our borewell water in CIDCO is very hard, but the glass lining prevents any scaling. Water is steaming hot even in winter mornings.”
              </p>
              <div className="pt-2 border-t border-slate-100">
                <p className="font-bold text-slate-900 text-xs">Anand Deshmukh</p>
                <p className="text-[11px] text-slate-500">CIDCO Sector N-4 • Supreme 220 GL PC</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <p className="text-xs text-slate-600 italic leading-relaxed">
                “Very honest dealing. Magar Sir visited our bungalow personally in Ulkanagari. Transparent quotation with zero hidden fees. Highly recommend Om Agencies to anyone looking for solar.”
              </p>
              <div className="pt-2 border-t border-slate-100">
                <p className="font-bold text-slate-900 text-xs">Sunil Joshi</p>
                <p className="text-[11px] text-slate-500">Ulkanagari, Garkheda • 5 kW Solar PV Plant</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Strip */}
      <section className="py-16 bg-slate-900 text-white text-center space-y-6">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Stop Paying Heavy MSEDCL Electricity Bills Every Month
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Book your free roof survey today or visit our showroom near D-Mart, N-11 HUDCO.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-lg transition"
            >
              Book Free Roof Survey
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/919423393107?text=Hello%20Om%20Agencies,%20I%20want%20to%20enquire%20about%20Rooftop%20Solar%20and%20Supreme%20Water%20Heaters"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition"
            >
              WhatsApp Magar Sir Directly
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
