"use client";

import React, { useState } from "react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useToast } from "@/components/Toast";
import {
  Sun,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Phone,
  Trash2,
  Search,
  Filter,
} from "lucide-react";

interface Project {
  id: string;
  projectNumber: string;
  serviceType: string;
  capacity: string;
  brand: string;
  locality: string;
  installationSite: string;
  status: string;
  scheduledDate?: string | Date | null;
  grossCost: number;
  subsidyAmount: number;
  netCost: number;
  createdAt: string | Date;
  user: {
    name?: string | null;
    phone?: string | null;
    locality?: string | null;
    email: string;
  };
}

export function AdminProjectsManagerClient({ initialProjects }: { initialProjects: Project[] }) {
  const { showToast } = useToast();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [filter, setFilter] = useState("all");

  const filtered = projects.filter((p) => {
    if (filter === "all") return true;
    return p.status === filter;
  });

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
      );
      showToast(`Project updated to ${newStatus}`, "success");
    } catch {
      showToast("Could not update project status", "error");
    }
  };

  return (
    <div className="bg-slate-800/80 border border-slate-700 rounded-3xl overflow-hidden shadow-lg space-y-4">
      <div className="p-5 border-b border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white">Turnkey Project Operations Pipeline</h2>
          <p className="text-xs text-slate-400">Advance customer projects through DISCOM liaisoning stages</p>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
          {[
            { id: "all", label: "All" },
            { id: "survey_scheduled", label: "Survey" },
            { id: "msedcl_paperwork", label: "MSEDCL" },
            { id: "installation", label: "Installation" },
            { id: "commissioned", label: "Commissioned" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1 rounded-xl font-bold transition whitespace-nowrap ${
                filter === tab.id
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900/60 text-slate-400 uppercase font-semibold border-b border-slate-700">
            <tr>
              <th className="py-3 px-5">Project #</th>
              <th className="py-3 px-4">Consumer</th>
              <th className="py-3 px-4">Capacity & Brand</th>
              <th className="py-3 px-4">Net Cost</th>
              <th className="py-3 px-4">Current Stage</th>
              <th className="py-3 px-5 text-right">Quick Update Stage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/60 font-medium">
            {filtered.map((proj) => {
              const waText = `Hello ${proj.user.name || "Consumer"}, updating you regarding your ${proj.serviceType} (${proj.projectNumber}) with Om Agencies.`;
              const waUrl = proj.user.phone
                ? `https://wa.me/91${proj.user.phone.replace(/\D/g, "")}?text=${encodeURIComponent(waText)}`
                : "#";

              return (
                <tr key={proj.id} className="hover:bg-slate-700/30 transition">
                  <td className="py-3.5 px-5 font-mono font-bold text-emerald-400">
                    {proj.projectNumber}
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-white">{proj.user.name}</p>
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1 font-mono"
                    >
                      <Phone className="w-3 h-3" />
                      {proj.user.phone}
                    </a>
                    <p className="text-[10px] text-slate-400">{proj.locality}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="text-white font-bold">{proj.capacity}</p>
                    <p className="text-[11px] text-slate-400">{proj.brand}</p>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-white">
                    {formatCurrency(proj.netCost)}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        proj.status === "commissioned"
                          ? "bg-emerald-900/60 text-emerald-300 border border-emerald-700"
                          : proj.status === "installation"
                          ? "bg-blue-900/60 text-blue-300 border border-blue-700"
                          : proj.status === "msedcl_paperwork"
                          ? "bg-amber-900/60 text-amber-300 border border-amber-700"
                          : "bg-slate-700 text-slate-300"
                      }`}
                    >
                      {proj.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <select
                      value={proj.status}
                      onChange={(e) => handleUpdateStatus(proj.id, e.target.value)}
                      className="bg-slate-900 border border-slate-700 text-white rounded-xl py-1.5 px-2.5 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="survey_scheduled">1. Survey Scheduled</option>
                      <option value="msedcl_paperwork">2. MSEDCL Paperwork</option>
                      <option value="installation">3. Mounting & Wiring</option>
                      <option value="commissioned">4. Commissioned & Subsidy</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
