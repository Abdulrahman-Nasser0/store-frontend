import type { Metadata } from "next";
import { inter } from '@/app/ui/fonts';
import "./globals.css";


export const metadata: Metadata = {
  title: "Laptop Store",
  description: "A store for laptops",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
