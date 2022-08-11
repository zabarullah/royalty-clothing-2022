import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

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
    cartTotal: 0,
});

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems:[],
    cartCount: 0,
    cartTotal: 0,    
};

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

//Main Reducer
const cartReducer = (state, action) => {
    const { type, payload } = action;                           // destructer off type and payload from the action - the payload will have the carItems, cartCount and cartTotal

    switch(type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS :                 
            return {
                ...state,
                ...payload
            };
        case CART_ACTION_TYPES.SET_IS_CART_OPEN :
            return {
                ...state,
                isCartOpen: payload,
            };
        default:
            throw new Error(`Unknown type of ${type}` in cartReducer)
    }
}
export const CartProvider = ({ children }) => {
    const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE);     //userReducer takes the reducer and the initial state, from the useReducer we get the state and the dispatch. State here being the cartItems, isCartOpen, cartCount, cartTotal. we destructured them all in as we will need to pass them on the the context value later

    const updateCartItemsReducer = (newCartItems) => {
         // will keep track of the quantity of items in the cart(newCartCount)
         const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

         // will keep of the cart Total
         const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);

         //dispatch({ type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: { cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount }});
        // instead of above we can use the createAction function to help reduce chance of error etc:
        dispatch(                                                                                                                       // here we dispatch the action with the payload being the cartItems, cartTotal and cartCount
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount})     // note createAction is our helper function we created inside utils folder
        )
    };
    
    //4 Helper action creater functions to manipulate the cart
    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);                      // newCartItems here will be later passed on to the updateCartItemReducer so that the newCartCount can be generated
        updateCartItemsReducer(newCartItems);
    };
    
    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);               // newCartItems here will be later passed on to the updateCartItemReducer so that the newCartCount can be generated
        updateCartItemsReducer(newCartItems);
    };  
    
    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);                 // newCartItems here will be later passed on to the updateCartItemReducer so that the newCartCount can be generated
        updateCartItemsReducer(newCartItems);
    }; 

    // this function will create a new action that will dispatch the state for SET_IS_CART_OPEN. it takes a boolean value true or false
    const setIsCartOpen = (bool) => {
        //dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: bool })
         // instead of above we can use the createAction function to help reduce chance of error etc:
         dispatch(
            createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)                  // creates and dispatches a new action with its payload(the boolean in this case). // note createAction is our helper function we created inside utils folder
        )       
    }
    
    const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount, cartTotal,}; // context value
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
    
};