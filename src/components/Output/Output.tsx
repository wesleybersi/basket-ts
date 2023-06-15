import { useContext, memo, useState, useRef, useEffect } from "react";
import { BasketContext } from "../../contexts/BasketContext";
import { Emoji } from "../../utils/getEmoji";
import useCSSProperty from "../../hooks/useCSSProperty";
import "./output.scss";

interface Props {
  duration: number;
}

const Output: React.FC<Props> = ({ duration }) => {
  const outputRef = useRef<HTMLUListElement | null>(null);
  const { state, dispatch } = useContext(BasketContext);
  const [clone, setClone] = useState<Emoji | null>(null);
  const [hide, setHide] = useState<boolean>(false);
  const [type, setType] = useState<"Array" | "Number" | "Item">("Item");
  const [offset, setOffset] = useState<string>("0");
  const [cloneOffset, setCloneOffset] = useState<string>("0");
  useCSSProperty(outputRef.current, "--brackets", type === "Array" ? "1" : "0");
  useCSSProperty(outputRef.current, "--output-offset", offset);
  useCSSProperty(outputRef.current, "--clone-offset", cloneOffset);

  useEffect(() => {
    setClone(null);
    if (
      state.method === "Fill" ||
      state.method === "Reverse" ||
      state.method === "CopyWithin"
    ) {
      setHide(true);
    } else {
      setHide(false);
    }
    if (
      state.method === "Push" ||
      state.method === "Unshift" ||
      state.method === "IndexOf" ||
      state.method === "LastIndexOf"
    ) {
      setType("Number");
      setOffset("0");
      setCloneOffset("0");
    }
    if (
      state.method === "Pop" ||
      state.method === "Shift" ||
      state.method === "At" ||
      state.method === "Includes"
    ) {
      if (state.method === "Shift" || state.method === "Includes") {
        setOffset("-10rem");
        setCloneOffset("10rem");
      } else if (state.method === "Pop") {
        setOffset("10rem");
        setCloneOffset("-10rem");
      }
      setType("Item");
    }
    if (
      state.method === "Splice" ||
      state.method === "Concat" ||
      state.method === "Slice"
    ) {
      setType("Array");
      setOffset("0");
      setCloneOffset("0");
    }
  }, [state.method]);

  useEffect(() => {
    if (!outputRef.current || !state.loading) {
      return;
    }
    if (state.method === "Splice" && state.itemsToAdd.length > 0) {
      return;
    }

    if (type === "Item") {
      const child = outputRef.current.firstChild as HTMLElement;
      const cloneChild = outputRef.current.children[1] as HTMLElement;

      if (child) {
        child.style.animation = `addOutputItem ${duration}ms ease-out`;
        child.addEventListener("animationend", childEnd);
      }

      if (cloneChild) {
        cloneChild.style.animation = `outputClone ${duration}ms ease-out`;
        cloneChild.addEventListener("animationend", cloneEnd);
      }

      function childEnd() {
        if (state.output instanceof Emoji && state.method !== "At") {
          setClone(state.output);
        }
        child.style.animation = "";
        child.removeEventListener("animationend", childEnd);
      }
      function cloneEnd() {
        if (!child) {
          setClone(null);
        }
        cloneChild.style.animation = "";
        cloneChild.removeEventListener("animationend", cloneEnd);
      }
    } else if (type === "Array") {
      for (const child of outputRef.current.children) {
        if (child instanceof HTMLElement) {
          child.style.animation = `addOutputItem ${duration}ms ease-out`;
          child.addEventListener("animationend", end);
        }
        function end() {
          if (child instanceof HTMLElement) {
            child.style.animation = "";
            child.removeEventListener("animationend", end);
            dispatch({ type: "Method Done" });
          }
        }
      }
    }
  }, [state.loading, type]);

  // useEffect(() => {
  //     if (!state.output) {
  //         setHide(true);
  //     } else {
  //         setHide(false);
  //     }
  // }, [state.output, state.method]);

  return (
    <section className="output-wrapper">
      {/* {hide && (
                <p
                    style={{
                        position: "absolute",
                        opacity: 0.2,
                        alignSelf: "center",
                        justifySelf: "center",
                        textAlign: "center",
                        width: "100%",
                    }}
                >
                    Method returns the modified array.
                </p>
            )} */}
      <div
        className="output-lens"
        style={
          hide
            ? {
                opacity: 0,
                transition: "all 250ms ease-in",
                transform: "translateY(calc(-100% - 2rem)",
              }
            : {
                width: type === "Array" ? "100%" : "16.5rem",
                opacity: 1,
                transform: "",
              }
        }
      >
        {/* <p
          className="output-header"
          style={{
            alignSelf: type === "Array" ? "flex-start" : "center",
          }}
        >
          returns
        </p> */}
        <ul
          className="output"
          ref={outputRef}
          style={
            hide
              ? {
                  transition: "all 250ms ease 250ms",
                  minWidth: "12.5rem",
                }
              : {
                  borderRadius: type === "Array" ? "100vw" : "100vw",
                  width: type === "Array" ? "100%" : "12.5rem",
                  transition: "all 250ms ease 250ms",
                }
          }
        >
          <>
            {typeof state.output === "number" && (
              <li className="output-item">{!state.loading && state.output}</li>
            )}
            {type === "Item" && (
              <>
                <li className="output-item output-emoji">
                  {state.output instanceof Emoji && state.output.emoji}
                </li>
                <li className="output-item output-clone">
                  {clone && clone.emoji}
                </li>
              </>
            )}
            {Array.isArray(state.output) &&
              state.output.map((item, index) => (
                <li className="output-item">{item.emoji}</li>
              ))}
          </>
        </ul>
      </div>
    </section>
  );
};

export default Output;
