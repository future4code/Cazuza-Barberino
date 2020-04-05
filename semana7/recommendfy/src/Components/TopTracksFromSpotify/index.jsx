import React, { Component } from "react";
import shortid from "shortid";
import FollowBtn from "../FollowBtn";
import ArtistForm from "../ArtistForm";
import { SubContainer, PlaylistContainer, Loader } from "./styles";
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
} from "./spotifyApi";

export default class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.pageLocation = window.location.origin;
    this.playlist = null;
    this.state = {
      loading: false,
      artistInput: [
        {
          name: "",
          number: 5,
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
          numberInputChangeHandler={this.numberInputChangeHandler}
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
                Save to your Spotify library
              </FollowBtn>
            </>
          )}
        </PlaylistContainer>
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
    if (this.state.loading || playlistInput === "") return;

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
      loading: true,
      showPLaylist: false,
    });

    let trackList = [];
    const user_id = await getUserID();

    await Promise.all(
      filteredArtists.map((artist) =>
        getArtistTopTracks(artist.name, Math.max(artist.number, 1), trackList)
      )
    );

    if (!trackList.length) {
      alert("Nenhum artista válido");
      this.setState({
        loading: false,
        showPLaylist: false,
      });
      return;
    }

    if (!playlistInput) playlistInput = "Recomendations";

    this.shuffle(trackList);

    this.playlist = await createPlaylist(playlistInput, user_id);
    await Promise.all([
      addAllTracksToPlaylist(this.playlist.id, trackList),
      unfollowPlaylist(this.playlist.id, () => {}),
    ]);

    this.setState({
      loading: false,
      showPLaylist: true,
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
