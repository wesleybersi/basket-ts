import { Emoji, isEmoji } from "../../utils/emoji/emojis";
import { Setter } from "../types";

export function fill(set: Setter) {
  set((state) => {
    const item = state.parameters.get(0)?.value;
    if (!item || !isEmoji(item)) return {};

    let itemsToReplace: { index: number; replacement: Emoji }[] = [];

    if (state.selection.start !== undefined) {
      itemsToReplace = state.selectedIndexes.map((index) => {
        return { index, replacement: { ...item } };
      });
    } else {
      itemsToReplace = Array.from({ length: state.basket.length }).map(
        (_, index) => {
          return { index, replacement: { ...item } };
        }
      );
    }

    return {
      loading: itemsToReplace.length > 0 ? true : false,
      itemsToReplace,
      output: [...state.basket].fill(
        item,
        state.selectedIndexes[0] ?? undefined,
        state.selectedIndexes[state.selectedIndexes.length - 1] ?? undefined
      ),
    };
  });
}
