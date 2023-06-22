import "./App.scss";

import Aside from "./components/Aside/Aside";
import Basket from "./components/Basket/Basket";
import Input from "./components/Input/Input";
import Callback from "./components/Callback/Callback";
import Output from "./components/Output/Output";
import About from "./components/About/About";
import MaxLimit from "./components/MaxLimit/MaxLimit";
import Secondary from "./components/Basket/Secondary";
import { randomEmojis } from "./utils/emoji/random-emoji";
import { MethodName, allMethods } from "./store/methods";
import { GiFruitBowl as IconFruit } from "react-icons/gi";

import { BsArrowDown as IconDown } from "react-icons/bs";
import { useStore } from "./store/store";
import Tooltip from "./components/Tooltip/Tooltip";
import { useLocation } from "react-router-dom";

import Settings from "./components/Settings/Settings";
import { useEffect } from "react";

function App() {
  const {
    set,
    loading,
    settings,
    method,
    selection,
    selectedIndexes,
    hoverItem,
    basketIndex,
    allBaskets,
    basket,
    showSecondary,
    maxLimitMessage,
  } = useStore();
  const location = useLocation();

  useEffect(() => {
    for (const method of allMethods) {
      if (method.title.toLowerCase() === location.pathname.slice(1)) {
        set({ method });
        break;
      }
    }
  }, [location.pathname]);

  const eredivisie = ["Ajax", "PSV", "Feyenoord"];
  console.log(eredivisie.concat(eredivisie));

  return (
    <div className="App">
      <header>
        <section className="header-left">
          <IconFruit size="32px" />
          <h2>basketJS</h2>
        </section>
        <section className="header-right">
          <ul>
            <li>{hoverItem?.title}</li>
            <li>basketIndex: {basketIndex}</li>
            <li>allBaskets: {allBaskets.length}</li>
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
        </section>
      </header>

      {settings.aboutIsOpen && <About />}
      {maxLimitMessage && <MaxLimit />}
      <Aside />
      {settings.isOpen && <Settings />}

      <main
        style={{
          width: "100%",
          alignSelf: "center",

          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          gap: "3rem",
          transition: "all 125ms ease",
        }}
      >
        <Basket />
        <Secondary />

        <Input />

        <Callback />
        {/* <div style={{ marginTop: "-1rem", marginBottom: "rem" }}>
          <IconDown size="32px" />
        </div> */}
        <Output />
      </main>

      <Tooltip />
      <div className="container">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    </div>
  );
}

export default App;
