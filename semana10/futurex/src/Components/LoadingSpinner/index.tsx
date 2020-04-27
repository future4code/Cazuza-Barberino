import React from "react";
import styled, { keyframes } from "styled-components";

interface Props {
  size?: string;
  color?: string;
  thickness?: string;
  speed?: number;
}

const LoadingSpinner = (props: Props) => {
  return <Container {...props}></Container>;
};

const rotate = keyframes`
  0%{
    transform: translate(-50%, -50%) rotate(0deg);
  }

  100%{
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

const Container = styled.div.attrs((props: Props) => ({
  size: props.size || "40px",
  thickness: props.thickness || "20px",
  speed: props.speed || 1,
}))`
  position: absolute;
  top: 50%;
  left: 50%;
  box-sizing: content-box;

  width: ${(props) => props.size};
  height: ${(props) => props.size};
  animation: ${rotate} ${(props) => 1 / props.speed}s linear infinite;
  border: ${(props) => props.thickness} solid ${(props) => props.theme.light};
  border-top-color: ${(props) => props.theme.primary};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 -5px 10px black, inset 0 16px 20px black;
`;

export default LoadingSpinner;
