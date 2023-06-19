import { useState, useContext, useEffect } from "react";
import "./App.scss";

import Aside from "./components/Aside/Aside";
import Basket from "./components/Basket/Basket";
import Input from "./components/Input/Input";
import Callback from "./components/Callback/Callback";
import Output from "./components/Output/Output";
import { GiFruitBowl as IconFruit } from "react-icons/gi";
import { GrSettingsOption as IconSettings } from "react-icons/gr";
import { useStore } from "./store/store";

import Settings from "./components/Settings/Settings";

function App() {
  const { set, loading, settings, method, selection, selectedIndexes } =
    useStore();

  const arr1 = ["Ajax", "Feyenoord", "PSV"];
  const arr2 = ["Vitesse", "De Graafschap", "Hadjuk Split"];

  console.log(arr1.concat(arr2));
  console.log(arr1);
  console.log(arr2);

  return (
    <div className="App">
      <header>
        <section className="header-left">
          <IconFruit size="32px" />
          <h2>basketJS</h2>
        </section>
        <section className="header-right">
          <ul>
            {/* <li>{selection.index}</li>
            <li>Start: {selection.start ?? "undefined"}</li>
            <li>End: {selection.end ?? "undefined"}</li>
            <li>{selection.amount}</li>
            <li>Target: {selection.target ?? "undefined"}</li>
            <li>{selectedIndexes.map((i) => i)}</li>
            <li>{method.title}</li>
            <li>Loading: {loading.toString()}</li>
            <li>Donate</li> */}
            <li>About us</li>
          </ul>
          <div
            style={{ cursor: "pointer" }}
            onClick={() =>
              set({ settings: { ...settings, isOpen: !settings.isOpen } })
            }
          >
            <IconSettings size="32px" />
          </div>
        </section>
      </header>

      <Aside />
      {settings.isOpen && <Settings />}
      <main>
        <Basket />
        <Input />
        <Callback />
        <Output />
      </main>
    </div>
  );
}

export default App;
