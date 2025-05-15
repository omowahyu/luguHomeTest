"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import UserCard from "@/components/UserCard";
import UserFormDialog from "@/components/UserFormDialog";
import { useUserFormDialogStore, useUserStore } from "@/lib/store";

export default function Home() {
  const { onOpen } = useUserFormDialogStore();
  const { users, fetchUsers } = useUserStore();

  useEffect(() => {
    fetchUsers(); // Fetch users on initial render
  }, [fetchUsers]);

  return (
    <main className="container mx-auto p-4">
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">User Management</h1>
        <Button onClick={() => onOpen()}>Create User</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <UserCard key={user.id} user={user} onSuccess={fetchUsers} />
        ))}
      </div>
      <UserFormDialog />
    </main>
  );
}
