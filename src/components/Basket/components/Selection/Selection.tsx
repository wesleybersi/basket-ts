import { useState, useRef, useEffect } from "react";
import useCSSProperty from "../../../../hooks/useCSSProperty";
import { useStore } from "../../../../store/store";
import { Emoji } from "../../../../utils/emoji/emojis";

interface Props {
  type: "red" | "blue" | "target" | "highlight";
  item: string;
}
const Selection: React.FC<Props> = ({ type, item }) => {
  const { parameters, method } = useStore();
  const selectionRef = useRef<HTMLDivElement | null>(null);
  const [color, setColor] = useState<string>("");
  const [emoji, setEmoji] = useState<string>("");

  useEffect(() => {
    if (type === "red") {
      setColor("var(--red)");
    } else if (type === "blue") {
      setColor("var(--selection)");
    } else if (type === "target") {
      setColor("var(--target)");
    } else if (type === "highlight") {
      setColor("var(--highlight)");
    }
  }, [type]);

  useEffect(() => {
    if (method.title !== "with") return;
    const param = parameters.get(1);
    const value = param?.value;
    if (value && value instanceof Emoji) {
      setEmoji(value.emoji);
    }
  }, [parameters.get(1)?.value]);

  useEffect(() => {
    if (method.title !== "fill") return;
    const param = parameters.get(0);
    const value = param?.value;
    if (value && value instanceof Emoji) {
      setEmoji(value.emoji);
    }
  }, [parameters.get(0)?.value]);

  useEffect(() => {
    if (method.title !== "with" && method.title !== "fill") {
      setEmoji(item);
    }
  }, [method.title]);

  useCSSProperty(selectionRef.current, "--selectionColor", color);

  return (
    <div ref={selectionRef} className="basket-item-selected">
      {emoji}
    </div>
  );
};

export default Selection;
