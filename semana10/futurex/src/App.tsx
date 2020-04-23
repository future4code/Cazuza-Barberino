import React from "react";
import { createBrowserHistory } from "history";
import { Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { reducers } from "./reducers";
import { ConnectedRouter, routerMiddleware } from "connected-react-router";
import Home from "./pages/Home";
import Trips from "./pages/Trips";
import Login from "./pages/Login";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";

const history = createBrowserHistory();
const store = createStore(
  reducers(history),
  applyMiddleware(routerMiddleware(history))
);

export const Routes = {
  home: "/",
  login: "/login",
  trips: "/trips",
};

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Container>
              <Route exact path={Routes.home} component={Home} />
              <Route path={Routes.trips} component={Trips} />
              <Route path={Routes.login} component={Login} />
            </Container>
          </ThemeProvider>
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;

const theme = {
  primary: "#3B3B98",
  secondary: "#182C61",
  dark: "#2C3A47",
  light: "#CAD3C8",
};

const GlobalStyle = createGlobalStyle`
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: sans-serif;
  }
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  background-color: ${(props) => props.theme.primary};
`;
