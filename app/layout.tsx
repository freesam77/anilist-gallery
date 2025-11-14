import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import UserDetails from "../components/userDetails";
import { UserContextProvider } from "../components/userContext";
import { ApolloWrapper } from "../lib/apolloWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AniList Gallery",
  description: "Responsive gallery powered by AniList GraphQL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col`}
      >
        <UserContextProvider>
          <ApolloWrapper>
            <UserDetails />
            <div className="flex-1">{children}</div>
            <footer className="border-t border-foreground/20 bg-background/80 text-center px-4 py-3 text-sm">
              <span className="text-foreground/70">Challenge v3.5</span>
            </footer>
          </ApolloWrapper>
        </UserContextProvider>
      </body>
    </html>
  );
}
