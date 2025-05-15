import { create } from "zustand";

interface UserCardState {
  selectedUser: number | null;
  onEditCallback: ((userId: number) => void) | null;
  onDeleteCallback: ((userId: number) => void) | null;
  setEditCallback: (callback: (userId: number) => void) => void;
  setDeleteCallback: (callback: (userId: number) => void) => void;
  onEdit: () => void;
  onDelete: () => void;
}

interface UserFormDialogState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSuccessCallback: (() => void) | null;
  onSuccess: () => void;
  setSuccessCallback: (callback: () => void) => void;
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

export const useUserFormDialogStore = create<UserFormDialogState>(
  (set, get) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    onSuccessCallback: null,
    onSuccess: () => {
      get().onSuccessCallback?.(); // Execute the callback if it exists
      set({ onSuccessCallback: null }); // Reset the callback
    },
    setSuccessCallback: (callback: () => void) => {
      set({ onSuccessCallback: callback });
    },
  }),
);
