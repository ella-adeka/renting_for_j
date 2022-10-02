import  React,{ createContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({children}){
    const [ items, setItems ] = useState([]);

    const addToWishlist = (id, bath, bed, bedroom, city, image,  max_guests, title, type, price, slug) => {
        setItems((prevState) => [...prevState, { id, bath, bed, bedroom, city, image,  max_guests, title, type, price, slug }]);

        let allItems = JSON.parse(localStorage.getItem("wishlist"))  || [];
        // allItems.push(id);
        allItems.push({ id, bath, bed, bedroom, city, image,  max_guests, title, type, price, slug });
        localStorage.setItem("wishlist", JSON.stringify(allItems));
    }

    const removeFromWishlist = (id) => {
        setItems((items) => items.filter(i => i == id));

        let getWishlistItem = JSON.parse(localStorage.getItem("wishlist"));
        getWishlistItem.splice(id,1);
        localStorage.setItem("wishlist", JSON.stringify(getWishlistItem));
        
    }

    useEffect(() => {
        localStorage.getItem("wishlist");
    }, []);

    return(
        <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    )
}

export default WishlistContext;