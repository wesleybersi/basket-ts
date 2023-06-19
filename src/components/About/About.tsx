import React, { useContext } from "react";

import "./about.scss";
import { GrClose as IconClose } from "react-icons/gr";
import { useStore } from "../../store/store";
import themes from "../../utils/emoji/themes";

interface ThemeOption {
  name: "Fruit" | "Veggies" | "All";
  icon: string;
}

const About: React.FC = (): JSX.Element => {
  const { set, settings } = useStore();
  const { animationDuration } = settings;

  const themeOptions: ThemeOption[] = [];
  for (const [string, emojis] of themes) {
    themeOptions.push({ name: string, icon: emojis[0].emoji });
  }

  return (
    <div className="darken">
      <div className="about">
        <div
          className="close-about"
          onClick={() => set({ settings: { ...settings, aboutIsOpen: false } })}
        >
          <IconClose size="32px" />
        </div>
        <h2>About basketJS</h2>

        <p>
          <span style={{ fontWeight: "bold" }}>basketJS</span> is an
          interactive, educative website made for for visual learners that aims
          to teach most of the JavaScript array methods in a playful manner.
        </p>
        <p>
          Ever forget what a certain parameter does again? Just go to
          basketJS.com/method and quickly remind yourself.
        </p>

        <p>
          Future plans:
          <ul
            style={{
              listStyleType: "disc",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <li style={{ marginLeft: "2rem" }}>Multiple arrays</li>
            <li style={{ marginLeft: "2rem" }}>
              methods that require callback functions like every, some, filter
              and map.
            </li>
          </ul>
        </p>
      </div>
    </div>
  );
};

export default About;
