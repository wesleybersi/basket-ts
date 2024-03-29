import themes from "./themes";
import { Emoji } from "./emojis";

export const randomEmojis = (
  amount: number,
  theme: "Fruit" | "Veggies" | "All" = "All"
): Emoji[] => {
  const emojis = [];
  for (const emoji of new Array(amount)) {
    const chosenTheme = themes.get(theme);
    if (!chosenTheme) return [];
    let r = Math.floor(Math.random() * chosenTheme.length);
    emojis.push({ title: chosenTheme[r].title, emoji: chosenTheme[r].emoji });
  }

  return emojis;
};

export const randomEmoji = (
  theme: "Fruit" | "Veggies" | "All" = "All"
): Emoji => {
  let emoji = { title: "", emoji: "" };
  const chosenTheme = themes.get(theme);
  if (!chosenTheme) return emoji;
  let r = Math.floor(Math.random() * chosenTheme.length);
  emoji = { title: chosenTheme[r].title, emoji: chosenTheme[r].emoji };
  return emoji;
};
