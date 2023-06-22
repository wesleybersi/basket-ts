import { IconType } from "react-icons";
import { Emoji } from "../utils/emoji/emojis";

import {
  BsBoxArrowInLeft as IconPush,
  BsBoxArrowRight as IconPop,
  BsBoxArrowInRight as IconUnshift,
  BsBoxArrowLeft as IconShift,
  BsPaintBucket as IconFill,
  BsBoxArrowInDown as IconSplice,
} from "react-icons/bs";
import { RxCopy as IconCopy } from "react-icons/rx";
import { MdOutlineJoinLeft as IconConcat } from "react-icons/md";
import {
  TbZoomCheck as IconIncludes,
  TbNumbers as IconIndexOf,
} from "react-icons/tb";
import { IoIosSwap as IconReverse } from "react-icons/io";
import { TbZoomReplace as IconWith } from "react-icons/tb";
import { TbSlice as IconSlice } from "react-icons/tb";

export interface IMethod {
  title: MethodName;
  icon: IconType;
  hasSelection: boolean;
  parameters: Map<number, ParameterState | null>;
}

export type NumType = "Index" | "Start" | "End" | "Target" | "Delete";

export type MethodName =
  | "pop"
  | "unshift"
  | "push"
  | "shift"
  | "reverse"
  | "fill"
  | "copyWithin"
  | "splice"
  | "concat"
  | "slice"
  // | "toSpliced"
  | "includes"
  | "indexOf"
  | "lastIndexOf"
  | "at"
  | "with";
// | "toReversed";
// | "join"
// | "filter";

export interface ParameterState {
  name: string;
  type: "Emoji" | "Number" | "String" | "Callback" | "Array";
  active?: boolean;
  value?: Emoji | number | string;
  required?: boolean;
  hide?: boolean;
  color?: string;
}

export const allMethods: IMethod[] = [
  {
    title: "push",
    icon: IconPush,
    hasSelection: false,
    parameters: new Map([
      [
        0,
        {
          name: "element0",
          type: "Emoji",
          required: true,
          active: false,
        },
      ],
      [
        1,
        {
          name: "element1",
          type: "Emoji",
          hide: true,
          active: false,
        },
      ],
      [
        2,
        {
          name: "element2",
          type: "Emoji",
          active: false,
          hide: true,
        },
      ],
      [
        3,
        {
          name: "element3",
          type: "Emoji",
          active: false,
          hide: true,
        },
      ],
    ]),
  },
  {
    title: "pop",
    icon: IconPop,
    hasSelection: false,
    parameters: new Map([
      [0, null],
      [1, null],
      [2, null],
      [3, null],
    ]),
  },
  {
    title: "unshift",
    hasSelection: false,
    icon: IconUnshift,
    parameters: new Map([
      [
        0,
        {
          name: "element0",

          required: true,
          active: false,
          type: "Emoji",
        },
      ],
      [
        1,
        {
          name: "element1",
          type: "Emoji",
          active: false,
          hide: true,
        },
      ],
      [
        2,
        {
          name: "element2",
          type: "Emoji",
          active: false,
          hide: true,
        },
      ],
      [
        3,
        {
          name: "element3",
          type: "Emoji",
          active: false,
          hide: true,
        },
      ],
    ]),
  },
  {
    title: "shift",
    icon: IconShift,
    hasSelection: false,
    parameters: new Map([
      [0, null],
      [1, null],
      [2, null],
      [3, null],
    ]),
  },
  {
    title: "reverse",
    icon: IconReverse,
    hasSelection: true,
    parameters: new Map([
      [0, null],
      [1, null],
      [2, null],
      [3, null],
    ]),
  },
  // {
  //   title: "toReversed",
  //   icon: IconReverse,
  //   hasSelection: true,
  //   parameters: new Map([
  //     [0, null],
  //     [1, null],
  //     [2, null],
  //     [3, null],
  //   ]),
  // },
  {
    title: "fill",
    icon: IconFill,
    hasSelection: true,
    parameters: new Map([
      [0, { name: "element0", required: true, active: false, type: "Emoji" }],
      [
        1,
        {
          name: "start",
          type: "Number",
          hide: true,
          active: false,
          color: "var(--selectionOpaque)",
        },
      ],
      [
        2,
        {
          name: "end",
          type: "Number",
          hide: true,
          active: false,
          color: "var(--selectionOpaque)",
        },
      ],
      [3, null],
    ]),
  },

  {
    title: "splice",
    icon: IconSplice,
    hasSelection: true,
    parameters: new Map([
      [
        0,
        {
          name: "start",
          type: "Number",
          required: true,
          active: false,
          hide: false,
          color: "var(--selectionOpaque)",
        },
      ],
      [
        1,
        {
          name: "deleteCount",
          type: "Number",
          hide: true,
          active: false,
          color: "var(--deleteCount)",
        },
      ],
      [2, { name: "item1", hide: true, active: false, type: "Emoji" }],
      [
        3,
        {
          name: "item2",
          type: "Emoji",
          active: false,
          hide: true,
        },
      ],
    ]),
  },
  // {
  //   title: "toSpliced",
  //   icon: IconSplice,
  //   hasSelection: true,
  //   parameters: new Map([
  //     [
  //       0,
  //       {
  //         name: "start",
  //         type: "Number",
  //         required: true,
  //         active: false,
  //         hide: false,
  //         color: "var(--selectionOpaque)",
  //       },
  //     ],
  //     [
  //       1,
  //       {
  //         name: "deleteCount",
  //         type: "Number",
  //         hide: true,
  //         active: false,
  //         color: "var(--deleteCount)",
  //       },
  //     ],
  //     [2, { name: "item1", hide: true, active: false, type: "Emoji" }],
  //     [
  //       3,
  //       {
  //         name: "item2",
  //         type: "Emoji",
  //         active: false,
  //         hide: true,
  //       },
  //     ],
  //   ]),
  // },
  {
    title: "copyWithin",
    icon: IconCopy,
    hasSelection: true,
    parameters: new Map([
      [
        0,
        {
          name: "target",
          type: "Number",
          required: true,
          active: false,
          color: "var(--highlight)",
        },
      ],
      [
        1,
        {
          name: "start",
          type: "Number",

          active: false,
          color: "var(--selectionOpaque)",
        },
      ],
      [
        2,
        {
          name: "end",
          type: "Number",
          hide: true,
          active: false,
          color: "var(--selectionOpaque)",
        },
      ],
      [3, null],
    ]),
  },
  {
    title: "slice",
    icon: IconSlice,
    hasSelection: true,
    parameters: new Map([
      [
        0,
        {
          name: "start",
          type: "Number",
          hide: true,
          active: false,
          color: "var(--selectionOpaque)",
        },
      ],
      [
        1,
        {
          name: "end",
          type: "Number",
          hide: true,
          active: false,
          color: "var(--selectionOpaque)",
        },
      ],
      [3, null],
      [4, null],
    ]),
  },

  {
    title: "with",
    icon: IconWith,
    hasSelection: true,
    parameters: new Map([
      [
        0,
        {
          name: "index",
          required: true,
          type: "Number",
          active: false,
          color: "var(--selectionOpaque)",
        },
      ],
      [
        1,
        {
          name: "value",
          required: true,
          type: "Emoji",
          active: false,
        },
      ],
      [2, null],
      [3, null],
    ]),
  },

  {
    title: "concat",
    icon: IconConcat,
    hasSelection: true,
    parameters: new Map([
      [
        0,
        {
          name: "value",
          type: "Array",
          hide: false,
          active: false,
        },
      ],
      [1, null],
      [2, null],
      [3, null],
    ]),
  },
  {
    title: "includes",
    icon: IconIncludes,
    hasSelection: true,
    parameters: new Map([
      [
        0,
        { name: "searchElement", required: true, active: false, type: "Emoji" },
      ],
      [
        1,
        {
          name: "fromIndex",
          type: "Number",
          hide: true,
          active: false,
          color: "var(--selectionOpaque)",
        },
      ],
      [2, null],
      [3, null],
    ]),
  },
  {
    title: "indexOf",
    icon: IconIndexOf,
    hasSelection: true,
    parameters: new Map([
      [
        0,
        {
          name: "searchElement",
          required: true,
          type: "Emoji",
          active: false,
          hide: false,
        },
      ],
      [
        1,
        {
          name: "fromIndex",
          type: "Number",
          hide: true,
          active: false,
          color: "var(--selectionOpaque)",
        },
      ],
      [2, null],
      [3, null],
    ]),
  },
  {
    title: "lastIndexOf",
    icon: IconIndexOf,
    hasSelection: true,
    parameters: new Map([
      [
        0,
        {
          name: "searchElement",
          required: true,
          type: "Emoji",
          hide: false,
          active: false,
        },
      ],
      [
        1,
        {
          name: "fromIndex",
          type: "Number",
          hide: true,
          active: false,
          color: "var(--selectionOpaque)",
        },
      ],
      [2, null],
      [3, null],
    ]),
  },
  // {
  //   title: "filter",
  //   icon: IconWith,
  //   hasSelection: true,
  //   parameters: new Map([
  //     [
  //       0,
  //       {
  //         name: "callbackFn",
  //         required: true,
  //         type: "Callback",
  //         active: false,
  //       },
  //     ],
  //     [1, null],
  //     [2, null],
  //     [3, null],
  //   ]),
  // },

  // {
  //   title: "join",
  //   icon: IconConcat,
  //   hasSelection: true,
  //   parameters: new Map([
  //     [
  //       0,
  //       {
  //         name: "seperator",
  //         type: "String",
  //         hide: false,
  //         active: false,
  //       },
  //     ],
  //     [1, null],
  //     [2, null],
  //     [3, null],
  //   ]),
  // },

  // {
  //   title: "join",
  //   icon: IconConcat,
  //   hasSelection: true,
  //   parameters: new Map([
  //     [
  //       0,
  //       {
  //         name: "seperator",
  //         type: "String",
  //         hide: false,
  //         active: false,
  //       },
  //     ],
  //     [1, null],
  //     [2, null],
  //     [3, null],
  //   ]),
  // },

  // {
  //   title: "at",
  //   icon: IconIndexOf,
  //   parameters: new Map([
  //     [
  //       0,
  //       {
  //         name: "index",
  //         required: true,
  //         type: "Number",
  //         active: false,
  //       },
  //     ],
  //     [1, null],
  //     [2, null],
  //     [3, null],
  //   ]),
  // },
];
