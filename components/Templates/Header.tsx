"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

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
          <Link href="/" className="hover:underline transition">
            Home
          </Link>
          <Link href="/about" className="hover:underline transition">
            About
          </Link>
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile dropdown nav */}
      {isOpen && (
        <div className="md:hidden px-4 py-2">
          <nav className="flex flex-col gap-2 text-sm font-medium">
            <Link
              href="/"
              className="hover:underline py-4"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="hover:underline py-4"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
