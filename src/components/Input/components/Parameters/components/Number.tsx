import { useState } from "react";

import { Emoji } from "../../../../../utils/emoji/emojis";
import {
  GoChevronRight as IconRight,
  GoChevronLeft as IconLeft,
} from "react-icons/go";
import { useStore } from "../../../../../store/store";

interface Props {
  name: string;
  active: boolean;
  required: boolean;
  value: Emoji | number | string | undefined;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: React.Dispatch<
    React.SetStateAction<number | Emoji | string | undefined>
  >;
  animating: boolean;
}

const NumberParameter: React.FC<Props> = ({
  name,
  active,
  required,
  value,
  setActive,
  setValue,
  animating,
}) => {
  const [hoverTitle, setHoverTitle] = useState<boolean>(false);

  return (
    <>
      <div style={{ display: "flex" }}>
        <p
          className="parameter-name"
          style={{
            textDecoration:
              hoverTitle && active && !required ? "line-through" : "",
            paddingTop: "0.25rem",
            // marginTop: active ? "-2.5rem" : "0",
          }}
          onMouseEnter={() => setHoverTitle(true)}
          onMouseLeave={() => setHoverTitle(false)}
          onClick={!required ? () => setActive((prev) => !prev) : undefined}
        >
          {name}
          {required && <span style={{ color: "red" }}>*</span>}
        </p>
      </div>
      <div className="parameter-number">
        <div
          style={{ opacity: animating ? 0 : undefined }}
          className="decrement-number"
          onClick={() =>
            setValue((prev) => (typeof prev === "number" ? prev - 1 : prev))
          }
        >
          <IconLeft size="32px" />
        </div>
        <input
          style={{ pointerEvents: active ? "all" : "none" }}
          type="number"
          onChange={(event) => setValue(Number(event.target.value))}
          value={value || value === 0 ? value.toString() : ""}
        />
        <div
          style={{ opacity: animating ? 0 : undefined }}
          className="increment-number"
          onClick={() =>
            setValue((prev) => (typeof prev === "number" ? prev + 1 : prev))
          }
        >
          <IconRight size="32px" />
        </div>
      </div>
    </>
  );
};

export default NumberParameter;