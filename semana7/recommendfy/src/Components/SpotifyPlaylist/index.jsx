import React from "react";
import FollowBtn from "../FollowBtn";
import { PlaylistContainer, Loader, InstructionsText, Green } from "./styles";

function SpotifyPlaylist({
  followPlaylist,
  unfollowPlaylist,
  following,
  playlist_id,
  artistList,
  followArtist,
  unfollowArtist,
  content,
}) {
  const sideContent = () => {
    switch (content) {
      case "loading":
        return <Loader />;
      case "playlist":
        return (
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
        );
      default:
        return (
          <InstructionsText>
            <Green>1.</Green> Choose your playlist name or let it be{" "}
            <Green>automatic</Green> generated.
            <br />
            <br />
            <Green>2</Green>. Type the <Green>name</Green> of one or more
            band/artist.
            <br />
            <br />
            <Green>3.</Green> Choose the <Green>number</Green> of tracks you
            want for each artist/band.
            <br />
            <br />
            <Green>4.</Green> Press <Green>Create Playlist</Green> and watch the
            magic happen.
          </InstructionsText>
        );
    }
  };

  return <PlaylistContainer>{sideContent()}</PlaylistContainer>;
}

export default SpotifyPlaylist;
