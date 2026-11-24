import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { calculatePMSubsidy } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const whereClause: any = user.role === "admin" ? {} : { userId: user.id };
    if (status && status !== "all") {
      whereClause.status = status;
    }

    const projects = await prisma.project.findMany({
      where: whereClause,
      include: {
        user: { select: { name: true, phone: true, email: true, locality: true } },
        items: true,
        payments: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Fetch projects error:", error);
    return NextResponse.json({ error: "Failed to retrieve projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      serviceType,
      capacity,
      systemSizeKw = 3.0,
      brand = "Tata Power / Waaree Solar",
      locality = "N-11 HUDCO",
      installationSite,
      grossCost = 195000,
      scheduledDate,
      notes,
    } = body;

    const count = await prisma.project.count();
    const projectNumber = `OM-SOLAR-${new Date().getFullYear()}-${String(count + 1).padStart(3, "0")}`;

    // Compute subsidy
    const subsidy = serviceType === "Rooftop Solar EPC" ? calculatePMSubsidy(Number(systemSizeKw)) : 0;
    const netCost = Math.max(0, Number(grossCost) - subsidy);

    const project = await prisma.project.create({
      data: {
        userId: user.id,
        projectNumber,
        serviceType: serviceType || "Rooftop Solar EPC",
        capacity: capacity || `${systemSizeKw} kW`,
        systemSizeKw: Number(systemSizeKw) || 3.0,
        brand,
        locality: locality || "N-11 HUDCO",
        installationSite: installationSite || "Chhatrapati Sambhajinagar",
        status: "survey_scheduled",
        scheduledDate: scheduledDate ? new Date(scheduledDate) : new Date(Date.now() + 2 * 86400000),
        grossCost: Number(grossCost),
        subsidyAmount: subsidy,
        netCost,
        notes: notes || "Free roof survey scheduled with Om Agencies technical team.",
        items: {
          create: [
            {
              description: `${serviceType} — ${capacity || systemSizeKw + " kW"} (${brand})`,
              specification: "Tier-1 DCR ALMM / Supreme Certified",
              quantity: 1,
              rate: Number(grossCost),
              amount: Number(grossCost),
            },
          ],
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error("Create project error:", error);
    return NextResponse.json({ error: "Failed to book project" }, { status: 500 });
  }
}
