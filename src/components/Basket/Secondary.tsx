import { useEffect, useRef } from "react";
import { useStore } from "../../store/store";
import Picker from "./components/Picker/Picker";
import "./basket.scss";

const Secondary = () => {
  const secondaryRef = useRef<HTMLUListElement | null>(null);
  const { set, secondary, settings, secondaryIndex, showSecondary } =
    useStore();

  function normalizeAll(animation?: boolean) {
    if (!secondaryRef.current) {
      return;
    }
    Array.from(secondaryRef.current.children).forEach((child, index) => {
      if (child instanceof HTMLElement) {
        if (!animation) {
          itemStyling(child, "Normalize");
        } else {
          child.style.animation = `addItem ${
            settings.animationDuration * 1.25
          }ms ease`;
          child.addEventListener("animationend", end);
          function end() {
            itemStyling(child as HTMLElement, "Normalize");
            child.removeEventListener("animationend", end);
          }
        }
      }
    });
  }
  useEffect(() => {
    normalizeAll(true);
  }, [secondaryIndex]);

  function itemStyling(item: HTMLElement, state: "Zero" | "Normalize") {
    if (state === "Zero") {
      item.style.animation = "";
      item.style.transform = "";
      item.style.fontSize = "0";
      item.style.flex = "0";
      item.style.opacity = "0";
      item.style.margin = "0";
    } else if (state === "Normalize") {
      item.style.animation = "";
      item.style.transform = "";
      item.style.fontSize = "var(--itemFont)";
      item.style.flex = "1";
      item.style.opacity = "1";
    }
  }

  return (
    <div
      className="secondary-lens"
      style={{ marginTop: showSecondary ? "-15rem" : "-5rem" }}
    >
      <section
        className="basket-wrapper secondary-wrapper"
        style={showSecondary ? { marginTop: 0 } : { marginTop: "-20rem" }}
      >
        <div className="basket-header">
          <p>const crate =</p>
          <Picker
            type="Secondary"
            selection={secondaryIndex}
            length={secondary.length}
          />
        </div>
        <ul className="basket" ref={secondaryRef}>
          {secondary.length === 0 && <li></li>}
          {secondary.map((item, index) => (
            <li
              className="secondary-item"
              onMouseEnter={() => set({ hoverItem: item })}
              onMouseLeave={() => set({ hoverItem: null })}
            >
              {item.emoji}{" "}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Secondary;
