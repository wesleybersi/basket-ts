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
              if (selection !== index) changeBasket(type, index);
              else removeBasket(index);
            }
          }}
        >
          <p>{selection === index ? length : basketPick.length}</p>
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
