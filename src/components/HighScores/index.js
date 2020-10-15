import React , { useState, useEffect } from "react";
import './Landing.css'
import { withFirebase } from '../Firebase'

const HighScores = (props) => {

  const [dance1Scores, setDance1Scores] = useState([])

  useEffect(()=>{
    // const userId = props.firebase.auth.currentUser.uid
    // props.firebase.db.ref('scores').child('dance1').update({
    //   prav: 2238483,
    //   winston: 938392834
    // })
    // props.firebase.getHighScore('dance1','0rsgwCPao6ewEB8wK4MfaeypzBx1').on('value', snapshot=>{
    //   setDance1Scores(snapshot.val())
    // })
    const scores = []

    props.firebase.db.ref('users').orderByChild('scores/dance1/highScore').on('value', snapshot=>{
      snapshot.forEach((child)=>{
        scores.push(child.val())
      })
      setDance1Scores(scores.reverse().slice(0,5))
    })
  }, [setDance1Scores])

//   const funky = () => {
//     dance1Scores.forEach(userObj => {
//     if(userObj.scores){
//       console.log(userObj.username, userObj.scores.dance1.highScore)
//     } else {
//       return
//     }
//   })
// }
//   funky()

  return (
  <div className="container">
    <h1>High Scores!!!</h1>
    <table>
    <thead>Dance 1 High Scores</thead>
    <tbody>

    {
      dance1Scores.length>0 ?


        (dance1Scores.map(userObj => {
          return userObj.scores ?
          (
            <tr key={userObj.email}>
        <td>{userObj.username}</td>
        <td>{userObj.scores.dance1.highScore}</td>
        </tr>
          )
        :
        null
        }))

        :
      <tr>
        <td>Loading...</td></tr>
    }
    </tbody>
    </table>
  </div>
)
  };

export default withFirebase(HighScores);
