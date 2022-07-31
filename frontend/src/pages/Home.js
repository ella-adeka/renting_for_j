import React, { Component } from "react";
import HomeNavigation from "../components/Navigation/HomeNavigation";

export default class Home extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <main className="home">
                <HomeNavigation/>
            </main>
        )
    }
}