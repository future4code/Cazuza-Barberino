import React from "react";
import styled from "styled-components";
import MainContent from "./Components/MainContent";

function App() {
  return (
    <Container>
      <MainContent />
    </Container>
  );
}

export default App;

const Container = styled.div`
  position: absolute;
  width: 100%;
  min-height: 100vh;

  background-color: #eee;
  display: flex;
  flex-direction: column;
`;
