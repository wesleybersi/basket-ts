// import { Emoji } from "../../utils/emoji/emojis";
// import { Setter } from "./../../../../basket-js/src/store/types";
// export function withh(set: Setter) {
//   set((state) => {
//     if (state.basket.length === 0) return {};
//     const outputWith = [...state.basket];
//     const item = state.parameters.get(1)?.value as Emoji;
//     if (
//       state.selection.index &&
//       state.selection.index > state.basket.length - 1
//     )
//       return {};
//     outputWith[state.selection.index ?? 0] = item;
//     return {
//       ...state,
//       loading: true,
//       output: outputWith,
//     };
//   });
// }
