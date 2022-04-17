import { useState, useContext } from "react";   /*  Context step 3 */

import { signInWithGooglePopup, createUserDocumentFromAuth, signInUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { UserContext } from "../../contexts/user.context"; /*  Context step 3  */

import "./sign-in-form.styles.scss"

//This object will be used to keep track of multiple fields from a form within this one object and passed onto the useState.
const defaultFormFields = {                         
    email: '',
    password: '',
}


const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email , password } = formFields;

    const { setCurrentUser } = useContext(UserContext);                 //  Context step 3 - Grabs the context from UserContext and grabs the setter function SetCurrentUser

    const resetFormFields = () => {
        setFormFields(defaultFormFields);                               // resets the form back to an empty string state
    }

    const SignInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();                   // grabs the user from the response of signInWithGooglePopup
        await createUserDocumentFromAuth(user)                           // pass in the user to the createUserDocumentFromAuth method So that the user is used as userAuth in this method
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();                                         // to prevent the default action of a form submit

        try {
            const { user } = await signInUserWithEmailAndPassword(email, password);
            setCurrentUser(user);                                        // Context step 4 - Use the setter function we grabbed in step 3 here - after the auth has occurred, we use setCurrentUser() function and pass it the auth user - So currentUser is the auth user and set in the state within Provider  
            resetFormFields();
        } catch (error) {
            if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
            alert('incorrect email or password')
            } else {
            console.log("There was an issue",error)
            }
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;                           // where name here is being destructured from the event from the onChange of the input field, where there is a key name(that is passed on here)
        
        setFormFields({...formFields, [name]: value})                   // pass in all the fields that haven't changed and for those that have changed ake name = to the value
    }
    
    return (
       <div className="sign-up-container">
           <h2>Already have an account?</h2>
           <span>Sign in with your email and password</span>
           <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />   
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />   
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type='button' buttonType='google' onClick={SignInWithGoogle}>Google sign in</Button>   {/*here type='button' is used to prevent the default action of a button inside a form, which is to submit the form*/}
                </div>
           </form>
       </div> 
    )
};

export default SignInForm;