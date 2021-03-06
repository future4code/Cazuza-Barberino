import styled from "styled-components";

interface OptionButtonProps {
  option: "like" | "dislike";
}

export const OptionButton = styled.button<OptionButtonProps>`
  border-radius: 50%;
  width: 80px;
  height: 80px;
  border: 5px solid
    ${(props) =>
      props.option === "like" ? props.theme.secondary : props.theme.primary};
  color: ${(props) =>
    props.option === "like" ? props.theme.secondary : props.theme.primary};
  font-size: 50px;
  transform: scale(0.7);
  transition: 0.2s;
  position: relative;
  box-shadow: 0 0 15px 0 rgba(205, 205, 205, 0.73);
  overflow: hidden;

  :focus {
    outline: none;
  }

  :hover {
    background-color: ${(props) =>
      props.option === "like" ? props.theme.secondary : props.theme.primary};
    color: white;
    transform: scale(0.8);
  }

  :active {
    :before {
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      position: absolute;
      background-color: rgba(0, 0, 0, 0.5);
      content: "";
    }
  }
`;

export const ContentWrapper = styled.div`
  position: relative;
  padding: 20px;
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: flex-start;
  overflow: hidden;
`;

export const SwipeScreenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  height: 100%;
`;

interface ButtonsWrapperProps {
  show?: boolean;
}

export const ButtonsWrapper = styled.div<ButtonsWrapperProps>`
  position: absolute;
  bottom: ${(props) => (props.show ? 0 : `-80px`)};
  left: 0;
  z-index: 2;
  background-color: white;
  transition: bottom 0.5s;

  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
`;


