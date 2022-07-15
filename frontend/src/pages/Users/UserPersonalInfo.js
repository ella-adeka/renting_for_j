import React, { Component } from "react";
import MainNavigation from "../../components/MainNavigation";

export default class UserPersonalInfo extends Component{
    constructor(props){
        super(props);
    }

    showMenu (){
       
        console.log("yes")
    }

    
    render(){
        return(
            <main>
                <MainNavigation />
                <div>
                    <h1>Hello User!</h1>
                </div>
            </main>
        )
    }
}