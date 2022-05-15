import { createContext, useState, useEffect } from "react";

// adding item to cartItems and adding Quantity if the item is already listed in cartItems
const addCartItem = (cartItems, productToAdd) => {
    //find if cartItems already contains the productToAdd  
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    //if existingCartItem returns true, check again if cartItem's id matches with productToAdd's id, if matches then return a new array but also add 1 to quantity for that cartItem, otherwise, just return the cartItem 
    if (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1 } : cartItem);
    }
    // return new array with modified cartItems/new cart item
    return [...cartItems, { ...productToAdd, quantity: 1 }];
} 

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems:[],
    addItemToCart: () => {},
    cartCount: 0
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    // will keep track of the quantity of items in the cart
    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);        
    },[cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount };
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}