import { Routes, Route  } from 'react-router-dom';

import CatagoriesPreview from '../categories-preview/categories-preview.component';

import './shop.styles.scss';

const Shop = () => {
    return (
        <Routes>
            <Route index element={ <CatagoriesPreview /> } />    
        </Routes>
    );
}

export default Shop;