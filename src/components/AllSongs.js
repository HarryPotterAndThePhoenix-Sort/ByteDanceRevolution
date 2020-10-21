import React from "react";
import soFresh from "../../public/so-fresh.mp3";

class AllSongs extends React.Component {
  render() {
    return (
      <div>
        <div>
          <img src="https://images-na.ssl-images-amazon.com/images/I/61J54iWIHpL.jpg" />
          <h2>So Fresh!</h2>
          <button>Play Audio</button>
          <button>Dance</button>
        </div>
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/en/6/62/This_Is_America_%28single_cover%29_2018.jpg" />
          <h2>This is America</h2>
          <button>Play Audio</button>
          <button>Dance</button>
        </div>
        <div>
          <img src="https://i.pinimg.com/736x/94/35/ab/9435ab48eaaeba714574564a554fb5e4.jpg" />
          <h2>It's Britney!</h2>
          <button>Play Audio</button>
          <button>Dance</button>
        </div>
        <div>
          <img src="https://i.pinimg.com/originals/23/2b/78/232b78fc67d8477780dad69137d7a650.jpg" />
          <h2>Black Pink</h2>
          <button>Play Audio</button>
          <button>Dance</button>
        </div>
      </div>
    );
  }
}

export default AllSongs;
