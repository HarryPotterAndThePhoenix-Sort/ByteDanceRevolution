import React from 'react';
import ReactPlayer from 'react-player'

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

    this.props.firebase.storage.child(userId).on('value', snapshot => {
      let url = snapshot.val()
      this.setState([url])
    })
  }

  render(){
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <div  className="container">
        <div>
          <div className="video">
          <ReactPlayer controls url={this.state.url} />
        </div>
          <h1>Username: {this.state.user.username}</h1>
          <h1>Email: {this.state.user.email}</h1>
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


