import React from 'react'

function PoseOverlay () {
    return (
        <div>
           <header>
            <div
              style={{
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
              }}
            />
          </header>
        </div>
    )

}

export default PoseOverlay