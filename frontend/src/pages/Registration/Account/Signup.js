import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Signup extends Component{
    constructor(props){
        super(props);
        this.myRef = React.createRef();
        this.state = {
            email: '',
            first_name: '',
            last_name: '',
            // avatar: null,
            password1: '',
            password2: '',
            errors: false,
            loading: true,
            // isLoggedIn: false,
            // isRegistered: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        if (localStorage.getItem('token') !== null) {
            window.location.replace('http://127.0.0.1:8000/user/account');
        } else {
            this.setState({
                loading: false
            })
        }
    }

    handleChange = (event) => {
        this.setState({ 
            [event.target.name]: event.target.value,
        });
    }
    // handleImageChange = (event) =>{
    //     this.setState({
    //         avatar: event.target.files[0]
    //     })
    // }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.avatar);
        const formData = new FormData();
        // formData.append('avatar', this.state.avatar, this.state.avatar.name);
        formData.append('email',  this.state.email);
        formData.append('first_name',  this.state.first_name);
        formData.append('last_name',  this.state.last_name);
        formData.append('password1',  this.state.password1);
        formData.append('password2',  this.state.password2);
       
        
        // url to use: http://127.0.0.1:8000/api/v1/users/dj-rest-auth/registration/
        // fetch('http://127.0.0.1:8000/api/auth/register/', {
        fetch('http://127.0.0.1:8000/api/v1/users/dj-rest-auth/registration/', {
            method: 'POST',
            body:formData
            })
            .then(res => res.json())
            .then(data => {
                if (data.key) {
                    localStorage.clear();
                    localStorage.setItem('token', data.key);
                    window.location.replace('http://127.0.0.1:8000/user/profile');
                } else {
                    this.setState({
                        email:'',
                        first_name:'',
                        last_name:'',
                        // avatar: null,
                        password1:'',
                        password2:'',
                        errors: true
                    })
                    localStorage.clear();
                }
                console.log(data)
            })
            .catch((err) => console.log(err))
    }
    
    render(){
        const { email, first_name, last_name, avatar, password1, password2, loading, errors } = this.state;

        return(
            <main>
                <div className="signup_page">
                    {loading === false && <h2>Create a new account</h2>}
                    {errors === true && <h2>Cannot signup with provided credentials</h2>}
                    <form onSubmit={this.handleSubmit} className="signup_form">
                        <label htmlFor="email"  className="signup_form__label">Email</label><br></br>
                        <input className="signup_form__input" type="email" value={email} onChange={this.handleChange} name="email" placeholder="enter your email" required></input>
               
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
                        {/* <br></br> */}

                        <div className="signup_form__div">
                            <div className="signup_form__div__div">
                                <label className="signup_form__div__div__label" htmlFor="password1">Password</label><br></br>
                                <input className="signup_form__div__div__input" type="password" value={password1} onChange={this.handleChange} name="password1" placeholder="enter your password"></input>
                            </div>

                           <div className="signup_form__div__div">
                                <label htmlFor="password2" className="signup_form__div__div__label">Confirm Password</label><br></br>
                                <input className="signup_form__div__div__input" type="password" value={password2} onChange={this.handleChange} name="password2" placeholder="confirm your password"></input>
                           </div>
                        </div>
                        {/* <label htmlFor="avatar">Profile Picture</label><br></br>
                        <input type="file"   id="avatar"  onChange={this.handleImageChange} name="avatar"></input> */}
                    
                        
                        <br></br>

                        {/* <input type="submit" value="Submit" ></input> */}
                        <button className="signup_form__button" type="submit">Submit</button>
                    </form>

                    <div className="socials">
                        <h4>- Or signup with -</h4>  
                        <br></br>
                        {/* <a href="http://127.0.0.1:8000/tight/facebook/login/?process=login">Facebook</a> */}
                        {/* <a href="http://127.0.0.1:8000/dj-rest-auth/facebook/?process=login">Facebook</a> */}
                        {/* <br></br> */}
                        <a href="http://127.0.0.1:8000/dj-rest-auth/google/?process=login">Google</a>
                        {/* <br></br> */}
                        {/* <a href="http://127.0.0.1:8000/dj-rest-auth/twitter/?process=login">Twitter</a> */}
                    </div>

                    <br></br>
                    <h4 className="sth_else"><span>Already Have An Account?</span> <Link to={{ pathname: '/login' }} style={{ marginRight: "2em"}}>Log In</Link></h4>

                    {this.isLoggedIn}
                </div>
            </main>
        )
    }
}