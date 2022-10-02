import React, { Component, Fragment, useContext } from "react";
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
    faMapMarkerAlt,
    faTimes,
    faX
} from '@fortawesome/free-solid-svg-icons';
import WishlistContext from "../../utils/context/wishlistContext";
import MainNavigation from "../../components/Navigation/MainNavigation";
import { th } from "date-fns/locale";



// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";

class Property extends Component {
    static contextType = WishlistContext;

    constructor(props){
        super(props);
        this.state = {
            user: '',
            property: [],
            propertyImagesList: [],
            isAuth: false,
            formShowing: false,
            check_in: '',
            check_out: '',
            guests: 0,
            booked: false,
            bookingList: [],
            saved: true
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showReservationForm = this.showReservationForm.bind(this);
        // this.savedOrNot = this.savedOrNot.bind(this);
    }

    componentDidMount(){
        this.showPropertyItem();

        // const prevLocation = useLocation()
        // history.push(`/login?redirectTo=${prevLocation}`)
        

        if (localStorage.getItem('token') !== null) {
            this.setState({
                isAuth: true,
            });
            fetch('http://127.0.0.1:8000/api/v1/users/user', {
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
        console.log(booking)

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
                    // window.location.replace('http://127.0.0.1:8000/payment');
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

    savedOrNot = () => {
        this.setState(prevState => ({
            saved: !prevState.saved
        }));
    }


        
    render(){
        var items = JSON.parse(localStorage.getItem("wishlist") || "[]");
        
        window.addEventListener('load', () => { initializeAutocomplete(); });
        {/* USE SPREAD OPERATOR TO FILTER BY AMENITIES AVAILABLE */}
        const {  saved, user,bookingList, booked, check_in,check_out, formShowing, guests, property, propertyImagesList, isAuth } = this.state;
        const { addToWishlist, removeFromWishlist} = this.context;
        // const {items, addToWishlist, removeFromWishlist} = this.context;

        var theBooking = bookingList.filter((booking) => booking.user == user)
        // var theBooking = bookingList.filter((booking) => booking.user == user).map((booking) => (booking.reserved));
        // console.log(theBooking[0])

        const bookedAndBusy = localStorage.getItem('booked')

        const id = property.id;
        const bath = property.bath;
        const bed = property.bed;
        const bedroom = property.bedroom;
        const city = property.city;
        const image = property.image;
        const max_guests = property.max_guests;
        const title = property.title;
        const type = property.type;
        const price = property.price;
        const slug = property.slug;
        // id, bath, bed, bedroom, city, image,  max_guests, title, type, price, slug
        // console.log(title, price)
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

        const propertyInWishlist = items.some(element => {
            if (element.id === property.id) {
              return true;
            }
          
        
            return false;
        });


          
        return(
            <main>
                <MainNavigation/>

                {/* <FontAwesomeIcon icon="fa-thin fa-heart" /> */}
                
                <Link className="back_to_props" to={{ pathname: `/properties`}}>
                    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 176.51 43.63" style={{ width: "9em"}}><defs></defs><line style={{fill:"none", strokeMiterLimit:10 }} className="cls-1" x1="0.1" y1="22.19" x2="176.51" y2="22.19"/><path d="M230.15,209.89a28.33,28.33,0,0,0,7.52-3,30.08,30.08,0,0,0,6.39-5,33.41,33.41,0,0,0,8.07-13.8l2.2.89a55.22,55.22,0,0,1-4.42,7.1,43.15,43.15,0,0,1-5.51,6.17,39.21,39.21,0,0,1-6.59,4.89,42.12,42.12,0,0,1-7.46,3.46Z" transform="translate(-230.15 -188.04)"/><path d="M230.3,209.88a34.86,34.86,0,0,1,8.06,2.49,28.15,28.15,0,0,1,7.08,4.55,31.86,31.86,0,0,1,5.54,6.43,43.81,43.81,0,0,1,4,7.63l-2.27.69a28.58,28.58,0,0,0-2.69-7.74,25.46,25.46,0,0,0-4.89-6.64,23.48,23.48,0,0,0-6.85-4.68,25.25,25.25,0,0,0-8.05-2Z" transform="translate(-230.15 -188.04)"/></svg>
                </Link>
                <div className="property_body">
                    <div key={property.id}>
                        {/* <h1>{property.title}<sup style={{ fontSize: "0.3em", marginTop: "0.5em", position: "absolute" }}><Link to={{ pathname: '/wishlist'}}><FontAwesomeIcon className="heart"  icon={faHeart} /></Link></sup></h1> */}
                        <div className="the_head">
                            <h1 className="property_title">{property.title}</h1>
                            <div className="des_likes"> 
                                <p className="description"><FontAwesomeIcon className="heart share" size="1x" icon={faMapMarkerAlt} style={{opacity:"0.3"}} /> {property.location}, {property.city} </p>
                                <p  className="share_like">
                                    {/* { propertyInWishlist  ? <span onClick={() => {removeFromWishlist(property.id)}}><FontAwesomeIcon className="icon one" size="1x" icon={faHeart} style={{ marginRight: "0.5em",color: "rgb(251, 70, 100)" }} />Saved!</span> : <span onClick={() => addToWishlist(id, bath, bed, bedroom, city, image,  max_guests, title, type, price, slug)}><FontAwesomeIcon className="icon one" size="1x" icon={faHeart} style={{ marginRight: "0.5em" }}  />Save</span> } */}
                                    { propertyInWishlist  ? <span onClick={() => {removeFromWishlist(property.id)}}><FontAwesomeIcon className="icon one" size="1x" icon={faHeart} style={{ marginRight: "0.5em",color: "rgb(251, 70, 100)" }} />Saved!</span> : <span onClick={() => addToWishlist(id, bath, bed, bedroom, city, image,  max_guests, title, type, price, slug)}><FontAwesomeIcon className="icon one" size="1x" icon={faHeart} style={{ marginRight: "0.5em" }}  />Save</span> }
                                    {/* { propertyInWishlist  ? <span onClick={() => {removeFromWishlist(property.id)}}><FontAwesomeIcon className="icon one" size="1x" icon={faHeart} style={{ marginRight: "0.5em",color: "rgb(251, 70, 100)" }} />Saved!</span> : <span onClick={() => addToWishlist(id)}><FontAwesomeIcon className="icon one" size="1x" icon={faHeart} style={{ marginRight: "0.5em" }}  />Save</span> } */}
                                    {/* <span  onClick={() => {addToWishlist(id, bath, bed, bedroom, city, image,  max_guests, title, type, price, slug)}}><FontAwesomeIcon className="icon one" size="1x" icon={faHeart} style={propertyInWishlist ? { marginRight: "0.5em", color: "rgb(251, 70, 100)" } : { marginRight: "0.5em",  }}  />{!propertyInWishlist ? "Save" : "Saved!"}</span> */}
                                    <span><FontAwesomeIcon className="icon two" size="1x" icon={faShareAlt} style={{ marginRight: "0.5em"}}  />Share</span>
                                </p>
                            </div>
                        </div>
                        {/* <p className="description">{property.description}</p> */}

                        <div className="theprops_images">
                            <div className="property_image_div">
                                <img className="property_image_div__property_image" src={property.image} alt={property.title}></img>
                            </div>
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
                                        <span style={{ fontFamily: "'Gilda Display', serif", fontSize: "2.5em"}}>{property.price?.toLocaleString("en-GB", {style:"currency", currency:"GBP"})}</span><strike style={{fontSize: "0.8em", opacity: "0.4"}}>{property.discount?.toLocaleString("en-GB", {style:"currency", currency:"GBP"})}</strike>
                                    </div>
                                    <div className="highlights__highlight">
                                        <p>GUESTS</p>
                                        <div><FontAwesomeIcon style={{fontSize: "23px", marginRight: "-5px"}} icon={faUser} /> <sup>{property.max_guests}</sup></div>
                                    </div>
                                    <div className="highlights__highlight">
                                        <p>BATH</p>
                                        <div><FontAwesomeIcon style={{fontSize: "23px", marginRight: "-5px"}} icon={faBathtub} /> <sup>{property.bath}</sup></div>
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
                                {property.house_rule?.map((house_rules, index) => (
                                    <li key={index} style={{ listStyleType: "circle"}}>{house_rules}</li>
                                ))}
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
                                {property.inside_property_images?.map((inside_property, index) => (
                                <div key={index} className="inside_images_div">
                                    <img  className="inside_images_div__inside_image"  src={inside_property.inside_images} alt={property.title} />
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
                            
                            <div className="booking">
                                
                                <form className="booking_form" onSubmit={this.handleSubmit}>
                                    {
                                        formShowing === true ? (
                                            <div style={{padding: "2em"}}>
                                                <span style={{position: "absolute", right: "2em" }} onClick={() => {this.setState({formShowing: false})}}><FontAwesomeIcon style={{fontSize: "1.1em", cursor: "pointer"}} icon={faX}></FontAwesomeIcon></span>
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
                                                            onMouseOver={(date) => {this.setState({check_out: date})
                                                            console.log(date)
                                                            }}
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
                                                            } nights</span>  <span style={{ fontFamily: "'Gilda Display', serif", fontSize: "1.5em" }}>{! check_out ? "£0.00" : this.totalPrice()?.toLocaleString("en-GB", {style:"currency", currency:"GBP" }) }</span> </p>
                                                            {/* } nights</span>  { !check_out ? (<span style={{ fontFamily: "'Gilda Display', serif", fontSize: "1.5em" }}>£0.00</span>) : (<span style={{ fontFamily: "'Gilda Display', serif", fontSize: "1.5em" }}>{this.totalPrice()?.toLocaleString("en-GB", {style:"currency", currency:"GBP" })}</span>) }</p> */}
                                                            {/* } nights</span>  <span style={{ fontFamily: "'Gilda Display', serif", fontSize: "1.5em" }}>{this.totalPrice()?.toLocaleString("en-GB", {style:"currency", currency:"GBP",  minimumFractionDigits: 0})}</span></p> */}
                                                        </Fragment>
                                                    {/* ) */}
                                                {/* } */}

                                                {/* <br></br> */}

                                                {/* <h4>Subtotal </h4> */}
                                                {/* <p>{this.totalPrice()}</p> */}
                                                {/* <p>{this.totalPrice()?.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p> */}
                                                
                                                <p className="sub-total"><span style={{ fontSize: "1em" }}>Service charges/Tax</span>  <span style={{ fontSize: "1.5em" }}>{property.service_charge?.toLocaleString("en-GB", {style:"currency", currency:"GBP" })}</span></p>

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


                                            
                                            </div>
                                        ) : (
                                            <p className="book_now_btn" onClick={() => {this.setState({formShowing: true})}} style={{ margin: "1em"}}>Book A Stay </p>
                                        )
                                    }
                                </form>                   
                            </div>
                            
                        </div>
                        
                        {/* <br></br>
                        <br></br> */}
                        <div className="location">

                        <h3>location</h3>
                            {/* <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613507864!3d-6.194741395493371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b45e67356080477!2sPT%20Kulkul%20Teknologi%20Internasional!5e0!3m2!1sen!2sid!4v1601138221085!5m2!1sen!2sid"
                                width="100%"
                                height="450"
                                frameBorder="0"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                aria-hidden="false"
                                tabIndex="0"
                                /> */}

                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d37042.04697782714!2d-1.5883676998683476!3d54.53123954708759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487c24202d751389%3A0x86c0f359dfda50ed!2sDarlington%2C%20UK!5e0!3m2!1sen!2sng!4v1660976173933!5m2!1sen!2sng" width="100%" height="450" style={{ border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                                     
                        {/* <h3>reviews</h3>  */}

                        {/* <p style={{ position: "absolute", bottom: "0", right: "50%" }}> */}
                        {/* <br></br>
                        <br></br> */}
                        <p style={{ position: "absolute",margin: "5em 0 5em 0", right: "50%", height: "3em" }}>
                            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 176.51 43.63" onClick={() => {document.documentElement.scrollTop = 0;}} style={{ width: "6em", transform: "rotate(90deg)", cursor: "pointer" }}><defs></defs><line style={{fill:"none", strokeMiterLimit:10 }} className="cls-1" x1="0.1" y1="22.19" x2="176.51" y2="22.19"/><path d="M230.15,209.89a28.33,28.33,0,0,0,7.52-3,30.08,30.08,0,0,0,6.39-5,33.41,33.41,0,0,0,8.07-13.8l2.2.89a55.22,55.22,0,0,1-4.42,7.1,43.15,43.15,0,0,1-5.51,6.17,39.21,39.21,0,0,1-6.59,4.89,42.12,42.12,0,0,1-7.46,3.46Z" transform="translate(-230.15 -188.04)"/><path d="M230.3,209.88a34.86,34.86,0,0,1,8.06,2.49,28.15,28.15,0,0,1,7.08,4.55,31.86,31.86,0,0,1,5.54,6.43,43.81,43.81,0,0,1,4,7.63l-2.27.69a28.58,28.58,0,0,0-2.69-7.74,25.46,25.46,0,0,0-4.89-6.64,23.48,23.48,0,0,0-6.85-4.68,25.25,25.25,0,0,0-8.05-2Z" transform="translate(-230.15 -188.04)"/></svg>
                        </p>
                        <h3></h3> 
                       

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

