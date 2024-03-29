import { Emoji } from "../utils/emoji/emojis";
import { IMethod, MethodName } from "./methods";
import { ParameterState } from "./methods";

export interface Store {
  loading: boolean;
  disableInput: boolean;
  method: IMethod;
  basketIndex: number;
  allBaskets: Emoji[][];
  basket: Emoji[];
  secondary: Emoji[];
  secondaryIndex: number;
  showSecondary: boolean;
  output: number | string | Emoji | Emoji[] | undefined;
  itemsToRemove: number[];
  itemsToAdd: number[];
  itemsToProcess: number[];
  itemsToReplace: { index: number; replacement: Emoji }[];
  processSuccesIndex: number;
  ascendAll: boolean;
  processedIndexes: Set<number>;
  triggerSplice: boolean;
  spliceRemove: number[];
  spliceAdd: Emoji | null;
  hoverItem: Emoji | null;
  maxLimitMessage: boolean;
  changeBasket: (type: "Primary" | "Secondary", index: number) => void;
  addEmptyBasket: (type: "Primary" | "Secondary") => void;
  removeBasket: (index: number) => void;
  addOutputBasket: () => void;
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
  };
  parameters: Map<number, ParameterState | null>;
  updateAllParameters: () => void;
  updateParameterState: (
    index: number,
    value: Emoji | number | string | undefined,
    active: boolean
  ) => void;
  selectedIndexes: number[];
  targetedIndexes: number[];
  selection: {
    show: boolean;
    start: number | undefined;
    end: number | undefined;
    index: number | undefined;
    amount: number | undefined;
    target: number | undefined;
    highlight: number | undefined;
  };
  settings: {
    isOpen: boolean;
    aboutIsOpen: boolean;
    theme: "Fruit" | "Veggies" | "All";
    animationDuration: number;
    soundEnabled: boolean;
  };
  set: Setter;
}

export type Setter = (
  partial: Store | Partial<Store> | ((state: Store) => Store | Partial<Store>),
  replace?: boolean | undefined
) => void;

export type Parameters = [
  ParameterState | null,
  ParameterState | null,
  ParameterState | null,
  ParameterState | null
];

export interface Basket {
  name: string;
  length: number;
  items: Emoji[];
}
