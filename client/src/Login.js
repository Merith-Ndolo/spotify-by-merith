import React from "react";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=71c0c97e41104c3a89683999a1d7757e&response_type=code&redirect_uri=https://spotify-by-merith.herokuapp.com&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20user-read-recently-played%20user-top-read";

const Login = () => {
  return (
    <div className="login">
      {" "}
      <img
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt=""
      />
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Se connecter avec Spotify
      </a>
    </div>
  );
};

export default Login;
