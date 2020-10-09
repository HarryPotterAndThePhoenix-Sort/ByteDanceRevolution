import React from 'react';

import { withAuthorization } from '../Session';

function HomePage(props){
  console.log(props)
  return (
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
    <h3>:)</h3>
  </div>
)};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
