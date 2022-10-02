import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../utils/context/authContext";

export default class DeactivateUserAccount extends Component{
    static contextType = AuthContext;

    constructor(props){
        super(props);
    }

    componentDidMount(){
        if (localStorage.getItem('token') === null) {
            window.location.replace('http://127.0.0.1:8000/login');
        } 
    }

    render(){
        const { deactivateUser, user,loading } = this.context;

        const handleSubmit = (event) => {
            event.preventDefault();

            deactivateUser();
        };

        return(
            <main>
                <Link className="back_to_props" to={{ pathname: `/user/account`}}>
                    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 176.51 43.63" style={{ width: "8em"}}><defs></defs><line style={{fill:"none", strokeMiterLimit:10 }} className="cls-1" x1="0.1" y1="22.19" x2="176.51" y2="22.19"/><path d="M230.15,209.89a28.33,28.33,0,0,0,7.52-3,30.08,30.08,0,0,0,6.39-5,33.41,33.41,0,0,0,8.07-13.8l2.2.89a55.22,55.22,0,0,1-4.42,7.1,43.15,43.15,0,0,1-5.51,6.17,39.21,39.21,0,0,1-6.59,4.89,42.12,42.12,0,0,1-7.46,3.46Z" transform="translate(-230.15 -188.04)"/><path d="M230.3,209.88a34.86,34.86,0,0,1,8.06,2.49,28.15,28.15,0,0,1,7.08,4.55,31.86,31.86,0,0,1,5.54,6.43,43.81,43.81,0,0,1,4,7.63l-2.27.69a28.58,28.58,0,0,0-2.69-7.74,25.46,25.46,0,0,0-4.89-6.64,23.48,23.48,0,0,0-6.85-4.68,25.25,25.25,0,0,0-8.05-2Z" transform="translate(-230.15 -188.04)"/></svg>
                </Link>
                <div className="signup_page">
                    { loading === false && (
                        <Fragment>
                            {''}
                            <form onSubmit={handleSubmit} className="signup_form">
                                <h6>Sad to see you go :(</h6>
                                <h3>{user.first_name}, tell us your reasons</h3>
                                <p>Don't really like it here :(</p>
                                <br></br>
                                <br></br>
                                <button className="signup_form__button" type="submit">Deactivate</button>
                                <button  type="link" className="signup_form__button without"><Link to={{ pathname: '/user/account'}}>Nevermind</Link></button>
                            </form>
                        </Fragment>
                    )}
                </div>
            </main>
        )
    }
}