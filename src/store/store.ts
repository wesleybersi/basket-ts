import { create } from "zustand";

import { Store } from "./types";

export const useStore = create<Store>((set, get) => ({
  settings: { isOpen: false, animationDuration: 250, theme: "Fruit" },
  set,
}));
