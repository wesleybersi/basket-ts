import { RiAddFill as IconAdd } from "react-icons/ri";
import { useState, useEffect, useRef } from "react";
import { useStore } from "../../../../store/store";
import "./picker.scss";

interface Props {
  type: "Primary" | "Secondary";
  selection: number;
  length: number;
}

const Picker: React.FC<Props> = ({ type, length, selection }) => {
  const pickRef = useRef<HTMLDivElement | null>(null);
  const [adding, setAdding] = useState<number>(0);
  const { loading, allBaskets, changeBasket, addEmptyBasket, settings } =
    useStore();

  useEffect(() => {
    if (!pickRef.current) return;
    const selectedBasket = pickRef.current.children[selection];
    if (!selectedBasket || !(selectedBasket instanceof HTMLElement)) return;

    if (adding === selection) {
      selectedBasket.style.animation = `newBasket ${settings.animationDuration}ms ease`;
      setAdding(-1);
    } else {
      selectedBasket.style.animation = `newItem ${
        settings.animationDuration - 30
      }ms ease`;
    }

    selectedBasket.addEventListener("animationend", end);

    function end() {
      console.log("B");
      if (!selectedBasket || !(selectedBasket instanceof HTMLElement)) return;
      selectedBasket.style.animation = "";
      selectedBasket.removeEventListener("animationend", end);
    }
  }, [length, selection]);

  return (
    <div className="basket-picker" ref={pickRef}>
      {allBaskets.map((basketPick, index) => (
        <button
          style={
            selection === index
              ? {
                  background: length < 20 ? "var(--blue)" : "var(--red)",
                  color: length < 20 ? "var(--black)" : "white",
                  fontWeight: 600,
                  transform: "scale(1)",
                }
              : {
                  background: "transparent",
                  color: "#555",
                  transform: "scale(0.75)",
                }
          }
          onClick={() => {
            if (!loading) {
              if (selection !== index) changeBasket(type, index);
              // else removeBasket(index);
            }
          }}
        >
          <p>{selection === index ? length : basketPick.length}</p>
        </button>
      ))}
      <button
        className="basket-add"
        style={{
          background: "transparent",
          color: "var(--black)",
          opacity: allBaskets.length < 5 ? 1 : 0.5,
          transform: "scale(0.75)",
        }}
        onClick={() => {
          if (!loading && allBaskets.length < 5) {
            addEmptyBasket(type);
            setAdding(allBaskets.length);
          }
        }}
      >
        <IconAdd size="24px" />
      </button>
    </div>
  );
};

export default Picker;
