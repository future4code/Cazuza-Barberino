import styled from "styled-components";

export const PlaylistContainer = styled.div`
  width: 300px;
  min-height: 400px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  @media ${(props) => props.theme.mobile} {
    min-height: 0;
  }
`;

export const Loader = styled.div`
  align-self: center;
  justify-self: center;
`;
