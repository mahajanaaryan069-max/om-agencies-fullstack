import React from "react";
import { redirect } from "next/navigation";
import { getCurrentUser, getFullUser } from "@/lib/auth";
import { DashboardNav } from "@/components/DashboardNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentUser();
  if (!session) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const user = await getFullUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      <DashboardNav user={user} />
      <main className="flex-1 pb-20 lg:pb-12 min-w-0 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
