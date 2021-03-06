import React, { Component, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: false,
            loading: true,
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        this.setState({
            loading: false
        })
    }

    handleChange = (event) => {
        this.setState({ 
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // url to use: http://127.0.0.1:8000/api/v1/users/dj-rest-auth/login/
        
        // facebook url: http://127.0.0.1:8000/accounts/facebook/login/?process=login
        // google url: http://127.0.0.1:8000/dj-rest-auth/google/?process=login
        // twitter url: http://127.0.0.1:8000/dj-rest-auth/twitter/?process=login
        const user = {
            email: this.state.email,
            password: this.state.password
        };

        // fetch('http://127.0.0.1:8000/tight/login/', {
        fetch('http://127.0.0.1:8000/api/v1/users/dj-rest-auth/login/', {
        // fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
            })
            .then(res => res.json())
            .then(data => {
                // this.setState({ propertiesList: res.data })
                if (data.key) {
                    localStorage.clear();
                    localStorage.setItem('token', data.key);
                    window.location.replace('http://127.0.0.1:8000/user/account');
                } else {
                    this.setState({
                        email:'',
                        password:'',
                        errors: true
                    })
                    localStorage.clear();
                }
            });
    }
    
    render(){
        const { email, password, loading, errors } = this.state;
        return(
            <main>
                <div className="signup_page">
                    { loading === false && <h2>Welcome back</h2> }
                    { errors === true && <h4>Invalid email or password</h4> }

                    {/* <h1>Login</h1>  */}
                    { loading === false && (
                        <Fragment>
                            <h4>Hey, enter your details to get signed in to your account.</h4>
                            <form onSubmit={this.handleSubmit} className="signup_form">
                                <label htmlFor="email"  className="signup_form__label">Email</label><br></br>
                                <input className="signup_form__input" type="email" value={email} onChange={this.handleChange} name="email" placeholder="enter your email"></input>
                                {/* <br></br> */}
                                <label htmlFor="password"  className="signup_form__label">Password</label><br></br>
                                <input className="signup_form__input" type="password" value={password} onChange={this.handleChange} name="password" placeholder="enter your password"></input>
                                {/* <br></br>
                                <br></br> */}
                                    {/* <a href="http://127.0.0.1:8000/tight/password/reset/">Forgot Password?</a>
                                    <br></br>
                                    <a href="http://127.0.0.1:8000/api/v1/users/dj-rest-auth/password/change/">Forgot Password?</a> */}
                                    <h4 style={{ textAlign: "center", margin: "2em" }}><Link to={{ pathname: '/user/password-reset' }}>Forgot Password?</Link></h4>
                                <button type="submit" className="signup_form__button">Login</button>
                            </form>
                            <br></br>
                          

                           
                            <br></br>
                            <br></br>
                            <h4 className="sth_else"><span>Don't have an account?</span> <Link to={{ pathname: '/signup' }} style={{ marginRight: "2em"}}>Sign Up</Link></h4>
                            

                            

                            
                        </Fragment>                  
                    )}
                </div>
            </main>
        )
    }
}

// axios
//             .post('http://127.0.0.1:8000/api/auth/login/', {
//                 headers: {
//                     Accept: "application/json",
//                     // "Content-Type": "application/json;charset=UTF-8",
//                 },
//                 body: JSON.stringify(user)
//             })
//             .then((res) => res.json())
//             .then((data) => {
//                 if (data.key) {
//                     localStorage.clear();
//                     localStorage.setItem('token'. data.key);
//                     window.location.replace('http://127.0.0.1:8000/profile');
//                 } else {
//                     this.setState({
//                         email: '',
//                         password: '',
//                         errors: true
//                     });
//                     localStorage.clear();

//                 }
//             })
//             .catch((err) => console.log(err))