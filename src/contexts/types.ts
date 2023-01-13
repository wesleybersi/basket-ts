import { Emoji } from "../utils/getEmoji";

export type Action =
    | { type: "Initialise" }
    | { type: "Set Method"; method: MethodName }
    | { type: "Items Added" }
    | { type: "Items Removed" }
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
    | { type: "Fill" };

export interface BasketState {
    loading: boolean;
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
    itemsToAdd: number[];
    itemsToRemove: number[];
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
    | "At";
