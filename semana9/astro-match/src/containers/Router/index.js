import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SwipeScreen from "../SwipeScreen";
import MatchScreen from "../MatchScreen";
import ProfileScreen from "../ProfileScreen";
import { firstLoad } from "../../reducers/profiles/actions";

const Router = () => {
  const currentPage = useSelector((state) => state.routes.currentPage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(firstLoad());
  }, [dispatch]); //colocando dispath como dependencia so para sair o warning

  switch (currentPage) {
    case "SwipeScreen":
      return <SwipeScreen />;
    case "MatchScreen":
      return <MatchScreen />;
    case "ProfileScreen":
      return <ProfileScreen />;
    default:
      return <h1>Error: invalid page selected</h1>;
  }
};

export default Router;
