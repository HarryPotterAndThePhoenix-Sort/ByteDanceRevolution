import React from "react";
import './Landing.css'
import { withFirebase } from '../Firebase'

const Landing = (props) => {
  console.log(props)
  return (
  <div className="container">
    <h1>High Scores!!!</h1>
  </div>
)
  };

export default withFirebase(Landing);
