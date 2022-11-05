import { CART_ACTION_TYPES } from "./cart.types";

export const CART_INITIAL_STATE = {
    isCartOpen: false,
    cartItems:[],

};

export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;                           // destructer off type and payload from the action - the payload will have the carItems, cartCount and cartTotal

    switch(type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS :                 
            return {
                ...state,
                cartItems: payload,
            };
        case CART_ACTION_TYPES.SET_IS_CART_OPEN :
            return {
                ...state,
                isCartOpen: payload,
            };
        default:
            return state;
    }
}