import { useContext, memo, useState, useRef, useEffect } from "react";

import { Emoji } from "../../utils/emoji/emojis";
import useCSSProperty from "../../hooks/useCSSProperty";
import "./output.scss";
import { useStore } from "../../store/store";
import { playPopSound } from "../../utils/audio/pop-sound";
import Selection from "../Basket/components/Selection/Selection";

import {
  BsArrowDown as IconDown,
  BsArrowUpShort as IconUp,
} from "react-icons/bs";
import { RiAddFill as IconAdd } from "react-icons/ri";

const Output: React.FC = () => {
  const {
    set,
    loading,
    basket,
    settings,
    output,
    method,
    itemsToAdd,
    parameters,
    allBaskets,
    addOutputBasket,
  } = useStore();
  const { animationDuration: duration } = settings;

  const outputRef = useRef<HTMLUListElement | null>(null);
  const [clone, setClone] = useState<Emoji | null>(null);
  const [hide, setHide] = useState<boolean>(false);
  const [type, setType] = useState<"Array" | "Number" | "Item" | "String">(
    "Item"
  );
  const [offset, setOffset] = useState<string>("0");
  const [cloneOffset, setCloneOffset] = useState<string>("0");
  const [ascendItems, setAscendItems] = useState<boolean>(false);
  useCSSProperty(outputRef.current, "--brackets", type === "Array" ? "1" : "0");
  useCSSProperty(outputRef.current, "--output-offset", offset);
  useCSSProperty(outputRef.current, "--clone-offset", cloneOffset);

  function itemStyling(item: HTMLElement, state: "Zero" | "Normalize") {
    if (state === "Zero") {
      item.style.animation = "";
      item.style.fontSize = "0";
      item.style.flex = "0";
      item.style.opacity = "0";
      item.style.margin = "0";
    } else if (state === "Normalize") {
      item.style.animation = "";
      item.style.fontSize = "var(--itemFont)";
      item.style.flex = "1";
      item.style.opacity = "1";
    }
  }

  useEffect(() => {
    setClone(null);
    setHide(false);

    switch (method.title) {
      case "fill":
      case "reverse":
      case "copyWithin":
        setHide(true);
        break;
      case "push":
      case "unshift":
      case "indexOf":
      case "lastIndexOf":
        setType("Number");
        setOffset("0");
        setCloneOffset("0");
        break;
      case "includes":
      case "shift":
        setType("Item");
        setOffset("-10rem");
        setCloneOffset("10rem");
        break;
      case "pop":
        setType("Item");
        setOffset("10rem");
        setCloneOffset("-10rem");
        break;
      case "at":
        setType("Item");
        break;
      case "splice":
      case "concat":
      case "slice":
      case "with":
        setType("Array");
        setOffset("0");
        setCloneOffset("0");
        break;
      // case "join":
      //   setType("String");
      //   break;
    }
  }, [method]);

  useEffect(() => {
    if (!outputRef.current || !loading || ascendItems) {
      return;
    }
    if (method.title === "splice" && itemsToAdd.length > 0) {
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
        if (output instanceof Emoji && method.title !== "at") {
          setClone(output);
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
      let accumulator = 0;
      let count = 0;
      for (const child of outputRef.current.children) {
        if (!(child instanceof HTMLElement)) continue;
        itemStyling(child, "Zero");
        child.addEventListener("animationend", end);

        child.style.animation = `addItem ${duration}ms ease ${accumulator}ms`;

        if (method.title === "slice" || method.title === "with") {
          accumulator += duration / 2;
        } else {
          accumulator += duration;
        }
        function end() {
          if (!outputRef.current) return;

          if (method.title === "slice" || method.title === "with") {
            if (settings.soundEnabled) playPopSound();
            if (child === outputRef.current.lastChild) {
              setTimeout(() => {
                set({ loading: false });
              }, duration);
            }
          }
          count++;
          itemStyling(child as HTMLElement, "Normalize");
          child.removeEventListener("animationend", end);
          if (
            method.title === "with" &&
            parameters.get(0)?.value ===
              Array.from(outputRef.current.children).indexOf(child)
          ) {
            //Highlight
          }
        }
      }
    }
  }, [loading, type]);

  useEffect(() => {
    if (!outputRef.current) return;
    if (ascendItems) {
      set({ loading: true });
      for (const child of outputRef.current.children) {
        if (!child || !(child instanceof HTMLElement)) {
          setAscendItems(false);
          return;
        }
        child.style.animation = "ascend 300ms ease-in";
        child.addEventListener("animationend", end);

        function end() {
          if (!child || !(child instanceof HTMLElement)) {
            setAscendItems(false);
            return;
          }
          child.removeEventListener("animationend", end);
          child.style.animation = "";
          if (child === outputRef.current?.lastChild) {
            setAscendItems(false);
            if (Array.isArray(output) && output.length > 0) set({ output: [] });
          }
        }
      }
    }
  }, [ascendItems]);

  return (
    <section
      className="output-wrapper"
      style={{ pointerEvents: hide ? "none" : "all" }}
    >
      {hide && (
        <div
          className="hide-message"
          style={{
            textAlign: "center",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          Reference to original
        </div>
      )}
      <div
        className="output-lens"
        style={{
          opacity: hide ? 0 : 1,
          transition: "all 250ms ease",
          transform: hide ? "translateY(calc(-100% - 2rem)" : "",
          width: type === "Array" || type === "String" ? "100%" : "16.5rem",
          paddingTop: type === "Array" ? "2rem" : "0",
        }}
      >
        <div
          className="output-header"
          style={{
            flex: type === "Array" ? 1 : 0,
            paddingBottom: type === "Array" ? "1rem" : 0,
            overflow: "hidden",
          }}
        >
          <button
            className="output-basket-length"
            style={{
              background: "var(--blue)",
              marginRight: "0.5rem",
              color: "#222",
              fontWeight: 600,
            }}
          >
            {Array.isArray(output) ? output.length : 0}
          </button>
          <button
            className="output-add-basket"
            style={{
              background: "#22222211",
              color: "#555",
              opacity: allBaskets.length <= 5 && basket.length === 0 ? 1 : 0.45,
            }}
            onClick={() => {
              if (
                !loading &&
                basket.length === 0 &&
                Array.isArray(output) &&
                output.length > 0
              ) {
                setAscendItems(true);
                addOutputBasket();
              }
            }}
          >
            <IconUp size="32px" />
          </button>
        </div>

        <ul
          className="output"
          ref={outputRef}
          style={{
            transition: "all 250ms ease",
            width: "100%",
          }}
        >
          <>
            {type === "Number" && (
              <li className="output-item">
                {!loading && typeof output === "number" ? output : ""}
              </li>
            )}
            {type === "String" && (
              <li className="output-item">
                {!loading && typeof output === "string" ? output : ""}
              </li>
            )}
            {type === "Item" && (
              <>
                <li
                  className="output-item output-emoji"
                  onMouseEnter={() => set({ hoverItem: output as Emoji })}
                  onMouseLeave={() => set({ hoverItem: null })}
                >
                  {output instanceof Emoji && output.emoji}
                </li>
                <li
                  className="output-item output-clone"
                  onMouseEnter={() => set({ hoverItem: output as Emoji })}
                  onMouseLeave={() => set({ hoverItem: null })}
                >
                  {clone && clone.emoji}
                </li>
              </>
            )}
            {Array.isArray(output) &&
              output.map((item, index) => (
                <li
                  className="output-item"
                  onMouseEnter={() => set({ hoverItem: item })}
                  onMouseLeave={() => set({ hoverItem: null })}
                >
                  {item.emoji}
                </li>
              ))}
          </>
        </ul>
      </div>
    </section>
  );
};

export default Output;
