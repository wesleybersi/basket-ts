import { useState, useContext } from "react";
import "./App.scss";

import Aside from "./components/Aside/Aside";
import Basket from "./components/Basket/Basket";
import ActiveMethod from "./components/ActiveMethod/ActiveMethod";
import Output from "./components/Output/Output";
import { GiFruitBowl as IconFruit } from "react-icons/gi";
import { GrSettingsOption as IconSettings } from "react-icons/gr";
import { useStore } from "./store/store";

import Settings from "./components/Settings/Settings";

function App() {
  const { set, settings } = useStore();
  const [theme, setTheme] = useState<"Fruit" | "Veggies">("Fruit");

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
          <div
            onClick={() =>
              set({ settings: { ...settings, isOpen: !settings.isOpen } })
            }
          >
            <IconSettings size="40px" />
          </div>
        </section>
      </header>

      <Aside />
      {settings.isOpen && <Settings />}
      <main>
        <Basket />
        <ActiveMethod />
        <Output />
      </main>
    </div>
  );
}

export default App;
