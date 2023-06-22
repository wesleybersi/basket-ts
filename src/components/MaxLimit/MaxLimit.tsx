import React, { useEffect } from "react";
import "./max-limit.scss";
import { useStore } from "../../store/store";
import { GrClose as IconClose } from "react-icons/gr";

const MaxLimit: React.FC = () => {
  const { set } = useStore();
  return (
    <div className="max-limit-wrapper">
      <div className="max-limit">
        <div className="max-limit-header">
          <h2>Limit reached</h2>
        </div>
        Basket can hold up to 20 items.
        <div
          className="max-limit-close"
          onClick={() => set({ maxLimitMessage: false })}
        >
          <IconClose size="24px" />
        </div>
      </div>
    </div>
  );
};

export default MaxLimit;
