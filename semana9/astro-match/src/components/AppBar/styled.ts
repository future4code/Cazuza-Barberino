import styled from "styled-components";

interface AppBarWrapperProps {
  show: boolean;
}

export const AppBarWrapper = styled.div<AppBarWrapperProps>`
  position: absolute;
  top: ${(props) => (props.show ? 0 : `-50px`)};
  transition: top 0.3s;
  z-index: 99;
  height: 50px;
  width: 100%;
  flex-shrink: 0;
  background-color: white;

  border-bottom: 1px solid lightgray;
  padding: 0 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Logo = styled.img`
  height: 100%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  user-select: none;
`;
