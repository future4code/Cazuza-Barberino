import styled from "styled-components";
import { NoErroWrapper } from "../global-styles";

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
