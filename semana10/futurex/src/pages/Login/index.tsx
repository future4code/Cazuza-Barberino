import React from "react";
import styled from "styled-components";
import Forms from "../../Components/Forms";
import { FormField } from "../../Components/InputField";
import { tryLogin } from "../../services/api";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { Routes } from "../../App";

interface Props {}

const formFields: FormField[] = [
  {
    name: "username",
  },
  {
    name: "password",
  },
];

const Login = (props: Props) => {
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState("");
  const dispatch = useDispatch();

  const onLogin = (success: boolean, token: string) => {
    setLoading(false);
    if (success) {
      localStorage.setItem("token", token);
      dispatch(push(Routes.trips));
    } else {
      localStorage.clear();
      setErr("Username or Password is incorrect");
    }
  };

  const handleSubmit = ([username, password]: string[]) => {
    tryLogin(username, password, onLogin);
    setLoading(true);
  };

  return (
    <Container>
      {loading ? (
        <LoadingSpinner size="200px" thickness="50px" />
      ) : (
        <LoginWrapper>
          <Forms submitHandler={handleSubmit} fields={formFields} />
          {err !== "" && <ErrMsg>{err}</ErrMsg>}
        </LoginWrapper>
      )}
    </Container>
  );
};

const ErrMsg = styled.p`
  margin-top: 20px;
  color: red;
  font-size: 20px;
  text-align: center;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: ${(props) => props.theme.light};
`;

const LoginWrapper = styled.div`
  width: 100%;
  max-width: 800px;

  background-color: ${(props) => props.theme.light};
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
  padding: 100px;
`;

export default Login;
