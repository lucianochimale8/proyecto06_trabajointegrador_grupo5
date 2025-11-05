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
      style={{
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        height: '100vh',
        width: '100vw',
        color: 'black'
      }}
    >
      <h1 style={{ marginBottom: '20px', fontSize: '3rem' }}>Error 404</h1>
      <p style={{ marginBottom: '10px', fontSize: '1.2rem', color: 'black' }}>Toca el dino para una sorpresa :0!!</p>
      <img
        src={errorImage}
        alt="Error"
        onClick={handleClick}
        style={{
          maxWidth: '80%',
          maxHeight: '60%',
          objectFit: 'contain',
          cursor: 'pointer',
        }}
      />
      <audio ref={audioRef} src={Audio} preload="auto" />
    </div>
  );
}

export default Error;