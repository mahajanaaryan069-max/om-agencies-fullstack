import type { Metadata } from "next";
import { ToastProvider } from "@/components/Toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "Om Agencies — Rooftop Solar EPC & Supreme Solar Water Heaters (Chhatrapati Sambhajinagar)",
  description:
    "Official website for Om Agencies (Est. 2010, D. B. Magar). Authorized Rooftop Solar EPC contractor & Supreme Solar Water Heater dealer in Chhatrapati Sambhajinagar. PM Surya Ghar Subsidy up to ₹78,000.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-emerald-500 selection:text-white">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
