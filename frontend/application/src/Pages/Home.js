import StarRating from "../components/StarRating";
import { useContext } from "react";
import QRCode from "react-qr-code";

function Home() {
  return (
    <div className="App">
      <div className="header">
        <a href="https://www.megazone.com/vn/" target="blank">
          <img src='megazone.png' className="App-logo" alt="logo" />
        </a>
        <a href="https://awsviet.vn/" target="blank">
          <img src='awsug.png' className="App-logo" alt="logo" />
        </a>
      </div>
      <h1>Welcome to Immersion Day</h1>
      <h1>Please let us now from scale 1-5, how do you feel about this event</h1>
      <StarRating />
      <br></br>
      <QRCode value={window.location.href}/>
    </div>
  );
}

export default Home;