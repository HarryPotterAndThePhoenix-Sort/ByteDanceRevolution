import React from 'react'
import {withFirebase} from '../Firebase'

function FinalScore(props) {

    //---------------------SAVE VIDEO------------------------
    const handleSave = React.useCallback(async () => {
        if (props.recordedChunks.length) {
            const blob = new Blob(props.recordedChunks, {
                type: "video/webm",
            });

            await props.firebase.storage
                .ref()
                .child("users")
                .child(props.currentUserId)
                .child(props.song)
                .put(blob);

            
            const url = await props.firebase.storage
                .ref()
                .child("users")
                .child(props.currentUserId)
                .child(props.song).getDownloadURL()
                props.firebase.db.ref('urls').child(props.currentUserId).set(url)
                // console.log('URL------->', url)
        }

    })

    //---------------------DOWNLOAD VIDEO------------------------
    const handleDownload = React.useCallback(() => {
        if (props.recordedChunks.length) {
            const blob = new Blob(props.recordedChunks, {
                type: "video/webm",
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = url;
            a.download = "react-webcam-stream-capture.webm";
            a.click();
            window.URL.revokeObjectURL(url);
        }
    }, [props.currentUserId, props.recordedChunks, props.firebase.storage]);
    return (
        <div>
            <header>
                <div
                    style={{
                        display: "flex",
                        position: 'absolute',
                        marginTop: 140,
                        marginLeft: "auto",
                        marginRight: "auto",
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        zindex: -1,
                        width: 400,
                        height: 200,
                        backgroundColor: 'rgba(75, 0, 130, 0.7)',
                        backgroundPosition: "center",
                    }}>
                    <h3
                        style={{
                            display: "flex",
                            textAlign: 'center',
                            color: 'white',
                            width: 400,
                            justifyContent: 'center',

                        }}
                    >Your Score is {props.score}</h3>
                    <button
                        style={{
                            display: "flex",
                            alignContent: "center",
                            textAlign: 'center',
                            justifyContent: "center",
                            height: 50,

                        }}
                        onClick={handleDownload}>Download video</button>
                    <button
                        style={{
                            display: "flex",
                            alignContent: "center",
                            textAlign: 'center',
                            justifyContent: "center",
                            height: 50,

                        }}
                        onClick={handleSave}>Save to My Videos</button>
                        {props.score < 1000 ? <p>Good start</p> : props.score > 1000 && props.score < 5000 ? <p>You're pretty alright</p> : props.score > 5000 && props.score < 10000  ? <p>Amazing!</p> : props.score > 10000 ? <p>You're a master!</p> : <p></p>}
                </div>
            </header>
        </div>
    );

}

export default withFirebase(FinalScore)