import type { Metadata } from "next";
import { inter } from '@/app/_components/ui/fonts';
import "./globals.css";
import Header from "./_components/ui/header";
import { getSession } from "./lib/session";

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
