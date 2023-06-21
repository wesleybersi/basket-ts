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

const extra = [
  new Emoji("Baguette Bread", "🥖"),
  new Emoji("Cheese Wedge", "🧀"),
  new Emoji("Hamburger", "🍔"),
  new Emoji("Hot Dog", "🌭"),
  new Emoji("Taco", "🌮"),
  new Emoji("Sandwich", "🥪"),
  new Emoji("Pizza", "🍕"),
  new Emoji("Marshmallow", "🍡"),
  new Emoji("Green Salad", "🥗"),
  new Emoji("Bottle of Champagne", "🍾"),
  new Emoji("Grill", "🍖"),
  new Emoji("Sun Umbrella", "⛱️"),
  new Emoji("Barbecue", "🍗"),
  new Emoji("Wine Glass", "🍷"),
  new Emoji("Cupcake", "🧁"),
  new Emoji("Cookie", "🍪"),
  new Emoji("Ice Cream", "🍨"),
  new Emoji("Croissant", "🥐"),
  new Emoji("French Fries", "🍟"),
  new Emoji("Fork and Knife", "🍽️"),
  new Emoji("Tropical Drink", "🍹"),
  new Emoji("Cup with Straw", "🥤"),
  new Emoji("Salt Shaker", "🧂"),
];

export const fastFood: Emoji[] = [
  new Emoji("Hamburger", "🍔"),
  new Emoji("French Fries", "🍟"),
  new Emoji("Hot Dog", "🌭"),
  new Emoji("Pizza", "🍕"),
  new Emoji("Taco", "🌮"),
  new Emoji("Cheeseburger", "🍔"),
];

export const allThemes: Emoji[] = [...fruit, ...veggies, ...extra];
