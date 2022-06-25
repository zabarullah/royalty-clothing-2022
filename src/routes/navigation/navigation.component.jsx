import { Fragment, useContext } from 'react';                   /* Context step 5 */
import { Outlet, Link } from 'react-router-dom'

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { UserContext } from '../../contexts/user.context';      /*  Context step 5 */
import { CartContext } from '../../contexts/cart.context';

import { signOutUser } from '../../utils/firebase/firebase.utils';  //  Context Step 7 - 

import {NavigationContainer, NavLinks, Navlink, LogoContainer} from './navigation.styles'

const Navigation = () => {
    const { currentUser } = useContext(UserContext);                //  Context step 5 - grab the currenUser Value now from the Provider(UserContext)
//    console.log(currentUser);                                       // should now log from our Navigation component the currentUser
    const { isCartOpen } = useContext(CartContext);

    return (
        <Fragment>                                                    {/*Used instead of using just a parent div tag*/}
            <NavigationContainer>
                <LogoContainer to='/'> <CrwnLogo className='logo' /> </LogoContainer>
                <NavLinks> 
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