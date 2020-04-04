import React, { Component } from "react";
import axios from "axios";
import shortid from "shortid";
import FollowBtn from "../FollowBtn";
import ArtistForm from "../ArtistForm";
import { SubContainer, PlaylistContainer, Loader } from "./styles";

export default class AppContainer extends Component {
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
      artistInput: [
        {
          name: "",
          id: "primary",
        },
      ],
      playlistInput: "",
      showPLaylist: false,
      followingPlaylist: false,
      followRequest: false,
      editPlaylistName: false,
    };

    this.morphInputRef = React.createRef();
    this.focusMorphInput = false;
    this.nextInputRef = React.createRef();
    this.focusNextInput = false;
  }

  componentDidMount() {
    const hash = window.location.hash
      .substring(1)
      .split("&")
      .reduce(function (initial, item) {
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
      let autoNameSaved = localStorage.getItem("autoName");
      artistSaved = JSON.parse(artistSaved);
      playlistSaved = JSON.parse(playlistSaved);
      autoNameSaved = JSON.parse(autoNameSaved);
      this.setState({
        artistInput: artistSaved,
        playlistInput: playlistSaved,
        editPlaylistName: autoNameSaved,
      });
      this.createRecomendedPlaylist(
        artistSaved,
        autoNameSaved && playlistSaved
      );
    }
  }

  componentDidUpdate() {
    if (this.focusMorphInput) {
      this.morphInputRef.current.focus();
      this.focusMorphInput = false;
    }

    if (this.focusNextInput) {
      this.nextInputRef.current.focus();
      this.focusNextInput = false;
    }
  }

  submitHandler = (event) => {
    event.preventDefault();

    this.createRecomendedPlaylist(
      this.state.artistInput,
      this.state.editPlaylistName && this.state.playlistInput
    );
  };

  changeHandler = (event) =>
    this.setState({
      [event.target.name]: event.target.value,
    });

  artistInputChangeHandler = (event, id) => {
    this.setState({
      artistInput: this.state.artistInput.map((artist) => {
        if (artist.id === id)
          artist = {
            ...artist,
            name: event.target.value,
          };
        return artist;
      }),
    });
  };

  createInputHandler = () => {
    this.focusNextInput = true;
    this.setState({
      artistInput: [
        ...this.state.artistInput,
        {
          name: "",
          id: shortid.generate(),
        },
      ],
    });
  };

  deleteInputHandler = (id) =>
    this.setState({
      artistInput: this.state.artistInput.filter((artist) => artist.id !== id),
    });

  toggleEditMod = () => {
    if (!this.state.editPlaylistName) this.focusMorphInput = true;

    this.setState({
      editPlaylistName: !this.state.editPlaylistName,
    });
  };

  render() {
    const {
      artistInput,
      playlistInput,
      loading,
      showPLaylist,
      followingPlaylist,
      editPlaylistName,
    } = this.state;

    return (
      <SubContainer>
        <ArtistForm
          editPlaylistName={editPlaylistName}
          playlistInput={playlistInput}
          artistInput={artistInput}
          morphInputRef={this.morphInputRef}
          changeHandler={this.changeHandler}
          submitHandler={this.submitHandler}
          toggleEditMod={this.toggleEditMod}
          artistInputChangeHandler={this.artistInputChangeHandler}
          createInputHandler={this.createInputHandler}
          deleteInputHandler={this.deleteInputHandler}
          nextInputRef={this.nextInputRef}
        />
        <PlaylistContainer>
          {loading && <Loader>Loading</Loader>}
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
              <FollowBtn
                follow={this.followPlaylist}
                unfollow={this.unfollowPlaylist}
                following={followingPlaylist}
              >
                Save to Your Library
              </FollowBtn>
            </>
          )}
        </PlaylistContainer>
      </SubContainer>
    );
  }

  getSecurityToken = () => {
    localStorage.setItem("artist", JSON.stringify(this.state.artistInput));
    localStorage.setItem("playlist", JSON.stringify(this.state.playlistInput));
    localStorage.setItem(
      "autoName",
      JSON.stringify(this.state.editPlaylistName)
    );
    const authEndpoint = "https://accounts.spotify.com/authorize";
    const clientId = "6e2aee291e7e4b1792f8c9aece6d93ab";
    const redirectUri = this.pageLocation;
    const scopes = ["playlist-modify-public playlist-modify-private"];
    window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
      "%20"
    )}&response_type=token&show_dialog=false`;
  };

  autoPlaylistName = (artistInput) => {
    let name =
      artistInput.charAt(0).toUpperCase() + artistInput.slice(1) + " Playlist";

    this.setState({
      playlistInput: name,
    });

    return name;
  };

  createRecomendedPlaylist = async (artistInput, playlistInput) => {
    if (this.state.loading || playlistInput === "") return;

    const filteredArtists = artistInput.filter((artist) => artist.name !== "");
    if (filteredArtists.length === 0) return;

    if (!this.token) {
      this.getSecurityToken();
      return;
    } else {
      localStorage.removeItem("artist");
      localStorage.removeItem("playlist");
      localStorage.removeItem("autoName");
    }

    this.setState({
      loading: true,
      showPLaylist: false,
    });

    await Promise.all([
      await Promise.all(
        filteredArtists.map((artist) => this.getArtistTopTracks(artist.name, 5))
      ),
      this.getUserID(),
    ]);

    if (!this.tracks.length) {
      this.setState({
        loading: false,
        showPLaylist: false,
      });
      alert("Artista Invalido");
      return;
    }

    if (!playlistInput) playlistInput = "Recomendations"; //this.autoPlaylistName(artistInput);

    this.shuffle(this.tracks);

    await this.createPlaylist(playlistInput);
    await Promise.all([this.addAllTracksToPlaylist(), this.unfollowPlaylist()]);

    this.tracks = [];

    this.setState({
      loading: false,
      showPLaylist: true,
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
            Authorization: "Bearer " + this.token,
          },
        }
      );
      artist_id = response.data.artists.items[0].id;
    } catch (err) {
      console.log("Artist Not Found" + err);
      return;
    }

    try {
      const response = await axios.get(
        this.apiurl + `/artists/${artist_id}/top-tracks?country=BR`,
        {
          headers: {
            Authorization: "Bearer " + this.token,
          },
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
          uris: this.tracks.map((track) => track.uri),
        },
        {
          headers: {
            Authorization: "Bearer " + this.token,
          },
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
          Authorization: "Bearer " + this.token,
        },
      });
      // console.log(response.data);
      this.user_id = response.data.id;
    } catch (err) {
      console.log("Cant get ID");
    }
  };

  createPlaylist = async (playlistName) => {
    try {
      const response = await axios.post(
        this.apiurl + `/users/${this.user_id}/playlists`,
        {
          name: playlistName,
          public: false,
        },
        {
          headers: {
            Authorization: "Bearer " + this.token,
          },
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
    });

    try {
      await axios.delete(
        this.apiurl + `/playlists/${this.playlist.id}/followers`,
        {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        }
      );
      this.setState({
        followingPlaylist: false,
      });
    } catch (err) {
      console.log("Cant Unfollow" + err);
    }

    this.setState({
      followRequest: false,
    });
  };

  followPlaylist = async () => {
    if (this.state.followRequest) return;
    this.setState({
      followRequest: true,
    });

    try {
      await axios.put(
        this.apiurl + `/playlists/${this.playlist.id}/followers`,
        {
          public: true,
        },
        {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        }
      );
      this.setState({
        followingPlaylist: true,
      });
    } catch (err) {
      console.log("Cant Follow" + err);
    }

    this.setState({
      followRequest: false,
    });
  };

  shuffle = (array) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };
}
