import styled, { keyframes, css } from "styled-components";

export const PlaylistContainer = styled.div`
  width: 300px;
  min-height: 200px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  @media ${(props) => props.theme.mobile} {
    min-height: 0;
  }
`;

const rotate = (props) => keyframes`
    0% {
    border-color: ${props.theme.bg4};
    border-top-color: ${props.theme.bg2};
    transform: rotate(0deg);
  }
  50% {
    border-color: ${props.theme.bg3};
    border-top-color: ${props.theme.bg2};
    transform: rotate(180deg);
  }
  100% {
    border-color: ${props.theme.bg4};
    border-top-color: ${props.theme.bg2};
    transform: rotate(360deg);
  }
`;

export const Loader = styled.div`
  border: 16px solid ${(props) => props.theme.bg3};
  border-top: 16px solid ${(props) => props.theme.bg2};
  border-radius: 50%;
  width: 120px;
  height: 120px;

  align-self: center;
  box-shadow: 0 4px 5px ${(props) => props.theme.bg};

  ${(props) => css`
    animation: ${rotate(props)} 1.5s linear infinite;
  `}
`;

export const InstructionsText = styled.p`
  color: ${(props) => props.theme.fc};
  font-size: 20px;
  font-family: "Roboto", sans-serif;
`;

export const Green = styled.span`
  color: ${(props) => props.theme.bg2};
`;
