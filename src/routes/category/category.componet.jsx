import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectCategoriesMap } from '../../store/categories/category.selector';
import ProductCard from '../../components/product-card/product-card.component';

import { CategoryContainer, Title } from './category.styles';

const Category = () => {
    const { category } = useParams();                                                       // useParams allows us to get the value as an object from the route path(in shop.component)
    console.log('category component - render/re-rendering category component');
    const categoriesMap = useSelector(selectCategoriesMap);
    const [products, setProducts] = useState(categoriesMap[category]);                      // we need to call categoriesMap upon the category to get the products from the category
                                                                                            // we could use: const products = categoriesMap[category]  to get the products but this will happen each time this component re-renders, instead we deploy the useState & useEffect.

    useEffect(() => {
        console.log('category component - effect fired calling setProducts');
        setProducts(categoriesMap[category]);                                               // set the products within useEffect
    }, [category, categoriesMap]);                                                          //useEffect will run only if category and categoriesMap changes

    return (
        <Fragment>
            <Title>{category.toUpperCase()}</Title>

        <CategoryContainer>
            {  
                products &&                                                                 // since the categoriesMap is run asyncronously, when this component is run it has no products and an undfined error. So we must add a safe guard: if products has a value then render it(products && - part tests this)                                                           
                products.map((product) => (
                    <ProductCard key={product.id} product={product} />                      // map through the products to show each product within the ProductCard component
                    )
                )
            }
        </CategoryContainer>
        </Fragment>
    );
};

export default Category;