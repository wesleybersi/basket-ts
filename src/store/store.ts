import { create } from "zustand";

import { Store } from "./types";

export const useStore = create<Store>((set, get) => ({
  settings: { isOpen: false, theme: "Fruit", animationDuration: 250 },
  set,
}));
