import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { prisma } from "./prisma";

export const AUTH_COOKIE_NAME = "om_agencies_token";
const JWT_SECRET = process.env.JWT_SECRET || "om-agencies-secret-solar-2026";

export interface TokenPayload {
  id: string;
  email: string;
  role: string;
  name?: string | null;
  locality?: string | null;
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function getCurrentUser(): Promise<TokenPayload | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function getFullUser() {
  const session = await getCurrentUser();
  if (!session) return null;
  return prisma.user.findUnique({
    where: { id: session.id },
    select: {
      id: true,
      email: true,
      name: true,
      phone: true,
      role: true,
      customerType: true,
      locality: true,
      address: true,
      msedclConsumerNo: true,
      sanctionedLoad: true,
      createdAt: true,
    },
  });
}
