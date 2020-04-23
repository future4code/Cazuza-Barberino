import React from "react";
import styled from "styled-components";
import { Btn } from "../../Components/global-styled";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { Routes } from "../../App";

interface Props {}

const Home = (props: Props) => {
  const dispatch = useDispatch();

  return (
    <Container>
      <BtnWrapper>
        <Btn onClick={() => dispatch(push(Routes.trips))}>
          Visualizar Viagens
        </Btn>
        <Btn onClick={() => dispatch(push(Routes.login))}>
          Login
        </Btn>
      </BtnWrapper>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: ${(props) => props.theme.light};
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;

  column-gap: 20px;
  width: 400px;
`;
