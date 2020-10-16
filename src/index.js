import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import Firebase, { FirebaseContext } from './components/Firebase'
import * as serviceWorker from "./serviceWorker";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const font =  "'Press Start 2P', cursive";

const theme = createMuiTheme({
  typography: {
    fontFamily: font,
    button: {textTransform: "none"}
    }
  });


ReactDOM.render(
  <ThemeProvider theme={theme}>
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>
  </ThemeProvider>,
  
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


// import React from 'react';
 
// import  { FirebaseContext } from '../Firebase';
 
// const SomeComponent = () => (
//   <FirebaseContext.Consumer>
//     {firebase => {
//       return <div>I've access to Firebase and render something.</div>;
//     }}
//   </FirebaseContext.Consumer>
// );
 
// export default SomeComponent;