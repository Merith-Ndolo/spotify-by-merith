import React from "react";
import { dateParser } from "./utils";

const TrackRecentPlayed = ({ track, chooseTrack }) => {
  const handlePlay = () => {
    chooseTrack(track);
  };

  return (
    <div className="listView">
      <div
        className="d-flex m-2 align-items-center"
        style={{ cursor: "pointer" }}
        onClick={handlePlay}
      >
        <img src={track.albumUrl} style={{ height: "64px", width: "64px" }} />
        <div className="ml-3">
          <div className="songTitleRecent">{track.title}</div>
          <div className="text-muted" style={{ marginLeft: "1rem" }}>
            {track.artist}
          </div>
          <div style={{ marginLeft: "1rem", color: "#b3b3b3" }}>
            {dateParser(track.date)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackRecentPlayed;
