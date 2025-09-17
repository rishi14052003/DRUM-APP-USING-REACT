import React, { useEffect, useState } from "react";
import "./App.css";

const drumPads = [
  { key: "Q", id: "Heater-1", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },
  { key: "W", id: "Heater-2", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" },
  { key: "E", id: "Heater-3", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },
  { key: "A", id: "Heater-4", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" },
  { key: "S", id: "Clap", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" },
  { key: "D", id: "Open-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" },
  { key: "Z", id: "Kick-n'-Hat", url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },
  { key: "X", id: "Kick", url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" },
  { key: "C", id: "Closed-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" }
];

const App = () => {
  const [display, setDisplay] = useState("");

  const playSound = (key) => {
    const audio = document.getElementById(key);
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(err => console.log("Playback prevented:", err));
      // update display with parent button id (sound name)
      const parentButton = audio.parentElement;
      if (parentButton) {
        setDisplay(parentButton.id);
      }
    }
  };

  const handleKeyPress = (e) => {
    const key = e.key.toUpperCase();
    if (drumPads.some((pad) => pad.key === key)) {
      playSound(key);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div id="drum-machine">
      <div className="pads">
        {drumPads.map((pad) => (
          <div
            key={pad.key}
            className="drum-pad"
            id={pad.id}
            onClick={() => playSound(pad.key)}
          >
            {pad.key}
            <audio className="clip" id={pad.key} src={pad.url}></audio>
          </div>
        ))}
      </div>
      <div id="display">{display}</div>
    </div>
  );
};

export default App;
