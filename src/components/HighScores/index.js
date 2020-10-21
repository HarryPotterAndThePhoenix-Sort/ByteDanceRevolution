import React, { useState, useEffect } from "react";
import "./HighScores.css";
import { withFirebase } from "../Firebase";

const HighScores = (props) => {
  const [soFreshScore, setSoFreshScore] = useState([]);
  const [gambino, setGambino] = useState([]);
  const [blackPink, setBlackPink] = useState([]);
  const [itsBritney, setItsBritney] = useState([]);

  useEffect(() => {

    //SO FRESH SCORES
    const freshScores = [];

    props.firebase.db
      .ref("users")
      .orderByChild("scores/soFresh/highScore")
      .on("value", (snapshot) => {
        snapshot.forEach((child) => {
          freshScores.push(child.val());
        });
        setSoFreshScore(freshScores.reverse().slice(0, 5));
      });


      //GAMBINO SCORES

      const gambinoScores = [];

      props.firebase.db
        .ref("users")
        .orderByChild("scores/gambino/highScore")
        .on("value", (snapshot) => {
          snapshot.forEach((child) => {
            gambinoScores.push(child.val());
          });
          setGambino(gambinoScores.reverse().slice(0, 5));
        });


      //BLACKPINK SCORES

      const blackPinkScores = [];

      props.firebase.db
        .ref("users")
        .orderByChild("scores/blackPink/highScore")
        .on("value", (snapshot) => {
          snapshot.forEach((child) => {
            blackPinkScores.push(child.val());
          });
          setBlackPink(blackPinkScores.reverse().slice(0, 5));
        });


      //ITSBRITNEY SCORES

      const itsBritneyScores = [];

      props.firebase.db
        .ref("users")
        .orderByChild("scores/itsBritney/highScore")
        .on("value", (snapshot) => {
          snapshot.forEach((child) => {
            itsBritneyScores.push(child.val());
          });
          setItsBritney(itsBritneyScores.reverse().slice(0, 5));
        });




  }, [setSoFreshScore, setGambino, setBlackPink, setItsBritney]);

  

  return (
    <div className="high-score-container">
      <h1>High Scores!!!</h1>


      <div>
      <h3>So Fresh</h3>
        <table>
          <tbody>
            {soFreshScore.length > 0 ? (
              soFreshScore.map((userObj) => {
                return userObj.scores ? (
                  <tr key={userObj.email}>
                    <td>{userObj.username}</td>
                    <td>{userObj.scores.soFresh.highScore}</td>
                  </tr>
                ) : null;
              })
            ) : (
              <tr>
                <td>Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


      <div>
      <h3>This is America</h3>
        <table>
          <tbody>
            {gambino.length > 0 ? (
              gambino.map((userObj) => {
                return userObj.scores ? (
                  <tr key={userObj.email}>
                    <td>{userObj.username}</td>
                    <td>{userObj.scores.gambino.highScore}</td>
                  </tr>
                ) : null;
              })
            ) : (
              <tr>
                <td>Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


      <div>
      <h3>Kill This Love</h3>
        <table>
          <tbody>
            {blackPink.length > 0 ? (
              blackPink.map((userObj) => {
                return userObj.scores ? (
                  <tr key={userObj.email}>
                    <td>{userObj.username}</td>
                    <td>{userObj.scores.blackPink.highScore}</td>
                  </tr>
                ) : null;
              })
            ) : (
              <tr>
                <td>Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


      <div>
      <h3>Gimme More</h3>
        <table>
          <tbody>
            {itsBritney.length > 0 ? (
              itsBritney.map((userObj) => {
                return userObj.scores ? (
                  <tr key={userObj.email}>
                    <td>{userObj.username}</td>
                    <td>{userObj.scores.itsBritney.highScore}</td>
                  </tr>
                ) : null;
              })
            ) : (
              <tr>
                <td>Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>



    </div>
  );
};

export default withFirebase(HighScores);
