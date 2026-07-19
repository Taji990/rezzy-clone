"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/auth");
  };

  const isAuthPage = pathname === "/auth";

  return (
    <nav className="bg-white shadow-md">
      <div className="container flex justify-between items-center py-4">
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          Rezzy
        </Link>

        {user && (
          <div className="flex items-center gap-6">
            <Link
              href="/documents"
              className="text-slate-700 hover:text-indigo-600 transition"
            >
              Documents
            </Link>
            <Link
              href="/profile"
              className="text-slate-700 hover:text-indigo-600 transition"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        )}

        {!user && !isAuthPage && (
          <Link href="/auth" className="btn-primary">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
