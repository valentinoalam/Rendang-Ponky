import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <footer className="py-6 h-60 w-full bg-rendang-darkbrown text-white text-center">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <p>© 2023 Rendang Gurih. All rights reserved.</p>
            <p className="text-sm opacity-75 mt-2">Authentic Indonesian cuisine delivered to your doorstep.</p>
          </div>
        </footer>
        {/* bg-rendang-900 */}
        {/* Logo Rendang Ponky  

          Kontak: "Hubungi kami di WhatsApp: 0812-xxx-xxxx"  

          Ikon media sosial (Instagram, Facebook)  

          "© 2025 Rendang Ponky – Kelezatan Tradisi dalam Setiap Gigitan"

          Tujuan: Memberikan informasi kontak dan memperkuat branding.  

          Tips: Jaga desain simpel dan bersih agar tidak mengalihkan perhatian dari CTA utama.
        */}

      </body>
    </html>
  );
}
