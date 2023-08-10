import React, { useState, useEffect, useRef } from "react";
import "../../styles/index.css";

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSongIndex, setActiveSongIndex] = useState(null);
  const audioRef = useRef(null);
  const baseURL = "https://playground.4geeks.com/apis/fake/sound/";

  // Obtiene las canciones de la API
  const getSongsData = () => {
    fetch("https://playground.4geeks.com/apis/fake/sound/songs")
      .then((res) => res.json())
      .then((data) => setSongs(data))
      .catch((error) => console.log(error));
  };

  // Maneja la reproducción/pausa de la canción
  const handlePlayClick = () => {
    if (activeSongIndex !== null) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    } else {
      setActiveSongIndex(0);
      audioRef.current.src = baseURL + songs[setActiveSongIndex]?.url;
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Avanza a la siguiente canción en la lista
  const handleNextClick = () => {
    if (activeSongIndex < songs.length - 1) {
      setActiveSongIndex(activeSongIndex + 1);
    }
  };

  // Retrocede a la canción anterior en la lista
  const handlePrevClick = () => {
    if (activeSongIndex > 0) {
      setActiveSongIndex(activeSongIndex - 1);
    }
  };

  // Maneja el clic en una canción de la lista
  const handleSongClick = (index) => {
    if (activeSongIndex === index) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      setActiveSongIndex(index);
      if (isPlaying) {
        audioRef.current.src = baseURL + songs[index]?.url;
        audioRef.current.play();
      }
    }
  };

  useEffect(() => {
    getSongsData();
  }, []);

  useEffect(() => {
    if (activeSongIndex !== null && isPlaying) {
      audioRef.current.src = baseURL + songs[activeSongIndex]?.url;
      audioRef.current.play();
    }
  }, [activeSongIndex, isPlaying, songs]);

  return (
    <div className="d-flex flex-column vh-100">
      <div className="bg-secondary p-1"></div>
      <div className="flex-grow-1 bg-dark">
        <ul className="list-group list-group-flush text-light">
          {songs &&
            songs.map((song, index) => (
              <button
                className={`list-group-item list-group-item-action bg-dark text-light d-flex justify-content-between hover-effect ${
                  activeSongIndex === index ? "active-song" : ""
                }`}
                key={song.id}
                onClick={() => handleSongClick(index)}
              >
                <span>{song.id}</span>
                <span className="mx-auto">{song.name}</span>
              </button>
            ))}
        </ul>
      </div>
      <div className="bg-secondary fixed-bottom w-100 p-3 d-flex justify-content-center align-items-center">
        <i
          className="fa-solid fa-square-caret-left"
          style={{ color: "#ffffff", fontSize: "40px", marginRight: "50px" }}
          onClick={handlePrevClick}
        />
        <i
          className={
            isPlaying ? "fa-solid fa-pause mx-5" : "fa-solid fa-play mx-5"
          }
          style={{ color: "#ffffff", fontSize: "40px" }}
          onClick={handlePlayClick}
        />
        <i
          className="fa-solid fa-square-caret-right"
          style={{ color: "#ffffff", fontSize: "40px", marginLeft: "50px" }}
          onClick={handleNextClick}
        />
      </div>
      <audio ref={audioRef} src={baseURL + songs[activeSongIndex]?.url} />
    </div>
  );
};

export default Home;
