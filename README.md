# AniList Gallery

Basic Next.js demo that fetches popular anime from the AniList GraphQL API using Apollo Client.

## Getting Started

```bash
npm install
npm run dev
```

## Available Scripts

- `npm run dev` - Start the Next.js dev server with Hot Module Replacement.
- `npm run build` - Create an optimized production build.
- `npm start` - Serve the production build.
- `npm run lint` - Run ESLint with the Next.js configuration.

## Project Layout

| Path | Description |
| --- | --- |
| `app/page.tsx` | Landing page with the gate modal. |
| `app/gallery/page.tsx` | Suspense-enabled gallery route with pagination. |
| `components/MediaCard/*` | Card trigger, modal detail + preview views, and helpers. |
| `components/userContext.tsx` | React context that talks to `/api/session` for profile data. |
| `components/ui/*` | shadcn/ui-inspired primitives (buttons, dialogs, etc.). |
| `lib/apollo-client.ts` | Apollo Client setup shared across the app. |

## Data Flow and Caching

1. `app/gallery/page.tsx` reads the `page` query param and runs `MEDIA_PAGE_QUERY` with `useQuery`.
2. The Apollo cache stores each `Media` node by `id`, so when the user paginates the client only re-fetches missing records.
3. Back/forward navigation is instant because the page parameter mirrors the router state.
4. The detail dialog receives the `MediaItem` object from the list and never needs to re-query.

## Session Handling

- `components/userContext.tsx` bootstraps by calling `/api/session`, which validates the `client_session` cookie against the in-memory `sessionStore`. The API returns `{ authenticated: false }` if the cookie is missing or expired.
- Submitting the user form posts to `/api/register`, which generates a session id, stores the payload on the server, and writes the httpOnly cookie so the gallery route can trust the session without exposing it to client-side scripts.
- Clearing the profile hits `DELETE /api/session`, which removes both the cookie and the stored session record. All navigation that depends on profile data waits for this context to resolve before rendering.

## Rendering Strategy (and Why)

- The shared layout (`app/layout.tsx`) renders as a Server Component for a quick first paint, but both the landing gate and gallery routes opt into `"use client"` so they can use browser-only APIs such as Navigation hooks, cookie-backed fetch calls, Radix dialogs, and Apollo's React hooks.
- All AniList fetching happens on the client via Apollo's `useQuery`. Keeping data access in the browser means we do not expose API calls on the server, we can immediately hydrate from cached user info, and we avoid flashing SSR content for unauthenticated users who would be redirected to the gate anyway.
- Suspense boundaries wrap the gallery route so loading skeletons remain isolated; pagination updates stay client-side for consistent state management and snappy transitions.

## Error Handling

- GraphQL or network failures show an inline alert so the user can retry without leaving the page.
- Guarded navigation ensures routed pages never render until the user gate has persisted profile data; otherwise, visitors get redirected back to the landing screen with an explanatory message.


The footer surfaces "Challenge v3.5" and provides a shortcut to edit your saved profile information at any time.
