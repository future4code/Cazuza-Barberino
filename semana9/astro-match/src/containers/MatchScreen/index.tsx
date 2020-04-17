import React, { Component } from "react";
import { AppBar } from "../../components/AppBar";
import { mdiAccountSwitch } from "@mdi/js";
import {
  Avatar,
  List,
  ListItem,
  ListText,
  MatchIcon,
  Container,
} from "./styled";
import { connector, Props } from "./types";

class MatchScreen extends Component<Props> {
  render() {
    const { goToSwipeScreen, matches } = this.props;

    return (
      <Container>
        <AppBar
          leftAction={
            <div onClick={goToSwipeScreen}>
              <MatchIcon path={mdiAccountSwitch} size={1} />
            </div>
          }
        />
        <List>
          {matches &&
            matches.map((match) => (
              <ListItem key={match.name}>
                <Avatar src={match.photo} />
                <ListText>{match.name}</ListText>
              </ListItem>
            ))}
        </List>
      </Container>
    );
  }
}

export default connector(MatchScreen);
