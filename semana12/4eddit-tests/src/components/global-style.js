import styled from "styled-components";
import {} from "react-icons/fi";

export const Btn = styled.button.attrs((props) => ({
  bg: props.inverted ? "transparent" : "#ed7f61",
  fc: props.inverted ? "#ed7f61" : "white",
}))`
  /* transition: 0.2s;
  width: ${(props) => props.width || "auto"}; */
  border: 1px solid #ed7f61;
  background-color: ${(props) => props.bg};
  color: ${(props) => props.fc};
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    opacity: 0.8;
  }
`;

export const DefaultBox = styled.div`
  width: 100%;
  max-width: 640px;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  /* overflow: hidden; */
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
`;

export const InputField = styled.input`
  border: 1px solid #eee;
  width: 100%;
  font-size: 16px;
  padding: 8px;
  border-radius: 4px;
  resize: none;

  &:focus {
    border-color: #999;
  }
`;

export const RateButton = styled.div`
  border-radius: 4px;
  display: grid;
  justify-items: center;
  align-items: center;
  width: 24px;
  height: 24px;

  &:hover {
    border: 2px solid white;
  }
`;
