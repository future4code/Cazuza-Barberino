import React from "react";
import FollowBtn from "../FollowBtn";
import { PlaylistContainer, Loader } from "./styles";

function SpotifyPlaylist({
  loading,
  followPlaylist,
  unfollowPlaylist,
  following,
  showPLaylist,
  playlist_id,
}) {
  return (
    <PlaylistContainer>
      {loading && <Loader>Loading</Loader>}
      {showPLaylist && (
        <>
          <FollowBtn
            follow={followPlaylist}
            unfollow={unfollowPlaylist}
            following={following}
          >
            <strong>Save to your Spotify library</strong>
          </FollowBtn>
          <iframe
            title="spotify"
            src={`https://open.spotify.com/embed/playlist/${playlist_id}`}
            width="300"
            height="380"
            frameBorder="0"
            allowtransparency="true"
            allow="encrypted-media"
          ></iframe>
        </>
      )}
    </PlaylistContainer>
  );
}

export default SpotifyPlaylist;
