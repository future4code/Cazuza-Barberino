import React from "react";
import { ThemeProvider } from "styled-components";
import TopTracksFromSpotify from "../TopTracksFromSpotify";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import {
  theme,
  Container,
  SiteTitle,
  Main,
  Footer,
  Background,
  FooterIconWrapper,
} from "./styles";

export default function AppContainer() {
  return (
    <ThemeProvider theme={theme}>
      <Background />
      <Container>
        <Main>
          <SiteTitle>Recommendfy</SiteTitle>
          <TopTracksFromSpotify />
        </Main>
        <Footer>
          <FooterIconWrapper>
            <FiGithub size="40px" />
          </FooterIconWrapper>
          <FooterIconWrapper>
            <FiLinkedin size="40px" />
          </FooterIconWrapper>
        </Footer>
      </Container>
    </ThemeProvider>
  );
}
