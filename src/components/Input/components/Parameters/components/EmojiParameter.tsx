import { useEffect } from "react";
import { isEmoji } from "../../../../../utils/emoji/emojis";
import { Emoji } from "../../../../../utils/emoji/emojis";
import { RiAddFill as IconAdd } from "react-icons/ri";
import { useStore } from "../../../../../store/store";
import themes from "../../../../../utils/emoji/themes";

import {
  FiChevronRight as IconRight,
  FiChevronLeft as IconLeft,
} from "react-icons/fi";

interface Props {
  name: string;
  active: boolean;
  required: boolean;
  value: Emoji | number | string | undefined;
  emojiIndex: number;
  setEmojiIndex: React.Dispatch<React.SetStateAction<number>>;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: React.Dispatch<
    React.SetStateAction<number | Emoji | string | undefined>
  >;
  animating: boolean;
}

const EmojiParameter: React.FC<Props> = ({
  name,
  active,
  required,
  value,
  emojiIndex,
  setEmojiIndex,
  setActive,
  setValue,
  animating,
}) => {
  const { set, settings } = useStore();

  useEffect(() => {
    if (!active) return;
    const theme = themes.get(settings.theme);
    if (theme) setValue(theme[emojiIndex]);
  }, [emojiIndex]);

  useEffect(() => {
    function keydown(event: KeyboardEvent) {
      if (event.key === "r") {
        const currentTheme = themes.get(settings.theme);
        if (!currentTheme) return;
        let count = 0;
        const interval = setInterval(() => {
          if (count < 20) {
            set({ disableInput: true });
            setEmojiIndex(Math.floor(Math.random() * currentTheme.length));
            count++;
          } else {
            clearInterval(interval);
            set({ disableInput: false });
          }
        }, 10);
      }
    }
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, []);

  return (
    <>
      <div style={{ display: "flex" }}>
        {
          <p
            className="parameter-name"
            onClick={!required ? () => setActive(false) : undefined}
            style={{
              textDecoration: required || animating || !active ? "none" : "",
              paddingTop: active ? "0.5rem" : "0.25rem",
            }}
          >
            {!active ? <IconAdd size="24px" /> : name}
            {required && <span style={{ color: "red" }}>*</span>}
          </p>
        }
      </div>
      <div className="parameter-emoji-wrapper">
        <div
          style={{ opacity: animating ? 0 : undefined }}
          className="previous-emoji"
          onClick={() => {
            const theme = themes.get(settings.theme);
            if (theme) {
              setEmojiIndex((prev) => (prev > 0 ? prev - 1 : theme.length - 1));
            }
          }}
        >
          <IconLeft size="32px" />
        </div>
        <div
          className="parameter-emoji"
          // onClick={() => {
          //   const currentTheme = themes.get(settings.theme);
          //   if (!currentTheme) return;
          //   setEmojiIndex(Math.floor(Math.random() * currentTheme.length));
          // }}
          onMouseOver={() => set({ hoverItem: value as Emoji })}
          onMouseLeave={() => set({ hoverItem: null })}
        >
          {value && isEmoji(value) && value.emoji.toString()}
        </div>
        <div
          style={{ opacity: animating ? 0 : undefined }}
          className="next-emoji"
          onClick={() => {
            const theme = themes.get(settings.theme);
            if (theme) {
              setEmojiIndex((prev) => (prev < theme.length - 1 ? prev + 1 : 0));
            }
          }}
        >
          <IconRight size="32px" />
        </div>
      </div>
    </>
  );
};

export default EmojiParameter;
