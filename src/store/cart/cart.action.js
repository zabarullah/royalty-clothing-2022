import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

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

export const setIsCartOpen = (boolean) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

// Helper action creater functions to manipulate the cart
export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);                      // newCartItems here will be later passed on to the updateCartItemReducer so that the newCartCount can be generated
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);               // newCartItems here will be later passed on to the updateCartItemReducer so that the newCartCount can be generated
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};  

export const clearItemFromCart = (cartItems, cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);                 // newCartItems here will be later passed on to the updateCartItemReducer so that the newCartCount can be generated
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}; 