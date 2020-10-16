import React from 'react'

function FinalScore(props) {

    //---------------------SAVE VIDEO------------------------
    const handleSave = React.useCallback(() => {
        if (props.recordedChunks.length) {
            const blob = new Blob(props.recordedChunks, {
                type: "video/webm",
            });

            props.firebaseStorage
                .ref()
                .child("users")
                .child(props.currentUserId)
                .child("dance1")
                .put(blob);
        }
    })

    //---------------------DOWNLOAD VIDEO------------------------
      const handleDownload = React.useCallback(() => {
        if (props.recordedChunks.length) {
            const blob = new Blob(props.recordedChunks, {
                type: "video/webm",
                audio: props.song
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            const source = document.createElement("source");
            document.body.appendChild(a);
            a.appendChild(source);
            source.audio = props.song
            a.style = "display: none";
            a.audio = props.song
            a.href = url;
            a.download = "react-webcam-stream-capture.webm";
            a.click();
            window.URL.revokeObjectURL(url);
        }
    }, [props.currentUserId, props.recordedChunks, props.firebaseStorage]);
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
                    >FinalScore: {props.score}</h3>
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
                </div>
            </header>
        </div>
    );

}

export default FinalScore