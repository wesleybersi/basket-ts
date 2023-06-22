import { RiAddFill as IconAdd } from "react-icons/ri";
import { useStore } from "../../../../store/store";
import { useEffect, useState } from "react";
import "./picker.scss";

interface Props {
  type: "Primary" | "Secondary";
}

const Picker: React.FC<Props> = ({ type }) => {
  const {
    loading,
    basket,
    secondary,
    basketIndex,
    secondaryIndex,
    allBaskets,
    changeBasket,
    addEmptyBasket,
    removeBasket,
  } = useStore();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [length, setLength] = useState<number>(0);

  useEffect(() => {
    if (type === "Primary") {
      setCurrentIndex(basketIndex);
      setLength(basket.length);
    } else if (type === "Secondary") {
      setCurrentIndex(secondaryIndex);
      setLength(secondary.length);
    }
  }, [basketIndex, secondaryIndex, basket.length, secondary.length]);

  return (
    <div className="basket-picker">
      {allBaskets.map((basketPick, index) => (
        <button
          style={
            currentIndex === index
              ? {
                  backgroundColor: length < 20 ? "var(--blue)" : "var(--red)",
                  color: length < 20 ? "var(--black)" : "white",
                  fontWeight: 600,
                }
              : {
                  background: "#22222211",
                  color: "#555",
                }
          }
          onClick={() => {
            if (!loading) {
              if (currentIndex !== index) changeBasket(type, index);
              else removeBasket(index);
            }
          }}
        >
          <p>{currentIndex === index ? length : basketPick.length}</p>
        </button>
      ))}
      <button
        style={{
          background: "#22222211",
          color: "#555",
          opacity: allBaskets.length < 5 ? 1 : 0.35,
        }}
        onClick={() => {
          if (!loading && allBaskets.length < 5) addEmptyBasket(type);
        }}
      >
        <IconAdd size="24px" />
      </button>
    </div>
  );
};

export default Picker;
