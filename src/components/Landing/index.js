import React , { useState, useEffect } from "react";
import './Landing.css'
import { withFirebase } from '../Firebase'

const Landing = (props) => {

  const [dance1Scores, setDance1Scores] = useState([])
  const [users, setUsers] = useState({})

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
      setDance1Scores(scores)
    })

  }, [])

  console.log(dance1Scores)

  return (
  <div className="container">
    <h1>High Scores!!!</h1>
    <div>{

      dance1Scores.highScore

    }
      </div>
  </div>
)
  };

export default withFirebase(Landing);
