import { USER_ACTION_TYPES } from "./user.types";
import { createAction } from "../../utils/reducer/reducer.utils";


export const setCurrentUser = (user) => {                                     
    return    createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);             // Dispatching using our createAction helper function for dispathing 
    }

 
export const checkUserSession = () => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const googleSignInStart = () => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);
export const emailSigninStart = (email, password) => createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {email, password});

export const signInSuccess = (user) => createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user)
export const signInFailed = (error) => createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error)

export const signUpStart = (email, password, displayName) => createAction(USER_ACTION_TYPES.SIGN_UP_START, { email, password, displayName });
export const signUpSuccess = (user, additionalInformation) => createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalInformation });
export const signUpFailed = (error) => createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error);

export const signOutStart = () => createAction(USER_ACTION_TYPES.SIGN_OUT_START);
export const signOutSuccess = () => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);
export const signOutFailed = (error) => createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error);