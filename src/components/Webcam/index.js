import Webcam from "react-webcam";
import React, { useEffect, useRef, useState } from "react";
import * as posenet from "@tensorflow-models/posenet";
import { drawKeypoints, drawSkeleton } from "./utilities";
import { withAuthorization } from "../Session";
import PoseOverlay from "./poseOverlay";
import FinalScore from "./finalScore";
import { dance1Poses } from "./poses";
import "./Webcam.css";

function WebcamComponent(props) {
  // --------Get Current User---------------------
  const [user, setUser] = useState(null);
  const currentUserId = props.firebase.auth.currentUser.uid;
  useEffect(() => {
    props.firebase.user(currentUserId).on("value", (snapshot) => {
      let user = snapshot.val();
      setUser(user);
    });
  }, [props.firebase]);

  // -----set high score ------------ must still be invoked

  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    props.firebase
      .user(currentUserId)
      .child("scores")
      .child("dance1")
      .on("value", (snapshot) => {
        const highScoreObj = snapshot.val();
        setHighScore(highScoreObj.highScore);
      });
  }, []);

  // -----set high score ------------ must still be invoked
  const setUserHighScore = () => {
    if (currentScore > highScore) {
      props.firebase
        .user(currentUserId)
        .child("scores")
        .set({
          dance1: {
            highScore: currentScore,
          },
        });
    }
  };

  // ----------- Webcam Initialization -----------
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);

  //  ------------ Handle Data --------------------
  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  //  --------- Handle Start Capture Click ------------
  const handleStartCaptureClick = React.useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [handleDataAvailable, webcamRef, setCapturing, mediaRecorderRef]);

  // --------------- Handle Stop Capture ----------
  const handleStopCaptureClick = React.useCallback(() => {
    if (
      mediaRecorderRef.current.state !== "inactive" &&
      mediaRecorderRef.current.state !== "stopped"
    ) {
      mediaRecorderRef.current.stop();
    }
    setCapturing(false);
  }, [mediaRecorderRef, setCapturing]);

  
  // ------------ Load posenet---------------------
  const runPosenet = async () => {
    const net = await posenet.load({
      inputResolution: { width: 800, height: 480 },
      scale: 0.5,
    });
    //    Run function every second
    return detect(net);
  };

  // ------------ Detect ---------------------------
  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      //get video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      //set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      //make detections
      const pose = await net.estimateSinglePose(video, {flipHorizontal: true});
      await drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
      return pose;
      // console.log(pose)
    }
  };

  // ------------- Run PoseNet and Make Vectors ------
  async function makeVectors() {
    let vector = await runPosenet();
    let result = [];
    vector.keypoints.map((position) => {
      return result.push(position.position.x, position.position.y);
    });

    vector.keypoints.map((position) => {
      return result.push(position.score);
    });

    result.push(vector.score);
    // console.log("VECTOR:", vector, "RESULT:", result);
    return result;
  }

  // ----------------- Match Vectors ------------------
  function weightedDistanceMatching(poseVector1, poseVector2) {
    let vector1PoseXY = poseVector1.slice(0, 34);
    let vector1Confidences = poseVector1.slice(34, 51);
    let vector1ConfidenceSum = poseVector1.slice(51, 52);

    let vector2PoseXY = poseVector2.slice(0, 34);

    // First summation
    let summation1 = vector1ConfidenceSum;

    // Second summation
    let summation2 = 0;
    for (let i = 0; i < vector1PoseXY.length; i++) {
      let tempConf = Math.floor(i / 2);
      let tempSum =
        (vector1Confidences[tempConf] * 1) /
        Math.abs(vector1PoseXY[i] - vector2PoseXY[i]);
      summation2 = summation2 + tempSum;
    }
    return Math.round(summation1 * summation2 * 1000);
  }

  // ------ Setting State with Imported Dance Poses ---
  const [dancePoses, setdancePoses] = useState([]);
  useEffect(() => {
    setdancePoses(dance1Poses);
  }, []);

  let index = 0;
  const [score, setScore] = useState(0);
  let currentScore = 0;

  //----------------Click me --------------------------
  const handleClick = async (event, bpm) => {
    // console.log(
    //   "Time before PoseInterval------------>",
    //   new Date().getSeconds()
    // );
    event.preventDefault();
    // console.log(dancePoses);

    handleSongStart();
    handleStartCaptureClick();
    const audio = document.getElementById(song);
    audio.addEventListener("ended", (event) => {
      handleStopCaptureClick();
    });

    const poseInterval = setInterval(async () => {
      // console.log("Webcam index------------>", index);
      // console.log(
      //   "Webcam index------------>",
      //   index,
      //   "at time----->",
      //   new Date().getSeconds()
      // );
      const vector = await makeVectors();
      currentScore =
        currentScore + weightedDistanceMatching(vector, dancePoses[index++]);
      setScore(currentScore);
      // console.log('CURRENT SCORE ---->', currentScore)
      setUserHighScore();
      if (index === dance1Poses.length) clearInterval(poseInterval);
    }, 2000);
  };

  // ----------------- Draw Function ------------------
  const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeypoints(pose["keypoints"], 0.5, ctx);
    drawSkeleton(pose["keypoints"], 0.5, ctx);
  };

  // ------ Set Audio to State ----------------------
  const [song, setSong] = useState("song1");
  // no useEffect needed, setSong taken care of in onChange of <select>

  // ------Handle Song Start -----------------------
  const handleSongStart = React.useCallback(() => {
    const audio = document.getElementById(song);
    audio.volume = 0.2;
    audio.play();
  }, [song]);

  // ------Hand Song Stop ---------------------------
  const handleSongStop = React.useCallback(() => {
    const audio = document.getElementById(song);
    audio.pause();
    audio.currentTime = 0;
  }, [song]);

  return (
    <div>
      <div className="webcam-scores">
        <h3>Score: {score} </h3>
        <h3>HighScore: {highScore}</h3>
      </div>
      <div className="greeting">
        <h3>Dance {user ? user.username : null}!!!</h3>
      </div>
      <div className="controls">
        <div>{/* <span>4</span> */}</div>
        <div>
          <select
            value={song}
            onChange={(e) => {
              /* pausing the previous song */
              handleSongStop();

              /*changing the selected song value */
              setSong(e.target.value);
            }}
          >
            <option value="song1">Dance To The Future</option>
          </select>
        </div>
        <div>
          {capturing ? <div /> : <button onClick={handleClick}>START</button>}
        </div>
      </div>
      <div>
        <Webcam
          ref={webcamRef}
          style={{
            transform: 'rotateY(180deg)',
            position: "absolute",
            marginTop: 20,
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 3,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 3,
            width: 640,
            height: 480,
          }}
        />
        {capturing ? <PoseOverlay song={song} /> : <div />}
        {!capturing && recordedChunks.length ? (
          <FinalScore
            score={score}
            recordedChunks={recordedChunks}
            currentUserId={currentUserId}
            song={song}
          />
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(WebcamComponent);
