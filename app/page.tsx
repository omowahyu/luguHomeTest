"use client";

import { Button } from "@/components/ui/button";
import UserCard from "@/components/UserCard"; // Updated import
import UserFormDialog from "@/components/UserFormDialog"; // Updated import
import useUsers from "@/hooks/useUsers";
import useDialog from "@/hooks/useDialog";
import { Toaster } from "@/components/ui/sonner";

export default function Home() {
  const { users, fetchUsers, handleEdit, handleDelete } = useUsers();
  const { isDialogOpen, handleOpenDialog } = useDialog();

  return (
    <main className="container mx-auto p-4">
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">User Management</h1>
        <Button onClick={() => handleOpenDialog()}>Create User</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      <UserFormDialog />
    </main>
  );
}
