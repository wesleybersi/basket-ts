import { useContext, memo, useState, useRef, useEffect } from "react";
import { allMethods } from "../../store/methods";
import { GiFruitBowl as IconFruit } from "react-icons/gi";
import { useStore } from "../../store/store";
import {
  BsChevronDoubleRight as IconChevronRight,
  BsChevronDoubleLeft as IconChevronLeft,
} from "react-icons/bs";

const Aside: React.FC = () => {
  const { set, settings, method } = useStore();
  const [type, setType] = useState<"Hidden" | "Compact" | "Full">("Full");

  return (
    <aside
      style={{
        width: type === "Full" ? "18rem" : "4rem",
      }}
    >
      <div className="aside-top">
        <IconFruit size="40px" />
        {type !== "Compact" && <h2>basketJS</h2>}
      </div>
      <div className="method-aside-list">
        {allMethods.map(({ title, icon: Icon }, index) => (
          <div
            className="method-aside-selector"
            style={{
              // transform: title === method.title ? "translateX(1.5rem)" : "",
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
        {/* <div
          onClick={() =>
            set({ settings: { ...settings, isOpen: !settings.isOpen } })
          }
        >
          <IconSettings size="40px" />
        </div> */}
        <span
          className="aside-hide"
          onClick={() => {
            if (type === "Compact") setType("Full");
            else if (type === "Full") setType("Compact");
          }}
        >
          {type === "Full" ? (
            <IconChevronLeft size="24px" color="white" />
          ) : (
            <IconChevronRight size="24px" color="white" />
          )}
        </span>
      </div>
    </aside>
  );
};

export default Aside;
