import { useEffect } from "react";
import { useStore } from "../../../store/store";
import { playPopSound } from "../../../utils/audio/pop-sound";

type AdderHook = (
  basketRef: HTMLUListElement | null,
  setBasketLength: React.Dispatch<React.SetStateAction<number>>,
  setAnimationOffset: React.Dispatch<React.SetStateAction<string>>,
  itemStyling: (item: HTMLElement, state: "Zero" | "Normalize") => void
) => void;

export const useAddItems: AdderHook = (
  basketRef,
  setBasketLength,
  setAnimationOffset,
  itemStyling
) => {
  const { set, loading, basket, itemsToRemove, itemsToAdd, method, settings } =
    useStore();

  useEffect(() => {
    //Sees when items need to be added to the basket. And animates them appropriately.
    if (
      itemsToAdd.length === 0 ||
      !basketRef ||
      !loading ||
      itemsToRemove.length !== 0
    ) {
      return;
    }
    const processed = new Set<number>();

    const noItems = itemsToAdd.length === basket.length;

    console.log(itemsToAdd);

    // Normalize original items
    if ((!noItems && method.title === "splice") || method.title === "unshift") {
      let count = 0;
      for (const index of itemsToAdd) {
        if (index === basketRef.children.length - 1 - count) {
          continue;
        }
        const child = basketRef.children[
          basketRef.children.length - 1 - count
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
      const child = basketRef.children[index] as HTMLElement;
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
          }, settings.animationDuration);
        } else {
          animationOffset();
        }
      }
      child.addEventListener("animationstart", start);
      child.addEventListener("animationend", end);

      child.style.animation = `addItem ${settings.animationDuration}ms ease ${accumulator}ms`;
      accumulator += settings.animationDuration;

      function start() {
        setBasketLength((prev) => prev + 1);
      }
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
            processedIndexes: processed,
          });
        }
        child.removeEventListener("animationstart", start);
        child.removeEventListener("animationend", end);
      }
    }
  }, [itemsToAdd]);
};
