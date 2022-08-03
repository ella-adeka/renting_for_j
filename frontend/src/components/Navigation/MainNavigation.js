import React, { Component, Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    // faHeart,
    faSun,
    faUser,
} from '@fortawesome/free-regular-svg-icons';
import WishlistContext from "../../utils/context/wishlistContext";
import { faHeart, faSignOut } from "@fortawesome/free-solid-svg-icons";



export default class MainNavigation extends Component{
    static contextType = WishlistContext;

    constructor(props){
        super(props);
        this.state = {
            isAuth: false,
            avatar: '',
            first_name: '',
            last_name: '',
            hidden: true,
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
                localStorage.removeItem("token");
                window.location.replace('http://127.0.0.1:8000/login');
            });
    }

    showSth = () => {
        console.log("yes")
    }

    render(){
        const { isAuth, hidden } = this.state;
        // const { items } = useContext(WishlistContext);
        // console.log(items.length)

        const {items} = this.context;

        // console.log(items.length);
        
        return(
            <header>
                <div className="menu_bar">
                    <div className='menu_bar__div'>
                        <Link to="/user/account">
                            <FontAwesomeIcon className='menu_bar__div__icon' icon={faUser} />
                        </Link>
                    </div>
                   
                    {/* <div className='menu_bar__div'>
                        {isAuth === true ? (
                            <Link to="/wishlist"><FontAwesomeIcon className='menu_bar__div__icon' icon={faHeart} /><sup>0</sup></Link>
                        ) : (
                            <Link to="/login"><FontAwesomeIcon className='menu_bar__div__icon' icon={faHeart} /><sup>0</sup></Link>
                        )}
                    </div> */}
                    <div className='menu_bar__div' onClick={this.props.themeToggler}><FontAwesomeIcon className='menu_bar__div__icon' icon={faSun} /></div>
                    <div className='menu_bar__div' onClick={() => this.setState({hidden : !hidden}) }><span>menu</span><span className="prop_menu"></span></div>
                </div>
                { hidden === false && (
                    <nav className="mainNavigation">
                        
                        <ul>
                            <div className="groupA">
                                <li><Link to="/">Back Home</Link></li>

                                <li className="part_menu_bar">
                                    {isAuth === true && (
                                        <Fragment>
                                            <li className="part_menu_bar__li">
                                                <Link to="/logout" onClick={this.handleLogout} className='part_menu_bar__li__link__icon' ><FontAwesomeIcon  className='part_menu_bar__li__link__icon' icon={faSignOut} /></Link>
                                                {/* <Link to="/logout" style={{ fontSize: "1em"}} onClick={this.handleLogout}>Logout</Link> */}
                                            </li>
                                            <li className="part_menu_bar__li">
                                                <Link to="/wishlist" className='part_menu_bar__li__link__icon'><FontAwesomeIcon className='part_menu_bar__li__link__icon' icon={faHeart} /> <sup>{items.length}</sup></Link>
                                                {/* <Link to="/wishlist" style={{ fontSize: "1em"}}>Wishlist <sup>{items.length}</sup></Link> */}
                                            </li>
                                        </Fragment>
                                    )}
                                </li>
                                {/* <li><span onClick={this.props.themeToggler}>Switch Theme</span></li> */}
                            </div>
                            
                            <div className="groupB">
                                {isAuth === true ? (
                                    <h2><Link to="/user/account" className="nav_profile">Account</Link></h2>
                                ) : (
                                    <h2><Link to="/login">Sign in</Link> / <Link to="/signup">up</Link></h2>
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
        )
    }
}