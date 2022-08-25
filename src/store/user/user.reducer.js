import { USER_ACTION_TYPES } from "./user.types";

// When we initialise our app, we have no currentUser. So we set the currentUser here. This initial state will be passed into the useReducer
const INITIAL_STATE = {
    currentUser: null
}

//Reducers return back an object. This object is the current state(i.e. currentUser). Reducer takes a state and and action, returning a new object(state). It is the context's equivalent of useState()  
export const userReducer = (state = INITIAL_STATE, action) => {                // Fore redux we must tell it here what the initial state is.
    // console.log('dispatch');
    // console.log(action);
    const { type, payload } = action;                                   // destructuring type and payload from the action in order to use it. Payload stores the value for that action type (i.e. later we set currentUser to the payload) 

    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:                        // if the type is SET_CURRENT_USER from the USER_ACTION_TYPES then:
            return{
                ...state,                                               // spreading through the previous state: sometimes we can have multiple state values like cart items, quantity, sizes etc, ...state brings in all the previous state that we ill not be changing but is needed to pass on to this new object(state). Other example of the use of state is if you want to update values like incrementing item count: itemCount: state.value + 1)
                currentUser: payload                                    // and anything after the previous state(...state), will be modified/updated (i.e. currenUser here will be set to what ever the payload is)
            }
        default:
            return state;                                               // if nothing changes then the state as it is, is returned back. when the state is not changed then this reducer will not need to run and thus no rendering
    }

}
