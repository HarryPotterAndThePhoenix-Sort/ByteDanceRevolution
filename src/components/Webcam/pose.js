import React from 'react'
import poseData from './poseData'

function PoseOverlay () {
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
                backgroundImage: "url(https://www.pngitem.com/pimgs/m/506-5068915_person-dancing-png-transparent-png.png)",
                backgroundPosition: "center"
              }}
            />
          </header>
        </div>
    )

}

export default PoseOverlay