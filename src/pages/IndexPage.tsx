import React from "react";
import { Button, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useUserApi } from "../api/users";
import IntlText from "../component/typography/IntlText";
import { languages } from "../languages/languages";
import { TextState } from "../states/text";
import { useLanguagePack } from "../utils/intl";
import { useGlobalState } from "../utils/state";

const IndexPage : React.FC = () => {
    const [state, setState] = useGlobalState(TextState);

    const userApi = useUserApi();
    const { isLoading, isError, error, data: users } = userApi.getUsers();

    const [pack, setLanguage] = useLanguagePack();

    if (isLoading)
        return <>Loading...</>;

    if (isError)
        return <>Error while getting response: {error}</>;

    return (
        <>
            <p>Index Page</p>
            <input type="text" onChange={(e) : void => setState({ text: e.target.value, count: e.target.value.length })} />

            <p>Echo: {state.text}</p>
            <p>Count: {state.count}</p>

            {users.data.map((user) => <p key={user.id}>{user.first_name} {user.last_name} {user.email}</p>)}

            <LinkContainer to="/new">
                <Button variant="primary">To New Page</Button>
            </LinkContainer>

            <Form.Select defaultValue={pack.locale} onChange={(e) : void => setLanguage(e.target.value)}>
                {Object.keys(languages).map((locale) => <option key={locale} value={locale}>{locale}</option>)}
            </Form.Select>

            <p><IntlText text="text1" /></p>
        </>
    );
};

export default IndexPage;
