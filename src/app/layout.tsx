import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const googleSans = Roboto({
  variable: "--font-google-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"]
});

export const metadata: Metadata = {
  title: "GDG NMIT",
  description: "Google Developer Groups - Nitte Meenakshi Institute of Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${googleSans.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
