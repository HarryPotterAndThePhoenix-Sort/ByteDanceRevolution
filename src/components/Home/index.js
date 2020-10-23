import React from "react";
import ReactPlayer from "react-player";
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
    // const url = await this.props.firebase.storage
    //   .ref("users/")
    //   .child("0rsgwCPao6ewEB8wK4MfaeypzBx1/dance2")
    //   .getDownloadURL();
    // this.setState({ url });

    //  console.log(url)
  }

  render() {
    // console.log(this.state)
    return (
      <div className="Home">
        <h2 className='home-h2'>Welcome {this.state.user.username}!</h2>
        <h3>:)</h3>
        <p>
          Dance like no one is watching – because they’re not, they’re checking
          their phones.
        </p>
        <AllSongs />
        {/* <div className="video">
          <ReactPlayer controls url={this.state.url} />
        </div> */}
      </div>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(HomePage);
