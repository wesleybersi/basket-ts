import { allMethods } from "./methods";
import { create } from "zustand";

import { Store } from "./types";
import { ParameterState } from "./methods";
import { Emoji } from "../utils/emoji/emojis";
import { randomEmojis } from "../utils/emoji/random-emoji";
import { pop } from "./methods/pop";
import { shift } from "./methods/shift";
import { push } from "./methods/push";
import { unshift } from "./methods/unshift";
import { reverse } from "./methods/reverse";
import { fill } from "./methods/fill";
import { copyWithin } from "./methods/copy-within";
import { splice } from "./methods/splice";
import { concat } from "./methods/concat";
import { slice } from "./methods/slice";
import { includes } from "./methods/includes";
import { indexOf } from "./methods/index-of";
import { lastIndexOf } from "./methods/last-index-of";
import { changeBasket } from "./utilities/change-basket";

export const useStore = create<Store>((set, get) => ({
  loading: false,
  disableInput: false,
  method: allMethods[0],
  basketIndex: 0,
  basket: randomEmojis(4),
  secondary: [],
  secondaryIndex: 0,
  showSecondary: false,
  allBaskets: [[]],
  output: [],
  itemsToAdd: [],
  itemsToRemove: [],
  itemsToProcess: [],
  itemsToReplace: [],
  spliceRemove: [],
  spliceAdd: null,
  ascendAll: false,
  processedIndexes: new Set(),
  triggerSplice: false,
  hoverItem: null,
  maxLimitMessage: false,
  changeBasket: (type: "Secondary" | "Primary", index: number) =>
    changeBasket(set, type, index),
  addEmptyBasket: (type: "Secondary" | "Primary") =>
    set((state) => {
      if (state.allBaskets.length === 5) return {};
      //Save current basket
      const updatedBaskets = [...state.allBaskets];

      if (type === "Primary") {
        updatedBaskets[state.basketIndex] = [...state.basket];
      } else if (type === "Secondary") {
        updatedBaskets[state.secondaryIndex] = [...state.secondary];
      }
      updatedBaskets.push([]);

      return {
        basket:
          type === "Primary"
            ? updatedBaskets[updatedBaskets.length - 1]
            : updatedBaskets[state.basketIndex],
        secondary:
          type === "Secondary"
            ? updatedBaskets[updatedBaskets.length - 1]
            : updatedBaskets[state.secondaryIndex],
        allBaskets: updatedBaskets,
        basketIndex:
          type === "Primary" ? updatedBaskets.length - 1 : state.basketIndex,
        secondaryIndex:
          type === "Secondary"
            ? updatedBaskets.length - 1
            : state.secondaryIndex,
      };
    }),
  removeBasket: (index: number) =>
    set((state) => {
      if (state.allBaskets.length === 1) return {};

      const updatedBaskets = [...state.allBaskets];
      updatedBaskets.splice(index, 1);

      let newIndex = state.basketIndex;
      if (state.basketIndex > 0) {
        newIndex--;
      }

      return {
        basket: updatedBaskets[newIndex],
        allBaskets: updatedBaskets,
        basketIndex: newIndex,
      };
    }),
  addOutputBasket: () =>
    set((state) => {
      if (state.basket.length > 0 || !Array.isArray(state.output)) return {};

      const updatedBaskets = [...state.allBaskets];
      updatedBaskets[state.basketIndex] = [...state.output];

      return {
        basket: updatedBaskets[state.basketIndex],
        allBaskets: updatedBaskets,
        ascendAll: true,
      };
    }),
  methods: {
    pop: () => pop(set),
    shift: () => shift(set),
    push: () => push(set),
    unshift: () => unshift(set),
    reverse: () => reverse(set),
    fill: () => fill(set),
    copyWithin: () => copyWithin(set),
    splice: () => splice(set),
    concat: () => concat(set),
    slice: () => slice(set),
    includes: () => includes(set),
    indexOf: () => indexOf(set),
    lastIndexOf: () => lastIndexOf(set),
  },
  parameters: allMethods[0].parameters,
  updateAllParameters: () =>
    set((state) => {
      state.parameters.forEach((param, index) => {
        if (param)
          state.updateParameterState(
            index,
            param.value,
            param.active ? param.active : false
          );
      });
      return {};
    }),
  updateParameterState: (
    index: number,
    value: Emoji | number | string | undefined,
    active: boolean
  ) =>
    set((state) => {
      const updatedParameters = new Map([...state.parameters]);
      const param = updatedParameters.get(index);

      if (!param) return {};
      param.value = value;
      param.active = active;

      updatedParameters.set(index, param as ParameterState);

      console.log(
        "Parameter",
        index,
        "is",
        value,
        "and",
        active ? "active" : "inactive"
      );

      if (!state.method.hasSelection) {
        return { parameters: updatedParameters };
      }

      //ANCHOR Set selections
      const selection = { ...state.selection };

      if (param.name === "start") {
        if (param.active) {
          if (typeof param.value === "number") {
            selection.show = true;
            selection.start = param.value;
          } else if (!param.value) {
            selection.show = false;
            return { parameters: updatedParameters };
          }
        } else {
          return {
            parameters: updatedParameters,
            selection: { ...state.selection, start: 0, show: false },
          };
        }
      }

      if (param.name === "end") {
        if (selection.start !== undefined) {
          if (typeof param.value === "number") selection.end = param.value;
          else if (!param.value) selection.end = undefined;
        } else if (selection.start === undefined) {
          return { parameters: updatedParameters };
        }
      }
      if (param.name === "deleteCount") {
        if (param.active) {
          if (typeof param.value === "number") {
            selection.amount = param.value;
          }
        } else {
          selection.amount = undefined;
        }
      }

      if (param.name === "index") {
        if (typeof param.value === "number") {
          let index =
            param.value >= 0
              ? param.value
              : Math.max(state.basket.length + param.value, 0);
          return {
            parameters: updatedParameters,
            selection: { ...state.selection, show: true, index },
            selectedIndexes: [index],
          };
        }
      }

      if (param.name === "target") {
        if (typeof param.value === "number") {
          let target =
            param.value >= 0
              ? param.value
              : Math.max(state.basket.length + param.value, 0);
          return {
            parameters: updatedParameters,
            selection: {
              ...state.selection,
              show: true,
              target,
              highlight: target,
            },
          };
        }
      }

      if (param.name === "fromIndex") {
        if (typeof param.value === "number") {
          selection.show = true;
          if (
            state.method.title === "includes" ||
            state.method.title === "indexOf"
          ) {
            selection.start = param.value;
            selection.end = state.basket.length;
          } else if (state.method.title === "lastIndexOf") {
            selection.start = 0;
            selection.amount = param.value + 1;
          }
        }
      }

      //ANCHOR Select indexes
      if (selection.start !== undefined) {
        let selectedIndexes: number[] = [];
        let startIndex =
          selection.start >= 0
            ? selection.start
            : Math.max(state.basket.length + selection.start, 0);
        let endIndex = selection.end;
        if ((!endIndex && endIndex !== 0) || endIndex > state.basket.length) {
          endIndex = state.basket.length;
        } else if (endIndex < 0) {
          endIndex = Math.max(state.basket.length + endIndex, 0);
        }

        if (endIndex <= startIndex) {
          selectedIndexes = [];
        } else {
          selectedIndexes = Array.from(
            Array(endIndex - startIndex),
            (_, index) => index + startIndex
          );
        }

        if (selection.amount !== undefined) {
          if (state.method.title === "splice") {
            if (selection.amount > 0) {
              selectedIndexes = selectedIndexes.slice(0, selection.amount);
            } else {
              if (
                state.parameters.get(2)?.active &&
                !state.parameters.get(3)?.active
              ) {
                selectedIndexes = [selectedIndexes[0]];
              } else if (
                state.parameters.get(2)?.active &&
                state.parameters.get(3)?.active
              ) {
                selectedIndexes = [selectedIndexes[0], selectedIndexes[1]];
              }
            }
          } else {
            selectedIndexes = selectedIndexes.slice(0, selection.amount ?? 1);
          }
        }

        return {
          parameters: updatedParameters,
          selection,
          selectedIndexes,
        };
      }
      return {
        parameters: updatedParameters,
        selection,
      };
    }),
  processSuccesIndex: -1,
  selectedIndexes: [],
  targetedIndexes: [],
  selection: {
    show: false,
    start: undefined,
    end: undefined,
    index: undefined,
    amount: undefined,
    target: undefined,
    highlight: undefined,
  },
  settings: {
    isOpen: false,
    aboutIsOpen: false,
    theme: "All",
    animationDuration: 250,
    soundEnabled: true,
  },
  set,
}));
