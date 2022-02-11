import React, { Component, ReactElement } from "react";
import { Link } from "react-router-dom";

export default class IndexPage extends Component {
    render() : ReactElement {
        return (
            <>
                <h1>Index Page</h1>
                <Link to="/new">To New Page</Link>
            </>
        );
    }
}
