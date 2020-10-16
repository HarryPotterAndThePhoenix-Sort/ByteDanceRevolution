import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withAuthentication } from "../Session";
import Navigation from "../Navigation";
import HighScores from "../HighScores";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import WebcamComponent from "../Webcam";
import PoseData from "../Webcam/poseData";
import "./App.css";
import logo from "./arcade-font-writer.png";
import * as ROUTES from "../../constants/routes";

// const font =  "'Press Start 2P', cursive";

// const theme = createMuiTheme({
//   typography: {
//     fontFamily: font,
//     button: {textTransform: "none"}
//     }
//   });

const App = () => (
  // <ThemeProvider theme={theme}>
  <Router>
    <div className="background">
      <Navigation />
      <hr />
      <img src={logo} />
      <Route exact path={ROUTES.HIGH_SCORES} component={HighScores} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
      <Route path={ROUTES.WEBCAM} component={WebcamComponent} />
      <Route path={ROUTES.POSEDATA} component={PoseData} />
    </div>
  </Router>
  // </ThemeProvider>
);

export default withAuthentication(App);
