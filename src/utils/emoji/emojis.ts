export class Emoji {
  title;
  emoji;

  constructor(title: string, emoji: string) {
    this.title = title;
    this.emoji = emoji;
  }
}

export const fruit: Emoji[] = [
  new Emoji("Red Apple", "🍎"),
  new Emoji("Grapes", "🍇"),
  new Emoji("Watermelon", "🍉"),
  new Emoji("Melon", "🍈"),
  new Emoji("Tangerine", "🍊"),
  new Emoji("Lemon", "🍋"),
  new Emoji("Banana", "🍌"),
  new Emoji("Pineapple", "🍍"),
  new Emoji("Mango", "🥭"),
  new Emoji("Green Apple", "🍏"),
  new Emoji("Pear", "🍐"),
  new Emoji("Peach", "🍑"),
  new Emoji("Cherries", "🍒"),
  new Emoji("Strawberry", "🍓"),
  new Emoji("Kiwi", "🥝"),
  new Emoji("Avocado", "🥑"),
  new Emoji("Coconut", "🥥"),
  new Emoji("Blueberries", "🫐"),
];

export const veggies: Emoji[] = [
  new Emoji("Broccoli", "🥦"),
  new Emoji("Eggplant", "🍆"),
  new Emoji("Carrot", "🥕"),
  new Emoji("Corn", "🌽"),
  new Emoji("Hot Pepper", "🌶"),
  new Emoji("Corn", "🌽"),
  new Emoji("Cucumber", "🥒"),
  new Emoji("Leafy Green", "🥬"),
  new Emoji("Mushroom", "🍄"),
  new Emoji("Potato", "🥔"),
  new Emoji("Bell Pepper", "🫑"),
  new Emoji("Roasted Sweet Potato", "🍠"),
  new Emoji("Tomato", "🍅"),
  new Emoji("Green Salad", "🥗"),
  new Emoji("Green Olive", "🫒"),
  new Emoji("Pea Pod", "🫛"),
  new Emoji("Garlic", "🧄"),
  new Emoji("Onion", "🧅"),
  new Emoji("Ginger", "🫚"),
];

export const fastFood: Emoji[] = [
  new Emoji("Hamburger", "🍔"),
  new Emoji("French Fries", "🍟"),
  new Emoji("Hot Dog", "🌭"),
  new Emoji("Pizza", "🍕"),
  new Emoji("Taco", "🌮"),
  new Emoji("Cheeseburger", "🍔"),
];

export const allThemes: Emoji[] = [...fruit, ...veggies];
