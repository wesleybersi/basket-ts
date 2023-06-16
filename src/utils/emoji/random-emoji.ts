import themes from "./themes";
import { Emoji } from "./emojis";

export const randomEmojis = (
  amount: number,
  theme: "Fruit" | "Veggies" = "Fruit"
): Emoji[] => {
  const emojis = [];
  for (const emoji of new Array(amount)) {
    const chosenTheme = themes.get(theme);
    if (!chosenTheme) return [];
    let r = Math.floor(Math.random() * chosenTheme.length);
    emojis.push(new Emoji(chosenTheme[r].title, chosenTheme[r].emoji));
  }

  return emojis;
};

export const randomEmoji = (theme: "Fruit" | "Veggies" = "Fruit"): Emoji => {
  let emoji = { title: "", emoji: "" };
  const chosenTheme = themes.get(theme);
  if (!chosenTheme) return emoji;
  let r = Math.floor(Math.random() * chosenTheme.length);
  emoji = new Emoji(chosenTheme[r].title, chosenTheme[r].emoji);
  return emoji;
};
