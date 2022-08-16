import React, { Component, Fragment } from "react";
import axios from 'axios';
import { withUrlParams } from "../../utils/urlParams";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


class Payment extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: '',
            email: '',
            first_name: '',
            last_name: '',
            isAuth: false,
            loading: true,
            property: [],
            // price: parseFloat('').toFixed(2), 
            // nights: parseInt(''),
            booking: []
        }
    }

    componentDidMount(){
        if (localStorage.getItem('token') === null) {
            window.location.replace('http://127.0.0.1:8000/login');
        } else {
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
                    user: data.pk,
                    email: data.email,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    loading: false
                })
            });
        }

        // const now = new Date();
        // const dateString = now.toLocaleDateString({
        // weekday: "short",
        // year: "numeric",
        // month: "2-digit",
        // day: "numeric"
        // })

        // console.log(dateString);

        this.showPropertyToPay();
    }

    async showPropertyToPay()  {
        // const  {user_id, property_id}  = this.props.params;
        const { id } = this.state;



        const [ firstResponse, secondResponse ] = await Promise.all([
            axios.get('/api/bookings/'+ this.state.user),
            axios.get('/api/properties/')
        ])
        this.setState(
            {booking: firstResponse.data,
            property: secondResponse.data}
        )
    }

    handleCancellation = () => {
        // event.preventDefault();
        const { booking, user } = this.state;
        var theBooking = booking.filter((booking) => booking.user == user).map((booking) => (booking.id));

        axios
            .delete('/airbnb/booking/detail/' + theBooking[0])
            .then(() => {console.log("Deleted successfully")})
            .then(() => {
                window.location.replace('http://127.0.0.1:8000/')
            })
            .catch((err) => console.log(err))

        console.log(theBooking[0])
        console.log("asddf")
    }


    totalPrice = () => {
        const { booking, property } = this.state;
        return parseFloat( property.price * booking.date_diff ).toFixed(2);
    }

    

    

    
    render(){
        const { booking, email, first_name, last_name, loading,  user, property } = this.state;
        const options =  { weekday: "short",  year: "numeric", month: "long", day: "numeric" } // others: weekday: "short", year: "numeric", month: "long", day: "numeric"
        
        const price = booking.filter((booking) => booking.user == user).map((booking) => (booking.get_property_price))
        console.log(price[0])

        const initialOptions = {
            "client-id": "test",
            currency: "GBP",
        };
        
        console.log(property.title)
        
        return(
            <div>
                { loading === false && (
                    <Fragment>
                        {booking.id}
                        {/* {booking.property} */}
                        <h1>Reservation</h1>

                        <div className="payment">
                            <div className="payment__div">
                                <div>
                                    <h2>Personal Info </h2>
                                    <h4>Name</h4>
                                    <p>{first_name} {last_name}</p>
                                    <p>{email}</p>
                                </div>

                                <div>
                                <h2>Reservation Details</h2>
                                    {/* <p>You are about to pay for:</p> */}
                                    {booking.filter((booking) => booking.user == user).map((booking,  index) => (
                                        
                                        <div key={index}>
                                            <h1>{booking.property_id}</h1>
                                            <h3>{booking.get_property_title} in {property.filter((property) =>  property.id == booking.property).map((property,  index) => (
                                                <span key={index}>
                                                    {property.city}
                                                </span>
                                            ))}
                                            </h3>
                                            <img src={booking.get_property_image} alt={booking.get_property_title} width="100%" height="auto" style={{ objectFit: "contain", borderRadius: "10px"}}></img>

                                            <h4>Check-in/out</h4>
                                            <p><b>{new Date(booking.check_in).toLocaleDateString( 'en-GB', options)}</b> to <b>{new Date(booking.check_out).toLocaleDateString( 'en-GB', options)}</b></p>
                                            {/* <p><b>{new Date(booking.check_in).toLocaleDateString( 'en-GB', { weekday: "short", year: "numeric", month: "long", day: "numeric" })}</b> to <b>{new Date(booking.check_out).toLocaleDateString( 'en-GB', { weekday: "short", year: "numeric", month: "long", day: "numeric" })}</b></p> */}
                                            {/* <p><b>{booking.check_in }</b> to <b>{booking.check_out}</b></p> */}
                                            

                                            <br></br>
                                            <h4>Guests: {booking.guests}</h4> 
                                            <br></br>

                                            {/* <h4>{booking.get_property_price.toLocaleString("en-GB", {style:"currency", currency:"GBP"})} x {booking.date_diff} days</h4>
                                            <h4>Total = {booking.get_total.toLocaleString("en-GB", {style:"currency", currency:"GBP"})}</h4> */}

                                            {/* <button type="button"  style={{ margin: "1em"}}>Cancel Reservation</button> */}
                                        </div>
                                    ))} 
                                </div>

                                
                            </div>

                            <div className="payment__div">
                                <div>
                                    <h2>Price details </h2>
                                    {booking.filter((booking) => booking.user == user).map((booking,  index) => (
                                        
                                        <div key={index}>
                                        

                                            <h4>{booking.get_property_price.toLocaleString("en-GB", {style:"currency", currency:"GBP"})} x {booking.date_diff} nights</h4>
                                            <h4>Total : {booking.get_total.toLocaleString("en-GB", {style:"currency", currency:"GBP"})}</h4>

                                            {/* <button type="button"  style={{ margin: "1em"}}>Cancel Reservation</button> */}
                                        </div>
                                    ))} 
                                </div>

                                <div>
                                    <h2>Payment</h2>
                                    <br></br>
                                        {/* <PayPalScriptProvider options={{ "client-id": "test" }}> */}
                                    <div style={{ position: "relative", zIndex: 0 }}>
                                        <PayPalScriptProvider options={initialOptions}>
                                        <PayPalButtons style={{ layout: "vertical", color: 'silver', shape: 'rect' }}
                                            createOrder={( data, actions ) => {
                                                return actions.order.create({
                                                    purchase_units: [
                                                        {
                                                            amount: {
                                                                value: price[0]
                                                            }
                                                        }
                                                    ],
                                                    'application_context' : {
                                                        'shipping_preference': 'NO_SHIPPING',
                                                        'postcode_preference': 'NO_POSTCODE'
                                                    }
                                                    
                                                })
                                            }}
                                        />
                                        {/* <PayPalButtons style={{ layout: "horizontal" }} /> */}
                                        </PayPalScriptProvider>
                                    </div>
                                </div>

                                <div>
                                    {/* <Link to={{ pathname: `/payment/confirmation` }}><button style={{marginBottom: "2em"}} className="booking_form__button">Pay & Confirm Reservation</button></Link><br></br> */}
                                    <button className="payment__div__button without" style={{marginBottom: "2em"}} onClick={this.handleCancellation}>Cancel Reservation</button>
                                </div>
                            </div>
                        </div>
                        
                        {/* <Link to={{ pathname: `/cancel-reservation` }} onClick={this.handleCancellation}><button style={{marginBottom: "2em"}}>Cancel Reservation</button></Link> */}
                    </Fragment>
                )}
            </div>
        )
    }
}

export default withUrlParams(Payment)