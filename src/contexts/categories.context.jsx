import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";


export const CategoriesContext = createContext({
    categoriesMap: {},                                                  //empty object
});

export const CategoriesProvider = ({ children }) => {                   
    const [categoriesMap, setCategoriesMap] = useState({});             ////empty object is set to default otherwise we can not use the keys to grab the items later
    
    useEffect(() => {                                                   // IMPORTANT! when working with async functions inside a useEffect, we do not pass a async callback to it for example: useEffect(async () => {}). Instead, you must create within the annonymous function a new async function
        const getCategoriesMap = async () => {                          // new async function as explained above
           const categoryMap = await getCategoriesAndDocuments();       // run the async function getCategoriesAndDocument, await its results and pass to variable caregoryMap
           setCategoriesMap(categoryMap); 
        }
        getCategoriesMap();                                             // invoke the main function within the useEffect(getCategoriesMap)
    }, []);

    const value = { categoriesMap };
    return (
        <CategoriesContext.Provider value={value}> {children} </CategoriesContext.Provider>  
    );
};