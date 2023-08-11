import React from "react";

const SongList = ({ songs, activeSongIndex, onSongClick }) => (
  <ul className="list-group list-group-flush text-light">
    {songs &&
      songs.map((song, index) => (
        <button
          className={`list-group-item list-group-item-action bg-dark text-light d-flex justify-content-between hover-effect ${
            activeSongIndex === index ? "active-song" : ""
          }`}
          key={song.id}
          onClick={() => onSongClick(index)}
        >
          <span>{song.id}</span>
          <span className="mx-auto">{song.name}</span>
        </button>
      ))}
  </ul>
);

export default SongList;
