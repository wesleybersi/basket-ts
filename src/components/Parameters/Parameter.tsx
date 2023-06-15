import React, { useEffect, useState } from "react";
import { Emoji, randomEmoji } from "../../utils/getEmoji";
import { RiAddFill as IconAdd } from "react-icons/ri";

interface Props {
  currentMethod: string;
  index: number;
  name: string;
  type: "Emoji Picker" | "Number" | "Hidden";
  defaultValue?: number;
  hide?: boolean;
  required?: boolean;
  min?: number;
  max?: number;
  updateValue: (
    index: number,
    name: string,
    value: Emoji | number | null
  ) => void;
  updateActive: (index: number, open: boolean) => void;
  activeParameters: boolean[];
  theme: "Fruit" | "Veggies";
}

const Parameter: React.FC<Props> = ({
  currentMethod,
  defaultValue,
  index,
  name,
  type,
  hide = false,
  required = false,
  min,
  max,
  updateValue,
  updateActive,
  activeParameters,
  theme,
}): JSX.Element => {
  const [open, setOpen] = useState<boolean>(!hide);
  const [value, setValue] = useState<Emoji | number | null>(null);
  const [hoverTitle, setHoverTitle] = useState<boolean>(false);
  const [forceClose, setForceClose] = useState<boolean>(false);

  useEffect(() => {
    //Initialise on change of method
    if (type === "Hidden") {
      setValue(null);
      setOpen(false);
      updateActive(index, open);
      return;
    }

    if (required || !hide) {
      setOpen(true);
      return;
    }

    if (hide) {
      setOpen(false);
      setValue(null);
    }
  }, [hide, required, type, name]);

  useEffect(() => {
    //Set values when close/open
    if (open) {
      if (type === "Emoji Picker") {
        if (typeof value === "number" || value === null) {
          const newValue = randomEmoji(theme);
          setValue(newValue);
        }
      } else if (type === "Number") {
        setValue(0);
      }
    } else if (!open) {
      setValue(null);
    }

    if (index !== 0) {
      if (!activeParameters[index - 1]) {
        setOpen(false);
        setForceClose(true);
      } else {
        if (!hide) {
          setOpen(true);
        }
        setForceClose(false);
      }
    } else {
      setForceClose(false);
    }

    updateActive(index, open);
  }, [open, activeParameters[index - 1], type]);

  useEffect(() => {
    //Send values to appropriate places
    updateValue(index, name, value);
  }, [value, currentMethod]);

  return (
    <div
      className="parameter"
      style={
        open && type !== "Hidden"
          ? {}
          : {
              padding: "0.5rem 0",
              transform:
                type === "Hidden"
                  ? "translateY(6.25rem)"
                  : "translateY(3.8rem)",
              opacity:
                type === "Hidden" || (forceClose && type !== "Number")
                  ? 0
                  : 0.55,
              margin: type === "Hidden" ? "0 -1rem 0 0" : "",
              flex: type === "Hidden" ? 0 : 1,
              height: type === "Hidden" ? 0 : "",
              pointerEvents: forceClose ? "none" : "all",
            }
      }
      onClick={!open && !forceClose ? () => setOpen(true) : undefined}
    >
      {type === "Number" && (
        <>
          <div style={{ display: "flex" }}>
            <p
              className="parameter-name"
              style={{
                textDecoration:
                  hoverTitle && open && !required ? "line-through" : "",
              }}
              onMouseEnter={() => setHoverTitle(true)}
              onMouseLeave={() => setHoverTitle(false)}
              onClick={!required ? () => setOpen((prev) => !prev) : undefined}
            >
              {name}
              {required && <span style={{ color: "red" }}>*</span>}
            </p>
          </div>
          <div className="parameter-number">
            <input
              type="number"
              min={min}
              max={max}
              onChange={(event) => setValue(Number(event.target.value))}
              value={value || value === 0 ? value.toString() : ""}
            />
          </div>
        </>
      )}
      {type === "Emoji Picker" && (
        <>
          <div style={{ display: "flex" }}>
            <p
              className="parameter-name"
              style={{
                textDecoration:
                  hoverTitle && open && !required ? "line-through" : "",
              }}
              onMouseEnter={() => setHoverTitle(true)}
              onMouseLeave={() => setHoverTitle(false)}
              onClick={!required ? () => setOpen((prev) => !prev) : undefined}
            >
              {open && !forceClose ? name : <IconAdd size="24px" />}
              {required && <span style={{ color: "red" }}>*</span>}
            </p>
          </div>

          <p
            className="parameter-emoji"
            onClick={() => setValue(randomEmoji(theme))}
          >
            {value && typeof value !== "number" && value.emoji.toString()}
          </p>
        </>
      )}
    </div>
  );
};

export default Parameter;
