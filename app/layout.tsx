import type { Metadata } from "next";
import "./globals.css";
import { ApolloWrapper } from "../lib/apolloWrapper";

export const metadata: Metadata = {
  title: "AniList Gallery",
  description: "Browse popular anime titles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
