import {  Fragment } from "react";
import { useSelector } from "react-redux";

import { selectCategoriesMap } from "../../store/categories/category.selector";

import CategoryPreview from "../../components/category-preview/category-preview.component";

const CatagoriesPreview = () => {
const categoriesMap = useSelector(selectCategoriesMap);
    return (
        <Fragment>
            {
                Object.keys(categoriesMap).map((title) => {                                 // we use Object.keys() passing it CategoriesMap so that it returns an array of key values(the titles for each category). .map then maps throught each title
                    const products = categoriesMap[title];                                  // assign the categoriesMap[title] to products 
                    return (<CategoryPreview key={title} title={title} products={products} />);      
                })                                        
            }
        </Fragment>
    );
}

export default CatagoriesPreview;