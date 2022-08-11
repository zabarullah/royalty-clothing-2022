// This function takes the action type and payload and returns back an object and will be used where we will be dispatching.
export const createAction = (type, payload) => ({ type, payload });