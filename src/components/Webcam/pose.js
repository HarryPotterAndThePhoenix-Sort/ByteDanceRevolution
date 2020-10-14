import React, { useState, useEffect } from "react";
import poseData from "./poseData";
//import DancePoses from "../../DancePoses";
import img1 from "../../DancePoses/1.jpg";
import img2 from "../../DancePoses/2.jpg";
import img3 from "../../DancePoses/3.jpg";
import img4 from "../../DancePoses/4.jpg";

export default class PoseOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //images: [img1, img2, img3, img4],
      image: 1,
    };
  }

  componentDidMount() {
    const changeBackgroundImage = setInterval(async () => {
      if (this.state.image < 5) this.setState({ image: this.state.image + 1 });
      else clearInterval(changeBackgroundImage);
    }, 3500);
  }

  componentWillUnmount() {
    this.setState({ image: null });
  }

  render() {
    console.log("Image index", this.state.image);
    return (
      <div>
        <header>
          <video
            style={{
              display: "flex",
              alignContent: "center",
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zindex: -1,
              opacity: 0.5,
              width: 640,
              height: 480,
              backgroundColor: "violet",
              backgroundImage: `url('./${this.state.image}.jpg')`,
              backgroundPosition: "center",
            }}
          />
          {/* <img src={"./1.jpg"} /> */}
        </header>
      </div>
    );
  }
}
