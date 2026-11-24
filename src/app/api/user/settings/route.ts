import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function PUT(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, phone, locality, address, msedclConsumerNo, sanctionedLoad } = body;

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...(name !== undefined ? { name } : {}),
        ...(phone !== undefined ? { phone } : {}),
        ...(locality !== undefined ? { locality } : {}),
        ...(address !== undefined ? { address } : {}),
        ...(msedclConsumerNo !== undefined ? { msedclConsumerNo } : {}),
        ...(sanctionedLoad !== undefined ? { sanctionedLoad: Number(sanctionedLoad) } : {}),
      },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: updated.id,
        email: updated.email,
        name: updated.name,
        phone: updated.phone,
        locality: updated.locality,
        address: updated.address,
        msedclConsumerNo: updated.msedclConsumerNo,
        customerType: updated.customerType,
        role: updated.role,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update profile settings" }, { status: 500 });
  }
}
