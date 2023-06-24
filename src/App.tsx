import "./App.scss";

import { useEffect, useRef } from "react";

import Aside from "./components/Aside/Aside";
import Basket from "./components/Basket/Basket";
import Input from "./components/Input/Input";
import Callback from "./components/Callback/Callback";
import Output from "./components/Output/Output";
import About from "./components/About/About";
import MaxLimit from "./components/MaxLimit/MaxLimit";
import Secondary from "./components/Basket/Secondary";
import Circles from "./components/Circles/Circles";
import Tooltip from "./components/Tooltip/Tooltip";
import Settings from "./components/Settings/Settings";

import { FcSettings as IconSettings } from "react-icons/fc";

import { allMethods } from "./store/methods";
import { useStore } from "./store/store";
import { useLocation } from "react-router-dom";

function App() {
  const appRef = useRef<HTMLDivElement | null>(null);
  const { set, settings, maxLimitMessage } = useStore();
  const location = useLocation();

  useEffect(() => {
    for (const method of allMethods) {
      if (method.title.toLowerCase() === location.pathname.slice(1)) {
        set({ method });
        break;
      }
    }
  }, [location.pathname]);
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "=") {
        const appElement = appRef.current;
        if (appElement && appElement.requestFullscreen) {
          appElement.requestFullscreen();
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="App" ref={appRef}>
      <Aside />

      <main>
        <Basket />
        <Secondary />
        <Input />
        {/* <Callback /> */}
        {/* <div style={{ marginTop: "-1.5rem", marginBottom: "-1.5rem" }}> */}
        {/* <IconDown size="32px" /> */}
        {/* </div> */}
        <Output />

        <div
          className="side-buttons"
          style={{
            right: settings.isOpen ? "-6rem" : "-2rem",
            width: settings.isOpen ? "6rem" : "2rem",
          }}
          onClick={() =>
            set({
              settings: { ...settings, isOpen: !settings.isOpen },
            })
          }
        >
          <div
            className="side-button"
            style={{ display: settings.isOpen ? "grid" : "none" }}
            onClick={() =>
              set({
                settings: { ...settings, soundEnabled: !settings.soundEnabled },
              })
            }
          >
            {settings.soundEnabled ? "🔊" : "🔇"}
          </div>
          <div
            className="side-button"
            style={{ display: settings.isOpen ? "grid" : "none" }}
            onClick={() => {
              if (settings.animationDuration === 250) {
                set({ settings: { ...settings, animationDuration: 500 } });
              } else if (settings.animationDuration === 500) {
                set({ settings: { ...settings, animationDuration: 125 } });
              } else if (settings.animationDuration === 125) {
                set({ settings: { ...settings, animationDuration: 250 } });
              }
            }}
          >
            {settings.animationDuration === 125 && "🐆"}
            {settings.animationDuration === 250 && "🐇"}
            {settings.animationDuration === 500 && "🐢"}
          </div>
        </div>
        {/* <div className="side-buttons" style={{ bottom: "10.5rem" }}></div> */}
      </main>

      <Circles amount={8} />
      <Tooltip />
      {settings.aboutIsOpen && <About />}
      {maxLimitMessage && <MaxLimit />}
      {/* {settings.isOpen && <Settings />} */}
    </div>
  );
}

export default App;
