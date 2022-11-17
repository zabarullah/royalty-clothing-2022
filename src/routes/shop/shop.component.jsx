import { useEffect } from 'react';
import { Routes, Route  } from 'react-router-dom';
import { useDispatch } from "react-redux";

import CatagoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.componet';
import { fetchCategoriesAsync } from '../../store/categories/category.action';                  // instead of pre-thunk setCategories

const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {                                                   
        dispatch(fetchCategoriesAsync()); 
    }, []);

    return (
        <Routes>
            <Route index element={ <CatagoriesPreview /> } />    
            <Route path=':category' element={ <Category /> } />    {/* :category is the variable that we will use i.e. Hats, Jackets */}
        </Routes>
    );
}

export default Shop;