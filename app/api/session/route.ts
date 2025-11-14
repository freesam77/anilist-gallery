import { cookies } from "next/headers";
import { sessionStore } from "@/lib/sessionStore";

export async function GET() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("client_session")?.value;

  if (!sessionId) {
    return new Response(JSON.stringify({ authenticated: false }), {
      status: 200,
    });
  }

  const session = sessionStore.get(sessionId);

  if (!session) {
    return new Response(JSON.stringify({ authenticated: false }), {
      status: 200,
    });
  }

  return Response.json({
    authenticated: true,
    user: {
      name: session.name,
      occupation: session.occupation,
    },
  });
}

export async function DELETE() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("client_session")?.value;

  if (sessionId) {
    sessionStore.delete(sessionId);
    cookieStore.delete("client_session");
  }

  return Response.json({ ok: true });
}
