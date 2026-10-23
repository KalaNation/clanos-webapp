import { create } from 'zustand';

interface DrawerState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  setOpen: (isOpen: boolean) => void;
}

/**
 * Whether the mobile navigation drawer (M43) is open: the app bar opens it and the drawer, far
 * away in the tree, reads it. The pattern for shared UI state; see _docs/adr/0002.
 */
export const useDrawerStore = create<DrawerState>()((set) => ({
  isOpen: false,
  open: () => {
    set({ isOpen: true });
  },
  close: () => {
    set({ isOpen: false });
  },
  setOpen: (isOpen) => {
    set({ isOpen });
  },
}));
