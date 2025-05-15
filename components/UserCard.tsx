import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { User } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUserFormDialogStore } from "@/lib/store";
import { deleteUser } from "@/lib/api";

interface UserCardProps {
  user: User;
  onSuccess: () => void;
}

export default function UserCard({ user, onSuccess }: UserCardProps) {
  const { onOpen } = useUserFormDialogStore();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteUser(user.id);
      toast.success("User deleted");
      onSuccess();
    } catch {
      toast.error("Failed to delete user");
    } finally {
      setDeleting(false); // ensure reset on both success/fail
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
      className="group relative w-full max-w-sm"
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{user.name}</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex items-center space-x-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <p className="text-sm capitalize">{user.role}</p>
            </div>
          </div>
        </CardContent>

        <AnimatePresence>
          <motion.div
            variants={{
              hover: { opacity: 1, height: "auto" },
              initial: { opacity: 0, height: 0 },
            }}
            initial="initial"
            animate="hover"
            exit="initial"
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden"
          >
            <CardFooter className="flex justify-end space-x-2 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onOpen(user)}
                disabled={deleting}
              >
                Edit
              </Button>

              {!deleting && (
                <Button variant="destructive" size="sm" onClick={handleDelete}>
                  Delete
                </Button>
              )}
            </CardFooter>
          </motion.div>
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}
