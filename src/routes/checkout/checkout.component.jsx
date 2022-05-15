import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

const Checkout =() => {
    const {cartItems, addItemToCart} = useContext(CartContext); // Grabbing the cartItems from CartContext 
    return (
        <div>
            <h1>CHECKOUT PAGE</h1>
            <div>
                {
                   cartItems.map((cartItem) => {
                    const {id, name, quantity} = cartItem;   
                    return (
                       <div key={id}> 
                            <h2>{name}</h2>
                            <span>{quantity}</span>
                            <br />
                            <span>decrement</span>
                            <br />
                            <span onClick={() => addItemToCart(cartItem)}>increment</span>
                       </div>
                       )
                   }) 
                }
            </div>
        </div>
    )
}
export default Checkout;