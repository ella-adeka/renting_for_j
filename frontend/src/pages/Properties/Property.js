import React, { Component, Fragment } from "react";
import {  Link, Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import MainNavigation from "../../components/MainNavigation";
import { withUrlParams } from "../../utils/urlParams";
// import {Box, TextField } from '@mui/material';
// import { DateRangePicker, DateRange } from "@mui/x-date-pickers";
// import { DateInput } from "semantic-ui-calendar-react";
// import moment from 'moment';
import format from "date-fns/format";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faHeart,
    faShare,
    faPlus,
    faMinus
} from '@fortawesome/free-solid-svg-icons';

// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";

class Property extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: '',
            property: [],
            propertyImagesList: [],
            isAuth: false,
            formShowing: true,
            check_in: '',
            check_out: '',
            guests: 0,
            booked: false,
            bookingList: [],
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showReservationForm = this.showReservationForm.bind(this);
    }

    componentDidMount(){
        this.showPropertyItem();

        // const prevLocation = useLocation()
        // history.push(`/login?redirectTo=${prevLocation}`)
        

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
                .then(data => {
                    this.setState({
                        user: data.id,
                    })
                });
        }

        this.checkIfBooked();
        this.noOfDays(this.state)
    }
    

    componentWillUnmount(){
        this.setState({
            check_in: '',
            check_out: '',
            guests: 0,
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        var checkInDate = format(this.state.check_in, "yyyy-MM-dd")
        var checkOutDate = format(this.state.check_out, "yyyy-MM-dd")
        const booking = {
            user: this.state.user,
            property: this.state.property.id,
            check_in: checkInDate,
            check_out: checkOutDate,
            guests: this.state.guests,
        };

        fetch('http://127.0.0.1:8000/api/bookings/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            body:JSON.stringify(booking)
            })
            .then((res) => res.json())
            .then(data => {
                if (data) {
                    this.setState({
                        booked: true
                    });
                    // localStorage.setItem('booked', true);
                    window.location.replace('http://127.0.0.1:8000/payment');
                } 
            })
            .catch((err) => console.log(err))
    }

    checkIfBooked = () => {
        // var user =  this.state.user;
        // console.log(user)

        axios
            .get(`/api/bookings/`)
            .then((res) => {
                this.setState({bookingList: res.data}) 
            })
            .then((data) => {
                if(data){
                    this.setState({
                        booked: true
                    });
                    // console.log(this.state.bookingList.id)
                    // console.log('yes')
                }
            })
            .catch((err) => console.log(err));  
    }

    async showPropertyItem(){
        // console.log(this.state.user)
        // axios
        //     .get('/api/properties')
        //     .then((res) => this.setState({ propertiesList: res.data }))
        //     .catch((err) => console.log(err))
        const  {id}  = this.props.params;
        const [ firstResponse, secondResponse ] = await Promise.all([
            axios.get('/api/properties/'+ id + '/'),
            axios.get('/api/propertyImages/')
        ])
        this.setState(
            {property: firstResponse.data,
            propertyImagesList: secondResponse.data}
        )
    }

    addGuest = () => {
        if(this.state.guests != this.state.property.max_guests){
            this.setState({
                guests: this.state.guests + 1
            })
        }
    }

    subtractGuest = () => {
        if(this.state.guests != 0){
            this.setState({
                guests: this.state.guests - 1
            })
        }
    }

    noOfDays(daysTotal){
        return (daysTotal.check_out - daysTotal.check_in) / (1000 * 3600 * 24);
    }

    totalPrice = () => {
        var thePrice = this.state.property.price;
        // thePrice.toLocaleString('en');
        // thePrice?.toLocaleString("en-GB", {style:"currency", currency:"GBP"})
        return thePrice*this.noOfDays(this.state);
    }


    showReservationForm = () => {
        this.setState(prevState => ({
            formShowing: !prevState.formShowing
        }));
    }
        
    render(){
        {/* USE SPREAD OPERATOR TO FILTER BY AMENITIES AVAILABLE */}
        const {  user,bookingList, booked, check_in,check_out, formShowing, guests, property, propertyImagesList, isAuth } = this.state;
        
        var theBooking = bookingList.filter((booking) => booking.user == user)
        // var theBooking = bookingList.filter((booking) => booking.user == user).map((booking) => (booking.reserved));
        // console.log(theBooking[0])

        const bookedAndBusy = localStorage.getItem('booked')
        // console.log(bookedAndBusy)
        return(
            <main>
                <MainNavigation/>

                {/* <FontAwesomeIcon icon="fa-thin fa-heart" /> */}
                <Link className="back_to_props" to={{ pathname: `/properties`}}>Back to Properties</Link>
                <div className="property_body">
                    <div key={property.id}>
                        {/* <h1>{property.title}<sup style={{ fontSize: "0.3em", marginTop: "0.5em", position: "absolute" }}><Link to={{ pathname: '/wishlist'}}><FontAwesomeIcon className="heart"  icon={faHeart} /></Link></sup></h1> */}
                        <h1>{property.title}</h1>
                        <div className="des_likes"> 
                            <p className="description">{property.location}, {property.city} </p>
                            <p>
                                <Link to={{ pathname: '/wishlist'}}><FontAwesomeIcon className="heart share" size="2x" icon={faShare} />Share</Link>
                                <Link to={{ pathname: '/wishlist'}}><FontAwesomeIcon className="heart" size="2x" icon={faHeart} />like</Link>
                            </p>
                        </div>
                        {/* <p className="description">{property.description}</p> */}

                        <div className="theprops_images">
                            <img className="property_image_div__property_image" src={property.image} alt={property.title}></img>
                            {property.property_images?.map((property_image, index) => (
                                <div key={index} className="property_images_div">
                                    <img  className="property_images_div__property_image"  src={property_image.images} alt={property.title} />
                                </div>
                            ))}
                        </div>

                        <div className="flexbox-wrapper">
                            <div className="regular">
                                {/* <p>{property.max_guests} guests{property.highlights?.map((highlights, index) => (
                                    <span key={index} style={{ padding: "0.5em"}}>{highlights}</span>
                                ))}</p> */}
                                {/* <br></br> */}
                                {/* <h2 style={{ fontFamily: "'Gilda Display', serif"}}>{property.price?.toLocaleString("en-GB", {style:"currency", currency:"GBP"})} <span style={{ fontSize: "0.3em"}}>per night</span></h2><br></br> */}
                                {/* <span>{property.is_available === true ? <p>Available</p> : <p>Unavailable</p> }</span> */}

                                {/* <p><strong>{property.type}</strong> in {property.city}</p> */}
                                {/* <p>Min: {property.min_days} nights</p><br></br> */}
                                {/* <h4>Highlights</h4> */}
                                <p><span style={{ fontFamily: "'Gilda Display', serif", fontSize: "3em"}}>{property.price?.toLocaleString("en-GB", {style:"currency", currency:"GBP"})}</span> <span><strike>£20.00</strike></span> {property.max_guests} guests{property.highlights?.map((highlights, index) => (
                                    <span key={index} style={{ padding: "0.5em"}}>{highlights}</span>
                                ))}</p>
                                <br></br>

                                <h3>key information</h3>
                                <p>Status: {property.is_available === true ? <span>Available</span> : <span>Unavailable</span> }</p>
                                <p>Type: {property.type}</p>
                                <p>City: {property.city}</p>
                                <p>Minimum: {property.min_days} nights</p>
                                <p>Pets: Not allowed</p>
                                
                                <h3>description</h3>
                                <p className="description">{property.description}</p>
                                <p>Show more</p>
                                

                                <h3>amenities</h3>
                                <Fragment>
                                    {/* ATTRACTIONS */}
                                    { property.attractions?.length == 0 ? (
                                        ''
                                    ) : (
                                        <div><h4>Atrractions</h4>  {property.attractions?.map((attractions, index) => (
                                            <span key={index}>{attractions}</span>
                                        ))}</div>
                                    )}

                                    {/* BATHROOM */}
                                    { property.bathroom?.length == 0 ? (
                                        ''
                                    ) : (
                                        <div><h4>Bathroom</h4>  {property.bathroom?.map((bathroom, index) => (
                                            <span key={index}>{bathroom}</span>
                                        ))}</div>
                                    )}

                                    {/* BEDROOM */}
                                    { property.bedroom?.length == 0 ? (
                                        ''
                                    ) : (
                                        <div><h4>Bedroom</h4>  {property.bedroom?.map((bedroom, index) => (
                                            <span key={index}>{bedroom}</span>
                                        ))}</div>
                                    )}

                                    {/* CLEANING */}
                                    { property.cleaning?.length == 0 ? (
                                        ''
                                    ) : (
                                        <div><h4>Cleaning</h4>  {property.cleaning?.map((cleaning, index) => (
                                            <span key={index}>{cleaning}</span>
                                        ))}</div>
                                    )}

                                    {/* ENTERTAINMENT */}
                                    { property.entertainment?.length == 0 ? (
                                        ''
                                    ) : (
                                        <div><h4>Entertainment</h4>  {property.entertainment?.map((entertainment, index) => (
                                            <li key={index}>{entertainment}</li>
                                        ))}</div>
                                    )}

                                    {/* FAMILY */}
                                    { property.family?.length == 0 ? (
                                        ''
                                    ) : (
                                        <div><h4>Family</h4>  {property.family?.map((family, index) => (
                                            <li key={index}>{family}</li>
                                        ))}</div>
                                    )}

                                    {/* FACILITIES */}
                                    { property.facilities?.length == 0 ? (
                                        ''
                                    ) : (
                                        <div><h4>Facilities</h4>  {property.facilities?.map((facilities, index) => (
                                            <li key={index}>{facilities}</li>
                                        ))}</div>
                                    )}

                                    {/* HEATING AND COOLING */}
                                    { property.heating_and_cooling?.length == 0 ? (
                                        ''
                                    ) : (
                                        <div><h4>Heating and Cooling</h4>  {property.heating_and_cooling?.map((heating_and_cooling, index) => (
                                            <li key={index}>{heating_and_cooling}</li>
                                        ))}</div>
                                    )}
                                        
                                    {/* INTERNET AND OFFICE */}
                                    { property.internet_and_office?.length == 0 ? (
                                        ''
                                    ) : (
                                        <div><h4>Internet And Office</h4>  {property.internet_and_office?.map((internet_and_office, index) => (
                                            <li key={index}>{internet_and_office}</li>
                                        ))}</div>
                                    )}
                                
                                    {/* KITCHEN AND DINING */}
                                    { property.kitchen_and_dining?.length == 0 ? (
                                        ''
                                    ) : (
                                        <div><h4>Kitchen and Dining</h4>  {property.kitchen_and_dining?.map((kitchen_and_dining, index) => (
                                            <li key={index}>{kitchen_and_dining}</li>
                                        ))}</div>
                                    )}

                                    {/* Outdoors */}
                                    { property.outdoors?.length == 0 ? (
                                        ''
                                    ) : (
                                        <div><h4>Outdoors</h4>  {property.outdoors?.map((outdoors, index) => (
                                            <li key={index}>{outdoors}</li>
                                        ))}</div>
                                    )}

                                    {/* PARKING */}
                                    { property.parking?.length == 0 ? (
                                        ''
                                    ) : (
                                        <div><h4>Parking</h4>  {property.parking?.map((parking, index) => (
                                            <li key={index}>{parking}</li>
                                        ))}</div>
                                    )}

                                    {/* SAFETY */}
                                    { property.safety?.length == 0 ? (
                                        ''
                                    ) : (
                                        <div><h4>Safety</h4>  {property.safety?.map((safety, index) => (
                                            <li key={index}>{safety}</li>
                                        ))}</div>
                                    )}

                                    {/* SERVICES */}
                                    { property.services?.length == 0 ? (
                                        ''
                                    ) : (
                                        <div><h4>Services</h4>  {property.services?.map((services, index) => (
                                            <li key={index}>{services}</li>
                                        ))}</div>
                                    )}
                                </Fragment>
                                
                                
                            
                                <br></br>

                                <h3>on the inside</h3>
                                <p>I'll put highlight pics here</p>
                                <p>{property.description}</p>
                                
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613507864!3d-6.194741395493371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b45e67356080477!2sPT%20Kulkul%20Teknologi%20Internasional!5e0!3m2!1sen!2sid!4v1601138221085!5m2!1sen!2sid"
                                    width="100%"
                                    height="450"
                                    frameBorder="0"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    aria-hidden="false"
                                    tabIndex="0"
                                    />
                            
                            </div>
                            
                            <Fragment>
                                <form className="booking_form" onSubmit={this.handleSubmit}>
                                    <div className="booking_form__div">
                                        <div className="booking_form__div__div">
                                            <label htmlFor="checkin">Checkin</label><br></br>
                                            <DatePicker
                                                selected={check_in}
                                                onChange={(date) => { this.setState({check_in: date}) }}
                                                dateFormat="yyyy-MM-dd"
                                                selectsStart
                                                check_in={check_in}
                                                endDate={check_out}
                                                minDate={new Date()}
                                                placeholderText="YYYY-MM-DD"
                                                type="date"
                                                value={check_in}
                                                name="check_in"
                                                autoComplete="off"
                                                className="booking_form__div__div__input" 
                                            />
                                        </div>
                                        
                                        <div className="booking_form__div__div">
                                            <label htmlFor="checkout" >Checkout</label><br></br>
                                            <DatePicker
                                                selected={check_out}
                                                onChange={(date) => this.setState({check_out: date})}
                                                dateFormat="yyyy-MM-dd"
                                                selectsEnd
                                                check_in={check_in}
                                                check_out={check_out}
                                                minDate={check_in}
                                                placeholderText="YYYY-MM-DD"
                                                type="date"
                                                value={check_out}
                                                name="check_out"
                                                autoComplete="off"
                                                className="booking_form__div__div__input" 
                                            />
                                        </div>
                                    </div>
                                    
                                    

                                    <div className="guests">
                                        <p>Guests</p>
                                        
                                        {/* <input type="button" onClick={this.subtractGuest}  value="Remove" /> */}
                                        <span style={{ textAlign: "left", cursor: "pointer"}}><FontAwesomeIcon icon={faMinus} onClick={this.subtractGuest} /></span>
                                        <span style={{ textAlign: "center"}} onChange={this.handleChange} >{guests}</span>
                                        <span style={{ textAlign: "right", cursor: "pointer"}}><FontAwesomeIcon icon={faPlus} max={property.max_guests} onClick={this.addGuest} /></span>
                                        {/* <input type="button" max={property.max_guests}  onClick={this.addGuest} value="Add" /> */}
                                        
                                    </div>

                                    {
                                        this.noOfDays(this.state) === 0 ? (
                                            ''
                                        ) : (
                                            <Fragment>
                                                {/* <h4>Days </h4> */}
                                                <p>{property.price.toLocaleString("en-GB", {style:"currency", currency:"GBP"})} x {this.noOfDays(this.state)} nights</p>
                                            </Fragment>
                                        )
                                    }

                                    {/* <br></br> */}

                                    {/* <h4>Subtotal </h4> */}
                                    {/* <p>{this.totalPrice()}</p> */}
                                    {/* <p>{this.totalPrice()?.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p> */}

                                    <h4>Service fee/Tax </h4>
                                    <p>£20.00</p>

                                    <h4 style={{ fontFamily: "'Gilda Display', serif", fontSize: "2em"}}>{this.totalPrice()?.toLocaleString("en-GB", {style:"currency", currency:"GBP"})}</h4>
                                    <br></br>
                                    
                                    
                                    {
                                        isAuth ?  (
                                            <Fragment>
                                                {/* <button type="submit" className="booking_form__button" >Reserve</button> */}
                                                {!check_out ? (
                                                    <button type="submit" className="booking_form__button" >Check availability</button>
                                                    ) : (
                                                        <button type="submit" className="booking_form__button" >Reserve</button>
                                                )}
                                                
                                                {/* <button type="submit" className="booking_form__button" >Check availability</button> */}
                                                {
                                                    theBooking.length != 0 && (
                                                        <div>
                                                            <Link to={{ pathname: `/payment` }}><button className="booking_form__button without">Go to Reservations</button></Link>
                                                        </div>
                                                    ) 
                                                }
                                            </Fragment>
                                        ) : (
                                            <Fragment>
                                                <Link to={{ pathname: `/login` }}><button className="booking_form__button" style={{marginBottom: "2em"}}>Login</button></Link>
                                                {/* <br></br> */}
                                            </Fragment>
                                        )
                                    }
                                    {/* <br></br> */}
                                    <br></br>
                                    <span>*Your reservation will not be set in stone till you pay</span>


                                
                        
                                </form>                   
                            </Fragment>
                            
                        </div>
                        
                        {/* <br></br>
                        <br></br> */}
                        <h3>location</h3>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613507864!3d-6.194741395493371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b45e67356080477!2sPT%20Kulkul%20Teknologi%20Internasional!5e0!3m2!1sen!2sid!4v1601138221085!5m2!1sen!2sid"
                                    width="100%"
                                    height="450"
                                    frameBorder="0"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    aria-hidden="false"
                                    tabIndex="0"
                                    />
                                     
                        <h3>reviews</h3> 
                    </div>
                </div>
            </main>
        )
    }
}

export default withUrlParams(Property)

// Property Form
// Check-in Date
// Check-out Date
// apt type: 1Bed, 1 Bedroom, 2bed
// No of guests (add maximum)

// details
// Purpose of travel:leisure, business
// first name
// last name
// Country code
// Phone number
// email

// Please tick this box to confirm that you've read our Privacy Policy and Client Terms & Conditions
// Please tick this box if you'd like to receive updates from us. Don't worry it's not often

