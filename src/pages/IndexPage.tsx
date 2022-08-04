import React from "react";
import { Link } from "react-router-dom";
import { useUserApi } from "../api/users";
import { TextState } from "../states/text";
import { useGlobalState } from "../utils/state";

const IndexPage : React.FC = () => {
    const [state, setState] = useGlobalState(TextState);

    const userApi = useUserApi();
    const { isLoading, isError, error, data: users } = userApi.getUsers();

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

            <Link to="/new">To New Page</Link>
        </>
    );
};

export default IndexPage;
