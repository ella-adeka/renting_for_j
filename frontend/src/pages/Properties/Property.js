import React, { Component, Fragment } from "react";
import {  Link, Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { withUrlParams } from "../../utils/urlParams";
// import {Box, TextField } from '@mui/material';
// import { DateRangePicker, DateRange } from "@mui/x-date-pickers";
// import { DateInput } from "semantic-ui-calendar-react";
// import moment from 'moment';
// import format from "date-fns/format";
import { format,parse, formatDistance, formatRelative, subDays, addDays, parseISO } from 'date-fns'
import Moment from "moment"
import {extendMoment} from "moment-range"

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faHeart,
    faShareAlt,
    faPlus,
    faMinus,
    faBathtub,
    faBed,
    faUser,
    faMapMarkerAlt
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
        return Math.ceil((daysTotal.check_out - daysTotal.check_in) / (1000 * 3600 * 24));
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

        // const range = moment.range(moment(booking.check_in), moment(booking.check_out));

        const moment = extendMoment(Moment);
        let bookedDates = [];
        bookingList.forEach((booking) => {
            const start = moment(booking.check_in)._i;
            const end = moment(booking.check_out)._i;
            const range = moment.range(start, end);

            // //The Array.from() static method creates a new, shallow-copied Array instance from an array-like or iterable object.
            let dates = Array.from(range.by("day")).map(m => m.format('MM/DD/YYYY'));

            for (var i of dates) {
                bookedDates.push(i);
            }
        })
        

        const excludedDates = [];
            bookedDates.forEach((date) => {
                excludedDates.push(moment(new Date(date).toDateString())._d);
        });
          
        return(
            <main>
                {/* <MainNavigation/> */}

                {/* <FontAwesomeIcon icon="fa-thin fa-heart" /> */}
                <Link className="back_to_props" to={{ pathname: `/properties`}}>Back to Properties</Link>
                <div className="property_body">
                    <div key={property.id}>
                        {/* <h1>{property.title}<sup style={{ fontSize: "0.3em", marginTop: "0.5em", position: "absolute" }}><Link to={{ pathname: '/wishlist'}}><FontAwesomeIcon className="heart"  icon={faHeart} /></Link></sup></h1> */}
                        <h1>{property.title}</h1>
                        <div className="des_likes"> 
                            <p className="description"><FontAwesomeIcon className="heart share" size="1x" icon={faMapMarkerAlt} style={{color:"rgba(255, 255, 255, 0.19)"}} /> {property.location}, {property.city} </p>
                            <p  className="share_like">
                                <Link to={{ pathname: '/wishlist'}}><FontAwesomeIcon className="icon one" size="1x" icon={faHeart} style={{ marginRight: "0.5em" }} /> Save</Link>
                                <Link to={{ pathname: '/wishlist'}}><FontAwesomeIcon className="icon two" size="1x" icon={faShareAlt} style={{ marginRight: "0.5em"}}  />Share</Link>
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
                                <div className="highlights" >
                                    <div className="highlights__highlight" style={{ paddingLeft: "0"}}>
                                        <p >PER NIGHT</p>
                                        <span style={{ fontFamily: "'Gilda Display', serif", fontSize: "2.5em"}}>{property.price?.toLocaleString("en-GB", {style:"currency", currency:"GBP"})}</span><strike style={{fontSize: "0.8em", opacity: "0.4"}}>£20.00</strike>
                                    </div>
                                    <div className="highlights__highlight">
                                        <p>GUESTS</p>
                                        <div><FontAwesomeIcon style={{fontSize: "23px", marginRight: "-5px"}} icon={faUser} /> {property.max_guests}</div>
                                    </div>
                                    <div className="highlights__highlight">
                                        <p>BATH</p>
                                        <div><FontAwesomeIcon style={{fontSize: "23px", marginRight: "-5px"}} icon={faBathtub} /> <sub>{property.bath}</sub></div>
                                        {/* {property.highlights?.map((highlights, index) => (
                                            <span key={index} style={{ padding: "0.5em"}}>{highlights}</span>
                                        ))} */}
                                    </div>
                                    <div className="highlights__highlight">
                                        <p>BEDS</p>
                                        <div><FontAwesomeIcon style={{fontSize: "23px", marginRight: "-5px"}} icon={faBed} /> <sup>{property.bed}</sup></div>
                                        {/* {property.highlights?.map((highlights, index) => (
                                            <span key={index} style={{ padding: "0.5em"}}>{highlights}</span>
                                        ))} */}
                                    </div>
                                    <div className="highlights__highlight">
                                        <p>BEDROOM</p>
                                        <div><FontAwesomeIcon style={{fontSize: "23px", marginRight: "-5px"}} icon={faBed} /> <sup>{property.bedroom}</sup></div>
                                        {/* {property.highlights?.map((highlights, index) => (
                                            <span key={index} style={{ padding: "0.5em"}}>{highlights}</span>
                                        ))} */}
                                    </div>
                                    
                                    
                                </div>
                                <br></br>

                                <h3 style={{ marginTop: "0.8em"}}>key information</h3>
                                <div className="key_info">
                                    <div className="key_info__div">
                                        <p>Status:</p>
                                        {property.is_available ? <p>Available</p> : <p>Unavailable</p> }
                                    </div>
                                    <div className="key_info__div">
                                        <p>Type:</p>
                                        <p>{property.type}</p>
                                    </div>
                                    <div className="key_info__div">
                                        <p>City:</p>
                                        <p>{property.city}</p>
                                    </div>
                                    <div className="key_info__div">
                                        <p>Minimum:</p>
                                        <p>{property.min_days} nights</p>
                                    </div>
                                    <div className="key_info__div">
                                        <p>Pets:</p>
                                        <p>Not allowed</p>
                                    </div>
                                </div>
                                
                                <h3>description</h3>
                                <p className="description">{property.description}</p>
                                

                                <h3>amenities</h3>
                                {property.amenity?.map((amenities, index) => (
                                    <li key={index} style={{ padding: "0.5em", listStyleType: "circle"}}>{amenities}</li>
                                ))}


                                <h3>House Rules</h3>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
                                     text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                                     It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                                     It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing 
                                     software like Aldus PageMaker including versions of Lorem Ipsum.</p>

                                {/* <DatePicker
                                    selected={check_in}
                                    onChange={(date) => { this.setState({check_in: date}) }}
                                    //   excludeDates={excludedDates}
                                    inline
                                    monthsShown={2}
                                    selectsStart
                                    minDate={subDays(new Date(), 0)}
                                /> */}

                                <h3>on the inside</h3>
                                {property.property_images?.map((property_image, index) => (
                                <div key={index} className="inside_images_div">
                                    <img  className="inside_images_div__inside_image"  src={property_image.images} alt={property.title} />
                                </div>
                            ))}



                                
                                {/* <h3>location</h3>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613507864!3d-6.194741395493371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b45e67356080477!2sPT%20Kulkul%20Teknologi%20Internasional!5e0!3m2!1sen!2sid!4v1601138221085!5m2!1sen!2sid"
                                    width="100%"
                                    height="450"
                                    frameBorder="0"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    aria-hidden="false"
                                    tabIndex="0"
                                    /> */}
                            
                            </div>
                            
                            <Fragment>
                                <form className="booking_form" onSubmit={this.handleSubmit}>
                                <h3>Your Reservation</h3>
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
                                                minDate={subDays(new Date(), 0)}
                                                excludeDates={excludedDates}
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
                                                // minDate={addDays(new Date(), 1)}
                                                minDate={check_in}
                                                startDate={check_in}
                                                // maxDate={addDays(check_in, property.min_days)}
                                                // minDate={new Date(check_in)}
                                                // minDate={addDays(check_in, property.min_days)}

                                                // shouldCloseOnSelect={false}
                                                excludeDates={excludedDates}
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

                                    {/* {
                                        this.noOfDays(this.state) === 0 ? (
                                            ''
                                        ) : ( */}
                                            <Fragment>
                                                {/* <h4>Days </h4> */}
                                                <p className="sub-total"><span>{property.price?.toLocaleString("en-GB", {style:"currency", currency:"GBP"})} x {
                                                    !check_out ? (0) : (<Fragment>{this.noOfDays(this.state)}</Fragment>)
                                                } nights</span>  { !check_out ? (<span style={{ fontFamily: "'Gilda Display', serif", fontSize: "1.5em" }}>£0.00</span>) : (<span style={{ fontFamily: "'Gilda Display', serif", fontSize: "1.5em" }}>{this.totalPrice()?.toLocaleString("en-GB", {style:"currency", currency:"GBP" })}</span>) }</p>
                                                {/* } nights</span>  <span style={{ fontFamily: "'Gilda Display', serif", fontSize: "1.5em" }}>{this.totalPrice()?.toLocaleString("en-GB", {style:"currency", currency:"GBP",  minimumFractionDigits: 0})}</span></p> */}
                                            </Fragment>
                                        {/* ) */}
                                    {/* } */}

                                    {/* <br></br> */}

                                    {/* <h4>Subtotal </h4> */}
                                    {/* <p>{this.totalPrice()}</p> */}
                                    {/* <p>{this.totalPrice()?.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p> */}
                                    
                                    <p className="sub-total"><span style={{ fontSize: "1em" }}>Service charges/Tax</span>  <span style={{ fontSize: "1.5em" }}>{20?.toLocaleString("en-GB", {style:"currency", currency:"GBP" })}</span></p>

                                    <p className="sub-total"><span style={{ fontSize: "1.5em", marginTop: "1.5em" }}>Total</span>  {!check_out ? (<span style={{ fontSize: "1.5em" }}>£0.00</span>) : (<span style={{ fontSize: "1.5em" }}>{this.totalPrice()?.toLocaleString("en-GB", {style:"currency", currency:"GBP" })}</span>)}</p>

                            

                                    {/* <h4 style={{ fontFamily: "'Gilda Display', serif", fontSize: "2em"}}>{this.totalPrice()?.toLocaleString("en-GB", {style:"currency", currency:"GBP"})}</h4> */}
                                    <br></br>
                                    
                                    
                                    {
                                        isAuth ?  (
                                            <Fragment>
                                                {/* <button type="submit" className="booking_form__button" >Reserve</button> */}
                                                {!check_out ? (
                                                    <Fragment>
                                                        {property.is_available ? (<button type="button" className="booking_form__button" >Check availability</button>): (<button type="button" className="booking_form__button" style={{ background: "gray", color: "white", cursor: "not-allowed"}}>Unavailable</button>)}
                                                        <br></br>
                                                    </Fragment>
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
                                                {property.is_available ? (<Link to={{ pathname: `/login` }}><button className="booking_form__button" style={{marginBottom: "2em"}}>Login</button></Link>): (<button type="button" className="booking_form__button" style={{ background: "gray", color: "white", cursor: "not-allowed", marginBottom: "1em"}}>Unavailable</button>)}
                                            </Fragment>
                                        )
                                    }
                                    {/* <br></br> */}
                                    <br></br>
                                    <p style={{textAlign: "center", }}>*You won't be charged yet</p>


                                
                        
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

