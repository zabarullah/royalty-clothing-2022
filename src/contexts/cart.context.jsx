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

// removing cart item from cartItems and decreasing quantity. if quantity becomes zero then it will remove item from cart
const removeCartItem = (cartItems, cartItemToRemove) => {
    // find the cart item to remove
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);
    
    // check if quanitity is equal to 1, if it is remove that item from the cart (using the filter method which creates a new filtered array, where the cartItems that are not equal to the cartItem that we wish to remove then it iwll remain in this array)
    if (existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
    }

    // if quantity is not equal to 1(tested above) then return back cartitems with matching cart item with reduced quantity
    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1 } : cartItem);

};

// to clear the cart
const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id); 
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems:[],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
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

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }    

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    } 

    const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount,};
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}