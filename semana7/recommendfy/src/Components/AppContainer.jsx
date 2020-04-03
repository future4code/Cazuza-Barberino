import React, { Component } from "react";
import axios from "axios";
import {} from "./styles";

export default class extends Component {
  constructor(props) {
    super(props);

    this.pageLocation = window.location.origin;
    this.token = null;
    this.tracks = [];
    this.playlist = null;
    this.apiurl = "https://api.spotify.com/v1";
    this.user_id = "";
    this.state = {
      loading: false,
      artistInput: "",
      playlistInput: "",
      showPLaylist: false,
      followingPlaylist: false,
      followRequest: false
    };
  }

  componentDidMount() {
    const hash = window.location.hash
      .substring(1)
      .split("&")
      .reduce(function(initial, item) {
        if (item) {
          var parts = item.split("=");
          initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
      }, {});

    window.location.hash = "";
    this.token = hash.access_token;

    if (this.token) {
      let artistSaved = localStorage.getItem("artist");
      let playlistSaved = localStorage.getItem("playlist");
      artistSaved = JSON.parse(artistSaved);
      playlistSaved = JSON.parse(playlistSaved);
      this.setState({
        artistInput: artistSaved,
        playlistInput: playlistSaved
      });
      this.createRecomendedPlaylist(artistSaved, playlistSaved);
    }
  }

  getSecurityToken = () => {
    localStorage.setItem("artist", JSON.stringify(this.state.artistInput));
    localStorage.setItem("playlist", JSON.stringify(this.state.playlistInput));
    const authEndpoint = "https://accounts.spotify.com/authorize";
    const clientId = "6e2aee291e7e4b1792f8c9aece6d93ab";
    const redirectUri = this.pageLocation;
    const scopes = ["playlist-modify-public playlist-modify-private"];
    window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
      "%20"
    )}&response_type=token&show_dialog=false`;
  };

  createRecomendedPlaylist = async (artistInput, playlistInput) => {
    if (this.state.loading) return;

    if (!this.token) {
      this.getSecurityToken();
      return;
    } else {
      localStorage.removeItem("artist");
      localStorage.removeItem("playlist");
    }

    this.setState({
      loading: true,
      showPLaylist: false,
      createFromSavedData: false
    });

    await Promise.all([
      this.getArtistTopTracks(artistInput, 5),
      this.getUserID()
    ]);
    await this.createPlaylist(playlistInput);
    await Promise.all([this.addAllTracksToPlaylist(), this.unfollowPlaylist()]);

    this.setState({
      loading: false,
      showPLaylist: true
    });
  };

  getArtistTopTracks = async (artistName, numOfTracks) => {
    const type = "artist";
    let artist_id = "";

    try {
      const response = await axios.get(
        this.apiurl + `/search?q=${artistName}&type=${type}&limit=1`,
        {
          headers: {
            Authorization: "Bearer " + this.token
          }
        }
      );
      artist_id = response.data.artists.items[0].id;
    } catch (err) {
      console.log("Artist Not Found" + err);
    }

    try {
      const response = await axios.get(
        this.apiurl + `/artists/${artist_id}/top-tracks?country=BR`,
        {
          headers: {
            Authorization: "Bearer " + this.token
          }
        }
      );

      for (let i = 0; i < numOfTracks; i++)
        this.tracks.push(response.data.tracks[i]);
    } catch (err) {
      console.log("Tracks Not Found" + err);
    }
  };

  addAllTracksToPlaylist = async () => {
    try {
      await axios.post(
        this.apiurl + `/playlists/${this.playlist.id}/tracks`,
        {
          uris: this.tracks.map(track => track.uri)
        },
        {
          headers: {
            Authorization: "Bearer " + this.token
          }
        }
      );
    } catch (err) {
      console.log("Cant Add Track" + err);
    }
  };

  getUserID = async () => {
    try {
      const response = await axios.get(this.apiurl + "/me", {
        headers: {
          Authorization: "Bearer " + this.token
        }
      });
      // console.log(response.data);
      this.user_id = response.data.id;
    } catch (err) {
      console.log("Cant get ID");
    }
  };

  createPlaylist = async playlistName => {
    try {
      const response = await axios.post(
        this.apiurl + `/users/${this.user_id}/playlists`,
        {
          name: playlistName,
          public: false
        },
        {
          headers: {
            Authorization: "Bearer " + this.token
          }
        }
      );
      this.playlist = response.data;
    } catch (err) {
      console.log(err);
    }
  };

  unfollowPlaylist = async () => {
    if (this.state.followRequest) return;
    this.setState({
      followRequest: true,
      followingPlaylist: false
    });

    try {
      await axios.delete(
        this.apiurl + `/playlists/${this.playlist.id}/followers`,
        {
          headers: {
            Authorization: "Bearer " + this.token
          }
        }
      );
    } catch (err) {
      console.log("Cant Unfollow" + err);
    }

    this.setState({
      followRequest: false
    });
  };

  followPlaylist = async () => {
    if (this.state.followRequest) return;
    this.setState({
      followRequest: true,
      followingPlaylist: true
    });

    try {
      await axios.put(
        this.apiurl + `/playlists/${this.playlist.id}/followers`,
        {
          public: true
        },
        {
          headers: {
            Authorization: "Bearer " + this.token
          }
        }
      );
    } catch (err) {
      console.log("Cant Follow" + err);
    }

    this.setState({
      followRequest: false
    });
  };

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  submitHandler = event => {
    event.preventDefault();
    this.createRecomendedPlaylist(
      this.state.artistInput,
      this.state.playlistInput
    );
  };

  render() {
    const {
      artistInput,
      playlistInput,
      loading,
      showPLaylist,
      followingPlaylist
    } = this.state;

    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <input
            placeholder="Playlist name"
            onChange={this.changeHandler}
            name="playlistInput"
            value={playlistInput}
            type="text"
          />
          <input
            placeholder="Artist"
            onChange={this.changeHandler}
            name="artistInput"
            value={artistInput}
            type="text"
          />
          <button type="submit">Criar Playlist</button>
        </form>
        {loading && <h2>Loading</h2>}
        {showPLaylist && (
          <>
            <iframe
              title="spotify"
              src={`https://open.spotify.com/embed/playlist/${this.playlist.id}`}
              width="300"
              height="380"
              frameBorder="0"
              allowtransparency="true"
              allow="encrypted-media"
            ></iframe>
            {followingPlaylist ? (
              <button onClick={this.unfollowPlaylist}>Unfollow Playlist</button>
            ) : (
              <button onClick={this.followPlaylist}>Follow Playlist</button>
            )}
          </>
        )}
      </div>
    );
  }
}
