import styled from "styled-components";

export const AppBarWrapper = styled.div`
  position: absolute;
  top: 0;
  z-index: 99;
  height: 50px;
  width: 100%;
  flex-shrink: 0;

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

