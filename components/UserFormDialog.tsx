"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, createUser, updateUser } from "@/lib/api"; // Updated import
import { UserFormData, userSchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import useDialog from "@/hooks/useDialog";
import useUsers from "@/hooks/useUsers";
// import { useEffect, useState } from "react";

interface UserFormDialogProps {}

export default function UserFormDialog({}: UserFormDialogProps) {
  const { isDialogOpen, handleCloseDialog, selectedUser } = useDialog();
  const { fetchUsers } = useUsers();
  // const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // useEffect(() => {
  //   // Retrieve user ID from localStorage or any other state management solution
  //   // and fetch the user details if needed.
  // }, []);

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: selectedUser?.email || "",
      password: "",
      name: selectedUser?.name || "",
      avatar: selectedUser?.avatar || "",
    },
  });

  const onSubmit = async (data: UserFormData) => {
    try {
      if (selectedUser) {
        await updateUser(selectedUser.id, data);
        toast.success("User updated successfully");
      } else {
        await createUser({
          ...data,
          role: "customer",
          avatar: data.avatar ?? "/next.svg",
        });
        toast.success("User created successfully");
      }
      fetchUsers();
      handleCloseDialog();
      form.reset();
    } catch (error) {
      toast.error("Something went wrong", { description: "Error" });
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {selectedUser ? "Edit User" : "Create User"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar URL (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseDialog}
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
