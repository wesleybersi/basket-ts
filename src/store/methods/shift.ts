import { Emoji } from "../../utils/emoji/emojis";
import { Setter } from "../types";

export function shift(set: Setter) {
  set((state) => {
    const output =
      state.basket.map((item) => ({ ...item } as Emoji)).shift() ??
      ({ title: "undefined", emoji: "❓" } as Emoji);
    return {
      loading: true,
      itemsToRemove: output.title !== "undefined" ? [0] : [],
      output,
    };
  });
}
