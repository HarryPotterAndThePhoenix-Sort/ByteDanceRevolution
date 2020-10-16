import React, { useEffect, useState } from "react";
import { withFirebase } from "../Firebase";

function FinalScore(props) {
  // --------Get Current User---------------------
  const [user, setUser] = useState(null);
  const currentUserId = props.firebase.auth.currentUser.uid;

  useEffect(() => {
    props.firebase.user(currentUserId).on("value", (snapshot) => {
      let user = snapshot.val();
      setUser(user);
    });
  }, [props.firebase]);

  // ---------------- Handle Download -------------
  const handleDownload = React.useCallback(() => {
    if (props.recordedChunks.length) {
      const blob = new Blob(props.recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const source = document.createElement("source");
      document.body.appendChild(a);
      a.appendChild(source);
      source.src =
        "../../../public/2016-08-23_-_News_Opening_4_-_David_Fesliyan";
      a.style = "display: none";
      a.href = url;
      a.download = "react-webcam-stream-capture.webm";
      a.click();
      window.URL.revokeObjectURL(url);

      //console.log("TESTING TO SEE IF DOWNLOAD WORKS", song);
    }
  }, []);

  // ---------------- Handle Download -------------
  //SAVE VIDEO TO THE DATABASE
  const handleSave = React.useCallback(() => {
    if (props.recordedChunks.length) {
      const blob = new Blob(props.recordedChunks, {
        type: "video/webm",
      });

      props.firebase.storage
        .ref()
        .child("users")
        .child(currentUserId)
        .child("dance1")
        .put(blob);
    }
  });

  return (
    <div>
      <header>
        <div
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            position: "absolute",
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
          }}
        >
          <h3
            style={{
              display: "flex",
              alignContent: "center",
              textAlign: "center",
              color: "white",
            }}
          >
            Your score is {props.score}
          </h3>
          {props.score < 1200 ? (
            <h4>TRY HARDER!!</h4>
          ) : (
            <h4>THAT'S AWESOME!</h4>
          )}
          {props.recordedChunks.length ? (
            <div>
              <button onClick={handleDownload}>Download</button>
              <button onClick={handleSave}>Save</button>
            </div>
          ) : (
            <div />
          )}
        </div>
      </header>
    </div>
  );
}

export default withFirebase(FinalScore);
