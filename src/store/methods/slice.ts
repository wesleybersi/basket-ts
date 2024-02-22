import { Setter } from "../types";

export function slice(set: Setter) {
  set((state) => {
    if (state.basket.length === 0) {
      return {
        output: [],
      };
    }
    const output = state.basket.slice(
      state.selection.start ?? undefined,
      state.selection.end ?? undefined
    );

    return {
      loading: output.length > 0,
      output,
      itemsToProcess: state.selectedIndexes,
    };
  });
}
