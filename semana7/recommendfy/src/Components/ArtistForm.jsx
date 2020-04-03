import React from "react";
import { FiArrowRightCircle, FiCheckCircle } from "react-icons/fi";
import ArtistInput from "./ArtistInput";
import {
  Form,
  DefaultBtn,
  MorphBox,
  MorphCancelBtn,
  MorphChckBtn,
  MorphText,
  MorphWrapper,
} from "./styles";

export default function ArtistForm({
  artistInput,
  playlistInput,
  editPlaylistName,
  morphInputRef,
  changeHandler,
  submitHandler,
  toggleEditMod,
  artistInputChangeHandler,
  createInputHandler,
  deleteInputHandler,
  nextInputRef,
}) {
  return (
    <Form onSubmit={submitHandler}>
      <MorphWrapper>
        <MorphText editing={editPlaylistName}>Auto Name Playlist</MorphText>
        <MorphBox
          as="input"
          ref={morphInputRef}
          placeholder="Playlist name"
          onChange={changeHandler}
          name="playlistInput"
          value={playlistInput}
          type="text"
          disabled={!editPlaylistName}
        />
        <MorphChckBtn editing={editPlaylistName} onClick={toggleEditMod}>
          <FiCheckCircle size="100%" />
        </MorphChckBtn>
        <MorphCancelBtn editing={editPlaylistName} onClick={toggleEditMod}>
          <FiArrowRightCircle size="100%" />
        </MorphCancelBtn>
      </MorphWrapper>

      {artistInput.map((artist, index) => (
        <ArtistInput
          key={artist.id}
          value={artist.name}
          changeHandler={(event) => artistInputChangeHandler(event, artist.id)}
          showDelete={artistInput.length > 1}
          showCreate={artist.name !== "" && index === artistInput.length - 1}
          createInput={createInputHandler}
          deleteInput={() => deleteInputHandler(artist.id)}
          innerRef={index === artistInput.length - 1 ? nextInputRef : null}
        />
      ))}

      <DefaultBtn as="button" type="submit">
        Create Playlist
      </DefaultBtn>
    </Form>
  );
}
