import React from 'react'
import { withFirebase } from '../Firebase'

class Audio extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      song: 'dilla'
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleStop = this.handleStop.bind(this)
  }

  componentDidMount() {

  }

  async handleClick(event) {
    event.preventDefault()
    const audio = document.getElementById(this.state.song)
    audio.play()
  }

  async handleStop(event) {
    event.preventDefault()
    const audio = document.getElementById(this.state.song)
    audio.pause()
    audio.currentTime = 0
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({song: event.target.value})
  }

  render(){
    return (
      <div>
        <select onChange={this.handleChange}>
          <option value='dilla'>Dilla</option>
          <option value='bhairavi'>Bhairavi</option>
          <option value='nature-boy'>Nature Boy</option>
        </select>
        <button onClick={this.handleClick}>Start</button>
        <button onClick={this.handleStop}>Stop</button>
        <h3>Audio Component</h3>
      </div>
    )
  }
}

export default withFirebase(Audio)
