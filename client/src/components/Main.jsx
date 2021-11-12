import React from "react";
import { ReactComponent as PlayIcon } from "../svg/play.svg";

const Main = () => {
  return (
    <div className="mainContent">
      <h1>A ne pas manquer aujourd'hui !</h1>
      <div className="cardsWrap">
        <div className="card">
          <div className="cardImage">
            <img
              src="https://images.unsplash.com/photo-1636310794789-123951c0fd58?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1112&q=80"
              alt="Pic one"
            />
          </div>
          <div className="cardContent">
            <h3>Liked songs</h3>{" "}
          </div>
          <span className="playIcon">
            <PlayIcon />{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Main;
