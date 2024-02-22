import { Emoji, isEmoji } from "../../utils/emoji/emojis";
import { Setter } from "../types";

export function unshift(set: Setter) {
  set((state) => {
    const items = [];

    for (const [_, parameter] of state.parameters) {
      if (parameter && isEmoji(parameter?.value))
        items.push({ ...parameter.value } as Emoji);
    }

    if (items.length + state.basket.length > 20)
      return { maxLimitMessage: true };

    const outputAmount: number = [...state.basket].unshift(...items);

    return {
      loading: true,
      basket: [...items, ...state.basket],
      itemsToAdd: items
        .map((_, index) => {
          return index;
        })
        .reverse(),
      output: outputAmount,
    };
  });
}
