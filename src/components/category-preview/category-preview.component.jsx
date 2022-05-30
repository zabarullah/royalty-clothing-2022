import ProductCard from '../product-card/product-card.component';

import './category-preview.styles.scss'

const CategoryPreview = ({title, products}) => {
    return (
        <div className='category-preview-container'>
            <h2>
                <span className='title'>{title.toUpperCase()}</span>
            </h2>
            <div className='preview'>
                {                                                       // filter((_, idx) =>)  _ denotes the products and we will ignore it
                    products.filter((_, idx) => idx < 4)                // inx < 4 is to filter only 4 items (with the idx of 0,1,2 and 3) to show in preview 
                    .map((product) =>                                   // map through each prodoct
                    <ProductCard key={product.id} product={product} />  // display the product using ProductCard Component.
                    )
                }
            </div>
        </div>
    )
}

export default CategoryPreview;