import React from "react";
import { Avatar } from "@material-ui/core";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=71c0c97e41104c3a89683999a1d7757e&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

const TopNav = ({ user, code }) => {
  return (
    <div className="upperNav">
      <span>Clone version</span>
      {!code ? (
        <div className="buttons">
          <a className="buttonLog" href={AUTH_URL}>
            Se connecter avec Spotify
          </a>
        </div>
      ) : (
        <div className="userRight">
          {user.body.images[0] ? (
            <Avatar alt={user.display_name} src={user.images[0].url} />
          ) : (
            <Avatar />
          )}

          <h4>{user.body.display_name}</h4>
        </div>
      )}
    </div>
  );
};

export default TopNav;
