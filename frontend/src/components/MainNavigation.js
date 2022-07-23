import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./GlobalStyles";
import { lightTheme, darkTheme } from "./Theme"

export default class MainNavigation extends Component{
    constructor(props){
        super(props);
        this.state = {
            isAuth: false,
            avatar: '',
            first_name: '',
            last_name: '',
            hidden: true,
            theme : "light"
        }
    }

    componentDidMount(){
        if (localStorage.getItem('token') !== null) {
            this.setState({
                isAuth: true,
            });
            fetch('http://127.0.0.1:8000/api/v1/users/dj-rest-auth/user/', {
                // fetch('http://127.0.0.1:8000/api/users/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${localStorage.getItem('token')}`
                    }
                })
                .then(res => res.json())
                .then(data => {
                    this.setState({
                        avatar: data.avatar,
                        first_name: data.first_name,
                    })
                });
            } 
        }
        
    // componentDidUpdate(){
    //     localStorage.setItem('theme', this.state.theme);

    // }

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
                localStorage.clear();
                window.location.replace('http://127.0.0.1:8000/login');
            });
    }

    showSth = () => {
        console.log("yes")
    }

    render(){
        const { isAuth, avatar, first_name , hidden, theme} = this.state;
        const themeToggler = () => {
            theme === 'light' ? this.setState({theme: "dark"}) : this.setState({theme: "light"})
        }

        

        return(
            <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
                 {/* <GlobalStyles /> */}
                <header >
                    <span className="prop_menu" onClick={() => this.setState({hidden : !hidden}) }></span>
                    { hidden === false && (
                        <nav className="mainNavigation">
                            
                            <ul>
                                <div className="groupA">
                                    <li><Link to="/">Back Home</Link></li>

                                    <li>
                                        {isAuth === true && (
                                            <Fragment>
                                                <li>
                                                    <Link to="/wishlist" style={{ fontSize: "1em"}}>Wishlist</Link>
                                                </li>
                                                <li>
                                                    <Link to="/logout" style={{ fontSize: "1em"}} onClick={this.handleLogout}>Logout</Link>
                                                </li>
                                            </Fragment>
                                        )}
                                    </li>
                                    {/* <li><span onClick={themeToggler}>Switch Theme</span></li> */}
                                </div>
                                
                                <div className="groupB">
                                    {isAuth === true ? (
                                        <h2><Link to="/user/account" className="nav_profile">Account</Link></h2>
                                    ) : (
                                        <h2><Link to="/login">Sign in</Link>/<Link to="/signup">up</Link></h2>
                                    )}
                                    <h2><Link to="/cities">Cities</Link></h2>
                                    <h2><Link to="/properties">Places to stay</Link></h2>
                                    <h2><Link to="/payment">Reservations</Link></h2>
                                </div>

                                <div className="groupC">
                                    <li>
                                        <Link to="/about-us">About Us</Link>
                                    </li>
                                    <li>
                                        <Link to="/amenities">Amenities</Link>
                                    </li> 
                                    <li>
                                        <Link to="/contact-us">Contact</Link>
                                    </li> 

                                    <li>
                                        <Link to="/loose/admin">Admin</Link>
                                    </li>
                                </div>

                                {/* {isAuth === true ? (
                                    <Fragment>
                                        {' '}
                                        <li> */}
                                            {/* <Link to="/user/profile" className="nav_profile"><span><img src={avatar} alt={first_name} className="nav_pic"></img></span> <span>Profile</span></Link> */}
                                            {/* <Link to="/user/profile" className="nav_profile"><span><img src="../../static/default.png" alt={first_name} className="nav_pic"></img></span> <span>Profile</span></Link>
                                        </li>
                                        <li>
                                            <Link to="/logout" onClick={this.handleLogout}>Logout</Link>
                                        </li>
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        {' '}
                                        <li>
                                            <Link to="/login">Login</Link>
                                        </li>
                                        <li>
                                            <Link to="/signup">Signup</Link>
                                        </li>
                                    </Fragment> */}
                                {/* )} */}
                            </ul>
                        </nav>
                    )}
                </header>
            </ThemeProvider>
                
            
        )
    }
}