import React from "react";
import { Link } from "react-router-dom";

const IndexPage : React.FC = () => (
    <>
        <p>Index Page</p>
        <Link to="/new">To New Page</Link>
    </>
);

export default IndexPage;
