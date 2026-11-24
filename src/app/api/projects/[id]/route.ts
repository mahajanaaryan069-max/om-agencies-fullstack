import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const project = await prisma.project.findFirst({
      where: {
        id: params.id,
        ...(user.role !== "admin" ? { userId: user.id } : {}),
      },
      include: {
        user: true,
        items: true,
        payments: true,
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load project" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existing = await prisma.project.findFirst({
      where: {
        id: params.id,
        ...(user.role !== "admin" ? { userId: user.id } : {}),
      },
    });

    if (!existing) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const body = await request.json();
    const { status, notes, scheduledDate } = body;

    const updated = await prisma.project.update({
      where: { id: existing.id },
      data: {
        ...(status ? { status } : {}),
        ...(notes !== undefined ? { notes } : {}),
        ...(scheduledDate ? { scheduledDate: new Date(scheduledDate) } : {}),
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json({ project: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existing = await prisma.project.findFirst({
      where: {
        id: params.id,
        ...(user.role !== "admin" ? { userId: user.id } : {}),
      },
    });

    if (!existing) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    await prisma.project.delete({ where: { id: existing.id } });
    return NextResponse.json({ success: true, message: "Project deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
