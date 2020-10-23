import React from "react";
import AllSongs from "../AllSongs";
import { withAuthorization } from "../Session";

import "./Home.css";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      user: {},
    };
  }

  async componentDidMount() {
    const userId = this.props.firebase.auth.currentUser.uid;
    this.props.firebase.user(userId).on("value", (snapshot) => {
      const user = snapshot.val();
      this.setState({ user });
    });
  }

  render() {
    return (
      <div className="Home">
        <h2 className='home-h2'>Welcome {this.state.user.username}!</h2>
        <p>
          Dance like no one is watching–<br /> because they’re not, <br />they’re checking
          their phones.
        </p>

        <h2 className='home-h2'>How to Play</h2>
        <p>
          Go to 'Play' in the menu, pick a song, and press Start.<br />
          Make sure your whole body is visible in your webcam.<br />
          Then follow along to the poses displayed!
        </p>
        <AllSongs />
      </div>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(HomePage);
