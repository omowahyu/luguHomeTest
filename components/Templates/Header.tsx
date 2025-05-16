"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      className={`bg-white/10 shadow fixed backdrop-blur-lg w-full z-40 transition-all ${
        isOpen ? "pb-24" : "pb-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Branding */}
        <div>
          <h1 className="text-2xl md:text-4xl font-bold">
            hyu&apos;s Creations
          </h1>
          <span className="text-muted-foreground text-xs md:text-sm">
            lugu software - Take Home Test
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className={`transition hover:underline ${
                pathname === href ? "font-semibold text-black" : "text-gray-700"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 text-gray-700"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile dropdown nav */}
      {isOpen && (
        <div className="md:hidden px-4 py-2">
          <nav className="flex flex-col gap-2 text-sm font-medium">
            {navItems.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`rounded-md px-2 py-3 hover:bg-gray-100 transition ${
                  pathname === href
                    ? "font-semibold text-black"
                    : "text-gray-700"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
