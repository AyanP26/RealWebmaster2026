import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "weave.nova | Community Resource Hub",
  description: "Find Trusted Community Resources in Northern Virginia. Discover nonprofits, education programs, healthcare services, workforce opportunities, and local events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased text-neutral selection:bg-primary/20`}>
        {children}
      </body>
    </html>
  );
}
