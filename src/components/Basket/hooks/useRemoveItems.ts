import { useEffect } from "react";
import { useStore } from "../../../store/store";
import { playPopSound } from "../../../utils/audio/pop-sound";
import { Emoji } from "../../../utils/emoji/emojis";

type RemoverHook = (
  basketRef: HTMLUListElement | null,
  setBasketLength: React.Dispatch<React.SetStateAction<number>>,
  itemStyling: (item: HTMLElement, state: "Zero" | "Normalize") => void
) => void;

export const useRemoveItems: RemoverHook = (
  basketRef,
  setBasketLength,
  itemStyling
) => {
  const { set, loading, itemsToRemove, settings } = useStore();

  useEffect(() => {
    //Sees when items need to be removed from array, and animates them appropriately.
    if (!basketRef || !loading || itemsToRemove.length === 0) {
      return;
    }

    let accumulator = 0;
    let count = 0;

    for (const index of itemsToRemove) {
      const child = basketRef.children[index] as HTMLElement;
      if (!child) continue;
      itemStyling(child, "Normalize");
      child.addEventListener("animationstart", start);
      child.addEventListener("animationend", end);
      child.style.animation = `removeItem ${settings.animationDuration}ms ease ${accumulator}ms`;

      function start() {
        setBasketLength((prev) => prev - 1);
      }
      function end() {
        itemStyling(child, "Zero");
        if (settings.soundEnabled) playPopSound();
        count++;
        if (count === itemsToRemove.length) {
          //ANCHOR Items removed
          set((state) => {
            const updatedBasket = state.basket
              .map((item) => ({ ...item } as Emoji))
              .filter((_, index) => !state.itemsToRemove.includes(index));

            return {
              ...state,
              basket: updatedBasket,
              loading: false,
              itemsToRemove: [],
              processedIndexes: new Set(),
            };
          });
        }
        child.removeEventListener("animationstart", start);
        child.removeEventListener("animationend", end);
      }
      accumulator += settings.animationDuration;
    }
  }, [itemsToRemove]);
};
