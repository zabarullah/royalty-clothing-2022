import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";


const SignIn = () => {
const logGoogleUser = async () => {
    const {user} = await signInWithGooglePopup(); // grabs the user from the response of signInWithGooglePopup
    createUserDocumentFromAuth(user)            // pass in the user to the createUserDocumentFromAuth method So that the user is used as userAuth in this method.
   
}

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google Popup
            </button>
        </div>
    )
}

export default SignIn;