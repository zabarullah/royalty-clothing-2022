import { useEffect } from 'react';
import { Routes, Route  } from 'react-router-dom';
import { useDispatch } from "react-redux";

import CatagoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.componet';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { setCategories } from '../../store/categories/category.action';

const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {                                                   
        const getCategoriesMap = async () => {                          
           const categoriesArray = await getCategoriesAndDocuments();   
           dispatch(setCategories(categoriesArray)); 
        }
        getCategoriesMap();                                             
    }, [dispatch]);

    return (
        <Routes>
            <Route index element={ <CatagoriesPreview /> } />    
            <Route path=':category' element={ <Category /> } />    {/* :category is the variable that we will use i.e. Hats, Jackets */}
        </Routes>
    );
}

export default Shop;