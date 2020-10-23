import React from "react";

import { PasswordForgetForm } from "../PasswordForget";
import PasswordChangeForm from "../PasswordChange";
import { AuthUserContext, withAuthorization } from "../Session";

class AccountPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    const userId = this.props.firebase.auth.currentUser.uid;
    this.props.firebase.user(userId).on("value", (snapshot) => {
      let user = snapshot.val();
      this.setState({ user });
    });
  }

  render() {
    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div className="edit-account">
            <h1>Welcome {this.state.user.username}!</h1>
            <h3>Email: {this.state.user.email}</h3>
            <h3>Edit Account Details</h3>
            <PasswordForgetForm />
            <PasswordChangeForm />
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(AccountPage);
