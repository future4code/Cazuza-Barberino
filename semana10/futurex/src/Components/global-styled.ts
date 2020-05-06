import styled, { css, Keyframes } from "styled-components";

interface BoxProps {
  fontSize?: string;
  color: "primary" | "secondary" | "dark";
}

export const DefaultBox = styled.div.attrs((props: BoxProps) => ({
  fontSize: props.fontSize || "20px",
  color: props.color || "primary",
}))`
  width: 100%;
  font-size: ${(props) => props.fontSize};
  padding: 0.5em;
  border-radius: 0.5em;
  border: 0.1em solid ${(props) => props.theme[props.color]};
`;

export const Btn = styled(DefaultBox)`
  color: ${(props) => props.theme.light};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme[props.color]};
  flex: 1;
  user-select: none;
  cursor: pointer;
  transition: 0.2s;

  :hover {
    background-color: ${(props) => props.theme.light};
    color: ${(props) => props.theme[props.color]};
  }
`;
