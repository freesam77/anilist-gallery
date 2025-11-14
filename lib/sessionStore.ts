// Simple in-memory session store
// Key = sessionId, Value = user object
export const sessionStore = new Map<
  string,
  { name: string; occupation: string; createdAt: number }
>();

export function generateSessionId() {
  return crypto.randomUUID();
}
