import  React,{ createContext, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({children}){
    const [ items, setItems ] = useState([]);

    const addToWishlist = (id, bath, bed, bedroom, city, image,  max_guests, title, type, price, slug) => {
        setItems((prevState) => [...prevState, { id, bath, bed, bedroom, city, image,  max_guests, title, type, price, slug }]);
    }

    const removeFromWishlist = (id) => {
        setItems((items) => items.filter(i => i == id));
    }

    return(
        <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    )
}

export default WishlistContext;