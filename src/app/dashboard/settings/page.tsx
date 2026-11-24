import React from "react";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { SettingsClient } from "./SettingsClient";

export default async function SettingsPage() {
  const session = await getCurrentUser();
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.id },
  });

  if (!user) return null;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      <SettingsClient user={user} />
    </div>
  );
}
