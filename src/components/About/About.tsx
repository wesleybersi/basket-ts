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
        <h2>About basketJS</h2>

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
          Whether you're a beginner taking your first steps in JavaScript or a
          seasoned developer looking to enhance your skills. Through interactive
          exercises, you'll gain hands-on experience with array manipulation all
          the while engaging in a delightful world of fruits and vegetables.
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
            <li style={{ marginLeft: "2rem" }}>
              methods that require callback functions like every, some, filter
              and map.
            </li>
          </ul>
        </p>
        <p>Like what you see? basket.push(☕) </p>
      </div>
    </div>
  );
};

export default About;
