import styled from "styled-components";

export const theme = {
  bg: "#191414",
  bg2: "#1DB954",
  bg3: "#2C5D91",
  bg4: "#552F6D",
  fc: "white",
  mobile: `(max-width: 425px)`,
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

  @media ${(props) => props.theme.mobile} {
    padding: 0px;
  }
`;

export const Footer = styled.div`
  background-color: ${(props) => props.theme.bg};

  height: 100px;
`;

export const SiteTitle = styled.h1`
  color: ${(props) => props.theme.fc};
  font-size: 70px;
  margin-bottom: 20px;
  font-family: "Lobster Two", cursive;

  @media ${(props) => props.theme.mobile} {
    font-size: 50px;
  }
`;
