import React, { useEffect, useState } from "react";
import { randomEmoji } from "../../../../utils/emoji/random-emoji";
import { Emoji } from "../../../../utils/emoji/emojis";
import { useStore } from "../../../../store/store";
import { RiAddFill as IconAdd } from "react-icons/ri";
import "./parameter.scss";
import { Parameters } from "../../../../store/types";

interface Props {
  index: number;
}

const Parameter: React.FC<Props> = ({ index }): JSX.Element => {
  const { settings, method, parameters, set } = useStore();

  const [active, setActive] = useState<boolean>(false);
  const [required, setRequired] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<"Emoji" | "Number" | "">("");
  const [value, setValue] = useState<Emoji | number | undefined>(undefined);
  const [hoverTitle, setHoverTitle] = useState<boolean>(false);
  const [forceClose, setForceClose] = useState<boolean>(false);
  const [noParam, setNoParam] = useState<boolean>(false);

  useEffect(() => {
    //ANCHOR On method change, set parameter
    const param = parameters[index];

    if (!param) {
      //No parameter
      setNoParam(true);
      setRequired(false);
      setActive(false);
      setValue(undefined);
      setType("");
      setName("");
      return;
    }

    //Set parameter to defined values
    const { type, hide, required, value, name } = param;
    console.log(value);
    setNoParam(false);
    setType(type);
    setRequired(required ? true : false);
    if (hide) setActive(false);
    else setActive(required || !hide);
    setName(name);
  }, [parameters[index]]);

  useEffect(() => {
    //ANCHOR When open, set value
    if (active) {
      if (type === "Emoji") {
        const newValue = randomEmoji(settings.theme);
        setValue(newValue);
      } else if (type === "Number") {
        setValue(0);
      }
    } else {
      setValue(undefined);
    }
  }, [type, active, name, type]);

  useEffect(() => {
    //ANCHOR When value changes, update state
    set(() => {
      const updatedParameters: Parameters = [...parameters];
      const param = updatedParameters[index];
      if (!param) return {};
      param.value = value;
      param.active = active;
      return {
        parameters: updatedParameters,
      };
    });
  }, [value, active]);

  useEffect(() => {
    //ANCHOR When parameter to left is closed, force close this one
    if (index < 1) return;
    const leftNeighbour = parameters[index - 1];
    if (!leftNeighbour) return;
    if (!leftNeighbour.active) setForceClose(true);
    else setForceClose(false);
  }, [parameters[index - 1]?.active]);

  return (
    <div
      className="parameter"
      style={
        active && !noParam
          ? {
              background: type === "Number" ? "var(--selection)" : "",
            }
          : {
              padding: "0.5rem 0",
              transform: noParam ? "translateY(6.25rem)" : "translateY(3.8rem)",
              opacity: noParam || (forceClose && type !== "Number") ? 0 : 0.55,
              margin: noParam ? "0 -1rem 0 0" : "",
              flex: noParam ? 0 : 1,
              height: noParam ? 0 : "",
              pointerEvents: forceClose ? "none" : "all",
            }
      }
      onClick={!active && !forceClose ? () => setActive(true) : undefined}
    >
      {type === "Number" && (
        <>
          <div style={{ display: "none" }}>
            <p
              className="parameter-name"
              style={{
                textDecoration:
                  hoverTitle && active && !required ? "line-through" : "",
                marginTop: active ? "-2.5rem" : "0",
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
            <input
              style={{ pointerEvents: active ? "all" : "none" }}
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
                  hoverTitle && active && !required ? "line-through" : "",
                marginTop: active ? "-2.5rem" : "-.1rem",
              }}
              onMouseEnter={() => setHoverTitle(true)}
              onMouseLeave={() => setHoverTitle(false)}
              onClick={!required ? () => setActive((prev) => !prev) : undefined}
            >
              {!active ? <IconAdd size="24px" /> : <></>}
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
