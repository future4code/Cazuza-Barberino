import styled, { keyframes, css, Keyframes } from "styled-components";
import { Coord } from "./useDrag";

// CSS Animations for the SwipeCard
export const swipeRight = (translate: number, rotate: number) => () => {
  const t = `${translate}px`;
  const r = `${rotate}px`;

  return keyframes`
  from {
    opacity: 1;
	  transform: translate(${t}) rotate(${r});
  }

  to {
    opacity: 0;
	  transform: translate(-200px) rotate(-20deg);
  }
`;
};
export const swipeLeft = (translate: number, rotate: number) => () => {
  const t = `${translate}px`;
  const r = `${rotate}px`;

  return keyframes`
  from {
    opacity: 1;
	  transform: translate(${t}) rotate(${r});
  }

  to {
    opacity: 0;
	  transform: translate(200px) rotate(20deg);
  }
`;
};

interface UserCardWrapperProps {
  animation: (() => Keyframes) | null;
  dragging: boolean;
  coord: Coord;
  index: number;
}

export const UserCardWrapper = styled.div.attrs(
  (props: UserCardWrapperProps) => {}
)<UserCardWrapperProps>`
  background-color: white;
  box-shadow: 0 2px 10px 0 rgba(117, 117, 117, 0.77);
  position: absolute;
  left: ${(props) => 24 - props.index * 8}px;
  top: ${(props) => 24 - props.index * 8}px;
  border-radius: 5px;
  overflow: hidden;
  height: 430px;
  width: 350px;
  animation: ${(props) => (props.animation ? props.animation() : null)} 0.5s
    forwards;
  display: flex;
  align-items: center;
  cursor: ${(props) => (props.dragging ? "grabbing" : "grab")};
  z-index: ${(props) => 4 - props.index};
`;

export const minmax = (val: number, min: number, max: number): number => {
  return Math.min(Math.max(val, min), max);
};

interface BlurredBackgroundProps {
  photo: string;
}

export const BlurredBackground = styled.div<BlurredBackgroundProps>`
  ${(props) =>
    props.photo &&
    css`
      background-image: url(${props.photo});
      filter: blur(30px);
      height: 100%;
      width: 100%;
      position: absolute;
    `}
`;

export const ProfilePicture = styled.img`
  width: 100%;
  display: block;
  z-index: 1;
  user-select: none;
  pointer-events: none;
`;

export const InfoWrapper = styled.div`
  height: 30%;
  position: absolute;
  bottom: 0;
  width: 100%;
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 15px;
  z-index: 2;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: baseline;
`;

export const UserName = styled.div`
  font-weight: bold;
  font-size: 24px;
  user-select: none;
`;

export const UserAge = styled.div`
  margin-left: 10px;
  font-size: 20px;
  user-select: none;
`;
