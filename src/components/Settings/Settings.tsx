import React, { useContext } from "react";
import { BasketContext } from "../../contexts/BasketContext";
import "./settings.scss";
import { GrClose as IconClose } from "react-icons/gr";
import { useStore } from "../../store/store";
import themes from "../../utils/emoji/themes";

interface ThemeOption {
  name: "Fruit" | "Veggies" | "All";
  icon: string;
}

const Settings: React.FC = (): JSX.Element => {
  const { set, settings } = useStore();
  const { animationDuration } = settings;
  const { state, dispatch } = useContext(BasketContext);

  const themeOptions: ThemeOption[] = [];
  for (const [string, emojis] of themes) {
    themeOptions.push({ name: string, icon: emojis[0].emoji });
  }

  return (
    <div className="darken">
      <div className="settings">
        <div
          className="close-settings"
          onClick={() => set({ settings: { ...settings, isOpen: false } })}
        >
          <IconClose size="32px" />
        </div>
        <h2>Settings</h2>
        <div className="option options-animation-speed">
          <p>Animation:</p>
          <div>
            <button
              style={
                animationDuration === 0
                  ? {
                      backgroundColor: "var(--light)",
                      border: "4px solid lightblue",
                    }
                  : {}
              }
              onClick={() =>
                set({ settings: { ...settings, animationDuration: 0 } })
              }
            >
              ❌
            </button>
            <button
              style={
                animationDuration === 500
                  ? {
                      backgroundColor: "var(--light)",
                      border: "4px solid lightblue",
                    }
                  : {}
              }
              onClick={() =>
                set({ settings: { ...settings, animationDuration: 500 } })
              }
            >
              🐢
            </button>
            <button
              style={
                animationDuration === 250
                  ? {
                      backgroundColor: "var(--light)",
                      border: "4px solid lightblue",
                    }
                  : {}
              }
              onClick={() =>
                set({ settings: { ...settings, animationDuration: 250 } })
              }
            >
              🐇
            </button>
            <button
              style={
                animationDuration === 125
                  ? {
                      backgroundColor: "var(--light)",
                      border: "4px solid lightblue",
                    }
                  : {}
              }
              onClick={() =>
                set({ settings: { ...settings, animationDuration: 125 } })
              }
            >
              🐆
            </button>
          </div>
        </div>
        <div className="option options-theme">
          <p>Theme:</p>
          <div>
            {themeOptions.map(({ name, icon }) => (
              <button
                style={
                  settings.theme === name
                    ? {
                        backgroundColor: "var(--light)",
                        border: "4px solid lightblue",
                      }
                    : {}
                }
                onClick={() => set({ settings: { ...settings, theme: name } })}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>
        <div className="option options-sound">
          <p>Enable sound:</p>
          <button
            style={{ backgroundColor: settings.soundEnabled ? "green" : "red" }}
            onClick={() =>
              set({
                settings: { ...settings, soundEnabled: !settings.soundEnabled },
              })
            }
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
