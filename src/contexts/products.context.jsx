import { createContext, useState, useEffect } from "react";

import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils.js";

import SHOP_DATA from '../shop-data.js';

export const ProductsContext = createContext({
    products: [],
});

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {                                                       //Note this function is created to send the products and categories to the firestore databases and will be deleted from the code as soon as the collection (categories) is created.
        addCollectionAndDocuments('categories', SHOP_DATA);                 //name the collection will be categories and SHOP_DATA will be the objects we are trying to add
    }, [])                                                                  // this will run once and will grab all the categories from SHOP_DATA and run the function addCollectionAndDocuments function, which grabs each category and its items and commits it to firebase db
   
    const value = { products };
    return (
        <ProductsContext.Provider value={value}> {children} </ProductsContext.Provider>  
    );
};