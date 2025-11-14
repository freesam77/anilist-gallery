import { cookies } from "next/headers";
import { sessionStore, generateSessionId } from "@/lib/sessionStore";

export async function POST(req: Request) {
  const { name, occupation } = await req.json();

  if (!name || !occupation) {
    return new Response(JSON.stringify({ error: "Missing fields" }), {
      status: 400,
    });
  }

  const sessionId = generateSessionId();

  sessionStore.set(sessionId, {
    name,
    occupation,
    createdAt: Date.now(),
  });

  const cookieStore = await cookies();
  cookieStore.set({
    name: "client_session",
    value: sessionId,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return Response.json({ ok: true });
}
