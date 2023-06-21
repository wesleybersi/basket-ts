import { RiAddFill as IconAdd } from "react-icons/ri";
import { useStore } from "../../../../store/store";
import "./picker.scss";
const Picker: React.FC = () => {
  const {
    loading,
    set,
    basket,
    basketIndex,
    allBaskets,
    changeBasket,
    addEmptyBasket,
    removeBasket,
    processedIndexes,
  } = useStore();
  return (
    <div className="basket-picker">
      {allBaskets.map((basketPick, index) => (
        <button
          style={
            basketIndex === index
              ? {
                  backgroundColor: "var(--blue)",
                  color: "#222",
                  fontWeight: 600,
                }
              : {
                  background: "#22222211",
                  color: "#555",
                }
          }
          onClick={() => {
            if (!loading) {
              if (basketIndex !== index) changeBasket("Primary", index);
              else removeBasket(index);
            }
          }}
        >
          <p>{basketIndex === index ? basket.length : basketPick.length}</p>
        </button>
      ))}
      <button
        style={{
          background: "#22222211",
          color: "#555",
          opacity: allBaskets.length < 5 ? 1 : 0.35,
        }}
        onClick={() => {
          if (!loading && allBaskets.length < 5) addEmptyBasket("Primary");
        }}
      >
        <IconAdd size="24px" />
      </button>
    </div>
  );
};

export default Picker;
