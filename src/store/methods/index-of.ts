import { Emoji, isEmoji } from "../../utils/emoji/emojis";
import { Setter } from "../types";

export function indexOf(set: Setter) {
  set((state) => {
    const item = state.parameters.get(0)?.value;
    if (!item || !isEmoji(item)) return {};
    const emojis = state.basket.map((item) => item.emoji);
    const from = state.selection.start ?? 0;
    return {
      loading: true,
      output: emojis.indexOf(item.emoji, from),
      selection: {
        ...state.selection,
        highlight: emojis.indexOf(item.emoji, from),
      },
    };
  });
}
