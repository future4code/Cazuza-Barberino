import styled from "styled-components";

interface BoxProps {
  fontSize?: string;
}

export const DefaultBox = styled.div.attrs((props: BoxProps) => ({
  fontSize: props.fontSize || "20px",
}))`
  width: 100%;
  font-size: ${(props) => props.fontSize};
  padding: 0.5em;
  border-radius: 0.5em;
  border: 0.1em solid ${(props) => props.theme.primary};
`;

export const Btn = styled(DefaultBox)`
  color: ${(props) => props.theme.light};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.primary};

  cursor: pointer;
  transition: 0.2s;

  :hover {
    background-color: ${(props) => props.theme.light};
    color: ${(props) => props.theme.primary};
  }
`;

export const InvertedBtn = styled(Btn)`
  color: ${(props) => props.theme.primary};
  background-color: ${(props) => props.theme.light};

  :hover {
    background-color: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.light};
  }
`;
