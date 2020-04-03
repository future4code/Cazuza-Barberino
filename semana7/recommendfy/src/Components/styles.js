import styled, { css } from "styled-components";

export const theme = {
  bg: "#191414",
  bg2: "#1DB954",
  bg3: "#2C5D91",
  bg4: "#552F6D",
  fc: "white",
};

export const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;

  background: linear-gradient(
    45deg,
    ${(props) => props.theme.bg} 0%,
    ${(props) => props.theme.bg3} 25%,
    ${(props) => props.theme.bg4} 75%,
    ${(props) => props.theme.bg} 100%
  );

  filter: blur();
`;

export const Container = styled.div`
  flex: none;
  position: absolute;
  width: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
`;

export const Main = styled.main`
  width: 100%;
  min-height: 100%;
  padding: 20px;
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const Footer = styled.div`
  background-color: ${(props) => props.theme.bg};

  height: 100px;
`;

export const SiteTitle = styled.h1`
  color: ${(props) => props.theme.fc};
  font-size: 50px;
  margin-bottom: 100px;
`;

export const SubContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-bottom: 100px;

  padding: 40px;
  background: linear-gradient(
    45deg,
    ${(props) => props.theme.bg} 0%,
    ${(props) => props.theme.bg3} 25%,
    ${(props) => props.theme.bg4} 75%,
    ${(props) => props.theme.bg} 100%
  );

  box-shadow: 0 0 10px ${(props) => props.theme.bg};

  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  column-gap: 70px;
  row-gap: 70px;
`;

export const PlaylistContainer = styled.div`
  width: 300px;
  min-height: 400px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const Loader = styled.div`
  align-self: center;
  justify-self: center;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 500px;
  min-width: 300px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 20px;

  flex: 1;
`;

export const DefaultBox = styled.div`
  width: 100%;
  height: 40px;
  border: none;

  background-color: ${(props) => props.theme.bg2};
  color: ${(props) => props.theme.fc};

  font-size: 20px;
  border-radius: 20px;
  padding: 0 20px;
`;

export const DefaultBtn = styled(DefaultBox)`
  cursor: pointer;
  transition: filter 0.3s, 0.2s;
  box-shadow: 0px 5px 0 ${(props) => props.theme.bg};

  &:hover {
    filter: brightness(1.2);
  }

  &:active {
    transform: translateY(5px);
    box-shadow: 0px 0px 0 ${(props) => props.theme.bg};
  }
`;

export const DefaultWrapper = styled(DefaultBox)`
  padding: 0;
  position: relative;
  background-color: transparent;

  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const MorphWrapper = styled(DefaultWrapper)`
  box-shadow: inset 0px 0px 10px ${(props) => props.theme.bg};
`;

export const MorphBox = styled(DefaultBox)`
  transition: 0.5s;
  width: ${(props) => (props.disabled ? "0" : "100%")};
`;

export const MorphText = styled.p`
  position: absolute;
  left: 20px;
  transition: left 0.2s, opacity 0.5s;

  ${(props) =>
    props.editing &&
    css`
      left: -250px;
      opacity: 0;
    `};
`;

export const NoErroWrapper = styled.div`
  width: 40px;
  height: 40px;
  position: absolute;
  padding: 5px;
  cursor: pointer;
  transition: 0.2s;
  border-radius: 50%;
`;

export const MorphChckBtn = styled(NoErroWrapper)`
  ${(props) =>
    props.editing &&
    css`
      transform: rotate(-135deg);
      opacity: 0;
    `};
`;

export const MorphCancelBtn = styled(NoErroWrapper)`
  opacity: 0;
  transform: rotate(135deg);
  ${(props) =>
    props.editing &&
    css`
      opacity: 1;
      transform: rotate(0deg);
    `};
`;

export const CreateInputIcon = styled(NoErroWrapper)`
  right: -45px;
  background-color: ${(props) => props.theme.bg2};
  border-radius: 50%;
  transform: scale(${(props) => (props.showCreate ? 1 : 0)});
  transition: 0.3s;
`;

export const DeleteInputIcon = styled(NoErroWrapper)`
  padding: 5px;
  transform: scale(${(props) => (props.showDelete ? 1 : 0)});
  transition: 0.3s;
`;

export const FollowBtnContainer = styled.div`
  color: ${(props) => props.theme.fc};
  position: relative;
  font-size: 18px;

  width: 100%;
  padding: 5px 15px;
`;

export const BugFixingWrapperOfTheHolyProgrammerOrder = styled.div`
  position: absolute;

  width: 24px;
  height: 24px;

  right: 15px;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

const IconWrapper = styled.div`
  position: absolute;

  width: 100%;
  height: 100%;
`;

export const FollowingIcon = styled(IconWrapper)`
  opacity: 0;
  pointer-events: none;

  ${(props) =>
    props.following &&
    css`
      opacity: 1;
    `}
`;

export const UnfollowingIcon = styled(IconWrapper)`
  transition: 0.5s;

  ${(props) =>
    props.following &&
    css`
      opacity: 0;
      transform: scale(2);
    `}
`;
