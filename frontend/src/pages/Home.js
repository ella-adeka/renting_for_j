import React, { Component } from "react";
import HomeNavigation from "../components/HomeNavigation";

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