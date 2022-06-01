import { useContext, useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';

import './category.styles.scss'

const Category = () => {
    const { category } = useParams();                                                       // useParams allows us to get the value as an object from the route path(in shop.component)
    const { categoriesMap } =  useContext(CategoriesContext);                                //grab categoriesMap from CategoriesContext
    const [products, setProducts] = useState(categoriesMap[category]);                      // we need to call categoriesMap upon the category to get the products from the category
                                                                                            // we could use: const products = categoriesMap[category]  to get the products but this will happen each time this component re-renders, instead we deploy the useState & useEffect.
    useEffect(() => {
        setProducts(categoriesMap[category]);                                               // set the products within useEffect
    }, [category, categoriesMap]);                                                          //useEffect will run only if category and categoriesMap changes

    return (
        <Fragment>
            <h2 className='category-title'>{category.toUpperCase()}</h2>

        <div className='category-container'>
            {  
                products &&                                                                 // since the categoriesMap is run asyncronously, when this component is run it has no products and an undfined error. So we must add a safe guard: if products has a value then render it(products && - part tests this)                                                           
                products.map((product) => (
                    <ProductCard key={product.id} product={product} />                      // map through the products to show each product within the ProductCard component
                    )
                )
            }
        </div>
        </Fragment>
    );
};

export default Category;