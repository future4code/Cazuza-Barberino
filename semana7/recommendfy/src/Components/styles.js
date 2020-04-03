import styled, { css } from "styled-components";
import { FiArrowRightCircle, FiCheckCircle } from "react-icons/fi";

export const theme = {
  bg: "black",
  bg2: "#1DB954",
  fc: "white"
};

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  padding: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  background-color: ${props => props.theme.bg};
`;

export const Form = styled.form`
  border: 2px solid red;
  width: 100%;
  max-width: 500px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 20px;
`;

export const DefaultBox = styled.div`
  width: 100%;
  height: 40px;
  border: none;

  background-color: ${props => props.theme.bg2};
  color: ${props => props.theme.fc};

  font-size: 20px;
  border-radius: 20px;
  padding: 0 20px;
`;

export const DefaultBtn = styled(DefaultBox)`
  cursor: pointer;
`;

export const MorphWrapper = styled(DefaultBox)`
  padding: 0;
  position: relative;
  background-color: transparent;

  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const MorphBox = styled(DefaultBox)`
  transition: 0.5s;
  width: ${props => (props.disabled ? "0" : "100%")};
`;

export const MorphText = styled.p`
  position: absolute;
  left: 20px;
  transition: left 0.2s, opacity 0.5s;

  ${props =>
    props.editPlaylistName &&
    css`
      left: -250px;
      opacity: 0;
    `};
`;

export const MorphChckBtn = styled(FiCheckCircle)`
  position: absolute;
  padding: 5px;
  cursor: pointer;
  transition: 0.2s;
  ${props =>
    props.editPlaylistName &&
    css`
      transform: rotate(-135deg);
      opacity: 0;
    `};
`;

export const MorphCancelBtn = styled(FiArrowRightCircle)`
  position: absolute;
  padding: 5px;
  cursor: pointer;
  opacity: 0;
  transform: rotate(135deg);
  transition: 0.2s;
  ${props =>
    props.editPlaylistName &&
    css`
      opacity: 1;
      transform: rotate(0deg);
    `};
`;
