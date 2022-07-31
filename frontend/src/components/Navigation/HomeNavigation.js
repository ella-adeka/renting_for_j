import React, { Component, Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../utils/context/authContext";

export default class HomeNavigation extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            isAuth: false,
        }
    }

    componentDidMount(){
        if (localStorage.getItem('token') !== null) {
            this.setState({
                isAuth: true,
            });
            fetch('http://127.0.0.1:8000/api/v1/users/dj-rest-auth/user/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            })
            .then(res => res.json())
        } 
    }

    handleLogout = (event) => {
        event.preventDefault();
        fetch('http://127.0.0.1:8000/api/v1/users/dj-rest-auth/logout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                // localStorage.clear();
                localStorage.removeItem("token");
                window.location.replace('http://127.0.0.1:8000/');
            });
    }
    
    render(){
        const { isAuth } = this.state;
        return(
              
                <div className="homeUl">
                    <Link className="homeUl__mainLink" to="/about-us">About</Link>
                    <Link className="homeUl__mainLink" to="/cities">Cities</Link>
                    <Link className="homeUl__mainLink" to="/properties">Properties</Link>
                    <Link className="homeUl__mainLink" to="/contact-us">Contact</Link>

                    {isAuth === true ? (
                        <Fragment>
                            {' '}
                            <li className="homeUl__li">
                                <Link to="/user/account" className="nav_profile">Account</Link>
                            </li>
                            <li className="homeUl__li">
                                <Link to="/logout" onClick={this.handleLogout}>Logout</Link>
                            </li>
                        </Fragment>
                    ) : (
                        <Fragment>
                            {' '}
                            <li className="homeUl__li">
                                <Link  to="/login">Login</Link>
                            </li>
                            <li className="homeUl__li">
                                <Link to="/signup">Signup</Link>
                            </li>
                        </Fragment>
                    )}
                    {/* <Link to={{ pathname: '/amenities'}}>Amenities</Link> */}
                </div>

                            
                   
            
        )
    }
}