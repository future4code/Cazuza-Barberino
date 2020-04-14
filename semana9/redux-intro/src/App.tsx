import React from "react";
import styled, { ThemeProvider } from "styled-components";
import MainContent from "./Components/MainContent";

const theme = {
  bg: "#ccc",
  fc: "#211",
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <MainContent />
      </Container>
    </ThemeProvider>
  );
}

export default App;

const Container = styled.div`
  position: absolute;
  width: 100%;
  min-height: 100vh;

  background-color: ${(props) => props.theme.bg};
  display: flex;
  flex-direction: column;
`;
