import React, { ReactElement } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.scss";
import IndexPage from "./pages/IndexPage";
import NewPage from "./pages/NewPage";

export default function App() : ReactElement {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/new" element={<NewPage />} />
            </Routes>
        </BrowserRouter>
    );
}
