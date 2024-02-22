import { Emoji, isEmoji } from "../../utils/emoji/emojis";
import { Setter } from "../types";

export function includes(set: Setter) {
  set((state) => {
    const item = state.parameters.get(0)?.value;
    if (!item || !isEmoji(item)) return {};

    let filtered = [];
    let index = -1;
    if (state.selection.start !== undefined) {
      filtered = state.basket.filter(({ title, emoji }, i) => {
        if (emoji === item.emoji && state.selectedIndexes.includes(i)) {
          if (index < 0) index = i;
          return emoji;
        }
      });
    } else {
      filtered = state.basket.filter(({ title, emoji }, i) => {
        if (emoji === item.emoji) {
          console.log(index);
          if (index < 0) index = i;
          return emoji;
        }
      });
    }

    return {
      loading: true,
      selection: {
        ...state.selection,
        highlight: index,
      },
      processSuccesIndex: index,
      itemsToProcess: state.selectedIndexes,
    };
  });
}
