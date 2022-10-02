import React, { Component, Fragment } from "react";
import axios from "axios";
import { withUrlParams } from "../utils/urlParams";

class Amenities extends Component {
    constructor(props){
        super(props);
        this.state = {
            amenities: [],
        }
    }

    componentDidMount(){
        this.showAmenities();
    }

     showAmenities(){
        axios
            .get('http://127.0.0.1:8000/amenities/amenities')
            .then((res) => this.setState({ amenities: res.data }))
            .catch((err) => console.log(err))
    }
        
    render(){
        const { amenities } = this.state;

        return(
            <main>
                <div>
                    <h1>Amenities</h1>

                        <Fragment>
                        { amenities?.length == 0 ? (
                                <div className="amenities">
                                    <h2>Attractions</h2> 
                                    <p>Sorry, no items available</p>
                                </div>
                            ) : (
                                <div className="amenities"><h2>Attractions</h2>  {amenities?.map((amenity, index) => (
                                    <li key={index}>{amenity.amenity}</li>
                                ))}</div>
                            )}
                        </Fragment>
                        <br></br>
                        
                    <br></br>
                </div>
            </main>
        )
    }
}

export default withUrlParams(Amenities);




                // {/* {amenities.attractions?.[0].amenity} */}

                //      {/* {amenities.amenity.length == 0 ? (
                //             ''
                //         ) : ( */}
                //         <div><h4>Atrractions</h4>  {amenities.bathroom?.map((amenity, index) => (
                //             <li key={index}>{amenity.amenity}</li>
                //         ))}</div>
                //     {/* )} */}
