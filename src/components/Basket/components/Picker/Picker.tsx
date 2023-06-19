import { RiAddFill as IconAdd } from "react-icons/ri";
import { useStore } from "../../../../store/store";
import "./picker.scss";
const Picker: React.FC = () => {
  const { loading, set, basket } = useStore();
  const basketIndex = 0;
  return (
    <div className="basket-picker">
      {Array.from({ length: 1 }).map((_, index) => (
        <button
          style={
            basketIndex === index
              ? {
                  backgroundColor:
                    basket.length === 20 ? "var(--red)" : "var(--blue)",
                  color: "#222",
                  fontWeight: 600,
                }
              : {
                  background: "#22222211",
                  color: "#555",
                }
          }
          //   onClick={() => {
          //     if (!loading) set({ index });
          //   }}
        >
          <p>{basket.length}</p>
        </button>
      ))}
      <button
        style={{ background: "#22222211", color: "#555" }}
        onClick={() => {
          //   if (!loading && basket.length < 11)
          //     set({
          //       index: baskets.length,
          //       baskets: [...baskets, []],
          //     });
        }}
      >
        <IconAdd size="24px" />
      </button>
    </div>
  );
};

export default Picker;
