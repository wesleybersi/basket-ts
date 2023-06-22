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

import "./change-method.scss";

interface Props {
  direction: "Left" | "Right";
  index: number;
}
const ChangeMethod: React.FC<Props> = ({ direction, index }) => {
  const { set, parameters } = useStore();

  if (direction === "Left") {
    return (
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
        onClick={() =>
          set({
            method: allMethods[index - 1],
          })
        }
      >
        <IconLeft size="48px" />
      </button>
    );
  } else if (direction === "Right") {
    return (
      <button
        style={
          allMethods[index + 1] ? {} : { opacity: 0, pointerEvents: "none" }
        }
        className="change-method-right"
        onClick={() =>
          set({
            method: allMethods[index + 1],
          })
        }
      >
        <IconRight size="48px" />
      </button>
    );
  } else return <></>;
};

export default ChangeMethod;
