import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { formatCurrency } from "@/lib/utils";
import {
  Sun,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Plus,
  Users,
  TrendingDown,
  Building,
} from "lucide-react";
import { DashboardProjectsClient } from "./DashboardProjectsClient";

export default async function DashboardPage() {
  const session = await getCurrentUser();
  if (!session) return null;

  const [projects, user] = await Promise.all([
    prisma.project.findMany({
      where: { userId: session.id },
      include: { items: true, payments: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.findUnique({
      where: { id: session.id },
    }),
  ]);

  const totalKw = projects.reduce((a, p) => a + (p.systemSizeKw || 0), 0);
  const totalSubsidy = projects.reduce((a, p) => a + p.subsidyAmount, 0);
  const totalNet = projects.reduce((a, p) => a + p.netCost, 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Consumer Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Solar Project Portal
            </h1>
            <span className="text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
              {user?.customerType || "RESIDENTIAL"}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Consumer: <strong className="text-slate-800">{user?.name}</strong> • Locality:{" "}
            <strong>{user?.locality || "Chhatrapati Sambhajinagar"}</strong>
            {user?.msedclConsumerNo && (
              <> • MSEDCL Consumer No: <span className="font-mono font-bold text-slate-800">{user.msedclConsumerNo}</span></>
            )}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/projects/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/20 transition"
          >
            <Plus className="w-4 h-4" />
            Book Free Roof Survey
          </Link>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Solar Capacity Booked
          </span>
          <p className="text-3xl font-extrabold text-slate-900">
            {totalKw > 0 ? `${totalKw} kW` : "1 System"}
          </p>
          <p className="text-xs text-slate-500">{projects.length} project(s) registered</p>
        </div>

        <div className="p-5 rounded-3xl bg-emerald-50 border border-emerald-200 shadow-sm space-y-2">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            PM Surya Ghar Subsidy
          </span>
          <p className="text-3xl font-extrabold text-emerald-800 font-mono">
            {formatCurrency(totalSubsidy)}
          </p>
          <p className="text-xs text-emerald-700">Central Govt DBT Entitlement</p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Net Out-of-Pocket Cost
          </span>
          <p className="text-3xl font-extrabold text-emerald-400 font-mono">
            {formatCurrency(totalNet)}
          </p>
          <p className="text-xs text-slate-400">Total payable after subsidy deduction</p>
        </div>
      </div>

      {/* Interactive Projects Client */}
      <DashboardProjectsClient
        initialProjects={projects}
        customerName={user?.name || "Customer"}
        customerPhone={user?.phone || "+91 94233 93107"}
      />
    </div>
  );
}
