import { useState } from "react";   

import { signInWithGooglePopup, signInUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPES_ClASSES} from "../button/button.component";

import { SignInContainer, ButtonsContainer } from "./sign-in-form.styles"

//This object will be used to keep track of multiple fields from a form within this one object and passed onto the useState.
const defaultFormFields = {                         
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email , password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);                               // resets the form back to an empty string state
    }

    const SignInWithGoogle = async () => {
        await signInWithGooglePopup();                      
     };
    
    const handleSubmit = async (event) => {
        event.preventDefault();                                         // to prevent the default action of a form submit

        try {
            const { user } = await signInUserWithEmailAndPassword(email, password);
 
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
       <SignInContainer>
           <h2>Already have an account?</h2>
           <span>Sign in with your email and password</span>
           <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />   
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />   
                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button type='button' buttonType={BUTTON_TYPES_ClASSES.google} onClick={SignInWithGoogle}>Google sign in</Button>   {/*here type='button' is used to prevent the default action of a button inside a form, which is to submit the form*/}
                </ButtonsContainer>
           </form>
       </SignInContainer> 
    )
};

export default SignInForm;