import { useState, useContext } from "react";
import "./App.scss";

import Aside from "./components/Aside/Aside";
import Basket from "./components/Basket/Basket";
import ActiveMethod from "./components/ActiveMethod/ActiveMethod";
import Output from "./components/Output/Output";

import { BasketContext } from "./contexts/BasketContext";

const themes: { title: "Fruit" | "Veggies"; icon: string }[] = [
    { title: "Fruit", icon: "🍎" },
    { title: "Veggies", icon: "🥬" },
];

function App() {
    const { state, dispatch } = useContext(BasketContext);
    const [animationSpeed, setAnimationSpeed] = useState<number>(250);
    const [theme, setTheme] = useState<"Fruit" | "Veggies">("Fruit");

    return (
        <div className="App">
            <header>
                <section className="header-left">
                    <h2>🧺 BasketJS</h2>
                    <p>Pre-alpha</p>
                </section>
                {/* <section className="header-right">
                    <div className="options-animation-speed">
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
                    <div className="options-theme">
                        <p>Theme:</p>
                        <div>
                            {themes.map(({ title, icon }) => (
                                <button
                                    style={
                                        state.theme === title
                                            ? {
                                                  backgroundColor:
                                                      "var(--light)",
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
                </section> */}
            </header>
            <Aside />
            <main>
                <Basket duration={animationSpeed} />
                <ActiveMethod />
                <Output duration={animationSpeed} />
            </main>
        </div>
    );
}

export default App;
