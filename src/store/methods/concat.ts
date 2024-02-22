import { Setter } from "../types";

export function concat(set: Setter) {
  set((state) => {
    const primary = [...state.basket];
    const secondary = [...state.secondary];
    const output = primary.concat(secondary);

    if (output.length === 0) {
      return {};
    } else if (output.length > 20) {
      return { maxLimitMessage: true };
    } else return { output, loading: true };
  });
}
