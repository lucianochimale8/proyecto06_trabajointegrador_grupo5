import { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import errorImage from "../assets/img/error.jpeg";
import Audio from "../assets/audio/AtakeLoli.mp3";

function Error() {
  const audioRef = useRef(null);

  const handleClick = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.5;
      audioRef.current.play();
    }
  };

  return (
    <div
      className="error-container"
    >
      <h1 className="error-heading">Error 404</h1>
      <p className="error-message">Toca el dino para una sorpresa :0!!</p>
      <img
        src={errorImage}
        alt="Error"
        onClick={handleClick}
        className="error-image"
      />
      <audio ref={audioRef} src={Audio} preload="auto" />
    </div>
  );
}

export default Error;