import { Emoji, allThemes, fruit, veggies } from "./emojis";

type Theme = "Fruit" | "Veggies" | "All";

const themes = new Map<Theme, Emoji[]>();

themes.set("Fruit", fruit);
themes.set("Veggies", veggies);
themes.set("All", allThemes);

export default themes;
