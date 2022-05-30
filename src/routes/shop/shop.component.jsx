import { useContext } from "react";

import { CategoriesContext } from "../../contexts/categories.context";

import CategoryPreview from "../../components/category-preview/category-preview.component";

import './shop.styles.scss';

const Shop = () => {
    const { CategoriesMap } = useContext(CategoriesContext);

    return (
        <div className="shop-container">
            {
                Object.keys(CategoriesMap).map((title) => {                                 // we use Object.keys() passing it CategoriesMap so that it returns an array of key values(the titles for each category). .map then maps throught each title
                    const products = CategoriesMap[title];                                  // assign the categoriesMap[title] to products 
                    return (<CategoryPreview key={title} title={title} products={products} />);      
                })                                        
            }
        </div>
    );
}

export default Shop;