import React, { useState, useEffect } from "react";
import poseData from "./poseData";

export default class PoseOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songSelected: "",
      image: 1,
    };
  }

  componentDidMount() {
    this.setState({ songSelected: this.props.song });
    const changeBackgroundImage = setInterval(async () => {
      if (this.state.image < 5) this.setState({ image: this.state.image + 1 });
      else clearInterval(changeBackgroundImage);
    }, 3500);
  }

  componentWillUnmount() {
    this.setState({ image: null });
  }

  render() {
    // console.log(
    //   "Image index",
    //   this.state.image,
    //   "AT time----->",
    //   new Date().getSeconds()
    // );
    // console.log("dance playing is-$-$-$-$-$-$-$-$-$", this.state.songSelected);
    return (
      <div>
        <header>
          <video
            style={{
              display: "flex",
              alignContent: "center",
              position: "absolute",
              marginTop: 20,
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zindex: -1,
              opacity: 0.5,
              width: 640,
              height: 480,
              backgroundColor: "white",
              backgroundImage: `url('./${this.state.songSelected}/${this.state.image}.jpg')`,
              backgroundPosition: "center",
              border: "10px solid limegreen",

              boxShadow: "0 0 0 10px deeppink",
            }}
          />
        </header>
      </div>
    );
  }
}
