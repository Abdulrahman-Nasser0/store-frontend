// lib/session.ts
import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
if (!secretKey) {
  throw new Error("SESSION_SECRET environment variable is required");
}

const encodedKey = new TextEncoder().encode(secretKey);

// Updated session payload to include user info
type SessionPayload = {
  userId: string;
  email: string;
  name: string;
  token: string; // Backend JWT token
  expiresAt: Date;
};

export async function createSession(userId: string, email: string, name: string, token: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  const session = await encrypt({ userId, email, name, token, expiresAt });

  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

  if (process.env.NODE_ENV === "development") {
    console.log("🔐 Session created for user:", email, "expires:", expiresAt.toISOString());
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");

  if (process.env.NODE_ENV === "development") {
    console.log("🔓 Session deleted successfully");
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  return await decrypt(session);
}

async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

async function decrypt(session: string | undefined = ""): Promise<SessionPayload | null> {
  try {
    if (!session || session.trim() === "") {
      return null;
    }

    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    
    if (process.env.NODE_ENV === "development") {
      console.log("✅ Session verified for:", payload.email);
    }
    
    return payload as unknown as SessionPayload;
  } catch (error) {
    if (session && session.trim() !== "") {
      console.warn("⚠️ Session verification failed:", error instanceof Error ? error.message : "Unknown error");
    }
    return null;
  }
}