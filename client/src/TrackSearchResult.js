import React from "react";

const TrackSearchResult = ({ track, chooseTrack }) => {
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
          <div className="songTitle">{track.title}</div>
          <div className="text-muted" style={{ marginLeft: "1rem" }}>
            {track.artist}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackSearchResult;
