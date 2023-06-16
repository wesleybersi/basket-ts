import React, { useEffect, useState } from "react";
import { randomEmoji } from "../../utils/emoji/random-emoji";
import { Emoji } from "../../utils/emoji/emojis";
import { useStore } from "../../store/store";
import { RiAddFill as IconAdd } from "react-icons/ri";

interface Props {
  index: number;
  name: string;
  type: "Emoji" | "Number" | "Hidden";
  defaultValue?: number;
  hide?: boolean;
  required?: boolean;
  updateValue: (
    index: number,
    name: string,
    value: Emoji | number | null
  ) => void;
  updateActive: (index: number, open: boolean) => void;
  activeParameters: boolean[];
}

const Parameter: React.FC<Props> = ({
  defaultValue,
  index,
  name,
  type,
  hide = false,
  required = false,
  updateValue,
  updateActive,
  activeParameters,
}): JSX.Element => {
  const { settings, method } = useStore();
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
      if (type === "Emoji") {
        if (typeof value === "number" || value === null) {
          const newValue = randomEmoji(settings.theme);
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
  }, [value, method.title]);

  return (
    <div
      className="parameter"
      style={
        open && type !== "Hidden"
          ? {
              background: type === "Number" ? "var(--selection)" : "",
            }
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
          <div style={{ display: "none" }}>
            <p
              className="parameter-name"
              style={{
                textDecoration:
                  hoverTitle && open && !required ? "line-through" : "",
                marginTop: open ? "-2.5rem" : "0",
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
              style={{ pointerEvents: open ? "all" : "none" }}
              type="number"
              onChange={(event) => setValue(Number(event.target.value))}
              value={value || value === 0 ? value.toString() : ""}
            />
          </div>
        </>
      )}
      {type === "Emoji" && (
        <>
          <div style={{ display: "flex" }}>
            <p
              className="parameter-name"
              style={{
                textDecoration:
                  hoverTitle && open && !required ? "line-through" : "",
                marginTop: open ? "-2.5rem" : "-.1rem",
              }}
              onMouseEnter={() => setHoverTitle(true)}
              onMouseLeave={() => setHoverTitle(false)}
              onClick={!required ? () => setOpen((prev) => !prev) : undefined}
            >
              {!open ? <IconAdd size="24px" /> : <></>}
              {/* TODO Temp */}
              {/* {open && !forceClose ? name : <IconAdd size="24px" />} */}
              {/* {required && <span style={{ color: "red" }}>*</span>} */}
            </p>
          </div>

          <p
            className="parameter-emoji"
            onClick={() => setValue(randomEmoji(settings.theme))}
          >
            {value && typeof value !== "number" && value.emoji.toString()}
          </p>
        </>
      )}
    </div>
  );
};

export default Parameter;
