import { signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {

    const logGoogleUser = async () => {
     const {user} = await signInWithGooglePopup(); // grabs the user from the response of signInWithGooglePopup
     const userDocRef = await createUserDocumentFromAuth(user)            // pass in the user to the createUserDocumentFromAuth method So that the user is used as userAuth in this method, to always return a userDocRef.
    };

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
            <SignUpForm />
        </div>
    )
};

export default SignIn;