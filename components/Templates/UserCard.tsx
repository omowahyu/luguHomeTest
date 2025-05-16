"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";

import { User, deleteUser } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useUserFormDialogStore } from "@/lib/store";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import UserDelConfirmDialog from "@/components/Templates/UserDelConfirmDialog";

interface UserCardProps {
  user: User;
  onSuccess: () => void;
}

export default function UserCard({ user, onSuccess }: UserCardProps) {
  const { onOpen } = useUserFormDialogStore();
  const [deleting, setDeleting] = useState(false);
  const [imgError, setImgError] = useState(false);

  const avatarUrl = imgError
    ? `https://api.dicebear.com/7.x/initials/png?seed=${encodeURIComponent(user.name)}`
    : user.avatar;

  const handleConfirmDelete = async () => {
    setDeleting(true);
    try {
      await deleteUser(user.id);
      toast.success("User deleted");
      onSuccess();
    } catch {
      toast.error("Failed to delete user");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <motion.div
      layout
      whileHover="hover"
      transition={{
        layout: {
          type: "spring",
          stiffness: 100,
          damping: 18,
        },
      }}
      className="relative group w-full bg-white rounded-xl shadow/5 p-4 flex items-center gap-6 border border-lime-300/0 active:border-lime-300 hover:border-lime-300 transition-all ease-in-out"
    >
      {/* Avatar */}
      <img
        src={avatarUrl}
        onError={() => setImgError(true)}
        alt={user.name}
        className="h-32 aspect-square rounded-xl object-cover"
      />

      {/* Delete Button */}
      <div className="md:opacity-0 md:group-hover:opacity-100 overflow-hidden absolute top-1 right-1 md:-top-2 md:-right-2 transition-all ease-in-out delay-100">
        <UserDelConfirmDialog
          username={user.name}
          onConfirm={async () => {
            await deleteUser(user.id);
            toast.success("User deleted");
            onSuccess();
          }}
          trigger={
            <Button
              variant="destructive"
              size="icon"
              className="w-5 h-5 rounded-full cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 stroke-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </Button>
          }
        />
      </div>

      {/* Profile Info */}
      <div className="overflow-hidden w-full">
        <div className="overflow-auto">
          <span className="text-gray-500/70 text-xs bg-slate-800/10 rounded-full px-2 py-1">
            {user.role}
          </span>
          <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpen(user)}
            disabled={deleting}
            aria-label={`Edit user ${user.name}`}
            className="border border-gray-300 text-gray-700 text-sm font-medium py-4 rounded-lg hover:bg-gray-50 transition"
          >
            Edit
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
