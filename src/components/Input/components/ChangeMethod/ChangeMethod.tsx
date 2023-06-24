// import {
//   GoChevronRight as IconRight,
//   GoChevronLeft as IconLeft,
// } from "react-icons/go";
import {
  FiChevronRight as IconRight,
  FiChevronLeft as IconLeft,
} from "react-icons/fi";

import { allMethods } from "../../../../store/methods";
import { useStore } from "../../../../store/store";
import { useNavigate } from "react-router-dom";

import "./change-method.scss";

interface Props {
  direction: "Left" | "Right";
  index: number;
}
const ChangeMethod: React.FC<Props> = ({ direction, index }) => {
  const navigate = useNavigate();
  const { set, parameters } = useStore();

  if (direction === "Left") {
    return (
      <div style={{ height: "96px", display: "grid", placeContent: "center" }}>
        <button
          style={
            allMethods[index - 1]
              ? {}
              : {
                  opacity: 0,

                  pointerEvents: "none",
                }
          }
          className="change-method-left"
          onClick={() => navigate(allMethods[index - 1].title.toLowerCase())}
        >
          <IconLeft size="48px" />
        </button>
      </div>
    );
  } else if (direction === "Right") {
    return (
      <div style={{ height: "96px", display: "grid", placeContent: "center" }}>
        <button
          style={
            allMethods[index + 1] ? {} : { opacity: 0, pointerEvents: "none" }
          }
          className="change-method-right"
          onClick={() => navigate(allMethods[index + 1].title.toLowerCase())}
        >
          <IconRight size="48px" />
        </button>
      </div>
    );
  } else return <></>;
};

export default ChangeMethod;
