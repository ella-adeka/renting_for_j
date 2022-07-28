import React, { Component } from "react";

export default class UserProfile extends Component{
    constructor(props){
        super(props);
    }

    showMenu (){
       
        console.log("yes")
    }

    
    render(){
        return(
            <main>
                <div>
                    <h1>Hello User!</h1>
                </div>
            </main>
        )
    }
}