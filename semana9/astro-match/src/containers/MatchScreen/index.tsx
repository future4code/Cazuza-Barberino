import React, { Component } from "react";
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
    const { matches } = this.props;

    return (
      <Container>
        <List>
          {matches &&
            matches.map((match) => (
              <ListItem key={match.id}>
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
