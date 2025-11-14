"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserForm from "./userForm";
import { useUserContext } from "./userContext";
import { cn } from "./ui/utils";

export default function UserDetails() {
  const pathname = usePathname();
  const { user, loading, saveProfile, clearProfile } = useUserContext();

  if (pathname === "/") {
    return null;
  }

  const label = loading
    ? "Loading..."
    : user
      ? `Logged in as: ${user.name}`
      : "Set Profile";

  const homeHref =
    pathname && pathname !== "/"
      ? { pathname: "/", query: { returnTo: pathname } }
      : "/";

  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 text-sm">
        <Link
          href={homeHref}
          className={cn(
            buttonVariants({ variant: "secondary", size: "sm" }),
            "shadow-sm"
          )}
        >
          Home
        </Link>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="shadow-sm" disabled={loading}>
              {label}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <p>Update your username and job title.</p>
            <UserForm
              ctaLabel="Save"
              defaultName={user?.name ?? ""}
              defaultOccupation={user?.occupation ?? ""}
              onSubmit={saveProfile}
              onClear={clearProfile}
              showClear={Boolean(user)}
              busy={loading}
            />
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
