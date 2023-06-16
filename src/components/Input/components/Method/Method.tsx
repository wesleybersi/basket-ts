import { useStore } from "../../../../store/store";
import { Emoji } from "../../../../utils/emoji/emojis";

const Method: React.FC = () => {
  const { loading, method, parameters, methods } = useStore();

  return (
    <div className="method">
      <h2
        className="method-name"
        style={loading ? { opacity: 0.25 } : { opacity: 1 }}
      >
        basket.
        {method.title}(
        {parameters.map((parameter, index, arr) => {
          if (!parameter) return;
          if (parameter.value instanceof Emoji) {
            return (
              parameter.value.emoji +
              `${
                arr[index + 1]?.value || arr[index + 1]?.value === 0 ? "," : ""
              }`
            );
          } else if (typeof parameter.value === "number") {
            return arr[index + 1]?.value || arr[index + 1]?.value === 0
              ? parameter.value + ","
              : parameter.value;
          }
        })}
        )
      </h2>
      <button
        className="method-btn"
        onClick={() => {
          if (!loading) methods[method.title]();
        }}
      >
        <div style={loading ? { opacity: "0.5" } : { opacity: "1" }}>
          <method.icon size="42px" />
        </div>
      </button>
    </div>
  );
};

export default Method;
