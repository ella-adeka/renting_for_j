import React, { Component, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import  AuthContext  from "../../../utils/context/authContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faEye,
    faEyeSlash,
} from '@fortawesome/free-regular-svg-icons';
import GoogleButton from 'react-google-button';
import { GoogleLogin } from '@react-oauth/google';
import MainNavigation from "../../../components/Navigation/MainNavigation";

export default class Login extends Component{
    static contextType = AuthContext;

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordShown: false,
            errors: false,
            // loading: true,
        }

        // this.handleSubmit = this.handleSubmit.bind(this)
        
    }

    componentDidMount(){
        // this.setState({
        //     loading: false
        // })
        // const { loading } = this.context;
        if (localStorage.getItem('token') !== null){
            window.location.replace('http://127.0.0.1:8000/user/account');
        }

    }
    

    handleChange = (event) => {
        this.setState({ 
            [event.target.name]: event.target.value
        })
    }


    // handleSubmit = (event) => {
    //     event.preventDefault();
        // url to use: http://127.0.0.1:8000/api/v1/users/dj-rest-auth/login/
        
        // facebook url: http://127.0.0.1:8000/accounts/facebook/login/?process=login
        // google url: http://127.0.0.1:8000/dj-rest-auth/google/?process=login
        // twitter url: http://127.0.0.1:8000/dj-rest-auth/twitter/?process=login
        // const user = {
        //     email: this.state.email,
        //     password: this.state.password
        // };
        
        // loginUser(this.state.email, this.state.password)
        
        // console.log(user)
        
        // fetch('http://127.0.0.1:8000/tight/login/', {
            // fetch('http://127.0.0.1:8000/api/v1/users/dj-rest-auth/login/', {
                // fetch('http://127.0.0.1:8000/api/v1/users/login', {
                    // // fetch('http://127.0.0.1:8000/api/token/', {
                        //     method: 'POST',
                        //     headers: {
                            //         'Content-Type': 'application/json'
                            //     },
                            //     body: JSON.stringify(user)
                            //     })
                            //     .then(res => res.json())
                            //     .then(res => {
                                //         // this.setState({ propertiesList: res.data })
                                //         if (res.token) {
                                    //             localStorage.removeItem("token");
                                    //             localStorage.setItem('token', res.token);
                                    //             window.location.replace('http://127.0.0.1:8000/user/account');
                                    //         } else {
                                        //             this.setState({
                                            //                 email:'',
                                            //                 password:'',
                                            //                 errors: true
                                            //             })
                                            //             // localStorage.clear();
                                            //         }
                                            //     })
                                            //     .catch((err) => console.log(err))
                                           
    // }
    
    render(){
        const { email, password, errors, passwordShown } = this.state;
        const {loginUser, loading} = this.context;

        // console.log(loading)


        const handleSubmit = (event) => {
            event.preventDefault();

            // const email = event.target.email.value;
            // const password = event.target.password.value;
            loginUser(email, password)
        };

        return(
            <main>
                <MainNavigation/>
                <div className="signup_page">
                    { loading === true && <h2>Welcome back</h2> }
                    { errors === true && <h4>Invalid email or password</h4> }

                    {/* <h1>Login</h1>  */}
                    { loading === true && (
                        <Fragment>
                            <h4>Hey, enter your details to get signed in to your account.</h4>
                            <form onSubmit={handleSubmit} className="signup_form">
                                <label htmlFor="email"  className="signup_form__label">Email</label><br></br>
                                <input className="signup_form__input" type="email" value={email} onChange={this.handleChange} name="email" placeholder="enter your email"></input>
                                {/* <br></br> */}
                                <label htmlFor="password"  className="signup_form__label">Password</label><br></br>
                                <input  className="signup_form__input" type={passwordShown ? "text" : "password"} value={password} onChange={this.handleChange} name="password" placeholder="enter your password" /><FontAwesomeIcon style={{marginLeft: "-2em", cursor: "pointer"}} onClick={() => this.setState({passwordShown: !passwordShown})} icon={passwordShown  ? faEyeSlash : faEye } ></FontAwesomeIcon>
                                    
                                    {/* <FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon> */}
                                {/* </div> */}
                                {/* <br></br>
                                <br></br> */}
                                    {/* <a href="http://127.0.0.1:8000/tight/password/reset/">Forgot Password?</a>
                                    <br></br>
                                    <a href="http://127.0.0.1:8000/api/v1/users/dj-rest-auth/password/change/">Forgot Password?</a> */}
                                    <h4  style={{ width: "100%", marginBottom: "2em" }}>
                                        <div  style={{  display:"inline-block", textAlign: "left",width: "50%"  }}><input type="checkbox" id="remember" ></input><label htmlFor="remember" style={{paddingLeft: "0.5em"}}>Remember Me</label></div>
                                        <div style={{  display:"inline-block", textAlign: "right", width: "50%" }}><Link to={{ pathname: '/user/password-reset' }}>Forgot Password?</Link></div>
                                    
                                    </h4>
                                <button type="submit" className="signup_form__button">Login</button>

                                
                            </form>
                            {/* <br></br> */}

                            <div className="socials">
                                <p>- or -</p>  
                                <br></br>

                                {/* <GoogleButton
                                    // label="Google"
                                    style={{width: "100%" }}
                                    onClick={() => { console.log('Google button clicked') }}
                                /> */}

                              

                                <GoogleLogin
                                    onSuccess={credentialResponse => {
                                        console.log(credentialResponse);
                                    }}
                                    onError={() => {
                                        console.log('Login Failed');
                                    }}
                                    size="large"
                                    // theme="filled_blue"
                                    // type="icon"
                                    shape="square"
                                    />
                            </div>
                          

                           
                            <br></br>
                            <br></br>
                            <h4 className="sth_else"><span>Don't have an account yet?</span> <Link to={{ pathname: '/signup' }} style={{ marginRight: "2em"}}>Sign Up</Link></h4>
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