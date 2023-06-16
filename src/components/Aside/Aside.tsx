import { useContext, memo, useState, useRef, useEffect } from "react";
import { BasketContext } from "../../contexts/BasketContext";
import { allMethods } from "../../store/methods";
import { MethodName } from "../../contexts/types";
import { GiFruitBowl as IconFruit } from "react-icons/gi";
import { GrSettingsOption as IconSettings } from "react-icons/gr";
import { useStore } from "../../store/store";

const Aside: React.FC = () => {
  const { set, settings, method } = useStore();
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
      <div className="method-aside-list">
        {allMethods.map(({ title, icon: Icon }, index) => (
          <div
            className="method-aside-selector"
            style={{
              justifyContent: type === "Compact" ? "center" : "flex-start",
            }}
            onClick={() =>
              set({
                method: allMethods[index],
              })
            }
          >
            {Icon && (
              <Icon
                size="32px"
                color={title === method.title ? "var(--blue)" : ""}
              />
            )}
            {type === "Full" && (
              <p
                style={
                  title === method.title
                    ? {
                        color: "var(--blue)",
                        fontWeight: 800,
                      }
                    : { fontWeight: 400 }
                }
              >
                {title.charAt(0).toLowerCase() + title.slice(1)}
              </p>
            )}
          </div>
        ))}
        <div
          onClick={() =>
            set({ settings: { ...settings, isOpen: !settings.isOpen } })
          }
        >
          <IconSettings size="40px" />
        </div>
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
};

export default Aside;
