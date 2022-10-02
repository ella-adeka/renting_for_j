import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { withUrlParams } from "../../utils/urlParams";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faHeart,
} from '@fortawesome/free-solid-svg-icons';
import MainNavigation from "../../components/Navigation/MainNavigation";


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
                <MainNavigation/>
                <div className="properties_body">
                {cities.filter((city) => city.slug == slug).map((city) => (
                    <div key={city.id}>
                        <h1>{city.city}</h1>
                        {properties.filter((property) => city.city == property.city).map(property => (
                             <div key={property.id} className="properties_body__property" style={{ position: "relative"}}>
                             {/* { propertyInWishlist ? <span><FontAwesomeIcon className="heart" icon={faHeart} size="lg" style={{ position: "absolute", marginLeft: "-1.5em",marginTop: "0.5em", zIndex: 1, color: "rgb(251, 70, 100)" }} /></span> : <span><FontAwesomeIcon className="heart" icon={faHeart} size="lg" style={{ position: "absolute", marginLeft: "95%",marginTop: "0.5em", zIndex: 1 }} onClick={() => {addToWishlist(property.id, property.bath, property.bed, property.bedroom, property.city, property.image,  property.max_guests, property.title, property.type, property.price, property.slug)}} /></span> } */}
                             <Link to={{ pathname: `/properties/${property.slug}/${property.id}` }}>
                                 <img src={property.image} alt={property.title}></img>
                                 <h2>{property.title}</h2>
                                 {/* <span style={{ fontSize: "0.9em"}}>{property.type} in <a href={ `/cities/${property.city.toLowerCase()}`}>{property.city}</a></span> */}
                                 <span style={{ fontSize: "0.9em"}}>{property.type} in <Link to={{ pathname: `/cities/${property.city.toLowerCase()}`}} className="city_link">{property.city}</Link></span>
                                 <p style={{ fontSize: "0.9em", margin: "0 0 1em" }}>{property.max_guests} guests &#183; {property.bath}bath  &#183; {property.bed}bed &#183; {property.bedroom}bedroom </p>
                                 <h3><strong style={{ fontFamily: "'Gilda Display', serif", fontSize: "1.2em"}}> {property.price.toLocaleString("en-GB", {style:"currency", currency:"GBP"})}</strong><span style={{ fontSize: "0.8em", opacity: "0.5"}}>/night</span></h3>
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