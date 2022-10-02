import React, { Component, Fragment } from "react";
import {  Link } from "react-router-dom";
import WishlistContext from "../../utils/context/wishlistContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faHeart,
    faShareAlt,
    faMapMarkerAlt,
    faCircleXmark,
    faEraser,
    faRemove,
    faX,
    faXmark
} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import MainNavigation from "../../components/Navigation/MainNavigation";

export default class Wishlist extends Component{
    static contextType = WishlistContext;

    constructor(props){
        super(props);
        this.state = {
            propertiesList: [],
        }
    }

    componentDidMount(){

    }

    showMenu (){
        console.log("yes")
    }

    
    render(){
        const { removeFromWishlist } = this.context;
        var items = JSON.parse(localStorage.getItem("wishlist") || "[]");


        return(
            <main>
                <MainNavigation/>
                    { items?.length == 0 ? (
                        <div className="wish_page">
                            <h2>Your wishlist is empty :(</h2>
                            <p>choose your favorites <Link to={{ pathname: '/properties' }}>here</Link> / go back <Link to={{ pathname: '/' }}>home</Link></p>
                            <p></p>
                        </div>
                    ) : (
                        <div className="properties_body">
                            <div>
                                <h1>Wishlist</h1>
                                <div className="the_head">
                                    <div className="des_likes"> 
                                        <p className="description" style={{ display: "inline-block", width: "50%"}}><FontAwesomeIcon  size="1x" icon={faHeart} style={{opacity:"0.3"}} /> {items.length} item{items.length > 1 ? "s" : ""} </p>
                                        <p  className="share_like" style={{ display: "inline-block", width: "50%", textAlign: "right", textDecoration: "underline", cursor: "pointer"}}>
                                            <span style={{borderRight: "none"}}><FontAwesomeIcon className="icon" size="1x" icon={faX} style={{ marginRight: "0.5em"}}  />Clear Wishlist</span>
                                            {/* <p><FontAwesomeIcon className="icon" size="1x" icon={faEraser} style={{ marginRight: "0.5em"}}  />Clear Wishlist</p> */}
                                        </p>
                                    </div>
                                </div>
                                {items.map((item, index) => (
                                    <div key={index} className="properties_body__property" style={{ position: "relative"}}>
                                        <span><FontAwesomeIcon className="heart" icon={faHeart} size="lg" style={{ position: "absolute", marginLeft: "95%",marginTop: "0.5em", zIndex: 1, color: "rgb(251, 70, 100)"  }} onClick={() => {removeFromWishlist(item.id)}} /></span>
                                        <Link to={{ pathname: `/properties/${item.slug}/${item.id}` }}>
                                            <img src={item.image} alt={item.title}></img>
                                            <h2>{item.title}</h2>
                                            {/* <span style={{ fontSize: "0.9em"}}>{item.type} in <a href={ `/cities/${item.city.toLowerCase()}`}>{item.city}</a></span> */}
                                            <span style={{ fontSize: "0.9em"}}>{item.type} in <Link to={{ pathname: `/cities/${item.city.toLowerCase()}`}} className="city_link">{item.city}</Link></span>
                                            <p style={{ fontSize: "0.9em", margin: "0 0 1em" }}>{item.max_guests} guests &#183; {item.bath}bath  &#183; {item.bed}bed &#183; {item.bedroom}bedroom </p>
                                            <h3><strong style={{ fontFamily: "'Gilda Display', serif", fontSize: "1.2em"}}> {item.price.toLocaleString("en-GB", {style:"currency", currency:"GBP"})}</strong><span style={{ fontSize: "0.8em", opacity: "0.5"}}>/night</span></h3>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )} 
            </main>
        )
    }
}