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

serviceWorker.unregister();
