"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import UserFormDialog from "@/components/Templates/UserFormDialog";

import { useUserFormDialogStore } from "@/lib/store";
import Header from "./Header";
import Footer from "./Footer";

export default function BasicLayout({ children }: { children: ReactNode }) {
  const { onOpen } = useUserFormDialogStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAF4]">
      <Header />
      <main className=" p-4 w-full max-w-5xl mx-auto mt-40">
        <Toaster />
        <div className="flex justify-between  items-center mb-6">
          <h1 className="text-4xl font-medium line-">Platzi API Playground</h1>
          <Button
            className="bg-[#D1EE6E] text-black hover:text-white"
            onClick={() => onOpen()}
          >
            Create User
          </Button>
        </div>
        <div className="min-h-screen">{children}</div>
        <UserFormDialog />
      </main>
      <Footer />
    </div>
  );
}
