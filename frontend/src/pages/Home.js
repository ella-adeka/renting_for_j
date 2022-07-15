import React, { Component } from "react";
// import { Link } from "react-router-dom";
import HomeNavigation from "../components/HomeNavigation";

export default class Home extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <main className="home">
                {/* <h1>Home</h1> */}
              
                <HomeNavigation/>

                            
                   
                {/* <Link  to={{ pathname: '/amenities'}}>Amenities</Link> */}
            </main>
        )
    }
}