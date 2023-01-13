import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BasketProvider } from "./contexts/BasketContext";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BasketProvider>
            <App />
        </BasketProvider>
    </React.StrictMode>
);
