import { Fragment, useContext } from 'react';                   /* Context step 5 */
import { Outlet} from 'react-router-dom'
import { useSelector } from 'react-redux'

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'

import { CartContext } from '../../contexts/cart.context';
import { selectCurrentUser } from '../../store/user/user.selector';

import { signOutUser } from '../../utils/firebase/firebase.utils';  //  Context Step 7 - 

import {NavigationContainer, NavLinks, Navlink, LogoContainer} from './navigation.styles'

const Navigation = () => {
   const currentUser = useSelector(selectCurrentUser)
//    console.log(currentUser);                                                     // we have access to displayName and other details of the user.
   const { isCartOpen } = useContext(CartContext);

    return (
        <Fragment>                                                    {/*Used instead of using just a parent div tag*/}
            <NavigationContainer>
                <LogoContainer to='/'> <CrwnLogo className='logo' /> </LogoContainer>
                <NavLinks> 
                    {
                        currentUser ? (`You are logged in as ${currentUser.displayName.toUpperCase()},`) : null             // first we check if there is a currentUser and not a null, if we are signed in then it will show the user's Name, otherwise, nothing.
                    } 
                    <Navlink to='/shop'>SHOP</Navlink>
                    {
                        currentUser ? ( <Navlink as= 'span' onClick={signOutUser}> SIGN OUT</Navlink> ) : ( <Navlink to='/auth'>SIGN IN</Navlink> )  // Context Step 7 -  if there is a User signed in then it will show SIGNOUT otherwise it will show SIGN IN on the NAV Bar
                    }
                    <CartIcon />
                </NavLinks>
                {isCartOpen ? (<CartDropdown />) : null}
            </NavigationContainer>
            <Outlet />                                                {/* Outlet here will render every other child or nested routes below the Navigation */}
        </Fragment>
    )
  }

export default Navigation; 