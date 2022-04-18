import { Fragment, useContext } from 'react';                   /* Context step 5 */
import { Outlet, Link } from 'react-router-dom'

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { UserContext } from '../../contexts/user.context';      /*  Context step 5 */

import { signOutUser } from '../../utils/firebase/firebase.utils';  //  Context Step 7 - 

import './navigation.styles.scss'

const Navigation = () => {
    const { currentUser } = useContext(UserContext);                //  Context step 5 - grab the currenUser Value now from the Provider(UserContext)
//    console.log(currentUser);                                       // should now log from our Navigation component the currentUser

    return (
        <Fragment>                                                    {/*Used instead of using just a parent div tag*/}
            <div className='navigation'>
                <Link className='logo-container' to='/'> <CrwnLogo className='logo' /> </Link>
                <div className='nav-links-container'> 
                 <Link className='nav-link' to='/shop'>SHOP</Link>
                 {
                    currentUser ? ( <span className='nav-link' onClick={signOutUser}> SIGN OUT</span> ) : ( <Link className='nav-link' to='/auth'>SIGN IN</Link> )  // Context Step 7 -  if there is a User signed in then it will show SIGNOUT otherwise it will show SIGN IN on the NAV Bar
                 }
                 <Link className='nav-link' to='/shop'>SHOP</Link>
                 <Link className='nav-link' to='/shop'>SHOP</Link>
                </div>
            </div>
            <Outlet />                                                {/* Outlet here will render every other child or nested routes below the Navigation */}
        </Fragment>
    )
  }

export default Navigation; 