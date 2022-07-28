import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return(
        <div className="error_page">
            <h1>404</h1>
            <p>Seems you're lost, go back <Link to={{ pathname: '/' }}>home</Link></p>
        </div>
    ) 
}

export default ErrorPage;