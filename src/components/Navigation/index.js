import React from "react";
import { Link } from "react-router-dom";
import { AuthUserContext } from "../Session";
import SignOutButton from "../SignOut";

import * as ROUTES from "../../constants/routes";

import "./Navigation.css";

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {(authUser) => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
  <div className="auth-nav-container">

      <Link to={ROUTES.HOME}>Home</Link>
  
      <Link to={ROUTES.WEBCAM}>PLAY</Link>

      <Link to={ROUTES.EDITACCOUNT}>My Account</Link>
 
      <Link to={ROUTES.ACCOUNT}>My Saved Videos</Link>
 
      <Link to={ROUTES.HIGH_SCORES}>High Scores</Link>

      <SignOutButton />
  </div>
);

const NavigationNonAuth = () => (
  <ul className="nonauth-nav-container">
    <li>
      <Link to={ROUTES.HIGH_SCORES}>High Scores</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

export default Navigation;
