import React, { Component } from "react";
import MainNavigation from "../components/MainNavigation";

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
                <MainNavigation />
                <div>
                    <h3>We'd love to hear from you</h3>
                    {/* <h1>Say Hi!</h1> */}
                    {/* <h1>Say Hi!</h1> */}

                    <form className="signup_form">
                        <h4>Contact Us</h4>
                        <div className="signup_form__div">
                            <div className="signup_form__div__div">
                                <label htmlFor="first_name" className="signup_form__div__div__label">First Name</label><br></br>
                                <input className="signup_form__div__div__input" type="text" value={first_name} onChange={this.handleChange} name="first_name" placeholder="enter your first name" required></input>
                            </div>
                            
                            <div className="signup_form__div__div">
                                <label htmlFor="last_name" className="signup_form__div__div__label">Last Name</label><br></br>
                                <input className="signup_form__div__div__input" type="text" value={last_name} onChange={this.handleChange} name="last_name" placeholder="enter your last name" required></input>   
                            </div>  
                        </div>                 
                        <div className="signup_form__div">
                            <div className="signup_form__div__div">
                                <label htmlFor="first_name" className="signup_form__div__div__label">Email</label><br></br>
                                <input className="signup_form__div__div__input" type="text" value={email} onChange={this.handleChange} name="email" placeholder="enter your email" required></input>
                            </div>
                            
                            <div className="signup_form__div__div">
                                <label htmlFor="last_name" className="signup_form__div__div__label">Phone Number</label><br></br>
                                <input className="signup_form__div__div__input" type="text" value={phone_number} onChange={this.handleChange} name="phone_number" placeholder="enter your phone number" required></input>   
                            </div>  
                        </div>   

                          <label htmlFor="email"  className="signup_form__label">Message</label><br></br>
                            <textarea rows={5}></textarea>            
                    </form>

                    <h4>EMAIL US </h4>    
                    <a href="mailto:abc123@gmail.com?subject=Enquiry">abc123@gmail.com</a>
                    <h4>CALL US</h4>
                        <a href="tel:+2349012345678">+234-901-234-5678</a>

                    <h3>Socials</h3>
                </div>
            </main>
        )
    }
}