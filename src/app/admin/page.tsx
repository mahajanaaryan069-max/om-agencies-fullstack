import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Sun,
  ShieldCheck,
  CheckCircle2,
  Users,
  Zap,
  TrendingUp,
  ArrowLeft,
  Phone,
  Clock,
  MapPin,
} from "lucide-react";
import { AdminProjectsManagerClient } from "./AdminProjectsManagerClient";

export default async function AdminPage() {
  const session = await getCurrentUser();
  if (!session) {
    redirect("/login?callbackUrl=/admin");
  }

  if (session.role !== "admin") {
    redirect("/dashboard");
  }

  // Aggregate Admin Metrics
  const [
    totalUsers,
    totalProjects,
    commissionedProjects,
    totalKwSum,
    subsidySum,
    usersList,
    allProjects,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.project.count(),
    prisma.project.count({ where: { status: "commissioned" } }),
    prisma.project.aggregate({ _sum: { systemSizeKw: true } }),
    prisma.project.aggregate({ _sum: { subsidyAmount: true } }),
    prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        locality: true,
        msedclConsumerNo: true,
        customerType: true,
        createdAt: true,
        _count: { select: { projects: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
    prisma.project.findMany({
      include: {
        user: { select: { name: true, phone: true, locality: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 lg:p-10 space-y-8">
      {/* Top Admin Header */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
            <Sun className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Om Agencies Admin Operations
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-full">
                PROPRIETOR CONSOLE
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Chhatrapati Sambhajinagar Rooftop Solar EPC & Supreme Water Heater Pipeline
            </p>
          </div>
        </div>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Customer View
        </Link>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Admin Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <span className="text-xs text-slate-400 font-bold uppercase block">
              Sambhajinagar Consumers
            </span>
            <p className="text-3xl font-extrabold text-white">{totalUsers}</p>
            <p className="text-xs text-slate-400">N-11 HUDCO, CIDCO, Ulkanagari</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <span className="text-xs text-slate-400 font-bold uppercase block">
              Total Solar Capacity
            </span>
            <p className="text-3xl font-extrabold text-emerald-400">
              {totalKwSum._sum.systemSizeKw || 0} kW
            </p>
            <p className="text-xs text-slate-400">Active project pipeline</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <span className="text-xs text-emerald-400 font-bold uppercase block">
              Total Subsidy Facilitated
            </span>
            <p className="text-3xl font-extrabold text-emerald-400 font-mono">
              {formatCurrency(subsidySum._sum.subsidyAmount || 0)}
            </p>
            <p className="text-xs text-slate-400">PM Surya Ghar DBT Claims</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <span className="text-xs text-slate-400 font-bold uppercase block">
              Completed Commissioning
            </span>
            <p className="text-3xl font-extrabold text-white">{commissionedProjects}</p>
            <p className="text-xs text-emerald-400 font-medium">{totalProjects} total bookings</p>
          </div>
        </div>

        {/* Live Project Pipeline Management Client */}
        <AdminProjectsManagerClient initialProjects={allProjects} />

        {/* Consumer Directory Table */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-3xl overflow-hidden shadow-lg space-y-4">
          <div className="p-5 border-b border-slate-700 flex justify-between items-center">
            <div>
              <h2 className="text-base font-bold text-white">Registered Consumers Directory</h2>
              <p className="text-xs text-slate-400">Homeowners & commercial installations</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded-lg">
              {usersList.length} Consumers
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/60 text-slate-400 uppercase font-semibold border-b border-slate-700">
                <tr>
                  <th className="py-3 px-5">Name & Phone</th>
                  <th className="py-3 px-4">Locality</th>
                  <th className="py-3 px-4">MSEDCL Consumer No.</th>
                  <th className="py-3 px-4">Projects</th>
                  <th className="py-3 px-5">Registered Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60 font-medium">
                {usersList.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-700/30 transition">
                    <td className="py-3.5 px-5">
                      <p className="font-bold text-white">{u.name || "Consumer"}</p>
                      <p className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {u.phone || "No Phone"}
                      </p>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">{u.locality || "Sambhajinagar"}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-300">
                      {u.msedclConsumerNo || "—"}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-emerald-400 font-bold">
                      {u._count.projects}
                    </td>
                    <td className="py-3.5 px-5 text-slate-400">{formatDate(u.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
