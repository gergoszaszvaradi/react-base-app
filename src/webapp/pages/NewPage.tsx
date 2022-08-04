import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useUserApi } from "../api/users";
import { TextState } from "../states/text";
import { useGlobalState } from "../utils/state";

const NewPage : React.FC = () => {
    const [state] = useGlobalState(TextState);

    const [firstName, setFirstName] = useState("John");
    const [lastName, setLastName] = useState("Doe");
    const [email, setEmail] = useState("john.doe@email.com");

    const userApi = useUserApi();
    const { mutate: postUser } = userApi.postUser();

    return (
        <>
            <p>New Page</p>
            <p>Echo: {state.text}</p>
            <p>Count: {state.count}</p>
            <LinkContainer to="/">
                <Button variant="primary">To Index Page</Button>
            </LinkContainer>

            <Form>
                <Form.Control type="text" placeholder="First Name" value={firstName} onChange={(e) : void => setFirstName(e.target.value)}/>
                <Form.Control type="text" placeholder="Last Name" value={lastName} onChange={(e) : void => setLastName(e.target.value)}/>
                <Form.Control type="text" placeholder="Email" value={email} onChange={(e) : void => setEmail(e.target.value)}/>
                <Button variant="primary" onClick={() : void => postUser({ email, firstName, lastName })}>Submit</Button>
            </Form>
        </>
    );
};

export default NewPage;
