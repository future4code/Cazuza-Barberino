import styled, { css } from "styled-components";
import { FiArrowRightCircle, FiCheckCircle } from "react-icons/fi";

export const theme = {
  bg: "#191414",
  bg2: "#1DB954",
  bg3: "#2C5D91",
  bg4: "#552F6D",
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

  /* background-color: ${props => props.theme.bg}; */

  background: linear-gradient(45deg, ${props => props.theme.bg} 0%, ${props =>
  props.theme.bg3} 25%,  ${props => props.theme.bg4} 75%, ${props =>
  props.theme.bg} 100%)

`;

export const Form = styled.form`
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
  transition: filter 0.3s, 0.2s;
  box-shadow: 0px 5px 0 ${props => props.theme.bg};

  &:hover {
    filter: brightness(1.2);
  }

  &:active {
    transform: translateY(5px);
    box-shadow: 0px 0px 0 ${props => props.theme.bg};
  }
`;

export const MorphWrapper = styled(DefaultBox)`
  padding: 0;
  position: relative;
  background-color: transparent;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  box-shadow: inset 0px 0px 10px ${props => props.theme.bg};
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
