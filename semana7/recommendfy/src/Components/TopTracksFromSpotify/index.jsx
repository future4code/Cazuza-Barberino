import React, { Component } from "react";
import shortid from "shortid";
import ArtistForm from "../ArtistForm";
import SpotifyPlaylist from "../SpotifyPlaylist";
import { SubContainer } from "./styles";
import {
  getArtistTopTracks,
  addAllTracksToPlaylist,
  createPlaylist,
  unfollowPlaylist,
  getUserID,
  followPlaylist,
  requestSecurityToken,
  tokenIsValid,
  getToken,
  followArtist,
  unfollowArtist,
} from "../../Services/spotifyApi";

export default class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.pageLocation = window.location.origin;
    this.playlist = null;
    this.state = {
      sideContent: "instructions",
      loading: false,
      artistInput: [
        {
          name: "",
          number: 5,
          id: "primary",
        },
      ],
      artistList: [],
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
    getToken();
    if (tokenIsValid()) this.createPlaylistAfterValidation();
  }

  createPlaylistAfterValidation = () => {
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
    this.createRecomendedPlaylist(artistSaved, autoNameSaved && playlistSaved);
  };

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

  numberInputChangeHandler = (event, id) => {
    const re = /^[0-9\b]+$/;
    let value = event.target.value;
    if (!re.test(value) && value !== "") return;

    if (Number(value) > 10) value = 10;

    this.setState({
      artistInput: this.state.artistInput.map((artist) => {
        if (artist.id === id)
          artist = {
            ...artist,
            number: value,
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
          number: 5,
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
      sideContent,
      followingPlaylist,
      editPlaylistName,
      artistList,
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
          numberInputChangeHandler={this.numberInputChangeHandler}
          createInputHandler={this.createInputHandler}
          deleteInputHandler={this.deleteInputHandler}
          nextInputRef={this.nextInputRef}
        />
        <SpotifyPlaylist
          content={sideContent}
          following={followingPlaylist}
          playlist_id={this.playlist && this.playlist.id}
          followPlaylist={this.followPlaylist}
          unfollowPlaylist={this.unfollowPlaylist}
          artistList={artistList}
          followArtist={this.followArtist}
          unfollowArtist={this.unfollowArtist}
        />
      </SubContainer>
    );
  }

  saveStateToLocal = () => {
    localStorage.setItem("artist", JSON.stringify(this.state.artistInput));
    localStorage.setItem("playlist", JSON.stringify(this.state.playlistInput));
    localStorage.setItem(
      "autoName",
      JSON.stringify(this.state.editPlaylistName)
    );
  };

  eraseStateFromLocal = () => {
    localStorage.removeItem("artist");
    localStorage.removeItem("playlist");
    localStorage.removeItem("autoName");
  };

  createRecomendedPlaylist = async (artistInput, playlistInput) => {
    if (this.state.sideContent === "loading") return;

    const filteredArtists = artistInput.filter((artist) => artist.name !== "");
    if (filteredArtists.length === 0) return;

    if (!tokenIsValid()) {
      this.saveStateToLocal();
      requestSecurityToken(this.pageLocation);
      return;
    } else {
      this.eraseStateFromLocal();
    }

    this.setState({
      sideContent: "loading",
      followingPlaylist: false,
      followRequest: false,
    });

    let trackList = [],
      artistList = [];
    const user_id = await getUserID();

    await Promise.all(
      filteredArtists.map((artist) =>
        getArtistTopTracks(
          artist.name,
          Math.max(artist.number, 1),
          trackList,
          artistList
        )
      )
    );

    if (!trackList.length) {
      alert("Nenhum artista válido");
      this.setState({
        sideContent: "instructions",
      });
      return;
    }

    if (!playlistInput || playlistInput === "")
      playlistInput = artistList.reduce((playlistName, artist) => {
        return playlistName + artist.name + " | ";
      }, "| ");

    this.shuffle(trackList);

    this.playlist = await createPlaylist(playlistInput, user_id);
    await Promise.all([
      addAllTracksToPlaylist(this.playlist.id, trackList),
      unfollowPlaylist(this.playlist.id, () => {}),
    ]);

    this.setState({
      sideContent: "playlist",
      artistList: artistList,
    });
  };

  unfollowPlaylist = async () => {
    if (this.state.followRequest) return;
    this.setState({
      followRequest: true,
    });

    await unfollowPlaylist(
      this.playlist.id,
      this.setState({
        followingPlaylist: false,
      })
    );

    this.setState({
      followRequest: false,
    });
  };

  followPlaylist = async () => {
    if (this.state.followRequest) return;
    this.setState({
      followRequest: true,
    });

    await followPlaylist(
      this.playlist.id,
      this.setState({
        followingPlaylist: true,
      })
    );

    this.setState({
      followRequest: false,
    });
  };

  followArtist = async (id) => {
    if (this.state.followRequest) return;
    this.setState({
      followRequest: true,
    });

    await followArtist(id, () => this.changeArtistFollowState(true, id));

    this.setState({
      followRequest: false,
    });
  };

  unfollowArtist = async (id) => {
    if (this.state.followRequest) return;
    this.setState({
      followRequest: true,
    });

    await unfollowArtist(id, () => this.changeArtistFollowState(false, id));

    this.setState({
      followRequest: false,
    });
  };

  changeArtistFollowState = (state, id) => {
    this.setState({
      artistList: this.state.artistList.map((artist) => {
        if (artist.id === id) {
          artist = {
            ...artist,
            following: state,
          };
        }
        return artist;
      }),
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
