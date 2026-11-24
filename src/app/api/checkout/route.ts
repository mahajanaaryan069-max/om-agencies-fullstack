import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { projectId, amount = 1000, paymentMethod = "upi", notes = "Survey Token Deposit" } = body;

    const transactionId = `OM_PAY_${Date.now()}_${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const payment = await prisma.payment.create({
      data: {
        userId: user.id,
        projectId: projectId || null,
        amount: Number(amount),
        currency: "INR",
        method: paymentMethod,
        status: "completed",
        transactionId,
        notes,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Advance booking token received successfully!",
      payment: {
        id: transactionId,
        amount,
        method: paymentMethod,
        date: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Booking checkout error:", error);
    return NextResponse.json({ error: "Payment recording failed" }, { status: 500 });
  }
}
