import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { withUrlParams } from "../../utils/urlParams";
import MainNavigation from "../../components/MainNavigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faHeart,
} from '@fortawesome/free-solid-svg-icons';


class City extends Component{
    constructor(props){
        super(props);
        this.state = {
            cities: [],
            properties: []
        }

        this.handleBackGrd = this.handleBackGrd.bind(this);
    }

    componentDidMount(){
        this.showCity();
        // this.handleBackGrd();
        
    }

   

    async showCity (){
         const [ firstResponse, secondResponse ] = await Promise.all([
            axios.get('/api/cities/'),
            axios.get('/api/properties/')
        ])
        this.setState(
            {cities: firstResponse.data,
            properties: secondResponse.data}
        )
    }

    handleBackGrd = () => {
        console.log("yes")
    }
    
    render(){

        const   {slug}  = this.props.params;
        const {cities, properties } = this.state;

        return(
            <main>
                <MainNavigation />
                <div className="properties_body">
                {cities.filter((city) => city.slug == slug).map((city) => (
                    <div key={city.id}>
                        <h1>{city.city}</h1>
                        {properties.filter((property) => city.city == property.city).map(property => (
                            <div key={property.id}>
                                <Link to={{ pathname: `/properties/${property.slug}/${property.id}`}}>
                                    <img src={property.image} alt={property.title}></img>
                                    <Link to={{ pathname: '/wishlist' }}><FontAwesomeIcon className="heart" icon={faHeart} size="lg"  style={{ position: "absolute", marginLeft: "-1.5em",marginTop: "0.5em", zIndex: 1}} /></Link>
                                    <h3>{property.title}</h3>
                                    <p>{property.type}</p>
                                    <br></br>
                                    <h4><strong> {property.price.toLocaleString("en-GB", {style:"currency", currency:"GBP"})}</strong> per night</h4>
                                    <br></br>
                                </Link>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            </main>
        )
    }
}

export default withUrlParams(City)