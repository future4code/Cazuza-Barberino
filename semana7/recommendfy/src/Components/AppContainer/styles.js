import styled from "styled-components";

export const theme = {
  bg: "#191414",
  bg2: "#1DB954",
  bg3: "#2C5D91",
  bg4: "#552F6D",
  fc: "white",
};

export const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;

  background: linear-gradient(
    45deg,
    ${(props) => props.theme.bg} 0%,
    ${(props) => props.theme.bg3} 25%,
    ${(props) => props.theme.bg4} 75%,
    ${(props) => props.theme.bg} 100%
  );

  filter: blur();
`;

export const Container = styled.div`
  flex: none;
  position: absolute;
  width: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
`;

export const Main = styled.main`
  width: 100%;
  min-height: 100%;
  padding: 20px;
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const Footer = styled.div`
  background-color: ${(props) => props.theme.bg};

  height: 100px;
`;

export const SiteTitle = styled.h1`
  color: ${(props) => props.theme.fc};
  font-size: 50px;
  margin-bottom: 100px;
`;

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
`;

export const PlaylistContainer = styled.div`
  width: 300px;
  min-height: 400px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const Loader = styled.div`
  align-self: center;
  justify-self: center;
`;
