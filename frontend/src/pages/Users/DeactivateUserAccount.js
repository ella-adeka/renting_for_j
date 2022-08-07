import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

export default class DeactivateUserAccount extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: '',
            email: '',
            first_name: '',
            last_name: '',
            avatar: '',
            is_active: true,
            loading: true,
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        if (localStorage.getItem('token') === null) {
            window.location.replace('http://127.0.0.1:8000/login');
        } else {
            fetch('http://127.0.0.1:8000/api/v1/users/dj-rest-auth/user/', {
            // fetch('http://127.0.0.1:8000/api/users/', {
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
                    email: data.email,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    avatar: data.avatar,
                    loading: false
                })
            });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://127.0.0.1:8000/api/v1/users/dj-rest-auth/user/', {
            // fetch('http://127.0.0.1:8000/api/users/', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ is_active : false})
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                localStorage.removeItem("token");
                window.location.replace('http://127.0.0.1:8000/');
            })
            .catch((err) => console.log(err))
    }

    
    render(){
        const { first_name, loading } = this.state;

        return(
            <main>
                <div className="signup_page">
                    { loading === false && (
                        <Fragment>
                            {''}
                            <form onSubmit={this.handleSubmit} className="signup_form">
                                <h6>Sad to see you go :(</h6>
                                <h3>{first_name}, tell us your reasons</h3>
                                <p>Don't really like it here :(</p>
                                <br></br>
                                <br></br>
                                <button className="signup_form__button" type="submit">Deactivate</button>
                                <button  type="link" className="signup_form__button without"><Link to={{ pathname: '/user/account'}}>Nevermind</Link></button>
                            </form>
                        </Fragment>
                    )}
                </div>
            </main>
        )
    }
}