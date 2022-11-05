import { useDispatch, useSelector } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart } from '../../store/cart/cart.action';

import Button, { BUTTON_TYPES_ClASSES } from '../button/button.component';

import './product-card.styles.scss';


const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product;                                             // grabs the name, price and imageUrl from each product
    const cartItems = useSelector(selectCartItems)
    const dispatch = useDispatch();


    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));                      // pass in the product to the function addItemToCart, this function will run when the button is clicked, dispatch the action creator

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