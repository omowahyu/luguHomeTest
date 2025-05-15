import { useState, useEffect, useCallback } from "react";
import { User, getUsers, updateUser, deleteUser } from "@/lib/api"; // Updated import
import { toast } from "sonner";
import useDialog from "./useDialog";

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { handleOpenDialog } = useDialog();

  const fetchUsers = useCallback(async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      toast.error("Failed to fetch users", { description: "Error" });
    }
  }, []);

  const handleEdit = useCallback(
    (user: User) => {
      handleOpenDialog(user);
    },
    [handleOpenDialog],
  );

  const handleDelete = useCallback(
    async (id: number) => {
      try {
        await deleteUser(id);
        setUsers(users.filter((user) => user.id !== id));
        toast.success("User deleted successfully");
      } catch (error) {
        toast.error("Failed to delete user", { description: "Error" });
      }
    },
    [users],
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, fetchUsers, handleEdit, handleDelete };
};

export default useUsers;
