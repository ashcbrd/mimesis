"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaWaveSquare, FaMusic, FaBars } from "react-icons/fa";
import { FaFaceGrinStars } from "react-icons/fa6";

import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#f9fcff] via-[#eaf4ff] to-[#d9ebff] text-gray-900 font-sans">
      {/* Mobile Topbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm flex items-center justify-between px-6 py-4">
        <h1 className="text-lg font-extrabold tracking-wide text-blue-600">
          🎙️ Mimesis AI
        </h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FaBars className="text-2xl text-blue-600" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-50 bg-white/70 backdrop-blur-xl border-r border-white/20 shadow-lg transform transition-transform duration-300 ease-in-out
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block`}
      >
        <div className="px-6 py-6 space-y-8">
          <Link
            href="/"
            className="block text-2xl font-extrabold text-blue-600 tracking-wide"
          >
            🎙️ Mimesis AI
          </Link>

          <nav className="space-y-2">
            <NavItem
              href="/synthesize"
              label="Synthesize"
              icon={<FaWaveSquare />}
              active={pathname === "/synthesize"}
              closeSidebar={() => setSidebarOpen(false)}
            />
            <NavItem
              href="/generated-audios"
              label="Generated Audios"
              icon={<FaMusic />}
              active={pathname === "/generated-audios"}
              closeSidebar={() => setSidebarOpen(false)}
            />
            <NavItem
              href="/avatars"
              label="Avatars"
              icon={<FaFaceGrinStars />}
              active={pathname === "/avatars"}
              closeSidebar={() => setSidebarOpen(false)}
            />
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pt-20 px-6 md:pt-8 md:pl-72 transition">{children}</main>
    </div>
  );
}

function NavItem({
  href,
  label,
  icon,
  active,
  closeSidebar,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  closeSidebar?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={closeSidebar}
      className={`flex items-center gap-3 px-4 py-2 rounded-xl font-medium transition
        ${
          active
            ? "bg-blue-100 text-blue-700 shadow-sm"
            : "hover:bg-blue-50 text-gray-800"
        }`}
    >
      {icon}
      {label}
    </Link>
  );
}
