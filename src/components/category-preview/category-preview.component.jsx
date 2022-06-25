import ProductCard from '../product-card/product-card.component';

import { CategoryPreviewContainer, Title, Preview } from './category-preview.styles'

const CategoryPreview = ({title, products}) => {
    return (
        <CategoryPreviewContainer>
            <h2>
                <Title to={title}> {title.toUpperCase()} </Title>
            </h2>
            <Preview>
                {                                                       // filter((_, idx) =>)  _ denotes the products and we will ignore it
                    products.filter((_, idx) => idx < 4)                // inx < 4 is to filter only 4 items (with the idx of 0,1,2 and 3) to show in preview 
                    .map((product) =>                                   // map through each prodoct
                    <ProductCard key={product.id} product={product} />  // display the product using ProductCard Component.
                    )
                }
            </Preview>
        </CategoryPreviewContainer>
    )
}

export default CategoryPreview;