import { useEffect } from "react";
import { useStore } from "../../../store/store";
import { Emoji } from "../../../utils/emoji/emojis";

type ProcesserHook = (ref: HTMLUListElement | null) => void;

export const useProcessItems: ProcesserHook = (ref) => {
  const { set, loading, itemsToProcess, method, settings, processSuccesIndex } =
    useStore();

  useEffect(() => {
    if (!loading || itemsToProcess.length === 0) return;

    let accumulator = 0;
    const processed = new Set<number>();
    for (const index of itemsToProcess) {
      setTimeout(() => {
        processed.add(index);
        set({ processedIndexes: processed });

        if (
          index === itemsToProcess.length - 1 ||
          processSuccesIndex === index
        ) {
          setTimeout(() => {
            processed.clear();

            let output: Emoji | undefined = undefined;
            if (method.title === "includes") {
              if (processSuccesIndex >= 0) {
                output = { title: "True", emoji: "✅" };
              } else {
                output = { title: "False", emoji: "❌" };
              }
            }

            set({
              itemsToProcess: [],
              processedIndexes: processed,
              output,
              loading: false,
              processSuccesIndex: -1,
            });
          }, settings.animationDuration * 2);
        }
      }, accumulator);
      if (method.title === "slice") {
        accumulator += settings.animationDuration / 2;
      } else {
        accumulator += settings.animationDuration / 2;
      }
      if (processSuccesIndex === index) break;
    }
  }, [itemsToProcess]);
};
