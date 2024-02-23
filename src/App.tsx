import "./App.scss";

import { useEffect, useRef, useState } from "react";

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

// import { FcSettings as IconSettings } from "react-icons/fc";
// import { BsArrowDown as IconDown } from "react-icons/bs";
import { allMethods } from "./store/methods";
import { useStore } from "./store/store";
import { useLocation } from "react-router-dom";
// import Header from "./components/Header/Header";

function App() {
  const appRef = useRef<HTMLDivElement | null>(null);
  const {
    set,
    settings,
    maxLimitMessage,
    disableInput,
    itemsToRemove,
    itemsToAdd,
    itemsToReplace,
    processSuccesIndex,
    itemsToProcess,
  } = useStore();
  const location = useLocation();

  const [audioContext] = useState<AudioContext>(new AudioContext());

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
    <div
      className="App"
      style={{
        pointerEvents: disableInput ? "none" : "all",
      }}
      ref={appRef}
    >
      <div
        style={{
          color: "#22222288",
          position: "fixed",
          zIndex: "5000",
          top: "2rem",
          right: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {/* <div
          style={{
            width: 250,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>Add:</span>
          <span>{itemsToAdd.map((item) => item + ", ")}</span>
        </div>
        <div
          style={{
            width: 250,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>Remove:</span>
          <span>{itemsToRemove.map((item) => item + ", ")}</span>
        </div>
        <div
          style={{
            width: 250,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>Replace:</span>
          <span>{itemsToReplace.map((item) => item.index + ", ")}</span>
        </div> */}
        {/* <div
          style={{
            width: 250,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>Process:</span>
          <span>{itemsToProcess.map((item) => item + ", ")}</span>
        </div>
        <h1>{processSuccesIndex}</h1> */}
      </div>
      {/* <Header /> */}
      <Aside />

      <main>
        <div
          style={{
            marginTop: "-7rem",
            background: "rgba(255,255,255,0.35)",
            height: "4rem",
            width: "15rem",
            transform: "translateX(3rem)",
            borderTopLeftRadius: "3rem",
            borderTopRightRadius: "3rem",
            // display: "flex",
            gap: "3rem",
            justifyContent: "center",
            alignSelf: "flex-end",
            display: "none",
          }}
        >
          <div
            className="side-button"
            style={{
              display: settings.isOpen ? "grid" : "grid",
              fontSize: "var(--itemFont)",
              placeContent: "center",
            }}
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
            style={{
              display: settings.isOpen ? "grid" : "grid",
              fontSize: "var(--itemFont)",
              placeContent: "center",
            }}
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

        <Basket />
        <Secondary />
        <Input />
        {/* <Callback /> */}
        {/* <div style={{ marginTop: "-0.75rem", marginBottom: "-0.75rem" }}>
          <IconDown size="32px" />
        </div> */}
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
