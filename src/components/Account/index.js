import React from 'react';


import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext, withAuthorization } from '../Session'

import './Account.css'

class AccountPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      user: {},
      urls: []
    }
  }

  componentDidMount() {
    const userId = this.props.firebase.auth.currentUser.uid
    this.props.firebase.user(userId).on('value', snapshot => {
      let user = snapshot.val()
      this.setState({user})
    })

    this.props.firebase.db.ref(`urls/${userId}`).on('value', snapshot => {
      let urls = snapshot.val()
      let allUrls = Object.values(urls)
      this.setState({urls: allUrls})
    })
  }

  render(){
    console.log(this.state.urls)
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <div  className="container">
        <div>
          <h1>Welcome {this.state.user.username}!</h1>
          <div className="video">
          {
            this.state.urls.map(url => {
              return <video src={url} ></video>
            })
          }
        </div>
          <PasswordForgetForm />
          <PasswordChangeForm />
        </div>
        </div>
      )}
    </AuthUserContext.Consumer>
   )
  }
};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);


