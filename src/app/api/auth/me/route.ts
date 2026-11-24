import { NextResponse } from "next/server";
import { getCurrentUser, getFullUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return NextResponse.json({ user: null });
    }

    const fullUser = await getFullUser();
    return NextResponse.json({ user: fullUser });
  } catch (error) {
    return NextResponse.json({ user: null });
  }
}
