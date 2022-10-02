import React, { Component } from "react";
import {  Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AuthContext from "../../utils/context/authContext";

export default class UserPersonalInfo extends Component{
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

        // this.handleChange = this.handleProfileChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        if (localStorage.getItem('token') === null) {
            window.location.replace('http://127.0.0.1:8000/login');
        } else {
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
                    loading: false,
                    user_profile: data.user_profile
                })
            })
            .catch((err) => console.log(err))
        }
    }


    handleChange = (event) => {
        this.setState({ 
            [event.target.name]: event.target.value
        })
    }

    handleProfileChange = (event) => {
        this.setState((prevState) => ({ 
            user_profile: {
                ...prevState.user_profile,
                [event.target.name]: event.target.value
            }
        }));
        // this.setState({
            // user_profile: {
                // ...prevState.user_profile,
                // [event.target.name]: event.target.value
            // }
        // });
    }

    // handleImageChange = (event) =>{
    //     this.setState(prevState => ({ 
    //         user_profile: {
    //             ...prevState.user_profile,
    //             avatar: event.target.files[0]
    //         }
    //     }))
    // }

    // handleSubmit = (event) => {
    //     event.preventDefault();

    //     const user = {
    //         email: this.state.email,
    //         password: this.state.password
    //     };

    //     fetch('http://127.0.0.1:8000/api/v1/users/dj-rest-auth/user/', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(user)
    //         })
    //         .then(res => res.json())
    //         .then(data => {
    //             // this.setState({ propertiesList: res.data })
    //             if (data.key) {
    //                 localStorage.removeItem("token");
    //                 localStorage.setItem('token', data.key);
    //                 window.location.replace('http://127.0.0.1:8000/user/account');
    //             } else {
    //                 this.setState({
    //                     email:'',
    //                     password:'',
    //                     errors: true
    //                 })
    //                 // localStorage.clear();
    //             }
    //         });
    // }
    handleSubmit = (event) => {
        event.preventDefault();

        const personal_user = {
            email: this.state.email,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            // user_profile: this.state.user_profile,
            user_profile: {
                gender : this.state.user_profile.gender,
                address : this.state.user_profile.address,
                date_of_birth : this.state.user_profile.date_of_birth,
                phone_number : this.state.user_profile.phone_number,
                emergency_contact : this.state.user_profile.emergency_contact,
            },
        };

        console.log(personal_user)
        // console.log(personal_user.user_profile.address)

        // const formData = new FormData();
        // formData.append('avatar', this.state.avatar, this.state.avatar.name);
        // formData.append('email',  this.state.email);
        // formData.append('first_name',  this.state.first_name);
        // formData.append('last_name',  this.state.last_name);
        // formData.append('date_of_birth',  this.state.user_profile.date_of_birth);
        // formData.append('phone_number',  this.state.user_profile.phone_number);
        // formData.append('emergency_contact',  this.state.user_profile.emergency_contact);

        // console.log(formData)

        // fetch('http://127.0.0.1:8000/tight/login/', {
        fetch('http://127.0.0.1:8000/api/v1/users/user', {
        // fetch('http://127.0.0.1:8000/api/token/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(personal_user)
            })
            .then(res => res.json())
            .then((data) => {
                // this.setState({ 
                //     email: data.email,
                //     first_name: data.first_name,
                //     last_name: data.last_name,
                //     user_profile: data.user_profile,
                    // user_profile: {
                    //     date_of_birth : data.user_profile.date_of_birth,
                    //     phone_number : data.user_profile.phone_number,
                    //     emergency_contact : data.user_profile.emergency_contact,
                    // },
                // })
                console.log(data)
                
            })
            .catch((err) => console.log(err))
    }

    render(){
        const { user } = this.context;
        const {  email, first_name, last_name, loading, user_profile } = this.state;

        return(
            <main>
                { loading === false && (
                    <div>
                        {/* <h1>Hello {first_name}</h1> */}
                        {/* <h4><Link to="/user/account" style={{ fontSize: "1em", textDecoration: "underline", color: "#898989" }} onClick={this.handleLogout}>back to your account</Link></h4> */}
                        <Link className="back_to_props" to={{ pathname: `/user/account`}}>
                            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 176.51 43.63" style={{ width: "8em"}}><defs></defs><line style={{fill:"none", strokeMiterLimit:10 }} className="cls-1" x1="0.1" y1="22.19" x2="176.51" y2="22.19"/><path d="M230.15,209.89a28.33,28.33,0,0,0,7.52-3,30.08,30.08,0,0,0,6.39-5,33.41,33.41,0,0,0,8.07-13.8l2.2.89a55.22,55.22,0,0,1-4.42,7.1,43.15,43.15,0,0,1-5.51,6.17,39.21,39.21,0,0,1-6.59,4.89,42.12,42.12,0,0,1-7.46,3.46Z" transform="translate(-230.15 -188.04)"/><path d="M230.3,209.88a34.86,34.86,0,0,1,8.06,2.49,28.15,28.15,0,0,1,7.08,4.55,31.86,31.86,0,0,1,5.54,6.43,43.81,43.81,0,0,1,4,7.63l-2.27.69a28.58,28.58,0,0,0-2.69-7.74,25.46,25.46,0,0,0-4.89-6.64,23.48,23.48,0,0,0-6.85-4.68,25.25,25.25,0,0,0-8.05-2Z" transform="translate(-230.15 -188.04)"/></svg>
                        </Link>
                        {/* <form onSubmit={this.handleSubmit} className="signup_form">  */}
                        {/* <div className="signup_page" style={{marginTop: "3em"}}> */}
                        <div className="signup_page">
                            { loading === false && <h2>Update your information</h2> }
                            <form className="signup_form" onSubmit={this.handleSubmit}> 
                                <div className="signup_form__div">
                                    <div className="signup_form__div__div">
                                        <label htmlFor="first_name" className="signup_form__div__div__label">First Name</label><br></br>
                                        <input className="signup_form__div__div__input" type="text" value={user.first_name} onChange={this.handleChange} name="first_name" placeholder="enter your first name"  required></input>
                                    </div>
                                    
                                    <div className="signup_form__div__div">
                                        <label htmlFor="last_name" className="signup_form__div__div__label">Last Name</label><br></br>
                                        <input className="signup_form__div__div__input" type="text" value={user.last_name} onChange={this.handleChange} name="last_name" placeholder="enter your last name"  required></input>   
                                    </div>
                                </div>

                                <div className="signup_form__div">
                                    <div className="signup_form__div__div">
                                        <label htmlFor="date_of_birth" className="signup_form__div__div__label">Date of Birth</label><br></br>
                                        <input className="signup_form__div__div__input" type="date" value={user.user_profile?.date_of_birth}  onChange={this.handleProfileChange} name="date_of_birth" placeholder="enter your date of birth"></input>
                                        {/* <DatePicker
                                            dateFormat="yyyy-MM-dd"
                                            selected={user_profile.date_of_birth}
                                            onChange={(date) => { this.setState({user_profile: {date_of_birth: date}}) }}
                                            date_of_birth={user_profile.date_of_birth}
                                            value={user_profile.date_of_birth}
                                            className="signup_form__div__div__input"
                                        /> */}
                                    </div>
                                    
                                    <div className="signup_form__div__div">
                                        <label htmlFor="email" className="signup_form__div__div__label">Email</label><br></br>
                                        <input className="signup_form__div__div__input" type="text" value={user.email} onChange={this.handleChange} name="email" placeholder="enter your email" required></input>
                                    </div>
                                    
                                    
                                </div>
                                <div className="signup_form__div">
                                    <div className="signup_form__div__div">
                                        <label htmlFor="phone_number" className="signup_form__div__div__label">Phone Number</label><br></br>
                                        <input className="signup_form__div__div__input" type="text" value={user.user_profile?.phone_number} onChange={this.handleProfileChange} name="phone_number" placeholder="enter your phone number"></input>   
                                    </div>
                                    
                                    <div className="signup_form__div__div">
                                        <label htmlFor="emergency_contact" className="signup_form__div__div__label">Emergency Contact</label><br></br>
                                        <input className="signup_form__div__div__input" type="text" value={user.user_profile?.emergency_contact} onChange={this.handleProfileChange} name="emergency_contact" placeholder="enter your emergency contact"></input>   
                                    </div>
                                </div>

                                <div className="signup_form__div">
                                    <div className="signup_form__div__div">
                                        <label htmlFor="gender" className="signup_form__div__div__label">Gender</label><br></br>
                                        <select name="gender" id="gender" required="False">
                                            <option>--- Choose your gender --- </option>
                                            <option value="Female" onChange={this.handleProfileChange}>Female</option>
                                            <option value="Male" onChange={this.handleProfileChange}>Male</option>
                                            <option value="Other" onChange={this.handleProfileChange}>Other</option>
                                            {/* <option value={user.user_profile?.gender} onChange={this.handleProfileChange}>Female</option> */}
                                            {/* <option value={user_profile?.gender} onChange={this.handleProfileChange}>{user_profile?.gender}</option> */}
                                        </select>
                                    </div>
                                    
                                    <div className="signup_form__div__div">
                                        <label htmlFor="avatar" className="signup_form__div__div__label">Address</label><br></br> 
                                        {/* <textarea rows={3} placeholder="enter your message here" value={user_profile} onChange={this.handleChange}></textarea>      */}
                                        <input className="signup_form__div__div__input"  type="text" value={user.user_profile?.address} onChange={this.handleProfileChange} name="address" placeholder="enter your address"></input>
                                        {/* <input type="file" className="signup_form__div__div__input" title=''  id="avatar" onChange={this.handleImageChange} name="avatar" style={{width:"70%"}}></input>    */}
                                        {/* <img src={user_profile?.avatar} alt="preview image" width="20px" /> */}
                                        {/* <span>{user_profile?.avatar[0].name}</span> */}
                                    </div>
                                    {/* <div className="signup_form__div__div">
                                        <label htmlFor="avatar" className="signup_form__div__div__label">Avatar</label><br></br> */}
                                        {/* <input  type="text" value={user_profile.emergency_contact} onChange={this.handleChange} name="emergency_contact" placeholder="enter your emergency contact"  required></input> */}
                                        {/* <input type="file" className="signup_form__div__div__input" title=''  id="avatar" onChange={this.handleImageChange} name="avatar" style={{width:"70%"}}></input>    */}
                                        {/* <img src={user_profile?.avatar} alt="preview image" width="20px" /> */}
                                        {/* <span>{user_profile?.avatar[0].name}</span> */}
                                    {/* </div> */}
                                </div>

            
                                

                                

                                {/* <input type="file"  value={user_profile.avatar} onChange={this.handleChange}></input> */}
                                <button type="submit" className="signup_form__button">Update Profile</button>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        )
    }
}