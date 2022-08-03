import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { throwError } from "./utils/utils";

const element = document.getElementById("app") ?? throwError<HTMLElement>(new Error("Unable to retrieve application root element."));
const root = ReactDOM.createRoot(element);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
