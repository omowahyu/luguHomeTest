"use client";

import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";

import ScrollSmooth from "./ScrollSmooth";
import Header from "./Header";
import Footer from "./Footer";

export default function BasicLayout({ children }: { children: ReactNode }) {
  return (
    <ScrollSmooth>
      <div className="min-h-screen flex flex-col bg-[#F9FAF4]">
        <Header />
        <main className=" p-4 w-full max-w-5xl mx-auto mt-40">
          <Toaster />
          <div className="min-h-screen">{children}</div>
        </main>
        <Footer />
      </div>
    </ScrollSmooth>
  );
}
