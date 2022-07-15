import React, { Component } from "react";
import MainNavigation from "../components/MainNavigation";

export default class Contact extends Component{
    constructor(props){
        super(props);
    }

    
    render(){
        return(
            <main>
                <MainNavigation />
                <div>
                    <h1>Contact Us</h1>
                    {/* <h1>Say Hi!</h1> */}
                    {/* <h1>Say Hi!</h1> */}

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