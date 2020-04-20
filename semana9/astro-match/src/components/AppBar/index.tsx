import React from "react";
import logoImage from "../../img/logo.png";
import { AppBarWrapper, Logo } from "./styled";

interface Props {
  leftAction?: JSX.Element;
  rightAction?: JSX.Element;
  show: boolean;
}

export const AppBar = (props: Props) => {
  return (
    <AppBarWrapper show={props.show}>
      <>{props.leftAction}</>
      <Logo src={logoImage} />
      <>{props.rightAction}</>
    </AppBarWrapper>
  );
};

export default AppBar;
