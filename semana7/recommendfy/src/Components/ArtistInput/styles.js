import styled from "styled-components";
import { NoErroWrapper, DefaultBox } from "../global-styles";

export const CreateInputIcon = styled(NoErroWrapper)`
  bottom: 3px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
  right: -45px;
  background-color: ${(props) => props.theme.bg2};
  border-radius: 50%;
  transform: scale(${(props) => (props.showCreate ? 1 : 0)});
  transition: 0.3s;
`;

export const DeleteInputIcon = styled(NoErroWrapper)`
  bottom: 3px;
  padding: 5px;
  transform: scale(${(props) => (props.showDelete ? 1 : 0)});
  transition: 0.3s;
`;

export const AInput = styled(DefaultBox)`
  min-width: 0px;
  flex: 3;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
`;

export const NumberInput = styled(DefaultBox)`
  position: relative;
  bottom: 3px;
  min-width: 0px;
  flex: 1;
  border-left: 5px solid ${(props) => props.theme.bg};
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  padding-left: 10px;
  box-shadow: 0 7px 5px rgba(0, 0, 0, 0.4);
`;
