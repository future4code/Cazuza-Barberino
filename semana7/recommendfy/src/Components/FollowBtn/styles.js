import styled, { css } from "styled-components";
import { NoErroWrapper } from "../global-styles";

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
