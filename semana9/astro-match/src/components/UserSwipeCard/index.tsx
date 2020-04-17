import React, { useRef } from "react";
import {
  BlurredBackground,
  InfoWrapper,
  ProfilePicture,
  TitleWrapper,
  UserAge,
  UserCardWrapper,
  UserName,
  minmax,
} from "./styled";
import { Keyframes } from "styled-components";
import { Profile } from "../../reducers/profiles/types";
import { useDrag } from "./useDrag";
import { OptionType } from "../../containers/SwipeScreen/types";

interface Props {
  animation: ((translate: number, rotate: number) => () => Keyframes) | null;
  userToSwipe: Profile | null;
  onChooseOption: (option: OptionType) => () => void;
  index: number;
}

const UserSwipeCard = ({
  userToSwipe,
  animation,
  onChooseOption,
  index,
}: Props) => {
  const { coord, isDragging, itemRef, mouseDown, mouseUp } = useDrag();

  React.useLayoutEffect(() => {
    if (!isDragging && Math.abs(coord.x) > 200) {
      onChooseOption(coord.x > 0 ? "like" : "dislike")();
    }
  }, [isDragging, onChooseOption]);

  const transform = React.useRef({
    t: 0,
    r: 0,
  });

  if (isDragging) {
    transform.current.t = minmax(coord.x, -200, 200);
    transform.current.r = minmax(coord.x / 10, -20, 20);
  }

  if (!userToSwipe) return <></>;
  else
    return (
      <UserCardWrapper
        index={index}
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
        animation={
          animation ? animation(transform.current.t, transform.current.r) : null
        }
        ref={itemRef}
        dragging={isDragging}
        coord={coord}
        style={
          isDragging && index === 0
            ? {
                transform: `translate(${transform.current.t}px) rotate(${transform.current.r}deg)`,
                opacity: 1 - minmax(Math.abs(coord.x / 400), 0, 0.5),
              }
            : {
                transition: "transform 1s, .5s ease-out",
              }
        }
      >
        <BlurredBackground photo={userToSwipe.photo} />
        <ProfilePicture src={userToSwipe.photo} />
        <InfoWrapper>
          <TitleWrapper>
            <UserName>{userToSwipe.name},</UserName>
            <UserAge>{userToSwipe.age}</UserAge>
          </TitleWrapper>
        </InfoWrapper>
      </UserCardWrapper>
    );
};

export default UserSwipeCard;
