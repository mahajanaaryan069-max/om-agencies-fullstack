import React from "react";
import Link from "next/link";
import { Sun, Phone, Mail, MapPin, Clock, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Credentials */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                <Sun className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Om Agencies<span className="text-emerald-500">.</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Highest-rated Rooftop Solar EPC Contractor & Authorized Supreme Solar Water Heater Dealer in Chhatrapati Sambhajinagar.
            </p>
            <div className="text-xs space-y-1 font-mono text-slate-400 pt-1">
              <p>GSTIN: <span className="text-slate-200">27ASIPM4616L1ZD</span></p>
              <p>HSN: <span className="text-slate-200">84211100, 85372000</span></p>
              <p>Proprietor: <span className="text-slate-200">D. B. Magar (Est. 2010)</span></p>
            </div>
          </div>

          {/* Col 2: Services & Solutions */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Solar EPC & Solutions
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/#calculator" className="hover:text-emerald-400 transition">
                  PM Surya Ghar 3 kW EPC (₹78,000 Subsidy)
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-emerald-400 transition">
                  Supreme Glass-Lined Solar Water Heaters
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-emerald-400 transition">
                  ETC Stainless Steel Solar Geysers
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-emerald-400 transition">
                  Housing Society & RWA Solar Solutions
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-emerald-400 transition">
                  Commercial & Industrial Solar Plants
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-emerald-400 transition">
                  Same-Day Tank Descaling & Repair
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Showroom & Hours */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              HUDCO Showroom & Contact
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  Plot No. 11, K-Sector, Near D-Mart, D-Mart–Rashtrawadi Bhavan Road, N-11 HUDCO, CIDCO, Chhatrapati Sambhajinagar – 431003
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <a href="tel:+919423393107" className="text-white font-bold hover:text-emerald-400">
                  +91 94233 93107
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <a href="mailto:dbmagar005@yahoo.co.in" className="hover:text-emerald-400">
                  dbmagar005@yahoo.co.in
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Monday – Sunday: 10:00 AM – 8:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Local Neighborhoods */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Local Service Coverage
            </h4>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>4.9★ Google (239+ Reviews)</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Rated 4.8★ on Justdial (398 ratings). 16 years of direct proprietor accountability in Sambhajinagar.
                </p>
              </div>

              <div className="pt-1 text-[11px] text-slate-400 flex flex-wrap gap-1.5">
                <span className="bg-slate-800 px-2 py-0.5 rounded">N-11 HUDCO</span>
                <span className="bg-slate-800 px-2 py-0.5 rounded">CIDCO</span>
                <span className="bg-slate-800 px-2 py-0.5 rounded">Ulkanagari</span>
                <span className="bg-slate-800 px-2 py-0.5 rounded">Beed Bypass</span>
                <span className="bg-slate-800 px-2 py-0.5 rounded">Padegaon</span>
                <span className="bg-slate-800 px-2 py-0.5 rounded">MIDC Waluj</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2010–2026 Om Agencies, Chhatrapati Sambhajinagar. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-slate-400">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-400">
              Terms & Subsidy Guidelines
            </Link>
            <Link href="/login" className="text-emerald-400 hover:underline">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
