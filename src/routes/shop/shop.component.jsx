import { useContext, Fragment } from "react";

import { CategoriesContext } from "../../contexts/categories.context";

import ProductCard from "../../components/product-card/product-card.component";
import './shop.styles.scss';

const Shop = () => {
    const { CategoriesMap } = useContext(CategoriesContext);

    return (
        <Fragment>
            {
                Object.keys(CategoriesMap).map((title) => (                                 // we use Object.keys() passing it CategoriesMap so that it returns an array of key values(the titles for each category). .map then maps throught each title
                    <Fragment key={title}>                                                  {/* for each title we will assign it to a key */ }
                        <h2>{title}</h2>                                                    {/* to show the title of each category*/ }
                        <div className="products-container">
                            {
                                CategoriesMap[title].map((product) => (                     //we have the object(CategoriesMap which has the key values of title), now we will map through each key to find its products
                                    <ProductCard key={product.id} product={product} />
                                ))
                            }
                        </div>
                    </Fragment>                       
                ))                                        
            }
        </Fragment>
    );
}

export default Shop;