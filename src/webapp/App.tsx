import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import IndexPage from "./pages/IndexPage";
import NewPage from "./pages/NewPage";

import "./bootstrap.scss";

const queryClient = new QueryClient();

const App : React.FC = () => (
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/new" element={<NewPage />} />
            </Routes>
        </BrowserRouter>
    </QueryClientProvider>
);

export default App;
