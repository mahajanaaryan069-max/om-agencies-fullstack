"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sun, Menu, X, Phone, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export function Navbar({ user }: { user?: { name?: string | null; role?: string } | null }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<"EN" | "MR">("EN");

  return (
    <>
      {/* Top Policy Announcement Bar */}
      <div className="bg-slate-900 text-slate-200 text-[11px] sm:text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>
              <strong>PM Surya Ghar Subsidy:</strong> Up to ₹78,000 Direct Bank Transfer • 5% Concessional GST • Valid till 31 March 2027
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span>N-11 HUDCO Showroom (Open till 8 PM)</span>
            <a href="tel:+919423393107" className="font-bold text-emerald-400 hover:underline flex items-center gap-1">
              <Phone className="w-3 h-3" />
              +91 94233 93107
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Sun className="w-6 h-6 text-white animate-spin-slow" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 block leading-tight">
                Om Agencies<span className="text-emerald-600">.</span>
              </span>
              <span className="text-[11px] text-slate-500 font-medium block">
                Rooftop Solar & Supreme Water Heaters • Est. 2010
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            <Link href="/" className="hover:text-emerald-600 transition">
              Home
            </Link>
            <Link href="/pricing" className="hover:text-emerald-600 transition">
              Products & Pricing
            </Link>
            <Link href="/#calculator" className="hover:text-emerald-600 transition">
              Subsidy Calculator
            </Link>
            <Link href="/#roadmap" className="hover:text-emerald-600 transition">
              MSEDCL Roadmap
            </Link>
            <Link href="/#reviews" className="hover:text-emerald-600 transition">
              Proof (4.9★ Reviews)
            </Link>
          </nav>

          {/* Right Action & Language Toggle */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Bilingual Toggle */}
            <button
              onClick={() => setLang(lang === "EN" ? "MR" : "EN")}
              className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition"
              title="Toggle English / मराठी"
            >
              {lang === "EN" ? "EN | मराठी" : "मराठी | EN"}
            </button>

            {user ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/20 transition"
              >
                Customer Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/20 transition transform hover:-translate-y-0.5"
                >
                  Book Free Roof Survey
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-semibold text-slate-800 rounded-lg hover:bg-slate-50"
            >
              Home
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-semibold text-slate-800 rounded-lg hover:bg-slate-50"
            >
              Supreme Products & Pricing
            </Link>
            <Link
              href="/#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-semibold text-slate-800 rounded-lg hover:bg-slate-50"
            >
              PM Surya Ghar Subsidy Calculator
            </Link>
            <Link
              href="/#roadmap"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-semibold text-slate-800 rounded-lg hover:bg-slate-50"
            >
              MSEDCL Net Metering Process
            </Link>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
              {user ? (
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 px-4 font-bold text-white bg-emerald-600 rounded-xl shadow-md"
                >
                  Go to Project Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 px-4 font-semibold text-slate-700 border border-slate-200 rounded-xl"
                  >
                    Customer Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-3 px-4 font-bold text-white bg-emerald-600 rounded-xl shadow-md"
                  >
                    Book Free Roof Survey
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
