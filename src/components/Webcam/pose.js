import React, { useState } from 'react'
import poseData from './poseData'

function PoseOverlay () {
  let [image, setImage] = useState(1)

  const test = () => {

    const changeBackgroundImage = setInterval(async () => {
      let background = document.getElementById(image)
      setImage(image === 4 ? 1: image++)
      return background
    }, 2000);

  }


    


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
                backgroundImage: "url('./ymca.gif')",
                backgroundPosition: "center"
              }}
            />
          </header>
        </div>
    )

}

export default PoseOverlay