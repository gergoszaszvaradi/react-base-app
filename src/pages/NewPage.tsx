import React from "react";
import { Link } from "react-router-dom";

const NewPage : React.FC = () => (
    <>
        <p>New Page</p>
        <Link to="/">To Index Page</Link>
    </>
);

export default NewPage;
