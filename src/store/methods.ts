import { ParameterState } from "./types";
import { IconType } from "react-icons";

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
  parameters: [
    ParameterState | null,
    ParameterState | null,
    ParameterState | null,
    ParameterState | null
  ];
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
  | "includes"
  | "indexOf"
  | "lastIndexOf"
  | "at"
  | "with";

export const allMethods: IMethod[] = [
  {
    title: "push",
    icon: IconPush,
    parameters: [
      {
        name: "element0",
        required: true,
        active: false,
        type: "Emoji",
      },
      {
        name: "element1",
        type: "Emoji",
        active: false,
        hide: true,
      },
      {
        name: "element2",
        type: "Emoji",
        active: false,
        hide: true,
      },
      {
        name: "element3",
        type: "Emoji",
        active: false,
        hide: true,
      },
    ],
  },
  { title: "pop", icon: IconPop, parameters: [null, null, null, null] },
  {
    title: "unshift",

    icon: IconUnshift,
    parameters: [
      { name: "element0", required: true, active: false, type: "Emoji" },
      {
        name: "element1",
        type: "Emoji",
        active: false,
        hide: true,
      },
      {
        name: "element2",
        type: "Emoji",
        active: false,
        hide: true,
      },
      {
        name: "element3",
        type: "Emoji",
        active: false,
        hide: true,
      },
    ],
  },
  { title: "shift", icon: IconShift, parameters: [null, null, null, null] },
  {
    title: "fill",
    icon: IconFill,
    parameters: [
      { name: "element0", required: true, active: false, type: "Emoji" },
      {
        name: "start",
        type: "Number",
        hide: true,
        active: false,
      },
      {
        name: "end",
        type: "Number",
        hide: true,
        active: false,
      },
      null,
    ],
  },

  {
    title: "splice",
    icon: IconSplice,
    parameters: [
      {
        name: "start",
        type: "Number",
        required: true,
        active: false,
        hide: false,
      },
      {
        name: "deleteCount",
        type: "Number",
        hide: true,
        active: false,
      },
      { name: "item1", hide: true, active: false, type: "Emoji" },
      {
        name: "item2",
        type: "Emoji",
        active: false,
        hide: true,
      },
    ],
  },

  {
    title: "slice",
    icon: IconSlice,
    parameters: [
      {
        name: "start",
        type: "Number",
        hide: true,
        active: false,
      },
      {
        name: "end",
        type: "Number",
        hide: true,
        active: false,
      },
      null,
      null,
    ],
  },
  {
    title: "reverse",
    icon: IconReverse,
    parameters: [null, null, null, null],
  },
  {
    title: "with",
    icon: IconWith,
    parameters: [
      {
        name: "index",
        required: true,
        type: "Number",
        active: false,
      },
      {
        name: "value",
        required: true,
        type: "Emoji",
        hide: false,
        active: false,
      },
      null,
      null,
    ],
  },
  {
    title: "copyWithin",
    icon: IconCopy,
    parameters: [
      {
        name: "target",
        type: "Number",
        hide: true,
        active: false,
      },
      {
        name: "start",
        type: "Number",
        hide: true,
        active: false,
      },
      {
        name: "end",
        type: "Number",
        hide: true,
        active: false,
      },
      null,
    ],
  },

  {
    title: "concat",
    icon: IconConcat,
    parameters: [
      {
        name: "index",
        type: "Number",
        hide: false,
        active: false,
      },
      null,
      null,
      null,
    ],
  },
  {
    title: "includes",
    icon: IconIncludes,
    parameters: [
      { name: "searchElement", required: true, active: false, type: "Emoji" },
      {
        name: "fromIndex",
        type: "Number",
        hide: true,
        active: false,
      },
      null,
      null,
    ],
  },
  {
    title: "indexOf",
    icon: IconIndexOf,
    parameters: [
      {
        name: "searchElement",
        required: true,
        type: "Emoji",
        active: false,
        hide: false,
      },
      {
        name: "fromIndex",
        type: "Number",
        hide: true,
        active: false,
      },
      null,
      null,
    ],
  },
  {
    title: "lastIndexOf",
    icon: IconIndexOf,
    parameters: [
      {
        name: "searchElement",
        required: true,
        type: "Emoji",
        hide: false,
        active: false,
      },
      {
        name: "fromIndex",
        type: "Number",
        hide: true,
        active: false,
      },
      null,
      null,
    ],
  },

  {
    title: "at",
    icon: IconIndexOf,
    parameters: [
      {
        name: "index",
        required: true,
        type: "Number",
        active: false,
      },
      null,
      null,
      null,
    ],
  },
];
