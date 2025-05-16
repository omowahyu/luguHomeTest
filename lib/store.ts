import { create } from "zustand";
import { useQuery } from "@tanstack/react-query";
import { getUsers, User } from "@/lib/api"; // pastikan User didefinisikan

export const useUsersQuery = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
    refetchInterval: 10000,
    refetchOnWindowFocus: true,
    staleTime: 15000,
  });
};

interface FilterState {
  search: string;
  role: string;
  setSearch: (value: string) => void;
  setRole: (value: string) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  search: "",
  role: "all",
  setSearch: (value) => set({ search: value }),
  setRole: (value) => set({ role: value }),
}));

interface UserFormDialogState {
  isOpen: boolean;
  selectedUser: User | null;
  onOpen: (user?: User) => void;
  onClose: () => void;
}

export const useUserFormDialogStore = create<UserFormDialogState>((set) => ({
  isOpen: false,
  selectedUser: null,
  onOpen: (user) => set({ isOpen: true, selectedUser: user ?? null }),
  onClose: () => set({ isOpen: false, selectedUser: null }),
}));
