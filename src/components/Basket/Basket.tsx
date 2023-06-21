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
    selectedIndexes,
    processedIndexes,
    selection,
    parameters,
    basketIndex,
  } = useStore();
  const { animationDuration: duration, soundEnabled } = settings;

  const basketRef = useRef<HTMLUListElement | null>(null);
  const [animationOffset, setAnimationOffset] = useState<string>("0");
  const [allBaskets, setAllBaskets] = useState<Emoji[][]>([[...basket]]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  useCSSProperty(basketRef.current, "--animation-offset", animationOffset);

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

  function normalizeAll(animation?: boolean) {
    if (!basketRef.current) {
      return;
    }
    const children = basketRef.current.children.length;
    [...new Array(children)].forEach((_, index) => {
      if (basketRef.current) {
        const child = basketRef.current.children[index] as HTMLElement;
        if (!animation) {
          itemStyling(child, "Normalize");
        } else {
          setAnimationOffset("0");
          child.style.animation = `addItem ${duration}ms ease`;
          child.addEventListener("animationend", end);
          function end() {
            itemStyling(child, "Normalize");
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
    normalizeAll();
  }, [basketIndex]);

  useEffect(() => {
    if (!loading && itemsToReplace.length === 0) {
      const baskets = [...allBaskets];
      baskets[currentIndex] = [...basket];
      setAllBaskets(baskets);
      normalizeAll();
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
  }, [loading]);

  useEffect(() => {
    if (!loading) {
      normalizeAll(true);

      const indexes = selectedIndexes.filter((index) => index < basket.length);
      set({ selectedIndexes: indexes });
    }
  }, [currentIndex]);

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
    <section className="basket-wrapper">
      <div className="basket-header">
        <p>const basket =</p>
        <Picker />
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
    </section>
  );
};

export default memo(Basket);
