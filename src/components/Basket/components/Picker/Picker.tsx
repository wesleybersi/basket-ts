import { RiAddFill as IconAdd } from "react-icons/ri";
import { useStore } from "../../../../store/store";
import "./picker.scss";

interface Props {
  type: "Primary" | "Secondary";
  selection: number;
  length: number;
}

const Picker: React.FC<Props> = ({ type, length, selection }) => {
  const { loading, allBaskets, changeBasket, addEmptyBasket, removeBasket } =
    useStore();

  return (
    <div className="basket-picker">
      {allBaskets.map((basketPick, index) => (
        <button
          style={
            selection === index
              ? {
                  background: length < 20 ? "var(--blue)" : "var(--red)",
                  color: length < 20 ? "var(--black)" : "white",
                  fontWeight: 600,
                }
              : {
                  background: "transparent",
                  color: "#555",
                }
          }
          onClick={() => {
            if (!loading) {
              if (selection !== index) changeBasket(type, index);
              else removeBasket(index);
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
