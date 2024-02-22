import { Emoji } from "../../utils/emoji/emojis";
import { Setter } from "../types";

export function pop(set: Setter): void {
  set((state) => {
    const output =
      state.basket.map((item) => ({ ...item } as Emoji)).pop() ??
      ({ title: "undefined", emoji: "❓" } as Emoji);

    return {
      loading: true,
      itemsToRemove:
        output.title !== "undefined" ? [state.basket.length - 1] : [],
      output,
    };
  });
}
