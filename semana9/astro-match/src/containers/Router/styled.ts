import styled from "styled-components";
import Icon from "@mdi/react";

interface ContainerProps {
  position: string;
}

export const Container = styled.div<ContainerProps>`
  position: absolute;
  top: 0;
  left: ${(props) => props.position};
  transition: left 0.3s;

  width: 300%;
  height: 100%;
  flex-shrink: 0;
  flex-grow: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

export const MatchIcon = styled(Icon)`
  display: block;
  fill: #753192;
`;

interface NavBtnWrapperProps {
  show: boolean;
}

export const NavBtnWrapper = styled.div<NavBtnWrapperProps>`
  position: relative;
  cursor: ${(props) => (props.show ? "pointer" : "default")};
  pointer-events: ${(props) => (props.show ? "all" : "none")};
  transform: scale(${(props) => (props.show ? 1 : 0)});
  transition: transform 0.3s;
  :hover {
    transform: scale(0.9);
  }
`;

interface BadgeProps {
  show: boolean;
}

export const Badge = styled.div<BadgeProps>`
  position: absolute;
  box-sizing: border-box;
  width: 50%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: red;
  padding: 10px;
  border-radius: 50%;
  font-size: 12px;
  top: 0;
  right: 0;
  transition: 0.2s;
  transform: translate(25%, -25%) scale(${(props) => (props.show ? 1 : 0)});
  user-select: none;
`;
