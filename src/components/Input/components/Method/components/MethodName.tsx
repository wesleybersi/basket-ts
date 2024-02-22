import styles from "./name.module.scss";
import { useStore } from "../../../../../store/store";
import { Emoji, isEmoji } from "../../../../../utils/emoji/emojis";
import { useEffect, useRef, useState } from "react";
import Parentheses from "./Parentheses";

const MethodName = () => {
  const { loading, method, parameters } = useStore();
  const [innerContent, setInnerContent] = useState<
    (string | number | undefined)[]
  >([]);

  useEffect(() => {
    if (method.title === "concat") {
      setInnerContent(["crate"]);
      return;
    }
    const content = Array.from(parameters).map(
      ([id, parameter], index, arr) => {
        if (!parameter) return;
        if (isEmoji(parameter.value)) {
          return (
            parameter.value.emoji +
            `${
              parameters.get(index + 1)?.value ||
              parameters.get(index + 1)?.value === 0
                ? ", "
                : ""
            }`
          );
        } else if (typeof parameter.value === "number") {
          return parameters.get(index + 1)?.value ||
            parameters.get(index + 1)?.value === 0
            ? parameter.value + ", "
            : parameter.value;
        }
      }
    );
    setInnerContent(content);
  }, [method, parameters, loading]);

  return (
    <div
      className={styles.name}
      style={{
        opacity: loading ? 0.65 : 1,
      }}
    >
      <div className="method-name-title">
        basket.<span className="b">{method.title}</span>
        <Parentheses>
          <>{innerContent.map((content) => content)}</>
        </Parentheses>
      </div>
    </div>
  );
};

export default MethodName;
