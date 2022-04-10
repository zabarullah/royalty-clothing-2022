import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import { auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";



const SignIn = () => {
    useEffect(async() => {
        const response = await getRedirectResult(auth);
//        console.log(response);
        if (response) {
            const userDocRef = await createUserDocumentFromAuth(response.user)    
        }
    }, []);

    const logGoogleUser = async () => {
     const {user} = await signInWithGooglePopup(); // grabs the user from the response of signInWithGooglePopup
     const userDocRef = await createUserDocumentFromAuth(user)            // pass in the user to the createUserDocumentFromAuth method So that the user is used as userAuth in this method, to always return a userDocRef.
   
};


    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
            <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>
        </div>
    )
};

export default SignIn;