import type { Metadata } from "next";
import { inter } from '@/components/ui/fonts';
import "./globals.css";
import Header from "../components/ui/header";
import { getSession } from "../lib/session";

export const metadata: Metadata = {
  title: "TechZone",
  description: "A store for laptops",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  const isAuthenticated = !!session;

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${inter.className} antialiased`}
        suppressHydrationWarning={true}
      >
        <Header isAuthenticated={isAuthenticated} />
        {children}
      </body>
    </html>
  );
}
