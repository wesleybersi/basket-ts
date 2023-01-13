import { useState } from "react";
import "./App.scss";

import Aside from "./components/Aside/Aside";
import Basket from "./components/Basket/Basket";
import ActiveMethod from "./components/ActiveMethod/ActiveMethod";
import Output from "./components/Output/Output";

function App() {
    return (
        <div className="App">
            <header>
                <section className="header-left">
                    <h2>🧺 fruitBasketJS</h2>
                </section>
                <section className="header-right"></section>
            </header>
            <Aside />
            <main>
                <Basket />

                <ActiveMethod />
                <Output />
            </main>
        </div>
    );
}

export default App;
