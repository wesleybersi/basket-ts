import { useState, useContext } from "react";
import "./App.scss";

import Aside from "./components/Aside/Aside";
import Basket from "./components/Basket/Basket";
import ActiveMethod from "./components/ActiveMethod/ActiveMethod";
import Output from "./components/Output/Output";
import { GiFruitBowl as IconFruit } from "react-icons/gi";
import { GrSettingsOption as IconSettings } from "react-icons/gr";

import { BasketContext } from "./contexts/BasketContext";
import Settings from "./components/Settings/Settings";

const themes: { title: "Fruit" | "Veggies"; icon: string }[] = [
  { title: "Fruit", icon: "🍎" },
  { title: "Veggies", icon: "🥬" },
];

function App() {
  const [animationSpeed, setAnimationSpeed] = useState<number>(250);
  const [settingsEnabled, setSettingsEnabled] = useState<boolean>(false);
  const [theme, setTheme] = useState<"Fruit" | "Veggies">("Fruit");

  // basket.every((fruit) => fruit.color === "green");
  // basket.some((fruit) => fruit.color === "green");
  // basket.some((fruit) => fruit.color === "green");
  // Basket.find((fruit) => fruit === green)

  return (
    <div className="App">
      <header>
        <section className="header-left">
          <IconFruit size="32px" />
          <h2>basketJS</h2>
        </section>
        <section className="header-right">
          <ul>
            <li>Donate</li>
            <li>About us</li>
          </ul>
          <div onClick={() => setSettingsEnabled(!settingsEnabled)}>
            <IconSettings size="40px" />
          </div>
        </section>
      </header>
      <Aside />
      {settingsEnabled && (
        <Settings
          animationSpeed={animationSpeed}
          setAnimationSpeed={setAnimationSpeed}
          setSettingsEnabled={setSettingsEnabled}
          themes={themes}
        />
      )}
      <main>
        <Basket duration={animationSpeed} />
        <ActiveMethod />
        <Output duration={animationSpeed} />
      </main>
    </div>
  );
}

export default App;
