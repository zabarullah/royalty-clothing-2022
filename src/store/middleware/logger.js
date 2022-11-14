export const loggerMiddleware = (store) => (next) => (action) => {
    if(!action.type) {
        return next(action);
    }
    console.log('LoggerMiddleware: type: ', action.type);
    console.log('LoggerMiddleware: payload: ', action.payload);
    console.log('LoggerMiddleware: currentState:', store.getState());

    next(action);
    
    console.log('LoggerMiddleware: next state: ', store.getState());
};