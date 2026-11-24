"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sun,
  LayoutDashboard,
  Zap,
  PlusCircle,
  CreditCard,
  Settings,
  LogOut,
  ShieldAlert,
  Phone,
} from "lucide-react";
import { useToast } from "@/components/Toast";

interface UserProp {
  id: string;
  name?: string | null;
  email: string;
  phone?: string | null;
  role: string;
  locality?: string | null;
  msedclConsumerNo?: string | null;
}

export function DashboardNav({ user }: { user: UserProp }) {
  const pathname = usePathname();
  const router = useRouter();
  const { showToast } = useToast();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      showToast("Signed out successfully", "info");
      router.push("/login");
      router.refresh();
    } catch {
      router.push("/login");
    }
  };

  const navLinks = [
    { label: "Overview & Status", href: "/dashboard", icon: LayoutDashboard },
    { label: "Book New Survey", href: "/dashboard/projects/new", icon: PlusCircle },
    { label: "Token Payment", href: "/dashboard/checkout", icon: CreditCard },
    { label: "Consumer Profile", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r border-slate-200 h-screen sticky top-0">
        {/* Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-slate-100 gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20">
            <Sun className="w-4 h-4" />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-slate-900 block leading-tight">
              Om Agencies<span className="text-emerald-600">.</span>
            </span>
            <span className="text-[10px] text-slate-500 font-medium block">
              {user.locality || "Sambhajinagar"}
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                  isActive
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-emerald-600" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* Admin Link if role is admin */}
          {user.role === "admin" && (
            <Link
              href="/admin"
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition mt-4 ${
                pathname.startsWith("/admin")
                  ? "bg-purple-50 text-purple-800 border border-purple-200"
                  : "text-purple-600 hover:bg-purple-50"
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-purple-600" />
              <span>D. B. Magar Admin Center</span>
            </Link>
          )}

          {/* Direct WhatsApp Callout */}
          <div className="mt-8 p-4 rounded-2xl bg-slate-900 text-white space-y-2 text-xs shadow-md">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <Phone className="w-3.5 h-3.5" />
              <span>Direct Support</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Have questions about your roof survey or MSEDCL net meter paperwork?
            </p>
            <a
              href="https://wa.me/919423393107?text=Hello%20Magar%20Sir,%20I%20need%20assistance%20with%20my%20Om%20Agencies%20project"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center py-2 px-3 text-[11px] font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition"
            >
              WhatsApp Magar Sir
            </a>
          </div>
        </div>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs shrink-0">
                {user.name ? user.name.slice(0, 2).toUpperCase() : "OM"}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {user.name || "Consumer"}
                </p>
                <p className="text-[10px] text-slate-500 font-mono truncate">{user.phone || user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Top Navigation */}
      <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-slate-200 h-14 px-4 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
            <Sun className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-sm tracking-tight text-slate-900">
            Om Agencies Portal
          </span>
        </Link>
        <button
          onClick={handleLogout}
          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </>
  );
}
