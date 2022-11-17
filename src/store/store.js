import { legacy_createStore as createStore } from "redux";
import { compose,  applyMiddleware } from "redux";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import  {rootReducer}  from "./root-reducer";
import { loggerMiddleware } from "./middleware/logger";

import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";

const persistConfig = {
    key: 'root',
    storage: storage,
    //blacklist: ['user'],
    whitelist: ['cart'],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middlewares = [process.env.NODE_ENV !== 'production' && loggerMiddleware, sagaMiddleware].filter(Boolean);           // we will be using the logger middleware from redux-logger. Middlewares catch actions before they hit the reducers, and in this case it will log out the state before it is passed on to a reducer. It will only run middleware if the node environment is development or other environments and not whilst in production, as we dont want the logger to console log  in 'production' environment.    

//const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;   // This allows to use the redux Devtools extension compose in the browser (instead of the redux's compose) if it is installed if not then it will just default to redux's compose

const composeEnhancers = compose(applyMiddleware(...middlewares));                          //Changing back to compose, to use redux logger. we will pass in the middlewares into applyMiddleware method, and then pass it into compose inorder to be able to use the middleware (composeEhancers)

export const store = createStore(persistedReducer, undefined, composeEnhancers);             // composeEnhancers here is the middleware(s)as the third parameter that the store will use. The second parameter is not required so we will use undefined in this case.

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);