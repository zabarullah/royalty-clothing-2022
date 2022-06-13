import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import Button, { BUTTON_TYPES_ClASSES } from '../button/button.component';

import './product-card.styles.scss';


const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product;                                  // grabs the name, price and imageUrl from each product
    const { addItemToCart } = useContext(CartContext);                          // Grab the addItemToCart function from cartContext, so that it can be used when the button is clicked

    const addProductToCart = () => addItemToCart(product);                      // pass in the product to the function addItemToCart, this function will run when the button is clicked

    return (
    <div className='product-card-container'>
        <img src={imageUrl} alt={`${name}`} />
        <div className='footer'>
            <span className='name'>{name}</span>
            <span className='price'>{price}</span>
        </div>
        <Button buttonType={BUTTON_TYPES_ClASSES.inverted} onClick={addProductToCart}>Add to Cart</Button>
    </div>  
    );  
};

export default ProductCard;