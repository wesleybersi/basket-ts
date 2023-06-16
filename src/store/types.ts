import { Emoji } from "../utils/emoji/emojis";
import { IMethod } from "./methods";

export interface Store {
  loading: boolean;
  method: IMethod;
  basket: Emoji[];
  output: number | Emoji | Emoji[] | undefined;
  itemsToRemove: number[];
  itemsToAdd: number[];
  itemsToReplace: { index: number; replacement: Emoji }[];
  methods: {
    push: () => void;
    pop: () => void;
    shift: () => void;
    unshift: () => void;
    reverse: () => void;
    fill: () => void;
    copyWithin: () => void;
    splice: () => void;
    concat: () => void;
    slice: () => void;
    includes: () => void;
    indexOf: () => void;
    lastIndexOf: () => void;
    at: () => void;
    with: () => void;
  };
  parameters: Parameters;
  settings: {
    isOpen: boolean;
    theme: "Fruit" | "Veggies";
    animationDuration: number;
  };
  set: (
    partial:
      | Store
      | Partial<Store>
      | ((state: Store) => Store | Partial<Store>),
    replace?: boolean | undefined
  ) => void;
}

export interface ParameterState {
  name: string;
  type: "Emoji" | "Number";
  active?: boolean;
  value?: Emoji | number;
  required?: boolean;
  hide?: boolean;
}

export type Parameters = [
  ParameterState | null,
  ParameterState | null,
  ParameterState | null,
  ParameterState | null
];
