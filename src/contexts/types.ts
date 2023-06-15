import { Emoji } from "../utils/getEmoji";

export type Action =
  | { type: "Initialise" }
  | { type: "Change Theme"; theme: "Fruit" | "Veggies" }
  | { type: "Set Method"; method: MethodName }
  | { type: "Replace Item"; index: number; replacement: Emoji }
  | { type: "Method Done" }
  | { type: "Items Added" }
  | { type: "Items Removed" }
  | { type: "Items Replaced" }
  | {
      type: "Select Items";
      start?: number | null;
      end?: number | null;
      index?: number | null;
      amount?: number | null;
      target?: number | null;
      reset?: boolean;
      selectAll?: boolean;
    }
  | { type: "Change Basket"; newBasket: Emoji[] }
  | { type: "Pop" }
  | {
      type: "Push";
      items: Emoji[];
    }
  | { type: "Shift" }
  | {
      type: "Unshift";
      items: Emoji[];
    }
  | { type: "Reverse" }
  | { type: "Fill"; item: Emoji }
  | { type: "Slice" }
  | { type: "CopyWithin" }
  | { type: "Splice"; item1?: Emoji; item2?: Emoji }
  | { type: "Includes"; item: Emoji }
  | { type: "At" }
  | { type: "IndexOf"; item: Emoji }
  | { type: "LastIndexOf"; item: Emoji }
  | { type: "With"; item: Emoji };

export interface BasketState {
  loading: boolean;
  theme: "Fruit" | "Veggies";
  method: MethodName;
  basket: Emoji[];
  selection: {
    start: number | null;
    end: number | null;
    index: number | null;
    amount: number | null;
    target: number | null;
  };
  selectedItems: number[];
  targetedItems: number[];
  spliceItems: Emoji[];
  spliceTrigger: boolean;
  itemsToAdd: number[];
  itemsToRemove: number[];
  itemsToReplace: { index: number; replacement: Emoji }[];
  allBaskets: Emoji[][];
  output: number | Emoji | Emoji[] | undefined;
}

export type MethodName =
  | ""
  | "Pop"
  | "Unshift"
  | "Push"
  | "Shift"
  | "Reverse"
  | "Fill"
  | "CopyWithin"
  | "Splice"
  | "Concat"
  | "Slice"
  | "Includes"
  | "IndexOf"
  | "LastIndexOf"
  | "At"
  | "With"
  | "ToReversed"
  | "ToSpliced";
