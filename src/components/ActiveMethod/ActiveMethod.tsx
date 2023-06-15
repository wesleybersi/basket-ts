import { useContext, memo, useState, useRef, useEffect } from "react";
import { BasketContext } from "../../contexts/BasketContext";
import { MethodName } from "../../contexts/types";
import Parameters, { IParameter } from "../Parameters/Parameters";
import { IoMdPlay as IconRun } from "react-icons/io";
import useMethod from "../../hooks/useMethod";
import { IconType } from "react-icons";
import { Emoji } from "../../utils/getEmoji";
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
import {
  GoChevronRight as IconRight,
  GoChevronLeft as IconLeft,
} from "react-icons/go";
import { IoIosSwap as IconReverse } from "react-icons/io";

import { TbSlice as IconSlice } from "react-icons/tb";

import "./activemethod.scss";

interface Props {}

const ActiveMethods: React.FC<Props> = () => {
  const { state, dispatch } = useContext(BasketContext);
  const [currentMethod, setCurrentMethod] = useState<Method | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [parameterValues, setParameterValues] = useState<
    (Emoji | number | null)[]
  >([null, null, null, null]);
  const triggerMethod = useMethod(currentMethod?.title, parameterValues);

  interface Method {
    title: MethodName;
    icon?: IconType;
    parameters: IParameter[];
  }

  const methods: Method[] = [
    {
      title: "Push",
      icon: IconPush,
      parameters: [
        {
          name: "element0",
          required: true,
          type: "Emoji Picker",
        },
        {
          name: "element1",
          type: "Emoji Picker",
          hide: true,
        },
        {
          name: "element2",
          type: "Emoji Picker",
          hide: true,
        },
        {
          name: "element3",
          type: "Emoji Picker",
          hide: true,
        },
      ],
    },
    { title: "Pop", icon: IconPop, parameters: [] },
    {
      title: "Unshift",
      icon: IconUnshift,
      parameters: [
        { name: "element0", required: true, type: "Emoji Picker" },
        {
          name: "element1",
          type: "Emoji Picker",
          hide: true,
        },
        {
          name: "element2",
          type: "Emoji Picker",
          hide: true,
        },
        {
          name: "element3",
          type: "Emoji Picker",
          hide: true,
        },
      ],
    },
    { title: "Shift", icon: IconShift, parameters: [] },
    {
      title: "Reverse",
      icon: IconReverse,
      parameters: [],
    },
    {
      title: "Fill",
      icon: IconFill,
      parameters: [
        { name: "element0", required: true, type: "Emoji Picker" },
        {
          name: "start",
          type: "Number",
          hide: true,
          min: 0 - state.basket.length,
          max: state.basket.length - 1,
        },
        {
          name: "end",
          type: "Number",
          hide: true,
          min: 0 - state.basket.length,
          max: state.basket.length - 1,
        },
      ],
    },
    {
      title: "CopyWithin",
      icon: IconCopy,
      parameters: [
        {
          name: "target",
          type: "Number",
          hide: true,
          min: 0 - state.basket.length,
          max: state.basket.length - 1,
        },
        {
          name: "start",
          type: "Number",
          hide: true,
          min: 0 - state.basket.length,
          max: state.basket.length - 1,
        },
        {
          name: "end",
          type: "Number",
          hide: true,
          min: 0 - state.basket.length,
          max: state.basket.length - 1,
        },
      ],
    },
    {
      title: "Splice",
      icon: IconSplice,
      parameters: [
        {
          name: "start",
          type: "Number",
          required: true,
          defaultValue: 0,
          hide: false,
          min: 0 - state.basket.length,
          max: state.basket.length - 1,
        },
        {
          name: "deleteCount",
          type: "Number",
          hide: true,
          min: 0,
        },
        { name: "item1", hide: true, type: "Emoji Picker" },
        {
          name: "item2",
          type: "Emoji Picker",
          hide: true,
        },
      ],
    },
    {
      title: "Concat",
      icon: IconConcat,
      parameters: [
        {
          name: "index",
          type: "Number",
          hide: false,
          min: 0 - state.basket.length,
          max: state.basket.length - 1,
        },
      ],
    },
    {
      title: "Slice",
      icon: IconSlice,
      parameters: [
        {
          name: "start",
          type: "Number",
          hide: true,
          min: 0 - state.basket.length,
          max: state.basket.length - 1,
        },
        {
          name: "end",
          type: "Number",
          hide: true,
          min: 0 - state.basket.length,
          max: state.basket.length - 1,
        },
      ],
    },
    {
      title: "Includes",
      icon: IconIncludes,
      parameters: [
        { name: "searchElement", required: true, type: "Emoji Picker" },
        {
          name: "fromIndex",
          type: "Number",
          hide: true,
          min: 0 - state.basket.length,
          max: state.basket.length - 1,
        },
      ],
    },
    {
      title: "IndexOf",
      icon: IconIndexOf,
      parameters: [
        {
          name: "searchElement",
          required: true,
          type: "Emoji Picker",
          hide: false,
        },
        {
          name: "fromIndex",
          type: "Number",
          hide: true,
          min: 0 - state.basket.length,
          max: state.basket.length - 1,
        },
      ],
    },
    {
      title: "LastIndexOf",
      icon: IconIndexOf,
      parameters: [
        {
          name: "searchElement",
          required: true,
          type: "Emoji Picker",
          hide: false,
        },
        {
          name: "fromIndex",
          type: "Number",
          hide: true,
          min: 0 - state.basket.length,
          max: state.basket.length - 1,
        },
      ],
    },

    {
      title: "At",
      parameters: [
        {
          name: "index",
          required: true,
          type: "Number",
          min: 0 - state.basket.length,
          max: state.basket.length - 1,
        },
      ],
    },
  ];

  useEffect(() => {
    for (const method of methods) {
      if (method.title === state.method) {
        setCurrentIndex(
          methods.findIndex((method) => method.title === state.method)
        );
        method.parameters.forEach((param, index) => {
          if (param.required || !param.hide) {
            if (
              param.type === "Number" &&
              typeof parameterValues[index] !== "number"
            ) {
              parameterValues[index] = null;
            }
            if (
              param.type === "Emoji Picker" &&
              typeof parameterValues[index] === "number"
            ) {
              parameterValues[index] = null;
            }
          } else {
            parameterValues[index] = null;
          }
        });

        setCurrentMethod(method);
        if (
          method.title === "Fill" ||
          method.title === "Slice" ||
          method.title === "Includes" ||
          method.title === "IndexOf"
        ) {
          dispatch({
            type: "Select Items",
            start: 0,
            end: state.basket.length,
            target: null,
            amount: null,
            index: null,
          });
        } else if (method.title === "CopyWithin") {
          dispatch({
            type: "Select Items",
            start: 0,
            end: state.basket.length,
            target: 0,
            amount: null,
            index: null,
          });
        } else if (method.title === "Splice") {
          dispatch({
            type: "Select Items",
            start: 0,
            end: null,
            target: null,
            amount: null,
            index: null,
          });
        } else if (method.title === "LastIndexOf") {
          dispatch({
            type: "Select Items",
            start: 0,
            end: null,
            target: null,
            amount: state.basket.length,
            index: null,
          });
        } else {
          {
            dispatch({
              type: "Select Items",
              reset: true,
            });
          }
        }

        break;
      }
    }
  }, [state.method]);

  if (!currentMethod) {
    return <></>;
  }

  return (
    <section className="active-method">
      {/* <section className="dropdown-methods">
        <div>
          {methods.map(({ title }) => (
            <button>{title}</button>
          ))}
        </div>
      </section> */}
      <button
        style={
          methods[currentIndex - 1] ? {} : { opacity: 0, pointerEvents: "none" }
        }
        className="method-left"
        onClick={() => {
          if (methods[currentIndex - 1]) {
            dispatch({
              type: "Set Method",
              method: methods[currentIndex - 1].title,
            });
          }
        }}
      >
        <IconLeft size="32px" />
      </button>
      <button
        style={
          methods[currentIndex + 1]
            ? {}
            : { opacity: 0.2, pointerEvents: "none" }
        }
        className="method-right"
        onClick={() => {
          if (methods[currentIndex + 1]) {
            dispatch({
              type: "Set Method",
              method: methods[currentIndex + 1].title,
            });
          }
        }}
      >
        <IconRight size="32px" />
      </button>
      <div className="method-wrapper">
        <Parameters
          parameter1={currentMethod.parameters[0] ?? null}
          parameter2={currentMethod.parameters[1] ?? null}
          parameter3={currentMethod.parameters[2] ?? null}
          parameter4={currentMethod.parameters[3] ?? null}
          parameterValues={parameterValues}
          setParameterValues={setParameterValues}
        />

        <div
          className="method"
          //   style={
          //     currentMethod.parameters.length > 0
          //       ? {
          //           borderTopLeftRadius: "0",
          //           borderTopRightRadius: "0",
          //         }
          //       : {}
          //   }
        >
          {/* <span className="method-icon" /> */}
          <h2
            className="method-name"
            style={state.loading ? { opacity: 0.25 } : { opacity: 1 }}
          >
            basket.
            {currentMethod.title.substring(0, 1).toLowerCase()}
            {currentMethod.title.slice(1)}(
            {parameterValues.map((value, index, arr) => {
              if (value instanceof Emoji) {
                return (
                  value.emoji +
                  `${arr[index + 1] || arr[index + 1] === 0 ? "," : ""}`
                );
              } else {
                return arr[index + 1] || arr[index + 1] === 0
                  ? value + ","
                  : value;
              }
            })}
            )
          </h2>
          <button
            className="method-btn"
            onClick={() => {
              if (!state.loading) {
                triggerMethod(true);
              }
            }}
          >
            <div style={state.loading ? { opacity: "0.25" } : { opacity: "1" }}>
              {currentMethod.icon ? (
                <currentMethod.icon size="42px" />
              ) : (
                <IconRun size="42px" />
              )}
            </div>
            {/* <span
                            style={
                                state.loading
                                    ? {
                                          opacity: "1",
                                          animation:
                                              "runMethod 500ms ease alternate infinite",
                                      }
                                    : { opacity: "0" }
                            }
                        /> */}
          </button>
        </div>
      </div>
    </section>
  );
};

export default memo(ActiveMethods);
