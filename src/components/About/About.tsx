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
          <IconClose size="32px" color="var(--black)" />
        </div>
        <h2 style={{ color: "var(--blue)" }}>About basketJS</h2>

        <p>
          <span style={{ fontWeight: "bold" }}>basketJS</span> is a visual
          learning tool designed for those eager to learn JavaScript! Our
          platform provides a unique and engaging learning experience. By
          leveraging a wide array of emojis that can be effortlessly taken and
          placed into virtual baskets, we make learning JavaScript's array
          methods both fun and effective.
        </p>
        <p>
          Get ready to slice, dice, and manipulate arrays with the ease of
          arranging your favorite fruits and veggies. From juicy apples to zesty
          lemons, our playful approach will have you reaching JavaScript mastery
          in no time.
        </p>
        <p>
          <span className="b">Notes:</span>
          <ul
            style={{
              listStyleType: "disc",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <li style={{ marginLeft: "2rem" }}>
              When a method has no return value, it indicates that the method
              modifies the original array and then returns a reference to it.
              For example, if you log <span className="b">basket.fill()</span>,
              both the original variable and the log will point to the same
              array. To keep things simple, the latter is implied.
            </li>
            <li style={{ marginLeft: "2rem" }}>
              Although the <span className="b">concat</span> method allows for
              multiple input values, I have chosen to focus on its most common
              use case to avoid cluttering the screen and potentially confusing
              the user. With one parameter as a selector of arrays I think it
              gets the point across best.
            </li>
            <li style={{ marginLeft: "2rem" }}>
              RangeErrors are ignored. It simply won't trigger the method.
            </li>
          </ul>
        </p>
        <p>
          <span className="b">Coming soon:</span>
          <ul
            style={{
              listStyleType: "disc",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <li style={{ marginLeft: "2rem" }}>
              Include methods that require callback functions like every, some,
              filter and map.
            </li>
          </ul>
        </p>
        <p>Like what you see? Buy me a coffee ☕ </p>
      </div>
    </div>
  );
};

export default About;
