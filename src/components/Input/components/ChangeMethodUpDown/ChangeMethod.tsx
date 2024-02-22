// import {
//   GoChevronRight as IconRight,
//   GoChevronLeft as IconLeft,
// } from "react-icons/go";
// import {
//   FiChevronRight as IconRight,
//   FiChevronLeft as IconLeft,
// } from "react-icons/fi";

import { BiChevronRight as IconRight } from "react-icons/bi";
import { BiChevronLeft as IconLeft } from "react-icons/bi";
import { BiChevronUp as IconUp } from "react-icons/bi";
import { BiChevronDown as IconDown } from "react-icons/bi";

import { allMethods } from "../../../../store/methods";
import { useStore } from "../../../../store/store";
import { useNavigate } from "react-router-dom";

import "./change-method.scss";

interface Props {
  direction: "Left" | "Right" | "Center";
  index: number;
}
const ChangeMethod: React.FC<Props> = ({ direction, index }) => {
  const navigate = useNavigate();
  const { loading } = useStore();

  if (direction === "Left") {
    return (
      <div
        style={{
          flex: 1,
          display: "grid",
          placeContent: "center",
        }}
      >
        <button
          style={
            allMethods[index - 1]
              ? {
                  pointerEvents: loading ? "none" : "all",
                }
              : {
                  opacity: 0.35,

                  pointerEvents: "none",
                }
          }
          className="change-method-left"
          onClick={() =>
            !loading && navigate(allMethods[index - 1].title.toLowerCase())
          }
        >
          <IconUp size="40px" />
        </button>
      </div>
    );
  } else if (direction === "Right") {
    return (
      <div
        style={{
          flex: 1,
          display: "grid",
          placeContent: "center",
        }}
      >
        <button
          style={
            allMethods[index + 1]
              ? { pointerEvents: loading ? "none" : "all" }
              : { opacity: 0.35, pointerEvents: "none" }
          }
          className="change-method-right"
          onClick={() =>
            !loading && navigate(allMethods[index + 1].title.toLowerCase())
          }
        >
          <IconDown size="40px" />
        </button>
      </div>
    );
  } else if (direction === "Center") {
    return (
      <div
        style={{
          flex: 1,
          display: "grid",
          placeContent: "center",
        }}
      >
        <button
          style={
            allMethods[index + 1]
              ? { pointerEvents: loading ? "none" : "all" }
              : { opacity: 0, pointerEvents: "none" }
          }
          className="change-method-center"
          onClick={() =>
            !loading && navigate(allMethods[index + 1].title.toLowerCase())
          }
        >
          <IconDown size="40px" />
        </button>
      </div>
    );
  } else return <></>;
};

export default ChangeMethod;
