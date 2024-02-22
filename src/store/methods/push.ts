import { Emoji, isEmoji } from "../../utils/emoji/emojis";
import { Setter } from "../types";

export function push(set: Setter) {
  set((state) => {
    const items = [];
    for (const [_, parameter] of state.parameters) {
      if (parameter && isEmoji(parameter.value)) items.push(parameter.value);
    }
    if (items.length + state.basket.length > 20)
      return { maxLimitMessage: true };
    const outputAmount: number = [...state.basket].push(...items);
    return {
      loading: true,
      basket: [...state.basket, ...items],
      itemsToAdd: items.map((_, index) => state.basket.length + index),
      output: outputAmount,
    };
  });
}
