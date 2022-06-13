import { BaseButton, GoogleSignInButton, InvertedButton } from "./button.styles"

/*
We have three types of buttons on the application:
Default button (note the default buttonType will not be inserted in the Object BUTTON_TYPES_CLASSES, so to use default button leave the buttonType on the button empty)
Inverted button (to use inverted button you will add to the Button itself the key buttonType='inverted')
Goggle sign in button (to use google button you will add to the Button itself the key buttonType='google')

So to be able to control the styling for the variations of buttons we will make an object with the properties and the class we want to use for each, and style in as per those different classes(each button will have its own classe as mentioned above. 
Each buttonType is passed into the BUTTON_TYPES_CLASSES[], within the className. 
*/

export const BUTTON_TYPES_ClASSES = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted'
}

const getButton = (buttonType =  BUTTON_TYPES_ClASSES.base) => (
    {
        [BUTTON_TYPES_ClASSES.base]: BaseButton,    
        [BUTTON_TYPES_ClASSES.google]: GoogleSignInButton,    
        [BUTTON_TYPES_ClASSES.inverted]: InvertedButton,    
    }[buttonType]
);

const Button = ({ children, buttonType, ...otherProps }) => {                                              // children here will be the elements inside the button like the <p> tag H1 tag etc for any possible button on the site. buttonType will be a string and ...otherProps will be other information like type submit
    const CustomButton = getButton(buttonType);
    return (
        <CustomButton {...otherProps}> {children} </CustomButton>
    )
};

export default Button;

