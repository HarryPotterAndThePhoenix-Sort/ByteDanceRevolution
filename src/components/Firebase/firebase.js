import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import secretsObj from "../../secrets";

const config = {
  apiKey: secretsObj.REACT_APP_API_KEY,
  authDomain: secretsObj.REACT_APP_AUTH_DOMAIN,
  databaseURL: secretsObj.REACT_APP_DATABASE_URL,
  projectId: secretsObj.REACT_APP_PROJECT_ID,
  storageBucket: secretsObj.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: secretsObj.REACT_APP_MESSAGING_SENDER_ID,
  appId: secretsObj.REACT_APP_ID,
  measurementId: secretsObj.REACT_APP_MEASUREMENT_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
    this.storage = app.storage()
  }

  // AUTH API

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
  doSignOut = () => this.auth.signOut();
  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  // USER API

  user = (uid) => this.db.ref(`users/${uid}`);

  users = () => this.db.ref("users");
}

export default Firebase;

// ADD TO SECRETS ETC
