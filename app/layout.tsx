import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AppProvider from "@/app/components/providers/AppProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bienvenido | Zeta Banco",
  description: "Módulo de simulación de transferencias internas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}