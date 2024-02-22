import { Emoji, isEmoji } from "../../utils/emoji/emojis";
import { Setter } from "../types";

export function lastIndexOf(set: Setter) {
  set((state) => {
    const item = state.parameters.get(0)?.value;
    if (!item || !isEmoji(item)) return {};
    const emojis = state.basket.map((item) => item.emoji);
    const fromIndex = state.selection.amount ?? state.basket.length;

    return {
      loading: true,
      output: emojis.lastIndexOf(item.emoji, fromIndex - 1),
      selection: {
        ...state.selection,
        highlight: emojis.lastIndexOf(item.emoji, fromIndex - 1),
      },
    };
  });
}
