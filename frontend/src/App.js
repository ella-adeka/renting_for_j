import React, { Component } from "react";
import  ReactDOM from "react-dom/client";
import reportWebVitals from './reportWebVitals';
import {  BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "./layout/Layout";
import ErrorPage from "./pages/404";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
// City-related
import City from "./pages/Cities/City";
import Cities from "./pages/Cities/Cities";
// Property-related
import Amenities from "./pages/Amenities";
import Property from "./pages/properties/Property";
import Properties from "./pages/properties/Properties";
// Registration
import Login from "./pages/Registration/Account/Login";
import Signup from "./pages/Registration/Account/Signup";
// Profile
import UserAccount from "./pages/Users/UserAccount";
// import Logout from "./pages/Registration/Logout";
// Admin
import Admin from "./pages/Admin/Admin";
import DeactivateUserAccount from "./pages/Users/DeactivateUserAccount";
import PasswordReset from "./pages/Registration/Password/PasswordReset";
import PasswordResetConfirm from "./pages/Registration/Password/PasswordResetConfirm";
import PasswordChange from "./pages/Registration/Password/PasswordChange";
import Payment from "./pages/Reservation/Payment";
import CancelReservation from "./pages/Reservation/CancelReservation";
import PaymentConfirmation from "./pages/Reservation/PaymentConfirmation";
import UserProfile from "./pages/Users/UserProfile";
import UserPersonalInfo from "./pages/Users/UserPersonalInfo";
import Wishlist from "./pages/Users/Wishlist";



export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div>
                {/* <Layout>
                            
                </Layout> */}
    
                <Router>
                    
                    <Routes>
                        <Route exact path="/loose/admin" element={<Admin />}></Route>
                        
                        <Route exact path="/payment/" element={<Payment />}></Route>
                        <Route exact path="/payment/confirmation" element={<PaymentConfirmation />}></Route>
                        <Route exact path="/cancel-reservation/" element={<CancelReservation />}></Route>
    
                        {/* <Route exact path="/logout" element={<Logout/>}></Route> */}
                        <Route exact path="/login" element={<Login />}></Route>
                        <Route exact path="/signup" element={<Signup />}></Route>
                        <Route exact path="/user/password-change" element={<PasswordChange />}></Route>
                        <Route exact path="/user/password-reset" element={<PasswordReset />}></Route>
                        <Route exact path="/user/password-reset-confirm" element={<PasswordResetConfirm />}></Route>
    
                        <Route exact path="/wishlist" element={<Wishlist />}></Route>
                        <Route exact path="/user/account" element={<UserAccount />}></Route>
                        <Route exact path="/user/profile" element={<UserProfile />}></Route>
                        <Route exact path="/user/personal-info" element={<UserPersonalInfo />}></Route>
                        <Route path="/user/deactivate" element={<DeactivateUserAccount />}></Route>
    
                        <Route exact path="/cities" element={<Cities />}></Route>
                        <Route path="/cities/:slug" element={<City />}></Route>
                        <Route exact path="/amenities" element={<Amenities />}></Route>
                        <Route exact path="/properties" element={<Properties />}></Route>
                        <Route path="/properties/:slug/:id" element={<Property />}></Route>
                        <Route exact path="/contact-us" element={<Contact />}></Route>
                        <Route exact path="/about-us" element={<About />}></Route>
                        <Route exact path="/" element={<Home />}></Route>
    
                        <Route path="*" element={<ErrorPage />}></Route>
                        {/* <Navigate to='/404'/> */}
                    </Routes>
                </Router>
            </div>
        );
    }
}

const appDiv = ReactDOM.createRoot(document.getElementById("app"));
appDiv.render(
    <React.StrictMode>
         <App/>
    </React.StrictMode>
);
reportWebVitals();

// import React from "react";
// import  ReactDOM  from "react-dom";
// import * as ReactDOMClient from "react-dom/client";
// // import reportWebVitals from "./reportWebVitals";
// import App from "./components/App";
// // import React from "react";


// const appDiv = ReactDOMClient.createRoot(document.getElementById("app"));
// appDiv.render(
//     <React.StrictMode>
//         <App/>
//     </React.StrictMode>
// );

// // reportWebVitals();