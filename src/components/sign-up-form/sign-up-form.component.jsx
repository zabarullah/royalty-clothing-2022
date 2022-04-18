import { useState } from "react";                       /*  Context step 6 */

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";



import "./sign-up-form.styles.scss"

//This object will be used to keep track of multiple fields from a form within this one object and passed onto the useState.
const defaultFormFields = {                         
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}


const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email , password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);                               // resets the form back to an empty string state
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();                                         // to prevent the default action of a form submit
        if (password !== confirmPassword) {
            alert("passwords do not match!");
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);

            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();                                          // to reset the form fields to empty string
        } catch (error) {
            if (error.code === 'auth/email-already-in-use'){
                alert('Cannot create user, email already in use');
            } else {
                console.log("user creation encountered an error:", error);
            }
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;                           // where name here is being destructured from the event from the onChange of the input field, where there is a key name(that is passed on here)
        
        setFormFields({...formFields, [name]: value})                   // pass in all the fields that haven't changed and for those that have changed ake name = to the value
    }
    
    return (
       <div className="sign-up-container">
           <h2>Don't have an account?</h2>
           <span>Sign up with your email and password</span>
           <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName} />   
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />   
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />   
                <FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />   
                <Button type="submit">Sign Up</Button>
           </form>
       </div> 
    )
};

export default SignUpForm;