import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return(
        <div className="error_page">
            <h1>404</h1>
            <p>Seems you're lost, go back <Link to={{ pathname: '/' }}>home</Link></p>
            <p>Still need out help? contact us via <a href="mailto:abc123@gmail.com?subject=Enquiry">email</a></p>
        </div>
    ) 
}

export default ErrorPage;