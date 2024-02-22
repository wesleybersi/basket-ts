import { useEffect } from "react";
import { useStore } from "../../../store/store";
import { playPopSound } from "../../../utils/audio/pop-sound";

type ReplacerHook = (basketRef: HTMLUListElement | null) => void;

export const useReplaceItems: ReplacerHook = (basketRef) => {
  const {
    set,
    loading,
    itemsToReplace,
    selectedIndexes,
    spliceAdd,
    spliceRemove,
    method,
    settings,
  } = useStore();

  useEffect(() => {
    if (itemsToReplace.length === 0 || !basketRef || !loading) {
      return;
    }
    let accumulator = 0;
    let replaceDuration =
      method.title === "reverse" || method.title === "fill"
        ? settings.animationDuration / 2
        : settings.animationDuration;
    let count = 0;

    const processed = new Set<number>();
    for (const { index, replacement } of itemsToReplace) {
      setTimeout(() => {
        //ANCHOR Replace item every iteration
        set((state) => {
          return {
            basket: state.basket.map((item, i) =>
              i === index ? { ...replacement } : item
            ),
          };
        });
        if (settings.soundEnabled) playPopSound();

        if (method.title === "copyWithin") {
          processed.add(selectedIndexes[count]);
        } else {
          processed.add(selectedIndexes[count]);
        }
        set({ processedIndexes: processed });

        count++;
        if (count === itemsToReplace.length) {
          //ANCHOR Items replaced

          setTimeout(() => {
            set((state) => {
              return {
                basket: spliceAdd
                  ? [
                      ...state.basket.slice(0, index + 1),
                      spliceAdd,
                      ...state.basket.slice(index + 1),
                    ]
                  : state.basket,
                loading: spliceRemove.length > 0 || spliceAdd ? true : false,
                processedIndexes:
                  spliceRemove.length > 0 ? processed : new Set(),
                itemsToReplace: [],
                itemsToRemove: [...state.spliceRemove],
                itemsToAdd: spliceAdd ? [index + 1] : [],
                spliceRemove: [],
                spliceAdd: null,
              };
            });
          }, replaceDuration);
        }
      }, accumulator);
      accumulator += replaceDuration;
    }
  }, [itemsToReplace]);
};
