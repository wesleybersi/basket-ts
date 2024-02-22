export function isEmoji(obj: any): obj is Emoji {
  return (
    obj !== null && typeof obj === "object" && "title" in obj && "emoji" in obj
  );
}

export interface Emoji {
  title: string;
  emoji: string;
}

export const fruit: Emoji[] = [
  { title: "Apple", emoji: "🍎" },
  { title: "Grapes", emoji: "🍇" },
  { title: "Watermelon", emoji: "🍉" },
  { title: "Melon", emoji: "🍈" },
  { title: "Tangerine", emoji: "🍊" },
  { title: "Lemon", emoji: "🍋" },
  { title: "Banana", emoji: "🍌" },
  { title: "Pineapple", emoji: "🍍" },
  { title: "Mango", emoji: "🥭" },
  { title: "Apple", emoji: "🍏" },
  { title: "Pear", emoji: "🍐" },
  { title: "Peach", emoji: "🍑" },
  { title: "Cherries", emoji: "🍒" },
  { title: "Strawberry", emoji: "🍓" },
  { title: "Kiwi", emoji: "🥝" },
  { title: "Avocado", emoji: "🥑" },
  { title: "Coconut", emoji: "🥥" },
  { title: "Blueberries", emoji: "🫐" },
];

export const veggies: Emoji[] = [
  { title: "Broccoli", emoji: "🥦" },
  { title: "Eggplant", emoji: "🍆" },
  { title: "Carrot", emoji: "🥕" },
  { title: "Corn", emoji: "🌽" },
  { title: "Hot Pepper", emoji: "🌶" },
  { title: "Corn", emoji: "🌽" },
  { title: "Cucumber", emoji: "🥒" },
  { title: "Leafy Green", emoji: "🥬" },
  { title: "Mushroom", emoji: "🍄" },
  { title: "Potato", emoji: "🥔" },
  { title: "Bell Pepper", emoji: "🫑" },
  { title: "Roasted Sweet Potato", emoji: "🍠" },
  { title: "Tomato", emoji: "🍅" },
  { title: "Green Salad", emoji: "🥗" },
  { title: "Green Olive", emoji: "🫒" },
  { title: "Pea Pod", emoji: "🫛" },
  { title: "Garlic", emoji: "🧄" },
  { title: "Onion", emoji: "🧅" },
  { title: "Ginger", emoji: "🫚" },
];

const extra = [
  { title: "Baguette Bread", emoji: "🥖" },
  { title: "Cheese Wedge", emoji: "🧀" },
  { title: "Hamburger", emoji: "🍔" },
  { title: "Hot Dog", emoji: "🌭" },
  { title: "Taco", emoji: "🌮" },
  { title: "Sandwich", emoji: "🥪" },
  { title: "Pizza", emoji: "🍕" },
  { title: "Marshmallow", emoji: "🍡" },
  { title: "Green Salad", emoji: "🥗" },
  { title: "Bottle of Champagne", emoji: "🍾" },
  { title: "Grill", emoji: "🍖" },
  { title: "Sun Umbrella", emoji: "⛱️" },
  { title: "Barbecue", emoji: "🍗" },
  { title: "Wine Glass", emoji: "🍷" },
  { title: "Cupcake", emoji: "🧁" },
  { title: "Cookie", emoji: "🍪" },
  { title: "Ice Cream", emoji: "🍨" },
  { title: "Croissant", emoji: "🥐" },
  { title: "French Fries", emoji: "🍟" },
  { title: "Fork and Knife", emoji: "🍽️" },
  { title: "Tropical Drink", emoji: "🍹" },
  { title: "Cup with Straw", emoji: "🥤" },
  { title: "Salt Shaker", emoji: "🧂" },
];

export const fastFood: Emoji[] = [
  { title: "Hamburger", emoji: "🍔" },
  { title: "French Fries", emoji: "🍟" },
  { title: "Hot Dog", emoji: "🌭" },
  { title: "Pizza", emoji: "🍕" },
  { title: "Taco", emoji: "🌮" },
  { title: "Cheeseburger", emoji: "🍔" },
];

export const allThemes: Emoji[] = [...fruit, ...veggies, ...extra];
