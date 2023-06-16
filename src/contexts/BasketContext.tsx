import { createContext, useEffect, useReducer } from "react";
import { Emoji } from "../utils/emoji/emojis";
import { Action, BasketState } from "./types";

interface IBasketContext {
  state: BasketState;
  dispatch: React.Dispatch<Action>;
}

export const BasketContext = createContext<IBasketContext>(
  {} as IBasketContext
);

const initialState: BasketState = {
  loading: false,
  method: "Push",
  basket: [],
  selection: {
    start: null,
    end: null,
    index: null,
    amount: null,
    target: null,
  },
  selectedItems: [],
  targetedItems: [],
  spliceItems: [],
  spliceTrigger: false,
  itemsToAdd: [],
  itemsToRemove: [],
  itemsToReplace: [],
  allBaskets: [],
  output: [],
};

const gridReducer = (state: BasketState, action: Action): BasketState => {
  const basket = state.basket;
  const emojis = basket.map((item) => item.emoji);
  switch (action.type) {
    case "Initialise":
      return { ...state, allBaskets: [basket] };
    case "Set Method":
      //Initial selections etc...

      return { ...state, method: action.method, output: undefined };
    case "Method Done":
      return { ...state, loading: false };
    case "Change Basket":
      const updateSelection = state.selectedItems.filter(
        (_, index) => index < action.newBasket.length
      );
      const updateTargets = state.targetedItems.filter(
        (_, index) => index < action.newBasket.length
      );
      return {
        ...state,
        basket: action.newBasket,
        output: undefined,
        selectedItems: updateSelection,
        targetedItems: updateTargets,
        selection: {
          start: null,
          end: null,
          index: null,
          amount: null,
          target: null,
        },
      };
    case "Select Items":
      const children = basket.length;
      let selectedItems: number[] = [];
      let targetedItems: number[] = [];
      let start: number | null = null;
      let end: number | null = null;
      let index: number | null = null;
      let target: number | null = null;
      let amount: number | null = null;
      if (!action.reset && !action.selectAll) {
        start =
          action.start || action.start === 0 || action.start === null
            ? action.start
            : state.selection.start;
        end =
          action.end || action.end === 0 || action.end === null
            ? action.end
            : state.selection.end;
        index =
          action.index || action.index === 0 || action.index === null
            ? action.index
            : state.selection.index;
        target =
          action.target || action.target === 0 || action.target === null
            ? action.target
            : state.selection.target;
        amount =
          action.amount || action.amount === 0 || action.amount === null
            ? action.amount
            : state.selection.amount;

        if (start && start < 0) {
          const calcStart = basket.length + start;
          start = calcStart;
        }

        if (end && end < 0) {
          const calcEnd = basket.length + end;
          end = calcEnd;
        }
        if (index && index < 0) {
          const calcIndex = basket.length + index;
          index = calcIndex;
        }
        if (target && target < 0) {
          const calcTarget = basket.length + target;
          target = calcTarget;
        }

        [...new Array(children)].forEach((_, i) => {
          if (index !== null && i === index) {
            selectedItems.push(i);
          }
          if (target !== null && i === target) {
            targetedItems.push(i);
          }

          if (start !== null) {
            if (end === null) {
              if (amount === null) {
                if (state.method !== "Splice") {
                  if (i >= start) {
                    selectedItems.push(i);
                  }
                } else {
                  if (i >= start) {
                    targetedItems.push(i);
                  }
                }
              } else {
                if (state.method !== "LastIndexOf") {
                  if (i >= start && i < start + amount) {
                    targetedItems.push(i);
                  }
                } else {
                  if (i >= 0 && i <= amount) {
                    selectedItems.push(i);
                  }
                }
              }
            } else if (end !== null) {
              if (i >= start && i < end) {
                selectedItems.push(i);
              }
            }
          }

          if (end !== null && start === null) {
            start = null;
            end = null;
          }
        });
      } else if (action.selectAll) {
        selectedItems = basket.map((_, index) => index);
      }

      return {
        ...state,
        selection: {
          start,
          end,
          index,
          target,
          amount,
        },
        selectedItems,
        targetedItems,
      };
    case "Replace Item":
      const newBasket = [...basket];
      newBasket[action.index] = action.replacement;
      return {
        ...state,
        basket: newBasket,
      };
    case "Items Added":
      return {
        ...state,
        loading: false,
        itemsToAdd: [],
        spliceItems: [],
        spliceTrigger: false,
      };
    case "Items Replaced":
      return {
        ...state,
        loading: false,
        itemsToReplace: [],
      };
    case "Items Removed":
      const spliceAdd =
        state.method === "Splice" && state.itemsToAdd.length > 0;

      let updatedBasket = basket.filter(
        (_, index) => !state.itemsToRemove.includes(index)
      );

      if (spliceAdd) {
        updatedBasket.splice(state.itemsToAdd[0], 0, ...state.spliceItems);
      }

      return {
        ...state,
        basket: updatedBasket,
        loading: spliceAdd ? true : false,
        itemsToRemove: [],
        spliceTrigger: spliceAdd ? true : false,
      };
    case "Pop":
      return {
        ...state,
        loading: true,
        itemsToRemove: [basket.length - 1],
        output: [...basket].pop(),
      };
    case "Shift":
      if (basket.length > 0) {
        return {
          ...state,
          loading: true,
          itemsToRemove: [0],
          output: [...basket].shift(),
        };
      } else {
        return { ...state, output: [...basket].shift() };
      }

    case "Push":
      return {
        ...state,
        basket: [...basket, ...action.items],
        loading: true,
        itemsToAdd: action.items.map((item, index) => {
          return basket.length + index;
        }),
        output: [...basket].push(...action.items),
      };
    case "Unshift":
      const items = [...action.items];
      return {
        ...state,
        basket: [...items, ...basket],
        loading: true,
        itemsToAdd: action.items
          .map((item, index) => {
            return index;
          })
          .reverse(),
        output: [...basket].unshift(...action.items),
      };
    case "Reverse":
      const reversed = [...basket].reverse();
      return {
        ...state,
        loading: true,
        itemsToReplace: reversed.map((item, index) => {
          return { index, replacement: item };
        }),
        output: reversed,
      };
    case "Fill":
      const itemsToReplace: { index: number; replacement: Emoji }[] =
        state.selectedItems.map((index) => {
          return { index, replacement: action.item };
        });
      return {
        ...state,
        loading: itemsToReplace.length > 0 ? true : false,
        itemsToReplace,
        output: [...basket].fill(
          action.item,
          state.selection.start ?? undefined,
          state.selection.end ?? undefined
        ),
      };
    case "Slice":
      return {
        ...state,
        loading: true,
        output: [...basket].slice(
          state.selection.start ?? undefined,
          state.selection.end ?? undefined
        ),
      };
    case "CopyWithin":
      const pasteTarget = state.selection.target ?? 0;
      const copiedItems = state.basket.filter(
        (_, index) =>
          state.selectedItems.includes(index) &&
          index < state.basket.length + pasteTarget
      );
      const replacements = copiedItems.map((item, index) => {
        return { index: index + pasteTarget, replacement: item };
      });
      console.log(replacements);
      return {
        ...state,
        itemsToReplace: replacements,
        loading: true,
      };
    case "Splice":
      const itemsToAdd = [];
      const spliceItems = [];
      let output: Emoji[] = [];
      const spliceStart = state.selection.start ?? 0;
      const spliceAmount = state.selection.amount ?? 0;

      output = [...basket].splice(spliceStart);

      if (state.selection.amount) {
        output = [...basket].splice(spliceStart, spliceAmount);
      }

      if (action.item1) {
        output = [...basket].splice(spliceStart, spliceAmount, action.item1);
        spliceItems.push(action.item1);
        itemsToAdd.push(spliceStart);
        if (action.item2) {
          output = [...basket].splice(
            spliceStart,
            spliceAmount,
            action.item1,
            action.item2
          );
          itemsToAdd.push(spliceStart + 1);
          spliceItems.push(action.item2);
        }
      }
      console.log(output);

      return {
        ...state,
        itemsToRemove: state.targetedItems,
        itemsToAdd,
        spliceItems,
        loading: true,
        output,
      };
    case "Includes":
      const filtered = basket.filter(
        ({ title, emoji }, index) =>
          emoji === action.item.emoji && state.selectedItems.includes(index)
      );

      let isIncluded = filtered.length > 0;
      let includesOutput: Emoji = isIncluded
        ? new Emoji("True", "✅")
        : new Emoji("False", "❌");

      return {
        ...state,
        loading: true,
        output: includesOutput,
      };
    case "At":
      if (state.selection.index) {
        return {
          ...state,
          loading: true,
          output: basket[state.selection.index],
        };
      } else {
        return state;
      }
    case "IndexOf":
      const from = state.selection.start ?? 0;

      return {
        ...state,
        loading: true,
        output: emojis.indexOf(action.item.emoji, from),
      };
    case "LastIndexOf":
      const fromIndex = state.selection.amount ?? basket.length - 1;

      return {
        ...state,
        loading: true,
        output: emojis.lastIndexOf(action.item.emoji, fromIndex),
      };
    case "With":
      const outputWith = [...state.basket];
      outputWith[state.selection.index ?? 0] = action.item;
      return {
        ...state,
        loading: true,
        output: outputWith,
      };
    default:
      return state;
  }
};

export const BasketProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(gridReducer, initialState);

  useEffect(() => {
    dispatch({ type: "Initialise" });
  }, []);

  return (
    <BasketContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};
