import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
if (!secretKey) {
  throw new Error("SESSION_SECRET environment variable is required");
}

const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  const session = await encrypt({ userId, expiresAt });

  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
  });

  if (process.env.NODE_ENV === "development") {
    console.log("🔐 Session created for user:", userId, "expires:", expiresAt.toISOString());
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");

  if (process.env.NODE_ENV === "development") {
    console.log("🔓 Session deleted successfully");
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  return await decrypt(session);
}

type SessionPayload = {
  userId: string;
  expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    if (!session || session.trim() === "") {
      // No session token provided - user is not authenticated
      return null;
    }

    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    
    // Optional: Log successful session verification in development only
    if (process.env.NODE_ENV === "development") {
      console.log("✅ Session verified successfully for user:", payload.userId);
    }
    
    return payload;
  } catch (error) {
    // Only log actual errors, not missing sessions
    if (session && session.trim() !== "") {
      console.warn("⚠️ Session verification failed:", {
        hasSession: !!session,
        sessionLength: session?.length || 0,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString()
      });
    }
    return null;
  }
}