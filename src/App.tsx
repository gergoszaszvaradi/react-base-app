import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import NewPage from "./pages/NewPage";

const App : React.FC = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/new" element={<NewPage />} />
        </Routes>
    </BrowserRouter>
);

export default App;
