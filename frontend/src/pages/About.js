import React, { Component } from "react";
import MainNavigation from "../components/Navigation/MainNavigation";

export default class About extends Component{
    constructor(props){
        super(props);
    }

    showMenu (){
       
        console.log("yes")
    }

    
    render(){
        return(
            <main className="about-us">
                <MainNavigation  />
                <div className="about-us__div">
                    <h1 className="about-us__div__header">About Us</h1>
                    <p className="about-us__div__whoweare">We prioritize a <br></br>cozy & warm <br></br>environment.</p>
                    <p className="about-us__div__para">lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    {/* <p className="about-us__div__para">lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> */}
                </div>
            </main>
        )
    }
}