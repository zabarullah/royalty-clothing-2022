import { AnyAction } from "redux";

import { setCartItems, SetCartItems, setIsCartOpen } from "./cart.action";

import { CartItem } from "./cart.types";


export type CartState = {
    isCartOpen: boolean;
    cartItems: CartItem[];
}

export const CART_INITIAL_STATE: CartState = {
    isCartOpen: false,
    cartItems:[],

};

export const cartReducer = (state = CART_INITIAL_STATE, action: AnyAction): CartState => {                 // we no longer needed to destructure the type and payload from the action, we simply pass to the action the AnyAction type
    if(setIsCartOpen.match(action)) {
        return {
            ...state,
            isCartOpen: action.payload,                                                                     // we dont have payload destructuring so we type in where the payload is coming from
        };       
    }

    if(setCartItems.match(action)) {
        return {
            ...state,
            cartItems: action.payload,                                                                      // we dont have payload destructuring so we type in where the payload is coming from
        };        
    }

    return state;
};