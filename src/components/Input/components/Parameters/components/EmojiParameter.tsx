import { useState, useEffect } from "react";

import { randomEmoji } from "../../../../../utils/emoji/random-emoji";
import { Emoji } from "../../../../../utils/emoji/emojis";
import { RiAddFill as IconAdd } from "react-icons/ri";
import { useStore } from "../../../../../store/store";
import themes from "../../../../../utils/emoji/themes";
// import {
//   GoChevronRight as IconRight,
//   GoChevronLeft as IconLeft,
// } from "react-icons/go";

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
  const [hoverTitle, setHoverTitle] = useState<boolean>(false);

  const { set, settings } = useStore();

  useEffect(() => {
    if (!active) return;
    const theme = themes.get(settings.theme);
    if (theme) {
      console.log("Updating index");
      setValue(theme[emojiIndex]);
    }
  }, [emojiIndex]);

  return (
    <>
      <div style={{ display: "flex" }}>
        {
          <p
            className="parameter-name"
            onMouseEnter={() => !animating && setHoverTitle(true)}
            onMouseLeave={() => setHoverTitle(false)}
            onClick={!required ? () => setActive(false) : undefined}
            style={{
              textDecoration:
                hoverTitle && active && !required ? "line-through" : "",
              paddingTop: "0.25rem",
              // marginTop: active ? "-2.5rem" : "0",
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
        <div className="parameter-emoji">
          {value && value instanceof Emoji && value.emoji.toString()}
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
