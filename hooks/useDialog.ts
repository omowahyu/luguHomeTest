import { useState, useCallback } from "react";
import { User } from "@/lib/api";

const useDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

  const handleOpenDialog = useCallback((user?: User) => {
    setIsDialogOpen(true);
    setSelectedUser(user);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setIsDialogOpen(false);
    setSelectedUser(undefined);
  }, []);

  return {
    isDialogOpen,
    selectedUser,
    handleOpenDialog,
    handleCloseDialog,
  };
};

export default useDialog;
