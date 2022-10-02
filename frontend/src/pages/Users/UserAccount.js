import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import  AuthContext  from "../../utils/context/authContext";
import defaultImage from "../../../static/default.png";
import MainNavigation from "../../components/Navigation/MainNavigation";

export default class UserAccount extends Component{
    static contextType = AuthContext;

    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: true,
            // user: '',
            // email: '',
            // first_name: '',
            // last_name: '',
            // avatar: '',
            loading: true,
            formShowing: true,
            booking: [],
            user_profile: {},

            // newFirstName : '',
            // newLastName : '',
        }
        // console.log(this.state.formShowing)

        this.showUpdateForm = this.showUpdateForm.bind(this);
    }

    componentDidMount(){
        if (localStorage.getItem('token') === null) {
            window.location.replace('http://127.0.0.1:8000/login');
        } 
        else {
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
                    // user: data.pk,
                    // email: data.email,
                    // first_name: data.first_name,
                    // last_name: data.last_name,
                    // avatar: data.avatar,
                    user_profile: data.user_profile,
                    loading: false
                })
            });
        }

        this.showReservations();

        // window.sessionStorage.setItem("formShowing", this.state.formShowing);
    }

    componentDidUpdate(){

    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }


    async showReservations(){
        axios
            .get("/api/bookings/")
            .then((res) => this.setState({ booking: res.data }))
            .catch((err) => console.log(err));   
    }

  

    showUpdateForm = () => {
        this.setState(prevState => ({
            formShowing: !prevState.formShowing
        }));
    }

    
    render(){
        const { logoutUser, user } = this.context;
        const { loading, user_profile } = this.state;

        const formatUser = (user) => {
            return user.first_name + ' ' + user.last_name;
        }

        // const { booking, email, first_name, last_name, loading, formShowing, user_profile } = this.state;
        // const { newFirstName, newLastName } = this.state;
        // profile, personal info, change password, reservations, payment,  
        // referral credits & coupons
        // deactivate

        // console.log(user)
        // console.log(auth.first_name)
        // console.log(auth)
        
        return(
            <main>
                <MainNavigation/>
                {/* <div> */}
                    { loading === false && (
                        <Fragment>
                                {/* <h1>Hello, {first_name}</h1> */}
                            {/* <h1 style={{marginTop: "-10px"}}>Hello, {first_name}<sup><img  src={user_profile?.avatar} width="40" height="40" style={{borderRadius: "50%"}}></img></sup></h1> */}
                            <h1 style={{marginTop: "-10px"}}>Hello, {user.first_name}<sup><img  src={user_profile?.avatar ? user_profile?.avatar : defaultImage} width="40" height="40" style={{borderRadius: "50%"}}></img></sup></h1>
                            {/* <h1 style={{marginTop: "-10px"}}>Hello, {first_name}<sup><img  src={user_profile?.avatar ? user_profile?.avatar : "/Users/emmanuellaadeka/Documents/PROJECTS/my_projects/johnAirbnb/john_airbnb/frontend/static/default.png"} width="40" height="40" style={{borderRadius: "50%"}}></img></sup></h1> */}
                                {/* <h1 style={{marginTop: "-10px"}}>Hello, {first_name}</h1><sup><img  src={user_profile?.avatar} width="40" height="40" style={{borderRadius: "50%"}}></img></sup> */}
                            <h4><span style={{ color: "#898989", fontSize: "1.1em" }}>{formatUser(user)}, {user.email},</span> <span style={{ fontSize: "1em", textDecoration: "underline", cursor: "pointer" }} onClick={logoutUser}>logout</span></h4>
                            <div className="user">
                                <div className="user_account">
                                    {/* <Link to={{ pathname: `/user/deactivate` }} style={{ position: "absolute", bottom: "6em", textAlign: "center"}}>Deactivate My Account</Link> */}
                                    {/* <Link to={{ pathname: `/user/password-change` }} style={{ position: "absolute", top: "10em", right: "1.5em"}}>Change Password</Link> */}
                                    {/* <h1>User Profile</h1> */}
                                    {/* <button type="button" onClick={this.showUpdateForm} style={{ position: 'absolute', right: "0"}}>{ formShowing ? 'Edit' : 'Close'}</button> */}
                                    {/* <img src={avatar} alt={first_name} className="profile_pic"></img> */}
                                    {/* <img src="../../static/default.png" alt={first_name} className="profile_pic"></img> */}
                                    {/* <h1>{user.first_name}</h1> */}
                                    {/* <h1>{user}</h1> */}
                                    {/* <h1>{auth.email}</h1> */}
                                    {/* <h1>{auth}</h1> */}
                                    <Link to={{ pathname: '/user/profile'}} className="user_account__compartments">
                                        <h2>Profile</h2>
                                        <p>see your profile</p>
                                    </Link>
                                    <Link to={{ pathname: '/user/personal-info'}} className="user_account__compartments">
                                        <h2>Personal Info</h2>
                                        <p>update your personal information</p>
                                    </Link>
                                    <Link to={{ pathname: '/user/password-change'}} className="user_account__compartments">
                                        <h2>Change Password</h2>
                                        <p>change your password</p>
                                    </Link>
                                    <Link to={{ pathname: '/payment'}} className="user_account__compartments">
                                        <h2>Reservations</h2>
                                        <p>see your reservations</p>
                                    </Link>
                                    <Link to={{ pathname: '/payment'}} className="user_account__compartments">
                                        <h2>Payments</h2>
                                        <p>see payments</p>
                                    </Link>
                                    <Link to={{ pathname: '/payment'}} className="user_account__compartments">
                                        <h2>Referral Credits & Coupons</h2>
                                        <p>SEE COUPONS</p>
                                    </Link>
                                </div> 

                            </div>
                                <p style={{ position: 'absolute', bottom: "6em", textAlign: "center", width: "100%", color: "#898989"}}>I would like to <Link to={{ pathname:"/user/deactivate" }} style={{ fontSize: "1em", textDecoration: "underline" }}>deactivate my account</Link></p>  

                            {/* <section style={{ position: 'absolute', right: "0", textAlign: "right"}}>
                                { formShowing ? (
                                    ''
                                ) : (
                                    <form>
                                        <h4 style={{fontFamily: "'Syne', sans-serif", fontSize: "2em"}}>Update  Form</h4>
                                        <input type="text"  value={newFirstName} name="newFirstName" onChange={this.handleChange} placeholder="First Name" style={{backgroundColor: "white"}} />
                                        <br></br>
                                        <input type="text"  value={newLastName} name="newLastName" onChange={this.handleChange} placeholder="Last Name" style={{backgroundColor: "white"}} />
                                        <br></br>
                                        <input type="submit" value="Update"></input>
                                    </form> 
                                )}
                            </section> */}


                            {/* <section>
                            {booking.filter((booking) => booking.user == user).map((booking,  index) => (
                                
                                <div key={index}>
                                    <h2>Your Reservation</h2>
                                    <h3>{booking.get_property_title}</h3>
                                    <img src={booking.get_property_image} alt={booking.get_property_title} width="100%" height="500px"></img>

                                    <p>from <b>{booking.check_in}</b> to <b>{booking.check_out}</b></p>
                                    <h4>{booking.get_property_price.toLocaleString("en-GB", {style:"currency", currency:"GBP"})} x {booking.date_diff} days</h4>
                                     */}
                                    {/* <p>{booking.check_in}</p> */}
                                    {/* <p><strong> £{property.price}</strong></p> */}
                                    {/* <br></br>
                                    <h4>Guests: {booking.guests}</h4> 
                                    <h4>Total = {booking.get_total.toLocaleString("en-GB", {style:"currency", currency:"GBP"})}</h4>

                                    <button type="button"  style={{ margin: "1em"}}>Cancel Reservation</button>
                                    <hr></hr>
                                </div>
                            ))} 
                            </section> */}
                        </Fragment>
                    )}
                {/* </div> */}
            </main>
        )
    }
}