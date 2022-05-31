import { Routes, Route  } from 'react-router-dom';

import CatagoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.componet';

import './shop.styles.scss';

const Shop = () => {
    return (
        <Routes>
            <Route index element={ <CatagoriesPreview /> } />    
            <Route path=':category' element={ <Category /> } />    {/* :category is the variable that we will use i.e. Hats, Jackets */}
        </Routes>
    );
}

export default Shop;