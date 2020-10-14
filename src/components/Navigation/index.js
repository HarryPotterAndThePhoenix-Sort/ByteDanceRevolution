import React from "react";
import { Link } from "react-router-dom";
import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut'

import * as ROUTES from "../../constants/routes";

import './Navigation.css'

const Navigation = () => (
  <div>
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? <NavigationAuth /> : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>
</div>
);

const NavigationAuth = () => (
  <ul className="container">
    <li>
      <Link to={ROUTES.HIGH_SCORES}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>
    <li>
      <Link to={ROUTES.WEBCAM}>WebCam</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.HIGH_SCORES}>High Scores</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

export default Navigation;
