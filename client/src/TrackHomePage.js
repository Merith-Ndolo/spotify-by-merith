import React from "react";
import { ReactComponent as PlayIcon } from "./svg/play.svg";

const TrackHomePage = ({ track, chooseTrack }) => {
  const handlePlay = () => {
    chooseTrack(track);
  };

  return (
    <div className="mainContent">
      <div className="cardsWrap">
        <div className="card">
          <div className="cardImage">
            <img src={track.albumUrl} alt={track.title} />
          </div>
          <div className="cardContent">
            <h3>{track.title}</h3>{" "}
            <div className="text-muted" style={{ marginLeft: "1rem" }}>
              {track.artist}
            </div>
          </div>
          <span className="playIcon" onClick={handlePlay}>
            <PlayIcon />{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TrackHomePage;
