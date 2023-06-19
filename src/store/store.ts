import { allMethods } from "./methods";
import { create } from "zustand";

import { Parameters, Store } from "./types";
import { ParameterState } from "./methods";
import { Emoji } from "../utils/emoji/emojis";

export const useStore = create<Store>((set, get) => ({
  loading: false,
  method: allMethods[0],
  basket: [],
  output: [],
  itemsToAdd: [],
  itemsToRemove: [],
  itemsToProcess: [],
  itemsToReplace: [],
  processedIndexes: new Set(),
  triggerSplice: false,
  methods: {
    //ANCHOR Methods
    pop: () =>
      set((state) => {
        return {
          loading: true,
          itemsToRemove: [state.basket.length - 1],
          output: [...state.basket].pop(),
        };
      }),
    shift: () =>
      set((state) => {
        console.warn(state.basket);
        return {
          loading: true,
          itemsToRemove: [0],
          output: [...state.basket].shift(),
        };
      }),
    push: () =>
      set((state) => {
        const items = [];
        for (const [index, parameter] of state.parameters) {
          if (parameter?.value instanceof Emoji) items.push(parameter.value);
        }
        return {
          loading: true,
          basket: [...state.basket, ...items],
          itemsToAdd: items.map((_, index) => state.basket.length + index),
          output: [...state.basket].push(...items),
        };
      }),
    unshift: () =>
      set((state) => {
        const items = [];
        for (const [index, parameter] of state.parameters) {
          if (parameter?.value instanceof Emoji) items.push(parameter.value);
        }
        return {
          loading: true,
          basket: [...items, ...state.basket],
          itemsToAdd: items
            .map((item, index) => {
              return index;
            })
            .reverse(),
          output: [...state.basket].unshift(...items),
        };
      }),
    reverse: () =>
      set((state) => {
        const reversed = [...state.basket].reverse();
        return {
          loading: true,
          itemsToReplace: reversed.map((item, index) => {
            return { index, replacement: item };
          }),
          output: reversed,
        };
      }),
    fill: () =>
      set((state) => {
        const item = state.parameters.get(0)?.value;
        if (!item || !(item instanceof Emoji)) return {};

        let itemsToReplace: { index: number; replacement: Emoji }[] = [];
        if (state.selection.start !== undefined) {
          itemsToReplace = state.selectedIndexes.map((index) => {
            return { index, replacement: item };
          });
        } else {
          itemsToReplace = Array.from({ length: state.basket.length }).map(
            (_, index) => {
              return { index, replacement: item };
            }
          );
        }

        return {
          loading: itemsToReplace.length > 0 ? true : false,
          itemsToReplace,
          output: [...state.basket].fill(
            item,
            state.selectedIndexes[0] ?? undefined,
            state.selectedIndexes[state.selectedIndexes.length - 1] ?? undefined
          ),
        };
      }),
    copyWithin: () =>
      set((state) => {
        const pasteTarget = state.selection.target ?? 0;

        let copiedItems: Emoji[] = [];

        if (state.selection.start !== undefined) {
          copiedItems = state.basket.filter(
            (_, index) =>
              state.selectedIndexes.includes(index) &&
              index < state.basket.length + pasteTarget
          );
        } else {
          copiedItems = [...state.basket];
        }

        let replacements = copiedItems
          .map((item, index) => {
            return { index: index + pasteTarget, replacement: item };
          })
          .slice(0, state.basket.length - (state.selection.target ?? 0));

        return {
          itemsToReplace: replacements,
          loading: true,
        };
      }),
    splice: () =>
      set((state) => {
        let itemsToRemove: number[] = [];
        if (state.selectedIndexes.length > 0) {
          if (
            state.selection.amount !== undefined &&
            state.selection.amount > 0
          ) {
            itemsToRemove = [...state.selectedIndexes];
          } else if (
            state.selection.amount !== undefined &&
            state.selection.amount === 0
          ) {
            itemsToRemove = [];
          } else if (state.selection.amount === undefined) {
            console.log(state.selection.amount);
            itemsToRemove = [...state.basket].map((_, index) => index);
          }
        }

        if (itemsToRemove.length === 0 && state.parameters.get(2)?.value) {
          return { triggerSplice: true, loading: true };
        }

        let output = [...state.basket].filter((_, index) =>
          itemsToRemove.includes(index)
        );

        itemsToRemove = itemsToRemove.filter(
          (index) => index < state.basket.length
        );

        return {
          loading: itemsToRemove.length > 0 ? true : false,
          itemsToRemove,
          output,
        };
      }),
    concat: () =>
      set((state) => {
        return {};
      }),
    slice: () =>
      set((state) => {
        return {
          loading: true,
          output: [...state.basket].slice(
            state.selection.start ?? undefined,
            state.selection.end ?? undefined
          ),
          itemsToProcess: state.selectedIndexes.slice(
            0,
            state.selectedIndexes.length
          ),
        };
      }),
    includes: () =>
      set((state) => {
        const item = state.parameters.get(0)?.value;
        if (!item || !(item instanceof Emoji)) return {};

        let filtered = [];
        let index = -1;
        if (state.selection.start !== undefined) {
          filtered = state.basket.filter(
            ({ title, emoji }, index) =>
              emoji === item.emoji && state.selectedIndexes.includes(index)
          );
        } else {
          filtered = state.basket.filter(({ title, emoji }, i) => {
            if (emoji === item.emoji) {
              if (index < 0) index = i;
              return emoji;
            }
          });
        }

        let isIncluded = filtered.length > 0;
        let includesOutput: Emoji = isIncluded
          ? new Emoji("True", "✅")
          : new Emoji("False", "❌");

        return {
          loading: true,
          output: includesOutput,
          selection: {
            ...state.selection,
            highlight: index,
          },
        };
      }),
    indexOf: () =>
      set((state) => {
        const item = state.parameters.get(0)?.value;
        if (!item || !(item instanceof Emoji)) return {};
        const emojis = state.basket.map((item) => item.emoji);
        const from = state.selection.start ?? 0;
        return {
          loading: true,
          output: emojis.indexOf(item.emoji, from),
          selection: {
            ...state.selection,
            highlight: emojis.indexOf(item.emoji, from),
          },
        };
      }),
    lastIndexOf: () =>
      set((state) => {
        const item = state.parameters.get(0)?.value;
        if (!item || !(item instanceof Emoji)) return {};
        const emojis = state.basket.map((item) => item.emoji);
        const fromIndex = state.selection.amount ?? state.basket.length;

        return {
          loading: true,
          output: emojis.lastIndexOf(item.emoji, fromIndex - 1),
          selection: {
            ...state.selection,
            highlight: emojis.lastIndexOf(item.emoji, fromIndex - 1),
          },
        };
      }),
    at: () =>
      set((state) => {
        return {};
      }),
    join: () =>
      set((state) => {
        const value = state.parameters.get(0)?.value;
        const emojis = state.basket.map((item) => item.emoji);

        if (value && typeof value === "string") {
          return {
            output: emojis.join(value),
          };
        }
        return {
          output: emojis.join(),
        };
      }),
    with: () =>
      set((state) => {
        const outputWith = [...state.basket];
        const item = state.parameters.get(1)?.value as Emoji;
        outputWith[state.selection.index ?? 0] = item;
        return {
          ...state,
          loading: true,
          output: outputWith,
        };
      }),
    filter: () => {},
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
            selection: { ...state.selection, show: false },
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
        if (typeof param.value === "number") {
          selection.amount = param.value;
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
            selection.end = Infinity;
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
            } else selectedIndexes = [selectedIndexes[0]];
          } else {
            selectedIndexes = selectedIndexes.slice(0, selection.amount);
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

      // console.count("UPDATING HERE");

      // if (typeof value === "number" || value === undefined) {
      //   const { name } = param;
      //   const { title: method } = state.method;
      //   if (name === "index") {
      //     selection.index = value;
      //   } else if (
      //     name === "start" ||
      //     (name === "fromIndex" && method !== "lastIndexOf")
      //   ) {
      //     selection.start = value || value === 0 ? value : 0;
      //   } else if (name === "fromIndex" && method === "lastIndexOf") {
      //     selection.start = 0;
      //     selection.amount = value;
      //   } else if (name === "end") {
      //     selection.end = value;
      //   } else if (name === "target") {
      //     selection.target = value;
      //   } else if (name === "deleteCount") {
      //     selection.amount = value;
      //   }
      // }

      // let indexes: number[] = [];
      // if (selection.start) {
      //   const { start, end } = selection;
      //   if (!start) selection.start = 0;

      // const startIndex =
      //   start >= 0 ? start : Math.max(state.basket.length + start, 0);

      //   let endIndex = state.basket.length - 1;
      //   selection.end = endIndex;
      //   if (end || end === 0) {
      //     endIndex =
      //       end >= 0 ? end + 1 : Math.max(state.basket.length + end + 1, 0);
      //   }

      //   indexes = Array.from(
      //     Array(endIndex - startIndex),
      //     (_, index) => index + startIndex
      //   );
      // }
    }),
  // updateSelection: (
  //   type: "index" | "start" | "end" | "target" | "amount" | "calc",
  //   value: number | undefined
  // ) =>
  //   set((state) => {
  //     const selection = {
  //       index: type === "index" ? value : state.selection.index,
  //       start: type === "start" ? value : state.selection.start,
  //       end: type === "end" ? value : state.selection.end,
  //       target: type === "target" ? value : state.selection.target,
  //       amount: type === "amount" ? value : state.selection.amount,
  //     };

  //     let indexes: number[] = [];

  //     const { start, end } = selection;

  //     const startIndex =
  //       start >= 0 ? start : Math.max(state.basket.length + start, 0);

  //     const endIndex =
  //       end >= 0 ? end + 1 : Math.max(state.basket.length + end + 1, 0);
  //     indexes = Array.from(
  //       Array(endIndex - startIndex),
  //       (_, index) => index + startIndex
  //     );

  //     return {
  //       selection,
  //       selectedIndexes: indexes,
  //     };
  //   }),
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
    theme: "All",
    animationDuration: 200,
    soundEnabled: true,
  },
  set,
}));
