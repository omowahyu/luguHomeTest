"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import UserFormDialog from "@/components/Templates/UserFormDialog";

import { useUserFormDialogStore, useUserStore } from "@/lib/store";

export default function BasicLayout({ children }: { children: ReactNode }) {
  const { onOpen } = useUserFormDialogStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAF4]">
      <header className="bg-white/10 shadow fixed backdrop-blur-lg w-full z-40">
        <div className="max-w-7xl mx-auto my-6">
          <div className="">
            <h1 className="text-4xl font-bold">hyu's Creations</h1>
            <span className="text-muted-foreground text-sm">
              lugu software - Take Home Test
            </span>
          </div>
        </div>
      </header>

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
      <footer className="px-4 py-3 bg-white border-t text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} made with ❤️ by Wahyudi Chrisdianto
      </footer>
    </div>
  );
}
