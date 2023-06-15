import React, { useContext } from "react";
import { BasketContext } from "../../contexts/BasketContext";
import "./settings.scss";

interface Props {
  animationSpeed: number;
  setAnimationSpeed: React.Dispatch<React.SetStateAction<number>>;
  setSettingsEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  themes: { title: "Fruit" | "Veggies"; icon: string }[];
}

const Settings: React.FC<Props> = ({
  animationSpeed,
  setAnimationSpeed,
  setSettingsEnabled,
  themes,
}): JSX.Element => {
  const { state, dispatch } = useContext(BasketContext);
  return (
    <div className="darken">
      <div className="settings">
        <h2>Settings</h2>
        <div className="option options-animation-speed">
          <p>Animation:</p>
          <div>
            <button
              style={
                animationSpeed === 0
                  ? {
                      backgroundColor: "var(--light)",
                      border: "4px solid lightblue",
                    }
                  : {}
              }
              onClick={() => setAnimationSpeed(0)}
            >
              ❌
            </button>
            <button
              style={
                animationSpeed === 500
                  ? {
                      backgroundColor: "var(--light)",
                      border: "4px solid lightblue",
                    }
                  : {}
              }
              onClick={() => setAnimationSpeed(500)}
            >
              🐢
            </button>
            <button
              style={
                animationSpeed === 250
                  ? {
                      backgroundColor: "var(--light)",
                      border: "4px solid lightblue",
                    }
                  : {}
              }
              onClick={() => setAnimationSpeed(250)}
            >
              🐇
            </button>
            <button
              style={
                animationSpeed === 125
                  ? {
                      backgroundColor: "var(--light)",
                      border: "4px solid lightblue",
                    }
                  : {}
              }
              onClick={() => setAnimationSpeed(100)}
            >
              🐆
            </button>
          </div>
        </div>
        <div className="option options-theme">
          <p>Theme:</p>
          <div>
            {themes.map(({ title, icon }) => (
              <button
                style={
                  state.theme === title
                    ? {
                        backgroundColor: "var(--light)",
                        border: "4px solid lightblue",
                      }
                    : {}
                }
                onClick={() =>
                  dispatch({
                    type: "Change Theme",
                    theme: title,
                  })
                }
              >
                {icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
