import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faTwitter,
    faInstagram,
    faFacebook
  } from "@fortawesome/free-brands-svg-icons";

const SocialsBar = () => {
    return(
        <div className="socials_bar">
            {/* <h3> */}
                <span className="socials_bar__span"><a href="www.facebook.com"><FontAwesomeIcon  className='menu_bar__div__icon'   icon={faFacebook} /></a> </span> 
                <span className="socials_bar__span"><a href="www.instagram.com"><FontAwesomeIcon className='menu_bar__div__icon'   icon={faInstagram} /> </a> </span>
                <span className="socials_bar__span"><a href="www.twitter.com"><FontAwesomeIcon className='menu_bar__div__icon'   icon={faTwitter} /></a></span>
            {/* </h3> */}
        </div>
    )
}

export default SocialsBar;