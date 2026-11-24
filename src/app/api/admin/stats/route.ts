import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Access denied. Om Agencies Admin required." }, { status: 403 });
    }

    const [
      totalUsers,
      residentialUsers,
      commercialUsers,
      totalProjects,
      commissionedProjects,
      totalKwSum,
      subsidySum,
      paymentsSum,
      usersList,
      recentProjects,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { customerType: "residential" } }),
      prisma.user.count({ where: { customerType: "commercial" } }),
      prisma.project.count(),
      prisma.project.count({ where: { status: "commissioned" } }),
      prisma.project.aggregate({ _sum: { systemSizeKw: true } }),
      prisma.project.aggregate({ _sum: { subsidyAmount: true } }),
      prisma.payment.aggregate({ _sum: { amount: true } }),
      prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          locality: true,
          msedclConsumerNo: true,
          customerType: true,
          role: true,
          createdAt: true,
          _count: {
            select: { projects: true },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 20,
      }),
      prisma.project.findMany({
        include: {
          user: { select: { name: true, phone: true, locality: true } },
        },
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
    ]);

    return NextResponse.json({
      stats: {
        totalUsers,
        residentialUsers,
        commercialUsers,
        totalProjects,
        commissionedProjects,
        totalPipelineKw: totalKwSum._sum.systemSizeKw || 0,
        totalGovtSubsidyFacilitated: subsidySum._sum.subsidyAmount || 0,
        totalPaymentsCollected: paymentsSum._sum.amount || 0,
      },
      users: usersList,
      recentProjects,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json({ error: "Failed to load admin statistics" }, { status: 500 });
  }
}
