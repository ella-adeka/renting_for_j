import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Reservation  from '../../components/Reservation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faHeart,
    faBathtub,
    faBed,
    faUser,
} from '@fortawesome/free-solid-svg-icons';


export default class Properties extends Component{
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
        // const { propertyImagesList } = this.state;
        return(
            // <main style={{ overflow: "hidden", height: "100vh"}}>
            <main >
                {/* <MainNavigation /> */}
                <Reservation />

                    {/* <div className="the_head"> */}
                        <h1>Places to stay</h1>
                        {/* <h2>Places to stay</h2> */}
                        {/* <input type="text" placeholder="Search..."></input>
                    </div> */}
                    {/* <br></br> */}
                    <h2 style={{ textAlign: "center", paddingBottom: "0.3em"}}>Places to stay</h2>
                    {/* <input type="text" placeholder="Search..." style={{ textAlign: "center", paddingBottom: "0.1em"}}></input> */}
                <div className="properties_body">
                    {/* <br></br> */}
                    <div>
                        {propertiesList.map((property, index) => (
                            
                            <div key={index} className="properties_body__property" style={{ position: "relative"}}>
                                <Link to={{ pathname: `/properties/${property.slug}/${property.id}` }}>
                                    <img src={property.image} alt={property.title}></img>
                                    <Link to={{ pathname: '/wishlist'}}><FontAwesomeIcon className="heart" icon={faHeart} size="lg" style={{ position: "absolute", marginLeft: "-1.5em",marginTop: "0.5em", zIndex: 1 }} /></Link>                                    
                                    <h3>{property.title}</h3>
                                    <span style={{ fontSize: "0.9em"}}>{property.type} in <Link to={{ pathname: `/cities/${property.city.toLowerCase()}`}} className="city_link">{property.city}</Link></span>
                                    <br></br>
                                    <br></br>
                                    {/* <p><FontAwesomeIcon  icon={faUser} />{property.max_guests} guests &#183;  <FontAwesomeIcon  icon={faBathtub} />{property.bath} bath <FontAwesomeIcon  icon={faBed} />{property.bed} bed  <FontAwesomeIcon  icon={faBed} />{property.bedroom} bedroom </p> */}
                                    {/* <p><FontAwesomeIcon  icon={faUser} /> {property.max_guests}  &#183;   <FontAwesomeIcon  icon={faBathtub} /> {property.bath} &#183;  <FontAwesomeIcon  icon={faBed} /> {property.bed} &#183;   <FontAwesomeIcon  icon={faBed} />{property.bedroom} &#183;  </p> */}
                                    {/* <p><FontAwesomeIcon  icon={faUser}  /> {property.max_guests}  &#183;   <FontAwesomeIcon  icon={faBathtub} /> {property.bath} &#183;  <FontAwesomeIcon  icon={faBed} /> {property.bed}    </p> */}
                                    <p>{property.max_guests} guests &#183; {property.bath}bath  &#183; {property.bed}bed &#183; {property.bedroom}bedroom </p>
                                    {/* <p><FontAwesomeIcon  icon={faUser} />{property.max_guests} guests  <FontAwesomeIcon  icon={faBed} /> <FontAwesomeIcon  icon={faBathtub} />{property.highlights?.map((highlights, index) => (
                                        <span key={index} style={{ padding: "0.5em"}}>{highlights}</span>
                                        ))}
                                    </p> */}
                                    {/* <span>{property.is_available === true ? <p>Available</p> : <p>Unavailable</p> }</span> */}
                                    {/* <br></br> */}
                                    <br></br>
                                    <h3><strong style={{ fontFamily: "'Gilda Display', serif", fontSize: "1.2em"}}> {property.price.toLocaleString("en-GB", {style:"currency", currency:"GBP"})}</strong><span style={{ fontSize: "0.8em", opacity: "0.5"}}>/night</span></h3>
                                    <br></br>
                                </Link>
                            </div>
                        ))}
                        <br></br>
                    </div>
                    <p className="end-text">--- the end ---</p>
                    <div></div>
                </div>
            </main>
        )
    }
}


// <h1>Property Images</h1>
//                     {propertyImagesList.map((propertyImage) => (
//                         <div key={propertyImage.id}>
//                             <p>{propertyImage.property}</p>
//                             <img src={propertyImage.images} alt={propertyImage.property} width="200" />
//                             {/* {propertyImage.images.map((image) => (
//                                 <img src={image}  width="200" />   
//                             ))}; */}
//                         </div>
//                     ))}

//                     <br></br>