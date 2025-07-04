import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
  title: "Resume analyzer",
  description: "Get resume feedback in seconds and search for jobs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="p-4 flex gap-4 shadow justify-center border-b text-xl">
          <Link href="/">Home</Link>
          <p>|</p>
          <Link href="/resume">Resume</Link>
          <p>|</p>
          <Link href="/jobs">Jobs</Link>
        </nav>
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
