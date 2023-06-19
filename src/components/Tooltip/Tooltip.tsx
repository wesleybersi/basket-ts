import useMousePosition from "../../hooks/useMousePosition";
import { useStore } from "../../store/store";
import "./tooltip.scss";

const Tooltip = () => {
  const { x, y } = useMousePosition();
  const { hoverItem } = useStore();
  if (!hoverItem) return <></>;

  return (
    <div
      className="tooltip"
      style={{ position: "fixed", left: x + 10, top: y }}
    >
      {hoverItem?.title}
    </div>
  );
};

export default Tooltip;
