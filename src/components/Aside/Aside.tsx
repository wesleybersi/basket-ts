import { useState } from "react";
import { allMethods } from "../../store/methods";
import { GiFruitBowl as IconFruit } from "react-icons/gi";
import { useStore } from "../../store/store";
import {
  BsChevronDoubleRight as IconChevronRight,
  BsChevronDoubleLeft as IconChevronLeft,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { FcSettings as IconSettings } from "react-icons/fc";
import "./aside.scss";
const Aside: React.FC = () => {
  const navigate = useNavigate();
  const { set, settings, method } = useStore();
  const [type, setType] = useState<"Hidden" | "Compact" | "Full">("Compact");

  return (
    <aside
      // onMouseEnter={() => setType("Full")}
      // onMouseLeave={() => setType("Compact")}
      style={{
        width: type === "Full" ? "10rem" : "0rem",
      }}
    >
      <div
        className="aside-top"
        style={type === "Compact" ? { padding: "0.75rem" } : {}}
        onClick={() =>
          set({ settings: { ...settings, aboutIsOpen: !settings.aboutIsOpen } })
        }
      >
        <IconFruit size="32px" />
        {type !== "Compact" && (
          <h2 style={{ display: "flex", gap: "0.5rem" }}>
            basketJS
            {/* <span
              style={{
                fontSize: "0.75rem",

                color: "var(--red)",
              }}
            >
              alpha
            </span> */}
          </h2>
        )}
      </div>
      <div className="method-aside-list">
        {allMethods.map(({ title, icon: Icon }, index) => (
          <div
            className="method-aside-selector"
            style={{
              // padding: type === "Compact" ? 0 : "0 3rem",
              // transform: title === method.title ? "translateX(1.5rem)" : "",
              justifyContent: type === "Compact" ? "center" : "flex-start",
            }}
            onClick={() => navigate(title.toLowerCase())}
          >
            {/* {Icon && (
              <Icon
                size="32px"
                color={title === method.title ? "var(--blue)" : ""}
              />
            )} */}

            {type === "Full" && (
              <p
                style={
                  title === method.title
                    ? {
                        color: "var(--black)",
                        fontWeight: 800,
                      }
                    : { fontWeight: 500 }
                }
              >
                {title.charAt(0).toLowerCase() + title.slice(1)}
              </p>
            )}
          </div>
        ))}
      </div>
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
    </aside>
  );
};

export default Aside;
