import React, { Component } from "react";
import {  Link } from "react-router-dom";
import defaultImage from "../../../static/default.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faPencil
} from '@fortawesome/free-solid-svg-icons';
import AuthContext from "../../utils/context/authContext";

export default class UserProfile extends Component{
    static contextType = AuthContext;

    constructor(props){
        super(props);
        this.state = {
            user_id: '',
            email: '',
            first_name: '',
            last_name: '',
            user_profile: {},
            loading: true,
        }
    }

    componentDidMount(){
        if (localStorage.getItem('token') === null) {
            window.location.replace('http://127.0.0.1:8000/login');
        } else {
            // fetch('http://127.0.0.1:8000/api/v1/users/dj-rest-auth/user/', {
            fetch('http://127.0.0.1:8000/api/v1/users/user', {
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
                    user_id: data.pk,
                    email: data.email,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    user_profile: data.user_profile,
                    loading: false
                })
            });
        }


        // window.sessionStorage.setItem("formShowing", this.state.formShowing);
    }

    handleImageChange = (event) =>{
        this.setState(prevState => ({ 
            user_profile: {
                ...prevState.user_profile,
                avatar: event.target.files[0]
            }
        }))
    }

    
    render(){
        const { user } = this.context
        const {  email, first_name, last_name, loading, user_profile } = this.state;

        return(
            <main>
                { loading === false && (
                    <div>
                        {/* <h1>Hello {first_name}</h1> */}
                        {/* <h4 style={{ color: "#898989" }}><Link to="/user/account" style={{ fontSize: "1em", textDecoration: "underline" }} onClick={this.handleLogout}>back to your account</Link></h4> */}
                        <Link className="back_to_props" to={{ pathname: `/user/account`}}>
                            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 176.51 43.63" style={{ width: "8em"}}><defs></defs><line style={{fill:"none", strokeMiterLimit:10 }} className="cls-1" x1="0.1" y1="22.19" x2="176.51" y2="22.19"/><path d="M230.15,209.89a28.33,28.33,0,0,0,7.52-3,30.08,30.08,0,0,0,6.39-5,33.41,33.41,0,0,0,8.07-13.8l2.2.89a55.22,55.22,0,0,1-4.42,7.1,43.15,43.15,0,0,1-5.51,6.17,39.21,39.21,0,0,1-6.59,4.89,42.12,42.12,0,0,1-7.46,3.46Z" transform="translate(-230.15 -188.04)"/><path d="M230.3,209.88a34.86,34.86,0,0,1,8.06,2.49,28.15,28.15,0,0,1,7.08,4.55,31.86,31.86,0,0,1,5.54,6.43,43.81,43.81,0,0,1,4,7.63l-2.27.69a28.58,28.58,0,0,0-2.69-7.74,25.46,25.46,0,0,0-4.89-6.64,23.48,23.48,0,0,0-6.85-4.68,25.25,25.25,0,0,0-8.05-2Z" transform="translate(-230.15 -188.04)"/></svg>
                        </Link>

                        <div style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" , width: "60%", height: "60%"}}>
                            <div>
                                <img className="profile_photo" src={user.user_profile?.avatar ? user.user_profile?.avatar : defaultImage}></img>
                                <input type="file" id="file_upload"  onChange={this.handleImageChange} hidden></input>
                                <FontAwesomeIcon className="edit_profile_photo" size="1x" icon={faPencil} onClick={() => document.getElementById('file_upload').click()}></FontAwesomeIcon>
                            </div>
                                
                                <p style={{ fontSize: "3em"}}>{user.first_name} {user.last_name}</p>
                                <p>{email}</p>
                                <h4>No. of reservations</h4>
                        </div>
                       
                    </div>
                )}
            </main>
        )
    }
}