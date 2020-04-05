import axios from "axios";

const apiurl = "https://api.spotify.com/v1";
let token = null;

export const requestSecurityToken = (pageLocation) => {
  const authEndpoint = "https://accounts.spotify.com/authorize";
  const clientId = "6e2aee291e7e4b1792f8c9aece6d93ab";
  const redirectUri = pageLocation;
  const scopes = ["playlist-modify-public playlist-modify-private"];
  window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
  )}&response_type=token&show_dialog=false`;
};

export const getToken = () => {
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
  token = hash.access_token;
};

export const tokenIsValid = () => token;

export const getArtistTopTracks = async (
  artistName,
  numOfTracks,
  trackList
) => {
  const type = "artist";
  let artist_id = "";

  try {
    const response = await axios.get(
      apiurl + `/search?q=${artistName}&type=${type}&limit=1`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    artist_id = response.data.artists.items[0].id;
  } catch (err) {
    console.log("Artist Not Found " + err);
    return;
  }

  try {
    const response = await axios.get(
      apiurl + `/artists/${artist_id}/top-tracks?country=BR`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    for (let i = 0; i < numOfTracks; i++)
      trackList.push(response.data.tracks[i]);
  } catch (err) {
    console.log("Tracks Not Found " + err);
  }
};

export const getUserID = async () => {
  try {
    const response = await axios.get(apiurl + "/me", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    // console.log(response.data);
    return response.data.id;
  } catch (err) {
    console.log("Cant get ID " + err);
  }
};

export const createPlaylist = async (playlistName, user_id) => {
  try {
    const response = await axios.post(
      apiurl + `/users/${user_id}/playlists`,
      {
        name: playlistName,
        public: false,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const addAllTracksToPlaylist = async (playlist_id, trackList) => {
  try {
    await axios.post(
      apiurl + `/playlists/${playlist_id}/tracks`,
      {
        uris: trackList.map((track) => track.uri),
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  } catch (err) {
    console.log("Cant Add Track " + err);
  }
};

export const unfollowPlaylist = async (playlist_id, successCallback) => {
  try {
    await axios.delete(apiurl + `/playlists/${playlist_id}/followers`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    successCallback();
  } catch (err) {
    console.log("Cant Unfollow" + err);
  }
};

export const followPlaylist = async (playlist_id, successCallback) => {
  try {
    await axios.put(
      apiurl + `/playlists/${playlist_id}/followers`,
      {
        public: true,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    successCallback();
  } catch (err) {
    console.log("Cant Follow" + err);
  }
};
