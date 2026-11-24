"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useToast } from "@/components/Toast";
import {
  Sun,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Printer,
  X,
  Phone,
  Trash2,
  Plus,
  Zap,
} from "lucide-react";

interface ProjectItem {
  id: string;
  description: string;
  specification?: string | null;
  quantity: number;
  rate: number;
  amount: number;
}

interface Project {
  id: string;
  projectNumber: string;
  serviceType: string;
  capacity: string;
  systemSizeKw?: number | null;
  brand: string;
  locality: string;
  installationSite: string;
  status: string;
  scheduledDate?: string | Date | null;
  grossCost: number;
  subsidyAmount: number;
  netCost: number;
  notes?: string | null;
  createdAt: string | Date;
  items: ProjectItem[];
}

export function DashboardProjectsClient({
  initialProjects,
  customerName,
  customerPhone,
}: {
  initialProjects: Project[];
  customerName: string;
  customerPhone: string;
}) {
  const { showToast } = useToast();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getStatusStep = (status: string) => {
    switch (status) {
      case "survey_scheduled":
        return 1;
      case "msedcl_paperwork":
        return 2;
      case "installation":
        return 3;
      case "commissioned":
        return 4;
      default:
        return 1;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Your Solar & Water Heater Projects</h2>
          <p className="text-xs text-slate-500">Live MSEDCL net metering and installation tracking</p>
        </div>
        <Link
          href="/dashboard/projects/new"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          Book Another Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
            <Sun className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">No active projects yet</h3>
            <p className="text-xs text-slate-500 mt-1">
              Book your free roof survey with Om Agencies to get customized system sizing and subsidy estimates.
            </p>
          </div>
          <Link
            href="/dashboard/projects/new"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition"
          >
            <Plus className="w-4 h-4" />
            Book Free Roof Survey
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {projects.map((proj) => {
            const step = getStatusStep(proj.status);
            const waText = `*Inquiry regarding Project ${proj.projectNumber}*%0A*Customer:* ${encodeURIComponent(customerName)}%0A*Capacity:* ${encodeURIComponent(proj.capacity)}%0A*Status:* ${encodeURIComponent(proj.status)}%0A%0A_Sent via Om Agencies Dashboard_`;
            const waUrl = `https://wa.me/919423393107?text=${waText}`;

            return (
              <div
                key={proj.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6"
              >
                {/* Project Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-extrabold text-slate-900 text-base">
                        {proj.projectNumber}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {proj.serviceType}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {proj.brand} • Sited at {proj.locality}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedProject(proj)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      View Official Proposal
                    </button>
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition shadow-sm"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      WhatsApp Magar Sir
                    </a>
                  </div>
                </div>

                {/* 4-Stage Visual Progress Bar */}
                <div className="space-y-3">
                  <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider">
                    <span className={step >= 1 ? "text-emerald-700 font-extrabold" : "text-slate-400"}>
                      1. Survey Scheduled
                    </span>
                    <span className={step >= 2 ? "text-emerald-700 font-extrabold" : "text-slate-400"}>
                      2. MSEDCL Paperwork
                    </span>
                    <span className={step >= 3 ? "text-emerald-700 font-extrabold" : "text-slate-400"}>
                      3. Structure & Wiring
                    </span>
                    <span className={step >= 4 ? "text-emerald-700 font-extrabold" : "text-slate-400"}>
                      4. Commissioned & Subsidy
                    </span>
                  </div>

                  <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden flex">
                    <div
                      className={`h-full transition-all duration-500 ${
                        step === 4 ? "bg-emerald-600" : "bg-emerald-500"
                      }`}
                      style={{ width: `${(step / 4) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Financial Summary Breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 block font-semibold uppercase text-[10px]">
                      Gross Cost
                    </span>
                    <span className="text-sm font-extrabold text-slate-900 font-mono mt-0.5 block">
                      {formatCurrency(proj.grossCost)}
                    </span>
                  </div>
                  <div>
                    <span className="text-emerald-700 block font-semibold uppercase text-[10px]">
                      PM Surya Ghar Subsidy
                    </span>
                    <span className="text-sm font-extrabold text-emerald-700 font-mono mt-0.5 block">
                      - {formatCurrency(proj.subsidyAmount)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold uppercase text-[10px]">
                      Net Cost
                    </span>
                    <span className="text-sm font-extrabold text-slate-900 font-mono mt-0.5 block">
                      {formatCurrency(proj.netCost)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold uppercase text-[10px]">
                      Scheduled Date
                    </span>
                    <span className="text-xs font-bold text-slate-800 mt-0.5 block">
                      {proj.scheduledDate ? formatDate(proj.scheduledDate) : "To Be Scheduled"}
                    </span>
                  </div>
                </div>

                {proj.notes && (
                  <p className="text-xs text-slate-500 bg-amber-50/60 p-3 rounded-xl border border-amber-200/60">
                    <strong className="text-amber-800">Technician Note:</strong> {proj.notes}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Official Proposal Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 no-print">
              <div>
                <span className="font-mono font-bold text-sm text-slate-900">
                  {selectedProject.projectNumber}
                </span>
                <p className="text-[11px] text-slate-500">Official Om Agencies Turnkey EPC Quotation</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print / Save PDF
                </button>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Formal Proposal Sheet */}
            <div className="space-y-6 text-xs text-slate-700">
              <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">OM AGENCIES</h3>
                  <p className="text-[11px] text-slate-600">Plot No. 11, K-Sector, Near D-Mart, N-11 HUDCO, Sambhajinagar</p>
                  <p className="text-[11px] text-slate-500">GSTIN: 27ASIPM4616L1ZD • Phone: +91 94233 93107</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Quotation Date</span>
                  <span className="font-bold text-slate-900">{formatDate(selectedProject.createdAt)}</span>
                </div>
              </div>

              {/* Customer Siting */}
              <div className="grid grid-cols-2 gap-4 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Customer:</span>
                  <p className="font-bold text-slate-900">{customerName}</p>
                  <p className="text-slate-500">{customerPhone}</p>
                  <p className="text-slate-500">{selectedProject.locality}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">System Specifications:</span>
                  <p className="font-bold text-emerald-700 text-sm">{selectedProject.capacity}</p>
                  <p className="text-slate-600">{selectedProject.brand}</p>
                </div>
              </div>

              {/* Scope of Work Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-600">
                    <tr>
                      <th className="py-2 px-3">Item / Scope of Work</th>
                      <th className="py-2 px-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedProject.items.map((item) => (
                      <tr key={item.id}>
                        <td className="py-2.5 px-3">
                          <p className="font-bold text-slate-900">{item.description}</p>
                          {item.specification && (
                            <p className="text-[10px] text-slate-500">{item.specification}</p>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                          {formatCurrency(item.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals & Subsidy Calculation */}
              <div className="flex justify-end pt-2">
                <div className="w-64 space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-slate-600">
                    <span>Gross Benchmark Cost:</span>
                    <span className="font-bold">{formatCurrency(selectedProject.grossCost)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Govt. Subsidy (DBT):</span>
                    <span>- {formatCurrency(selectedProject.subsidyAmount)}</span>
                  </div>
                  <div className="flex justify-between text-slate-900 font-extrabold text-sm pt-2 border-t border-slate-300">
                    <span>Net Out-of-Pocket:</span>
                    <span className="text-emerald-700">{formatCurrency(selectedProject.netCost)}</span>
                  </div>
                </div>
              </div>

              {/* Warranties & Terms */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[10px] text-slate-500 space-y-1">
                <p>• <strong>Solar Modules Warranty:</strong> 25-Year Linear Power Output Performance Warranty (Tier-1 DCR ALMM).</p>
                <p>• <strong>Inverter Warranty:</strong> 5 to 10 Years OEM manufacturer replacement warranty.</p>
                <p>• <strong>MSEDCL Net Metering:</strong> Handled end-to-end by Om Agencies technical team.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
