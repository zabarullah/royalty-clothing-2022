import { createContext, useEffect, useReducer } from "react";  

import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";


export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

// 2. Action types and payload(payload is not required initially) are tracked in the object USER_ACTION_TYPES
export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

// 1. Reducers return back an object. This object is the current state(i.e. currentUser). Reducer takes a state and and action, returning a new object(state). It is the context's equivalent of useState()  
const userReducer = (state, action) => {
    console.log('dispatch');
    console.log(action);
    const { type, payload } = action;                                   // destructuring type and payload from the action in order to use it. Payload stores the value for that action type (i.e. later we set currentUser to the payload) 

    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:                        // if the type is SET_CURRENT_USER from the USER_ACTION_TYPES then:
            return{
                ...state,                                               // spreading through the previous state: sometimes we can have multiple state values like cart items, quantity, sizes etc, ...state brings in all the previous state that we ill not be changing but is needed to pass on to this new object(state). Other example of the use of state is if you want to update values like incrementing item count: itemCount: state.value + 1)
                currentUser: payload                                    // and anything after the previous state(...state), will be modified/updated (i.e. currenUser here will be set to what ever the payload is)
            }
        default:
            throw new Error(`Unknown action type ${type} in the userReducer`) // by default if a case type inthis reducer is not recognised in USER_ACTION_TYPES, then it will throw this error in the console.
    }

}

//3. When we initialise our app, we have no currentUser. So we set the currentUser here. This initial state will be passed into the useReducer
const INITIAL_STATE = {
    currentUser: null
}


export const UserProvider = ({children}) => {
    const [ state, dispatch ] = useReducer(userReducer, INITIAL_STATE);     // 4. we pass userReducer and the initial value of the state (INITIAL_STATE) to the useReducer. The userReducer give back two arguments, state object and the dispatch function.  The dispatch function is a function when called will be passed the action object. The userReducer will only receive the action when dispatched with the action 
   
    const { currentUser } = state;                                          // 5. we will destructure currentUser from the state
    console.log(currentUser);
    const setCurrentUser = (user) => {                                      // 6. setCurrentUser is defined as it is used later for the value. This function takes the user and 
        dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user })                 // 6. dispatch sends of the action type and payload of the user
    }
                                                                            //7. code below here was not changed from pre-Redux conversion.
    const value = {currentUser, setCurrentUser};

    useEffect(() => {
       const unsubscribe = onAuthStateChangedListener((user) => {
        if (user) {
            createUserDocumentFromAuth(user);                           // pass in the user to the createUserDocumentFromAuth method So that the user is used as userAuth in this method
        }
        setCurrentUser(user);
       })

       return unsubscribe;
    },[]);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

