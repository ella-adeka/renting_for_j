import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

export default class PasswordChange extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            isAuth: true,
            errors: false,
            password: '',
            old_password: '',
            new_password1: '',
            new_password2: '',
        }
        // this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        if (localStorage.getItem('token') === null) {
            this.setState({
                isAuth: false,
                
            })
            window.location.replace('http://127.0.0.1:8000/login');
        } else {
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
                    password: data.password,
                    loading: false
                })
            });
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]  : event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if (this.state.password == this.state.old_password && this.state.old_password !== this.state.new_password1 && this.state.old_password != this.state.new_password2) {
            return;
        }

        const passwords = {
            old_password: this.state.old_password,
            new_password1: this.state.new_password1,
            new_password2: this.state.new_password2
        };

        fetch('http://127.0.0.1:8000/api/v1/users/dj-rest-auth/password/change/', {
        // fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(passwords)
            })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (this.state.password !== this.state.old_password && this.state.old_password !== this.state.new_password1 || this.state.old_password !== this.state.new_password2) {
                    localStorage.clear();
                    window.location.replace('http://127.0.0.1:8000/login');
                } else {
                    this.setState({
                        old_password: '',
                        new_password1: '',
                        new_password2: '',
                        errors: true
                    })
                }
            })
            .catch((err) => console.log(err))
        }
        
        
        // url: api/v1/users/ dj-rest-auth/ password/change/ 
        
        render(){
        // console.log(this.state.password)
        const { old_password, new_password1, new_password2, errors, isAuth } = this.state;

        return(
            <main>
                 <Link className="back_to_props" to={{ pathname: `/user/account`}}>
                    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 176.51 43.63" style={{ width: "8em"}}><defs></defs><line style={{fill:"none", strokeMiterLimit:10 }} className="cls-1" x1="0.1" y1="22.19" x2="176.51" y2="22.19"/><path d="M230.15,209.89a28.33,28.33,0,0,0,7.52-3,30.08,30.08,0,0,0,6.39-5,33.41,33.41,0,0,0,8.07-13.8l2.2.89a55.22,55.22,0,0,1-4.42,7.1,43.15,43.15,0,0,1-5.51,6.17,39.21,39.21,0,0,1-6.59,4.89,42.12,42.12,0,0,1-7.46,3.46Z" transform="translate(-230.15 -188.04)"/><path d="M230.3,209.88a34.86,34.86,0,0,1,8.06,2.49,28.15,28.15,0,0,1,7.08,4.55,31.86,31.86,0,0,1,5.54,6.43,43.81,43.81,0,0,1,4,7.63l-2.27.69a28.58,28.58,0,0,0-2.69-7.74,25.46,25.46,0,0,0-4.89-6.64,23.48,23.48,0,0,0-6.85-4.68,25.25,25.25,0,0,0-8.05-2Z" transform="translate(-230.15 -188.04)"/></svg>
                </Link>
                <div className="signup_page">
                    { isAuth === true && (
                        <Fragment>
                            <h2>Change Your Password</h2>
                            { errors === true && <h2>Invalid password</h2> }
                            <br></br>
                            <form onSubmit={this.handleSubmit} className="signup_form">
                                <input className="signup_form__input" type="password" value={old_password} onChange={this.handleChange} name="old_password" placeholder="Old Password"></input>
                                <br></br>
                                <input className="signup_form__input" type="password" value={new_password1} onChange={this.handleChange} name="new_password1" placeholder="New Password"></input>
                                <br></br>
                                <input className="signup_form__input" type="password" value={new_password2} onChange={this.handleChange} name="new_password2" placeholder="Confirm New Password"></input>
                                <br></br>
                                <br></br>
                                <button className="signup_form__button" type="submit">Change Password</button>
                                <button  type="submit" className="signup_form__button without"><Link to={{ pathname: '/user/account'}}>Cancel</Link></button>
                            </form>
            
                            <br></br>
                            <p className="sth_else">Please <a href="mailto:abc123@gmail.com?subject=Password Change">contact us</a> if you have any trouble changing your password.</p>
                        </Fragment>
                    )}
                </div>
            </main>
        )
    }
}