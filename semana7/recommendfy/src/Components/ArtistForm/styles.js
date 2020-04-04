import styled, { css } from "styled-components";
import { DefaultBox, DefaultWrapper, NoErroWrapper } from "../global-styles";

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
