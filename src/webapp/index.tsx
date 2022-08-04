import React from "react";
import ReactDOM from "react-dom/client";
import { throwError } from "../common/utils/utils";
import App from "./App";

const element = document.getElementById("app") ?? throwError<HTMLElement>(new Error("Unable to retrieve application root element."));
const root = ReactDOM.createRoot(element);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
