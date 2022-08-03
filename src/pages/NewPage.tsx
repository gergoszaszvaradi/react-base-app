import React from "react";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { TextState } from "../states/text";
import { useGlobalState } from "../utils/state";

const NewPage : React.FC = () => {
    const [state] = useGlobalState(TextState);
    return (
        <>
            <p>New Page</p>
            <p>Echo: {state.text}</p>
            <p>Count: {state.count}</p>
            <LinkContainer to="/">
                <Button variant="primary">To Index Page</Button>
            </LinkContainer>
        </>
    );
};

export default NewPage;
