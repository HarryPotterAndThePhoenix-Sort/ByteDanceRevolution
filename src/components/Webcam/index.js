import Webcam from "react-webcam";
import React, { useEffect, useRef, useState } from "react";
import * as posenet from "@tensorflow-models/posenet";
import { drawKeypoints, drawSkeleton } from "./utilities";
import { withAuthorization } from "../Session";
import Audio from "../Audio";
import PoseOverlay from "./pose"
import { dance1Poses } from "./poses";

function WebcamComponent(props) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const userId = props.firebase.auth.currentUser.uid;
    props.firebase.user(userId).on("value", (snapshot) => {
      let user = snapshot.val();
      setUser(user);
    });
  }, []);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);

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
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = React.useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const handleDownload = React.useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      props.firebase.storage
        .ref()
        .child("users")
        .child(props.firebase.auth.currentUser.uid)
        .child("dance2")
        .put(blob);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "react-webcam-stream-capture.webm";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  //Load posenet
  const runPosenet = async () => {
    const net = await posenet.load({
      inputResolution: { width: 800, height: 480 },
      scale: 0.5,
    });

    //Run function every second
    return detect(net);
  };

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
      const pose = await net.estimateSinglePose(video);
      drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
      return pose;
      // console.log(pose)
    }
  };

  async function makeVectors() {
    let vector = await runPosenet();
    let result = [];
    vector.keypoints.map((position) => {
      result.push(position.position.x, position.position.y);
    });

    vector.keypoints.map((position) => {
      result.push(position.score);
    });

    result.push(vector.score);
    console.log("VECTOR:", vector, "RESULT:", result);
    return result;
  }

  function weightedDistanceMatching(poseVector1, poseVector2) {
    let vector1PoseXY = poseVector1.slice(0, 34);
    let vector1Confidences = poseVector1.slice(34, 51);
    let vector1ConfidenceSum = poseVector1.slice(51, 52);

    let vector2PoseXY = poseVector2.slice(0, 34);

    // First summation
    let summation1 = 1 / vector1ConfidenceSum;

    // Second summation
    let summation2 = 0;
    for (let i = 0; i < vector1PoseXY.length; i++) {
      let tempConf = Math.floor(i / 2);
      let tempSum =
        vector1Confidences[tempConf] *
        Math.abs(vector1PoseXY[i] - vector2PoseXY[i]);
      summation2 = summation2 + tempSum;
    }

    return summation1 * summation2;
  }

  const [dancePoses, setdancePoses] = useState([]);
  useEffect(() => {
    setdancePoses(dance1Poses);
  }, []);

  let index = 0;

  //click me
  const handleClick = async (event, bpm) => {
    event.preventDefault();
    console.log(dancePoses);

    const poseInterval = setInterval(async () => {
      const vector = await makeVectors();
      console.log("index------------>", index);
      console.log(weightedDistanceMatching(vector, dancePoses[index++]));

      if (index === dance1Poses.length) clearInterval(poseInterval);
    }, 2000);
  };

  const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeypoints(pose["keypoints"], 0.5, ctx);
    drawSkeleton(pose["keypoints"], 0.5, ctx);
  };

  return (
    <div>
      <header>
        <h3>User Name: {user !== null ? user.username : null}</h3>
        <Audio />
        <div>
          <span className="metronone">.</span>
          <span className="metronone">.</span>
          <span className="metronone">.</span>
          <span className="metronone">.</span>
        </div>
        <Webcam
          ref={webcamRef}
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
        <PoseOverlay />
      </header>
      <button onClick={handleClick}>CLICK ME</button>
      <div>
        {capturing ? (
          <button onClick={handleStopCaptureClick}>Stop Capture</button>
        ) : (
          <button onClick={handleStartCaptureClick}>Start Capture</button>
        )}
        {recordedChunks.length > 0 && (
          <button onClick={handleDownload}>Download</button>
        )}
      </div>
    </div>
  );
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(WebcamComponent);

//{score: 0.2703212749706033, keypoints: Array(17)}
// keypoints: Array(17)
// 0: {score: 0.9822884798049927, part: "nose", position: {…}}
// 1: {score: 0.9331652522087097, part: "leftEye", position: {…}}
// 2: {score: 0.97440105676651, part: "rightEye", position: {…}}
// 3: {score: 0.3304564356803894, part: "leftEar", position: {…}}
// 4: {score: 0.6350568532943726, part: "rightEar", position: {…}}
// 5: {score: 0.131691575050354, part: "leftShoulder", position: {…}}
// 6: {score: 0.20595556497573853, part: "rightShoulder", position: {…}}
// 7: {score: 0.02258964627981186, part: "leftElbow", position: {…}}
// 8: {score: 0.022270627319812775, part: "rightElbow", position: {…}}
// 9: {score: 0.19954724609851837, part: "leftWrist", position: {…}}
// 10: {score: 0.031363993883132935, part: "rightWrist", position: {…}}
// 11: {score: 0.024194451048970222, part: "leftHip", position: {…}}
// 12: {score: 0.026693549007177353, part: "rightHip", position: {…}}
// 13: {score: 0.005670389160513878, part: "leftKnee", position: {…}}
// 14: {score: 0.0067472257651388645, part: "rightKnee", position: {…}}
// 15: {score: 0.02152351848781109, part: "leftAnkle", position: {…}}
// 16: {score: 0.041845809668302536, part: "rightAnkle", position: {…}}
// length: 17
// __proto__: Array(0)
// score: 0.2703212749706033

// {score: 0.2703212749706033, keypoints: Array(17)}
// keypoints: Array(17)
// 0:
// part: "nose"
// position:
// x: 305.4566229524181
// y: 265.87529235966736
// __proto__:
//score
