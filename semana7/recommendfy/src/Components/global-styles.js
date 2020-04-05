import styled from "styled-components";

export const DefaultBox = styled.div`
  width: 100%;
  height: 40px;
  border: none;

  background-color: ${(props) => props.theme.bg2};
  color: ${(props) => props.theme.fc};
  font-family: cursive;

  font-size: 20px;
  border-radius: 20px;
  padding: 0 20px;
`;

export const DefaultWrapper = styled(DefaultBox)`
  padding: 0;
  position: relative;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const NoErroWrapper = styled.div`
  width: 40px;
  height: 40px;
  position: absolute;
  padding: 5px;
  cursor: pointer;
  transition: 0.2s;
  border-radius: 50%;
`;
