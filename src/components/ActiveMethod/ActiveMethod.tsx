import { memo, useState, useEffect } from "react";
import Parameters from "../Parameters/Parameters";
import { allMethods } from "../../store/methods";
import { useStore } from "../../store/store";
import { Emoji } from "../../utils/emoji/emojis";

import {
  GoChevronRight as IconRight,
  GoChevronLeft as IconLeft,
} from "react-icons/go";

import "./activemethod.scss";

interface Props {}

const ActiveMethods: React.FC<Props> = () => {
  const { set, loading, method, methods, parameterValues } = useStore();
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    for (const { title } of allMethods) {
      if (title === method.title) {
        setIndex(allMethods.findIndex((method) => title === method.title));
      }
    }
    const updatedParameters = [...parameterValues];
    method.parameters.forEach((param, index) => {
      if (param.required || !param.hide) {
        if (
          param.type === "Number" &&
          typeof parameterValues[index] !== "number"
        ) {
          updatedParameters[index] = null;
        }
        if (
          param.type === "Emoji" &&
          typeof parameterValues[index] === "number"
        ) {
          updatedParameters[index] = null;
        }
      } else {
        updatedParameters[index] = null;
      }
    });
    set({ parameterValues: updatedParameters });
  }, [method]);

  return (
    <section className="active-method">
      <button
        style={
          allMethods[index - 1] ? {} : { opacity: 0, pointerEvents: "none" }
        }
        className="method-left"
        onClick={() =>
          set({
            method: allMethods[index - 1],
          })
        }
      >
        <IconLeft size="32px" />
      </button>
      <button
        style={
          allMethods[index + 1] ? {} : { opacity: 0, pointerEvents: "none" }
        }
        className="method-right"
        onClick={() =>
          set({
            method: allMethods[index + 1],
          })
        }
      >
        <IconRight size="32px" />
      </button>
      <div className="method-wrapper">
        <Parameters />
        <div className="method">
          <h2
            className="method-name"
            style={loading ? { opacity: 0.25 } : { opacity: 1 }}
          >
            basket.
            {method.title}(
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
              if (!loading) methods[method.title]();
            }}
          >
            <div style={loading ? { opacity: "0.5" } : { opacity: "1" }}>
              <method.icon size="42px" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default memo(ActiveMethods);
