import React, { useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import useAuth from "./useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "./TrackSearchResult";
import Player from "./components/Player";
import { ReactComponent as PlayIcon } from "./svg/play.svg";
import VerifIcon from "./svg/verif.svg";
import { Nav, TopNav } from "./components";
import TrackHomePage from "./TrackHomePage";
import TrackRecentPlayed from "./TrackRecentPlayed";
import AlbumsPage from "./AlbumsPage";

const spotifyApi = new SpotifyWebApi({
  client_id: "71c0c97e41104c3a89683999a1d7757e",
});

const Search = ({ code }) => {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [daily, setDaily] = useState([]);
  const [recent, setRecent] = useState([]);
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [singer, setSinger] = useState("");
  const [followers, setFollowers] = useState("");
  const [singerPic, setSingerPic] = useState("");
  const [user, setUser] = useState([]);
  const [page, setPage] = useState("search");
  const [artistId, setArtistId] = useState("");

  function chooseTrack(track) {
    setPlayingTrack(track);
  }

  function choosePage(page) {
    setPage(page);
    console.log(page);
  }

  const albumPage = () => {
    choosePage("albums");
  };

  useEffect(() => {
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.getMe().then((user) => {
      console.log(user);
      if (!user) return;
      setUser(user);
    });

    spotifyApi.getPlaylist("37i9dQZF1E37ARdPJkMAKl").then((res) => {
      console.log(res);
      setDaily(
        res.body.tracks.items.map((tracks) => {
          const smallestAlbumImage = tracks.track.album.images.reduce(
            (smallest, image) => {
              if (image.height > smallest.height) return image;
              return smallest;
            },
            tracks.track.album.images[0]
          );
          return {
            artist: tracks.track.artists[0].name,
            title: tracks.track.name,
            uri: tracks.track.uri,
            albumUrl: smallestAlbumImage.url,
            href: tracks.track.href,
          };
        })
      );
    });

    spotifyApi.getUserPlaylists().then((res) => {
      console.log("My playlists : " + res);
    });

    spotifyApi.getMyRecentlyPlayedTracks().then((res) => {
      console.log(res);
      setRecent(
        res.body.items.map((item) => {
          const smallestAlbumImage = item.track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            item.track.album.images[0]
          );
          return {
            artist: item.track.artists[0].name,
            title: item.track.name,
            uri: item.track.uri,
            date: item.played_at,
            albumUrl: smallestAlbumImage.url,
            href: item.track.href,
          };
        })
      );
    });
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;

    spotifyApi.searchArtists(search).then((res) => {
      if (cancel) return;
      console.log(res.body.artists.items[0]);

      if (res.body.artists.items[0]) {
        setSinger(res.body.artists.items[0].name);
        setArtistId(res.body.artists.items[0].id);
        setFollowers(res.body.artists.items[0].followers.total);

        if (res.body.artists.items[0].images[0]) {
          setSingerPic(res.body.artists.items[0].images[0].url);
        }
      }
    });

    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      console.log(res.body);
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
            href: track.href,
          };
        })
      );
    });
    return () => (cancel = true);
  }, [search, accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    if (!singer) return;

    let cancel = false;

    spotifyApi.searchTracks(singer).then((res) => {
      if (cancel) return;
      console.log(res.body);
      setArtistAlbums(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
            href: track.href,
          };
        })
      );
    });
  }, [singer, accessToken]);

  if (!user) return;

  return (
    <div className="outerWrap">
      <div className="App">
        <Nav choosePage={choosePage} />
        <div className="main">
          {" "}
          {user.body && <TopNav user={user} code={code} />}
          <div className="listView">
            <Container
              className="d-flex flex-column py-2"
              style={{ height: "85vh" }}
            >
              {page == "search" && (
                <>
                  <Form.Control
                    type="search"
                    placeholder="Rechercher artiste/chanson"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />{" "}
                  <br />
                  {search && singerPic && singer && (
                    <>
                      <div className="title">Top result</div>
                      <div className="cardsWrap">
                        <div className="card">
                          <div className="cardImage">
                            <img src={singerPic} alt="Pic one" />
                          </div>
                          <div className="cardContent">
                            <h2>{singer}</h2>
                            <span>Artist</span>
                          </div>
                          <span className="playIcon" onClick={albumPage}>
                            <PlayIcon />{" "}
                          </span>
                        </div>
                      </div>
                      <div className="title">Songs</div>
                    </>
                  )}
                  <div className="listView" style={{ overflowY: "auto" }}>
                    {searchResults.map((track) => {
                      return (
                        <TrackSearchResult
                          track={track}
                          key={track.uri}
                          href={track.href}
                          chooseTrack={chooseTrack}
                        />
                      );
                    })}
                  </div>
                </>
              )}
              {page == "home" && (
                <>
                  <h1 style={{ color: "white" }}>
                    Daily Mix 3 - "{daily.length} songs"
                  </h1>
                  <div className="listView" style={{ overflowY: "auto" }}>
                    {daily.map((track) => {
                      return (
                        <TrackHomePage
                          track={track}
                          key={track.uri}
                          href={track.href}
                          date={track.date}
                          chooseTrack={chooseTrack}
                        />
                      );
                    })}
                  </div>
                </>
              )}

              {page == "library" && (
                <>
                  <h1 style={{ color: "white" }}>
                    Recently played - " {recent.length} songs"
                  </h1>
                  <div className="listView" style={{ overflowY: "auto" }}>
                    {recent.map((track, index) => {
                      return (
                        <TrackRecentPlayed
                          track={track}
                          key={track.uri + index}
                          href={track.href}
                          chooseTrack={chooseTrack}
                        />
                      );
                    })}
                  </div>
                </>
              )}
              {page == "albums" && (
                <>
                  <h1 style={{ color: "white" }}>
                    {singer} <img src={VerifIcon} alt={VerifIcon} />
                    {"  "}
                    <span className="text-muted" style={{ fontSize: "20px" }}>
                      {followers} Followers
                    </span>
                  </h1>

                  <div className="cardsWrap2">
                    <div className="card">
                      <div className="cardImage">
                        <img src={singerPic} alt="Pic one" />
                      </div>
                    </div>
                  </div>
                  <div className="listView" style={{ overflowY: "auto" }}>
                    {artistAlbums.map((track, index) => {
                      return (
                        <TrackSearchResult
                          track={track}
                          key={track.uri}
                          href={track.href}
                          date={track.date}
                          chooseTrack={chooseTrack}
                        />
                      );
                    })}
                  </div>
                </>
              )}
              <div>
                <Player
                  accessToken={accessToken}
                  trackUri={playingTrack?.uri}
                />
              </div>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
