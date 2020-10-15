import React from 'react'

function FinalScore (props) {

    return (
        <div>
          <header>
            <div
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
                position: 'absolute',
                marginTop: 120,
                marginLeft: "auto",
                marginRight: "auto",
                left: 0,
                right: 0,
                textAlign: "center",
                zindex: -1,
                width: 400,
                height: 200,
                backgroundColor: "indigo",
                backgroundPosition: "center",
              }}>
              <h3
                style={{
                display: "flex",
                alignContent: "center",
                textAlign: 'center',
                color: 'white',

                }}
              >FinalScore: {props.score}</h3>
             {/* <button onClick={props.handleDownload}>Download video</button> */}
            </div>
          </header>
        </div>
      );

}

export default FinalScore