import { mdiAccountMultipleCheck, mdiAccountSwitch } from "@mdi/js";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppBar } from "../../components/AppBar";
import { RootState } from "../../reducers";
import { firstLoad } from "../../reducers/profiles/actions";
import { updateCurrentPage } from "../../reducers/routes/actions";
import { Pages } from "../../reducers/routes/types";
import MatchScreen from "../MatchScreen";
import ProfileScreen from "../ProfileScreen";
import SwipeScreen from "../SwipeScreen";
import { Badge, Container, MatchIcon, NavBtnWrapper } from "./styled";

const Router = () => {
  const currentPage = useSelector(
    (state: RootState) => state.routes.currentPage
  );

  const matches = useSelector((state: RootState) => state.profiles.matches);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(firstLoad());
  }, [dispatch]); //colocando dispath como dependencia so para sair o warning

  return (
    <>
      <AppBar
        show={currentPage !== Pages.ProfileScreen}
        rightAction={
          <NavBtnWrapper
            show={currentPage === Pages.SwipeScreen}
            onClick={() => dispatch(updateCurrentPage(Pages.MatchScreen))}
          >
            <Badge show={matches.length > 0}>{matches.length}</Badge>
            <MatchIcon size={1.5} path={mdiAccountMultipleCheck} />
          </NavBtnWrapper>
        }
        leftAction={
          <NavBtnWrapper
            show={currentPage === Pages.MatchScreen}
            onClick={() => dispatch(updateCurrentPage(Pages.SwipeScreen))}
          >
            <MatchIcon path={mdiAccountSwitch} size={1} />
          </NavBtnWrapper>
        }
      />
      <Container position={`-${currentPage * 100}%`}>
        <SwipeScreen />
        <MatchScreen />
        <ProfileScreen />
      </Container>
    </>
  );
};

export default Router;
