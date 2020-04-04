import React from "react";
import { ThemeProvider } from "styled-components";
import TopTracksFromSpotify from "../TopTracksFromSpotify";
import {
  theme,
  Container,
  SiteTitle,
  Main,
  Footer,
  Background,
} from "./styles";

export default function AppContainer() {
  return (
    <ThemeProvider theme={theme}>
      <Background />
      <Container>
        <Main>
          <SiteTitle>Recommendfy</SiteTitle>;
          <TopTracksFromSpotify />
        </Main>
        <Footer></Footer>
      </Container>
    </ThemeProvider>
  );
}
