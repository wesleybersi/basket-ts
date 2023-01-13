type EmojiGetter = (amount: number, theme?: "fruit" | "veggies") => Emoji[];
type SingleEmojiGetter = (theme?: "fruit" | "veggies") => Emoji;

export const randomEmojis: EmojiGetter = (amount, theme = "fruit") => {
    const emojis = [];
    for (const emoji of new Array(amount)) {
        let chosenTheme: Emoji[] = themes[theme];
        let r = Math.floor(Math.random() * chosenTheme.length);
        emojis.push(new Emoji(chosenTheme[r].title, chosenTheme[r].emoji));
    }

    return emojis;
};

export const randomEmoji: SingleEmojiGetter = (theme = "fruit") => {
    let emoji = { title: "", emoji: "" };
    let chosenTheme: Emoji[] = themes[theme];
    let r = Math.floor(Math.random() * chosenTheme.length);
    emoji = new Emoji(chosenTheme[r].title, chosenTheme[r].emoji);
    return emoji;
};

export class Emoji {
    title;
    emoji;
    constructor(title: string, emoji: string) {
        this.title = title;
        this.emoji = emoji;
    }
}

const themes: { fruit: Emoji[]; veggies: Emoji[] } = {
    fruit: [
        {
            title: "Grapes",
            emoji: "🍇",
        },
        {
            title: "Watermelon",
            emoji: "🍉",
        },
        {
            title: "Melon",
            emoji: "🍈",
        },
        {
            title: "Tangerine",
            emoji: "🍊",
        },
        {
            title: "Lemon",
            emoji: "🍋",
        },
        {
            title: "Banana",
            emoji: "🍌",
        },
        {
            title: "Pineapple",
            emoji: "🍍",
        },
        {
            title: "Mango",
            emoji: "🥭",
        },
        {
            title: "Red Apple",
            emoji: "🍎",
        },
        {
            title: "Green Apple",
            emoji: "🍏",
        },
        {
            title: "Pear",
            emoji: "🍐",
        },
        {
            title: "Peach",
            emoji: "🍑",
        },
        {
            title: "Cherries",
            emoji: "🍒",
        },
        {
            title: "Strawberry",
            emoji: "🍓",
        },
        {
            title: "Kiwi",
            emoji: "🥝",
        },
        {
            title: "Avocado",
            emoji: "🥑",
        },
        {
            title: "Coconut",
            emoji: "🥥",
        },
    ],
    veggies: [
        {
            title: "Eggplant",
            emoji: "🍆",
        },
        {
            title: "Carrot",
            emoji: "🥕",
        },
        {
            title: "Corn",
            emoji: "🌽",
        },
        {
            title: "Hot Pepper",
            emoji: "🌶",
        },
        {
            title: "Corn",
            emoji: "🌽",
        },
        {
            title: "Cucumber",
            emoji: "🥒",
        },
        {
            title: "Leafy Green",
            emoji: "🥬",
        },
        {
            title: "Broccoli",
            emoji: "🥦",
        },

        {
            title: "Mushroom",
            emoji: "🍄",
        },
        {
            title: "Potato",
            emoji: "🥔",
        },
    ],
};
