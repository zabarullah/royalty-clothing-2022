import { useSelector, useDispatch } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart, clearItemFromCart, removeItemFromCart } from '../../store/cart/cart.action';

import { CheckoutItemContainer, ImageContainer, BaseSpan, Quantity, Arrow, Value, RemoveButton }from './checkout-item.styles'

const CheckoutItem = ({cartItem}) => {
    const {name, imageUrl, price, quantity} = cartItem;  // from each cartItem destructure name, imageUrkd, price and quantity
    const cartItems = useSelector(selectCartItems);   
    const dispatch = useDispatch();

    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));                // cartItems is also added as it is an action. Also we dispatched it. Same for below two lines
    const addItemHandler =() => dispatch(addItemToCart(cartItems, cartItem));
    const removeItemHandler =() => dispatch(removeItemFromCart(cartItems, cartItem));

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <BaseSpan>{name}</BaseSpan>
            <Quantity>
                <Arrow onClick={removeItemHandler}> &#10094; </Arrow>
                <Value>{quantity}</Value>    
                <Arrow onClick={addItemHandler}> &#10095; </Arrow>
            </Quantity>
            <BaseSpan>£{price * quantity}</BaseSpan>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
};

export default CheckoutItem;