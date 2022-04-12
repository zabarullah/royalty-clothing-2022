import "./button.styles.scss"

/*
We have three types of buttons on the application:
Default button (note the default buttonType will not be inserted in the Object BUTTON_TYPES_CLASSES, so to use default button leave the buttonType on the button empty)
Inverted button (to use inverted button you will add to the Button itself the key buttonType='inverted')
Goggle sign in button (to use google button you will add to the Button itself the key buttonType='google')

So to be able to control the styling for the variations of buttons we will make an object with the properties and the class we want to use for each, and style in as per those different classes(each button will have its own classe as mentioned above. 
Each buttonType is passed into the BUTTON_TYPES_CLASSES[], within the className. 
*/

const BUTTON_TYPES_ClASSES = {
    google: 'google-sign-in',
    inverted: 'inverted'
}


const Button = ({ children, buttonType, ...otherProps }) => {                                              // children here will be the elements inside the button like the <p> tag H1 tag etc for any possible button on the site. buttonType will be a string and ...otherProps will be other information like type submit
    return (
        <button className={`button-container ${BUTTON_TYPES_ClASSES[buttonType]}`} {...otherProps}> {children} </button>
    )
}

export default Button;

