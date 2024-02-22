import { Setter } from "../types";

export function reverse(set: Setter) {
  set((state) => {
    if (state.basket.length === 0) return {};
    const reversed = [...state.basket].reverse();
    return {
      loading: true,
      itemsToReplace: reversed.map((item, index) => {
        return { index, replacement: item };
      }),
      output: reversed,
    };
  });
}
