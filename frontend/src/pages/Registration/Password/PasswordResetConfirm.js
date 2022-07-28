import React, { Component, Fragment } from "react";

export default class PasswordResetConfirm extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            isAuth: false,
        }
    }

    componentDidMount(){
        if (localStorage.getItem('token') !== null) {
            this.setState({
                isAuth: true
            })
            window.location.replace('http://127.0.0.1:8000/');
        }
    }


    // url: api/v1/users/ dj-rest-auth/ password/reset/confirm/
    
    render(){
        const { isAuth } = this.state;

        return(
            <main>
                <div className="signup_page">
                { isAuth === false && (
                    <Fragment>
                        <h2>Confirm New Password</h2>
                        <br></br>
                        <form className="signup_form">
                            <input className="signup_form__input"  type="text" name="uid" placeholder="uid"></input>
                            <br></br>
                            <input className="signup_form__input"  type="text" name="token" placeholder="Token"></input>
                            <br></br>
                            <input className="signup_form__input"  type="password" name="new_password1" placeholder="New Password"></input>
                            <br></br>
                            <input className="signup_form__input"  type="password" name="new_password2" placeholder="Confirm New Password"></input>
                            <br></br>
                            <br></br>
                            <button type="submit" className="signup_form__button" >Reset My Password</button>
                        </form>
        
                        <br></br>
                        <p className="sth_else">Please <a href="mailto:abc123@gmail.com?subject=Password Reset">contact us</a> if you have any trouble resetting your password.</p>
                    </Fragment>
                )}
            </div>
            </main>
        )
    }
}