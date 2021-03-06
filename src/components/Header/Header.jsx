import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './header.css';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions';

/**
* @author
* @function Header
**/

const Header = (props) => {

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  return(
    <header className="header">
        <div style={{display: 'flex'}}>
          <Link to={'/'}>
            <div className="logo">Web Messenger</div>
          </Link>
            
            {
              !auth.authenticated ? 
              <ul className="leftMenu">
                <li><NavLink to={'/login'}>Login</NavLink></li>
                <li><NavLink to={'/signup'}>Sign up</NavLink></li>
              </ul> : null
            }
  
        </div>
        <Link to="/profile">
            <div style={{ color: '#fff', fontWeight: 'bold'}} className="userName">
              {auth.authenticated ? `${auth.firstName} ${auth.lastName}` : ''}
            </div>
          </Link>
          <ul className="menu">

            {
              auth.authenticated ?
              <li>
                <Link to={'#'} onClick={() => {
                  dispatch(logout(auth.uid))
                }}>Logout</Link>
            </li> : null
            }
        </ul>
    </header>
   )
 }

export default Header