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
  <ul className="auth-nav-container">
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.WEBCAM}>PLAY</Link>
    </li>
    <li>
      <Link to={ROUTES.EDITACCOUNT}>My Account</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>My Saved Videos</Link>
    </li>
    <li>
      <Link to={ROUTES.HIGH_SCORES}>High Scores</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
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
