import React from "react";
import { Btn } from "../../Components/global-styled";
import { Routes } from "../../App";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import styled from "styled-components";

interface Props {}

const Header = (props: Props) => {
  const [validToken, setValidToken] = React.useState(false);
  const dispatch = useDispatch();
  React.useEffect(() => {
    setValidToken(localStorage.getItem("token") !== null);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Container>
      <Title onClick={() => dispatch(push(Routes.home))}>Future X</Title>
      <BtnWrapper>
        {validToken ? (
          <>
            <Btn onClick={() => dispatch(push(Routes.createTrip))}>
              Create Trip
            </Btn>
            <Btn onClick={handleLogout}>Logout</Btn>
          </>
        ) : (
          <Btn onClick={() => dispatch(push(Routes.login))}>Login</Btn>
        )}
      </BtnWrapper>
    </Container>
  );
};

export default Header;

const Title = styled.h1`
  color: ${(p) => p.theme.light};
  cursor: pointer;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  max-width: 300px;
  column-gap: 20px;
  flex: 1;
`;

const Container = styled.header`
  height: 100px;
  background-color: ${(props) => props.theme.primary};
  box-shadow: 0 0 10px black;
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
`;
