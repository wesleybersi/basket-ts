import { Emoji, fruit, veggies } from "./emojis";

type Theme = "Fruit" | "Veggies";

const themes = new Map<Theme, Emoji[]>();

themes.set("Fruit", fruit);
themes.set("Veggies", veggies);

export default themes;
