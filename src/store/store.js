import { legacy_createStore as createStore } from "redux";
import { compose,  applyMiddleware } from "redux";
import logger from 'redux-logger';
// import { configureStore } from "@reduxjs/toolkit";

import  {rootReducer}  from "./root-reducer";

const middlewares = [logger];                                                               // we will be using the logger middleware from redux-logger. Middlewares catch actions before they hit the reducers, and in this case it will log out the state before it is passed on to a reducer    

const composeEnhancers = compose(applyMiddleware(...middlewares));                          //we will pass in the middlewares into applyMiddleware method, and then pass it into compose inorder to be able to use the middleware (composeEhancers)

export const store = createStore(rootReducer, undefined, composeEnhancers);             // composeEnhancers here is the middleware(s)as the third parameter that the store will use. The second parameter is not required so we will use undefined in this case.

