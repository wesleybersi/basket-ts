import { memo, useState, useRef, useEffect } from "react";
import useCSSProperty from "../../hooks/useCSSProperty";
import { Emoji } from "../../utils/emoji/emojis";
import Picker from "./components/Picker/Picker";
import Selection from "./components/Selection/Selection";
import { playPopSound } from "../../utils/audio/pop-sound";
import { GiFruitBowl as IconFruit } from "react-icons/gi";
import { useStore } from "../../store/store";

import "./basket.scss";
import { useRemoveItems } from "./hooks/useRemoveItems";
import { itemStyling } from "./utilities/item-styling";
import { useAddItems } from "./hooks/useAddItems";
import { useReplaceItems } from "./hooks/useReplaceItems";
import { useProcessItems } from "./hooks/useProcessItems";

const Basket: React.FC = () => {
  const {
    set,
    settings,
    loading,
    basket,
    method,
    itemsToReplace,
    ascendAll,
    processedIndexes,
    selection,
    basketIndex,
    showSecondary,
  } = useStore();
  const { animationDuration: duration } = settings;

  const basketRef = useRef<HTMLUListElement | null>(null);
  const [animationOffset, setAnimationOffset] = useState<string>("0");
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [length, setLength] = useState<number>(basket.length);

  useCSSProperty(basketRef.current, "--animation-offset", animationOffset);

  useProcessItems(basketRef.current);
  useReplaceItems(basketRef.current);
  useAddItems(basketRef.current, setLength, setAnimationOffset, itemStyling);
  useRemoveItems(basketRef.current, setLength, itemStyling);

  function normalizeAll(animation?: boolean) {
    if (!basketRef.current) {
      return;
    }
    Array.from(basketRef.current.children).forEach((child, index) => {
      if (child instanceof HTMLElement) {
        if (!animation) {
          itemStyling(child, "Normalize");
        } else {
          setAnimationOffset("0");
          child.style.animation = `addItem ${duration * 1.25}ms ease`;
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
    if (!basketRef.current) return;
    if (!loading && itemsToReplace.length === 0) {
      setLength(basket.length);
      if (ascendAll) {
        normalizeAll();
        const showSelection = selection.show;
        set({ selection: { ...selection, show: false } });

        for (const child of basketRef.current.children) {
          if (!(child instanceof HTMLElement)) {
            return;
          }
          child.style.transform = "translateY(8rem)";
          child.style.animation = "ascendItemIn 250ms ease 250ms";
          child.addEventListener("animationend", end);

          function end() {
            if (!(child instanceof HTMLElement)) return;
            child.style.transform = "";
            child.style.animation = "";
            child.removeEventListener("animationend", end);
            if (child === basketRef.current?.lastChild) {
              set({
                loading: false,
                ascendAll: false,
                selection: { ...selection, show: showSelection },
              });
              normalizeAll();
            }
          }
        }
      } else {
        normalizeAll();
      }
    }

    if (
      loading &&
      (method.title === "includes" ||
        method.title === "indexOf" ||
        method.title === "lastIndexOf")
    ) {
      set({ loading: false });
    }
  }, [loading, ascendAll]);

  useEffect(() => {
    setLength(basket.length);
    if (!initialLoad && !loading) normalizeAll(true);
    setInitialLoad(false);
  }, [basketIndex]);

  return (
    <section
      className="basket-wrapper"
      style={{
        borderBottomLeftRadius: "4rem",
        borderBottomRightRadius: "4rem",
        paddingBottom: showSecondary ? "12rem" : "",
      }}
    >
      {/* <div className="basket-menu"></div> */}
      <div className="basket-circle">
        <div className="basket-half-circle">
          {/* <div>
            <IconFruit size="24px" color="var(--grey)" />
          </div> */}
          <div
            style={{ cursor: "pointer" }}
            onClick={() =>
              set({
                settings: { ...settings, aboutIsOpen: !settings.aboutIsOpen },
              })
            }
          >
            <IconFruit size="50px" color="var(--grey)" />
          </div>
          {/* <div>
            <IconFruit size="24px" color="var(--grey)" />
          </div> */}
        </div>
      </div>
      <div className="basket-header">
        <p className="basket-header-title">const basket =</p>
        <Picker type="Primary" selection={basketIndex} length={length} />
      </div>
      <ul className="basket" ref={basketRef}>
        {basket.length === 0 && <li></li>}
        {basket.map((item, index) => (
          <li
            className="basket-item"
            onMouseOver={() => set({ hoverItem: item })}
            onMouseLeave={() => set({ hoverItem: null })}
          >
            {item.emoji}{" "}
            {selection.show &&
              // selectedIndexes.includes(index) &&
              !processedIndexes.has(index) && (
                <Selection
                  index={index}
                  type={
                    selection.amount !== undefined &&
                    selection.amount > 0 &&
                    method.title !== "lastIndexOf"
                      ? "red"
                      : "blue"
                  }
                  item={item.emoji}
                />
              )}
            {selection.target !== undefined && selection.target === index && (
              <Selection index={index} type="target" item={item.emoji} />
            )}
            {selection.highlight === index && (
              <Selection index={index} type="highlight" item={item.emoji} />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default memo(Basket);
