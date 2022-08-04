import React from "react";
import { Link } from "react-router-dom";
import { TextState } from "../states/text";
import { useGlobalState } from "../utils/state";

const NewPage : React.FC = () => {
    const [state] = useGlobalState(TextState);
    return (
        <>
            <p>New Page</p>
            <p>Echo: {state.text}</p>
            <p>Count: {state.count}</p>
            <Link to="/">To Index Page</Link>
        </>
    );
};

export default NewPage;
