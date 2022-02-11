import React, { Component, ReactElement } from "react";
import { Link } from "react-router-dom";

export default class NewPage extends Component {
    render() : ReactElement {
        return (
            <>
                <h1>New Page</h1>
                <Link to="/">To Index Page</Link>
            </>
        );
    }
}
