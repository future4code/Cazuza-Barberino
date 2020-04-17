import React from "react";
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
  animation: Keyframes | null;
  userToSwipe: Profile | null;
  onChooseOption: (option: OptionType) => () => void;
}

const UserSwipeCard = ({ userToSwipe, animation, onChooseOption }: Props) => {
  const { coord, isDragging, itemRef, mouseDown, mouseUp } = useDrag();

  React.useLayoutEffect(() => {
    if (!isDragging && Math.abs(coord.x) > 200) {
      onChooseOption(coord.x > 0 ? "like" : "dislike")();
    }
  }, [isDragging, onChooseOption]);

  if (!userToSwipe) return <></>;
  else
    return (
      <UserCardWrapper
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
        animation={animation}
        ref={itemRef}
        dragging={isDragging}
        coord={coord}
        style={
          isDragging
            ? {
                transform: `translate(${minmax(
                  coord.x,
                  -200,
                  200
                )}px) rotate(${minmax(coord.x / 10, -20, 20)}deg)`,
                opacity: 1 - minmax(Math.abs(coord.x / 400), 0, 0.5),
              }
            : {
                transition: ".5s ease-out",
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
