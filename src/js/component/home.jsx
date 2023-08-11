import React, { useState, useEffect, useRef } from "react";
import SongList from "./songList";
import PlayerControls from "./playerControls";
import "../../styles/index.css";

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSongIndex, setActiveSongIndex] = useState(null);
  const [repeatMode, setRepeatMode] = useState(false);
  const repeatModeRef = useRef(repeatMode);
  const shuffleModeRef = useRef(shuffleMode);
  const [shuffleMode, setShuffleMode] = useState(false);
  const audioRef = useRef(null);
  const baseURL = "https://playground.4geeks.com/apis/fake/sound/";
  const [currTime, setCurrTime] = useState({
    min: "",
    sec: "",
  });
  const [duration, setDuration] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const getSongsData = async () => {
    try {
      const res = await fetch(
        "https://playground.4geeks.com/apis/fake/sound/songs"
      );
      if (!res.ok) {
        throw new Error(`Error al obtener datos: ${res.status}`);
      }
      const data = await res.json();
      setSongs(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSongsData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current) {
        const currentTimeInSeconds = audioRef.current.currentTime;
        setSeconds(currentTimeInSeconds);
        const min = Math.floor(currentTimeInSeconds / 60);
        const sec = Math.floor(currentTimeInSeconds % 60);
        setCurrTime({
          min,
          sec,
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    repeatModeRef.current = repeatMode;
    shuffleModeRef.current = shuffleMode;
  }, [repeatMode, shuffleMode]);

  useEffect(() => {
    if (activeSongIndex !== null && isPlaying) {
      audioRef.current.src = baseURL + songs[activeSongIndex]?.url;
      customPlay(audioRef.current);
    }
    const audioElement = audioRef.current;
    audioElement.addEventListener("ended", handleSongEnd);
    return () => {
      audioElement.removeEventListener("ended", handleSongEnd);
    };
  }, [activeSongIndex, isPlaying, songs]);

  useEffect(() => {
    const setAudioDuration = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration);
      }
    };
    if (audioRef.current) {
      audioRef.current.addEventListener("loadedmetadata", setAudioDuration);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener(
          "loadedmetadata",
          setAudioDuration
        );
      }
    };
  }, [activeSongIndex]);

  //INCORPORE ESTA FUNCION PARA PROBAR EL TRY CATCH PARA VER SI PODIA SOLUCIONAR EL ERROR DE LA CONSOLA CUANDO PLAY SE SUPERPONE CON OTRO PLAY, NO LO HIZO PERO CREO QUE CON ESTO QUEDO MAS RAPIDO
  const customPlay = (element) => {
    try {
      const playPromise = element.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
          })
          .catch((error) => {            
            console.error("Error al reproducir:", error);
          });
      }
    } catch (error) {
      console.error("Error al intentar reproducir:", error);
    }
  };

  //SE REINICIA EN VEZ DE REPRODUCIRSE CUANDO SE LE DA PLAY DESPUES DE PAUSADO, CREO QUE ES PORQUE EL SRC SE REINICIA EN ALGUN LADO CUANDO NO DEBERIA, PERO YA ESTOY CANSADO Y NO SE DONDE ES :(
  const handlePlayClick = () => {
    if (activeSongIndex !== null) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        customPlay(audioRef.current);
      }
    } else {
      setActiveSongIndex(0);
      audioRef.current.src = baseURL + songs[activeSongIndex]?.url;
      customPlay(audioRef.current);
    }
    setIsPlaying(!isPlaying);
  };

  const handleNextClick = () => {
    if (shuffleMode) {
      selectRandomSong();
    } else if (activeSongIndex < songs.length - 1) {
      setActiveSongIndex(activeSongIndex + 1);
    } else if (activeSongIndex === songs.length - 1) {
      setActiveSongIndex(0);
    }
    if (isPlaying) customPlay(audioRef.current);
  };

  const handlePrevClick = () => {
    if (shuffleMode) {
      selectRandomSong();
    } else if (activeSongIndex > 0) {
      setActiveSongIndex(activeSongIndex - 1);
    } else if (activeSongIndex === 0) {
      setActiveSongIndex(songs.length - 1);
    }
  };

  const handleSongClick = (index) => {
    if (activeSongIndex === index) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        customPlay(audioRef.current);
        setIsPlaying(true);
      }
    } else {
      setActiveSongIndex(index);
      if (isPlaying) {
        audioRef.current.src = baseURL + songs[index]?.url;
        customPlay(audioRef.current);
      }
    }
  };

  const increaseVolume = () => {
    if (audioRef.current.volume < 1) {
      audioRef.current.volume = Math.min(audioRef.current.volume + 0.1, 1);
    }
  };

  const decreaseVolume = () => {
    if (audioRef.current.volume > 0) {
      audioRef.current.volume = Math.max(audioRef.current.volume - 0.1, 0);
    }
  };

  const handleRepeatMode = () => {
    setRepeatMode(!repeatMode);
    if (!repeatMode) setShuffleMode(false);
  };

  const handleSongEnd = () => {
    console.log(repeatModeRef.current);
    console.log(shuffleModeRef.current);
    if (repeatModeRef.current) {
      audioRef.current.currentTime = 0;
      customPlay(audioRef.current);
    } else if (shuffleModeRef.current) {
      selectRandomSong();
      customPlay(audioRef.current);
    } else {
      handleNextClick();
    }
  };

  const handleShuffleMode = () => {
    setShuffleMode((prevShuffleMode) => !prevShuffleMode);
    if (!shuffleMode) setRepeatMode(false);
  };

  const selectRandomSong = () => {
    const randomIndex = Math.floor(Math.random() * songs.length);
    setActiveSongIndex(randomIndex);
  };

  return (
    <div className="d-flex flex-column vh-100">
      <div className="bg-secondary p-1"></div>
      <div className="flex-grow-1 bg-dark">
        <SongList
          songs={songs}
          activeSongIndex={activeSongIndex}
          onSongClick={handleSongClick}
        />
      </div>
      <PlayerControls
        isPlaying={isPlaying}
        onNextClick={handleNextClick}
        onPrevClick={handlePrevClick}
        onPlayClick={handlePlayClick}
        increaseVolume={increaseVolume}
        decreaseVolume={decreaseVolume}
        repeatMode={handleRepeatMode}
        shuffleMode={handleShuffleMode}
        shuffleState={shuffleMode}
        repeatState={repeatMode}
        audioRef={audioRef}
        seconds={seconds}
        currTime={currTime}
        duration={duration}
      />
      <audio ref={audioRef} src={baseURL + songs[activeSongIndex]?.url} />
    </div>
  );
};

export default Home;
