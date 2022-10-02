import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faTwitter,
    faInstagram,
    faFacebook
  } from "@fortawesome/free-brands-svg-icons";
import AuthContext from "../utils/context/authContext";
import MainNavigation from "../components/Navigation/MainNavigation";

export default class Contact extends Component{
    static contextType = AuthContext;

    constructor(props){
        super(props);
        this.state = {
            user_id: "",
            email: "",
            first_name: "",
            last_name: "",
            user_profile: {},
            subject: "",
            message: "", 
            success_sent: false
        }
    }

    componentDidMount(){
        if (localStorage.getItem('token') !== null) {
            this.setState({
                isAuth: true,
            });
            // fetch('http://127.0.0.1:8000/api/v1/users/dj-rest-auth/user/', {
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
                        user_id: data.pk,
                        email: data.email,
                        first_name: data.first_name,
                        last_name: data.last_name,
                        user_profile: data.user_profile
                    })
                });
            }
        // this.successDisappear = setTimeout(() => this.setState({success_sent:false}), 5000);
        if(this.state.success_sent == true){
            setTimeout(() => this.setState({success_sent: false}), 5000);
        }
    }

    componentDidUpdate(){
        clearTimeout(this.successDisappear)
    }

    handleChange = (event) => {
        this.setState({ 
            [event.target.name]: event.target.value
        })
    }

    handleProfileChange = (event) => {
        this.setState(prevState => ({ 
            user_profile: {
                ...prevState.user_profile,
                [event.target.name]: event.target.value
            }
        }))
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { user } = this.context;

        const contact = {
            user: user.id,
            subject: this.state.subject,
            message: this.state.message,
        };

        fetch('http://127.0.0.1:8000/api/contact/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
            })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    this.setState({
                        subject:'',
                        message:'',
                        success_sent: true
                    })
                } else {
                    this.setState({
                        subject:'',
                        message:'',
                    })
                }
            });
    }

    
    render(){
        const { user } = this.context;
        const  {  user_profile, subject, message, success_sent } = this.state;

        return(
            <main>
                <MainNavigation/>
                <div className="contact">
                    {/* <h1>Say Hi!</h1> */}
                    {/* <h1>Say Hi!</h1> */}

                    <div className="contact_page">
                        <div className="contact_page__div">
                            <h3>Love to hear from you, get in touch!</h3>
                            {/* <h3>We'd love to hear from you</h3> */}
                        </div>

                        <div className="contact_page__div">
                            <form   onSubmit={this.handleSubmit}className="contact_page__div__form">
                                <h4>Contact Us</h4>
                                { success_sent === true && <p style={{marginBottom: "1em", color: "#198754", fontSize: "1em"}}>Message sent successfully! </p>}
                                <div className="contact_page__div__form__div">
                                    <div className="contact_page__div__form__div__div">
                                        <label htmlFor="first_name" className="contact_page__div__form__div__div__label">First Name</label><br></br>
                                        <input className="contact_page__div__form__div__div__input" type="text" value={user.first_name} onChange={this.handleChange} name="first_name" placeholder="enter your first name" required></input>
                                    </div>
                                    
                                    <div className="contact_page__div__form__div__div">
                                        <label htmlFor="last_name" className="contact_page__div__form__div__div__label">Last Name</label><br></br>
                                        <input className="contact_page__div__form__div__div__input" type="text" value={user.last_name} onChange={this.handleChange} name="last_name" placeholder="enter your last name" required></input>   
                                    </div>  
                                </div>                 
                                <div className="contact_page__div__form__div">
                                    <div className="contact_page__div__form__div__div">
                                        <label htmlFor="first_name" className="contact_page__div__form__div__div__label">Email</label><br></br>
                                        <input className="contact_page__div__form__div__div__input" type="text" value={user.email} onChange={this.handleChange} name="email" placeholder="enter your email" required></input>
                                    </div>
                                    
                                    <div className="contact_page__div__form__div__div">
                                        <label htmlFor="last_name" className="contact_page__div__form__div__div__label">Phone Number</label><br></br>
                                        <input className="contact_page__div__form__div__div__input" type="text" value={user_profile?.phone_number} onChange={this.handleProfileChange} name="phone_number" placeholder="enter your phone number"></input>   
                                    </div>  
                                </div>  

                                <div className="contact_page__div__form__div">
                                    <label htmlFor="subject" className="contact_page__div__form__div__label">Subject</label><br></br>
                                    <input className="contact_page__div__form__div__input" type="text" value={subject} onChange={this.handleChange} name="subject" placeholder="subject of your message" required></input>   
                                </div>  

                                <label htmlFor="message"  className="contact_page__div__form__label">Message</label><br></br>
                                <textarea rows={3} placeholder="enter your message here" value={message} name="message" id="message" onChange={this.handleChange}></textarea>     
                                <br></br>

                                <button type="submit" className="contact_page__div__form__button">Send Message </button>       
                            </form>

                            <div className="contact_page__div__reachable">
                                <p>EMAIL US </p>    
                                <a href="mailto:abc123@gmail.com?subject=Enquiry">abc123@gmail.com</a>

                                <p>CALL US</p>
                                <a href="tel:+2349012345678">+234-901-234-5678</a>
                            </div>
                        </div>
                    </div>

                    <div className="others">
                        <h3><FontAwesomeIcon className="social_icons" size="1x" icon={faFacebook} />  <FontAwesomeIcon className="social_icons" size="1x" icon={faInstagram} />  <FontAwesomeIcon className="social_icons" size="1x" icon={faTwitter} /></h3>
                    </div>
                </div>
            </main>
        )
    }
}