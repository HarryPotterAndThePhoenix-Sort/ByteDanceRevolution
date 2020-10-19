import React from "react";
import * as posenet from "@tensorflow-models/posenet";
import './Webcam.css'


function PoseData() {
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
        // console.log('POSE FROM POSE DATA', pose)
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
        // console.log("VECTOR FROM POSE DATA FILE:", vector, "RESULT:", result);
        return result;
    }


    const handleClick = async () => {
    runPosenet()
    makeVectors()
}


     return (
       <div>
            <button onClick={handleClick}>GET POSE DATA</button></div>
     
     
    )
     
    }
        
       


export default PoseData

