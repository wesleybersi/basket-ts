import React, { useEffect, useState, useRef } from "react";
import { randomEmoji } from "../../../../utils/emoji/random-emoji";
import { Emoji } from "../../../../utils/emoji/emojis";
import { useStore } from "../../../../store/store";
import { ParameterState } from "../../../../store/methods";
import { GrClose as IconClose } from "react-icons/gr";
import themes from "../../../../utils/emoji/themes";

import "./parameter.scss";
import { Parameters } from "../../../../store/types";
import EmojiParameter from "./components/EmojiParameter";
import NumberParameter from "./components/Number";
interface Props {
  index: number;
}

const Parameter: React.FC<Props> = ({ index }): JSX.Element => {
  const { settings, parameters, set, loading, updateParameterState, basket } =
    useStore();
  const paramRef = useRef<HTMLDivElement | null>(null);

  const [active, setActive] = useState<boolean>(false);
  const [required, setRequired] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<
    "Emoji" | "Number" | "String" | "Callback" | ""
  >("");
  const [value, setValue] = useState<Emoji | number | string | undefined>(
    undefined
  );
  const [backgroundColor, setBackgroundColor] = useState<string>("white");
  const [animating, setAnimating] = useState<boolean>(false);

  const [forceClose, setForceClose] = useState<boolean>(false);
  const [noParam, setNoParam] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);

  const [emojiIndex, setEmojiIndex] = useState<number>(0);

  useEffect(() => {
    if (!paramRef.current) return;

    function start() {
      setAnimating(true);
    }
    function end() {
      setAnimating(false);
    }

    paramRef.current.addEventListener("transitionstart", start);
    paramRef.current.addEventListener("transitionend", end);
    return () => {
      paramRef.current?.removeEventListener("transitionend", end);
      paramRef.current?.removeEventListener("transitionstart", end);
    };
  }, [paramRef]);

  useEffect(() => {
    //ANCHOR On method change, set parameter
    const param = parameters.get(index);
    if (!param) {
      //No parameter
      setNoParam(true);
      setRequired(false);
      setActive(false);

      setValue(undefined);
      setType("");
      setName("");
      setBackgroundColor("white");
      updateParameterState(index, undefined, active);
      return;
    }

    //Set parameter to defined values
    const { type, hide, required, name, color } = param;
    console.log(index, "required", required);
    setNoParam(false);
    setValue(undefined);
    setBackgroundColor(color ?? "white");
    setType(type);
    setRequired(required ? true : false);
    if (hide) setActive(false);
    else setActive(required || !hide);
    setName(name);
    setUpdate(true);
  }, [parameters.get(index)]);

  useEffect(() => {
    if (required && !active) {
      setActive(true);
    }
  }, [required, active]);

  useEffect(() => {
    //ANCHOR When open, set value
    if (active) {
      if (type === "Emoji") {
        const theme = themes.get(settings.theme);
        function newIndex() {
          if (!theme) return 0;
          let r = Math.floor(Math.random() * theme.length);
          if (r === emojiIndex) return newIndex();
          return r;
        }
        setEmojiIndex(newIndex());
      } else if (type === "Number") {
        setValue(0);
      }
    } else {
      setValue(undefined);
      updateParameterState(index, undefined, active);
    }
    setUpdate(false);
  }, [active, update]);

  useEffect(() => {
    // console.log("Updating value parameters", index, value);
    //ANCHOR When value changes, update state
    updateParameterState(index, value, active);
  }, [value, active]);

  useEffect(() => {
    //ANCHOR When parameter to left is closed, force close this one
    if (index < 1) return;
    const leftNeighbour = parameters.get(index - 1);
    if (!leftNeighbour) return;
    if (!leftNeighbour.active) {
      setForceClose(true);
      setActive(false);
    } else setForceClose(false);
  }, [parameters.get(index - 1)?.active]);

  return (
    <div
      ref={paramRef}
      className="parameter"
      style={
        active && !noParam
          ? {
              pointerEvents: loading ? "none" : "all",
              backgroundColor,
            }
          : {
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
      {!required && active && (
        <div className="close-param" onClick={() => setActive(false)}>
          <IconClose size="16px" />
        </div>
      )}
      {type === "Number" && (
        <NumberParameter
          name={name}
          active={active}
          required={required}
          value={value}
          setActive={setActive}
          setValue={setValue}
          animating={animating}
        />
      )}
      {type === "Emoji" && (
        <EmojiParameter
          name={name}
          active={active}
          required={required}
          value={value}
          emojiIndex={emojiIndex}
          setEmojiIndex={setEmojiIndex}
          setActive={setActive}
          setValue={setValue}
          animating={animating}
        />
      )}
      {type === "String" && (
        <input
          type="text"
          onChange={(event) => setValue(event?.target.value)}
        ></input>
      )}
    </div>
  );
};

export default Parameter;
