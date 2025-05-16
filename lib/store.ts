import { create } from "zustand";
import { useQuery } from "@tanstack/react-query";
import { User, getUsers } from "@/lib/api";

interface UserStore {
  users: User[];
  setUsers: (users: User[]) => void;
  fetchUsers: () => Promise<void>;
}

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

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  fetchUsers: async () => {
    const data = await getUsers();
    set({ users: data });
  },
}));

interface UserCardState {
  selectedUser: number | null;
  onEditCallback: ((userId: number) => void) | null;
  onDeleteCallback: ((userId: number) => void) | null;
  setEditCallback: (callback: (userId: number) => void) => void;
  setDeleteCallback: (callback: (userId: number) => void) => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const useUserCardStore = create<UserCardState>((set, get) => ({
  selectedUser: null,
  onEditCallback: null,
  onDeleteCallback: null,
  setEditCallback: (callback: (userId: number) => void) => {
    set({ onEditCallback: callback });
  },
  setDeleteCallback: (callback: (userId: number) => void) => {
    set({ onDeleteCallback: callback });
  },
  onEdit: () => {
    get().onEditCallback?.(get().selectedUser!); // Execute the callback if it exists
  },
  onDelete: () => {
    get().onDeleteCallback?.(get().selectedUser!); // Execute the callback if it exists
  },
}));

interface UserFormDialogState {
  isOpen: boolean;
  selectedUser: User | null;
  onOpen: (user?: User) => void;
  onClose: () => void;
  onSuccessCallback: (() => void) | null;
  onSuccess: () => void;
  setSuccessCallback: (callback: () => void) => void;
}

export const useUserFormDialogStore = create<UserFormDialogState>(
  (set, get) => ({
    isOpen: false,
    selectedUser: null,
    onOpen: (user?: User) => set({ isOpen: true, selectedUser: user ?? null }),
    onClose: () => set({ isOpen: false, selectedUser: null }),
    onSuccessCallback: null,
    onSuccess: () => {
      get().onSuccessCallback?.();
      set({ onSuccessCallback: null });
    },
    setSuccessCallback: (callback: () => void) => {
      set({ onSuccessCallback: callback });
    },
  }),
);
