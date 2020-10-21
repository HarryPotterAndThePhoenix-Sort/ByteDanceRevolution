import React from "react";
import "./AllSongs.css";

class AllSongs extends React.Component {
  constructor() {
    super(props);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }
  handlePlay(song) {
    audio = document.getElementById(song);
    audio.play();
  }
  handleStop(song) {
    audio = document.getElementById(song);
    audio.pause();
  }
  handleDance() {}
  render() {
    return (
      <div>
        <div>
          <img src="https://images-na.ssl-images-amazon.com/images/I/61J54iWIHpL.jpg" />
          <h2>So Fresh!</h2>
          <button class="button-play" onClick={this.handlePlay("so-fresh")}>
            Play Audio
          </button>
          <button class="button-pause" onClick={this.handleStop("so-fresh")}>
            Pause Audio
          </button>
          <button>Dance</button>
        </div>
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/en/6/62/This_Is_America_%28single_cover%29_2018.jpg" />
          <h2>This is America</h2>
          <button class="button-play" onClick={this.handlePlay("gambino")}>
            Play Audio
          </button>
          <button class="button-pause" onClick={this.handleStop("gambino")}>
            Pause Audio
          </button>
          <button>Dance</button>
        </div>
        <div>
          <img src="https://i.pinimg.com/736x/94/35/ab/9435ab48eaaeba714574564a554fb5e4.jpg" />
          <h2>It's Britney!</h2>
          <button class="button-play" onClick={this.handlePlay("its-britney")}>
            Play Audio
          </button>
          <button class="button-pause" onClick={this.handleStop("its-britney")}>
            Pause Audio
          </button>
          <button>Dance</button>
        </div>
        <div>
          <img src="https://i.pinimg.com/originals/23/2b/78/232b78fc67d8477780dad69137d7a650.jpg" />
          <h2>Black Pink</h2>
          <button class="button-play" onClick={this.handlePlay("black-pink")}>
            Play Audio
          </button>
          <button class="button-pause" onClick={this.handleStop("black-pink")}>
            Pause Audio
          </button>
          <button>Dance</button>
        </div>
      </div>
    );
  }
}

export default AllSongs;
