import { useContext, memo, useState, useRef, useEffect } from "react";
import { BasketContext } from "../../contexts/BasketContext";
import { methods } from "../../store/methods";
import { MethodName } from "../../contexts/types";
import { GiFruitBowl as IconFruit } from "react-icons/gi";

function Aside() {
  const { state, dispatch } = useContext(BasketContext);
  const [type, setType] = useState<"Hidden" | "Compact" | "Full">("Full");
  return (
    <aside
      style={{
        width: type === "Full" ? "16rem" : "4rem",
      }}
    >
      <div className="aside-top">
        <IconFruit size="40px" />
        <h2>basketJS</h2>
      </div>
      <div className="method-grid">
        {methods.map((method) => (
          <div
            className="method-aside"
            style={{
              justifyContent: type === "Compact" ? "center" : "flex-start",
            }}
            onClick={() =>
              dispatch({
                type: "Set Method",
                method: method.title as MethodName,
              })
            }
          >
            <method.icon
              size="32px"
              color={
                method.title.toLowerCase() === state.method.toLowerCase()
                  ? "var(--blue)"
                  : ""
              }
            />
            {type === "Full" && (
              <p
                style={
                  method.title.toLowerCase() === state.method.toLowerCase()
                    ? {
                        color: "var(--blue)",
                        fontWeight: 800,
                      }
                    : { fontWeight: 400 }
                }
              >
                {method.title.charAt(0).toLowerCase() + method.title.slice(1)}
              </p>
            )}
          </div>
        ))}
        <span
          className="aside-type"
          onClick={() => {
            if (type === "Compact") setType("Full");
            else if (type === "Full") setType("Compact");
          }}
        ></span>
      </div>
    </aside>
  );
}

export default Aside;
