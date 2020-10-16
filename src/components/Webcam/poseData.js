import React, { useRef } from "react";
import * as posenet from "@tensorflow-models/posenet";
import { drawKeypoints, drawSkeleton } from "./utilities";
import './Webcam.css'


function PoseData() {
    // const canvasRef = useRef(null);
    // ------------ Load posenet---------------------
    const runPosenet = async () => {
        const net = await posenet.load({
            inputResolution: { width: 640, height: 480 },
            scale: 0.5,
        });
        //    Run function every second
        return detect(net);
    };

    // ------------ Detec ---------------------------

    const detect = async (net) => {
        let testImg = document.getElementById('4')
        const pose = await net.estimateSinglePose(testImg);
        // var canvas = document.getElementById('canvas');
        // drawCanvas(pose, testImg, testImg.clientWidth, testImg.clientHeight, canvas);
        //console.log('POSE FROM POSE DATA', pose)
        return pose

    }




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
        //console.log("VECTOR FROM POSE DATA FILE:", vector, "RESULT:", result);
        return result;
    }

    // ----------------- Draw Function ------------------
    // const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
    //     let ctx = canvas.getContext('2d');
    //     // const ctx = canvas.current.getContext("2d");
     //     canvas.current.width = videoWidth;
    //     canvas.current.height = videoHeight;
    
    //     drawKeypoints(pose["keypoints"], 0.5, ctx);
     //     drawSkeleton(pose["keypoints"], 0.5, ctx);
    // };

    const handleClick = async () => {
    runPosenet()
    makeVectors()
    // drawCanvas()
}
    



     return (
       <div>
           <h1>This is a test</h1>
            <button onClick={handleClick}>CLICK</button></div>
     
     
    )
     
    }
        
       


export default PoseData

