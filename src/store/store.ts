import { allMethods } from "./methods";
import { create } from "zustand";

import { Store } from "./types";
import { Emoji } from "../utils/emoji/emojis";

export const useStore = create<Store>((set, get) => ({
  loading: false,
  method: allMethods[0],
  basket: [],
  output: [],
  itemsToAdd: [],
  itemsToRemove: [],
  itemsToReplace: [],
  methods: {
    //ANCHOR Methods
    pop: () =>
      set((state) => {
        return {
          loading: true,
          itemsToRemove: [state.basket.length - 1],
          output: [...state.basket].pop(),
        };
      }),
    shift: () =>
      set((state) => {
        console.warn(state.basket);
        return {
          loading: true,
          itemsToRemove: [0],
          output: [...state.basket].shift(),
        };
      }),
    push: () =>
      set((state) => {
        const items = [];
        for (const item of state.parameterValues) {
          if (item instanceof Emoji) items.push(item);
        }
        return {
          loading: true,
          basket: [...state.basket, ...items],
          itemsToAdd: items.map((_, index) => state.basket.length + index),
          output: [...state.basket].push(...items),
        };
      }),
    unshift: () =>
      set((state) => {
        const items = [];
        for (const item of state.parameterValues) {
          if (item instanceof Emoji) items.push(item);
        }
        return {
          loading: true,
          basket: [...items, ...state.basket],
          itemsToAdd: items
            .map((item, index) => {
              return index;
            })
            .reverse(),
          output: [...state.basket].unshift(...items),
        };
      }),
    reverse: () =>
      set((state) => {
        return {};
      }),
    fill: () =>
      set((state) => {
        return {};
      }),
    copyWithin: () =>
      set((state) => {
        return {};
      }),
    splice: () =>
      set((state) => {
        return {};
      }),
    concat: () =>
      set((state) => {
        return {};
      }),
    slice: () =>
      set((state) => {
        return {};
      }),
    includes: () =>
      set((state) => {
        return {};
      }),
    indexOf: () =>
      set((state) => {
        return {};
      }),
    lastIndexOf: () =>
      set((state) => {
        return {};
      }),
    at: () =>
      set((state) => {
        return {};
      }),
    with: () =>
      set((state) => {
        return {};
      }),
  },
  parameterValues: [null, null, null, null],
  settings: { isOpen: false, theme: "Fruit", animationDuration: 250 },
  set,
}));
