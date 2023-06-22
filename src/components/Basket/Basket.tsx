import { memo, useState, useRef, useEffect } from "react";
import useCSSProperty from "../../hooks/useCSSProperty";
import { Emoji } from "../../utils/emoji/emojis";
import Picker from "./components/Picker/Picker";
import Selection from "./components/Selection/Selection";
import { playPopSound } from "../../utils/audio/pop-sound";

import { useStore } from "../../store/store";

import "./basket.scss";

const Basket: React.FC = () => {
  const {
    set,
    settings,
    loading,
    basket,
    method,
    itemsToAdd,
    itemsToRemove,
    itemsToReplace,
    itemsToProcess,
    ascendAll,
    selectedIndexes,
    processedIndexes,
    secondary,
    selection,
    parameters,
    basketIndex,
    showSecondary,
  } = useStore();
  const { animationDuration: duration, soundEnabled } = settings;

  const basketRef = useRef<HTMLUListElement | null>(null);
  const secondaryRef = useRef<HTMLUListElement | null>(null);
  const [animationOffset, setAnimationOffset] = useState<string>("0");

  useCSSProperty(basketRef.current, "--animation-offset", animationOffset);

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
    if (itemsToReplace.length === 0 || !basketRef.current || !loading) {
      console.log(loading);
      console.log(itemsToReplace);
      return;
    }
    let accumulator = 0;
    let replaceDuration =
      method.title === "reverse" || method.title === "fill"
        ? duration / 2
        : duration;
    let count = 0;

    const processed = new Set<number>();
    for (const { index, replacement } of itemsToReplace) {
      setTimeout(() => {
        //ANCHOR Replace item every iteration
        set((state) => {
          const updatedBasket = [...state.basket];
          updatedBasket[index] = replacement;
          return {
            basket: updatedBasket,
          };
        });
        if (settings.soundEnabled) playPopSound();

        processed.add(selectedIndexes[count]);
        set({ processedIndexes: processed });

        count++;
        if (count === itemsToReplace.length) {
          //ANCHOR Items replaced
          setTimeout(() => {
            set({
              loading: false,
              itemsToReplace: [],
              processedIndexes: new Set(),
            });
          }, replaceDuration);
        }
      }, accumulator);
      accumulator += replaceDuration;
    }
  }, [itemsToReplace]);

  useEffect(() => {
    if (!loading || itemsToProcess.length === 0) return;

    let accumulator = 0;
    const processed = new Set<number>();
    for (const index of itemsToProcess) {
      setTimeout(() => {
        processed.add(index);
        set({ processedIndexes: processed });
        if (index === itemsToProcess.length - 1) {
          setTimeout(() => {
            processed.clear();
            set({ itemsToProcess: [], processedIndexes: processed });
          }, duration);
        }
      }, accumulator);
      if (method.title === "slice" || method.title === "with") {
        accumulator += duration / 2;
      } else {
        accumulator += duration;
      }
    }
  }, [itemsToProcess]);

  useEffect(() => {
    if (!basketRef.current) return;
    if (!loading && itemsToReplace.length === 0) {
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
              console.log("Animating end");
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
        method.title === "at" ||
        method.title === "indexOf" ||
        method.title === "lastIndexOf")
    ) {
      set({ loading: false });
    }
  }, [loading, ascendAll]);

  useEffect(() => {
    if (!loading) normalizeAll(true);
  }, [basketIndex]);

  useEffect(() => {
    //Sees when items need to be added to the basket. And animates them appropriately.
    if (
      itemsToAdd.length === 0 ||
      !basketRef.current ||
      !loading ||
      itemsToRemove.length !== 0
    ) {
      return;
    }
    const processed = new Set<number>();
    const noItems = itemsToAdd.length === basket.length;

    // Normalize original items
    if ((!noItems && method.title === "splice") || method.title === "unshift") {
      let count = 0;
      for (const index of itemsToAdd) {
        if (index === basketRef.current.children.length - 1 - count) {
          continue;
        }
        const child = basketRef.current.children[
          basketRef.current.children.length - 1 - count
        ] as HTMLElement;
        itemStyling(child, "Normalize");
        count++;
      }
    }

    function animationOffset() {
      if (method.title === "push") {
        setAnimationOffset("1rem");
      } else if (method.title === "unshift") {
        setAnimationOffset("-1rem");
      }
    }
    setAnimationOffset("0");
    let accumulator = 0;

    for (const index of itemsToAdd) {
      const child = basketRef.current.children[index] as HTMLElement;
      if (!child) {
        return;
      }
      child.style.flex = "0";
      itemStyling(child, "Zero");

      if (accumulator === 0) {
        if (noItems) {
          setAnimationOffset("0");
          setTimeout(() => {
            animationOffset();
          }, duration);
        } else {
          animationOffset();
        }
      }

      child.addEventListener("animationend", end);

      child.style.animation = `addItem ${duration}ms ease ${accumulator}ms`;
      accumulator += duration;

      function end() {
        processed.add(index);
        set({ processedIndexes: processed });
        itemStyling(child, "Normalize");
        if (settings.soundEnabled) playPopSound();
        if (index === itemsToAdd[itemsToAdd.length - 1]) {
          //ANCHOR Items added
          processed.clear();
          set({
            loading: false,
            itemsToAdd: [],
            triggerSplice: false,
            processedIndexes: processed,
          });
        }
        child.removeEventListener("animationend", end);
      }
    }
  }, [itemsToAdd]);

  useEffect(() => {
    //Sees when items need to be removed from array, and animates them appropriately.
    if (!basketRef.current || !loading || itemsToRemove.length === 0) {
      return;
    }

    let accumulator = 0;
    let count = 0;

    for (const index of itemsToRemove) {
      const child = basketRef.current.children[index] as HTMLElement;
      if (!child) continue;
      itemStyling(child, "Normalize");
      child.addEventListener("animationend", end);
      child.style.animation = `removeItem ${duration}ms ease ${accumulator}ms`;

      function end() {
        itemStyling(child, "Zero");
        if (settings.soundEnabled) playPopSound();
        count++;
        if (count === itemsToRemove.length) {
          //ANCHOR Items removed
          set((state) => {
            const updatedBasket = state.basket.filter(
              (_, index) => !state.itemsToRemove.includes(index)
            );

            const spliceAdd = parameters.get(2)?.value ? true : false;

            return {
              ...state,
              basket: updatedBasket,
              loading: false,
              itemsToRemove: [],
              triggerSplice: spliceAdd,
              selection: {
                ...selection,
                show: !spliceAdd,
              },
            };
          });
        }
        child.removeEventListener("animationend", end);
      }
      accumulator += duration;
    }
  }, [itemsToRemove]);

  return (
    <section
      className="basket-wrapper"
      style={{
        borderBottomLeftRadius: showSecondary ? 0 : "4rem",
        borderBottomRightRadius: showSecondary ? 0 : "4rem",
      }}
    >
      <div className="basket-header">
        <p>const basket =</p>
        <Picker type="Primary" />
      </div>
      <ul className="basket" ref={basketRef}>
        {basket.length === 0 && <li></li>}
        {basket.map((item, index) => (
          <li
            className="basket-item"
            onMouseEnter={() => set({ hoverItem: item })}
            onMouseLeave={() => set({ hoverItem: null })}
          >
            {item.emoji}{" "}
            {selection.show &&
              selectedIndexes.includes(index) &&
              !processedIndexes.has(index) && (
                <Selection
                  type={
                    selection.amount !== undefined &&
                    selection.amount > 0 &&
                    method.title !== "lastIndexOf"
                      ? "red"
                      : "blue"
                  }
                />
              )}
            {selection.target !== undefined && selection.target === index && (
              <Selection type="target" />
            )}
            {selection.highlight === index && <Selection type="highlight" />}
          </li>
        ))}
      </ul>
      {/* ANCHOR SECONDARY */}
      {/* 
      <div className="basket-header">
        <p>const crate =</p>
        <Picker type="Secondary" />
      </div>
      <ul className="basket" ref={secondaryRef} style={{ marginTop: "-1rem" }}>
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
      </ul> */}
    </section>
  );
};

export default memo(Basket);
