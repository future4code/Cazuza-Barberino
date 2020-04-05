import styled from "styled-components";

export const SubContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-bottom: 100px;

  padding: 40px;
  background: linear-gradient(
    45deg,
    ${(props) => props.theme.bg} 0%,
    ${(props) => props.theme.bg3} 25%,
    ${(props) => props.theme.bg4} 75%,
    ${(props) => props.theme.bg} 100%
  );

  box-shadow: 0 0 4px ${(props) => props.theme.bg};

  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  column-gap: 70px;
  row-gap: 70px;

  @media ${(props) => props.theme.mobile} {
    padding-top: 40px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
  }
`;

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
