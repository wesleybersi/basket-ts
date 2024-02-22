import { Emoji } from "../../utils/emoji/emojis";
import { Setter } from "../types";

export function copyWithin(set: Setter) {
  set((state) => {
    if (state.basket.length === 0) return {};
    const pasteTarget = state.selection.target ?? 0;

    let copiedItems: Emoji[] = [];

    if (state.selection.start !== undefined) {
      copiedItems = [...state.basket].filter(
        (_, index) =>
          state.selectedIndexes.includes(index) &&
          index < state.basket.length + pasteTarget
      );
    } else {
      copiedItems = [...state.basket];
    }

    let replacements = copiedItems
      .map((item, index) => {
        return { index: index + pasteTarget, replacement: { ...item } };
      })
      .slice(0, state.basket.length - (state.selection.target ?? 0));

    return {
      itemsToReplace: replacements,
      itemsToRemove: [],
      spliceAdd: null,
      spliceRemove: [],
      loading: replacements.length > 0,
    };
  });
}
