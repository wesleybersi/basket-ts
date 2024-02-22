import { useState, useRef, useEffect } from "react";
import useCSSProperty from "../../../../hooks/useCSSProperty";
import { useStore } from "../../../../store/store";
import { Emoji, isEmoji } from "../../../../utils/emoji/emojis";

interface Props {
  index: number;
  type: "red" | "blue" | "target" | "highlight";
  item: string;
}
const Selection: React.FC<Props> = ({ index, type, item }) => {
  const {
    parameters,
    method,
    basket,
    selection,
    selectedIndexes,
    targetedIndexes,
  } = useStore();
  const selectionRef = useRef<HTMLDivElement | null>(null);
  const [color, setColor] = useState<string>("");
  const [emoji, setEmoji] = useState<string>("");

  useEffect(() => {
    if (type === "red") {
      setColor("var(--red)");
    } else if (type === "blue") {
      setColor("var(--selection)");
      // } else if (type === "target") {
      // setColor("var(--target)");
    } else if (type === "highlight") {
      // setColor("var(--highlight)");
    }
  }, [type]);

  useEffect(() => {
    if (method.title !== "fill") return;
    const param = parameters.get(0);
    const value = param?.value;
    if (isEmoji(value)) {
      if (selectedIndexes.includes(index)) {
        setEmoji(value.emoji);
      } else {
        setEmoji("");
      }
    }
  }, [parameters.get(0)?.value, method.title, selectedIndexes]);

  useEffect(() => {
    if (method.title !== "slice") return;

    if (selectedIndexes.includes(index)) {
      // setEmoji("🔪");
      setEmoji(item);
    } else setEmoji("");
  }, [method.title, selectedIndexes]);

  useEffect(() => {
    if (method.title !== "splice") return;

    const item1 = parameters.get(2)?.value as Emoji;
    const item2 = parameters.get(3)?.value as Emoji;

    if (item2 && index === selectedIndexes[0] + 1) {
      setEmoji(item2.emoji);
      if (
        selection.amount === 0 ||
        (selection.amount && selection.amount < 0)
      ) {
        setColor("var(--selection)");
      } else if (selection.amount === 1) {
        setColor("var(--selection)");
      } else {
        setColor("var(--red)");
      }
      return;
    }

    if (selectedIndexes.includes(index)) {
      if (selection.amount) {
        if (index === selectedIndexes[0] && item1) {
          if (selection.amount === 1) {
            setColor("var(--red)");
          }
          setEmoji(item1.emoji);
        } else if (index === selectedIndexes[0] + 1 && item2) {
          if (selection.amount === 1) {
            setColor("var(--selection)");
          } else {
            setColor("var(--red)");
          }
          setEmoji(item2.emoji);
        } else {
          setEmoji("❌");
          setColor("var(--red)");
        }
      } else if (selection.amount === 0) {
        setColor("var(--selection)");
        if (index === selectedIndexes[0] && item1) {
          setEmoji(item1.emoji);
        } else if (index === selectedIndexes[0] + 1 && item2) {
          setEmoji(item2.emoji);
        } else {
          setEmoji("");
        }
      } else {
        setEmoji("❌");
        setColor("var(--red)");
      }
    } else {
      setEmoji("");
    }
  }, [
    method.title,
    selectedIndexes,
    parameters.get(2)?.value,
    parameters.get(3)?.value,
    selection.amount,
  ]);

  useEffect(() => {
    if (method.title === "copyWithin") {
      if (selection.target !== undefined && index < selection.target) {
        setEmoji("");
      } else {
        if (selection.start !== undefined && selection.target !== undefined) {
          if (selection.end !== undefined) {
            // const amount = selection.end - selection.start;
            const amount = selectedIndexes.length;

            if (index >= selection.target + amount) {
              setEmoji("");
              return;
            }
          }
          setEmoji(basket[index + selection.start - selection.target]?.emoji);
        } else if (
          selection.start === undefined &&
          selection.target !== undefined
        ) {
          setEmoji(basket[index].emoji);
        }
      }
    }
    //TODO Negative numbers.
    //TODO Processed
  }, [method.title, selection.target, selection.start, selection.end]);

  useEffect(() => {
    if (
      method.title !== "fill" &&
      method.title !== "copyWithin" &&
      method.title !== "slice" &&
      method.title !== "splice"
    ) {
      if (selectedIndexes.includes(index)) {
        if (type === "red") setEmoji("❌");
        else setEmoji(item);
      } else if (targetedIndexes.includes(index)) {
        setEmoji("❌");
      } else {
        setEmoji("");
      }
    }
  }, [method.title, selectedIndexes]);

  useCSSProperty(selectionRef.current, "--selectionColor", color);

  return (
    <div ref={selectionRef} className="basket-item-selected">
      {emoji}
    </div>
  );
};

export default Selection;
