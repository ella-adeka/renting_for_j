import React, { Component } from "react";
import {  Link } from "react-router-dom";
import WishlistContext from "../../utils/context/wishlistContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faHeart
} from '@fortawesome/free-solid-svg-icons';

export default class Wishlist extends Component{
    static contextType = WishlistContext;

    constructor(props){
        super(props);
    }

    showMenu (){
        console.log("yes")
    }

    
    render(){
        const {items} = this.context;

        return(
            <main>
                <div className="properties_body">
                    <div>
                        <h1>Wishlist</h1>
                        {items.map((item, index) => (
                            <div key={index} className="properties_body__property" style={{ position: "relative"}}>
                                <Link to={{ pathname: `/properties/${item.slug}/${item.id}` }}>
                                    <img src={item.image} alt={item.title}></img>
                                    <Link to={{ pathname: '/wishlist'}}><FontAwesomeIcon className="heart" icon={faHeart} size="lg" style={{ position: "absolute", marginLeft: "-1.5em",marginTop: "0.5em", zIndex: 1 }} /></Link>                                    
                                    <h3>{item.title}</h3>
                                    <span style={{ fontSize: "0.9em"}}>{item.type} in <Link to={{ pathname: `/cities/${item.city.toLowerCase()}`}} className="city_link">{item.city}</Link></span>
                                    <br></br>
                                    <br></br>
                                    {/* <p><FontAwesomeIcon  icon={faUser} />{property.max_guests} guests &#183;  <FontAwesomeIcon  icon={faBathtub} />{property.bath} bath <FontAwesomeIcon  icon={faBed} />{property.bed} bed  <FontAwesomeIcon  icon={faBed} />{property.bedroom} bedroom </p> */}
                                    {/* <p><FontAwesomeIcon  icon={faUser} /> {property.max_guests}  &#183;   <FontAwesomeIcon  icon={faBathtub} /> {property.bath} &#183;  <FontAwesomeIcon  icon={faBed} /> {property.bed} &#183;   <FontAwesomeIcon  icon={faBed} />{property.bedroom} &#183;  </p> */}
                                    {/* <p><FontAwesomeIcon  icon={faUser}  /> {property.max_guests}  &#183;   <FontAwesomeIcon  icon={faBathtub} /> {property.bath} &#183;  <FontAwesomeIcon  icon={faBed} /> {property.bed}    </p> */}
                                    <p>{item.max_guests} guests &#183; {item.bath}bath  &#183; {item.bed}bed &#183; {item.bedroom}bedroom </p>
                                    {/* <p><FontAwesomeIcon  icon={faUser} />{property.max_guests} guests  <FontAwesomeIcon  icon={faBed} /> <FontAwesomeIcon  icon={faBathtub} />{property.highlights?.map((highlights, index) => (
                                        <span key={index} style={{ padding: "0.5em"}}>{highlights}</span>
                                        ))}
                                    </p> */}
                                    {/* <span>{property.is_available === true ? <p>Available</p> : <p>Unavailable</p> }</span> */}
                                    {/* <br></br> */}
                                    <br></br>
                                    <h3><strong style={{ fontFamily: "'Gilda Display', serif", fontSize: "1.2em"}}> {item.price.toLocaleString("en-GB", {style:"currency", currency:"GBP"})}</strong><span style={{ fontSize: "0.8em", opacity: "0.5"}}>/night</span></h3>
                                    <br></br>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        )
    }
}