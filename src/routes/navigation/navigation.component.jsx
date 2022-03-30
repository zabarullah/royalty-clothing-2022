import { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom'

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'

import './navigation.styles.scss'

const Navigation = () => {
    return (
        <Fragment>                                                    {/*Used instead of using just a parent div tag*/}
            <div className='navigation'>
                <Link className='logo-container' to='/'> <CrwnLogo className='logo' /> </Link>
                <div className='nav-links-container'> 
                 <Link className='nav-link' to='/shop'>SHOP</Link>
                 <Link className='nav-link' to='/shop'>SHOP</Link>
                 <Link className='nav-link' to='/shop'>SHOP</Link>
                 <Link className='nav-link' to='/shop'>SHOP</Link>
                </div>
            </div>
            <Outlet />                                                {/* Outlet here will render every other child or nested routes below the Navigation */}
        </Fragment>
    )
  }

export default Navigation; 