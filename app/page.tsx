"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import UserForm from "@/components/userForm";
import { useUserContext } from "@/components/userContext";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col items-center justify-center px-4 py-10 text-center">
      <Suspense fallback={<p>Loading...</p>}>
        <LandingContent />
      </Suspense>
    </main>
  );
}

const WelcomeLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col items-center gap-6 p-6 max-w-[500px]">
    <h1 className="text-4xl font-semibold tracking-tight">AniList Gallery</h1>
    <p>
      The most popular anime, ranked and updated. Simple. Clean. Easy to
      explore.
    </p>
    {children}
  </div>
);

function LandingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading, saveProfile, clearProfile } = useUserContext();
  const returnTo = searchParams?.get("returnTo") ?? null;
  const targetPath = returnTo ?? "/gallery";

  useEffect(() => {
    if (!loading && user && !returnTo) {
      router.replace("/gallery");
    }
  }, [loading, user, returnTo, router]);

  if (loading) {
    return <p className="text-sm text-foreground/70">Loading...</p>;
  }

  if (user && !returnTo) {
    return (
      <p className="text-sm text-foreground/70">Redirecting to gallery...</p>
    );
  }

  // --- When user exists and came from a specific returnTo ---
  if (user && returnTo) {
    return (
      <WelcomeLayout>
        <UserForm
          ctaLabel="Save Changes"
          defaultName={user.name}
          defaultOccupation={user.occupation}
          showClear
          onClear={clearProfile}
          onSubmit={async (payload) => {
            await saveProfile(payload);
            router.push(targetPath);
          }}
        />

        <Button
          className="w-full max-w-md"
          variant="secondary"
          onClick={() => router.push(targetPath)}
        >
          Back to Gallery
        </Button>
      </WelcomeLayout>
    );
  }

  // --- Default: no user ---
  return (
    <WelcomeLayout>
      <p>Please provide your name and occupation to continue.</p>

      <UserForm
        ctaLabel="Enter"
        showClear
        onClear={clearProfile}
        onSubmit={async (payload) => {
          await saveProfile(payload);
          router.push(targetPath);
        }}
      />
    </WelcomeLayout>
  );
}
