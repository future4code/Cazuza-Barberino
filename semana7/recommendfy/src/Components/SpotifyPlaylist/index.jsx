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
  artistList,
  followArtist,
  unfollowArtist,
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
          {artistList.map((artist) => (
            <FollowBtn
              key={artist.id}
              follow={() => followArtist(artist.id)}
              unfollow={() => unfollowArtist(artist.id)}
              following={artist.following}
            >
              Follow {artist.name} on Spotify
            </FollowBtn>
          ))}
        </>
      )}
    </PlaylistContainer>
  );
}

export default SpotifyPlaylist;
