import React, { useState } from "react";
import { IconButton, Icon } from "@mui/material";
import { Pause, PlayArrow, VolumeUp, VolumeDown, ArrowRight, ArrowLeft } from "@mui/icons-material";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [songName, setSongName] = useState("");
  const [artistName, setArtistName] = useState("");

  const [songProgress, setSongProgress] = useState(0);
  const [songUrl, setSongUrl] = useState("https://www.example.com/song.mp3");


  return (
    <div className="music-player">
    <IconButton
        className="controls previous"
        onClick={() => setSongName("Another One Bites the Dust")}
      >
        <ArrowLeft/>
      </IconButton>
      
      <IconButton
        className="controls"
        onClick={() => {
          setIsPlaying(!isPlaying);
          {isPlaying ? document.getElementById("music").play() : document.getElementById("music").pause()}
          document.getElementById("music").volume=0.5;
        }}
      >
        {isPlaying ? <Pause /> : <PlayArrow />}
        
      </IconButton>

      <IconButton
        className="controls next"
        onClick={() => setSongName("We Will Rock You")}
      >
        <ArrowRight/>
      </IconButton>

      <IconButton
        className="controls "
        onClick={() => setVolume(volume - 10)}
      >
        <VolumeDown/>
      </IconButton>
      <div className="progress">
        <input type="range" min="0" max="100" value={volume} onChange={(e) => setVolume(e.target.value)} />
      </div>
      <div className="song-info">
        <h3>{songName}</h3>
        <h4>{artistName}</h4>
      </div>
      <IconButton
        className="controls"
        onClick={() => setVolume(volume + 10)}
      >
        <VolumeUp/>
      </IconButton>

      <audio id="music">
        <source src="https://drive.google.com/file/d/15b8bpiQ6cSC1DDfvuc5a6or8t_6NjBGe/view?usp=share_link" type="audio/mpeg"></source>
      </audio>
    </div>
  );

  

};

export default MusicPlayer;