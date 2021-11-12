import React from "react";
import { ReactComponent as PlayIcon } from "./svg/play.svg";

const AlbumsPage = ({ album, chooseTrack }) => {
  const handlePlay = () => {
    chooseTrack(album);
  };

  return (
    <div className="mainContent">
      <div className="cardsWrap">
        <div className="card">
          <div className="cardImage">
            <img src={album.albumUrl} alt={album.uri} />
          </div>
          <div className="cardContent">
            <h3>{album.title}</h3>{" "}
            <div className="text-muted" style={{ marginLeft: "1rem" }}>
              {album.artist}
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

export default AlbumsPage;
