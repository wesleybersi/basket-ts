import { useState, useRef, useEffect } from "react";
import useCSSProperty from "../../../../hooks/useCSSProperty";

interface Props {
  type: "red" | "blue" | "target" | "highlight";
  item: string;
}
const Selection: React.FC<Props> = ({ type, item }) => {
  const selectionRef = useRef<HTMLDivElement | null>(null);
  const [color, setColor] = useState<string>("");

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

  useCSSProperty(selectionRef.current, "--selectionColor", color);
  // if (type === "target") return <span className="basket-item-target" />;

  if (type === "highlight")
    return (
      <span
        // style={{ backgroundColor: "var(--highlight)" }}
        className="basket-item-selected"
      />
    );

  return (
    <>
      <div
        ref={selectionRef}
        style={
          {
            // border:
            //   type === "blue"
            //     ? "3px dashed var(--selection)"
            //     : "3px dashed var(--deleteCount)",
            // backgroundColor:
            //   type === "blue"
            //     ? "var(--selectionOpaque)"
            //     : "var(--deleteCountOpaque)",
          }
        }
        className="basket-item-selected"
      >
        {item}
      </div>
      <span className="basket-item-selected-blend" />
    </>
  );
};

export default Selection;
