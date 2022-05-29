import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";


export const ProductsContext = createContext({
    products: [],
});

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {                                                   // IMPORTANT! when working with async functions inside a useEffect, we do not pass a async callback to it for example: useEffect(async () => {}). Instead, you must create within the annonymous function a new async function
        const getCategoriesMap = async () => {                          // new async function as explained above
           const categoryMap = await getCategoriesAndDocuments();       // run the async function getCategoriesAndDocument, await its results and pass to variable caregoryMap
           console.log(categoryMap);                                    // log the results of the functions results.
        }
        getCategoriesMap();                                             // invoke the main function within the useEffect(getCategoriesMap)
    }, []);

    const value = { products };
    return (
        <ProductsContext.Provider value={value}> {children} </ProductsContext.Provider>  
    );
};