import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faTwitter,
    faInstagram,
    faFacebook
  } from "@fortawesome/free-brands-svg-icons";

export default class Contact extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            first_name: "",
            last_name: "",
            phone_number: ""
        }
    }

    componentDidMount(){
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
                        email: data.email,
                        first_name: data.first_name,
                        last_name: data.last_name,
                    })
                });
        }
    }

    handleChange = (event) => {
        this.setState({ 
            [event.target.name]: event.target.value
        })
    }

    
    render(){
        const  { email, first_name, last_name, phone_number } = this.state;
        return(
            <main>
                <div className="contact">
                    {/* <h1>Say Hi!</h1> */}
                    {/* <h1>Say Hi!</h1> */}

                    <div className="contact_page">
                        <div className="contact_page__div">
                            <h3>Love to hear from you, get in touch!</h3>
                            {/* <h3>We'd love to hear from you</h3> */}
                        </div>

                        <div className="contact_page__div">
                            <form className="contact_page__div__form">
                                <h4>Contact Us</h4>
                                <div className="contact_page__div__form__div">
                                    <div className="contact_page__div__form__div__div">
                                        <label htmlFor="first_name" className="contact_page__div__form__div__div__label">First Name</label><br></br>
                                        <input className="contact_page__div__form__div__div__input" type="text" value={first_name} onChange={this.handleChange} name="first_name" placeholder="enter your first name" required></input>
                                    </div>
                                    
                                    <div className="contact_page__div__form__div__div">
                                        <label htmlFor="last_name" className="contact_page__div__form__div__div__label">Last Name</label><br></br>
                                        <input className="contact_page__div__form__div__div__input" type="text" value={last_name} onChange={this.handleChange} name="last_name" placeholder="enter your last name" required></input>   
                                    </div>  
                                </div>                 
                                <div className="contact_page__div__form__div">
                                    <div className="contact_page__div__form__div__div">
                                        <label htmlFor="first_name" className="contact_page__div__form__div__div__label">Email</label><br></br>
                                        <input className="contact_page__div__form__div__div__input" type="text" value={email} onChange={this.handleChange} name="email" placeholder="enter your email" required></input>
                                    </div>
                                    
                                    <div className="contact_page__div__form__div__div">
                                        <label htmlFor="last_name" className="contact_page__div__form__div__div__label">Phone Number</label><br></br>
                                        <input className="contact_page__div__form__div__div__input" type="text" value={phone_number} onChange={this.handleChange} name="phone_number" placeholder="enter your phone number" required></input>   
                                    </div>  
                                </div>   

                                <label htmlFor="email"  className="contact_page__div__form__label">Message</label><br></br>
                                <textarea rows={3} placeholder="enter your message here"></textarea>     
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
                        <h3><FontAwesomeIcon className="heart social_icons" size="1x" icon={faFacebook} />  <FontAwesomeIcon className="heart social_icons" size="1x" icon={faInstagram} />  <FontAwesomeIcon className="heart social_icons" size="1x" icon={faTwitter} /></h3>
                    </div>
                </div>
            </main>
        )
    }
}