import { useContext } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
    history.replace('/auth');
  };

  return (
    <header className={classes.header}>
      <Link to='/' className={classes.logo}>
        Great Quote
      </Link>
      <nav className={classes.nav}>
        <ul>
          {!isLoggedIn && (
            <li>
              <NavLink to='/auth' activeClassName={classes.active}>
                Login
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <NavLink to='/quotes' activeClassName={classes.active}>
                All Quotes
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <NavLink to='/new-quote' activeClassName={classes.active}>
                Add Quotes
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
