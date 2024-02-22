import { Setter } from "../types";

export function changeBasket(
  set: Setter,
  type: "Primary" | "Secondary",
  index: number
) {
  set((state) => {
    const updatedBaskets = [...state.allBaskets];
    if (state.basketIndex === state.secondaryIndex) {
      state.secondary = [...state.basket];
    } else {
      state.secondary = updatedBaskets[state.secondaryIndex];
    }

    if (type === "Secondary") {
      updatedBaskets[state.secondaryIndex] = [...state.secondary];
      const returnBasket = updatedBaskets[index];
      return {
        basket: updatedBaskets[state.basketIndex],
        secondary: returnBasket,
        allBaskets: updatedBaskets,
        secondaryIndex: index,
      };
    }

    //Save current basket

    updatedBaskets[state.basketIndex] = [...state.basket];
    const returnBasket = updatedBaskets[index];
    return {
      basket: returnBasket,
      secondary: updatedBaskets[state.secondaryIndex],
      allBaskets: updatedBaskets,
      basketIndex: index,
    };
  });
}
