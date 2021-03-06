import React from "react";
import { AuthUserContext, withAuthorization } from "../Session";

import "./Account.css";

class AccountPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      urls: [],
    };
  }

  componentDidMount() {
    const userId = this.props.firebase.auth.currentUser.uid;
    this.props.firebase.user(userId).on("value", (snapshot) => {
      let user = snapshot.val();
      this.setState({ user });
    });

    this.props.firebase.db.ref(`urls/${userId}`).on("value", (snapshot) => {
      let urls = snapshot.val();
      if (urls !== null && urls !== undefined) {
        let allUrls = Object.values(urls);
        this.setState({ urls: allUrls });
      }
    });
  }

  render() {
    console.log(this.state.urls);
    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div className="acc-container">
            <div>
              <h2 className="acc-header">
                Welcome {this.state.user.username}!
              </h2>
              <div className="video">
                {this.state.urls.length > 0 ? (
                  this.state.urls.map((url, index) => {
                    return (
                      <video
                        style={{
                          padding: 20,
                          height: 200,
                          width: 320,
                          margin: "auto",
                        }}
                        key={index}
                        src={url}
                        controls
                      ></video>
                    );
                  })
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(AccountPage);
