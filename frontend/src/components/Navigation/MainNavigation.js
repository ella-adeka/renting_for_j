import React, { Component, Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faHeart as HeartEmpty,
    faSun,
    faMoon,
    faUser,
} from '@fortawesome/free-regular-svg-icons';
import WishlistContext from "../../utils/context/wishlistContext";
import AuthContext from "../../utils/context/authContext";
import {  faHeart as HeartFilled, faSignOut } from "@fortawesome/free-solid-svg-icons";
import SocialsBar from "../SocialsBar";



export default class MainNavigation extends Component{
    // static contextType = WishlistContext;
    static contextType = AuthContext;

    constructor(props){
        super(props);
        this.state = {
            isAuth: false,
            avatar: '',
            first_name: '',
            last_name: '',
            hidden: true,
            isLight: true,
            theme: localStorage.getItem('theme') ? localStorage.getItem('theme') : "light",
        }
    }

    componentDidMount(){

        // if (localStorage.getItem('theme') == 'dark') {
        //     this.setState({
        //         theme: localStorage.getItem('theme'),
        //     });
        // }
      
        if (localStorage.getItem('token') !== null) {
            this.setState({
                isAuth: true,
            });
            // fetch('http://127.0.0.1:8000/api/v1/users/dj-rest-auth/user/', {
            fetch('http://127.0.0.1:8000/api/v1/users/user', {
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

    // handleLogout = (event) => {
    //     event.preventDefault();
    //     // fetch('http://127.0.0.1:8000/api/v1/users/dj-rest-auth/logout/', {
    //     fetch('http://127.0.0.1:8000/api/v1/users/logout/', {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: `Token ${localStorage.getItem('token')}`
    //         }
    //         })
    //         .then(res => res.json())
    //         .then(res => {
    //             console.log(res);
    //             localStorage.removeItem("token");
    //             window.location.replace('http://127.0.0.1:8000/login');
    //         });
    // }

    showSth = () => {
        console.log("yes")
    }

    render(){
        const { isAuth, hidden, theme, isLight } = this.state;
        var items = JSON.parse(localStorage.getItem("wishlist") || "[]");


        // const { items } = useContext(WishlistContext);
        // console.log(items.length)

        // const {items} = this.context;
        // const { logoutUser} = this.context;

        // console.log(items.length);
        
        return(
            <header>
                <div className="menu_bar">
                    {/* { hidden === false && ( */}
                       <Fragment >
                            {/* <div className='menu_bar__div' style={ hidden ? isAuth ? {visibility: "visible"} : {visibility: "hidden"} : {visibility: "hidden"}}> */}
                            <div className='menu_bar__div' style={ hidden ? {visibility: "hidden"} : isAuth ? {visibility: "visible"} :  {visibility: "hidden"} }>
                                {/* <Link to="/logout" onClick={this.handleLogout}> */}
                                <AuthContext.Consumer>
                                    {({logoutUser}) => (
                                        <a onClick={logoutUser}>
                                            <FontAwesomeIcon  className='menu_bar__div__icon' icon={faSignOut} />
                                        </a>

                                        // <span onClick={logoutUser}><FontAwesomeIcon  className='menu_bar__div__icon' icon={faSignOut}></FontAwesomeIcon></span>
                                    )}
                                </AuthContext.Consumer>
                            </div>
                            <div className='menu_bar__div' onClick={this.props.themeToggler} style={ hidden ? {visibility: "hidden"} : {visibility: "visible"}}><FontAwesomeIcon className='menu_bar__div__icon' onClick={() => {this.setState({isLight : !isLight})}}  icon={isLight ? faMoon : faSun } /></div>
                       </Fragment>
                    {/* )} */}
                    <div className='menu_bar__div'>
                        <Link to="/user/account">
                            <FontAwesomeIcon className='menu_bar__div__icon' icon={faUser} />
                        </Link>
                    </div>
                    <div className='menu_bar__div'>
                        {/* <WishlistContext.Consumer>
                            {({items}) => ( */}
                                <Link to="/wishlist">
                                    <FontAwesomeIcon className='menu_bar__div__icon' icon={items.length == 0 ? HeartEmpty : HeartFilled} /> <sup>{items.length}</sup>
                                </Link>
                            {/* )}
                        </WishlistContext.Consumer> */}
                    </div>
                   
                    {/* <div className='menu_bar__div'>
                        {isAuth === true ? (
                            <Link to="/wishlist"><FontAwesomeIcon className='menu_bar__div__icon' icon={faHeart} /><sup>{items.length}</sup></Link>
                        ) : (
                            <Link to="/login"><FontAwesomeIcon className='menu_bar__div__icon' icon={faHeart} /><sup>0</sup></Link>
                        )}
                    </div> */}
                    <div className='menu_bar__div' onClick={() => this.setState({hidden : !hidden}) }><span>menu</span><span className="prop_menu"></span></div>
                </div>
                { hidden === false && (
                    <nav className="mainNavigation">
                        
                        <ul>
                            <div className="groupA">
                                {/* <li><Link to="/">Back Home</Link></li> */}
                                <li>
                                    <Link to="/">
                                        Back to Home
                                        {/* <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 176.51 43.63" style={{ width: "9em"}}><defs></defs><line style={{fill:"none", strokeMiterLimit:10 }} className="cls-1" x1="0.1" y1="22.19" x2="176.51" y2="22.19"/><path d="M230.15,209.89a28.33,28.33,0,0,0,7.52-3,30.08,30.08,0,0,0,6.39-5,33.41,33.41,0,0,0,8.07-13.8l2.2.89a55.22,55.22,0,0,1-4.42,7.1,43.15,43.15,0,0,1-5.51,6.17,39.21,39.21,0,0,1-6.59,4.89,42.12,42.12,0,0,1-7.46,3.46Z" transform="translate(-230.15 -188.04)"/><path d="M230.3,209.88a34.86,34.86,0,0,1,8.06,2.49,28.15,28.15,0,0,1,7.08,4.55,31.86,31.86,0,0,1,5.54,6.43,43.81,43.81,0,0,1,4,7.63l-2.27.69a28.58,28.58,0,0,0-2.69-7.74,25.46,25.46,0,0,0-4.89-6.64,23.48,23.48,0,0,0-6.85-4.68,25.25,25.25,0,0,0-8.05-2Z" transform="translate(-230.15 -188.04)"/></svg> */}
                                        {/* <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 89.85 43.63" style={{ width: "5em"}}><defs></defs><line style={{fill:"none", stroke:"#000", strokeMiterlimit:10 }} className="cls-1" x1="0.1" y1="22.19" x2="89.85" y2="22.19"/><path d="M230.15,209.89a28.33,28.33,0,0,0,7.52-3,30.08,30.08,0,0,0,6.39-5,33.41,33.41,0,0,0,8.07-13.8l2.2.89a55.22,55.22,0,0,1-4.42,7.1,43.15,43.15,0,0,1-5.51,6.17,39.21,39.21,0,0,1-6.59,4.89,42.12,42.12,0,0,1-7.46,3.46Z" transform="translate(-230.15 -188.04)"/><path d="M230.3,209.88a34.86,34.86,0,0,1,8.06,2.49,28.15,28.15,0,0,1,7.08,4.55,31.86,31.86,0,0,1,5.54,6.43,43.81,43.81,0,0,1,4,7.63l-2.27.69a28.58,28.58,0,0,0-2.69-7.74,25.46,25.46,0,0,0-4.89-6.64,23.48,23.48,0,0,0-6.85-4.68,25.25,25.25,0,0,0-8.05-2Z" transform="translate(-230.15 -188.04)"/></svg> */}
                                        {/* <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 89.85 43.63"><defs><style>.cls-1{{fill:"none", stroke:"#000", strokeMiterlimit:10}}</style></defs><line class="cls-1" x1="0.1" y1="22.19" x2="89.85" y2="22.19"/><path d="M230.15,209.89a28.33,28.33,0,0,0,7.52-3,30.08,30.08,0,0,0,6.39-5,33.41,33.41,0,0,0,8.07-13.8l2.2.89a55.22,55.22,0,0,1-4.42,7.1,43.15,43.15,0,0,1-5.51,6.17,39.21,39.21,0,0,1-6.59,4.89,42.12,42.12,0,0,1-7.46,3.46Z" transform="translate(-230.15 -188.04)"/><path d="M230.3,209.88a34.86,34.86,0,0,1,8.06,2.49,28.15,28.15,0,0,1,7.08,4.55,31.86,31.86,0,0,1,5.54,6.43,43.81,43.81,0,0,1,4,7.63l-2.27.69a28.58,28.58,0,0,0-2.69-7.74,25.46,25.46,0,0,0-4.89-6.64,23.48,23.48,0,0,0-6.85-4.68,25.25,25.25,0,0,0-8.05-2Z" transform="translate(-230.15 -188.04)"/></svg> */}
                                    </Link>
                                </li>

                                {/* <li className="part_menu_bar">
                                    {isAuth === true && (
                                        <Fragment>
                                            <li className="part_menu_bar__li">
                                                <Link to="/logout" onClick={this.handleLogout} className='part_menu_bar__li__link__icon' ><FontAwesomeIcon  className='part_menu_bar__li__link__icon' icon={faSignOut} /></Link> */}
                                                {/* <Link to="/logout" style={{ fontSize: "1em"}} onClick={this.handleLogout}>Logout</Link> */}
                                            {/* </li>
                                            <li className="part_menu_bar__li"> */}
                                                {/* <Link to="/wishlist" className='part_menu_bar__li__link__icon'><FontAwesomeIcon className='part_menu_bar__li__link__icon' icon={faHeart} /> <sup>{items.length}</sup></Link> */}
                                                {/* <Link to="/wishlist" style={{ fontSize: "1em"}}>Wishlist <sup>{items.length}</sup></Link> */}
                                            {/* </li>
                                        </Fragment>
                                    )}
                                </li> */}
                                {/* <li><span onClick={this.props.themeToggler}>Switch Theme</span></li> */}
                            </div>
                            
                            <div className="groupB">
                                {isAuth === true ? (
                                    <h2><Link to="/user/account" className="nav_profile">Account</Link></h2>
                                ) : (
                                    <h2><Link to="/login">Sign in</Link><span>/</span><Link to="/signup">up</Link></h2>
                                )}
                                <h2><Link to="/cities">Our Locations</Link></h2>
                                {/* <h2><Link to="/cities">Cities</Link></h2> */}
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

                                {/* <li>
                                    <Link to="/loose/admin">Admin</Link>
                                </li> */}
                                <SocialsBar/>
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
        )
    }
}