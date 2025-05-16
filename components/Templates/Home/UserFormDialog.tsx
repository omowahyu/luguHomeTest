"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "motion/react";
import { useQueryClient } from "@tanstack/react-query";

import { UserFormData, userSchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogOverlay,
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
import { useUserFormDialogStore } from "@/lib/store";
import { createUser, updateUser } from "@/lib/api";

export default function UserFormDialog() {
  const { isOpen, selectedUser, onClose } = useUserFormDialogStore();
  // Tambahkan ini:
  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      avatar: "",
    },
  });

  const queryClient = useQueryClient();

  const onSubmit = async (data: UserFormData) => {
    try {
      if (selectedUser) {
        await updateUser(selectedUser.id, data);
        toast.success("User updated");
      } else {
        const fallbackAvatar = `https://api.dicebear.com/7.x/initials/png?seed=${encodeURIComponent(
          data.name,
        )}`;
        await createUser({
          ...data,
          role: "customer",
          avatar: data.avatar?.trim() ? data.avatar : fallbackAvatar,
        });
        toast.success("User created");
      }

      await queryClient.invalidateQueries({ queryKey: ["users"] }); // 🟢 Re-fetch list
      onClose();
      form.reset();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogOverlay className="fixed inset-0 bg-black/50 z-40" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              duration: 0.35,
              ease: [0.25, 1, 0.5, 1],
            }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg"
          >
            <DialogHeader>
              <DialogTitle>
                {selectedUser ? "Edit User" : "Create User"}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 mt-4"
              >
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
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit">Save</Button>
                </div>
              </form>
            </Form>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
