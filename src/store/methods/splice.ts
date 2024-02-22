import { Emoji } from "../../utils/emoji/emojis";
import { Setter } from "../types";

export function splice(set: Setter) {
  set((state) => {
    if (state.basket.length === 0) return {};

    const updatedBasket = [...state.basket];
    let output: Emoji[] = [];

    const item1 = state.parameters.get(2)?.value as Emoji;
    const item2 = state.parameters.get(3)?.value as Emoji;
    const items: Emoji[] = [];
    if (item1) items.push(item1);
    if (item2) items.push(item2);

    const itemsToReplace: { index: number; replacement: Emoji }[] = [];
    let itemsToRemove: number[] = [];
    const itemsToAdd: number[] = [];
    let spliceAdd: Emoji | null = null;

    if (state.selection.amount !== undefined) {
      if (
        state.selection.amount > 0 &&
        state.selection.amount >= items.length
      ) {
        items.forEach((item, index) =>
          itemsToReplace.push({
            index: state.selectedIndexes[index],
            replacement: item,
          })
        );
        if (state.selection.amount > 0 && items.length === 0) {
          itemsToRemove = [...state.selectedIndexes];
        }
      } else if (state.selection.amount <= 0) {
        if (items.length > 0) {
          itemsToAdd.push(state.selectedIndexes[0]);
          if (items.length > 1) {
            itemsToAdd.push(state.selectedIndexes[0] + 1);
          }
          updatedBasket.splice(state.selectedIndexes[0], 0, ...items);
        } else {
          return { loading: false };
        }
      } else if (state.selection.amount === 1 && items.length === 2) {
        itemsToReplace.push({
          index: state.selectedIndexes[0],
          replacement: items[0],
        });
        spliceAdd = items[1];
      }

      output = [...updatedBasket].splice(
        state.selectedIndexes[0],
        state.selection.amount,
        ...items
      );
    } else {
      output = [...updatedBasket].splice(state.selectedIndexes[0]);
      itemsToRemove = [...state.selectedIndexes];
    }

    return {
      loading: true,
      basket: updatedBasket,
      itemsToReplace,
      itemsToAdd,
      itemsToRemove,
      spliceRemove: state.selectedIndexes.slice(itemsToReplace.length),
      spliceAdd,
      output,
    };
  });
}
