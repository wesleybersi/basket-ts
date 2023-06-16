import { IParameter } from "./../components/Parameters/Parameters";
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
  parameters: IParameter[];
}

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
        type: "Emoji",
      },
      {
        name: "element1",
        type: "Emoji",
        hide: true,
      },
      {
        name: "element2",
        type: "Emoji",
        hide: true,
      },
      {
        name: "element3",
        type: "Emoji",
        hide: true,
      },
    ],
  },
  { title: "pop", icon: IconPop, parameters: [] },
  {
    title: "unshift",

    icon: IconUnshift,
    parameters: [
      { name: "element0", required: true, type: "Emoji" },
      {
        name: "element1",
        type: "Emoji",
        hide: true,
      },
      {
        name: "element2",
        type: "Emoji",
        hide: true,
      },
      {
        name: "element3",
        type: "Emoji",
        hide: true,
      },
    ],
  },
  { title: "shift", icon: IconShift, parameters: [] },
  {
    title: "fill",
    icon: IconFill,
    parameters: [
      { name: "element0", required: true, type: "Emoji" },
      {
        name: "start",
        type: "Number",
        hide: true,
        default: 0,
      },
      {
        name: "end",
        type: "Number",
        hide: true,
        default: 0,
      },
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
        default: 0,
        hide: false,
      },
      {
        name: "deleteCount",
        type: "Number",
        hide: true,
        default: 1,
      },
      { name: "item1", hide: true, type: "Emoji" },
      {
        name: "item2",
        type: "Emoji",
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
        default: 0,
      },
      {
        name: "end",
        type: "Number",
        hide: true,
        default: 0,
      },
    ],
  },
  {
    title: "reverse",
    icon: IconReverse,
    parameters: [],
  },
  {
    title: "with",
    icon: IconWith,
    parameters: [
      {
        name: "index",
        required: true,
        type: "Number",
        default: 0,
      },
      {
        name: "value",
        required: true,
        type: "Emoji",
        hide: false,
      },
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
        default: 0,
      },
      {
        name: "start",
        type: "Number",
        hide: true,
        default: 0,
      },
      {
        name: "end",
        type: "Number",
        hide: true,
        default: 0,
      },
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
        default: 0,
      },
    ],
  },
  {
    title: "includes",
    icon: IconIncludes,
    parameters: [
      { name: "searchElement", required: true, type: "Emoji" },
      {
        name: "fromIndex",
        type: "Number",
        hide: true,
        default: 0,
      },
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
        hide: false,
      },
      {
        name: "fromIndex",
        type: "Number",
        hide: true,
        default: 0,
      },
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
        default: 0,
      },
      {
        name: "fromIndex",
        type: "Number",
        hide: true,
        default: 0,
      },
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
        default: 0,
      },
    ],
  },
];
