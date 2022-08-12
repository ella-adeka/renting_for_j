import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Reservation  from '../../components/Reservation';
import WishlistContext from "../../utils/context/wishlistContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faHeart,
    faBathtub,
    faBed,
    faUser,
} from '@fortawesome/free-solid-svg-icons';



export default class Properties extends Component{
    static contextType = WishlistContext;

    constructor(props){
        super(props);
        this.state =  {
            propertiesList: [],
           
        }
    }

    componentDidMount(){
        this.showProperties();
    }

    async showProperties(){
        axios
            .get('/api/properties')
            .then((res) => this.setState({ propertiesList: res.data }))
            .catch((err) => console.log(err))

        // const [ firstResponse, secondResponse ] = await Promise.all([
        //     axios.get('/api/properties/'),
        //     axios.get('/api/propertyImages/')
        // ])
        // this.setState(
        //     {propertiesList: firstResponse.data,
        //     propertyImagesList: secondResponse.data}
        // )
    }

    
    render(){
        const { propertiesList } = this.state;
        const {items, addToWishlist, removeFromWishlist } = this.context;

        let property;
        // const property = propertiesList.filter((property) => property.id == property.id).map((property) => (property.title))
        // for(let i = 0; i < propertiesList.length; i++){
        //     property = propertiesList[i].id;
        //     console.log(property);
        // }

        const propertyInWishlist = items.some(r=> propertiesList.includes(r))

        return(
            <main >
                <h1>Places to stay</h1>
                <h2 style={{ textAlign: "center", paddingBottom: "0.3em"}}>Places to stay</h2>
                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 176.51 43.63" onClick={() => {document.documentElement.scrollTop = 0;}} style={{ position: "fixed", bottom: "4em", right: "-1.8em" , width: "6em", transform: "rotate(90deg)", cursor: "pointer" }}><defs></defs><line style={{fill:"none", strokeMiterLimit:10 }} className="cls-1" x1="0.1" y1="22.19" x2="176.51" y2="22.19"/><path d="M230.15,209.89a28.33,28.33,0,0,0,7.52-3,30.08,30.08,0,0,0,6.39-5,33.41,33.41,0,0,0,8.07-13.8l2.2.89a55.22,55.22,0,0,1-4.42,7.1,43.15,43.15,0,0,1-5.51,6.17,39.21,39.21,0,0,1-6.59,4.89,42.12,42.12,0,0,1-7.46,3.46Z" transform="translate(-230.15 -188.04)"/><path d="M230.3,209.88a34.86,34.86,0,0,1,8.06,2.49,28.15,28.15,0,0,1,7.08,4.55,31.86,31.86,0,0,1,5.54,6.43,43.81,43.81,0,0,1,4,7.63l-2.27.69a28.58,28.58,0,0,0-2.69-7.74,25.46,25.46,0,0,0-4.89-6.64,23.48,23.48,0,0,0-6.85-4.68,25.25,25.25,0,0,0-8.05-2Z" transform="translate(-230.15 -188.04)"/></svg>

                <div className="properties_body">
                    <div>
                        {propertiesList.map((property, index) => (
                            <div key={index} className="properties_body__property" style={{ position: "relative"}}>
                                { propertyInWishlist ? <span><FontAwesomeIcon className="heart" icon={faHeart} size="lg" style={{ position: "absolute", marginLeft: "-1.5em",marginTop: "0.5em", zIndex: 1, color: "rgb(251, 70, 100)" }} /></span> : <span><FontAwesomeIcon className="heart" icon={faHeart} size="lg" style={{ position: "absolute", marginLeft: "95%",marginTop: "0.5em", zIndex: 1 }} onClick={() => {addToWishlist(property.id, property.bath, property.bed, property.bedroom, property.city, property.image,  property.max_guests, property.title, property.type, property.price, property.slug)}} /></span> }
                                <Link to={{ pathname: `/properties/${property.slug}/${property.id}` }}>
                                    <img src={property.image} alt={property.title}></img>
                                    <h2>{property.title}</h2>
                                    <span style={{ fontSize: "0.9em"}}>{property.type} in <Link to={{ pathname: `/cities/${property.city.toLowerCase()}`}} className="city_link">{property.city}</Link></span>
                                    <p style={{ fontSize: "0.9em", margin: "0 0 1em" }}>{property.max_guests} guests &#183; {property.bath}bath  &#183; {property.bed}bed &#183; {property.bedroom}bedroom </p>
                                    <h3><strong style={{ fontFamily: "'Gilda Display', serif", fontSize: "1.2em"}}> {property.price.toLocaleString("en-GB", {style:"currency", currency:"GBP"})}</strong><span style={{ fontSize: "0.8em", opacity: "0.5"}}>/night</span></h3>
                                </Link>
                            </div>
                        ))}
                        <br></br>
                        <p className="end-text">--- the end ---</p>
                    </div>
                </div>
            </main>
        )
    }
}
