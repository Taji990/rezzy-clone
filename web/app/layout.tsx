import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rezzy - AI-Powered Job Search Platform",
  description: "Streamline your job search with AI-powered resume and cover letter generation",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-50`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-slate-900 text-white py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-slate-400">
              © {new Date().getFullYear()} Rezzy. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
